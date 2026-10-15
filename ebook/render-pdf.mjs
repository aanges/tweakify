/**
 * TWEAQIFY — render PDF przez Chrome DevTools Protocol.
 *
 * Po co to osobny skrypt, skoro `chrome --print-to-pdf` wystarczy?
 * Bo wersja CLI nie umie dwiech rzeczy, ktore sa kluczowe dla
 * PDF-a czytanego na ekranie:
 *
 *   1. generateDocumentOutline  -> zarys/zakladki w panelu bocznym
 *                                 czytelnika (naglowki h1-h6 -> drzewo)
 *   2. preferCSSPageSize        -> marginesy brane dokladnie z @page
 *                                 z CSS, a nie z domyslnych
 *
 * Do tego printBackground:true, zeby ciemne tlo faktycznie sie drukowalo
 * (przy PDF-ie do czytania na ekranie to wazne).
 *
 * Zero zaleznosci: Node 22+ ma globalny WebSocket, wiec CDP obslugujemy
 * recznie.
 *
 * Uzycie:  node ebook/render-pdf.mjs
 */

import { spawn } from "node:child_process";
import { writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HTML = path.join(HERE, "PIERWSZY-KROK-DO-ABSOLUTNEJ-PRZEWAGI.html");
const PDF = path.join(HERE, "PIERWSZY-KROK-DO-ABSOLUTNEJ-PRZEWAGI.pdf");

const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

async function findChrome() {
  const { access } = await import("node:fs/promises");
  for (const p of CHROME_CANDIDATES) {
    try {
      await access(p);
      return p;
    } catch {
      /* szukamy dalej */
    }
  }
  throw new Error(
    "Nie znaleziono Chrome/Edge.\nUstaw zmienna CHROME_PATH na sciezke do przegladarki."
  );
}

const PORT = 9333 + Math.floor(Math.random() * 400);
const profile = path.join(process.env.TEMP, "tweakify-cdp-" + PORT);
const chrome = await findChrome();

const proc = spawn(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--remote-debugging-port=" + PORT,
    "--user-data-dir=" + profile,
    "about:blank",
  ],
  { stdio: "ignore" }
);

const cleanup = async () => {
  try { proc.kill(); } catch { /* juz zamkniety */ }
  await rm(profile, { recursive: true, force: true }).catch(() => {});
};
process.on("exit", cleanup);
process.on("SIGINT", async () => { await cleanup(); process.exit(1); });

/* ── Czekamy na endpoint CDP ─────────────────────────────────── */

let target = null;
for (let i = 0; i < 100; i++) {
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    const list = await res.json();
    target = list.find((t) => t.type === "page");
    if (target) break;
  } catch {
    /* jeszcze nie wstalo */
  }
  await new Promise((r) => setTimeout(r, 150));
}
if (!target) {
  await cleanup();
  throw new Error("Nie udalo sie nawiazac polaczenia z Chrome DevTools.");
}

/* ── Klient CDP ─────────────────────────────────────────────── */

let nextId = 1;
const pending = new Map();
const ws = new WebSocket(target.webSocketDebuggerUrl);
const loaded = new Promise((resolve) => {
  ws.addEventListener("open", () => resolve());
});

await loaded;

ws.addEventListener("message", (ev) => {
  let msg;
  try { msg = JSON.parse(ev.data); } catch { return; }
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  }
});

function send(method, params = {}) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error("Timeout: " + method));
      }
    }, 120000);
  });
}

/* ── Render ─────────────────────────────────────────────────── */

await send("Page.enable");

const url = "file:///" + HTML.replace(/\\/g, "/");
await send("Page.navigate", { url });
// Czekamy aż dokument sie policzy i fonty wczytają
await send("Runtime.evaluate", {
  expression: "document.fonts ? document.fonts.ready.then(()=>1) : 1",
  awaitPromise: true,
});
await new Promise((r) => setTimeout(r, 600));

const result = await send("Page.printToPDF", {
  printBackground: true,
  preferCSSPageSize: true,       // marginesy z @page w CSS
  generateTaggedPDF: true,       // struktura / dostepnosc
  generateDocumentOutline: true, // ZAKLADKI w panelu bocznym
  displayHeaderFooter: false,
  transferMode: "ReturnAsBase64",
});

await writeFile(PDF, Buffer.from(result.data, "base64"));

const buf = await (await import("node:fs/promises")).readFile(PDF);
const raw = buf.toString("latin1");
const pages = (raw.match(/\/Type\s*\/Page(?![s])/g) || []).length;
const links = (raw.match(/\/Subtype\s*\/Link/g) || []).length;
const outline = raw.includes("/Outlines");

console.log("PDF zapisany : " + path.relative(process.cwd(), PDF));
console.log("Rozmiar      : " + (buf.length / 1024).toFixed(0) + " KB");
console.log("Strony       : " + pages);
console.log("Linki        : " + links);
console.log("Zakladki     : " + (outline ? "tak" : "NIE"));
console.log("Tagged       : " + (raw.includes("/StructTreeRoot") ? "tak" : "nie"));

ws.close();
await cleanup();
process.exit(0);