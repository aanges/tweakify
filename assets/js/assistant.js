/* ══════════════════════════════════════════════════
   Tweakify — asystent doboru pakietu
   Dziala w pelni po stronie przegladarki: zero backendu,
   zero kluczy API, zero kosztow. Decyzje podejmuje
   drzeko stanow, nie model jezykowy.
   ══════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fab   = $('#aiFab');
  const panel = $('#aiPanel');
  const log   = $('#aiLog');
  const chips = $('#aiChips');
  const form  = $('#aiForm');
  const restart = $('#aiRestart');

  if (!fab || !panel || !log || !chips) return; // brak widgetu -> wyjscie po cichu

  const DISCORD = 'https://discord.gg/TWOJ_INVITE';

  /* ---------- Scenariusze ---------- */

  const PACKAGES = {
    fps: {
      name: 'FPS Boost',
      price: '40 zł',
      why: 'Twój problem leży w mocy obliczeniowej. Plan zasilania, rejestr, usługi w tle i ustawienia GPU potrafią dać kilkanaście–kilkadziesiąt procent więcej klatek, bez dotykania sprzętu.'
    },
    ping: {
      name: 'Ping Killer',
      price: '45 zł',
      why: 'Tu chodzi o trasę do serwera gry, a nie o sprzęt. Analiza pakietów pozwala wyłapać, gdzie dokładnie tracisz milisekundy.'
    },
    combo: {
      name: 'All-In-One',
      price: '75 zł',
      why: 'Skoro boli Cię jedno i drugie, osobne sesje tylko podwajają koszt. Pakiet łączy oba obszary plus tuning BIOS i test stabilności.'
    },
    starter: {
      name: 'Starter',
      price: '0 zł',
      why: 'Skoro chcesz najpierw zobaczyć, jak to działa — zaczynaj od e-booka i checklisty. Możesz wrócić po sesję w każdej chwili.'
    }
  };

  // pytanie 2 zalezy od odpowiedzi na pytanie 1
  const FOLLOWUP = {
    fps: {
      q: 'Co dokładnie widzisz w grze?',
      options: [
        { label: 'Mikroskoty i przycinania', value: 'fps_micro',
          answer: 'Mikroskoty to najczęściej plan zasilania, usługi w tle albo rejestr. Dobrze to wiedzieć — to nasza główna specjalność.' },
        { label: 'Z 144 fps spada na 60', value: 'fps_drop',
          answer: 'Spadki do 60 przy płynnej rozgrywce brzmią jak V-Sync albo limit klatek w grze. Jedno i drugie ustawiamy w ramach pakietu FPS.' },
        { label: 'Płynnie, ale za mało klatek', value: 'fps_low',
          answer: 'Klasyczny przypadek „mocy". Zaczynamy od planu zasilania — najczęściej to jedna zmiana, która robi największą różnicę.' },
        { label: 'Gram w 240 Hz, liczy się każda klatka', value: 'fps_comp',
          answer: 'Przy takich wymaganiach liczy się 1% low, nie średnia. Dlatego robimy podkręcenie pod Twoje podzespoły, a nie tylko czyszczenie.' }
      ]
    },
    ping: {
      q: 'Jak wygląda ten ping?',
      options: [
        { label: 'Stały, wysoki (100+ ms)', value: 'ping_high',
          answer: 'Stały, wysoki ping to problem operatora lub trasy. Sprawdzimy obie rzeczy i powiemy, co da się zrobić po Twojej stronie.' },
        { label: 'Skoki co kilka minut', value: 'ping_spike',
          answer: 'Skoki to jitter. Usuwa się go inaczej niż średni ping — inny zestaw zmian, dlatego analiza trasy jest tu kluczowa.' },
        { label: 'Niski, ale gra się zacina', value: 'ping_lag',
          answer: 'Niski ping z lagami to zazwyczaj coś lokalnego: sprzęt, kolejka pakietów albo obciążony dysk. Damy znać, co dokładnie.' },
        { label: 'Tylko w jednej grze', value: 'ping_game',
          answer: 'Skoro tylko w jednej grze, problem leży w jej trasie lub w regułach firewalla — obie rzeczy ogarniamy w pakiecie sieciowym.' }
      ]
    },
    both: {
      q: 'Ile masz lat sprzętu?',
      options: [
        { label: 'Ponad 5 lat', value: 'age_old',
          answer: 'Przy sprzęcie w tym wieku często da się odzyskać naprawdę dużo — CPU i GPU mają jeszcze spory zapas mocy, który jest zamrożony w ustawieniach.' },
        { label: '2–5 lat', value: 'age_mid',
          answer: 'Typowa sytuacja: sprzęt sprawny, ustawienia domyślne. Zwykle wystarczy kompleksowa sesja, żeby wyciągnąć to, co zaległo.' },
        { label: 'Prawie nowy', value: 'age_new',
          answer: 'Na nowym sprzęcie zysk z ustawień jest najmniejszy — i powiem to wprost. Ale sieć i undervolting wciąż potrafią dać zauważalną różnicę.' }
      ]
    }
  };

  // rekomendacja: (pierwsza odpowiedz, druga odpowiedz) -> klucz pakietu
  function recommend(first, second) {
    if (first === 'fps')  return 'fps';
    if (first === 'ping') return 'ping';
    if (first === 'both') return 'combo';
    if (first === 'free') return 'starter';
    if (first === 'unknown') return second === 'age_new' ? 'fps' : 'combo';
    return 'combo';
  }

  const OPENING = {
    q: 'Cześć! Pomogę dobrać pakiet. Żeby nie zgadywać — co jest głównym problemem?',
    options: [
      { label: 'Klatki / FPS',       value: 'fps' },
      { label: 'Ping i lagi',        value: 'ping' },
      { label: 'Jedno i drugie',     value: 'both' },
      { label: 'Nie wiem',           value: 'unknown' },
      { label: 'Chcę tylko plan za darmo', value: 'free' }
    ]
  };

  const FOLLOWUP_UNKNOWN = {
    q: 'Okej, to zorientujmy się. Ile masz lat sprzętu?',
    options: [
      { label: 'Ponad 5 lat', value: 'age_old' },
      { label: '2–5 lat',       value: 'age_mid' },
      { label: 'Prawie nowy',   value: 'age_new' }
    ]
  };

  /* ---------- Mechanika ---------- */

  let first = null;

  const delay = ms => reduceMotion ? 0 : ms;

  function scrollDown() {
    log.scrollTop = log.scrollHeight;
  }

  function addMsg(text, who = 'bot', opts = {}) {
    const el = document.createElement('div');
    el.className = 'ai__msg ai__msg--' + who;
    if (opts.reco) el.classList.add('ai__msg--reco');

    const bubble = document.createElement('div');
    bubble.className = 'ai__bubble';

    if (opts.label) {
      const tag = document.createElement('strong');
      tag.className = 'ai__reco-name';
      tag.textContent = opts.label;
      bubble.appendChild(tag);
    }
    if (opts.price) {
      const p = document.createElement('span');
      p.className = 'ai__reco-price';
      p.textContent = opts.price;
      bubble.appendChild(p);
    }
    const body = document.createElement('p');
    body.textContent = text;
    bubble.appendChild(body);

    if (opts.cta) {
      const a = document.createElement('a');
      a.className = 'ai__cta';
      a.href = DISCORD;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = opts.cta;
      bubble.appendChild(a);
    }

    el.appendChild(bubble);
    log.appendChild(el);
    scrollDown();
    return el;
  }

  function typing() {
    const el = document.createElement('div');
    el.className = 'ai__msg ai__msg--bot';
    el.innerHTML = '<div class="ai__bubble ai__typing"><i></i><i></i><i></i></div>';
    log.appendChild(el);
    scrollDown();
    return el;
  }

  function clearChips() { chips.innerHTML = ''; }

  function showChips(options) {
    clearChips();
    options.forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ai__chip';
      b.textContent = opt.label;
      b.addEventListener('click', () => handleAnswer(opt));
      chips.appendChild(b);
    });
    // panel moze byc za waski - przenieś chipy pod spód
    requestAnimationFrame(scrollDown);
  }

  function finish(pkgKey) {
    const pkg = PACKAGES[pkgKey];
    clearChips();

    const t = typing();
    setTimeout(() => {
      t.remove();
      addMsg(pkg.why, 'bot', {
        reco: true,
        label: 'Polecam: ' + pkg.name,
        price: pkg.price,
        cta: 'Zamawiam ' + pkg.name + ' na Discordzie'
      });
      addMsg('Napisz na Discordzie — powiemy, ile da się realnie wyciągnąć w Twoim przypadku. Bez zobowiązań.', 'bot');
      showChips([{ label: 'Zacznij od nowa', value: '__restart' }]);
    }, delay(700));
  }

  function askFollowup() {
    const flow = (first === 'unknown') ? FOLLOWUP_UNKNOWN : FOLLOWUP[first];
    const t = typing();
    setTimeout(() => {
      t.remove();
      addMsg(flow.q, 'bot');
      showChips(flow.options);
    }, delay(500));
  }

  function handleAnswer(opt) {
    if (opt.value === '__restart') { reset(); return; }

    addMsg(opt.label, 'user');

    if (!first) {
      first = opt.value;
      if (first === 'free') { finish('starter'); return; }
      askFollowup();
      return;
    }

    // drugie pytanie
    const flow = (first === 'unknown') ? FOLLOWUP_UNKNOWN : FOLLOWUP[first];
    const chosen = flow.options.find(o => o.value === opt.value);

    const t = typing();
    setTimeout(() => {
      t.remove();
      if (chosen && chosen.answer) addMsg(chosen.answer, 'bot');
      setTimeout(() => finish(recommend(first, opt.value)), delay(500));
    }, delay(500));
  }

  function greet() {
    addMsg(OPENING.q, 'bot');
    showChips(OPENING.options);
  }

  function reset() {
    log.innerHTML = '';
    clearChips();
    first = null;
    greet();
  }

  /* ---------- Panel ---------- */

  function open() {
    panel.hidden = false;
    fab.setAttribute('aria-expanded', 'true');
    document.body.classList.add('ai-open');
    if (!log.children.length) greet();
    setTimeout(() => { fab.focus(); }, delay(60));
  }

  function close() {
    panel.hidden = true;
    fab.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('ai-open');
    fab.focus();
  }

  fab.addEventListener('click', () => {
    panel.hidden ? open() : close();
  });

  $('#aiClose').addEventListener('click', close);

  restart.addEventListener('click', reset);

  form.addEventListener('submit', e => e.preventDefault());

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });

  // klikniecie w link Discorda nie powinno zamykac panelu
  panel.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    e.stopPropagation();
  });
})();