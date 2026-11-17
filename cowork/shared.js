/* Behaviour shared by the four Cowork concepts. Everything is driven by data- attributes:
   data-screen / href="#name"   one screen at a time, chosen by the URL hash
   data-tabs, data-tab, data-panel   tabs
   data-run, data-step, data-when, data-live   the simulated run
   data-guest="start|review|result"   a panel the task brings (same in every concept)
   data-market, data-f, data-tags, data-search   marketplace filters
   data-install, data-installable, data-installed   install button */
(() => {
  const d = document;
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];
  if (window.self !== window.top) d.documentElement.classList.add('embedded');

  // ---- Icons -------------------------------------------------------------
  const P = {
    play: '<path d="M7 5v14l12-7z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    down: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
    star: '<path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.2 7.9-8 9-4.8-1.1-8-4.5-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    file: '<path d="M6 3h8l4 4v14H6zM14 3v4h4"/>',
    grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    store: '<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
    history: '<path d="M4 12a8 8 0 1 0 2.5-5.8L4 8.5M4 4v4.5h4.5M12 8v4l3 2"/>',
    chev: '<path d="m9 6 6 6-6 6"/>',
    chevd: '<path d="m6 9 6 6 6-6"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-5 8-5s6.5 1 8 5"/>',
    repeat: '<path d="M4 11V9a3 3 0 0 1 3-3h11l-3-3M20 13v2a3 3 0 0 1-3 3H6l3 3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    doc: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    scale: '<path d="M12 4v16M7 20h10M5 7h14M5 7l-2.5 6h5zM19 7l-2.5 6h5z"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
    chart: '<path d="M4 4v16h16M8 16v-5M12 16V8M16 16v-3"/>',
    image: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m4 18 5-5 4 4 3-3 4 4"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    wifioff: '<path d="M3 3l18 18M5 12.5a10 10 0 0 1 4-2.6M19 12.5a10 10 0 0 0-5-3M8.5 16a5 5 0 0 1 7 0M12 20h.01"/>',
  };
  d.body.insertAdjacentHTML('afterbegin',
    '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
    Object.entries(P).map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24">${v}</symbol>`).join('') + '</svg>');
  const ic = n => `<svg class="i"><use href="#i-${n}"/></svg>`;

  // ---- Bar above the app -------------------------------------------------
  const CONCEPTS = [
    ['concept-1-shelf.html', 'Shelf'], ['concept-2-launchpad.html', 'Launchpad'],
    ['concept-3-thread.html', 'Thread'], ['concept-4-canvas.html', 'Canvas'],
  ];
  const SCREENS = [['market', 'Marketplace'], ['tasks', 'My tasks'], ['task', 'Task'], ['run', 'Run'], ['schedule', 'Schedule']];
  const n = +d.body.dataset.concept;
  if (n) {
    const other = i => CONCEPTS[(i + CONCEPTS.length) % CONCEPTS.length];
    const [prev, next] = [other(n - 2), other(n)];
    d.body.insertAdjacentHTML('afterbegin', `<nav class="mockbar" aria-label="Mockup navigation">
      <a href="index.html">All mockups</a><b>${n} of 4: ${CONCEPTS[n - 1][1]}</b>
      ${SCREENS.map(([id, name]) => `<a href="#${id}">${name}</a>`).join('')}
      <span class="grow"></span>
      <a data-file="${prev[0]}" href="${prev[0]}">Previous: ${prev[1]}</a>
      <a data-file="${next[0]}" href="${next[0]}">Next: ${next[1]}</a></nav>`);
  }

  // ---- Panels the task brings (Invoice Intake) ---------------------------
  let uid = 0;
  const G = {
    start: () => `<h3>New batch</h3>
      <p class="g-muted">Choose the invoices to process. PDFs and scans both work.</p>
      <div class="g-stack">
        <div class="g-drop">${ic('folder')}<div><b>14 files in Invoices/Inbox</b><div class="g-muted">Added since the last run</div></div><button type="button" class="g-btn g-btn-out" style="margin-left:auto">Change</button></div>
        <label class="g-label">Match against<select class="g-input"><option>Purchase orders Q4.xlsx</option></select></label>
        <label class="g-label">Stop and ask me about<select class="g-input"><option>Anything over $5,000 or without a matching order</option><option>Only invoices without a matching order</option><option>Nothing, file everything</option></select></label>
        <label class="g-check"><input type="checkbox" checked> Add each filed invoice to Invoices 2026.xlsx</label>
        <div class="g-row"><button type="button" class="g-btn" data-run-start>Process 14 invoices</button></div>
      </div>`,
    review: () => {
      const seg = (pick) => { const name = 'g' + uid++; return `<span class="g-seg"><label><input type="radio" name="${name}" ${pick ? 'checked' : ''}>Approve</label><label><input type="radio" name="${name}" ${pick ? '' : 'checked'}>Hold</label></span>`; };
      return `<h3>2 invoices need a decision</h3>
      <p class="g-muted">The other 12 matched a purchase order and are ready to file.</p>
      <table class="g-table">
        <thead><tr><th>Vendor</th><th>Invoice</th><th class="g-num">Total</th><th>Why it stopped</th><th>Decision</th></tr></thead>
        <tbody>
          <tr><td>Northwind Paper Co.</td><td>INV-2291</td><td class="g-num">$6,840.00</td><td>Over $5,000</td><td>${seg(true)}</td></tr>
          <tr><td>Halvorsen Freight</td><td>88-1042</td><td class="g-num">$1,215.50</td><td>No matching order. Closest is PO-7731 for $1,190.00.</td><td>${seg(false)}</td></tr>
        </tbody>
      </table>
      <div class="g-row" style="margin-top:18px"><button type="button" class="g-btn" data-run-continue>File 13 and hold 1</button><button type="button" class="g-btn g-btn-out">Open both PDFs</button></div>`;
    },
    result: () => `<h3>13 invoices filed</h3>
      <p class="g-muted">Finished in 1 minute 48 seconds.</p>
      <div class="g-stats">
        <div class="g-stat"><b>13</b><span>Filed</span></div>
        <div class="g-stat"><b>1</b><span>Held for later</span></div>
        <div class="g-stat"><b>$18,420.50</b><span>Total filed</span></div>
      </div>
      <ul class="g-list">
        <li>${ic('folder')}Moved 13 PDFs to Invoices/Filed/2026-11</li>
        <li>${ic('table')}Added 13 rows to Invoices 2026.xlsx</li>
        <li>${ic('info')}Halvorsen Freight 88-1042 is waiting in Invoices/Held</li>
      </ul>
      <div class="g-row" style="margin-top:18px"><button type="button" class="g-btn g-btn-out">Open folder</button><button type="button" class="g-btn g-btn-out">Open spreadsheet</button><button type="button" class="g-btn" data-run-reset>Run again</button></div>`,
  };
  $$('[data-guest]').forEach(el => {
    el.classList.add('guest');
    el.innerHTML = `<div class="guest-bar"><span class="ticon ticon-sm" data-c="fin">${ic('doc')}</span><b>Invoice Intake</b><span>This panel comes from the task</span></div><div class="guest-body">${G[el.dataset.guest]()}</div>`;
  });

  // ---- Simulated run -----------------------------------------------------
  // Steps are [data-step="0..n"]; the first element of each number carries
  // data-label, data-note (while it runs), data-done, data-ms, and data-wait when it needs the user.
  const runs = [];
  $$('[data-run]').forEach(run => {
    const els = $$('[data-step]', run);
    const count = Math.max(...els.map(e => +e.dataset.step)) + 1;
    const cfg = i => els.find(e => +e.dataset.step === i).dataset;
    let at = -1, phase = 'idle', timer, clock, t0;
    const setClock = text => $$('[data-live="clock"]', run).forEach(e => { e.textContent = text; });
    const paint = () => {
      run.dataset.phase = phase;
      run.style.setProperty('--p', phase === 'done' ? 1 : Math.max(0, at) / (count - 1));
      els.forEach(e => {
        const i = +e.dataset.step, c = cfg(i);
        const st = phase === 'done' || i < at ? 'done' : phase === 'idle' || i > at ? 'todo' : phase === 'wait' ? 'wait' : 'doing';
        e.dataset.state = st;
        const t = e.querySelector('[data-step-text]');
        if (t) t.textContent = st === 'done' ? c.done || '' : st === 'todo' ? '' : c.note || '';
      });
      $$('[data-when]', run).forEach(e => { e.hidden = !e.dataset.when.split(' ').includes(phase); });
      const on = at >= 0 && at < count, c = on ? cfg(at) : {};
      const live = { name: c.label || '', note: c.note || '', count: on ? `Step ${at + 1} of ${count}` : '' };
      $$('[data-live]', run).forEach(e => { if (e.dataset.live in live) e.textContent = live[e.dataset.live]; });
      $$('[data-stick]', run).forEach(e => { e.scrollTop = e.scrollHeight; }); // keep the newest message in view
    };
    const go = i => {
      clearTimeout(timer); at = i;
      if (i >= count) { phase = 'done'; clearInterval(clock); return paint(); }
      const c = cfg(i);
      if ('wait' in c) { phase = 'wait'; return paint(); }
      phase = 'running'; paint();
      timer = setTimeout(() => go(i + 1), +c.ms || 1500);
    };
    const reset = () => { clearTimeout(timer); clearInterval(clock); at = -1; phase = 'idle'; setClock('0:00'); paint(); };
    run.addEventListener('click', e => {
      const b = e.target.closest('[data-run-start],[data-run-continue],[data-run-reset],[data-run-stop]');
      if (!b) return;
      if ('runStart' in b.dataset) {
        t0 = Date.now();
        clock = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); setClock(`${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`); }, 1000);
        go(0);
      } else if ('runContinue' in b.dataset) go(at + 1);
      else reset();
    });
    runs.push({ reset, jump: i => { reset(); t0 = Date.now(); go(i); } });
    reset();
  });

  // ---- Pressable chips, tabs, install ------------------------------------
  d.addEventListener('click', e => {
    const chip = e.target.closest('button[aria-pressed]');
    if (chip) {
      const solo = chip.closest('[data-solo]');
      if (solo) $$('button[aria-pressed]', solo).forEach(x => x.setAttribute('aria-pressed', x === chip));
      else chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') !== 'true');
      chip.closest('[data-market]')?.dispatchEvent(new Event('filter'));
    }
    const tab = e.target.closest('[data-tab]');
    if (tab) {
      const box = tab.closest('[data-tabs]');
      $$('[data-tab]', box).forEach(x => x.setAttribute('aria-selected', x === tab));
      $$('[data-panel]', box).forEach(p => { p.hidden = p.dataset.panel !== tab.dataset.tab; });
    }
    const inst = e.target.closest('[data-install]');
    if (inst) {
      inst.disabled = true; inst.textContent = 'Installing…';
      setTimeout(() => (inst.closest('[data-installable]') || inst).classList.add('is-installed'), 900);
    }
  });

  // ---- Marketplace filters ----------------------------------------------
  // data-f="group:value" on pressed chips or checked boxes; a card passes when, for every
  // group in use, one of its values is in the card's data-tags. "*" means no filter.
  $$('[data-market]').forEach(m => {
    const cards = $$('[data-tags]', m);
    const apply = () => {
      const groups = {};
      $$('button[data-f][aria-pressed="true"], input[data-f]:checked', m).forEach(el => {
        const [k, v] = el.dataset.f.split(':');
        if (v !== '*') (groups[k] ||= []).push(v);
      });
      const q = (m.querySelector('[data-search]')?.value || '').trim().toLowerCase();
      let shown = 0;
      cards.forEach(c => {
        const tags = c.dataset.tags.split(' ');
        const ok = Object.values(groups).every(vs => vs.some(v => tags.includes(v))) && (!q || c.textContent.toLowerCase().includes(q));
        c.hidden = !ok; shown += ok;
      });
      $$('[data-count]', m).forEach(el => { el.textContent = shown; });
      $$('[data-empty]', m).forEach(el => { el.hidden = shown > 0; });
    };
    ['filter', 'input', 'change'].forEach(t => m.addEventListener(t, apply));
    apply();
  });

  // ---- Screens -----------------------------------------------------------
  const screens = $$('[data-screen]');
  const route = () => {
    if (!screens.length) return;
    const want = location.hash.slice(1);
    const name = screens.some(s => s.dataset.screen === want) ? want : d.body.dataset.start || screens[0].dataset.screen;
    screens.forEach(s => s.classList.toggle('is-on', s.dataset.screen === name));
    d.body.dataset.at = name;
    $$('a[href^="#"]').forEach(a => a.getAttribute('href') === '#' + name ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
    $$('.mockbar [data-file]').forEach(a => { a.href = a.dataset.file + '#' + name; });
    // ?at=3 opens the Run screen already at that step (5 = finished): handy for links and screenshots.
    const jump = new URLSearchParams(location.search).get('at');
    runs.forEach(r => name === 'run' && jump !== null ? r.jump(+jump) : r.reset());
    if (jump !== null && !d.documentElement.classList.contains('embedded')) history.replaceState(null, '', location.pathname + location.hash);
  };
  addEventListener('hashchange', route);
  route();
})();
