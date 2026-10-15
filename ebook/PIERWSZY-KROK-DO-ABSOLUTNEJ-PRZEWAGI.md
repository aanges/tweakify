---
title: "PIERWSZY KROK DO ABSOLUTNEJ PRZEWAGI"
subtitle: "E-book optymalizacyjny TWEAKIFY — wersja skrócona"
author: "TWEAKIFY"
date: "2026"
lang: "pl-PL"
---

<div class="titlepage">

# PIERWSZY KROK<br><span class="g-pink">DO ABSOLUTNEJ PRZEWAGI</span>

### E-book optymalizacyjny marki **TWEAKIFY**

**Zero Lag. Maximum FPS.**

---

**Twój sprzęt nie jest słaby. Jest źle skonfigurowany.**

<div class="cover-legal">

**Materiał wyłącznie edukacyjny.** Tweakify nie ponosi odpowiedzialności za skutki samodzielnego
wprowadzania zmian w systemie, rejestrze, BIOS-ie lub sprzęcie — w szczególności za konfigurację
wykonaną samodzielnie i nieprawidłowo. Przed każdą zmianą zrób punkt przywracania i kopię rejestru.

</div>

<div class="cover-anti">

**Ten e-book jest bezpłatny.** Jeśli ktoś próbował go Ci sprzedać — zgłoś sprzedawcę odpowiednim
służbom i napisz do nas na [Discordzie](https://discord.gg/axtRMB4VCB). Pomożemy zgłosić naruszenie,
wyciągnąć konsekwencje i oddać Ci bezpłatnie to, co Ci przepadło.

</div>

</div>

# SPIS TREŚCI

# WPROWADZENIE — MANIFEST TWEAKIFY

**„Zero Lag. Maximum FPS"** to nie jest slogan. To jest **kontrakt pomiarowy** —
każdy z tych wyrazów ma dokładne znaczenie techniczne, które rozbierzemy
w tym e-booku.

**Nie sprzedajemy obietnic. Sprzedajemy pomiary.** Każda liczba w tym dokumencie
pochodzi z mechanizmu, który da się opisać na poziomie elektroniki, jądra
systemu albo protokołu sprzętowego.

**Bloatware** to oprogramowanie zbędne do pracy systemu, a mimo to instalowane,
uruchamiane i aktualizowane — zjadając cykle procesora, przepustowość pamięci
i energię. Producenci PC zostawiają go nieprzypadkiem: jest częścią modelu,
w którym liczy się gotówka z aplikacji preinstalowanych, nie cena zaślepki
procesora. **My przyjmujemy pozycję przeciwną:**

> **Każdy element systemu, który nie służy Twojej grze, jest podejrzany
> do czasu udowodnienia swojej niewinności.**

To nie znaczy „wyłącz wszystko". Znaczy: **zrozum, zmierz, dopiero potem
decyduj**. Automatyczne wyłączanie usług systemowych kończy się awarią
aktualizacji; automatyczne pozostawienie ich pozwala na kosmetyzm —
system wygląda na zoptymalizowany, a użytkownik traci kilkanaście procent,
których nawet nie zauważa.

**Dla graczy. Od graczy.** Optymalizujemy FPS, nie „ogólną wydajność".
Bezpieczeństwo jest ważne, ale nie kosztem rozgrywki — dlatego nigdy nie
mówimy „wyłącz antywirusa", tylko „skonfiguruj go, żeby nie skanował
folderu z grą".

**Zastrzeżenie:** funkcjonowanie Windowsa zmienia się między wersjami.
Wynik zależy od sprzętu, BIOS-u, sterownika i operatora sieci. **Nie gwarantujemy
konkretnego wzrostu FPS.** Nie ponosimy odpowiedzialności za samodzielne
stosowanie opisanych procedur — rób punkt przywracania.

---

# ROZDZIAŁ 1 — ANATOMIA OPÓŹNIENIA I SPADKÓW FPS

**Czym jest optymalizacja od podszewki.** Zbudujmy razem anatomię jednej klatki —
od mikrosekundowej rejestracji nacisku klawisza, przez kilkanaście etapów
w systemie, aż po zapis ładunku elektrostatycznego do matrycy monitora.
Bez tego modelu każda „poprawka" jest zgadywaniem.

## 1.1 Frame time kontra FPS — matematyka, która zmienia wszystko

**Klatka** to dla procesora nie obrazek, lecz konkretna liczba w konkretnym
miejscu pamięci. W 2560×1440 to **11 059 200 bajtów** surowych danych na klatkę.
Ta klatka musi przejść: przestrzeń adresową CPU → VRAM → blok ROP → skalowanie →
enkoder wideo → transmiter DisplayPort → kontroler monitora → bufor ramki →
tranzystory panelu. I wszystko to musi zmieścić się w **zamrożonym budżecie czasu**:

| Częstotliwość monitora | Budżet na jedną klatkę |
|---|---|
| 60 Hz | 16,67 ms |
| 144 Hz | 6,94 ms |
| 240 Hz | 4,17 ms |
| 360 Hz | 2,78 ms |

Przy 360 Hz cały potok musi zamknąć się w niecałych 2,8 ms. **Optymalizacja to
nie „sprawienie, żeby było szybciej" — to sprawienie, żeby ten budżet nigdy
nie został przekroczony.** Kiedy zostaje przekroczony, nie tracisz trochę
wydajności: tracisz **całą klatkę wizualną**.

**Czas klatki** to `frame time = 1000 / FPS` milisekund:

- 200 FPS → 5,00 ms
- 210 FPS → 4,76 ms
- 90 FPS → 11,11 ms
- 100 FPS → 10,00 ms

Z 200 na 210 FPS skracasz klatkę o **0,24 ms**. Z 90 na 100 FPS — o **1,11 ms**,
czyli ponad czterokrotnie bardziej. Wrażenie płynności jest funkcją **czasu
klatki**, nie FPS. Dlatego granica 100 FPS jest tak nieproporcjonalnie ważna —
to moment, w którym czas klatki przekracza 10 ms i wchodzi w zakres,
w którym percepcja zaczyna reagować na opóźnienie zwrotnej.

## 1.2 Percentyle: 1% Low jest jedyną uczciwą miarą

**Średni FPS jest statystycznie bezużyteczny jako miara jakości rozgrywki.**

Weźmy mecz 10-minutowy w CS2 przy 220 FPS: to ~132 000 klatek. Większość trwa
4,5 ms, ale niektóre 40 ms, a przy starciu z shotgunem 120 ms. Średnia powie Ci,
że masz świetny sprzęt — bo **średnia nie patrzy na najgorszy moment meczu**,
a to właśnie w nim rozgrywa się mecz.

Dlatego branża używa percentyli:

| Wskaźnik | Co mówi |
|---|---|
| **1% Low** | Najniższy FPS w **najgorszych 1% klatek** sesji |
| **0,1% Low** | Najgorsze 0,1% meczu |
| **Frame time 99,9%** | Czas, poniżej którego zmieściło się 99,9% klatek |

Przy 132 000 klatek 1% to **1320 klatek**. Jeśli 1% Low = 95 FPS, to w te 1320
klatkach Twój czas klatki wynosił 10,5 ms lub więcej — **ponad dwukrotnie
gorzej niż średnia**.

**Różnica między graczem za 3000 zł a graczem za 9000 zł prawie nigdy nie polega
na średnim FPS.** Oba komputery dają ~200 FPS. Różnica polega na tym, że droższy
nie ma skoków: ma płaską, stabilną krzywą.

> **Optymalizacja, która podnosi średnią o 10%, ale pogarsza 1% Low o 20%,
> jest szkodliwa.**

**Jak mierzyć (2 minuty):** CapFrameX (darmowy, open source) lub PresentMon.
Uruchom grę w stałych warunkach, 10 minut, zapis do pliku. **Obejrzyj wykres
frametime'ów, nie średnią.** Płaska linia = zdrowo. Igły do 50 ms = mikrostuttering.
Bez tego punktu odniesienia każda zmiana jest nieweryfikowalna.

## 1.3 Droga sygnału: 16 etapów od kliknięcia do piksela

```
 [1] Przełącznik          ~0,1–0,5 ms
 [2] Obwód elektroniczny  ~0,02 ms
 [3] Enkoder, delta X/Y   ~0,1 ms
 [4] Raport HID po USB    zależne od polling rate
 [5] Hub / kontroler xHCI ~0,05–1 ms
 [6] Sterownik USB        ~0,1–2 ms
 [7] Warstwa HID          ~0,05 ms
 [8] Raw input            ~0,05 ms
 [9] Filtr sterownika     ~0,1–5 ms   ← częsty problem
[10] Kolejka / DPC        0–1000+ ms  ← MIKROSTUTTERING
[11] Wątek wejściowy gry  ~0,05–0,3 ms
[12] Logika, stany        ~0,5–4 ms
[13] Render               2–15 ms
[14] Kolejkowanie / DWM   ~0,1–8 ms
[15] Transmisja po DP     ~0,1–0,5 ms
[16] Skanowanie panelu    0,5–20 ms
```

### Polling rate — i dlaczego nie działa liniowo

| Polling rate | Odstęp między raportami |
|---|---|
| 500 Hz | 2,0 ms |
| 1000 Hz | 1,0 ms |
| 4000 Hz | 0,25 ms |
| 8000 Hz | 0,125 ms |

Zwiększenie polling rate **nie skraca opóźnienia proporcjonalnie**, bo sterownik
USB pracuje w **cyklu 1-milisekundowym** (USB frame/microframe). Przy 8000 Hz
mysz raportuje 8 razy w jednym cyklu systemu, ale system przetwarza to w swoim
własnym rytmie. Realna korzyść z 4000 Hz wobec 1000 Hz to około **0,2–0,6 ms**.

**Przejście z 500 Hz na 1000 Hz jest jednym z najbardziej odczuwalnych
ulepszeń i jest darmowe** — wystarczy zmienić jedną opcję w oprogramowaniu
myszy. **Uwaga na pułapkę:** zmiana DPI często zmienia też polling rate —
zawsze sprawdzaj obie wartości.

**Warstwa 4 jest asymptotą e-sportu.** Wyższy polling rate = więcej raportów
= większe obciążenie CPU. Dlatego **1000 Hz to rekomendacja dla 90% graczy**:
zysk z 4000 Hz jest mierzalny, ale nie wart tego obciążenia, gdy gra jest CPU-bound.

### Filtr sterownika myszy — najczęstsza i najbardziej zaskakująca przyczyna input lagu

Sterownik myszy w Windows potrafi **buforować i wygładzać raporty**, żeby
kursor wydawał się płynniejszy. Filtr działa w wątku systemowym i potrafi
blokować kolejkę komunikatów, czekając na kolejny raport. W skrajnym przypadku
**dodaje kilka milisekund**. Dlatego w scenariuszach e-sportowych rekomenduje się
wyłączenie filtra i pracę na „surowym" systemie.

### DPC — miejsce, w którym rodzi się mikrostuttering

**DPC pozwala sterownikowi zaplanować wykonanie funkcji w trybie jądra**
z najwyższym priorytetem. Windows gwarantuje, że taki kod nie zostanie przerwany —
**i sterownicy często tę gwarancję nadużywają.** Źle napisany DPC trwa od ułamka
do **kilkunastu milisekund**.

**Co się dzieje w grze, gdy DPC przejmuje procesor na 3 ms?** Wątek gry nie jest
wykonywany przez 3 ms. Przy 144 Hz budżet to 6,94 ms — **zabrakło 43% budżetu**.
Klatka zostaje powtórzona (V-Sync) albo pominięta.

> **To jest mikrostuttering. Nie zbyt wysoki FPS. Nie za słaby procesor.
> Nieprzewidywalne blokowanie procesora przez sterownik.**

Najczęstsze winowajce: sterowniki Realtek'a (dźwiękowe i sieciowe), moduły
Realtek Audio Console / Nahimic / DTS, sterowniki Wi-Fi, oprogramowanie peryferiów
(G Hub, Synapse, iCUE) i aktywnie skanujące antywirusy.

**Diagnostyka:** LatencyMon (najlepsze narzędzie, daje trwaje DPC per sterownik),
WPR (wbudowane w Windows, używane przez support Microsoftu), DPC Latency Checker.

## 1.4 Praca procesora: wątek gry, render i cache

**Grafika nie jest generowana w całości przez kartę graficzną** — to stereotyp
z 1997 roku. Silnik dzieli klatkę na sekwencje o określonej liczbie milisekund:

- **Game Thread** — wejście, AI, fizyka, animacje, sieć. Krytyczny wątek główny.
- **Render Thread** — stany świata → operacje geometryczne → lista rysowania.
- **Worker Threads** — dekodowanie tekstur, meshe światła, cienie, fizyka.
- **Audio / Network Threads** — bardzo wysokie wymagania determinizmu czasu.

**Konsekwencja praktyczna:** przy gamingu wybieraj procesor o najwyższej
częstotliwości **jednordzeniowej** (boost clock), nie o największej liczbie
rdzeni. Czterordzeniowy 4,8 GHz bije ośmiordzeniowy 3,6 GHz w większości gier.

### Cache — jedna z najbardziej niedocenianych rzeczy w komputerze

| Poziom | Czas dostępu |
|---|---|
| L1d (dane) | ~0,3 ns |
| L2 | ~4–7 ns |
| L3 | ~15–20 ns |
| RAM (DDR5) | **~80–90 ns** |
| SSD NVMe | **~50 000–100 000 ns** |
| HDD | 5 000 000–15 000 000 ns |

Dostęp do L1d to 0,3 ns, a do dysku SSD to 100 000 ns — **pięć rzędów wielkości**.
Dlatego gry, które nie mieszczą się w cache'u, tracą wydajność w sposób,
który **nie ma nic wspólnego z mocą obliczeniową**, a objawia się dokładnie tak
samo: spadkami FPS.

**Wniosek praktyczny:** jeśli gra korzysta z 6 GB RAM-u, a Ty masz 8 GB,
część danych jest wyrzucana na dysk. Przy 16 GB na grę aktywnie zużywającą
12 GB wchodzisz w tryb cachowania na dysku — **dla procesora wygląda to jak
blokada na kilka milisekund**.

### Draw calle i kolejka poleceń

**Koszt draw callu leży po stronie procesora, nie karty.** Silnik, który generuje
dziesiątki tysięcy draw callów na klatkę, przy limicie jednego wątku CPU daje
setki milisekund i natychmiastowy efekt — gra działa w 5 FPS **niezależnie od
tego, jak potężna jest Twoza karta**.

**Rozpoznanie CPU bottleneck w praktyce:** obniżasz rozdzielczość — FPS się nie
zmienia; obniżasz szczegóły graficzne — rośnie niewiele; zmieniasz kółko —
bez zmian. Ale obniżasz liczbę cieni, AO, refleksji, gęstości mgły, jakość
tekstur — **rośnie znacząco**. Jeśli wszystkie cztery odpowiedzi brzmią „tak",
Twój wątek jest zablokowany.

## 1.5 Buforowanie wyświetlania: DWM, flip i frame pacing

**DWM** (Desktop Window Manager) komponuje obraz. Każda aplikacja — również gra
— nie ma bezpośredniego dostępu do ekranu: renderuje do bufora off-screen,
a DWM składa to z innymi oknami. **W grach na Windows zawsze działa dodatkowa
warstwa po kompozycji.**

### Model blit kontra flip

**BLIT (domyślny):** `[Klatka w pamięci] → kopiowanie → [Bufor ekranu] → skanowanie`
Kopia to setki MB/s przepustowości pamięci i obciążenie procesora.

**FLIP:** `[Bufor A] ←→ [Bufor B] → skanowanie` — zamiana wskaźników, ~0,01 ms.
Eliminuje koszt kopii całkowicie.

Rozwiązanie jest znane od lat. Nie każda gra używa go automatycznie: flip wymaga
obsługi DWM i sterownika, starsze Windowsy były mniej niezawodne, a tryby
okienkowe i hybrydowe (laptop z dwiema GPU) często go omijają.
**To jest miejsce, w którym warto sprawdzić, co robi Twoja gra.**

### Frame pacing — regularność jest ważniejsza niż szybkość

```
Dobre pacowanie:   klatki co 7 ms  → regularny rytm → płynny ruch
Złe pacowanie:     0, 1, 2, 40, 41, 42 ms  → ruch skokowy mimo tego samego FPS
```

Windows udostępnia mechanizm **waitable object**: aplikacja mówi systemowi
„potrzebuję 16,67 ms od momentu, gdy poprzednia klatka **została wyświetlona**".
Kluczowa różnica — liczy się czas od faktycznego wyświetlenia, nie od zakończenia
renderowania. To eliminuje jitter.

**Dlatego zbyt wysoki FPS bywa szkodliwy.** Przy renderowaniu w 3 ms na monitorze
60 Hz bez V-Syncu wysyłasz 333 klatki/s, a monitor wyświetla 60 — **23 z 24
klatek jest odrzucanych**, procesor pracuje na 100% bez powodu. Dobrze skonfigurowany
system ogranicza FPS do **częstotliwości odświeżania lub jej małego ułamka**
(np. 3× — dla 144 Hz daje 432, limitowane w praktyce do 240–300).

### VSync, Adaptive Sync i pułapka konfiguracji

**V-Sync** blokuje prezentację klatki do momentu skanowania monitora.
Eliminuje tearing, ale **dodaje opóźnienie** (16–33 ms przy 60 Hz). Jeśli czas
renderowania jest niestabilny, V-Sync powoduje **podwójne czekanie** — klatka
czeka całe 16,67 ms zamiast zostać wyświetlona później, ale wcześniej.
To klasyczny stutter pod V-Synciem.

**FreeSync / G-Sync** to zmienna częstotliwość odświeżania: monitor dostosowuje
takt do faktycznie dostarczanej liczby klatek. Eliminuje podwójne czekanie.

> **Gdy włączony jest G-Sync/FreeSync, V-Sync w grze powinien być WŁĄCZONY,
> a w panelu NVIDIA: „V-Sync" ON, „Tryb V-Sync sterownika" OFF.**

Bez V-Sync Adaptive Sync nie działa poprawnie — karta wysyła klatki „jak
najszybciej", monitor nie ma jak ich zatrzymać, i przy wzroście powyżej zakresu
nagła zmiana zachowania.

**Pułapka:** jeśli system **nie utrzymuje górnego zakresu** częstotliwości
monitora, Adaptive Sync **przestaje działać**, wracasz do V-Sync i dostajesz
podwójne czekanie. Dlatego tak mocno walczymy o **1% Low** — on decyduje,
czy Adaptive Sync jest Twoim przyjacielem, czy wrokiem.

## 1.6 Realna latencja monitora

Monitor LCD wyświetla obraz metodą **skanowania** — piksele od góry do dołu,
od lewej do prawej. W 144 Hz przejście panelu trwa 6,94 ms, więc obraz
czeka średnio połowę okresu. Deklarowany „response time 1 ms GtG" **nie jest**
opóźnieniem od sygnału do pikseli — realnie to **8–15 ms** dla monitorów
gamingowych, 4–6 ms dla najlepszych.

**Wniosek:** przejście z 60 Hz na 240 Hz daje nie tylko 4× więcej klatek, ale
też **4× mniejsze opóźnienie wyświetlania**. To często ważniejsza różnica
niż dodatkowe FPS. **Overdrive** ma tę samą wadę: zbyt silny daje overshoot
i migotanie, zbyt słaby smugi za obiektami. Oba kosztują gracza, ale w różnych
sytuacjach — w FPS-ach czytelność celów jest ważniejsza niż smugi.

## 1.7 Mitologia czyszczenia kontra inżynieria systemowa

Prześledźmy to, co naprawdę się dzieje:

> Gracz: „Komputer mi wolnieje, działał szybko." Kolega: „Wrzuć ten Optimizer.exe."
> Po instalacji FPS skacze z 90 na 130. Post udostępniony 40 tys. razy.

**Krok 1: restart.** Optymalizator i tak wymusza restart. System faktycznie
działa lepiej, ale nie dlatego, że program coś „oczyścił" — usługi drugiego
planu wstrzymały pracę, sterownik graficzny się przeładował, pliki tymczasowe
zostały zwolnione.

**Placebo i restart.** Optymalizator i tak wymusza restart — system naprawdę
działa lepiej, ale nie dlatego, że program coś „oczyścił" (szczegóły w 2.2).

**Nieskuteczność kontrolowana.** Gdyby efekt był trwały, optymalizator
byłby zauważalny. Jest odwrotnie — rekomenduje się go „raz w tygodniu", co jest
klasycznym sygnałem, że działa losowo, czyli że to placebo.

| Czynność | Realny wpływ |
|---|---|
| Usunięcie plików tymczasowych | Minimalny |
| Defragmentacja SSD | **Ujemny** (skraca żywotność, nie daje zysku) |
| „Oczyszczenie rejestru" CCLeanerem | **Brak** lub szkodliwy |
| Restart | Znaczący, ale tymczasowy |
| Wyłączenie zbędnych usług startowych | **Znaczący** (to zadanie dla fachowca) |
| Usunięcie shader cache | **Pogarsza** — patrz 4.1 |
| Plan zasilania → Najwyższa wydajność | **Znaczący** |

**O „zapełnieniu dysku":** Twój dysk nie działa wolniej dlatego, że jest pełny
w 87% — na SSD z NTFS i włączonym TRIM to nie działa. Odzyskanie utraconej
wydajności to ułamek procenta. **Minimum 15–20% wolnego miejsca** utrzymujemy
nie dla FPS, lecz dlatego, że bez tego nie zaktualizujesz systemu.

**O rozmiarze rejestru:** to mit sprzed 20 lat. Rejestr to zwykle 200–500 MB,
z czego większość jest cache'owana w RAM. **Czyszczenie rejestru to operacja,
która może uszkodzić system dla zysku równego zero.** Nie używaj CCLeanera. Nigdy.

## 1.8 Fabryczny Windows 11 i jego sabotaż

Windows 11 zawiera mechanizmy, które **aktywnie obniżają wydajność w grach** —
i robi to z uzasadnionych komercyjnych powodów, które nie są Twoimi powodami.

| Mechanizm | Koszt dla gracza |
|---|---|
| **Telemetria** (Diagtrack, Diagsched, ACA) | Zadania w tle + planowanie, kompresja, szyfrowanie; przy wysokim priorytecie potrafią blokować wątek gry |
| **Plan „Zrównoważony"** | Max stan procesora **99%** + wysokie EPP — patrz 4.4 |
| **Memory Integrity (VBS/HVCI)** | Hypervisor na warstwie każdego wywołania systemowego; do ~10% wg Microsoftu |
| **Sprite / GPU accel dla konsol** (24H2) | Regresja, wycofana po interwencji społeczności |
| **GameDVR w tle** | Przechwytywanie i kompresja ramek podczas gry |
| **SysMain (Superfetch)** | Na SSD z NVMe generuje niepotrzebny ruch dysku |
| **Fast Startup** | Na SSD zysk minimalny, ryzyko dziwnych zachowań realne |
| **Secure Boot / TPM** | Nie mierzy się jako FPS, ale blokuje część modyfikacji |

**Telemetria wyłączamy na poziomie polityki systemowej** (klucze w
`HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection`), nie przez „aplet"
w Ustawieniach — poziom Ustawień jest nadpisaniem tymczasowym, które aktualizacja
może przywrócić. Polityka jest trwała.

**To nie jest legalne unikanie płacenia za Windows** i nie wpływa na aktywację
ani licencję. Wpływa wyłącznie na gromadzenie danych. To są dwie różne kwestie.

**Memory Integrity** kosztuje tylko wtedy, gdy hypervisor jest uruchamiany.
Jeśli ją wyłączasz — rób to świadomie, z pełną świadomością konsekwencji, i miej
backup. To nie jest „hack", to decyzja o powierzchni ataku: gracz grający
wyłącznie ze Steam nie potrzebuje ochrony przed atakami na sterowniki złośliwego
oprogramowania wykorzystujące luki w jądrze.

**Zasada Tweakify:** po każdej dużej aktualizacji Windows **przetestuj ustawienia
od nowa**. Funkcje, które zostały wyłączone, bo psuły gry, **wracają** w kolejnych
aktualizacjach.

## 1.9 Podsumowanie — trzy typy przegrzania

Opóźnienie nigdy nie wynika z jednej przyczyny. Zawsze z przegrzania konkretnego
punktu łańcucha:

1. **Przegrzanie mocy** — zabrakło CPU albo GPU. W dobrym systemie rzadkie.
2. **Przegrzanie przepustowości** — zabrakło RAM-u albo PCIe.
3. **Przegrzanie harmonogramu** — **najczęstsze i najbardziej niezrozumiałe.**
   Zabrakło **determinizmu**. System ma moc i przepustowość, ale nie kontroluje
   tego, kiedy dokładnie wykonuje pracę.

**Cała ta książka jest o przegrzaniu harmonogramu.** Twój sprzęt prawdopodobnie
już wystarczy — oddajesz 10–40% jego możliwości na decyzje podjęte przez system,
którego celem nie jest Twoja czysta klatka, tylko zgodność z regulacjami
i strategią przychodową producenta.

---

# ROZDZIAŁ 2 — SAMEMU KONTRA PRO

## 2.1 Anatomia „Game Boostera"

„Game Booster" to nazwa marketingowa, pod którą ukrywa się jedna z czterech
kategorii oprogramowania. Każda działa inaczej i ma inne ryzyko — ale prawie
**żadna nie robi tego, co obiecuje**.

**1. Pobierznik sterowników i „cleanupów".** Ściąga pliki `.exe`/`.sys`/`.bat`
z niegovernmentowego serwera i uruchamia z uprawnieniami administratora.
Ryzyko: **niesygnowany kod jądra z nieznanego źródła**, bez możliwości weryfikacji.

**2. Legalny „cleaner" z monetyzacją.** Czasem robi użyteczne rzeczy, ale
wersja darmowa **wyłącza usługi systemowe**, których nie rozumie.

**3. „Registry Cleaner" + „Defragmenter".** Najbardziej niebezpieczna klasa —
miała udokumentowane skandale z systemami, które nie startowały. Zawodowcy
w ogóle ich nie używają.

**4. Złośliwe oprogramowanie (PUP/malware).** Najpoważniejsza podkategoria.

| Obietnica | Rzeczywistość |
|---|---|
| „+50% FPS" | Restart i placebo. Realnie 0–5% |
| „Usuwa bloatware" | Usuwa usługi systemowe. Często wyłącza Windows Update |
| „Optymalizuje rejestr" | Usuwa klucze, których nie zna. Ryzyko błędu startu |
| „Defragmentuje dysk" | Uruchamia defrag na SSD. Skraca żywotność |
| „Czyści pamięć RAM" | Wywołuje `EmptyStandbyList`. Tymczasowy efekt, **przed grą szkodliwy** |
| „Optymalizuje sieć" | Ustawia DNS na ich serwer (tracking) albo 8.8.8.8 |

**O „czyszczeniu pamięci RAM":** mit sprzed Windowsa 98. `EmptyStandbyList()`
zmusza system do natychmiastowego zrzucenia buforów, po czym kilka minut
odtwarza je z dysku. **Zrobione przed grą to jest dokładnie odwrotność tego,
czego chcesz** — pierwsze minuty rozgrywki idą z odtwarzania stron z dysku.

## 2.2 Cyfrowe placebo

Twoja ocena płynności gry jest subiektywna i podatna na wpływ oczekiwań.
Badania nad interfejsami pokazują, że zmiana interfejsu sugerująca szybkość
**zmniejsza czas reakcji użytkownika**, nawet gdy wydajność się nie zmieniła.
Efekt jest **asymetryczny**: poprawę zauważasz, regresję nie.

Twoje odczucie „zrobiłem 300 FPS" podlega trzem zniekształceniom:
pamiętasz dawną średnią niedokładnie; po 15 minutach mózg przyjmuje nową
wartość za normę; i **potwierdzasz hipotezę** („widziałeś? działa").

> **Twoja subiektywna ocena efektu optymalizacji jest systematycznie zawodna.**
> Dlatego w Tweakify nie pytamy „czy czujesz, że jest lepiej?".
> Pytamy: **pokaż wykres frametime'ów przed i po**.

**Jak zbudować odpornosc na placebo:** mierz zanim zmienisz cokolwiek; zmieniaj
jedną rzecz naraz; testuj identycznie; powtórz pomiar trzy razy; patrz na
**1% Low**, nie tylko na średnią.

## 2.3 Ukryte zagrożenia

**Rejestr.** Kasowanie złego klucza powoduje system, który nie startuje,
albo objawy pojawiające się **tygodnie lub miesiące później**, gdy zanika
związek przyczynowy. Programy czyszczące używają heurystyki „klucz nieużywany
od 6 miesięcy, usuwam" — a klucze nieczytane dziś bywają krytyczne jutro,
i niektóre są tworzone **wyłącznie w sytuacjach awaryjnych**.

**Usługi.** Typowy „booster" wyłącza je po prostej liście nazw, bez rozumienia:

| Usługa | Skutek wyłączenia przez „boostera" |
|---|---|
| `wuauserv` (Windows Update) | **Brak poprawek bezpieczeństwa** |
| `BITS` | Aktualizacje mogą się nie dokończyć |
| `CryptSvc` | Problemy z HTTPS, aktualizacjami, DRM |
| `SysMain` | Na HDD: spadek wydajności startu |
| `DiagTrack` | **Tu wyłączenie jest OK i zalecane** |

Lista „usług do wyłączenia" **nie istnieje w formie uniwersalnej**. Istnieje
analiza zależności. To jest praca, która zajmuje godziny, a nie kliknięcie —
i dokładnie ten powód, dla którego ta usługa kosztuje pieniądze.

**Malware.** Najczęstsza droga zakażenia u gracza to nie exploit w grze, lecz
pobranie „boostera" albo „cracka". Program jest w porządku technicznie,
nie ma antywirusa, jest powiązany z „darmową" grą, a użytkownik instaluje go
z wyłączonym antywirusem. **Konsekwencja: system zainstalowany przez niezaufane
narzędzie traktuj jako potencjalnie skażony, do czasu skanowania offline.**
Optymalizacja zaufanego systemu jest bezużyteczna, jeśli system jest skażony.

## 2.4 Booster jako generator mikrostutteringu

Mechanizm jest prosty i wyjaśnia dokładnie ten objaw, przed którym szukano leku.

**Wariant 1 — „monitoring w tle".** Program regularnie odczytuje temperatury,
częstotliwości i stan dysku. To wymaga **odpytywania sterowników systemowych**,
często z powrotem do trybu jądra. To jest dokładnie profil dostępu typowy dla DPC.

**Wariant 2 — „automatyczna optymalizacja w tle".** Cykliczne modyfikowanie
ustawień, operacje na plikach, skanowanie rejestru. Ciągła praca dyskowa
i pamięciowa na tle systemu.

> Gracz skarży się na **mikrostuttering**. Instaluje **boostera**, żeby go
> usunąć. Booster **dodaje do systemu ciągłą pracę w tle i generator DPC**.
> Mikrostuttering się **pogarsza**. Gracz dodaje **drugiego boostera**.
> System ma teraz **trzy** narzędzia walczące o ten sam zasób.

**Rozwiązanie:** odinstalować całkowicie (także usługę i autostart), usunąć
pozostałości, przeskanować offline, uruchomić LatencyMon ponownie i **porównać
wykresy przed i po**. Po zabiegu jest „prawdopodobnie lepiej". Po inżynierii
jest pomiar.

## 2.5 Metodologia Tweakify — sześć faz

Produktem, który sprzedajemy, jest **proces decydyjny**, nie skrypt.

**Faza 0 — Zabezpieczenie (bez wyjątków).** Punkt przywracania + eksport
kluczy rejestru, które będziemy dotykać + zrzut stanu systemu (usługi, autostart,
plany zasilania, wersje sterowników). **Zasada: jeśli nie jesteśmy w stanie cofnąć
zmiany w 60 sekund, nie wykonujemy jej.**

**Faza 1 — Diagnoza.** **Nie zmieniamy NICZEGO**, dopóki nie odpowiemy na pytanie:
co konkretnie dusi ten konkretny komputer? Zbieramy sprzęt, temperatury, efektywny
takt CPU, obciążenie I/O, LatencyMon, procesy w tle, plan zasilania, benchmark
bazowy z zapisem frametime'ów. **Rezultat: raport „PRZED" — zawsze.**

**Faza 2 — Hipoteza.** Przykład poprawnej: *„Plan Zrównoważony, EPP wysokie,
max stan 99% — efektywny takt spada o ~380 MHz. Hipoteza: Najwyższa wydajność
podniesie CPU-bound FPS o 5–8%."* Każda hipoteza musi zawierać: co zmieniamy,
dlaczego spodziewamy się poprawy i **jak ją zweryfikujemy**.

**Faza 3 — Zmiana.** Jedna naraz. Odwracalna (mamy komendę „cofnij"),
udokumentowana (co, gdzie, kiedy, po co), bezpieczna.

**Faza 4 — Weryfikacja.** Powtarzamy pomiar w identycznych warunkach:

| Metryka | Przed | Po | Różnica |
|---|---|---|---|
| Średni FPS | 214 | 241 | +12,6% |
| **1% Low** | 128 | **171** | **+33,6%** |
| Frame time 99,9% | 38 ms | 21 ms | −17 ms |
| Temperatura CPU | 78 °C | 71 °C | −7 °C |
| DPC maks. | 1450 µs | 210 µs | −1240 µs |

**Wzorzec, na który celujemy:** średni FPS rośnie umiarkowanie, **1% Low rośnie
znacząco**, frame time 99,9% spada dramatycznie, temperatura spada, DPC spada.

**Uwaga na oszustwo:** jeśli ktoś pokazuje wzrost średniej o 50% przy wzroście
1% Low o 5%, to prawdopodobnie **obniżył jakość obrazu**. Zniżenie jakości
zawsze daje wzrost FPS. Nie jest to optymalizacja — to obniżenie standardu.

**Faza 5 — Raport i utrzymanie.** Lista zmian z uzasadnieniem, porównanie pomiarów,
**z zaleceniami, których nie zrobiliśmy, i powodem**, punkt przywracania
i plan kontroli. Optymalizacja **nieaktualizowalna** — po aktualizacji sterownika
część ustawień może zniknąć albo zyskać nowe znaczenie.

## 2.6 Porównanie metod

| Kryterium | Metoda amatorska | Metoda Tweakify |
|---|---|---|
| Punkt wyjścia | „Komputer jest wolny" | Konkretna diagnoza sprzętu i systemu |
| Zmiany | Masowe, losowe, setki wpisów | Punktowe, jedna naraz, każda z hipotezą |
| Odwracalność | Brak — nie wiadomo, co zmieniono | Eksport rejestru + punkt przywracania |
| Pomiary | „Wygląda lepiej" | Twarde liczby: frametime, 1% Low, temperatury, DPC |
| Trwałość | Do restartu lub aktualizacji | Trwałe, z planem kontroli |
| Koszt | 350–500 zł za skryptowy booster | 40 zł / 45 zł / 75 zł (pakiety) |
| Czas | 10 sekund | 60–90 minut |

**Nie dlatego, że jesteśmy wolni — dlatego, że robimy inną pracę.**

---

# ROZDZIAŁ 3 — OBALAMY WIELKIE MITY GAMINGU

## 3.1 Mit 1: „Mam potężny sprzęt, więc optymalizacja jest zbędna"

Rozumiemy ten mit — kupno drogiego komputera daje ogromną satysfakcję.
Problem w tym, że **„jest dobrze" i „jest optymalnie" to dwa różne stany.**

Weźmy Ryzen 7 7800X3D, jedną z najszybszych jednordzeniowych jednostek do gier.
Na papierze: boost 5,0 GHz. Co robi z nim fabryczny Windows 11?

1. Używa planu **„Zrównoważony"** — z limitem **99%** i wysokim EPP.
2. **Memory Integrity ON** — hypervisor na każdym wywołaniu systemowym.
3. **Nie konfiguruje** priorytetów MMCSS pod gry.
4. **XMP/EXPO wyłączony** — pamięć działa w trybie JEDEC: DDR5-4800 CL40
   zamiast DDR5-6000 CL30.

**Skutek praktyczny:** efektywny takt pod obciążeniem jednego rdzenia
**4,4–4,6 GHz zamiast 5,0 GHz** (8–12% utraconej mocy jednordzeniowej),
pamięć o 40% gorsza pod względem opóźnienia. **Sumując: 20–30% mocy procesora,
która jest fizycznie w Twoim chipie, jest niedostępna, dopóki jej nie odblokujesz.**

### Architektura pamięci

Z 16 GB RAM realnie dostępne dla procesów jest ~13,5 GB (reszta to rezerwa
sprzętowa, pule jądra, bufory DMA i plik stronicowy). System zarządza stronami
dynamicznie i dopóki gra używa 6 GB, wszystko działa. **Problem pojawia się,
gdy aktywnie używane dane zbliżają się do granicy** — wtedy system wypycha
strony na dysk, a odczyt z NVMe to ~50–100 µs wobec 0,7 ns z RAM-u. Wątek gry
czekający na stronę z dysku to natychmiast widoczny skok frametime'u.

**Dlatego RAM-u powinno być „wystarczająco z zapasem", a nie „dokładnie tyle,
ile gra używa".**

| Sytuacja | Zalecenie |
|---|---|
| 1080p, VALORANT, CS2, LoL, Minecraft | 16 GB — absolutne minimum |
| 1440p, nowsze tytuły, multitasking, OBS | 32 GB — **zalecane minimum** |
| 4K, mody, streaming | 64 GB |

### Narzut sterownika — ukryty koszt

Typowy proces podczas gry: gra 12–22%, System 2–5%, antywirus 1–8%,
przeglądarka w tle 5–25%, Discord 2–8%.

**Te 2–8% to nie jest 2–8% wydajności.** W systemie, w którym gra jest
ograniczona przez **jeden wątek**, obciążenie wątków współdzielonych działa
nieproporcjonalnie — każdy procent CPU w tle to potencjalny procent z rdzenia,
o który walczy wątek gry. **Zamknięcie Discorda, przeglądarki i Steam przed grą
to nie fanaberka — to usunięcie konkurenta o ten sam procesor.**

## 3.2 Mit 2: „Więcej RAM-u i droższe podzespoły załatwią problem"

To najbardziej złośliwy mit, bo prowadzi do wydawania setek złotych
na rozwiązania, które nie rozwiązują problemu.

**RAM ma trzy parametry. Ludzie znają jeden.**

- **Pojemność** (GB) — ile danych pomieści.
- **Częstotliwość** (MHz) — ile operacji na sekundę. To **przepustowość**.
- **Opóźnienie** (CL) — ile cykli czekać na wynik. To **czas odpowiedzi**.

Częstotliwość i CL działają razem i tworzą jedną liczbę — rzeczywiste opóźnienie:

```
opóźnienie (ns) = (CL / częstotliwość) × 2000
```

| Konfiguracja | CL | Częstotliwość | Rzeczywiste opóźnienie |
|---|---|---|---|
| DDR5-4800 | 40 | 2400 MHz | **33,3 ns** |
| DDR5-6000 | 36 | 3000 MHz | **24,0 ns** |
| DDR5-6000 | 30 | 3000 MHz | **20,0 ns** |
| DDR5-7200 | 34 | 3600 MHz | **18,9 ns** |

Ten sam „typ pamięci DDR5", ta sama liczba modułów. **Różnica w czasie
odpowiedzi: 1,76 raza.** Gry wykonują ogromną liczbę losowych odczytów — gdy
trafiają w L3 (15–20 ns) jest dobrze, gdy w DRAM (20–33 ns) gorzej, gdy
na dysk — katastrofa. To przekłada się bezpośrednio na **1% Low**.

### XMP/EXPO — najważniejsze ustawienie w całym komputerze

Jeśli kupujesz pamięć „6000 MHz", to jest **nieprawda, dopóki nie włączysz
XMP (Intel) lub EXPO (AMD)**. Płyta startuje w trybie bezpiecznym JEDEC:
**DDR5-4800 CL40, czyli 33,3 ns zamiast 20 ns — tracisz 40% wydajności pamięci**
i zapłaciłeś pełną cenę. To najczęstszy ukryty defekt konfiguracji, jaki
widzimy w praktyce.

Profil XMP/EXPO oznacza podwyższone napięcie (1,25–1,35 V zamiast 1,1 V) —
zgodne z projektem, ale wymaga odpowiedniego chłodzenia modułów.

**Jeśli system nie startuje po włączeniu XMP:** obniż częstotliwość o jeden
krok (6000 → 5600), spróbuj zmniejszyć napięcie, dodaj napięcie SoC, a w
ostatiej kolejności wyłącz XMP. **Obowiązkowo przetestuj stabilność pamięci**
(OCCT, y-cruncher, MemTest86). Jeśli test nie przechodzi — cofnij albo obniż.

### Kanały

**Single channel → dual channel to +15–25% FPS** — największa pojedyncza
różnica pamięciowa. Na AMD AM5 są **dwa kanały**, więc dwa moduły są prawie
zawsze lepsze niż cztery. Moduły **dual-rank** (dwa niezależne zestawy kości)
dają lepszą wydajność niż single-rank, bo kontroler ma więcej operacji
do zrównoleżlenia — to jedno z miejsc, gdzie droższe naprawdę znaczy szybsze.

| Scenariusz | Wpływ |
|---|---|
| DDR5-4800 CL40 → DDR5-6000 CL30 | **+5–12% FPS** w grach zależnych od CPU |
| Single channel → dual channel | **+15–25% FPS** |
| Podniesienie częstotliwości GPU o 100 MHz | **+1–3% FPS** |

**Przeskok pamięci jest równy lub większy niż podkręcenie GPU o 100 MHz,
a kosztuje często zero — wystarczy włączyć XMP.**

### „Droższe podzespoły"

Logika się załamuje w trzech miejscach: kupujesz pod komponenty, których
scenariusz nie dotyczy; „najdroższy model" przegrywa z tańszym
(**Ryzen 9 7950X bywa wolniejszy w grach niż Ryzen 7 7800X3D**, bo tamten ma
3D V-Cache, czyli dodatkowe 96 MB L3 — różnica 15–25% na korzyść tańszego);
i kupujesz wąskie gardło, którego nie masz (karta za 12 000 zł w komputerze
z procesorem za 2500 zł daje **dokładnie ten sam** wynik co w lepszym procesorze,
jeśli gra jest GPU-bound).

## 3.3 Mit 3: „Słaby komputer jest stracony"

To najbardziej szkodliwy mit, bo **pozbawia ludzi najlepszej dostępnej
przewagi: świadomości, że mogą wygrać.**

**Powód 1 — wartość bezwzględna.** Fabrycznie 55 FPS → po optymalizacji 72 FPS
to **+17 FPS**. U kogoś mocnego: 240 → 270 FPS to +30 FPS. Procentowo słaby
sprzęt zyskuje znacznie więcej — a procentowo liczy się w rywalizacji.

**Powód 2 — słaby sprzęt jest częściej źle skonfigurowany.** Komputer
z 8 GB RAM prawie na pewno ma wyłączony XMP, plan „Zrównoważony", pełen bloatware
i nieaktywny tryb gry. **Każda z tych rzeczy to zamrożone 10–25% wydajności.**

**Powód 3 — wiedza się nie zużywa.** Kupno lepszego sprzętu to inwestycja
finansowa; optymalizacja to inwestycja w wiedzę.

**Konkretna symulacja.** Lenovo IdeaPad z i5-1135G7, 16 GB DDR4-3200 dual channel,
NVMe i Intel Iris Xe: fabrycznie **90–130 FPS** w CS2/VALORANT/Fortnite, po sesji
**130–175 FPS** przy lepszym 1% Low i niższej temperaturze. Zysk **+40%** — nie
„naprawiliśmy" sprzętu, tylko odblokowaliśmy to, co było zablokowane od fabryki.

> **W e-sporcie wygrywa nie ten, kto ma najszybszy sprzęt.
> Wygrywa ten, kto ma sprzęt najbliższy swojej maksymalnej wydajności.**

**Uczciwie:** przy procesorze sprzed 15 lat, 4 GB RAM i zintegrowanej grafice
z 2012 roku żadna ilość rejestru nie stworzy brakujących rdzeni. Ale optymalizacja
nadal ma dużą wartość: usunie bloatware, włączy tryb gry, włączy XMP, wyłączy
telemetrię, ustawi plan i priorytety. **To nie zamieni 20 FPS w 60 — ale 20 FPS
na 30, a 30 FPS w grze sieciowej to różnica między „przegrywam każdą rundę"
a „mam szansę".** Na słabym sprzęcie stabilizacja jest transformacją
doświadczenia gry.

## 3.4 Dwa mity bonusowe

**„Podkręcanie zawsze szkodzi."** Nieprawda. Najbezpieczniejsza forma —
**undervolting** — polega na obniżeniu napięcia. Każdy znak energii zamieniony
na ciepło pochodzi z zużycia mocy, więc **mniejsze napięcie → mniejsze ciepło →
wyższy takt boost**, który był ograniczony termicznie. Realnie: **10–20 °C mniej
i 5–10% więcej FPS** w grach CPU-bound, plus cichszy wentylator.
Ryzyko istnieje, ale jest kontrolowalne i odwracalne — dlatego robimy to
metodą offsetu z obowiązkowym testem stabilności i cofaniem przy niepowodzeniu.

**„Antywirus nie ma wpływu."** Nieprawda. Antywirus przechwytywuje wywołania
systemowe (minifiltr w jądrze), wstrzykuje DLL-e w procesy i skanuje w tle.
Realne liczby: Windows Defender **0–2%** (dobrze), antywirus firmowy z aktywnym
skanowaniem **3–8%**, z monitorowaniem procesów gry **5–15%**, plus booster
i „cleaner" **10–25% i mikrostuttering**.

**Rekomendacja: nie usuwaj Defendera — skonfiguruj go.** Dodaj foldery z grami
i zrzutami do wyjątków skanowania w czasie rzeczywistym, ogranicz skany
planowane do czasu, gdy nie grasz. To kompromis dający 90% zysku bez oddawania
100% bezpieczeństwa. Jeśli korzystasz z antywirusa firmowego — dodaj gry do
listy wyjątków w module optymalizacji gier, jeśli taki istnieje.

---

# ROZDZIAŁ 4 — PRAKTYCZNY WARSZTAT TWEAKIFY

**Trzy zasady na cały rozdział:** zmieniaj jedną rzecz na raz i mierz;
nie rób niczego, czego nie rozumiesz; jeśli coś pójdzie nie tak —
masz punkt odwrotu, bo zrobiłeś 4.0.

## 4.0 Zanim cokolwiek zmienisz: protokół bezpieczeństwa

**Sekcja obowiązkowa. Nie pomijaj jej.**

**Punkt przywracania:** Panel sterowania → System → Ochrona systemu → Konfiguruj
(w systemowym dysku C: włącz ochronę) → „Utwórz" → nazwij `TWEAKIFY_PRECED_OPT`.
**Weryfikacja:** data utworzenia punktu musi się pojawić. Brak daty = punkt
nie istnieje, nie zaczynaj.

**Eksport kluczy rejestru** — CMD jako administrator:

```cmd
reg export "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" "%USERPROFILE%\Desktop\backup-GraphicsDrivers.reg" /y
reg export "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile" "%USERPROFILE%\Desktop\backup-SystemProfile.reg" /y
reg export "HKCU\System\GameConfigStore" "%USERPROFILE%\Desktop\backup-GameConfigStore.reg" /y
reg export "HKLM\SOFTWARE\Microsoft\GameBar" "%USERPROFILE%\Desktop\backup-GameBar.reg" /y
reg export "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip" "%USERPROFILE%\Desktop\backup-Tcpip.reg" /y
```

**Zrzut stanu** (to jest dokumentacja Twojego systemu, której nikt nie ma):

```cmd
sc query state= all > "%USERPROFILE%\Desktop\uslugi-przed.txt"
powercfg /getactivescheme > "%USERPROFILE%\Desktop\plan-przed.txt"
reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" > "%USERPROFILE%\Desktop\autostart-przed.txt"
```

Trzy pytania przed startem: **Czy rozumiem, dlaczego robię tę zmianę?
Czy mam sposób na jej cofnięcie? Czy zmierzę efekt?** Jeśli na którekolwiek
odpowiedź brzmi „nie" — wróć do 4.0 lub napisz na Discordzie.

## 4.1 Pamięć masowa, pliki tymczasowe i cache shaderów

### Podsystem I/O — warstwy

`urządzenie → sterownik → bufor systemowy → harmonogram I/O → filtr minifiltrów
(antywirus!) → NTFS → sterownik SSD (TRIM, SMART, GC) → komórki NAND`.

Rozumienie tej warstwy wyjaśnia, dlaczego „wyczyść Temp" to 0,1% problemu,
a filtr antywirusa na I/O to 15% problemu.

### Czyszczenie plików tymczasowych

```cmd
cleanmgr /sageset:1      :: wybierz kategorie
cleanmgr /sagerun:1      :: wykonaj
:: zakładka „Wyczyść pliki systemowe" daje dostęp do ~20–50 GB pobranych aktualizacji
del /q /f /s "%TEMP%\*" 2>nul
net stop wuauserv & del /q /f /s "C:\Windows\SoftwareDistribution\Download\*" 2>nul & net start wuauserv
```

**Realny zysk: zero FPS.** Porządek i miejsce. Mniej niż nic w wydajności.

**`C:\Windows\Installer` — NIGDY nie usuwaj ręcznie.** Tam są instalatory
potrzebne do naprawy i odinstalowywania; bez niego uninstaller się załamuje.

**Prefetch:** mit sprzed Windowsa XP. Na SSD z NVMe pliki Prefetch generują
niepotrzebny ruch; **usunięcie daje efekt tylko na pierwszych kilku
uruchomieniach**, bo system je odtwarza. **Nie usuwaj ręcznie katalogu.**

### TRIM, defragmentacja i to, co naprawdę wpływa na NVMe

**TRIM to jedyna naprawdę ważna operacja na SSD.** Informuje dysk, które bloki
zwolniono. Dla HDD informacja o wolnym bloku jest oczywista; dla SSD — nie jest,
bo komórki NAND wymagają złożonego odtworzenia danych.

```cmd
fsutil behavior query DisableDeleteNotify   :: 0 = TRIM włączony, nie rób nic
```

**„Defragmentacja" SSD jest szkodliwa.** Na dysku talerzowym fragmentacja
wymaga wielu głowic. Na SSD kontroler ma wewnętrzne FTL, które samo optymalizuje
umiejscowienie danych. Uruchomienie defragmentacji wymusza pełne przeczytanie
dysku i reorganizację bloków — to **zużywa cykle zapisu NAND** (krok w stronę
końca żywotności), trwa 20–60 minut i **nie daje żadnej korzyści wydajnościowej**.

Windows 10/11 **rozpoznają SSD i robią TRIM, nie defragmentację**. Jeśli kiedyś
widzisz okno „defragmentacja trwa", to Twój dysk nie jest rozpoznany jako SSD
(np. jest w obudowie USB) albo ktoś uruchomił ręcznie. **Odpowiedź: uruchom
Optymalizację raz w tygodniu. Windows zrobi TRIM. Zignoruj.**

**Trzy rzeczy, które realnie wpływają na NVMe:**

1. **Tryb „Aggressive power management":** Menedżer urządzeń → kontrolery/dyski
   → NVMe → Właściwości → **Zaawansowane**. Ustaw **`Disabled` (0)** na desktopie.
   To wyłącza usypianie kontrolera, które powoduje opóźnienie pierwszego odczytu.
   (Nie to samo co selective suspend USB z 4.3 — to dwa osobne mechanizmy.)
2. **Wyłączenie skanowania AV dla folderu z grą.**
3. **Priorytety I/O** — patrz niżej.

### Priorytety I/O — pomijane przez 99% ludzi

Mechanizm niezależny od priorytetów CPU: proces ma priorytet I/O 0–6
(0 = najwyższy). Proces o wyższym priorytecie ma **preferowany dostęp do dysku**
niezależnie od tego, czy drugi proces czyta, czy zapisuje.

GUI: Menedżer zadań → zakładka **Szczegóły** → prawy przycisk → Ustaw priorytet →
**Wysoki** dla procesu gry i `System`. **Niski** dla indeksowania wyszukiwania
i `MsMpEng` (Defender).

**Ważne ograniczenie:** to ustawienie **nie jest trwałe** — znika po restarcie.
Dlatego trwałe rozwiązanie wymaga skryptu startowego, który ustawia priorytety
po zalogowaniu.

**Ustawienie MMCSS dla gier** (elegantsze, bo działa na poziomie harmonogramowania
i jest respektowane przez system, a nie tylko na powierzchni):

```powershell
$p = "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Multimedia\SystemProfile\Games"
Set-ItemProperty -Path $p -Name "GPU Priority"       -Value 8 -Type DWord
Set-ItemProperty -Path $p -Name "Scheduling Category" -Value 10 -Type DWord
Set-ItemProperty -Path $p -Name "Priority"            -Value 6 -Type DWord
Set-ItemProperty -Path $p -Name "SFIO Priority"       -Value 2 -Type DWord
```

### Cache shaderów — i dlaczego go NIE usuwamy przed grą

**To najczęstszy błąd w poradnikach.** Logika „cache shaderów to śmieci, usuńmy"
jest błędna co do podstaw mechanizmu.

**Shader** to mały program GPU wykonujący operację na pikselach. Karta
**kompiluje** go do kodu maszynowego — a to jest wolne: od kilku milisekund
do kilkudziesięciu. Lokalizacje cache: `%LOCALAPPDATA%\D3DSCache`,
`%LOCALAPPDATA%\NVIDIA\DXCache`, `...\GLCache`, `%LOCALAPPDATA%\AMD\DxCache`.

**Co się dzieje po usunięciu:** GPU nie ma skompilowanych shaderów, więc
kompiluje je **w locie podczas gry**, blokując całą klatkę przy każdym
nowym materiale. Efekt: **pierwsze 2–10 minut gry to micro-stutter w klastrach.**
Nie da się tego uniknąć. Po 10 minutach wszystko jest skompilowane.

**To jest dokładnie odwrotność tego, czego chcesz.** Usunięcie cache przynosi
10 minut lagów — strata pewna i czysta.

**Kiedy usuwanie JEST uzasadnione:**

- **Błąd sterownika / artefakty** (czarne modele, różowe textury) —
  klasyczny objaw uszkodzonego shadera. Usunięcie = naprawa.
- **Aktualizacja sterownika** — sterowniki zwykle same czyścią cache,
  ale nie zawsze.
- **Brak miejsca na dysku** — cache potrafi zajmować 200 MB – 10 GB.

```cmd
:: Zamykaj gry i klienta Steam/Epic. W tygodniu, gdy nie planujesz sesji.
del /q /f /s "%LOCALAPPDATA%\D3DSCache\*" 2>nul
del /q /f /s "%LOCALAPPDATA%\NVIDIA\DXCache\*" 2>nul
del /q /f /s "%LOCALAPPDATA%\NVIDIA\GLCache\*" 2>nul
del /q /f /s "%LOCALAPPDATA%\AMD\DxCache\*" 2>nul
```

Cache jest odtwarzalny — usunięcie nie uszkodzi gry ani sterownika.
**Rekomendacja Tweakify: robimy to tylko przy (a) i (b), i zawsze informujemy,
że następne 2–10 minut gry będzie miało mikro-stutter. Decyzja należy do klienta.**

### Podsumowanie sekcji 1

| Czynność | Efekt | Rekomendacja |
|---|---|---|
| Czyszczenie Temp | ~0 FPS, porządek | Raz na jakiś czas |
| Usuwanie Prefetch ręcznie | 0 FPS | **Nie** |
| Włączenie TRIM | Kluczowe dla SSD | Sprawdź |
| Defragmentacja SSD | Szkodliwa | **Nigdy** |
| Aggressive power mgmt NVMe → Disabled | Mniejsze opóźnienie I/O | Tak, na desktopie |
| Wyłączenie skanowania AV dla gry | 2–8% FPS, mniej DPC | Tak |
| Priorytety I/O + MMCSS | Lepsze ładowanie, wyższe 1% Low | Tak |
| Czyszczenie cache shaderów | **Pogarsza** (10 min stutteru) | Tylko przy błędach |
| „Czyszczenie rejestru" | Ryzyko bez zysku | **Nigdy** |

## 4.2 Inżynieria okien systemu: DWM i SwapEffect

**Ostrzeżenie.** To jedna z nielicznych sekcji, gdzie **konkretne wartości
nie mają jednoznacznego znaczenia we wszystkich konfiguracjach.** Klucz jest
interpretowany przez sterownik karty, a sterownik jest inny dla NVIDIA, AMD
i Intela i zmienia się między wersjami. **Dlatego stosujemy metodę pomiarową:
ustawiamy → mierzymy → decydujemy.**

**Dlaczego flip jest szybszy:** w modelu BLIT aplikacja renderuje do bufora,
a system **kopiuje** go do bufora ekranu — setki MB/s przepustowości pamięci
i obciążenie procesora. W modelu FLIP system **zamienia wskaźniki** między
dwoma buforami: operacja trwa mikrosekundy zamiast milisekund.

**Dlaczego nie każda go używa:** flip wymaga obsługi DWM i sterownika; starsze
Windowsy były mniej niezawodne; tryby okienkowe i hybrydowe (laptop z dwiema
GPU) go omijają. **To jest miejsce, w którym warto sprawdzić, co robi Twoja gra.**

### Klucz `DwmSwapEffect`

```
HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers
```

Wartość `DwmSwapEffect` (DWORD). Interpretowane wartości:

| Wartość | Znaczenie wg powszechnej praktyki |
|---|---|
| `1` | Disable — wymuszenie trybu legacy / blit |
| `2` | Enable — wymuszenie flipu dla wspomaganych gier |
| `3` | Enable (DWM managed) |
| `4` | Disable DWM effects (force blit) |
| `5` | **Force GPU composition (force flip)** |

> **Uwaga:** wartości `1`/`4` i `2`/`3` są w różnych źródłach interpretowane
> różnie; historia tego klucza jest długa i pełna niejasności, a starsze
> sterowniki NVIDIA interpretowały `2` i `3` inaczej niż obecne.
> Dlatego zamiast cytować „autorytatywne" tabelki, **mierzymy.**
> Pokrewny klucz: `DwmSwapEffectPriority`.

**Nowsze sterowniki NVIDIA mają własne mechanizmy flipu, które mogą nadpisywać**
ustawienie z rejestru. Dlatego testowanie jest obowiązkowe.

### Procedura testowa

```cmd
:: 1. Odczytaj i ZANOTUJ aktualną wartość
reg query "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v DwmSwapEffect

:: 2. Ustaw flip model
reg add "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v DwmSwapEffect /t REG_DWORD /d 5 /f

:: 3. Restart jest WYMAGANY (klucz jest czytany przy inicjalizacji podsystemu graficznego)
shutdown /r /t 0

:: 4. Powtórz pomiar w 10-minutowym boju, porównaj 1% Low i frame time 99,9%
```

| Wynik | Decyzja |
|---|---|
| 1% Low wzrósł, frame time 99,9% spadł | **Zostaw** |
| Nic się nie zmieniło | Sterownik neutralizuje ustawienie; przetestuj inną wartość lub cofnij |
| FPS spadły lub artefakty | **Cofnij natychmiast** |

**Przywrócenie wartości domyślnej** (najczystsze cofnięcie — nie zostawia
wpisu z „dziwną" wartością):

```cmd
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v DwmSwapEffect /f
shutdown /r /t 0
```

### Fullscreen Optimization (FSO)

Od Windows 10 gra okienkowa zajmująca niemal cały ekran może zostać
automatycznie przełączona w tryb pełnoekranowy. **Problemy:** niektóre gry
gorzej w FSO niż w borderless, potrafi włączyć V-Sync, powoduje mikro-stutter
przy przełączaniu okna.

```cmd
reg add "HKCU\System\GameConfigStore" /v GameDVR_FSEBehaviorMode /t REG_DWORD /d 2 /f
reg add "HKCU\System\GameConfigStore" /v GameDVR_DXGIHonorFSEWindowsCompatible /t REG_DWORD /d 1 /f
reg add "HKCU\System\GameConfigStore" /v GameDVR_HonorUserFSEBehaviorMode /t REG_DWORD /d 1 /f
```

**Efekt:** gra działa w trybie okienkowym bez FSO — nie daje przyspieszenia,
ale **eliminuje mikro-stutter przy alt-tab** i daje przewidywalne zachowanie.

**Prawda o tej sekcji:** `DwmSwapEffect` daje realny, ale niewielki zysk na
nowoczesnych systemach z nowymi sterownikami; na sprzęcie sprzed 2019 roku zyski
były znacznie większe. **Najczęstszy realny zysk tej sekcji to nie FPS,
a eliminacja mikro-stutteru i stabilizacja frame pacingu.**

## 4.3 Walka z input lagiem peryferiów

### Selective Suspend — mechanizm, dlaczego szkodzi

Opisany w specyfikacji USB 2.0: gdy urządzenie nie wykazuje aktywności,
kontroler **wstrzymuje port** — wyłącza taktowanie i zasilanie linii danych.
Przy nadejściu aktywności kontrolor musi wykryć sygnał, **obudzić port**,
**zrestartować urządzenie** i przesłać pierwszy raport.

**Latencja wstrzymania w specyfikacji: typowo 10 ms, maksymalnie 250 ms.**
W praktyce na desktopie obudzenie trwa 0,5–3 ms — prawie niezauważalne,
ale w e-sporcie zabiera realną przewagę. W praktyce wiele sterowników ma
też **błędy**, przez które obudzenie trwa znacznie dłużej albo urządzenie
zawiesza się i wymaga resetu fizycznego.

**Dlaczego to jest włączone domyślnie?** Producenci OEM muszą spełniać wymagania
ENERGY STAR i EPEAT dotyczące zużycia w trybie czuwania. **Dlaczego to szkodzi
na desktopie?** Bo podłączony do zasilania sieciowego **nie ma żadnego powodu
oszczędzać energii portu.**

### Wyłączanie — Menedżer urządzeń

`devmgmt.msc` → **Kontrolery uniwersalnej magistrali szeregowej USB**.

**Ścieżka A — urządzenia:** rozwiń gałąź, kliknij prawym na **swoją mysz**
(zwykle są dwa wpisy: HID i mysz z dodatkowymi przyciskami), potem klawiaturę
i kontroler gamedev → **Właściwości → zakładka „Zarządzanie energią"** →
**odznacz** „Zezwalaj komputerowi na wyłączenie tego urządzenia w celu
oszczędności energii" → Zastosuj.

**Ścieżka B — kontrolery:** powtórz dla wpisów typu **„Główny koncentrator USB"**,
**„Kontroler hosta USB typu xHCI"**, eHCI, OHCI. Na niektórych systemach
zakładka się nie pojawia — wtedy użyj ścieżki C.

**Ścieżka C — powercfg** (alternatywa globalna):

```cmd
:: AC = wyłącz (0), DC = wyłącz (0). Na laptopie: DC=2 (zostaw optymalizację na baterii)
powercfg /setacvalueindex SCHEME_CURRENT SUB_USB 2a737441-1930-4402-8d77-b2bebba308a3 0
powercfg /setdcvalueindex SCHEME_CURRENT SUB_USB 2a737441-1930-4402-8d77-b2bebba308a3 0
powercfg /setactive SCHEME_CURRENT
```

**Weryfikacja stanu:** `powercfg /q SCHEME_CURRENT SUB_USB 2a737441-1930-4402-8d77-b2bebba308a3`

### Bluetooth — ukryty wróg na laptopach

Sterowniki Bluetooth (Intel, Realtek) **wykonują skanowanie w tle** —
ciągłe pakiety promocyjne, nawet gdy nie ma podłączonych urządzeń. Te pakiety
przechodzą przez stos USB. Generuje to **regularne DPC i mikrostuttering**,
a Windows „usprawnia" to oszczędzaniem energii, co dodaje cykle obudzenia.

**Opcja 1:** `Menedżer urządzeń` → `Bluetooth` → Właściwości → odznacz
„Zezwalaj komputerowi na wyłączenie tego urządzenia".
**Opcja 2 (laptopy z Intelem):** w BIOS-ie wyłącz **Intel Bluetooth TiWiFi**.
**Opcja 3:** jeśli używasz dongla USB — przełóż na port USB 2.0.

### Polling rate i akceleracja

Polling rate ustawiasz w oprogramowaniu producenta (G HUB, Synapse, iCUE,
SteelSeries Engine). **Zmiana DPI nie zawsze zmienia polling rate i odwrotnie —
sprawdzaj obie wartości po każdej zmianie.** Zweryfikuj pomiarem (np. `mouse-rate.com`)
albo diodą LED w myszy.

| Polling rate | Zalecenie |
|---|---|
| 500 Hz | Minimum dla e-sportu |
| **1000 Hz** | **Standard — rekomendacja dla 90% graczy** |
| 4000/8000 Hz | Eksperymentalne: realny zysk mały, obciążenie CPU duże |

**Wyłącz akcelerację myszy w Windows:** Ustawienia → Bluetooth i urządzenia →
Mysz → dodatkowe ustawienia → Opcje dodatkowych przycisków → zakładka
„Opcje wskaźnika" → **odznacz „Włącz USTAWIENIE PRĘDKOŚCI wskaźnika"**.

To jest **softwareowa predykcja ruchu** w sterowniku systemowym, która
interweniuje w raporty myszy. W grach FPS to katastrofa: **celownik pójdzie
dalej niż powinieneś.** Nowoczesne silniki używają Raw Input, który tę ochronę
daje; starsze tytuły na DirectInput — nie.

### Oprogramowanie peryferiów w tle

G HUB, Synapse, iCUE, Engine, Armoury Crate: usługa w tle, wstrzykiwanie
DLL-i do procesów (w tym do gier), regularne odpytywanie sprzętu przez USB
w trybie użytkownika, globalne hooki, aktualizacje w tle. Każdy element to
potencjalne źródło obciążenia, mikrostutteringu, DPC i konfliktu z filtrem myszy.

**Rekomendacja:** konfigurujesz i zamykasz aplikację główną przed grą.
Przy mikrostutteringu lub słabym sprzęcie — **całkowicie odinstaluj program
w tle** i pracuj na ustawieniach zapisanych w pamięci urządzenia.

## 4.4 Plan zasilania — najczęściej pomijany i najwyżej opłacalny element

**Jeśli miałbyś zmienić jedną rzecz w swoim systemie — zrób to tutaj.**

### Dlaczego „Zrównoważony" szkodzi

**a) Pułapka 99%.** Maksymalny stan procesora to **99%, nie 100%**. Regulator
w CPU „widzi", że nigdy nie osiąga 100%, i aktywnie trzyma rdzenie poniżej
maksymalnego boostu. Po zmianie na 100% wielu użytkowników raportuje **+5–10%**
w grach CPU-bound na Ryzenach.

**b) EPP (Energy Performance Preference).** Parametr 0–255, gdzie 0 = maksymalna
wydajność. Domyślnie w planie Zrównoważonym to **40–128**. Mechanizm jest
anty-intuicyjny: przy wysokim EPP procesor **celowo** nie wchodzi w boost przy
krótkich, intensywnych skokach obciążenia — a scenariusz gry to **dokładnie
taki wzorzec**.

**c) Rezerwa rdzeni.** Windows rezerwuje 1 rdzeń dla systemu; przy obciążeniu
wszystkich rdzeni zabiera go z puli aplikacji, powodując skoki wydajności.

**d) PCIe Link State Power Management.** Gdy GPU nie pracuje, łącze jest
uspijane i potrzebuje czasu na wybudzenie — objawia się jako opóźnienie
pierwszych klatek po wejściu do walki.

### Aktywacja planu

Windows 11 **ukrywa plan „Najwyższa wydajność" (Ultimate Performance)** domyślnie:

```cmd
:: Utwórz go z ukrytego szablonu
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61

:: Sprawdź GUID w `powercfg /list`, potem aktywuj:
powercfg /setactive <GUID-twojego-planu>

:: Alternatywa (plan widoczny, bez tworzenia nowego):
powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c   :: "Wysoka wydajność"
```

**Uwaga dla laptopów:** plan „Najwyższa wydajność" **wyłącza stan uśpienia
na baterii** — laptop zużywa baterię w mniej niż godzinę. Na laptopach użyj
„Wysoka wydajność" + dostrojenie ręczne.

### Dostrojenie parametrów (AC = zasilacz, DC = bateria)

**Desktop (AC):** min. stan procesora **100%**, max **100%**, EPP **0**,
boost mode **Aggressive**, rezerwa rdzeni **0**, cooling policy **Active**.

**Laptop:** AC — min 5%, max 100%, EPP 20–40, rezerwa 1 rdzeń;
DC — max 90%, EPP 80+ (oszczędzanie).

```cmd
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 2
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFEPP 0
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 100
powercfg /setdcvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 5
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 100
powercfg /setdcvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMAX 90
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR SYSCOOLPOL 1
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR CPMINCORES 0
powercfg /setactive SCHEME_CURRENT     :: BEZ tego zmiany nie zaczynają obowiązywać
```

### C-states

**C-states** to mechanizm oszczędzania energii procesora. C0 = praca,
C6 = głęboki sen z wyłączonymi zegarami. Obudzenie z C6 trwa **dziesiątki
mikrosekund** — przy budżecie 4,17 ms (240 Hz) to jest realne i mierzalne.
Więcej C-states = mniej ciepła w idle, **większe opóźnienie wybudzenia**.

**Na desktopie podłączonym do zasilania C-states są bezużyteczne.**
Na laptopie dyskusyjne (krótsza bateria).

**Wyłączanie:** najlepiej **w BIOS-ie** (`Advanced → CPU Configuration →
C-States` / `Tweaker → C-State Support`), gdzie jest bezpieczniejsze.
Z systemu: `Menedżer urządzeń` → rozwiń **Procesory** → Właściwości →
**Zarządzanie energią** → odznacz „Zezwalaj komputerowi na wyłączenie
tego urządzenia".

**Ostrzeżenie:** bezpośrednia manipulacja stanami C w rejestrze może powodować
**zawieszanie systemu** na niektórych płytach. Dlatego robimy to w BIOS-ie.

**Zysk planu zasilania i C-states to najwyższa zwrotna pojedyncza zmiana
w całym e-booku: +5–15% FPS z planem, +1–4% 1% Low z C-states.**

## 4.5 Tryb gry, HAGS i nadzór

**Game Mode** — gdy gra jest rozpoznana, system wstrzymuje wybrane usługi
aktualizacji **podczas rozgrywki**, ustawia priorytety I/O procesu gry na Wysoki,
wyłącza nagrywanie w tle i resetuje QoS. **Mechanizm krytyczny: wstrzymanie
usług aktualizacji i diagnostyki na czas gry.**

```cmd
reg add "HKLM\SOFTWARE\Microsoft\GameBar" /v AutoGameModeEnabled /t REG_DWORD /d 1 /f
reg add "HKLM\SOFTWARE\Microsoft\GameBar" /v AllowAutoGameMode /t REG_DWORD /d 1 /f

:: Game DVR OFF (nagrywanie w tle działa nawet, gdy go nie używasz)
reg add "HKCU\System\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f
reg add "HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f
```

**Jeśli używasz Game Bar do nagrywania rozgrywki — nie wyłączaj go**; skonfiguruj
go tak, żeby nagrywał tylko w grze. Do nagrywania używaj OBS/ShadowPlay,
które robią to samo lepiej i wydajniej.

**HAGS** (Hardware-Accelerated GPU Scheduling) pozwala zarządzać kolejką pracy
GPU na poziomie sprzętowego procesora GPU, zamiast w systemie operacyjnym.
**Kontrowersja: HAGS nie jest jednoznacznie korzystny** — jedni raportują
+5–10%, inni pogorszenie i mikro-stutter. **Testuj oba i mierz 1% Low.**

```cmd
reg add "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f   :: ON
reg delete "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v HwSchMode /f                  :: przywróć domyślne
shutdown /r /t 0
```

| Zmiana | Zysk | Ryzyko | Rekomendacja |
|---|---|---|---|
| Game Mode ON | +2–5% FPS | Niskie | **Zalecane** |
| Game DVR OFF | Mniej CPU/dysku w tle | Niskie | **Zalecane** |
| HAGS ON | +0–10% FPS (lub −5%) | Niskie | **Testuj obie** |
| Memory Integrity OFF | +0–8% FPS | **Średnie** | Świadoma decyzja |

## 4.6 BIOS: pamięć, HPET, SMT i undervolting

**XMP/EXPO** — patrz 3.2. Znajdź w BIOS-ie `Overclocking` / `AI Tweaker` /
`Extreme` → ustaw **`Profile 1`** (nie `Profile 2`, który jest trybem oceny
trwałości producenta). Po restarcie **weryfikuj aktywną konfigurację**
(`CPU-Z → Memory`) i **przetestuj stabilność**. Jeśli nie przechodzi —
obniż częstotliwość o jeden krok, spróbuj zmniejszyć napięcie, dodaj napięcie
SoC (na Ryzenach często bardzo pomaga), w ostatejności wróć do JEDEC.

**HPET kontra TSC.** TSC to licznik wbudowany w procesor, częstotliwość stała.
HPET to układ na płycie głównej, 10 MHz, z odczytem przez MMIO.
Legenda „HPET = lepsze FPS" pochodzi z czasów Windows XP/7.
**Na nowoczesnych procesorach (Zen 3+, Intel 12+) TSC jest na tyle dobry, że
HPET często daje gorsze wyniki**, szczególnie w opóźnieniach wejścia.
**Rekomendacja: domyślnie NIE włączamy HPET — mierzymy z i bez.**

```cmd
bcdedit /set useplatformclock false    :: false = TSC (domyślnie zalecane)
bcdedit /deletevalue {current} useplatformclock   :: przywrócenie
```

**Unikaj `useplatformtick`** — wyłącza platformowy tick timer i może powodować
zawieszki na wielu systemach.

**SMT / Hyper-Threading.** Kolejny popularny mit. **Nowoczesne procesory
używają SMT efektywnie** — wyłączenie na Ryzenach 5000/7000 często **pogarsza**
wydajność o 3–8%. Na Zen 1/2 (4-wątkowe SMT) wyłączenie pomagało o 5–10%.
**Na nowoczesnych procesorach zostawiaj włączony. Zmień i zmierz, jeśli chcesz
sprawdzić.**

**Undervolting — jedyna podkręcenie, które rekomendujemy domyślnie.**
Procesor dostaje napięcie fabryczne z dużym marginesem dodanym na
najgorszy egzemplarz, najgorszą temperaturę i lata. Obniżamy napięcie
o offset — procesor pracuje na mniejszym marginesie, wciąż stabilnie.
**Mniejsze napięcie → mniejsza moc → mniejsze ciepło → wyższy boost.**
Procedura: Ryzen Master → zakładka Undervolt → zacznij od **−50 mV** →
wbudowany test stabilności → −100 mV → test → znajdź największe ujemne
offset, które przechodzi. **Test musi trwać dłużej niż 30 minut**
i obciążać rdzenie CPU, nie tylko GPU. Alternatywnie Curve Optimizer w BIOS-ie
(−10, −20, −30 na wszystkich rdzeniach, krok po kroku). **Jeśli test nie przechodzi
— cofnij.**

| Zmiana BIOS | Zysk | Ryzyko |
|---|---|---|
| XMP/EXPO ON | **+5–15%** | Niskie |
| C-states OFF | +1–4% 1% Low | Niskie |
| HPET ON | −5% do +3% | Niskie |
| SMT OFF | −5% do +8% | Niskie |
| Undervolting | +3–10% FPS, −10–20 °C | Niskie |
| Overclocking CPU | +5–20% | Średnie |

## 4.7 Sieć: DNS, MTU, Nagle i firewalle

**Optymalizacja sieci ma inną naturę.** Pingu i jitteru nie da się „usunąć" —
da się poprawić to, co jest w Twojej kontroli. Liczą się trzy rzeczy:
**ping** (średni RTT), **jitter** (wahania — **ważniejszy dla jakości
rozgrywki niż średni ping**) i **packet loss**. Gracz reagujący na różnych
stymulacjach jest gorszy niż gracz z przewidywalnym opóźnieniem.

**DNS** — domyślny DNS operatora bywa throttlowany, szczególnie w szczycie.
Cloudflare `1.1.1.1`, Quad9 `9.9.9.9` (szybki + filtruje malware), Google
`8.8.8.8`. Włącz też **DNS over HTTPS** w Ustawieniach.

```cmd
netsh interface ip set dns "name=Ethernet" static 1.1.1.1
netsh interface ip set dns "name=Ethernet" static 1.0.0.1 primary
```

**Zmiana DNS nie zmienia pingu do serwera gry** — wpływa tylko na rozwiązywanie
nazw. Realny efekt: 5–50 ms mniej opóźnienia przy łączeniu, zero zmian w rozgrywce.
To jest częsty błąd pojęciowy.

**MTU** — 1500 bajtów standardowo. Jeśli pakiet jest większy niż MTU na
jakimkolwiek routerze w trasie, zostaje **pofragmentowany** (drogo, zwiększa
ryzyko utraty). Path MTU Discovery często nie działa, bo routery ignorują ICMP.
**Rozwiązanie: ustaw MTU niżej — ale zmierz, nie zgaduj.**

```cmd
ping 8.8.8.8 -f -l 1472   :: 1472 + 28 nagłówka = 1500
ping 8.8.8.8 -f -l 1464
ping 8.8.8.8 -f -l 1452   :: pierwsza wartość BEZ utraty = bezpieczna MTU
netsh interface ipv4 set subinterface "Ethernet" mtu=1472 store=persistent
```

**MTU dotyczy konkretnej trasy** — różne serwery = różne trasy. Ustawienie za
niskie zmniejsza przepustowość, nie zmienia pingu; za wysokie powoduje fragmentację.

**Nagle's Algorithm** to starszy algorytm TCP, który **wstrzymuje kolejne małe
pakiety** do potwierdzenia. Pakiety głosowe i pozycje gracza są małe, więc
Nagle dodaje **kilkadziesiąt milisekund**. Rozwiązanie — wyłącz (w panelu
adaptera: „Zaawansowane → Wyłącz Nagle'a", albo rejestrem):

```cmd
:: GUID interfejsu: netsh interface ipv4 show interfaces
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\{GUID}" /v TcpAckFrequency /t REG_DWORD /d 1 /f
reg add "HKLM\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces\{GUID}" /v TCPNoDelay /t REG_DWORD /d 1 /f
```

**Efekt: mniejszy jitter w transmisji głosowej. Efekt na ping: zero** —
Nagle nie wpływa na propagację, tylko na opóźnienie wysyłania.

**Autotuning TCP: nie ruszaj tego, co działa dobrze.** Domyślne `normal` jest
poprawne; wyłączenie RSS jest **błędem** (pozwala rozłożyć obciążenie na wiele
rdzeni i zmniejsza jitter). Heuristics wyłącz tylko przy **dużym opóźnieniu
i dużej przepustowości** (fiber 1 Gbps transatlantycki) — na typowym polskim
łączu efekt jest minimalny.

```cmd
netsh int tcp set global autotuninglevel=normal
netsh int tcp set global rss=enabled
netsh int tcp set global congestionprovider=dctcp   :: lepszy na łączach domowych
netsh interface tcp set heuristics disabled         :: tylko przy dużym RTT+przepustowości
```

**Reguły firewalla dla gier** — `dir=out action=allow` dla konkretnego programu
**nie jest wyłączeniem firewalla** (nie otwiera portów na świat), tylko pozwala
na ruch wychodzący bez inspekcji. Mniejsze opóźnienie wychodzących pakietów.

```cmd
netsh advfirewall firewall add rule name="Tweakify - VALORANT" dir=out action=allow program="C:\Riot Games\VALORANT\live\VALORANT.exe" enable=yes profile=any
```

**Czego NIE robimy:** nie zmieniamy MAC ani TTL (brak wpływu), nie używamy
„ping boosterów" (placebo), nie obiecujemy „−50 ms pingu" i nie włączamy
„Network Throttling Disable" bez wyjaśnienia ryzyka. Realistyczne oczekiwania:
**5–20 ms redukcji pingu, 20–50% redukcji jitteru** — więcej zależy od operatora
i trasy, a nie od naszych ustawień.

## 4.8 Checklista 20 punktów TWEAKIFY

Kolejność zmian. Zawsze z 4.0 i z pomiarem.

**Fundament (największy zysk):**
- 1. Punkt przywracania + eksport kluczy rejestru
- 2. Plan zasilania → Najwyższa wydajność
- 3. Maksymalny stan procesora **100%** (nie 99%) · 4. EPP = **0** · 5. Boost = **Aggressive**
- 6. **XMP/EXPO włączone** + test stabilności pamięci

**Wejście:**
- 7. Polling rate **1000 Hz** (zweryfikowany)
- 8. Selective suspend **off**: mysz, klawiatura, kontrolery USB
- 9. Akceleracja myszy **off** · 10. Program peryferiów wyciszony lub odinstalowany
- 11. Bluetooth selective suspend **off** (lub moduł wyłączony)

**Wyświetlanie i GPU:**
- 12. Game Mode ON, Game DVR OFF
- 13. HAGS przetestowany w obie strony (zmierz 1% Low)
- 14. `DwmSwapEffect` przetestowany — zmierz, oceń, ewentualnie cofnij
- 15. V-Sync **ON** gdy G-Sync/FreeSync ON · 16. Limit FPS do 3× refresh

**Stabilność i sieć:**
- 17. Priorytety I/O (gra = Wysoki, tło = Niski) · 18. MMCSS dla Games
- 19. DNS → Cloudflare/Quad9 + DoH
- 20. Nagle off + TcpAckFrequency + reguły firewalla dla gier

**Bonus:** undervolting z testem stabilności, C-states off w BIOS-ie,
Memory Integrity off (świadoma decyzja), MTU dostrojony do serwera.

**Nie rób wszystkich 20 naraz.** Rób po 2–3, mierz, notuj. Zmiana 20 ustawień
bez pomiaru jest **gorsza niż brak zmian**, bo nie wiesz, co zadziałało.

---

# ROZDZIAŁ 5 — FILOZOFIA I PRZYSZŁOŚĆ TWEAKIFY

## 5.1 Dla graczy. Od graczy.

**„Dla graczy"** — oznacza, że każda decyzja techniczna jest podejmowana
z perspektywy gracza, nie administratora systemu. Optymalizujemy FPS, nie
„ogólną wydajność". Bezpieczeństwo jest ważne, ale nie kosztem rozgrywki.
Gracz nie ma czasu na analizę — dlatego robimy to z Tobą, na Twoim ekranie.
Gracz musi rozumieć, co się dzieje z jego sprzętem — dlatego ten e-book istnieje.

**„Od graczy"** — oznacza, że jesteśmy częścią tej samej społeczności.
Na Discordzie omawiamy sprzęt, testy stabilności i nieznane funkcje sterowników.
To jest społeczność techniczna, nie helpdesk korporacji.

**Czego NIE jesteśmy.** Nie jesteśmy „magicznym programem" — takie nie istnieją,
a te, które udają, psują systemy. Nie jesteśmy gwarantem określonego wyniku FPS,
bo nie istnieje komputer, na którym można to zagwarantować; **jesteśmy gwarantem
metody i wykonanej pracy**. Nie pracujemy bez Twojej zgody. Nie sprzedajemy placebo:
jeśli mówimy, że coś zrobimy, to zmierzymy efekt, a jeśli nie ma efektu —
powiemy „nie dało wyniku" i **wycofamy zmianę**.

**To jest różnica między marką, która rośnie, a marką, która zostaje zbanowana
w ciągu tygodnia.**

## 5.2 Dożywotnia opieka serwisowa

**Kontekst:** optymalizacja nie jest nieaktualizowalna. Windows się aktualizuje,
sterowniki się zmieniają, nowe gry mają inne wymaganie.

**Kiedy piszesz do nas (bez dodatkowych opłat):** regresja po aktualizacji;
nowa gra wymagająca innego profilu; upgrade sprzętu (konieczne jest przeniesienie
i dostosowanie ustawień); wątpliwość merytoryczna („robicie to? powinienem?");
diagnoza problemu, który pojawił się po miesiącu; nowy tytuł na Steamie.

**Czego opieka NIE obejmuje — szczerość przede wszystkim.** Nie przywracamy
systemu sprzed 6 miesięcy, jeśli sam coś zmieniłeś (naprawiamy, ale w rozsądnych
granicach). Nie naprawiamy uszkodzeń sprzętowych — pomożemy zdiagnozować.
Nie „łamiemy" zabezpieczeń systemowych na żądanie — wyjaśnimy ryzyko, a jeśli
mimo to chcesz, zrobimy to za Twoją świadomą zgodą, z dokumentacją.
**Optymalizacja nie jest gwarancją wyników w zawodach.** Możemy zmniejszyć ping
Twojego sprzętu; nie możemy zagwarantować wygranej turnieju.

## 5.3 Twój następny krok: ticket na Discordzie

**[Serwer Discord Tweakify](https://discord.gg/axtRMB4VCB)** → kanał tickietów.
Wybierz temat: Optymalizacja FPS / Optymalizacja sieci / Upgrade / Diagnoza.

**Opisz sprzęt i problem.** Nie musisz być techniczny — wystarczy:
procesor, karta graficzna, ile RAM-u; w jaką grę grasz i co konkretnie
przeszkadza; jaki system operacyjny; **co już próbowałeś zrobić sam** —
ten ostatni punkt jest najważniejszy, bo mówi nam, gdzie już sprawdziłeś.

**Rozmowa jest dwustronna.** Masz wiedzę z tego e-booka, więc nie przyjdziemy
z lekcją podstaw. Będziemy pytać o **Twój konkretny przypadek**: „masz XMP
włączone?", „jaki masz plan zasilania i max state procesora?", „odpal
LatencyMon na 5 minut gry i wrzuć wykres".

**Jeśli zdecydujesz się na sesję:** ustawiasz hasło w AnyDesk/TeamViewer,
pracujemy **z Tobą na Twoim ekranie**, **zawsze widzisz każdą akcję**,
możesz przerwać w każdej chwili. Sesja trwa zwykle **60–90 minut**.
Na koniec: benchmarki przed/po, **raport ze zmianami**, punkt przywracania.

**Pakiety:** FPS Boost 40 zł (moc procesora i GPU), Ping Killer 45 zł (sieć),
**All-In-One 75 zł** (pełna sesja + dożywotnia opieka). Płatność: BLIK, karta,
przelew, PayPal, PSC, krypto, Revolut, Google/Apple Pay. Ustalasz wszystko
na Discordzie, bez formularzy.

**Nie musisz od razu zamawiać.** Czasem najcenniejsze jest forum i kilka
odpowiedzi na pytania. Wartość optymalizacji nie jest w sesji — jest
w **wiedzy, dlaczego ona działa**.

## 5.4 Zamknięcie

Zacząłeś od: *„Chcę więcej FPS."* Kończysz na: *„Wiem, dlaczego nie mam
więcej FPS."* To jest **najważniejsza zmiana, jaką można przejść w optymalizacji
systemowej**. Nie zwiększenie FPS o 20 — zrozumienie, dlaczego te 20 ginęło.
Bo wiedza się powtarza, a FPS przychodzą i odchodzą.

**Wracając do kontraktu z początku:**

**Zero Lag** znaczy: nie obiecuję, że zniknie wszystko, bo fizyka jest nieubita.
Obiecuję, że usunę **wszystko, co leży w zasięgu Twojego systemu operacyjnego** —
i powiem, co leży poza nim.

**Maximum FPS** znaczy: nie obiecuję 300 FPS z laptopa z i5 ósmej generacji.
Obiecuję, że wykorzystam **całą moc, którą Twój sprzęt ma** — i powiem szczerze,
jeśli zabrakło Ci sprzętu, a nie ustawień.

> **Twój sprzęt prawie na pewno nie jest za słaby. Jest za mało wykorzystany.
> A to jest problem, który da się rozwiązać — mierząc, rozumiejąc
> i zmieniając tylko to, co pomoże.**

**Do zobaczenia na Discordzie. Do graczy. Od graczy.**

*© 2026 Tweakify. Zero Lag. Maximum FPS.*

---

# ANEKS A — ŚCIĄGAWKA KOMEND

*(CMD jako administrator, **po punkcie przywracania**. Podpowiedzi do komend
oznaczono komentarzem `::`.)*

```cmd
:: ── DIAGNOSTYKA ──────────────────────────────────────────────
ver                                                  :: wersja Windows
wmic cpu get name,numberofcores,maxclockspeed        :: procesor
wmic path win32_videocontroller get name,driverversion
wmic memorychip get capacity,speed,manufacturer,partnumber
fsutil behavior query DisableDeleteNotify             :: 0 = TRIM on
powercfg /getactivescheme
netsh int tcp show global

:: ── REJESTR: ODCZYT ─────────────────────────────────────────
reg query "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v DwmSwapEffect
reg query "HKLM\SYSTEM\CurrentControlSet\Control\GraphicsDrivers" /v HwSchMode

:: ── DWM / HAGS ──────────────────────────────────────────────
reg add "HKLM\...\GraphicsDrivers" /v DwmSwapEffect /t REG_DWORD /d 5 /f
reg delete "HKLM\...\GraphicsDrivers" /v DwmSwapEffect /f
reg add "HKLM\...\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f
shutdown /r /t 0

:: ── GAME MODE / DVR / FSO ───────────────────────────────────
reg add "HKLM\SOFTWARE\Microsoft\GameBar" /v AutoGameModeEnabled /t REG_DWORD /d 1 /f
reg add "HKCU\System\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f
reg add "HKCU\...\CurrentVersion\GameDVR" /v AppCaptureEnabled /t REG_DWORD /d 0 /f
reg add "HKCU\System\GameConfigStore" /v GameDVR_FSEBehaviorMode /t REG_DWORD /d 2 /f

:: ── MEMORY INTEGRITY ────────────────────────────────────────
reg add "HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 0 /f

:: ── PLAN ZASILANIA ──────────────────────────────────────────
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
powercfg /setactive <GUID>
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PROCTHROTTLEMIN 100
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFEPP 0
powercfg /setacvalueindex SCHEME_CURRENT SUB_PROCESSOR PERFBOOSTMODE 2
powercfg /setacvalueindex SCHEME_CURRENT SUB_USB 2a737441-1930-4402-8d77-b2bebba308a3 0
powercfg /setactive SCHEME_CURRENT

:: ── SIEC ────────────────────────────────────────────────────
netsh interface ip set dns "name=Ethernet" static 1.1.1.1
netsh interface ipv4 set subinterface "Ethernet" mtu=1472 store=persistent
netsh int tcp set global autotuninglevel=normal
netsh int tcp set global rss=enabled
netsh advfirewall firewall add rule name="Gra" dir=out action=allow program="C:\gra\gra.exe" enable=yes
ipconfig /flushdns

:: ── CZYSZCZENIE ─────────────────────────────────────────────
cleanmgr /sageset:1  &  cleanmgr /sagerun:1
del /q /f /s "%TEMP%\*" 2>nul
del /q /f /s "%LOCALAPPDATA%\D3DSCache\*" 2>nul      :: TYLKO przy błędach, NIE przed grą
```

---

# ANEKS B — ŚWIADCZENIE I ZASTRZEŻENIA

**Charakter materiału.** Niniejszy e-book jest materiałem edukacyjnym. Opisuje
mechanizmy systemu operacyjnego, sprzętu i protokołów sieciowych w celu
podnoszenia świadomości technicznej graczy. Nie jest poradnikiem medycznym,
prawnym ani certyfikowanym przewodnikiem Microsoft, NVIDIA ani AMD.

**Zastrzeżenie dotyczące wyników.** Wyniki optymalizacji zależą od: modelu
i wieku sprzętu, wersji BIOS-u, wersji sterowników, wersji Windowsa, jakości
połączenia sieciowego, stanu termicznego i jakości komponentów (nie wszystkie
procesory, pamięci i karty są równe). **Nie gwarantujemy określonego wzrostu FPS,
określonego spadku pingu ani wyniku w rozgrywkach.** Wszystkie liczby w tym
dokumencie są przykładami opartymi na typowych konfiguracjach i mają charakter
poglądowy, nie gwarancji.

**Ryzyko.** Zmiana ustawień systemu, rejestru, BIOS-u lub plików systemowych
wiąże się z ryzykiem utraty stabilności, systemu który się nie uruchamia,
nieprzewidywalnego zachowania, utraty gwarancji, utraty danych oraz degradacji
sprzętu przy nieumiejętnym podkręcaniu. **Tweakify nie ponosi odpowiedzialności
za szkody wynikłe z samodzielnego stosowania procedur opisanych w tym dokumencie.**
Zalecamy punkt przywracania i kopię zapasową przed każdą zmianą (rozdział 4.0).

**Prawa autorskie.** © 2026 Tweakify. Dokument chroniony prawem autorskim.
Udostępnianie w celach edukacyjnych pod warunkiem podania źródła i zachowania
integralności treści. Modyfikowanie, dystrybuowanie i wykorzystywanie komercyjne
(w tym w „darmowych" programach do optymalizacji) wymagają pisemnej zgody.

**Ten dokument jest bezpłatny.** Niniejszy e-book jest udostępniany nieodpłatnie
i nie jest produktem na sprzedaż. Osoba, która go kupiła, weszła w posiadanie
towaru nieautoryzowanego. Jeżeli kupiłeś ten dokument, **zgłoś sprzedawcę
odpowiednim służbom** oraz **skontaktuj się z Tweakify** na Discordzie
([discord.gg/axtRMB4VCB](https://discord.gg/axtRMB4VCB)). W takiej sytuacji:

- przygotujemy materiał dowodowy i pomożemy zgłosić naruszenie,
- podejmiemy kroki przeciwko dystrybutorowi,
- zwrócimy Ci to, co przepadło — **w formie bezpłatnej usługi**.

Zakazane jest odsprzedawanie, wypakowywanie w paczce „z optymalizatorem",
udostępnianie w zamian za plik, link partnerski prowadzący do płatnej usługi
oraz jakiekolwiek czerpanie zysków z tego dokumentu.

**Prywatność.** Tweakify nie zbiera, nie przechowuje i nie udostępnia danych
osobowych w związku z korzystaniem z tego e-booka. Nie udostępniamy haseł,
kluczy ani adresów IP osobom trzecim, z wyjątkiem przypadków wymaganych
przepisami prawa.

**Kontakt.** Discord: [discord.gg/axtRMB4VCB](https://discord.gg/axtRMB4VCB) ·
tweakify.duckdns.org

*Dla graczy. Od graczy.*