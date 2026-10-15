/**
 * Weryfikacja tla: czy czarna plansza dociera do krawedzi kartki A4.
 *
 * Skanuje WSZYSTKIE strumienie (takze bez tekstu — tlo moze byc
 * w osobnym strumieniu), szuka czarnego prostokata >= 97% szerokosci
 * kartki w skali Chrome'a (595 pt / 0.24 = 2479 jednostek).
 *
 * node _verify-bg.mjs [sciezka-do-pdf]
 */
import { readFile } from "node:fs/promises";
import zlib from "node:zlib";

const FILE = process.argv[2] || "ebook/PIERWSZY-KROK-DO-ABSOLUTNEJ-PRZEWAGI.pdf";
const PAGE_W = 2479;

const buf = await readFile(FILE);
const chunks = [];
let i = 0;
while (i < buf.length) {
  const s = buf.indexOf(Buffer.from("stream"), i);
  if (s < 0) break;
  let d = s + 6;
  if (buf[d] === 13) d++;
  if (buf[d] === 10) d++;
  const e = buf.indexOf(Buffer.from("endstream"), d);
  if (e < 0) break;
  chunks.push(buf.subarray(d, e));
  i = e + 9;
}

let textStreams = 0;
let bgStreams = 0;
const missing = [];

for (const c of chunks) {
  let t;
  try { t = zlib.inflateSync(c).toString("latin1"); } catch { continue; }

  const isText = /Tj|TJ/.test(t);
  if (isText) textStreams++;

  const toks = t.match(
    /[\d.]+ [\d.]+ [\d.]+ rg|[\d.]+ [\d.]+ [\d.]+ [\d.]+ re|[\d.]+ [\d.]+ [\d.]+ [\d.]+ [\d.]+ [\d.]+ cm/g
  ) || [];
  let color = null;
  let scale = 1;
  let best = 0;

  for (const tk of toks) {
    const p = tk.split(" ");
    const op = p[p.length - 1];
    if (op === "rg") { color = p.slice(0, 3).map(Number); continue; }
    if (op === "cm") { scale = Math.abs(Number(p[0])); continue; }
    if (op === "re") {
      const q = p.slice(0, 4).map(Number);
      if (color && color[0] === 0 && color[1] === 0 && color[2] === 0) {
        const w = q[2] * scale;
        if (w > best) best = w;
      }
    }
  }

  if (best / PAGE_W >= 0.97) bgStreams++;
  else if (isText) missing.push({ len: t.length, w: best });
}

const pages = (buf.toString("latin1").match(/\/Type\s*\/Page(?![s])/g) || []).length;
console.log("Strony w PDF               : " + pages);
console.log("Strumienie z tekstem       : " + textStreams);
console.log("Strumienie z pelnym tlem   : " + bgStreams);
if (missing.length) {
  console.log("Strony BEZ pelnego tla     : " + missing.length);
  for (const m of missing) console.log("   dlugosc=" + m.len + "  szer.tla=" + m.w.toFixed(0));
  console.log("PROBLEM — niektore strony maja biale marginesy");
} else {
  console.log("OK — cale marginesy czarne");
}