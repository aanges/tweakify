# Tweakify

Strona landing page dla usługi zdalnej optymalizacji PC i sieci pod gry.

**Stack:** czysty statyczny HTML + CSS + waniliowy JS. Bez buildu, bez zależności,
bez frameworka. Działa na GitHub Pages, Netlify, Vercel, nginx czy zwykłym hostingu FTP.

## Uruchomienie lokalne

Nie potrzebujesz Node.js ani serwera. Po prostu otwórz `index.html` w przeglądarce.

Jeśli wolisz lokalny serwer (lepsze zachowanie fetch/clipboard):

```bash
npx serve .
# albo
python -m http.server 8080
```

potem <http://localhost:8080>

## Struktura

```
index.html              # cała strona (sekcje: hero, dlaczego, cennik, proces, FAQ, CTA, stopka)
assets/css/style.css    # style — tokeny w :root, responsywność, animacje
assets/js/main.js       # menu mobilne, reveal on scroll, liczniki, sticky nav
assets/favicon.svg      # ikona
.nojekyll               # żeby GitHub Pages nie ignorował plików z kropką
ebook/                  # e-book „PIERWSZY KROK DO ABSOLUTNEJ PRZEWAGI"
```

## E-book

`ebook/` zawiera e-book w wersji skróconej — **29 stron, ~10 500 słów**.
Format docelowy to **PDF do czytania na ekranie**: ciemny motyw, jednolita
czerń na całej karcie (także w marginesach `@page`), bez szwu między
obszarem strony a kolumną tekstu.

```
ebook/PIERWSZY-KROK-DO-ABSOLUTNEJ-PRZEWAGI.md    # źródło (Markdown, jedyne źródło prawdy)
ebook/build.mjs                                  # generator Markdown -> HTML (zero zależności)
ebook/render-pdf.mjs                             # generator HTML -> PDF przez CDP (zero zależności)
ebook/PIERWSZY-KROK-DO-ABSOLUTNEJ-PRZEWAGI.html  # pośredni etap (generowany)
ebook/PIERWSZY-KROK-DO-ABSOLUTNEJ-PRZEWAGI.pdf   # plik do wysyłki (generowany)
```

### Przebudowa

```bash
node ebook/build.mjs        # .md  -> .html
node ebook/render-pdf.mjs   # .html -> .pdf
```

Wymaga **Node 22+** (globalny `WebSocket`) i Chrome lub Edge.
Żadnych zależności npm.

**Edycja:** zmieniasz **tylko** plik `.md`. `.html` i `.pdf` są nadpisywane
przy każdym przebudowaniu — nigdy ich nie edytuj ręcznie.

### Dlaczego nie `chrome --print-to-pdf`

Skrypt `render-pdf.mjs` prowadzi Chrome przez DevTools Protocol, bo wersja
CLI nie umie dwóch rzeczy istotnych dla PDF-a czytanego na ekranie:

- **`generateDocumentOutline`** — buduje **zakładki w panelu bocznym**
  czytelnika z nagłówków H1–H6 (74 wpisy w dokumencie).
- **`preferCSSPageSize`** — bierze marginesy dokładnie z `@page` w CSS.

Dodatkowo: `printBackground: true` (ciemne tło realnie trafia do PDF-a)
oraz `generateTaggedPDF: true` (struktura i dostępność dla czytników ekranowych).

Wynik: PDF z **zakładkami**, **42 klikalnymi odnośnikami** ze spisu treści,
oznaczony jako *tagged*. Wersja CLI daje te same 29 stron, ale bez zakładek.

### Uwaga o dwóch pułapkach Chrome'a

Obie kosztowały po kilka przebudów i obie trzeba znać, zanim coś „po prostu
naprawisz":

**1. `@page { margin }` musi być `0`.** Chrome przycina tło do pola treści,
więc przy marginesach w `@page` czarne tło kończyło się na krawędzi kolumny,
a marginesy wychodziły **białe**. Marginesy przeniesione na `padding` `.sheet`.

**2. `background-clip: text` wyłącza malowanie tła strony.** Na stronie, gdzie
występuje element z gradientowym tekstem, Chrome nie rysuje w ogóle tła —
cała strona wychodzi biała. Nie da się tego obejść dodatkową warstwą
(`position: fixed`, `inset: 0` — sprawdzone, nie działa). Gradient na tekście
zastąpiony: tytuł okładki jest dwukolorowy (`<span class="g-pink">`),
a gradient wchodzi w pasek pod spodem.

**3. `white-space: nowrap` na inline `code` wywołuje shrink-to-fit.** Jeden
nieprzycinający się element szerszy niż kolumna powoduje, że Chrome skaluje
**cały dokument** — PDF miał 19 stron zamiast 32, z mikroskopijnym tekstem.
Inline `code` ma `white-space: normal; overflow-wrap: anywhere`.

### Narzędzia diagnostyczne

`ebook/_verify-bg.mjs` sprawdza, czy czarne tło dociera do krawędzi każdej
kartki (czyta strumienie PDF i szuka prostokąta ≥ 97% szerokości strony).
Warto uruchamiać po każdej zmianie CSS — oko wygląda w porządku także wtedy,
gdy marginesy są białe.

### Struktura e-booka



| Rozdział | Zawartość |
|---|---|
| Wprowadzenie | Manifest marki, filozofia zerowego bloatware'u |
| 1 | Anatomia opóźnień: frame time, 1% Low, IRQ/USB/DPC, DWM, scheduler, VSync |
| 2 | Samemu vs PRO: anatomia „boostera", placebo, metodologia 6 faz |
| 3 | Mity: mocny sprzęt, więcej RAM-u, „słaby komputer jest stracony" |
| 4 | Warsztat: plan zasilania, DWM/SwapEffect, USB/polling, shader cache, BIOS, sieć |
| 5 | Filozofia, dożywotnia opieka, CTA na Discordzie |
| Aneksy | Ściągawka komend, świadczenie i zastrzeżenia |

## Co MUSISZ zmienić przed publikacją

1. ~~Link do Discorda~~ — **ustawiony** na `https://discord.gg/axtRMB4VCB`.
   Występuje w pliku `index.html` 4 razy (nav/hero/CTA/stopka). Najszybciej:
   *Podmień → Zamień w pliku*.
2. **Adres e-mail** — `kontakt@tweakify.pl` → 2 razy (`mailto:` w CTA i w stopce).
3. **Linki w nagłówku `<head>`** — odkomentuj `og:url` i `og:image` po zakupieniu domeny.
   Zrób screenshot 1200×630 jako `assets/og.png`.
4. **Liczniki** — w hero (`data-count="1240"`, `"3100"`, `"48"`, `"5"`) i w panelu
   konsoli (`214`, `12`, `128`, `4.7`, `61`). To wartości demonstracyjne. Podmień na
   swoje prawdziwe. Jeśli któraś jest prawdziwa, zostaw.
5. **Własna domena** — stwórz plik `CNAME` w katalogu głównym z jedną linią, np.
   `twojadomena.pl`. Nie dodawaj `https://` ani ścieżki.

## Wdrożenie na GitHub Pages (bez tokenu w kodzie)

Opcja A — przez GUI (najprościej):

1. Utwórz na GitHubie puste repozytorium (np. `tweakify`), **bez** README.
2. Na tej stronie przeciągnij cały folder `Tweakify` do okna przeglądarki.
3. `Settings → Pages → Source: main / (root) → Save`.
4. Strona będzie dostępna po ~1 min pod `https://<user>.github.io/tweakify/`.

Opcja B — przez `gh` CLI (zalecane, token zostaje w twoim systemie):

```bash
cd Tweakify
git init -b main
git add .
git commit -m "Tweakify landing page"
gh auth login                 # logowanie w przeglądarce, bez wklejania tokenu
gh repo create tweakify --public --source=. --push
gh api -X POST repos/:owner/:repo/pages \
  --input '{"source":{"branch":"main","path":"/"}}'
```

Jeśli `gh` zwróci błąd, Pages i tak włączy się w UI:
`Settings → Pages → Source: main / (root) → Save`.

Uwaga na PowerShell: `gh api` z `--input` działa w obu powłokach, ale wielolinijkowe
polecenie z `\` wymaga albo git-bash/WSL, albo wpisania w jednej linii.

Opcja C — Netlify / Vercel:

```bash
npx vercel --prod      # Vercel
npx netlify deploy --prod --dir .   # Netlify
```

Strona to czyste pliki statyczne, więc wszystkie trzy ścieżki działają bez konfiguracji buildu.

## Dostępność i wydajność

- Nawigacja klawiaturą, `aria-expanded` w menu, `prefers-reduced-motion` respektowane.
- FAQ na natywnym `<details>` — działa bez JS i jest indeksowane przez Google.
- JSON-LD `ProfessionalService` w `<head>` (SEO rich results).
- Jedyne żądanie zewnętrzne to Google Fonts; bez internetu strona używa fallbacków
  (`Segoe UI`, `Consolas`) i wygląda poprawnie.

## Licencja

Kod strony: do dyspozycji. Treści marketingowe i cennik to dane demonstracyjne —
upewnij się, że ceny i obietnice (np. „+48% FPS") są zgodne z prawdą i z prawem
ochrony konsumentów, zanim opublikujesz stronę publicznie.