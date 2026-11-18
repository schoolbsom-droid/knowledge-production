// أدوات إضافية: افتتاحية المحطة (قطعة اللغز / الصورة المقربة)، الخريطة الذهنية، عجلة الحظ، لوحة الفرق بالأدوار
'use strict';
/* ===== افتتاحية المحطة: نافذة عند دخول المحطة (لا تغيّر ترتيب الأنشطة ولا التقدّم المحفوظ) ===== */
const opNorm = s => String(s || '').replace(/[ًٌٍَُِّْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/(^|\s)ال/g, '$1').toLowerCase();
function opSnippet(L) {
  for (const a of L.acts) {
    if (a.t === 'run' && a.items?.[0]?.code) return a.items[0].code;
    if (a.t === 'comic') { const p = (a.panels || []).find(x => x.code); if (p) return p.code; }
  }
  return null;
}
function opKeys(L) { const stop = ['في', 'مع', 'من', 'بلغة', 'بايثون', 'لغة', 'استخدام', 'باستخدام', 'الوحدة']; return L.title.replace(/[«»:().،]/g, ' ').split(/\s+/).filter(w => w.length >= 3 && !stop.includes(w)).map(opNorm).filter(w => w.length >= 3); }
function revealBox(host, L, save) {
  const code = opSnippet(L); if (!code) { host.innerHTML = '<p class="mute">لا توجد افتتاحية لهذه المحطة.</p>'; return; }
  const idx = LESSONS.indexOf(L), puzzle = idx % 2 === 0, cells = 12;
  const ox = 15 + Math.floor(Math.random() * 50), oy = 10 + Math.floor(Math.random() * 40);
  const zooms = [4.2, 3, 2, 1.4, 1]; let z = 0; const open = new Set();
  host.innerHTML = `<div class="opn"><div class="oph">${puzzle ? '🧩 قطعة اللغز' : '🔍 الصورة المقربة جدًا'} <span class="mute">خمّني: عن ماذا ستكون هذه المحطة؟</span></div>
  <div class="opstage"><pre class="mono opcode" style="transform-origin:${ox}% ${oy}%">${esc(code)}</pre>${puzzle ? `<div class="opgrid">${Array.from({ length: cells }, (_, k) => `<i data-k="${k}"></i>`).join('')}</div>` : ''}</div>
  <div class="row" style="justify-content:center;margin-top:8px"><button class="btn plum" id="opm">${puzzle ? '🧩 اكشفي قطعة' : '🔭 ابتعدي قليلًا'}</button><button class="btn ghost" id="opall">👁 اكشفي الكل</button></div>
  <div class="row" style="margin-top:8px"><input class="in" id="opg" placeholder="توقّعي: هذه المحطة عن…" maxlength="120" style="flex:1;min-width:180px"><button class="btn g" id="ops">✍ سجّلي توقّعي</button></div><div id="opr"></div></div>`;
  const pre = $('.opcode', host), grid = $('.opgrid', host);
  const paint = () => { if (puzzle) $$('i', grid).forEach(c => c.classList.toggle('off', open.has(+c.dataset.k))); else pre.style.transform = `scale(${zooms[z]})`; };
  const finish = () => { if (puzzle) for (let k = 0; k < cells; k++) open.add(k); z = zooms.length - 1; paint(); $('#opm', host).disabled = $('#opall', host).disabled = true;
    const g = $('#opg', host).value.trim(), hit = !!g && opKeys(L).some(k => opNorm(g).includes(k));
    $('#opr', host).innerHTML = `<div class="fb ${hit ? 'ok' : 'info'}">🎬 المحطة عن: <b>${esc(L.title)}</b>${g ? (hit ? ' — توقّعكِ قريب جدًا! 🎯' : ' — قارني توقّعكِ بالعنوان.') : ''}</div>`; };
  $('#opm', host).onclick = () => { if (puzzle) { const rest = [...Array(cells).keys()].filter(k => !open.has(k)); if (rest.length) open.add(rest[Math.floor(Math.random() * rest.length)]); if (open.size >= cells) finish(); } else { z = Math.min(z + 1, zooms.length - 1); if (z === zooms.length - 1) finish(); } beep(1); paint(); };
  $('#opall', host).onclick = finish;
  $('#ops', host).onclick = () => { const g = $('#opg', host).value.trim(); if (!g) return; const step = puzzle ? open.size : z; if (save) save({ g: g.slice(0, 120), step, hit: opKeys(L).some(k => opNorm(g).includes(k)) }); toast('✍ سُجّل توقّعكِ'); $('#ops', host).disabled = true; finish(); };
  paint();
}
function stationOpener(L, ai) {
  if (ai !== 0 || L.extra || L.project || L.exam || TEACHER || !opSnippet(L)) return;
  const k = 'op_' + L.id; if (S.cele?.[k]) return;
  const md = h(`<div class="modal"><div class="card" style="max-width:720px;width:100%"><div class="row" style="justify-content:space-between"><b>🎬 افتتاحية المحطة</b><button class="btn ghost" id="opx" style="padding:4px 12px">✕ إغلاق</button></div><div id="opb"></div></div></div>`);
  document.body.appendChild(md);
  const close = () => { md.remove(); S.cele ||= {}; if (!S.cele[k]) S.cele[k] = { seen: 1 }; save(); };
  $('#opx', md).onclick = close; md.onclick = e => { if (e.target === md) close(); };
  revealBox($('#opb', md), L, d => { (S.cele ||= {})[k] = d; save(); });
}

/* ===== الخريطة الذهنية والتصنيف: اسحبي أو اضغطي كل بطاقة إلى فرعها ===== */
function mindAct({ a, body, rec, got }) {
  const C = ['#6C5CE7', '#E17055', '#00A884', '#E0A800', '#0984E3', '#D63384'];
  let place = {}, sel = null, tries = 0; const prev = got('mm');
  body.innerHTML = `<div class="mm"><div class="mmc">${rich(a.center)}</div><div class="mmcats">${a.cats.map((c, j) => `<div class="mmcat" data-j="${j}" style="--c:${C[j % C.length]}"><b>${rich(c)}</b><div class="mmdrop"></div></div>`).join('')}</div>
  <div class="mute" style="margin:8px 0 4px">اسحبي كل بطاقة إلى فرعها، أو اضغطي البطاقة ثم اضغطي الفرع:</div><div class="mmpool"></div><div class="row" style="justify-content:center;margin-top:8px"><button class="btn g" id="mmk">✔ تحققي من الخريطة</button><button class="btn ghost" id="mmr">↺ ابدئي من جديد</button></div><div id="mmf"></div></div>`;
  const order = shuffle(a.items.map((_, i) => i));
  const chip = i => `<span class="mmchip" draggable="true" data-i="${i}">${rich(a.items[i][0])}</span>`;
  const paint = () => {
    $('.mmpool', body).innerHTML = order.filter(i => place[i] == null).map(chip).join('') || '<span class="mute">✔ وُزّعت كل البطاقات</span>';
    $$('.mmcat', body).forEach(c => { $('.mmdrop', c).innerHTML = Object.keys(place).filter(i => place[i] === +c.dataset.j).map(i => chip(+i)).join(''); });
    $$('.mmchip', body).forEach(ch => { ch.onclick = e => { e.stopPropagation(); sel = +ch.dataset.i; $$('.mmchip', body).forEach(x => x.classList.toggle('sel', x === ch)); };
      ch.ondragstart = e => { e.dataTransfer.setData('text/plain', ch.dataset.i); }; });
  };
  $$('.mmcat', body).forEach(c => { const put = i => { if (i == null || isNaN(i)) return; place[i] = +c.dataset.j; sel = null; beep(1); paint(); };
    c.onclick = () => put(sel); c.ondragover = e => { e.preventDefault(); c.classList.add('over'); }; c.ondragleave = () => c.classList.remove('over');
    c.ondrop = e => { e.preventDefault(); c.classList.remove('over'); put(+e.dataTransfer.getData('text/plain')); }; });
  $('#mmr', body).onclick = () => { place = {}; paint(); $('#mmf', body).innerHTML = ''; };
  $('#mmk', body).onclick = () => {
    if (Object.keys(place).length < a.items.length) return $('#mmf', body).innerHTML = '<div class="fb info">وزّعي كل البطاقات أولًا.</div>';
    const bad = a.items.map((it, i) => place[i] !== it[1] ? i : -1).filter(i => i >= 0);
    if (bad.length) { tries++; beep(0); bad.forEach(i => delete place[i]); paint(); $('#mmf', body).innerHTML = `<div class="fb no">${ar(bad.length)} من البطاقات في الفرع الخطأ، وأعدناها إلى الأسفل. فكّري: ما الذي يجمع بطاقات كل فرع؟</div>`; return; }
    const s = Math.max(8, 20 - tries * 4); if (rec('mm', s, { tries })) { confetti(); toast(`🧠 +${ar(s)} ⭐`); }
    $('#mmf', body).innerHTML = `<div class="fb ok">✔ اكتملت خريطتكِ الذهنية!</div>`; $('.mm', body).classList.add('done');
  };
  if (prev) a.items.forEach((it, i) => place[i] = it[1]);
  paint(); if (prev) $('#mmf', body).innerHTML = '<div class="fb ok">✔ أكملتِ هذه الخريطة من قبل.</div>';
}
const MINDS = {
  'pylab-g3': { center: 'هياكل البيانات والملفات في بايثون', cats: ['القوائم list', 'الصفوف tuple', 'القواميس dict', 'الملفات'], items: [['[1, 2, 3]', 0], ['append()', 0], ['a[-1]', 0], ['(4, 7, 9)', 1], ['لا يُعدَّل بعد إنشائه', 1], ['قوسان ( )', 1], ['{"Sara": 95}', 2], ['get()', 2], ['مفتاح وقيمة', 2], ['open("f.txt", "r")', 3], ['الوضع "a" للإضافة', 3], ['readline()', 3]] },
  'pylab-g1': { center: 'البرمجة مع بايثون', cats: ['أشكال المخطط الانسيابي', 'أنواع البيانات', 'المعاملات', 'أوامر السلحفاة'], items: [['البيضاوي', 0], ['المعيّن', 0], ['متوازي الأضلاع', 0], ['int', 1], ['str', 1], ['float', 1], ['bool', 1], ['**', 2], ['+=', 2], ['* و /', 2], ['forward()', 3], ['penup()', 3], ['circle()', 3]] },
  'pylab-g2': { center: 'برمجة الروبوت', cats: ['المتغيرات', 'التكرار', 'أوامر الحركة', 'عناصر البرمجة الجديدة'], items: [['speed = 10', 0], ['وحدة تحكم المراقبة', 0], ['for repeat_count in range(4):', 1], ['تكرار حتى', 1], ['while not Counter > 5:', 1], ['drivetrain.drive_for(FORWARD, 200, MM)', 2], ['drivetrain.turn_for(RIGHT, 90, DEGREES)', 2], ['set_drive_velocity', 2], ['def Petal():', 3], ['Petal(100)', 3], ['المعامل side', 3]] },
  'pylab-g2t1': { center: 'البرمجة مع بايثون (الفصل الأول)', cats: ['الجمل الشرطية', 'الحلقات', 'الدوال', 'إكسل وبايثون'], items: [['if...elif...else', 0], ['else:', 0], ['and و or', 0], ['range(1, 10, 2)', 1], ['while', 1], ['break', 1], ['def', 2], ['return', 2], ['global', 2], ['import openpyxl', 3], ['iter_rows', 3], ['wb.save()', 3]] },
};
(() => { // الخريطة الذهنية في محطة المراجعة بعد نشاط الاختراق (لا يتغير ترتيب ما قبلها)
  const M = MINDS[(window.LABCFG && window.LABCFG.lab) || 'pylab-g3'], L = LESSONS.find(x => x.id === 'cy' || x.id === 'tc'); if (!M || !L) return;
  const mi = L.acts.findIndex(a => a.t === 'master'); L.acts.splice(mi < 0 ? L.acts.length : mi, 0, { t: 'mind', title: 'الخريطة الذهنية للوحدة', goal: 'صنّفي مفاهيم الوحدة في فروعها الصحيحة لتبني صورة متكاملة.', ...M });
})();

/* ===== عجلة الحظ (للمعلمة): ستة أقسام، وكل قسم يسحب سؤالًا من محتوى المعمل نفسه ===== */
const WHEEL = [['معلومة سريعة', '💡', '#6C5CE7'], ['فكّري وأجيبي', '🤔', '#E17055'], ['ناقشي زميلتكِ', '🗣', '#00A884'], ['تحدٍّ سريع', '⏱', '#E0A800'], ['سؤال غامض', '🕵️', '#0984E3'], ['توقّعي ماذا يحدث؟', '🔮', '#D63384']];
function wheelPool(k, only) {
  const out = []; LESSONS.forEach(L => { if (only && L.id !== only) return; L.acts.forEach(a => {
    if (k === 0) { if (a.t === 'cyber') a.items.filter(x => x.ok).forEach(x => out.push({ q: x.s })); if (a.t === 'trap') a.items.filter(x => !x.trap).forEach(x => out.push({ q: x.say + (x.why ? ' ' + x.why : ''), code: x.code?.join('\n') })); }
    if (k === 1 && a.t === 'quiz') a.items.forEach(x => out.push({ q: x.q, code: x.code, o: x.o, a: x.a, why: x.why }));
    if (k === 2 && a.t === 'traffic') a.opinion.forEach(x => out.push({ q: x.s, tip: 'ناقشي زميلتكِ دقيقة، ثم شاركا رأيكما مع الدليل.' }));
    if (k === 3 && a.t === 'rush') a.items.forEach(x => out.push({ ...x, timer: 30 }));
    if (k === 4 && a.t === 'trap') a.items.forEach(x => out.push({ q: 'Mr. Trap يقول: ' + x.say + ' هل فيه فخ؟', code: x.code?.join('\n'), ans: x.trap ? 'نعم فيه فخ: ' + x.o[x.a] : 'لا فخ: كلامه صحيح.' }));
    if (k === 5 && a.t === 'run') a.items.filter(x => x.predict).forEach(x => out.push({ q: x.predict.q, code: x.code, o: x.predict.o, a: x.predict.a }));
  }); });
  if (!out.length) LESSONS.forEach(L => { if (!only || L.id === only) (L.skills || []).forEach(s => out.push({ q: 'اشرحي بكلماتكِ: ' + s })); });
  return out;
}
function vWheel() {
  let rot = 0, spinning = false; const used = new Set(), N = WHEEL.length;
  const seg = i => { const a0 = (i / N) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / N) * 2 * Math.PI - Math.PI / 2, r = 150, am = (a0 + a1) / 2;
    return `<path d="M160 160L${160 + r * Math.cos(a0)} ${160 + r * Math.sin(a0)}A${r} ${r} 0 0 1 ${160 + r * Math.cos(a1)} ${160 + r * Math.sin(a1)}Z" fill="${WHEEL[i][2]}" stroke="#fff" stroke-width="3"/><text x="${160 + 95 * Math.cos(am)}" y="${160 + 95 * Math.sin(am)}" text-anchor="middle" dominant-baseline="middle" font-size="30">${WHEEL[i][1]}</text>`; };
  main().innerHTML = `<div class="row" style="justify-content:space-between"><h1 class="h1">🎡 عجلة الحظ</h1><div class="row"><select class="in" id="wst" style="width:auto"><option value="">كل المحطات</option>${LESSONS.filter(L => !L.extra).map(L => `<option value="${L.id}">${esc(lname(L))}: ${esc(L.title)}</option>`).join('')}</select><label class="row" style="gap:4px;font-size:14px"><input type="checkbox" id="wnr" checked> بلا تكرار حتى تمرّ على كل الأقسام</label></div></div>
  <div class="wheelwrap"><div class="wptr">▼</div><svg viewBox="0 0 320 320" class="wheel" id="wh">${WHEEL.map((_, i) => seg(i)).join('')}<circle cx="160" cy="160" r="26" fill="#2B2030"/><text x="160" y="161" text-anchor="middle" dominant-baseline="middle" font-size="20">⚡</text></svg></div>
  <div class="wleg">${WHEEL.map(w => `<span style="--c:${w[2]}">${w[1]} ${w[0]}</span>`).join('')}</div>
  <div class="row" style="justify-content:center;margin:10px 0"><button class="btn plum" id="wsp" style="font-size:20px;padding:10px 30px">🎡 دوّري العجلة</button></div><div id="wres"></div>`;
  const wh = $('#wh');
  const showCard = k => {
    const items = wheelPool(k, $('#wst').value), it = items[Math.floor(Math.random() * items.length)], w = WHEEL[k];
    $('#wres').innerHTML = `<div class="card wcard" style="--c:${w[2]}"><div class="wtag">${w[1]} ${w[0]}</div><div class="tstate" style="font-size:24px">${rich(it.q)}</div>${it.code ? `<pre class="mono codeblk" style="font-size:18px">${esc(it.code)}</pre>` : ''}${it.o ? `<div class="topts">${it.o.map((o, j) => `<div class="topt" data-i="${j}"><b>${'أبجدهو'[j]}</b> ${rich(o)}</div>`).join('')}</div>` : ''}${it.tip ? `<div class="fb info">${rich(it.tip)}</div>` : ''}
    <div class="row" style="justify-content:center;margin-top:10px">${it.timer ? '<button class="btn ghost" id="wtm">⏱ ابدئي 30 ثانية</button>' : ''}${it.o || it.ans || it.why ? '<button class="btn sa" id="wans">إظهار الإجابة</button>' : ''}<button class="btn ghost" id="wagain">🎡 دوّري مرة أخرى</button></div><div id="wout"></div></div>`;
    $('#wagain').onclick = () => $('#wsp').click();
    if ($('#wans')) $('#wans').onclick = () => { $$('#wres .topt').forEach(o => o.classList.toggle('ok', +o.dataset.i === it.a)); const t = it.ans ? (Array.isArray(it.ans) ? it.ans[0] : it.ans) : (it.o ? null : it.why); $('#wout').innerHTML = (t ? `<div class="fb ok" style="font-size:20px">${rich(String(t))}</div>` : '') + (it.why && it.o ? `<div class="fb ok">${rich(it.why)}</div>` : ''); beep(1); };
    if (it.timer) $('#wtm').onclick = () => { let t = it.timer; const b = $('#wtm'); b.disabled = true; const iv = setInterval(() => { t--; if (!document.body.contains(b)) return clearInterval(iv); b.textContent = `⏱ ${ar(t)}`; if (t <= 0) { clearInterval(iv); b.textContent = '⏰ انتهى الوقت'; beep(0); } }, 1000); };
  };
  $('#wsp').onclick = () => {
    if (spinning) return; let pool = [...Array(N).keys()]; if ($('#wnr').checked) { if (used.size >= N) used.clear(); pool = pool.filter(i => !used.has(i)); }
    const k = pool[Math.floor(Math.random() * pool.length)]; used.add(k); spinning = true; $('#wres').innerHTML = '';
    const target = 360 - (k + 0.5) * 360 / N; rot += 360 * 5 + ((target - rot) % 360 + 360) % 360; wh.style.transform = `rotate(${rot}deg)`;
    setTimeout(() => { spinning = false; beep(1); showCard(k); }, 4200);
  };
}

/* ===== لوحة الفرق بالأدوار (للمعلمة): فرق، أدوار تتبدّل، نقاط جماعية، شارات، ترتيب ===== */
const ROLES = [['قائدة الفريق', '🧭', 'تنظّم العمل وتتأكد أن الجميع يشارك'], ['المحللة', '🧠', 'تقسّم المشكلة وتربط السبب بالنتيجة'], ['الباحثة عن الأدلة', '🔎', 'تبحث في الكتاب والكود عن الدليل'], ['الموثّقة', '📝', 'تكتب إجابة الفريق وخطوات الحل'], ['المتحدثة', '🎤', 'تعرض حل الفريق أمام الصف']];
const BADGES = [[10, '⭐', 'فريق نشيط'], [25, '🏅', 'فريق متميز'], [50, '🏆', 'أبطال المعمل']];
function vTeams() {
  const KEY = 'teams-' + ((window.LABCFG && window.LABCFG.lab) || 'pylab-g3');
  let T = null; try { T = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
  T ||= { teams: [['الصقور', 0], ['النجوم', 0], ['المبدعات', 0], ['العباقرة', 0]], shift: 0 };
  const store = () => { try { localStorage.setItem(KEY, JSON.stringify(T)); } catch (e) {} };
  const COL = ['#6C5CE7', '#E17055', '#00A884', '#E0A800', '#0984E3', '#D63384'];
  const paint = () => {
    const rank = T.teams.map((t, i) => [i, t[1]]).sort((a, b) => b[1] - a[1]);
    main().innerHTML = `<div class="row" style="justify-content:space-between"><h1 class="h1">👥 لوحة الفرق</h1><div class="row"><button class="btn ghost" id="tadd">＋ فريق</button><button class="btn ghost" id="trot">🔄 بدّلي الأدوار</button><button class="btn ghost" id="trs">↺ صفّري النقاط</button></div></div>
    <p class="mute">لكل فريق خمسة أدوار تتبدّل بين العضوات. النقاط للإجابة الصحيحة والتفسير واكتشاف الأخطاء والتعاون، لا للسرعة وحدها.</p>
    <div class="teams">${T.teams.map(([n, s], i) => `<div class="team" style="--c:${COL[i % 6]}">
      <div class="row" style="justify-content:space-between;flex-wrap:nowrap"><input class="in tname" data-i="${i}" value="${esc(n)}" maxlength="20"><span class="tscore">${ar(s)}</span></div>
      <div class="tbadges">${BADGES.filter(x => s >= x[0]).map(x => `<span>${x[1]} ${x[2]}</span>`).join('') || '<span class="mute">بلا شارات بعد</span>'}</div>
      <div class="troles">${ROLES.map((_, r) => { const R_ = ROLES[(r + T.shift + i) % ROLES.length]; return `<div title="${R_[2]}">${R_[1]} <b>${R_[0]}</b> <small class="mute">· العضوة ${ar(r + 1)}</small></div>`; }).join('')}</div>
      <div class="tbtns">${[['+1', 1, 'إجابة صحيحة'], ['+2', 2, 'تفسير'], ['+3', 3, 'اكتشاف خطأ'], ['+5', 5, 'تعاون'], ['−1', -1, 'تصحيح']].map(([l, v, t]) => `<button class="btn ghost" data-i="${i}" data-v="${v}">${l}<small>${t}</small></button>`).join('')}</div>
      ${T.teams.length > 2 ? `<button class="btn ghost tdel" data-i="${i}" style="font-size:12px;padding:2px 10px;margin-top:6px">حذف الفريق</button>` : ''}</div>`).join('')}</div>
    <h2 class="h2" style="margin-top:16px">🏁 الترتيب</h2><div class="trank">${rank.map(([i, s], k) => `<div><b>${['🥇', '🥈', '🥉'][k] || ar(k + 1)}</b> ${esc(T.teams[i][0])} <span class="tscore">${ar(s)}</span></div>`).join('')}</div>`;
    $$('.tbtns button').forEach(b => b.onclick = () => { const i = +b.dataset.i, before = T.teams[i][1]; T.teams[i][1] = Math.max(0, before + +b.dataset.v); store(); beep(+b.dataset.v > 0 ? 1 : 0);
      const nb = BADGES.find(x => before < x[0] && T.teams[i][1] >= x[0]); if (nb) { confetti(); toast(`${nb[1]} ${T.teams[i][0]}: ${nb[2]}!`); } paint(); });
    $$('.tname').forEach(x => x.onchange = () => { T.teams[+x.dataset.i][0] = x.value.trim() || 'فريق'; store(); paint(); });
    $$('.tdel').forEach(b => b.onclick = () => { if (!confirm('حذف هذا الفريق؟')) return; T.teams.splice(+b.dataset.i, 1); store(); paint(); });
    $('#tadd').onclick = () => { if (T.teams.length >= 6) return toast('ستة فرق كحد أقصى'); T.teams.push(['فريق ' + ar(T.teams.length + 1), 0]); store(); paint(); };
    $('#trot').onclick = () => { T.shift = (T.shift + 1) % ROLES.length; store(); paint(); toast('🔄 تبدّلت الأدوار'); };
    $('#trs').onclick = () => { if (!confirm('تصفير نقاط كل الفرق؟')) return; T.teams.forEach(t => t[1] = 0); store(); paint(); };
  };
  paint();
}
