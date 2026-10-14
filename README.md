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
```

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