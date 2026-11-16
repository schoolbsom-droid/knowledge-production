// إجابات الطالبات للمعلمة: تفاصيل كل طالبة + أصعب الأسئلة على الفصل
'use strict';
let TDATA = null, TROWS = [];
async function tData(force) {
  if (TDATA && !force) return TDATA;
  const tok = sessionStorage.getItem('ttok');
  const r = await rpc('api_t_lab_data', { p_token: tok, p_lab: LAB, p_slug: SLUG });
  TDATA = {}; r.forEach(x => TDATA[x.id] = x.data || {}); return TDATA;
}
const CL = { g: ['أخضر', 'var(--g)'], y: ['أصفر', '#C99700'], r: ['أحمر', 'var(--r)'] };
const OPN = { g: 'أوافق', y: 'غير متأكدة', r: 'لا أوافق' };
const CONFN = ['', 'خمّنت', 'عندي فكرة', 'شبه متأكدة', 'متأكدة', 'أستطيع شرحها'];
// يمر على كل سؤال مسجّل للطالبة ويعطي نصّه ونوعه وهل أخطأت أولًا
function eachItem(p, cb) {
  LESSONS.forEach(L => L.acts.forEach((a, ai) => {
    const it = p?.[L.id]?.[ai]?.it; if (!it) return;
    for (const [k, v] of Object.entries(it)) {
      const d = v.d || {}, i = +k.replace(/\D/g, '');
      let q = '', code = '', wrong = d.tries > 0 || d.wrong > 0;
      if (a.t === 'comic') q = a.q?.q;
      else if (a.t === 'run') { if (k[0] !== 'p') continue; q = a.items[i].predict.q + ' (' + a.items[i].h + ')'; code = a.items[i].code; }
      else if (a.t === 'traffic') { const arr = k[0] === 's' ? a.show : k[0] === 'o' ? a.opinion : a.move; q = arr[i]?.s; if (k[0] !== 'o' && v.s < 10) wrong = true; }
      else if (a.t === 'tpr') { if (k[0] === 't') { q = a.thumbs[i].s; if (v.s < 10) wrong = true; } else { q = a.conf[i].q; code = a.conf[i].code; wrong = d.p !== a.conf[i].a; } }
      else if (a.t === 'mission') { if (k === 'final') { q = a.final.q; } else { const m = a.missions[i]; q = `${m.type}: ${m.q}`; code = m.code || ''; if (v.s < 10) wrong = true; } }
      else if (a.t === 'prints') { q = k === 'final' ? a.final.q : a.prints.flat()[i]?.q; if (k === 'final') code = a.final.code || ''; }
      else if (a.t === 'match') q = a.title;
      else if (a.t === 'quiz') { q = a.items[i].q; code = a.items[i].code || ''; }
      else if (a.t === 'explore') { q = a.w === 'coords' ? `النقطة (${a.targets[i]})` : `list[${a.targets[i][0]}][${a.targets[i][1]}]`; if (v.s < 5) wrong = true; }
      else if (a.t === 'story') q = k === 'q' ? a.quiz.q : a.steps[i]?.ask?.q;
      else if (a.t === 'tools' || a.t === 'turtlepad') q = a.missions?.[i]?.goal || ('مهمة ' + (i + 1));
      else if (a.t === 'code') continue;
      cb({ L, a, ai, k, v, d, q: q || a.title, code, wrong, key: L.id + '|' + ai + '|' + k });
    }
  }));
}
function modal(html) {
  const md = h(`<div class="modal"><div class="card" style="max-width:900px"><div class="row" style="justify-content:flex-end"><button class="btn ghost x" style="padding:4px 12px">✕ إغلاق</button></div>${html}</div></div>`);
  document.body.appendChild(md); $('.x', md).onclick = () => md.remove(); md.onclick = e => { if (e.target === md) md.remove(); }; return md;
}
async function showStu(id) {
  const r = TROWS.find(x => x.id === id); if (!r) return;
  const md = modal('<p class="mute">جارٍ التحميل…</p>');
  let D; try { D = (await tData())[id]; } catch (e) { $('.card', md).innerHTML += '<p class="fb no">تعذّر التحميل</p>'; return; }
  const box = $('.card', md); $('.card > p.mute', md)?.remove();
  if (!D) { box.innerHTML += `<h2 class="h2">${esc(r.name)}</h2><p class="mute">لم تدخل المعمل بعد.</p>`; return; }
  const p = D.p || {}, ops = [], confs = [], wrongs = [], codes = [];
  eachItem(p, x => {
    if (x.a.t === 'traffic' && x.k[0] === 'o') ops.push(x);
    if (x.a.t === 'tpr' && x.k[0] === 'c') confs.push(x);
    if (x.wrong) wrongs.push(x);
  });
  LESSONS.forEach(L => L.acts.forEach((a, ai) => { if (a.t === 'code') { const st = p?.[L.id]?.[ai]; if (st) codes.push({ L, a, st }); } }));
  const sec = (t, n, body) => `<h3 style="margin:18px 0 6px;border-bottom:2px solid var(--line);padding-bottom:4px">${t} <span class="badge wait">${ar(n)}</span></h3>${n ? body : '<p class="mute">لا يوجد بعد.</p>'}`;
  box.innerHTML += `<div class="row" style="gap:14px"><div style="width:70px">${koda('happy')}</div><div style="flex:1"><h2 class="h1" style="font-size:28px;margin:0">${esc(r.name)}</h2><div class="mute">${esc(r.class)} · النقاط ${ar(r.score || 0)} · دخلت ${ar(r.visits || 0)} مرة</div></div></div>
  <div class="row" style="gap:6px;margin-top:8px">${LESSONS.map(L => { const v = Math.round(((r.pct || {})[L.id] || 0) * 100); return `<span class="badge ${v >= 80 ? '' : v ? 'go' : 'wait'}">${esc(lname(L))}: ${ar(v)}٪</span>`; }).join('')}</div>
  ${sec('🗣 آراؤها وأسبابها (إشارة المرور)', ops.length, ops.map(x => `<div class="q" style="margin:6px 0"><div>${rich(x.q)}</div><div style="margin-top:4px"><b style="color:${CL[x.d.c]?.[1]}">● ${OPN[x.d.c] || ''}</b> — «${esc(x.d.why || '')}»</div></div>`).join(''))}
  ${sec('✋ إجابتها ودرجة ثقتها', confs.length, `<table class="skills"><tr><th>السؤال</th><th>إجابتها</th><th>الثقة</th><th></th></tr>${confs.map(x => { const c = x.a.conf[+x.k.slice(1)], ok = x.d.p === c.a; return `<tr><td><pre class="mono" style="margin:0;font-size:12px;white-space:pre-wrap">${esc(c.code)}</pre></td><td class="mono" style="color:${ok ? 'var(--g)' : 'var(--r)'}">${ok ? '✔' : '✘'} ${esc(c.o[x.d.p] ?? '')}</td><td>${ar(x.d.n)} · ${CONFN[x.d.n] || ''}</td><td>${!ok && x.d.n >= 4 ? '<span class="badge" style="background:var(--r2);color:var(--r)">واثقة وأخطأت</span>' : ok && x.d.n <= 2 ? '<span class="badge go">أصابت بالتخمين</span>' : ''}</td></tr>`; }).join('')}</table>`)}
  ${sec('💻 الكود الذي كتبته', codes.length, codes.map(c => { const done = c.st.it?.done; return `<div class="q" style="margin:6px 0"><b>${esc(c.a.title)}</b> <span class="mute">(${esc(c.L.title)})</span> ${done ? '<span class="badge">✔ حلّته</span>' : '<span class="badge wait">لم تكمله</span>'} ${c.st.sol ? '<span class="badge go">شاهدت الحل</span>' : ''}${done?.d?.code ? `<pre class="mono codeblk" style="font-size:13px">${esc(done.d.code)}</pre>` : ''}</div>`; }).join(''))}
  ${sec('❌ أسئلة أخطأت فيها أول مرة', wrongs.length, `<table class="skills"><tr><th>المحطة</th><th>النشاط</th><th>السؤال</th></tr>${wrongs.map(x => `<tr><td style="white-space:nowrap">${lname(x.L)}</td><td style="white-space:nowrap">${TYPE[x.a.t][0]}</td><td>${rich(x.q)}${x.code ? `<pre class="mono" style="margin:4px 0 0;font-size:12px;white-space:pre-wrap">${esc(x.code)}</pre>` : ''}</td></tr>`).join('')}</table>`)}
  ${sec('🪞 تقييمها الذاتي (جدول المهارات)', Object.keys(D.self || {}).length, LESSONS.filter(L => D.self?.[L.id]).map(L => L.skills.map((s, i) => D.self[L.id][i] == null ? '' : `<div>• ${rich(s)}: <b style="color:${D.self[L.id][i] === 0 ? 'var(--g)' : 'var(--r)'}">${D.self[L.id][i] === 0 ? 'أتقنت' : 'لم أتقن بعد'}</b></div>`).join('')).join(''))}`;
}
async function hardQ() {
  const md = modal('<p class="mute">جارٍ التحليل…</p>');
  let all; try { all = await tData(true); } catch (e) { return; }
  const box = $('.card', md); $('.card > p.mute', md)?.remove(); const ids = Object.keys(all).filter(id => TL === 'all' || TROWS.find(r => r.id === +id)?.class === TL);
  const agg = {}, ops = {}, cw = [];
  ids.forEach(id => eachItem(all[id].p, x => {
    if (x.a.t === 'traffic' && x.k[0] === 'o') { (ops[x.key] ||= { q: x.q, g: 0, y: 0, r: 0 })[x.d.c]++; return; }
    const g = (agg[x.key] ||= { q: x.q, code: x.code, L: x.L, a: x.a, n: 0, w: 0 }); g.n++; if (x.wrong) g.w++;
    if (x.a.t === 'tpr' && x.k[0] === 'c' && x.wrong && x.d.n >= 4) cw.push(TROWS.find(r => r.id === +id)?.name);
  }));
  const top = Object.values(agg).filter(g => g.w).sort((a, b) => b.w / b.n - a.w / a.n || b.w - a.w).slice(0, 15);
  box.innerHTML += `<h2 class="h1" style="font-size:28px">📊 أصعب الأسئلة ${TL === 'all' ? 'على كل الفصول' : 'في ' + esc(TL)}</h2><p class="mute">من ${ar(ids.length)} طالبة دخلن المعمل. النسبة = من أخطأن أول مرة ÷ من أجبن.</p>
  ${top.length ? `<table class="skills"><tr><th>النسبة</th><th>المحطة</th><th>السؤال</th></tr>${top.map(g => `<tr><td style="white-space:nowrap"><b style="color:var(--r)">${ar(Math.round(g.w / g.n * 100))}٪</b> <span class="mute">(${ar(g.w)}/${ar(g.n)})</span></td><td style="white-space:nowrap">${lname(g.L)} · ${TYPE[g.a.t][0]}</td><td>${rich(g.q)}${g.code ? `<pre class="mono" style="margin:4px 0 0;font-size:12px;white-space:pre-wrap">${esc(g.code)}</pre>` : ''}</td></tr>`).join('')}</table>` : '<p class="mute">لا توجد أخطاء مسجّلة بعد.</p>'}
  <h3 style="margin-top:18px">🗣 آراء الفصل في «إشارة المرور»</h3>${Object.values(ops).length ? Object.values(ops).map(o => { const t = o.g + o.y + o.r; return `<div class="q" style="margin:6px 0"><div>${rich(o.q)}</div><div class="row" style="gap:12px;margin-top:4px"><b style="color:var(--g)">أوافق ${ar(o.g)}</b><b style="color:#C99700">غير متأكدة ${ar(o.y)}</b><b style="color:var(--r)">لا أوافق ${ar(o.r)}</b><div class="progress" style="flex:1;min-width:120px;display:flex"><i style="width:${o.g / t * 100}%;background:var(--g);border-radius:0"></i><i style="width:${o.y / t * 100}%;background:#F2C200;border-radius:0"></i><i style="width:${o.r / t * 100}%;background:var(--r);border-radius:0"></i></div></div></div>`; }).join('') : '<p class="mute">لا توجد آراء بعد.</p>'}
  ${cw.length ? `<h3>⚠ طالبات كنّ واثقات وأخطأن (يحتجن متابعة)</h3><p>${[...new Set(cw)].map(n => `<span class="badge" style="background:var(--r2);color:var(--r);margin:2px">${esc(n)}</span>`).join('')}</p>` : ''}`;
}
