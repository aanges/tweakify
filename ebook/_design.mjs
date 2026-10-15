/**
 * TWEAQIFY — nowa warstwa wizualna wzorowana na referencyjnym PDF-ie
 * "PIERWSZY KROK PRZEWAGI" (FPS MAXXING).
 *
 * Przeniesione cechy:
 *   - tlo czarne z magentowo-fioletowym poswiatem w rogach
 *   - akcenty: hot pink -> magenta (zamiast fiolet/cyan)
 *   - bardzo ciezki display type z gradientem na tytulach rozdzialow
 *   - podtytuly w lawendzie z rozstrzeleniem
 *   - caly design na jednolitej czerni, takze w marginesach
 *
 * NIE przeniesione: logotyp, ikony X, nazwa marki — to zastrzezone znaki
 * FPS MAXXING, nie TWEAKIFY.
 *
 * node _design.mjs  -> wstawia CSS do build.mjs
 */

const CSS = String.raw`
/* ══════════════════════════════════════════════════════════════
   TWEAQIFY  ·  ciemny motyw  ·  A4 / PDF
   Wzorzec: "PIERWSZY KROK PRZEWAGI" (FPS MAXXING)
   ══════════════════════════════════════════════════════════════ */
:root{
  /* Czerń jest wymagana na całej karcie — także w marginesach. */
  --bg:#000000;
  --bg-2:#000000;

  /* Poświat w rogach — podpis wzorca */
  --glow-1:rgba(255,46,138,.16);
  --glow-2:rgba(145,40,255,.14);
  --glow-3:rgba(255,46,138,.09);

  --surface:#17101c;
  --surface-2:#221830;
  --line:#3a2745;
  --line-soft:#2a1c33;

  --ink:#f3eefa;
  --ink-soft:#c2aecd;
  --ink-faint:#8b7a97;

  /* Akcenty marki: hot pink -> magenta -> fiolet */
  --pink:#ff2e8a;
  --magenta:#d926c9;
  --violet:#8b5cf6;
  --accent:var(--pink);
  --accent-2:var(--magenta);
  --accent-3:var(--violet);
  --accent-grad:linear-gradient(96deg,#ff2e8a 0%,#ff2e8a 30%,#d926c9 72%,#8b5cf6 100%);
  --accent-dim:rgba(255,46,138,.14);

  --code-bg:#0d0812;
  --code-ink:#d9cbe4;
  --code-key:#ff6bb0;
}

*{ box-sizing:border-box; }
html{ background:#000; -webkit-text-size-adjust:100%; }
body{
  margin:0; background:#000; color:var(--ink);
  font-family:"Inter","Segoe UI",system-ui,-apple-system,Roboto,Helvetica,Arial,sans-serif;
  font-size:10.5pt; line-height:1.47;
  text-align:justify; hyphens:auto; -webkit-hyphens:auto;
  -webkit-font-smoothing:antialiased;
}
/* Poświat w rogach — jak w wzorcu */
body::before,
body::after{
  content:""; position:fixed; z-index:0; pointer-events:none;
  width:150mm; height:150mm; border-radius:50%;
  filter:blur(28px);
}
body::before{
  top:-60mm; right:-50mm;
  background:radial-gradient(circle, var(--glow-1) 0%, transparent 70%);
}
body::after{
  bottom:-70mm; left:-55mm;
  background:radial-gradient(circle, var(--glow-2) 0%, transparent 70%);
}

/* ── Okładka ───────────────────────────────────────────────── */
.titlepage{
  position:relative; z-index:1;
  page-break-after:always; break-after:page;
  padding:26mm 0 0; text-align:center;
}
.titlepage::before{
  content:""; display:block; width:44%; height:2.2mm;
  margin:0 auto 18mm;
  background:var(--accent-grad); border-radius:2mm;
}
.titlepage h1{
  border:0; padding:0 0 4mm; margin:0 0 4mm;
  font-size:38pt; line-height:1.02; font-weight:900;
  letter-spacing:-1.2px; text-transform:uppercase;
  /* UWAGA: celowo BEZ background-clip:text — Chrome przestaje wtedy
     malowac tlo strony i marginesy wychodza biale. Dwu-kolor tytulu
     robimy spanem, a gradient wkladamy w pasek pod tytulem. */
  color:#ffffff;
}
.titlepage h1 .g-pink{ color:var(--pink); }
.titlepage h1::after{
  content:""; display:block; width:62%; height:2.4mm;
  margin:5mm auto 0; border-radius:2mm;
  background:var(--accent-grad);
}
.titlepage h3{
  border:0; padding:0; margin:0 0 4mm;
  font-size:10.5pt; font-weight:700;
  letter-spacing:4.5px; text-transform:uppercase;
  color:var(--ink-faint);
}
.titlepage p{ text-align:center; margin:2.4mm 0; color:var(--ink-soft); }
.titlepage p strong{ color:var(--pink); }
.titlepage hr{
  width:16%; margin:11mm auto; border:0;
  border-top:.8pt solid var(--line);
}
.titlepage em{
  display:block; margin-top:2.5mm;
  color:var(--magenta); font-style:normal;
  font-size:11pt; font-weight:600; letter-spacing:2.6px; text-transform:uppercase;
}

/* ── Ochrona treści / antypiract na okładce ──────────────── */
.cover-anti{
  margin:6mm 6mm 0;
  padding:3.4mm 5mm;
  background:rgba(255,46,138,.07);
  border:.5pt solid rgba(255,46,138,.28);
  border-radius:1.6mm;
  font-size:7.2pt; line-height:1.45;
  color:var(--ink-soft);
  text-align:center; letter-spacing:.1px;
  hyphens:auto;
}
.cover-anti strong{ color:var(--pink); font-weight:700; }
.cover-anti a{ color:var(--pink); font-weight:700; border-bottom:0; }
.cover-anti p{ margin:0; text-align:center; }

/* ── Zastrzeżenie prawne na okładce ─────────────────────── */
.cover-legal{
  margin:16mm 6mm 0;
  padding:3.4mm 5mm 0;
  border-top:.5pt solid var(--line);
  font-size:7.2pt; line-height:1.45;
  color:var(--ink-faint);
  text-align:center; letter-spacing:.1px;
  hyphens:auto;
}
.cover-legal strong{ color:var(--pink); font-weight:700; }
.cover-legal p{ margin:0; text-align:center; }

/* ── Nagłówki ─────────────────────────────────────────────── */
h1,h2,h3,h4,h5,h6{
  text-align:left; font-weight:700; color:var(--ink);
  hyphens:none; -webkit-hyphens:none;
}

h1{
  position:relative; overflow:hidden;
  margin:0 0 5.5mm; padding:0 0 3mm;
  font-size:21pt; line-height:1.1; font-weight:900;
  letter-spacing:-.4px; text-transform:uppercase;
  color:#fff;
}
h1::after{
  content:""; display:block; position:absolute;
  left:0; right:0; bottom:0; height:1.6mm;
  background:var(--accent-grad);
}
.chapter--part{ page-break-before:always; break-before:page; margin-top:0; padding-top:2mm; }
/* Wprowadzenie zaczyna sie od swojej strony — bez tego plyne
   zaraz za spisem tresci, na tej samej karcie. */
.chapter--front{ page-break-before:always; break-before:page; margin-top:0; padding-top:2mm; }

h2{
  margin:6mm 0 2.2mm; padding:1.8mm 0 1.8mm 3.4mm;
  font-size:13pt; line-height:1.22; font-weight:800;
  color:#fff;
  border-left:1.8mm solid var(--pink);
  background:linear-gradient(90deg, rgba(255,46,138,.15), rgba(217,38,201,.07) 55%, transparent);
  border-radius:0 1.2mm 1.2mm 0;
}
h3{
  margin:4.6mm 0 1.6mm; padding-bottom:1.2mm;
  font-size:11.2pt; line-height:1.26; font-weight:700;
  color:var(--magenta);
  border-bottom:.6pt solid var(--line);
  letter-spacing:.2px;
}
h4{
  margin:4mm 0 1.2mm; font-size:9.2pt;
  color:var(--ink-faint); text-transform:uppercase;
  letter-spacing:1.8px; font-weight:700;
}
h5{ margin:3.4mm 0 1mm; font-size:10.2pt; color:var(--ink-soft); }
h6{ margin:3mm 0 .9mm; font-size:9.7pt; color:var(--ink-faint); }

.chapter--appendix{ color:var(--magenta); }

/* ── Akapity ──────────────────────────────────────────────── */
p{ margin:0 0 2.3mm; }
strong{ font-weight:700; color:#fff; }
em{ font-style:italic; color:var(--ink); }
a{ color:var(--pink); text-decoration:none; border-bottom:.6pt solid rgba(255,46,138,.45); }

/* ── Listy ────────────────────────────────────────────────── */
ul,ol{ margin:0 0 2.6mm; padding-left:5.2mm; }
li{ margin:0 0 .9mm; }
li > ul, li > ol{ margin:.9mm 0 .9mm; }
ul > li{ list-style:none; position:relative; }
ul > li::before{
  content:""; position:absolute; left:-2.6mm; top:1.7mm;
  width:1.2mm; height:1.2mm; border-radius:50%;
  background:var(--pink);
}
ol{ counter-reset:oln; }
ol > li{ list-style:none; counter-increment:oln; position:relative; }
ol > li::before{
  content:counter(oln);
  position:absolute; left:-5mm; top:.1mm;
  width:3.6mm; height:3.6mm; border-radius:1mm;
  background:rgba(255,46,138,.16); color:var(--pink);
  font-size:7.4pt; font-weight:800; line-height:3.6mm; text-align:center;
}
li > p{ margin-bottom:.9mm; }

/* ── Kod ──────────────────────────────────────────────────── */
code{
  font-family:"JetBrains Mono","Cascadia Mono",Consolas,"SF Mono",ui-monospace,monospace;
  font-size:.84em; background:var(--surface); color:var(--pink);
  padding:.3mm 1.1mm; border-radius:.9mm;
  border:.5pt solid var(--line);
  white-space:normal; overflow-wrap:anywhere;
}
pre{
  position:relative;
  background:var(--code-bg); color:var(--code-ink);
  border:.6pt solid var(--line); border-left:1.4mm solid var(--magenta);
  border-radius:0 1.4mm 1.4mm 0;
  padding:4.4mm 3mm 2.8mm;
  margin:0 0 2.8mm;
  font-size:7.9pt; line-height:1.44;
  page-break-inside:auto; break-inside:auto;
  text-align:left; hyphens:none; overflow:hidden;
}
pre::before{
  content:attr(data-lang);
  position:absolute; top:1.3mm; left:3mm;
  font-size:6.2pt; letter-spacing:1.8px; text-transform:uppercase;
  color:var(--ink-faint); font-family:"Inter",system-ui,sans-serif;
}
pre code{
  background:none; border:0; padding:0; color:var(--code-key);
  font-size:inherit; white-space:pre-wrap; word-break:break-word;
}

/* ── Tabele ───────────────────────────────────────────────── */
.table-wrap{ margin:0 0 3mm; page-break-inside:auto; break-inside:auto; overflow:hidden; }
tr{ page-break-inside:avoid; break-inside:avoid; }
table{
  width:100%; border-collapse:collapse;
  font-size:8.3pt; line-height:1.34; text-align:left;
  hyphens:none; -webkit-hyphens:none;
}
th{
  background:var(--surface-2); color:var(--pink);
  font-weight:700; text-align:left;
  padding:1.3mm 1.6mm; border:none;
  border-bottom:1pt solid var(--pink);
  font-size:7.4pt; letter-spacing:1px; text-transform:uppercase;
}
td{ padding:1.15mm 1.6mm; border:none; border-bottom:.5pt solid var(--line-soft); vertical-align:top; }
tbody tr:last-child td{ border-bottom:1pt solid var(--line); }
tbody tr:nth-child(even) td{ background:rgba(255,46,138,.028); }

/* ── Cytaty / callouty ────────────────────────────────────── */
blockquote{
  margin:0 0 3mm; padding:2.8mm 3.4mm;
  background:linear-gradient(100deg, rgba(255,46,138,.13), rgba(139,92,246,.08) 62%, transparent);
  border-left:1.4mm solid var(--pink);
  border-radius:0 1.4mm 1.4mm 0;
  font-style:normal; color:var(--ink);
  font-size:9.8pt; line-height:1.44;
  page-break-inside:avoid; break-inside:avoid;
}
blockquote p:last-child{ margin-bottom:0; }
blockquote strong{ color:var(--pink); }

hr{ border:0; height:.8pt; background:var(--line); margin:4.5mm 0; }

/* ── Spis treści ───────────────────────────────────────────── */
.chapter--toc{ page-break-before:always; break-before:page; }
.toc__list{ list-style:none; padding-left:0; margin:0; }
.toc__list li{ margin:0; }
.toc__l1{
  font-weight:800; margin:2.6mm 0 .8mm; font-size:10pt;
  text-transform:uppercase; letter-spacing:.4px;
  color:#fff; padding-left:3.2mm;
  border-left:1.2mm solid var(--pink);
}
.toc__l2{ margin:0 0 .5mm; padding-left:8.4mm; font-size:8.8pt; color:var(--ink-faint); }
.toc__list a{ border-bottom:0; color:inherit; }

/* ── Checkboxy ────────────────────────────────────────────── */
.cb{
  display:inline-block; width:2.9mm; height:2.9mm;
  border:.9pt solid var(--ink-faint); border-radius:.7mm;
  vertical-align:-.2mm; margin-right:1.3mm;
}
.cb--on{ background:var(--pink); border-color:var(--pink); }

/* ── Układ ────────────────────────────────────────────────── */
.sheet{
  overflow-wrap:anywhere;
  position:relative; z-index:1;
  max-width:210mm; margin:0 auto;
  padding:15mm 14mm 13mm;
  background:transparent;
  border-left:.5pt solid rgba(255,255,255,.05);
  border-right:.5pt solid rgba(255,255,255,.05);
}

@media screen{
  body{ padding:10mm 0; }
  h1,h2,h3{ scroll-margin-top:10mm; }
}

/* ── Druk / PDF ───────────────────────────────────────────────
   @page margin MUSI byc 0 — Chrome przycina tlo do pola tresci,
   wiec przy marginesach w @page czarne tlo konczylo sie na
   krawedzi kolumny, a marginesy wychodzily biale.
   Marginesy przeniesione na padding .sheet. */
@page{ size:A4 portrait; margin:0; }
@media print{
  html{ background:#000 !important; }
  body{ background:#000 !important; }
  body::before, body::after{ display:none; }
  /* Pelna plansza pod spodem. Nie polegamy na propagacji tla html/body
     do canvasu — na stronie 1 Chrome nie malowal go w ogole, przez co
     marginesy wychodzily biale. position:fixed + inset:0 w trybie
     druku obejmuje cala strone. */
  html::before{
    content:""; position:fixed; inset:0;
    background:#000; z-index:-1; pointer-events:none;
  }
  .sheet{
    max-width:none; margin:0; padding:15mm 14mm 13mm;
    background:transparent; border:none; box-shadow:none;
    overflow-wrap:anywhere;
  }
  h1,h2,h3,h4{ break-after:avoid-page; page-break-after:avoid; }
  ul,ol{ break-inside:auto; }
  html,body,.sheet,.sheet *{
    -webkit-print-color-adjust:exact; print-color-adjust:exact;
  }
}
`;

/* ── Wstawienie do build.mjs ────────────────────────────────── */

const FILE = "C:/Users/Aang/Desktop/Tweakify/ebook/build.mjs";
const { readFile, writeFile } = await import("node:fs/promises");

let src = await readFile(FILE, "utf8");
const START = "/* ── CSS";
const END = "/* ── Main";
const i = src.indexOf(START);
const j = src.indexOf(END);
if (i < 0 || j < 0) {
  console.error("Nie znaleziono bloku CSS w build.mjs");
  process.exit(1);
}
src =
  src.slice(0, i) +
  "/* ── CSS — motyw ciemny (wzorzec: FPS MAXXING) ────────────── */\n" +
  "const CSS = `" + CSS + "`;\n\n" +
  src.slice(j);
await writeFile(FILE, src, "utf8");
console.log("build.mjs: wstawiono nowy motyw (" + CSS.length + " znakow CSS).");