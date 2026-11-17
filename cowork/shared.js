/* Behaviour shared by the four Cowork concepts. Everything is driven by data- attributes:
   data-screen / href="#name"   one screen at a time, chosen by the URL hash
   data-tabs, data-tab, data-panel   tabs
   data-run, data-step, data-when, data-live   the simulated run
   data-guest="start|review|result"   a screen the task brings, made of UI SDK components (same in every concept)
   data-look on <html>   who styles those screens: "app" (Cowork) or "own" (the task)
   data-market, data-f, data-tags, data-search   marketplace filters
   data-install, data-installable, data-installed   install button */
(() => {
  const d = document;
  const $$ = (s, r = d) => [...r.querySelectorAll(s)];
  const root = d.documentElement;
  if (window.self !== window.top) root.classList.add('embedded');
  // Who styles the task's screens. The bar sets it; ?look=own in a link does too.
  let look = new URLSearchParams(location.search).get('look');
  try { look ||= localStorage.getItem('cowork-look'); } catch { /* storage can be off for local files */ }
  root.dataset.look = look = look === 'own' ? 'own' : 'app';

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
    pencil: '<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',
    fork: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><circle cx="12" cy="19" r="2"/><path d="M6 7v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M12 13v4"/>',
    aim: '<circle cx="12" cy="12" r="6"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
    clip: '<path d="M20 11.5l-8 8a5 5 0 0 1-7-7l8.5-8.5a3.5 3.5 0 0 1 5 5L10 17.5a2 2 0 0 1-3-3l7.5-7.5"/>',
    up: '<path d="M12 19V6m0 0-5 5m5-5 5 5"/>',
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
  // A page that is not one of the four concepts names itself and its screens: data-title, data-screens="id:Name,id:Name".
  const SCREENS = d.body.dataset.screens?.split(',').map(s => s.split(':'))
    || [['market', 'Marketplace'], ['tasks', 'My tasks'], ['task', 'Task'], ['run', 'Run'], ['schedule', 'Schedule']];
  const n = +d.body.dataset.concept, title = d.body.dataset.title;
  if (n || title) {
    const other = i => CONCEPTS[(i + CONCEPTS.length) % CONCEPTS.length];
    const [prev, next] = [other(n - 2), other(n)];
    d.body.insertAdjacentHTML('afterbegin', `<nav class="mockbar" aria-label="Mockup navigation">
      <a href="index.html">All mockups</a><b>${n ? `${n} of 4: ${CONCEPTS[n - 1][1]}` : title}</b>
      ${SCREENS.map(([id, name]) => `<a href="#${id}">${name}</a>`).join('')}
      <span class="grow"></span>
      <span class="look" data-solo>Task screens:<button type="button" data-set-look="app" aria-pressed="${look === 'app'}">App's styles</button><button type="button" data-set-look="own" aria-pressed="${look === 'own'}">Task's own</button></span>
      ${n ? `<a data-file="${prev[0]}" href="${prev[0]}">Previous: ${prev[1]}</a>
      <a data-file="${next[0]}" href="${next[0]}">Next: ${next[1]}</a>` : ''}</nav>`);
  }

  // ---- Screens the task brings (Invoice Intake) --------------------------
  // Their controls are UI SDK web components (github.com/vercel-labs/ui), written as a task would
  // write them: no classes for looks, only parts. shared.css styles the parts by their data-slot.
  const TASK = 'Invoice Intake';
  const MATCHED = { count: 12, total: 11580.5 };
  const ODD = [
    { who: 'Northwind Paper Co.', no: 'INV-2291', total: 6840, why: 'Over $5,000. The last three from this vendor were $6,200 to $7,100.', suggest: 'approve' },
    { who: 'Halvorsen Freight', no: '88-1042', total: 1215.5, why: 'No matching order. Closest is PO-7731 for $1,190.00.', suggest: 'hold' },
  ];
  const money = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2 });
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const button = (text, attrs = '') => `<ui-button><button type="button" ${attrs}>${text}</button></ui-button>`;
  const select = (label, items) => `<ui-field><ui-field-label>${label}</ui-field-label>
    <ui-select default-value="0"><ui-select-trigger><button type="button"><ui-select-value>${items[0]}</ui-select-value>${ic('chevd')}</button></ui-select-trigger>
      <ui-select-content>${items.map((t, i) => `<ui-select-item value="${i}">${t}</ui-select-item>`).join('')}</ui-select-content></ui-select></ui-field>`;
  const G = {
    start: () => `<h3>New batch</h3>
      <p class="g-muted">Choose the invoices to process. PDFs and scans both work.</p>
      <div class="g-stack">
        <div class="g-drop">${ic('folder')}<div><b>14 files in Invoices/Inbox</b><div class="g-muted">Added since the last run</div></div><span class="grow"></span>${button('Change', 'data-variant="outline"')}</div>
        ${select('Match against', ['Purchase orders Q4.xlsx', 'Purchase orders Q3.xlsx'])}
        ${select('Stop and ask me about', ['Anything over $5,000 or without a matching order', 'Only invoices without a matching order', 'Nothing, file everything'])}
        <label class="g-check"><ui-checkbox default-checked><ui-checkbox-indicator aria-hidden="true">${ic('check')}</ui-checkbox-indicator></ui-checkbox>Add each filed invoice to Invoices 2026.xlsx</label>
        <div class="g-row">${button('Process 14 invoices', 'data-run-start')}</div>
      </div>`,
    // In a run the decisions start empty and the task fills them in through the bridge; a preview shows them filled.
    review: preview => `<h3>2 invoices need a decision</h3>
      <p class="g-muted">The other 12 matched a purchase order and are ready to file.</p>
      <table class="g-table">
        <thead><tr><th>Vendor</th><th>Invoice</th><th class="g-num">Total</th><th>Why it stopped</th><th>Decision</th></tr></thead>
        <tbody>${ODD.map(o => `<tr><td>${o.who}</td><td>${o.no}</td><td class="g-num">${money(o.total)}</td><td>${o.why}</td>
          <td><ui-segmented-control aria-label="Decision for ${o.who}"${preview ? ` default-value="${o.suggest}"` : ''}><ui-segmented-control-indicator></ui-segmented-control-indicator><ui-segmented-control-item value="approve">Approve</ui-segmented-control-item><ui-segmented-control-item value="hold">Hold</ui-segmented-control-item></ui-segmented-control></td></tr>`).join('')}</tbody>
      </table>
      <div class="g-row" style="margin-top:18px"><ui-button data-agent-confirm="Files the approved invoices and moves their PDFs"><button type="button" data-run-continue data-r="go">File 13 and hold 1</button></ui-button>${button('Open both PDFs', 'data-variant="outline"')}<span class="g-muted" data-r="hint"></span></div>`,
    result: () => `<h3><span data-r="filed">13</span> invoices filed</h3>
      <p class="g-muted">Finished in 1 minute 48 seconds.</p>
      <div class="g-stats">
        <div class="g-stat"><b data-r="filed">13</b><span>Filed</span></div>
        <div class="g-stat"><b data-r="held">1</b><span>Held for later</span></div>
        <div class="g-stat"><b data-r="total">$18,420.50</b><span>Total filed</span></div>
      </div>
      <ul class="g-list">
        <li>${ic('folder')}<span>Moved <span data-r="filed">13</span> PDFs to Invoices/Filed/2026-11</span></li>
        <li>${ic('table')}<span>Added <span data-r="filed">13</span> rows to Invoices 2026.xlsx</span></li>
        <li data-r="heldline">${ic('info')}<span data-r="heldtext">Halvorsen Freight 88-1042 is waiting in Invoices/Held</span></li>
      </ul>
      <div class="g-row" style="margin-top:18px">${button('Open folder', 'data-variant="outline"')}${button('Open spreadsheet', 'data-variant="outline"')}${button('Run again', 'data-run-reset')}</div>`,
  };
  // Under the review screen of a run, Cowork's own strip: what the task did on the screen, and what it may do.
  const FOOT = `<div class="guest-foot">
      <div class="row"><span class="bymark" data-foot-mark></span><span data-foot-text></span><span class="grow"></span><button type="button" class="btn btn-sm" data-foot-undo>Undo its changes</button></div>
      <details><summary>What ${TASK} can do on this screen</summary><ul data-foot-can></ul><h4>Changes so far</h4><ol data-foot-log></ol></details>
    </div>`;
  // A page can bring the screens of another task: window.COWORK_GUEST = helpers => ({ name: () => html }),
  // on an element with data-guest="name" data-task="Its name" (and data-tint, data-glyph for its icon).
  Object.assign(G, window.COWORK_GUEST?.({ ic, button, select, money, esc }));
  $$('[data-guest]').forEach(el => {
    const kind = el.dataset.guest, preview = el.classList.contains('mini');
    el.classList.add('guest');
    if (preview) el.dataset.agentHidden = ''; // a picture of the screen: nothing for the task to read or use
    el.innerHTML = `<div class="guest-bar"><span class="ticon ticon-sm" data-c="${el.dataset.tint || 'fin'}">${ic(el.dataset.glyph || 'doc')}</span><b>${el.dataset.task || TASK}</b><span>This screen comes from the task</span></div>
      <div class="guest-body">${G[kind](preview)}</div>${kind === 'review' && !preview ? FOOT : ''}`;
  });

  // The decisions made on the review screen decide what the rest of the run says.
  const settle = run => {
    const picks = $$('[data-guest="review"]:not(.mini) ui-segmented-control', run).map(s => s.value);
    const open = picks.filter(v => !v).length;
    const held = ODD.filter((o, i) => picks[i] === 'hold'), approved = ODD.filter((o, i) => picks[i] === 'approve');
    const filed = MATCHED.count + approved.length;
    const text = {
      go: open ? 'File invoices' : held.length ? `File ${filed} and hold ${held.length}` : `File all ${filed}`,
      hint: open ? `Decide ${open} more first` : '', filed, held: held.length, total: money(approved.reduce((sum, o) => sum + o.total, MATCHED.total)),
      heldtext: held.map(o => `${o.who} ${o.no}`).join(' and ') + (held.length > 1 ? ' are' : ' is') + ' waiting in Invoices/Held',
    };
    $$('[data-r]', run).forEach(e => { if (e.dataset.r in text) e.textContent = text[e.dataset.r]; });
    $$('[data-r="go"]', run).forEach(b => { b.disabled = open > 0; });
    $$('[data-r="heldline"]', run).forEach(e => { e.hidden = !held.length; });
    const ask = $$('[data-step]', run).find(e => 'wait' in e.dataset);
    if (!ask) return;
    ask.dataset.done = `${approved.length} approved, ${held.length} held`;
    const last = $$('[data-step]', run).find(e => +e.dataset.step === +ask.dataset.step + 1);
    if (last) last.dataset.done = held.length ? `${filed} filed, ${held.length} held` : `${filed} filed`;
  };

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
      run.dispatchEvent(new CustomEvent('phase', { detail: phase }));
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

  // ---- UI SDK: the components, and the bridge the task's agent uses ------
  // Loaded at a pinned version from a CDN, so the pages stay plain HTML with no build step.
  // The bridge is how a task works on its own screen: it reads the components, sets their values,
  // and is refused on a control marked data-agent-confirm. Cowork reads the same bridge to show
  // what the task filled in and to undo it.
  const SDK = 'https://esm.sh/@ui-sdk/web@0.1.0-beta.6';
  Promise.all(['agent', 'history', 'observe', 'field', 'select', 'checkbox', 'segmented-control', 'button'].map(m => import(`${SDK}/${m}`)))
    .then(([{ createAgent }, { createHistory, describeEntry, stageChanges }, { elementOf }]) => {
      const agent = createAgent();
      root.classList.add('sdk-ready');
      $$('[data-run] [data-guest="review"]:not(.mini)').forEach(panel => {
        const run = panel.closest('[data-run]'), body = panel.querySelector('.guest-body');
        const part = name => panel.querySelector(`[data-foot-${name}]`);
        const history = createHistory(agent, { within: body });
        let phase, timer, thinking = false;
        const render = () => {
          settle(run);
          const entries = history.entries(), latest = new Map();
          entries.forEach(e => { if (!e.reverted) latest.set(e.ref, e); });
          const byTask = [...latest.values()].filter(e => e.source === 'agent');
          $$('[data-by]', body).forEach(e => e.removeAttribute('data-by'));
          byTask.forEach(e => elementOf(e.ref)?.setAttribute('data-by', 'task'));
          part('mark').hidden = part('undo').hidden = !byTask.length;
          part('text').textContent = thinking && !byTask.length ? `${TASK} is filling in what it would decide…`
            : byTask.length ? `${TASK} filled in ${byTask.length} of ${ODD.length} decisions. Change any you disagree with.`
            : entries.some(e => !e.reverted) ? 'Every decision on this screen is yours.' : 'Decide both invoices to continue.';
          part('log').innerHTML = entries.map(e => `<li${e.reverted ? ' class="undone"' : ''}>${esc(describeEntry(e).replace(/^Agent\b/, TASK))}</li>`).join('') || '<li>Nothing yet</li>';
          part('can').innerHTML = agent.snapshot().filter(c => c.ref && body.contains(elementOf(c.ref))).map(c => {
            const name = `<b>${esc(c.label || c.component)}</b>`;
            return `<li>${c.confirm ? `Only you can press ${name}. It ${esc(c.confirm[0].toLowerCase() + c.confirm.slice(1))}.`
              : c.items ? `It can set ${name} to ${c.items.map(i => esc(i.label)).join(' or ')}.`
              : c.actions?.includes('press') ? `It can press ${name}.` : `It can change ${name}.`}</li>`;
          }).join('');
        };
        const enter = now => {
          if (now === phase) return;
          phase = now; clearTimeout(timer);
          if (now !== 'wait') return;
          $$('ui-segmented-control', body).forEach(s => { s.value = null; });
          history.clear(); thinking = true; render();
          timer = setTimeout(async () => {
            await stageChanges(agent, ODD.map(o => ({ ref: `Decision for ${o.who}`, value: o.suggest })));
            thinking = false; render();
          }, 900);
        };
        part('undo').addEventListener('click', () => history.undoSource('agent').then(render));
        history.subscribe(render);
        run.addEventListener('phase', e => enter(e.detail));
        enter(run.dataset.phase);
      });
    })
    .catch(error => {
      console.error(error);
      root.classList.add('no-sdk');
      $$('.guest-bar > span:last-child').forEach(s => { s.textContent = 'UI SDK did not load, so these controls do nothing'; });
    });

  // ---- Pressable chips, tabs, install ------------------------------------
  d.addEventListener('click', e => {
    const chip = e.target.closest('button[aria-pressed]');
    if (chip) {
      const solo = chip.closest('[data-solo]');
      if (solo) $$('button[aria-pressed]', solo).forEach(x => x.setAttribute('aria-pressed', x === chip));
      else chip.setAttribute('aria-pressed', chip.getAttribute('aria-pressed') !== 'true');
      chip.closest('[data-market]')?.dispatchEvent(new Event('filter'));
      if (chip.dataset.setLook) {
        root.dataset.look = chip.dataset.setLook;
        try { localStorage.setItem('cowork-look', chip.dataset.setLook); } catch { /* not kept */ }
      }
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
    if (jump !== null && !root.classList.contains('embedded')) history.replaceState(null, '', location.pathname + location.hash);
  };
  addEventListener('hashchange', route);
  route();
})();
