/* Natural Science 4º EP · Unit 1 practice test — app logic. Licence: CC BY-NC 4.0 */
(() => {
'use strict';

const KEY = 'escuela-ns4u1-state-v1', HIST = 'escuela-ns4u1-history-v1', NAMEKEY = 'escuela-name-v1';
const app = document.getElementById('app');

/* ---------- helpers ---------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/['’`]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage may be blocked */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* ignore */ } },
};
// **bold** and *italic* in the Spanish explanations
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\*(.+?)\*/g, '<i>$1</i>');
const fmt = n => (Math.round(n * 100) / 100).toString().replace(/\.0+$/, '');
const one = n => (Math.round(n * 10) / 10).toFixed(1);

function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function shuffled(arr, seed) { const r = rng(seed), a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function hashStr(s) { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

/* ---------- state ---------- */
let name = store.get(NAMEKEY, '');
let state = store.get(KEY, null);            // {mode, page, answers, seed, startedAt, finished, overrides, endedAt}
const saveState = () => store.set(KEY, state);

const qList = mode => mode === 'full' ? Q : mode === 'short' ? Q.filter(q => q.s) : Q.filter(q => q.sec === mode.replace('sec-', ''));
const modeLabel = mode => mode === 'full' ? 'Full test' : mode === 'short' ? 'Short test' : 'Practice · ' + SECTIONS.find(s => s.id === mode.replace('sec-', '')).title;
const sectionsOf = mode => SECTIONS.filter(s => qList(mode).some(q => q.sec === s.id));
const validMode = m => m === 'full' || m === 'short' || /^sec-[A-I]$/.test(m);

function newState(mode) {
  return { mode, page: 0, answers: {}, seed: Math.floor(Math.random() * 1e9), startedAt: Date.now(), finished: false, overrides: {} };
}

/* ---------- scoring ---------- */
function scoreQ(q, ans, ov) {
  const max = q.pts;
  let ok = 0, n = 1, rows = [];
  if (q.type === 'mc') {
    n = 1; ok = ans === q.a ? 1 : 0;
    rows = [{ t: '', user: ans || '', right: q.a, ok: !!ok }];
  } else if (q.type === 'sel' || q.type === 'gap') {
    const items = q.items.map(it => q.type === 'gap' ? { a: it } : it);
    n = items.length;
    const user = Array.isArray(ans) ? ans : [];
    const groupSeen = {};
    items.forEach((it, i) => {
      const v = user[i] || '';
      const acc = Array.isArray(it.a) ? it.a : [it.a];
      let good = norm(v) !== '' && acc.some(x => norm(x) === norm(v));
      if (good && it.g) { const k = it.g + '|' + norm(v); if (groupSeen[k]) good = false; else groupSeen[k] = 1; }
      if (good) ok++;
      rows.push({ t: it.t || '', user: v, right: acc.join(' / '), ok: good, topic: it.topic });
    });
  } else if (q.type === 'tf') {
    n = q.items.length;
    const user = Array.isArray(ans) ? ans : [];
    q.items.forEach((it, i) => {
      const u = user[i] || {}, v = u.v || '';
      let s = 0, right = it.a ? 'True' : 'False';
      if (it.a) s = v === 'T' ? 1 : 0;
      else if (v === 'F') {
        if (it.fix) { s = 0.5; if (it.fix.some(x => norm(x) === norm(u.fix))) s = 1; right = 'False → ' + it.fix[0]; }
        else s = 1;
      }
      ok += s;
      rows.push({ t: it.t, user: v === 'T' ? 'True' : v === 'F' ? 'False' + (it.fix && u.fix ? ' → ' + u.fix : '') : '', right, ok: s === 1, half: s > 0 && s < 1 });
    });
  } else if (q.type === 'short') {
    n = q.groups.length;
    const t = norm(ans);
    q.groups.forEach(g => {
      const hit = t !== '' && g.alt.some(a => t.includes(norm(a)));
      if (hit) ok++;
      rows.push({ t: g.l, user: '', right: '', ok: hit });
    });
  }
  let got = max * ok / n;
  let overridden = false;
  if (q.type === 'short' && ov != null) { got = max * ov; overridden = true; }
  return { got, max, rows, overridden };
}

function totals(mode, answers, overrides) {
  let got = 0, max = 0; const bySec = {}, byTopic = {}; const per = {};
  qList(mode).forEach(q => {
    const r = scoreQ(q, answers[q.id], overrides[q.id]);
    per[q.id] = r; got += r.got; max += r.max;
    const s = bySec[q.sec] = bySec[q.sec] || { got: 0, max: 0 }; s.got += r.got; s.max += r.max;
    // topic breakdown (item-level topic when present)
    if (q.items && q.items.some(i => i.topic)) {
      r.rows.forEach((row, i) => { const t = row.topic || q.topic; const b = byTopic[t] = byTopic[t] || { got: 0, max: 0 }; b.max += r.max / r.rows.length; if (row.ok) b.got += r.max / r.rows.length; });
    } else { const b = byTopic[q.topic] = byTopic[q.topic] || { got: 0, max: 0 }; b.got += r.got; b.max += r.max; }
  });
  return { got, max, ten: max ? got / max * 10 : 0, bySec, byTopic, per };
}

function grade(ten) {
  if (ten < 5) return { es: 'Insuficiente', ab: 'IN', cls: 'g-in', msg: 'Necesitas repasar un poco más. ¡Tú puedes!' };
  if (ten < 6) return { es: 'Suficiente', ab: 'SU', cls: 'g-su', msg: 'Aprobado. Repasa los temas marcados y lo harás mejor.' };
  if (ten < 7) return { es: 'Bien', ab: 'BI', cls: 'g-bi', msg: 'Bien hecho. Con un pequeño repaso llegarás más lejos.' };
  if (ten < 9) return { es: 'Notable', ab: 'NT', cls: 'g-nt', msg: '¡Muy bien! Casi lo tienes todo.' };
  return { es: 'Sobresaliente', ab: 'SB', cls: 'g-sb', msg: '¡Excelente trabajo!' };
}

/* ---------- rendering: questions ---------- */
const selectHtml = (qid, i, opts, val, cls = '') =>
  `<select class="sel ${cls}" data-q="${qid}" data-i="${i}" aria-label="Answer ${i + 1}"><option value="">—</option>${opts.map(o => `<option${o === val ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;

function mapHtml(q, user) {
  const S = i => selectHtml(q.id, i, q.o, user[i] || '', 'sel-map');
  const num = i => `<span class="mnum">${i + 1}</span>${S(i)}`;
  return `<div class="map">
    <div class="mrow"><span class="mbox big">Living organisms</span></div><div class="marrow">↓</div>
    <div class="mrow"><span class="mbox">Cells</span></div><div class="marrow">↓</div>
    <div class="mrow"><span class="mbox">Vital functions</span></div><div class="marrow">↓</div>
    <div class="mrow"><span class="mbox">Nutrition</span><span class="mslot">${num(0)}</span><span class="mslot">${num(1)}</span></div><div class="marrow">↓</div>
    <div class="mrow"><span class="mbox big">The five kingdoms</span></div>
    <div class="mrow wrap"><span class="mbox">Animalia</span><span class="mslot">${num(2)}</span><span class="mbox">Fungi</span><span class="mslot">${num(3)}</span><span class="mslot">${num(4)}</span></div><div class="marrow">↓</div>
    <div class="mrow"><span class="mbox big">Plants</span></div>
    <div class="mrow wrap top">
      <div class="mcol"><span class="mbox">Nutrition</span><div class="marrow">↓</div><span class="mslot">${num(5)}</span></div>
      <div class="mcol"><span class="mbox">Interaction</span><div class="marrow">↓</div><span class="mbox soft">React to light, water and contact</span></div>
      <div class="mcol"><span class="mbox">Reproduction</span><div class="marrow">↓</div><span class="mbox soft">Sexual</span><div class="marrow">+</div><span class="mslot">${num(6)}</span></div>
    </div></div>`;
}

function renderQ(q, n, answers) {
  const ans = answers[q.id];
  let body = '';
  if (q.type === 'mc') {
    const opts = shuffled(q.o, state.seed + hashStr(q.id));
    body = `<div class="opts" role="radiogroup">${opts.map(o => `<label class="opt"><input type="radio" name="${q.id}" data-q="${q.id}" value="${esc(o)}"${ans === o ? ' checked' : ''}><span>${esc(o)}</span></label>`).join('')}</div>`;
  } else if (q.type === 'sel') {
    const user = Array.isArray(ans) ? ans : [];
    if (q.map) body = mapHtml(q, user);
    else {
      const fig = q.svg ? `<figure class="fig">${SVGS[q.svg]()}</figure>` : '';
      const rows = q.items.map((it, i) => {
        const opts = it.o || q.o;
        if (q.svg) return `<div class="row letter"><span class="lt">${esc(it.t)}</span>${selectHtml(q.id, i, opts, user[i] || '')}</div>`;
        if (it.t.includes('___')) {
          const parts = it.t.split('___');
          return `<div class="row inline"><span>${esc(parts[0])}${selectHtml(q.id, i, opts, user[i] || '', 'sel-inline')}${esc(parts[1])}</span></div>`;
        }
        return `<div class="row"><span class="rt">${esc(it.t)}</span>${selectHtml(q.id, i, opts, user[i] || '')}</div>`;
      }).join('');
      body = fig + `<div class="rows${q.svg ? ' narrow' : ''}">${rows}</div>`;
    }
  } else if (q.type === 'gap') {
    const user = Array.isArray(ans) ? ans : [];
    const box = `<div class="wordbox" aria-label="Word box">${q.box.map(w => `<span class="chip">${esc(w)}</span>`).join('')}</div>`;
    const txt = esc(q.tpl).replace(/\{(\d+)\}/g, (_, k) => `<span class="mnum">${k}</span>` + selectHtml(q.id, k - 1, q.box, user[k - 1] || '', 'sel-inline'));
    body = box + `<p class="gaptext">${txt}</p>`;
  } else if (q.type === 'tf') {
    const user = Array.isArray(ans) ? ans : [];
    body = '<div class="rows">' + q.items.map((it, i) => {
      const u = user[i] || {};
      return `<div class="row tf"><span class="rt">${it.t}</span>
        <span class="tfbtns" role="radiogroup">
          <label class="tfb"><input type="radio" name="${q.id}-${i}" data-q="${q.id}" data-i="${i}" data-k="v" value="T"${u.v === 'T' ? ' checked' : ''}><span>True</span></label>
          <label class="tfb"><input type="radio" name="${q.id}-${i}" data-q="${q.id}" data-i="${i}" data-k="v" value="F"${u.v === 'F' ? ' checked' : ''}><span>False</span></label>
        </span>
        ${it.fix ? `<input class="txt fix" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="If false, write the correct word" data-q="${q.id}" data-i="${i}" data-k="fix" value="${esc(u.fix || '')}">` : ''}
      </div>`;
    }).join('') + '</div>';
  } else if (q.type === 'short') {
    body = `<textarea class="txt area" rows="3" placeholder="Write your answer in English…" data-q="${q.id}" spellcheck="true">${esc(ans || '')}</textarea>`;
  }
  const pts = `<span class="pts">${fmt(q.pts)} ${q.pts === 1 ? 'point' : 'points'}</span>`;
  return `<article class="q" id="q-${q.id}"><h3><span class="num">${n}</span><span class="qp">${q.p}</span>${pts}</h3>${body}</article>`;
}

const isAnswered = (q, a) => {
  if (a == null) return false;
  if (q.type === 'mc' || q.type === 'short') return norm(a) !== '';
  if (q.type === 'tf') return Array.isArray(a) && a.some(x => x && x.v);
  return Array.isArray(a) && a.some(x => x);
};
const answeredAll = (q, a) => {
  if (q.type === 'mc' || q.type === 'short') return isAnswered(q, a);
  if (q.type === 'tf') return Array.isArray(a) && q.items.every((_, i) => a[i] && a[i].v);
  const len = q.items.length; return Array.isArray(a) && Array.from({ length: len }).every((_, i) => a[i]);
};

/* ---------- views ---------- */
function head(title) {
  const nm = name ? esc(name) : '';
  return `<header class="top"><a class="brand" href="#/"><span class="mark">🌱</span><span>Natural Science 4 · Unit 1</span></a>
    <span class="who">${nm ? `Hi, <b>${nm}</b> · <a href="#/name">change</a>` : ''}</span></header>`;
}
const footer = () => `<footer class="foot"><p>Practice test for <b>Natural Science 4º EP · Unit 1 · Living Organisms</b>. Original questions, modelled on the unit’s topics and exercise types. This is not an official test.</p>
  <p>Licence <a href="LICENSE" target="_blank" rel="noopener">CC BY-NC 4.0</a> · Study game: <a href="${GAME}" target="_blank" rel="noopener">sanhipolito.net/primaria-4</a></p></footer>`;

function viewName() {
  app.innerHTML = `<main class="wrap narrow-wrap"><div class="card hello">
    <div class="bigmark">🌱</div>
    <h1>Welcome!</h1>
    <p class="lead">Natural Science · Unit 1 · Living Organisms<br><span class="es">Examen de práctica · Unit 1</span></p>
    <form id="nameForm"><label for="nm">What’s your name?<span class="es"> · ¿Cómo te llamas?</span></label>
      <input id="nm" class="txt big" type="text" maxlength="30" autocomplete="given-name" value="${esc(name)}" placeholder="Write your name" required>
      <button class="btn primary" type="submit">Let’s start</button></form>
  </div></main>`;
  const nm = document.getElementById('nm'); nm.focus();
  document.getElementById('nameForm').addEventListener('submit', e => {
    e.preventDefault(); const v = nm.value.trim(); if (!v) return; name = v; store.set(NAMEKEY, name); go('#/');
  });
}

function viewHome() {
  const hist = store.get(HIST, []).slice(-5).reverse();
  const cont = state && !state.finished && state.mode;
  app.innerHTML = head() + `<main class="wrap">
    <section class="card hero"><h1>Hi, ${esc(name)}! 👋</h1>
      <p class="lead">Ready for the Unit 1 test? Questions come from the same topics and exercise types as your book:
      living organisms, cells, the five kingdoms, plants, photosynthesis, reproduction and interaction.</p>
      ${cont ? `<div class="resume"><div><b>Test in progress</b><br><span class="es">${esc(modeLabel(state.mode))} · página ${state.page + 1} de ${sectionsOf(state.mode).length}</span></div>
         <div class="btnrow"><a class="btn primary" href="#/test/${state.mode}">Continue</a> <button class="btn ghost" data-act="discard">Start over</button></div></div>` : ''}
      <div class="grid2">
        <a class="tile big" href="#/test/full"><span class="ti">📝</span><b>Full test</b><span>${qList('full').length} questions · about 45 min</span></a>
        <a class="tile big" href="#/test/short"><span class="ti">⚡</span><b>Short test</b><span>${qList('short').length} questions · about 25 min</span></a>
      </div></section>
    <section class="card"><h2>Practice one topic <span class="es">· Practica un tema</span></h2>
      <div class="grid3">${SECTIONS.map(s => `<a class="tile" href="#/test/sec-${s.id}"><b>${esc(s.title)}</b><span class="es">${esc(s.es)}</span><span>${qList('sec-' + s.id).length} questions</span></a>`).join('')}</div></section>
    <section class="card"><h2>Study first <span class="es">· Repasa antes</span></h2>
      <p>Short notes with Spanish translations, the book pages and the game mission for each topic.</p>
      <div class="grid3">${Object.entries(TOPICS).map(([k, t]) => `<a class="tile soft" href="#/review/${k}"><b>${esc(t.title)}</b><span class="es">${esc(t.es)}</span><span>Book ${esc(t.book)}</span></a>`).join('')}</div></section>
    ${hist.length ? `<section class="card"><h2>Your last tries</h2><table class="hist"><tr><th>Date</th><th>Test</th><th>Score</th><th>Grade</th></tr>${hist.map(h => `<tr><td>${esc(new Date(h.date).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' }))}</td><td>${esc(h.label)}</td><td>${one(h.ten)} / 10</td><td><span class="gpill ${grade(h.ten).cls}">${grade(h.ten).es}</span></td></tr>`).join('')}</table></section>` : ''}
  </main>` + footer();
}

function viewTest(mode) {
  if (!validMode(mode)) return go('#/');
  if (!state || state.mode !== mode || state.finished) { state = newState(mode); saveState(); }
  const secs = sectionsOf(mode), list = qList(mode);
  state.page = Math.min(Math.max(state.page, 0), secs.length - 1);
  const sec = secs[state.page];
  // numbering
  let n = 0; const numOf = {}; list.forEach(q => { numOf[q.id] = ++n; });
  const qs = list.filter(q => q.sec === sec.id);
  const pct = Math.round(state.page / secs.length * 100);
  const last = state.page === secs.length - 1;
  app.innerHTML = head() + `<main class="wrap">
    <div class="bar"><div><b>${esc(modeLabel(mode))}</b> · Part ${state.page + 1} of ${secs.length}</div><div class="timer" id="timer" aria-label="Time">⏱ 0:00</div></div>
    <div class="progress" aria-hidden="true"><i style="width:${pct}%"></i></div>
    <h2 class="sectitle"><span class="secid">${sec.id}</span> ${esc(sec.title)} <span class="es">· ${esc(sec.es)}</span></h2>
    ${qs.map(q => renderQ(q, numOf[q.id], state.answers)).join('')}
    <nav class="nav">
      ${state.page > 0 ? '<button class="btn ghost" data-act="prev">← Back</button>' : '<a class="btn ghost" href="#/">Exit</a>'}
      ${last ? '<button class="btn primary" data-act="finish">Finish and see my score</button>' : '<button class="btn primary" data-act="next">Next →</button>'}
    </nav></main>`;
  tick();
}

function tick() {
  const el = document.getElementById('timer'); if (!el || !state) return;
  const s = Math.floor((Date.now() - state.startedAt) / 1000);
  el.textContent = '⏱ ' + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}
setInterval(tick, 1000);

function finishTest() {
  const list = qList(state.mode);
  const missing = list.filter(q => !isAnswered(q, state.answers[q.id])).length;
  if (missing && !confirm(`You have ${missing} question${missing > 1 ? 's' : ''} without any answer. Finish anyway?\n\nTienes ${missing} pregunta${missing > 1 ? 's' : ''} sin responder. ¿Terminar de todas formas?`)) return;
  state.finished = true; state.endedAt = Date.now();
  const t = totals(state.mode, state.answers, state.overrides);
  const hist = store.get(HIST, []); hist.push({ date: Date.now(), label: modeLabel(state.mode), ten: t.ten, got: t.got, max: t.max }); store.set(HIST, hist.slice(-30));
  saveState(); go('#/results');
}

function reviewLink(topic, label) {
  const t = TOPICS[topic]; if (!t) return '';
  return `<a class="rlink" href="#/review/${topic}">📖 Review: ${esc(label || t.title)}</a>`;
}

function itemFeedback(q, r) {
  if (q.type === 'mc') return `<p><span class="lab">Your answer:</span> ${r.rows[0].user ? esc(r.rows[0].user) : '<i>(no answer)</i>'}</p><p><span class="lab ok">Correct answer:</span> ${esc(q.a)}</p>`;
  if (q.type === 'short') {
    return `<p><span class="lab">Your answer:</span> ${state.answers[q.id] ? esc(state.answers[q.id]) : '<i>(no answer)</i>'}</p>
      <ul class="keys">${r.rows.map(x => `<li class="${x.ok ? 'ok' : 'no'}">${x.ok ? '✓' : '✗'} ${esc(x.t)}</li>`).join('')}</ul>
      <p><span class="lab ok">Model answer:</span> ${esc(q.model)}</p>
      <div class="adjust" data-q="${q.id}"><span class="es">Ajuste de una persona adulta · Adult can adjust the mark:</span>
        ${[[0, '0'], [0.5, '½'], [1, 'full']].map(([v, l]) => `<button class="btn tiny${r.overridden && state.overrides[q.id] === v ? ' on' : ''}" data-act="ov" data-q="${q.id}" data-v="${v}">${l}</button>`).join('')}
        ${r.overridden ? `<button class="btn tiny" data-act="ov" data-q="${q.id}" data-v="auto">auto</button>` : ''}
        <div class="es small">La corrección automática busca palabras clave; puede ser injusta con respuestas correctas escritas de otra forma.</div></div>`;
  }
  const wrong = r.rows.filter(x => !x.ok);
  return `<ul class="items">${r.rows.map(x => `<li class="${x.ok ? 'ok' : x.half ? 'half' : 'no'}"><span class="mark">${x.ok ? '✓' : x.half ? '½' : '✗'}</span>
    <span class="it">${q.type === 'tf' ? x.t : esc(x.t || '')}${x.t ? ' → ' : ''}<b>${esc(x.user || '—')}</b>${x.ok ? '' : ` <span class="corr">correct: <b>${esc(x.right)}</b></span>`}</span></li>`).join('')}</ul>${wrong.length ? '' : ''}`;
}

function viewResults() {
  if (!state || !state.finished) return go('#/');
  const list = qList(state.mode); let n = 0; const numOf = {}; list.forEach(q => { numOf[q.id] = ++n; });
  const t = totals(state.mode, state.answers, state.overrides), g = grade(t.ten);
  const secs = sectionsOf(state.mode);
  const mins = Math.max(1, Math.round(((state.endedAt || Date.now()) - state.startedAt) / 60000));
  const weak = Object.entries(t.byTopic).filter(([, b]) => b.max && b.got / b.max < 0.75).sort((a, b) => a[1].got / a[1].max - b[1].got / b[1].max);
  const full = list.filter(q => t.per[q.id].got >= q.pts - 1e-9).length;
  const show = (state.filter || 'mistakes');
  app.innerHTML = head() + `<main class="wrap">
    <section class="card result ${g.cls}">
      <p class="kicker">${esc(modeLabel(state.mode))} · ${mins} min</p>
      <h1>${g.ab === 'SB' || g.ab === 'NT' ? 'Great work' : 'Good effort'}, ${esc(name)}!</h1>
      <div class="scores">
        <div class="big10"><b>${one(t.ten)}</b><span>/ 10</span></div>
        <div class="pts2"><b>${fmt(Math.round(t.got * 100) / 100)}</b> / ${fmt(t.max)} points<br><span>${full} of ${list.length} questions fully correct</span></div>
        <div class="gpill big ${g.cls}">${g.es}</div>
      </div>
      <p class="es">${g.msg}</p>
      <p class="small scale">Escala: Insuficiente 0–4,9 · Suficiente 5–5,9 · Bien 6–6,9 · Notable 7–8,9 · Sobresaliente 9–10</p>
    </section>
    <section class="card"><h2>By part <span class="es">· Por apartados</span></h2>
      ${secs.map(s => { const b = t.bySec[s.id]; const p = b.got / b.max; return `<div class="bar2"><span class="bl">${s.id} · ${esc(s.title)}</span><span class="track"><i class="${p >= .75 ? 'hi' : p >= .5 ? 'mid' : 'lo'}" style="width:${Math.round(p * 100)}%"></i></span><span class="bv">${fmt(Math.round(b.got * 100) / 100)} / ${fmt(b.max)}</span></div>`; }).join('')}
    </section>
    <section class="card"><h2>What to review <span class="es">· Qué repasar</span></h2>
      ${weak.length ? `<ul class="weak">${weak.map(([k, b]) => `<li><b>${esc(TOPICS[k].title)}</b> <span class="es">(${esc(TOPICS[k].es)})</span> — ${Math.round(b.got / b.max * 100)}%<br>
        ${reviewLink(k, 'Notes')} · <span class="small">Book ${esc(TOPICS[k].book)} · Game: ${esc(TOPICS[k].game)}</span></li>`).join('')}</ul>`
        : '<p>Nothing to review: every topic is above 75%. 🎉</p>'}
    </section>
    <section class="card"><div class="rhead"><h2>Your answers <span class="es">· Tus respuestas</span></h2>
      <div class="seg"><button class="btn tiny${show === 'mistakes' ? ' on' : ''}" data-act="filter" data-v="mistakes">Only mistakes</button><button class="btn tiny${show === 'all' ? ' on' : ''}" data-act="filter" data-v="all">All questions</button></div></div>
      ${list.filter(q => show === 'all' || t.per[q.id].got < q.pts - 1e-9).map(q => { const r = t.per[q.id]; const st = r.got >= q.pts - 1e-9 ? 'ok' : r.got > 0 ? 'half' : 'no';
        const topics = [...new Set((r.rows || []).filter(x => !x.ok && x.topic).map(x => x.topic).concat(q.topic))].filter(k => TOPICS[k]);
        return `<article class="fb ${st}"><h3><span class="num">${numOf[q.id]}</span><span class="qp">${q.p}</span><span class="pts">${fmt(Math.round(r.got * 100) / 100)} / ${fmt(q.pts)}</span></h3>
          ${itemFeedback(q, r)}
          <div class="expl"><span class="lab">💡 Explicación</span><p>${md(q.exp)}</p><p>${topics.map(k => reviewLink(k)).join(' ')}</p></div></article>`; }).join('') || '<p>No mistakes. Well done! 🎉</p>'}
    </section>
    <nav class="nav"><a class="btn ghost" href="#/">Home</a><button class="btn ghost" data-act="print">🖨 Print</button><a class="btn primary" href="#/test/${state.mode}" data-act="again">Try again</a></nav>
  </main>` + footer();
}

function viewReview(key) {
  const t = TOPICS[key], nt = NOTES[key]; if (!t) return viewReviewList();
  app.innerHTML = head() + `<main class="wrap">
    <p><a href="#/review">← All topics</a></p>
    <section class="card"><h1>${esc(t.title)}</h1><p class="es lead">${esc(t.es)}</p>
      <ul class="src"><li>📘 <b>Book:</b> Natural Science 4, Unit 1, ${esc(t.book)}</li><li>🎮 <b>Game:</b> <a href="${GAME}" target="_blank" rel="noopener">${esc(t.game)}</a> <span class="small">(open the game, choose the mission)</span></li><li class="small">Lessons in the game: ${esc(t.lessons)}</li></ul></section>
    <section class="card"><h2>Remember</h2><ul class="notes">${nt.en.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>
    <section class="card"><h2>Words <span class="es">· Vocabulario</span></h2><table class="words">${nt.words.map(([a, b]) => `<tr><td><b>${esc(a)}</b></td><td class="es">${esc(b)}</td></tr>`).join('')}</table></section>
    <nav class="nav"><a class="btn primary" href="#/test/sec-${t.sec}">Practice this topic</a><a class="btn ghost" href="${GAME}" target="_blank" rel="noopener">Open the game ↗</a></nav></main>` + footer();
}
function viewReviewList() {
  app.innerHTML = head() + `<main class="wrap"><p><a href="#/">← Home</a></p><section class="card"><h1>Study notes <span class="es">· Repaso</span></h1>
    <div class="grid3">${Object.entries(TOPICS).map(([k, t]) => `<a class="tile soft" href="#/review/${k}"><b>${esc(t.title)}</b><span class="es">${esc(t.es)}</span><span>Book ${esc(t.book)}</span></a>`).join('')}</div></section></main>` + footer();
}

/* ---------- router ---------- */
function go(h) { if (location.hash === h) route(); else location.hash = h; }
function route() {
  const h = location.hash.replace(/^#\/?/, ''), p = h.split('/');
  if (!name && p[0] !== 'name') return viewName();
  window.scrollTo(0, 0);
  if (p[0] === 'name') return viewName();
  if (p[0] === 'test') return viewTest(p[1] || 'full');
  if (p[0] === 'results') return viewResults();
  if (p[0] === 'review') return p[1] ? viewReview(p[1]) : viewReviewList();
  viewHome();
}
window.addEventListener('hashchange', route);

/* ---------- events ---------- */
function setAnswer(el) {
  const qid = el.dataset.q, q = Q.find(x => x.id === qid); if (!q || !state || state.finished) return;
  const i = el.dataset.i != null ? Number(el.dataset.i) : null;
  if (q.type === 'mc') state.answers[qid] = el.value;
  else if (q.type === 'short') state.answers[qid] = el.value;
  else if (q.type === 'tf') { const a = Array.isArray(state.answers[qid]) ? state.answers[qid] : (state.answers[qid] = []); a[i] = Object.assign({}, a[i], { [el.dataset.k]: el.value }); }
  else { const a = Array.isArray(state.answers[qid]) ? state.answers[qid] : (state.answers[qid] = []); a[i] = el.value; }
  saveState();
}
app.addEventListener('change', e => { if (e.target.dataset && e.target.dataset.q) setAnswer(e.target); });
app.addEventListener('input', e => { if (e.target.dataset && e.target.dataset.q && (e.target.type === 'text' || e.target.tagName === 'TEXTAREA')) setAnswer(e.target); });
app.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const act = b.dataset.act;
  if (act === 'next' || act === 'prev') { state.page += act === 'next' ? 1 : -1; saveState(); viewTest(state.mode); window.scrollTo(0, 0); }
  else if (act === 'finish') finishTest();
  else if (act === 'discard') { if (confirm('Start over? Your current answers will be deleted.\n¿Empezar de nuevo? Se borrarán las respuestas actuales.')) { state = null; store.del(KEY); viewHome(); } }
  else if (act === 'ov') { const v = b.dataset.v; if (v === 'auto') delete state.overrides[b.dataset.q]; else state.overrides[b.dataset.q] = Number(v); saveState(); const y = window.scrollY; viewResults(); window.scrollTo(0, y); }
  else if (act === 'filter') { state.filter = b.dataset.v; saveState(); const y = window.scrollY; viewResults(); window.scrollTo(0, y); }
  else if (act === 'print') window.print();
  else if (act === 'again') { state = newState(state.mode); saveState(); }
});

route();
})();
