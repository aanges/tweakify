/* ══════════════════════════════════════════════════
   Tweakify — main.js
   Bez zależności. Wszystko ma graceful fallback.
   ══════════════════════════════════════════════════ */
(() => {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Rok w stopce ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- 2. Menu mobilne ---------- */
  const burger = $('#burger');
  const menu   = $('#menu');

  const closeMenu = () => {
    if (!menu || !burger) return;
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Otwórz menu');
  };

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    });

    // Zamknij po kliknięciu w link i po klawiszu Escape
    $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', e => {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && !burger.contains(e.target)) closeMenu();
    });
  }

  /* ---------- 3. Podświetlenie nav po scrollu ---------- */
  const nav = $('#nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 4. Reveal on scroll ---------- */
  const revealables = $$('.reveal');
  if (revealables.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach(el => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

      revealables.forEach(el => io.observe(el));
    }
  }

  /* ---------- 5. Liczniki ---------- */
  const finalText = (v, d, s) => v.toFixed(d) + s;

  function animateCount(el) {
    const target   = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1500;
    const start    = performance.now();

    // Karta w tle — przeglądarka dusi requestAnimationFrame. Pokaż od razu wynik.
    if (document.hidden) { el.textContent = finalText(target, decimals, suffix); return; }

    // zeruj natychmiast, żeby nie było "skoku" z gotowej wartości na 0
    el.textContent = finalText(0, decimals, suffix);

    const step = now => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);       // easeOutCubic
      el.textContent = finalText(target * eased, decimals, suffix);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    // siatka bezpieczeństwa: gdyby rAF zamilkł, wymus finalną wartość
    setTimeout(() => { el.textContent = finalText(target, decimals, suffix); }, duration + 120);
  }

  const counters = $$('[data-count]');
  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(el => {
        const d = parseInt(el.dataset.decimals || '0', 10);
        el.textContent = parseFloat(el.dataset.count).toFixed(d) + (el.dataset.suffix || '');
      });
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(el => io.observe(el));
    }
  }

  /* ---------- 6. Kopiowanie linku Discorda ---------- */
  $$('[data-copy]').forEach(el => {
    el.addEventListener('click', async () => {
      const href = el.getAttribute('href');
      if (!href) return;
      const note = el.querySelector('.copy-note');
      try {
        await navigator.clipboard.writeText(href);
        if (!note) {
          const span = document.createElement('span');
          span.className = 'copy-note';
          span.textContent = '✓ link skopiowany';
          el.appendChild(span);
        }
        setTimeout(() => {
          if (note) note.remove();
        }, 1800);
      } catch { /* brak uprawnień do schowka — nic nie robimy */ }
    });
  });
})();