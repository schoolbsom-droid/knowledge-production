// استراتيجيات إضافية: تحدي 30 ثانية، Mr. Trap صائد الأخطاء، الاختراق السيبراني، التذكرة الختامية
'use strict';
/* ---------- Mr. Trap: شخصية ثابتة في كل الدروس ---------- */
function mrTrap(m = 'sly') {
  const eyes = m === 'oops' ? '<path d="M40 52 l8 6 M48 52 l-8 6 M72 52 l8 6 M80 52 l-8 6" stroke="#2B2030" stroke-width="3.5" stroke-linecap="round"/>'
    : '<path d="M38 56 q6-7 12 0" stroke="#2B2030" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="76" cy="55" r="8" fill="#fff" stroke="#C9A227" stroke-width="3"/><circle cx="77" cy="56" r="3.2" fill="#2B2030"/><path d="M84 59 q6 10 2 20" stroke="#C9A227" stroke-width="2" fill="none"/>';
  const mouth = m === 'oops' ? '<ellipse cx="60" cy="84" rx="8" ry="6" fill="#2B2030"/>' : '<path d="M48 82 q12 9 26 -2" stroke="#2B2030" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
  return `<svg viewBox="0 0 120 150" role="img" aria-label="Mr. Trap"><rect x="28" y="2" width="64" height="34" rx="5" fill="#2B2030"/><rect x="18" y="32" width="84" height="9" rx="4" fill="#2B2030"/><rect x="28" y="24" width="64" height="7" fill="#E5484D"/>
  <ellipse cx="60" cy="68" rx="38" ry="34" fill="#9FD8B0" stroke="#2B2030" stroke-width="4"/>${eyes}<path d="M42 70 q9 -6 18 0 q9 -6 18 0 q-9 6 -18 1 q-9 5 -18 -1z" fill="#2B2030"/>${mouth}
  <path d="M30 104 q30 -10 60 0 l6 40 h-72z" fill="#6E4A8E" stroke="#2B2030" stroke-width="4"/><path d="M52 102 l8 14 l8 -14" fill="#fff" stroke="#2B2030" stroke-width="3"/><path d="M60 116 l-5 6 5 6 5-6z" fill="#E5484D"/></svg>`;
}
const trapSay = (html, m = 'sly') => `<div class="trapsay"><div class="who">${mrTrap(m)}</div><div class="bub"><b style="color:#6E4A8E">Mr. Trap:</b> ${html}</div></div>`;
const optBtns = (o, cls = 'opt', mono) => o.map((x, k) => `<button class="${cls}${mono ? ' mono' : ''}" data-k="${k}">${mono ? esc(x) : rich(x)}</button>`).join('');
const okAns = (it, v) => (it.ans || []).some(a => normA(a) === normA(v));

/* ---------- ١) تحدي 30 ثانية ---------- */
function rushAct({ a, body, rec, got }) {
  const SEC = a.sec || 30, N = a.items.length; let i = 0, score = 0, timer = null;
  const start = () => { i = 0; score = 0; ask(); };
  body.innerHTML = `<div class="rush"><div class="rhead"><span class="rbadge">⏱ ${ar(SEC)} ثانية</span><b>${ar(N)} أسئلة سريعة. لكل سؤال ${ar(SEC)} ثانية.</b><span class="mute">الإجابة الصحيحة تكسب النقاط مهما كان وقتها، فلا تستعجلي على حساب الدقة.</span></div><div id="rz"></div></div>`;
  const Z = $('#rz', body);
  const intro = () => { Z.innerHTML = `<div style="text-align:center;padding:16px"><div class="rbig">⏱</div><button class="btn plum" id="rgo">ابدئي التحدي</button></div>`; $('#rgo', Z).onclick = start; };
  const ask = () => {
    clearInterval(timer); if (i >= N) return end(); const it = a.items[i], key = 'r' + i; let left = SEC, over = false;
    Z.innerHTML = `<div class="rtop"><span>السؤال ${ar(i + 1)} من ${ar(N)}</span><span class="rclock" id="rc">${ar(left)}</span></div><div class="rbar"><i id="rb"></i></div>
    <div class="q"><div class="qt">${rich(it.q)}</div>${it.code ? `<pre class="mono codeblk">${esc(it.code)}</pre>` : ''}${it.o ? `<div class="opts">${optBtns(it.o, 'opt', it.mono)}</div>` : `<div class="row"><input class="in mono" id="ri" autocomplete="off" spellcheck="false" style="flex:1;min-width:140px" placeholder="اكتبي الإجابة"><button class="btn g" id="rk">✔</button></div>`}<div class="fbw"></div></div><div class="row" style="justify-content:center"><button class="btn" id="rn" hidden>التالي ←</button></div>`;
    const fin = (ok, msg) => { if (over) return; over = true; clearInterval(timer); if (ok) { score++; beep(1); rec(key, 5, { t: SEC - left }); } else beep(0);
      $$('.opt', Z).forEach(b => { b.disabled = true; if (it.o && +b.dataset.k === it.a) b.classList.add('ok'); }); if ($('#ri', Z)) $('#ri', Z).disabled = true;
      $('.fbw', Z).innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}">${msg} ${it.why ? rich(it.why) : ''}${!ok && !it.o ? ' الإجابة: <code dir="ltr">' + esc(it.ans[0]) + '</code>' : ''}</div>`; const n = $('#rn', Z); n.hidden = false; n.textContent = i < N - 1 ? 'التالي ←' : 'النتيجة 🏁'; n.onclick = () => { i++; ask(); }; };
    if (it.o) $$('.opt', Z).forEach(b => b.onclick = () => { const ok = +b.dataset.k === it.a; if (!ok) b.classList.add('no'); fin(ok, ok ? '✔ صحيح!' : '✘ ليست هذه.'); });
    else { const go_ = () => { const v = $('#ri', Z).value; if (!v.trim()) return; fin(okAns(it, v), okAns(it, v) ? '✔ صحيح!' : '✘ ليست هذه.'); }; $('#rk', Z).onclick = go_; $('#ri', Z).onkeydown = e => { if (e.key === 'Enter') go_(); }; $('#ri', Z).focus(); }
    timer = setInterval(() => { left--; const c = $('#rc', Z), b = $('#rb', Z); if (!c) return clearInterval(timer); c.textContent = ar(Math.max(0, left)); b.style.width = (left / SEC * 100) + '%'; c.classList.toggle('hot', left <= 10); if (left <= 0) fin(false, '⏰ انتهى الوقت!'); }, 1000);
  };
  const end = () => { const all = a.items.every((_, k) => got('r' + k)); if (score === N) confetti();
    Z.innerHTML = `<div style="text-align:center;padding:14px"><div class="rbig">${score === N ? '🏆' : score >= N / 2 ? '👏' : '💪'}</div><h2 class="h2">${ar(score)} من ${ar(N)} في هذه الجولة</h2><p class="mute">${all ? 'جمعتِ نقاط كل الأسئلة.' : 'الأسئلة التي لم تُحلّ بعد ما زالت تكسب نقاطًا. أعيدي التحدي!'}</p><button class="btn plum" id="rgo">↺ أعيدي التحدي</button></div>`; $('#rgo', Z).onclick = start; };
  intro();
}

/* ---------- ٢) Mr. Trap صائد الأخطاء ---------- */
function trapAct({ a, body, rec, got }) {
  body.innerHTML = trapSay('أنا صائد الأخطاء! سأقول كلامًا أو أكتب كودًا، وأحيانًا أخبّئ فيه فخًّا 😏. هل تستطيعين كشفي؟ لا تصدقيني بسرعة!') + '<div id="tz"></div>';
  const Z = $('#tz', body);
  a.items.forEach((it, i) => {
    const key = 't' + i, card = h(`<div class="trapc"><div class="trq"><span class="trn">${ar(i + 1)}</span><div>${rich(it.say)}${it.code ? `<div class="icode ${it.trap && it.bad >= 0 ? '' : ''}">${it.code.map((l, k) => `<div class="ln" data-l="${k}">${esc(l) || ' '}</div>`).join('')}</div>` : ''}</div></div><div class="trb"></div></div>`);
    Z.appendChild(card); const B = $('.trb', card); let tries = 0;
    const done = msg => { const s = Math.max(4, 10 - tries * 3); if (rec(key, s, { tries })) toast(`✔ +${ar(s)} ⭐`); card.classList.add('ok'); B.innerHTML = `<div class="fb ok">${msg} ${it.why ? rich(it.why) : ''}</div>`; };
    if (got(key)) { card.classList.add('ok'); B.innerHTML = `<div class="fb ok">✔ كشفتِ هذا من قبل. ${it.why ? rich(it.why) : ''}</div>`; return; }
    const step1 = () => { B.innerHTML = `<div class="row"><button class="btn" data-v="1" style="background:var(--r);color:#fff">🪤 فيه فخ!</button><button class="btn g" data-v="0">✔ كلامه صحيح</button></div><div class="fbw"></div>`;
      $$('button', B).forEach(b => b.onclick = () => { const said = b.dataset.v === '1';
        if (said !== !!it.trap) { tries++; beep(0); b.disabled = true; $('.fbw', B).innerHTML = `<div class="fb no">${it.trap ? 'Mr. Trap يضحك: «خدعتكِ!» 😏 اقرئي مرة أخرى بدقة.' : 'لا فخ هنا هذه المرة! أحيانًا يقول الحقيقة ليختبر ثقتكِ.'}</div>`; return; }
        beep(1); if (!it.trap) return done('✔ صحيح، لا فخ هذه المرة.'); (it.code && it.bad >= 0) ? step2() : step3(); }); };
    const step2 = () => { B.innerHTML = '<div class="fb info">👆 اضغطي على السطر الذي فيه الفخ.</div>'; const cd = $('.icode', card); cd.classList.add('clk');
      $$('.ln', cd).forEach(d => d.onclick = () => { if (!cd.classList.contains('clk')) return; if (+d.dataset.l === it.bad) { beep(1); cd.classList.remove('clk'); d.classList.add('bad'); step3(); } else { tries++; beep(0); d.classList.add('shk'); setTimeout(() => d.classList.remove('shk'), 400); } }); };
    const step3 = () => { B.innerHTML = `<div class="fb info">${it.code && it.bad >= 0 ? 'كيف نصحّح هذا السطر؟' : 'ما التصحيح؟'}</div><div class="opts">${optBtns(it.o, 'opt', it.mono)}</div>`;
      $$('.opt', B).forEach(b => b.onclick = () => { if (+b.dataset.k === it.a) { beep(1); if (it.code && it.bad >= 0) { const ln = $(`.ln[data-l="${it.bad}"]`, card); ln.classList.remove('bad'); ln.classList.add('fixd'); if (it.mono) ln.textContent = it.o[it.a]; } done('🎯 كشفتِ الفخ وصحّحتِه!'); }
        else { tries++; beep(0); b.classList.add('no'); b.disabled = true; } }); };
    step1();
  });
}

/* ---------- ٣) الاختراق السيبراني ---------- */
function cyberAct({ a, body, rec, got }) {
  const N = a.items.length, MIN = a.min || 10;
  body.innerHTML = `<div class="cyber"><div class="chead"><div><div class="cglitch">⚠ SYSTEM BREACH</div><b>تم اختراق ملف الدرس!</b><div class="cmut">${rich(a.story || 'تلاعب مخترق ببعض معلومات الوحدة. افحصي كل عبارة: سليمة أم مخترقة؟ وصحّحي المخترقة لاستعادة المعرفة.')}</div></div><div class="cstat"><div class="cmut">سلامة النظام</div><div class="cpct" id="cp">0%</div><div class="cmeter"><i id="cm"></i></div><div class="cmut" id="ct"></div></div></div>
  <div id="cz"></div><div id="crb"></div></div>`;
  const Z = $('#cz', body); let t0 = Date.now(), tick = null;
  const restored = () => a.items.filter((_, i) => got('y' + i)).length;
  const paint = () => { const p = Math.round(restored() / N * 100); $('#cp', body).textContent = p + '%'; $('#cm', body).style.width = p + '%'; if (p === 100) finish(); };
  tick = setInterval(() => { const el = $('#ct', body); if (!el) return clearInterval(tick); const left = MIN * 60 - Math.floor((Date.now() - t0) / 1000); el.textContent = left > 0 ? `⏳ ${ar(Math.floor(left / 60))}:${ar(String(left % 60).padStart(2, '0'))}` : '⏳ انتهى الوقت، أكملي المهمة'; }, 1000);
  a.items.forEach((it, i) => {
    const row = h(`<div class="crow" id="cr${i}"><div class="cn">${ar(i + 1)}</div><div class="cs"><div>${rich(it.s)}</div><div class="cb"></div></div></div>`); Z.appendChild(row);
    const B = $('.cb', row); let tries = 0;
    const ok = msg => { row.classList.add('fixed'); const s = Math.max(4, 10 - tries * 3); if (rec('y' + i, s, { tries, ev: ($('input', row)?.value || '').slice(0, 200) })) beep(1); B.innerHTML = `<div class="cok">✔ ${msg}</div>`; paint(); };
    if (got('y' + i)) { row.classList.add('fixed'); B.innerHTML = `<div class="cok">✔ ${it.ok ? 'عبارة سليمة' : 'استُعيدت: ' + rich(it.o[it.a])}</div>`; return; }
    B.innerHTML = `<div class="row" style="margin-top:6px"><button class="cbtn" data-v="1">✔ سليمة</button><button class="cbtn bad" data-v="0">⚠ مخترقة</button></div><input class="in" style="margin-top:6px" placeholder="الدليل (اختياري): لماذا حكمتِ هكذا؟" maxlength="200"><div class="fbw"></div>`;
    $$('.cbtn', B).forEach(b => b.onclick = () => { const said = b.dataset.v === '1';
      if (said !== !!it.ok) { tries++; beep(0); b.disabled = true; $('.fbw', B).innerHTML = `<div class="cno">⛔ رفض النظام الحكم.${tries >= 2 && it.hint ? ' تلميح: ' + rich(it.hint) : ' راجعي ما تعلمتِه في الوحدة.'}</div>`; return; }
      if (it.ok) return ok('عبارة سليمة. لم يلمسها المخترق.');
      $('.fbw', B).innerHTML = `<div class="cmut" style="margin:6px 0">اختاري المعلومة الصحيحة لاستعادتها:</div><div class="opts">${optBtns(it.o, 'opt')}</div>`; $$('.cbtn', B).forEach(x => x.disabled = true);
      $$('.opt', B).forEach(o => o.onclick = () => { if (+o.dataset.k === it.a) ok('استُعيدت: ' + rich(it.o[it.a])); else { tries++; beep(0); o.classList.add('no'); o.disabled = true; } }); });
  });
  const finish = () => { if ($('#crb .done', body)) return; clearInterval(tick); const prev = got('rb');
    $('#crb', body).innerHTML = `<div class="cwin done"><div class="cglitch" style="color:#5EF2B0">✔ SYSTEM RESTORED 100%</div><b>أعدتِ بناء المعرفة الصحيحة!</b><div class="cmut" style="margin:6px 0">إعادة بناء الدرس: اكتبي أهم المعلومات الصحيحة بعد اكتشاف الأخطاء (3 أسطر على الأقل).</div><textarea class="in" rows="5" ${prev ? 'disabled' : ''}>${esc(prev?.d?.text || '')}</textarea>${prev ? '<div class="cok">✔ وصلت إعادة البناء للمعلمة</div>' : '<button class="btn g" id="cs" style="margin-top:6px">✉ أرسلي إعادة البناء</button><div class="fbw"></div>'}</div>`;
    if (!prev) $('#cs', body).onclick = () => { const tx = $('#crb textarea', body).value.trim(); if (tx.split('\n').filter(l => l.trim()).length < 3) return $('#crb .fbw', body).innerHTML = '<div class="cno">اكتبي 3 أسطر على الأقل.</div>'; rec('rb', 10, { text: tx.slice(0, 2000) }); confetti(); $('#cs', body).remove(); $('#crb textarea', body).disabled = true; $('#crb .fbw', body).innerHTML = '<div class="cok">✔ وصلت إعادة البناء للمعلمة</div>'; }; };
  paint();
}

/* ---------- ٤) التذكرة الختامية ---------- */
function exitAct({ a, L, body, rec, got }) {
  const T = a.ticket, prev = got('x'), skills = (L?.skills || []);
  body.innerHTML = `<div class="ticket"><div class="tkh">🎫 تذكرة الخروج <span class="mute">قبل أن تغادري المحطة</span></div>
  <div class="q"><div class="qt">١. ${rich(T.mcq.q)}</div>${T.mcq.code ? `<pre class="mono codeblk">${esc(T.mcq.code)}</pre>` : ''}<div class="opts" id="x1">${optBtns(T.mcq.o, 'opt', T.mcq.mono)}</div><input class="in" id="xr" style="margin-top:6px" placeholder="لماذا اخترتِ هذه الإجابة؟ (سببكِ)" maxlength="200"></div>
  <div class="q"><div class="qt">٢. صحّحي الخطأ: ${rich(T.fix.s)}</div><input class="in mono" id="xf" autocomplete="off" spellcheck="false" placeholder="اكتبي التصحيح"></div>
  <div class="q"><div class="qt">٣. ما أصعب شيء في هذه المحطة بالنسبة لكِ؟</div><div class="opts" id="x3">${optBtns([...skills, 'لا شيء، كله واضح'], 'opt')}</div>
  <div class="qt" style="margin-top:10px">ما مدى فهمكِ للمحطة؟</div><div class="row" id="x4">${[1, 2, 3, 4, 5].map(n => `<button class="ipc" data-n="${n}" style="font-family:Rubik">${'★'.repeat(n)}</button>`).join('')}</div>
  <input class="in" id="xn" style="margin-top:6px" placeholder="سؤال أو ملاحظة للمعلمة (اختياري)" maxlength="200"></div>
  <div class="row" style="justify-content:center"><button class="btn g" id="xs">🎫 سلّمي التذكرة</button></div><div id="xo"></div></div>`;
  let pick = null, hard = null, conf = 0;
  $$('#x1 .opt', body).forEach(b => b.onclick = () => { pick = +b.dataset.k; $$('#x1 .opt', body).forEach(x => x.classList.toggle('sel', x === b)); });
  $$('#x3 .opt', body).forEach(b => b.onclick = () => { hard = +b.dataset.k; $$('#x3 .opt', body).forEach(x => x.classList.toggle('sel', x === b)); });
  $$('#x4 .ipc', body).forEach(b => b.onclick = () => { conf = +b.dataset.n; $$('#x4 .ipc', body).forEach(x => x.classList.toggle('right', +x.dataset.n <= conf)); });
  const show = d => { const ok1 = d.p === T.mcq.a, ok2 = d.ok2;
    $('#xo', body).innerHTML = `<div class="fb ${ok1 && ok2 ? 'ok' : 'info'}">${ok1 ? '✔' : '✘'} السؤال ١: ${ok1 ? 'صحيح' : 'الإجابة الصحيحة: ' + rich(T.mcq.o[T.mcq.a])}${T.mcq.why ? ' — ' + rich(T.mcq.why) : ''}<br>${ok2 ? '✔' : '✘'} السؤال ٢: ${ok2 ? 'تصحيح سليم' : 'التصحيح: <code dir="ltr">' + esc(T.fix.ans[0]) + '</code>'}<br>🎫 وصلت تذكرتكِ للمعلمة. ${d.c <= 2 ? 'ستساعدكِ المعلمة في ما وجدتِه صعبًا 💜' : 'أحسنتِ!'}</div>`;
    $$('#xs, .ticket input, .ticket .opt, .ticket .ipc', body).forEach(x => x.disabled = true); };
  if (prev) { const d = prev.d || {}; $$('#x1 .opt', body).forEach(x => x.classList.toggle('sel', +x.dataset.k === d.p)); $('#xr', body).value = d.r || ''; $('#xf', body).value = d.f || ''; $$('#x3 .opt', body).forEach(x => x.classList.toggle('sel', +x.dataset.k === d.h)); $$('#x4 .ipc', body).forEach(x => x.classList.toggle('right', +x.dataset.n <= (d.c || 0))); $('#xn', body).value = d.n || ''; return show(d); }
  $('#xs', body).onclick = () => {
    const r = $('#xr', body).value.trim(), f = $('#xf', body).value.trim();
    if (pick == null || !r || !f || hard == null || !conf) return $('#xo', body).innerHTML = '<div class="fb info">أكملي كل أجزاء التذكرة: الإجابة وسببها، والتصحيح، والأصعب، ومدى الفهم.</div>';
    const d = { p: pick, r: r.slice(0, 200), f: f.slice(0, 200), ok2: okAns(T.fix, f), h: hard, hs: hard < skills.length ? skills[hard] : 'لا شيء', c: conf, n: $('#xn', body).value.trim().slice(0, 200), wrong: pick !== T.mcq.a ? 1 : 0 };
    const s = (pick === T.mcq.a ? 10 : 0) + (d.ok2 ? 10 : 0) + 10; rec('x', s, d); beep(1); toast(`🎫 +${ar(s)} ⭐`); show(d);
  };
}

/* ---------- ملخص التذاكر للمعلمة ---------- */
function exitSummary(all, ids) {
  const rows = [];
  LESSONS.forEach(L => L.acts.forEach((a, ai) => { if (a.t !== 'exit') return;
    const ds = ids.map(id => all[id]?.p?.[L.id]?.[ai]?.it?.x?.d).filter(Boolean); if (!ds.length) return;
    const hard = {}; ds.forEach(d => hard[d.hs] = (hard[d.hs] || 0) + 1);
    const avg = ds.reduce((x, d) => x + (d.c || 0), 0) / ds.length, w1 = ds.filter(d => d.p !== a.ticket.mcq.a).length, w2 = ds.filter(d => !d.ok2).length;
    const notes = ds.filter(d => d.n).map(d => d.n);
    rows.push(`<div class="q" style="margin:6px 0"><b>${esc(lname(L))}: ${esc(L.title)}</b> <span class="badge wait">${ar(ds.length)} تذكرة</span> <span class="badge ${avg >= 4 ? '' : avg >= 3 ? 'go' : ''}" style="${avg < 3 ? 'background:var(--r2);color:var(--r)' : ''}">الفهم ${ar(avg.toFixed(1))} / ٥</span>
      <div style="margin-top:4px">❌ أخطأن في سؤال الفهم: <b>${ar(w1)}</b> · في التصحيح: <b>${ar(w2)}</b></div>
      <div style="margin-top:4px">🧩 الأصعب عندهن: ${Object.entries(hard).sort((x, y) => y[1] - x[1]).map(([k, n]) => `<span class="badge" style="margin:2px">${esc(k)} (${ar(n)})</span>`).join('')}</div>
      ${notes.length ? `<details style="margin-top:4px"><summary class="mute">أسئلتهن وملاحظاتهن (${ar(notes.length)})</summary>${notes.map(n => `<div>• ${esc(n)}</div>`).join('')}</details>` : ''}</div>`); }));
  return `<h3 style="margin-top:18px">🎫 التذاكر الختامية: ما يحتاج إعادة شرح</h3>${rows.length ? rows.join('') : '<p class="mute">لم تُسلَّم تذاكر بعد.</p>'}`;
}

/* ---------- إضافة الاستراتيجيات إلى محطات أي معمل ---------- */
// STRAT = { idالمحطة: { rush, trap, exit } } · examId = المحطة التي تأتي قبلها محطة الاختراق · items = عبارات الاختراق
function addStrategies(STRAT, examId, cyberItems, pages) {
  LESSONS.forEach(L => {
    const S_ = STRAT[L.id]; if (!S_) return;
    const ci = L.acts.findIndex(a => a.t === 'code' || a.t === 'book');
    L.acts.splice(ci < 0 ? L.acts.length - 1 : ci, 0, { t: 'trap', title: 'Mr. Trap: صائد الأخطاء', goal: 'Mr. Trap يخبّئ فخاخًا في كلامه وكوده. هل فيه فخ؟ أين؟ وكيف نصححه؟', items: S_.trap });
    const mi = L.acts.findIndex(a => a.t === 'master');
    L.acts.splice(mi, 0, { t: 'rush', title: 'تحدي 30 ثانية', goal: 'أسئلة سريعة، لكل سؤال 30 ثانية. الدقة أهم من السرعة.', items: S_.rush },
      { t: 'exit', title: 'التذكرة الختامية', goal: 'قبل أن تغادري: أجيبي مع ذكر السبب، وصحّحي خطأ، وأخبري معلمتكِ بما كان صعبًا.', ticket: S_.exit });
  });
  if (!cyberItems) return;
  const at = LESSONS.findIndex(L => L.id === examId);
  LESSONS.splice(at < 0 ? LESSONS.length : at, 0, { id: 'cy', n: 0, title: 'الاختراق السيبراني: استعيدي الوحدة', pages: pages || '', icon: 'star', extra: 1, short: 'الاختراق', badge: '🛡',
    skills: ['أكتشف المعلومات الخاطئة في الوحدة وأصححها', 'أعيد بناء المعرفة الصحيحة بكلماتي'],
    acts: [{ t: 'cyber', title: 'ملف الوحدة المخترق', min: 10, items: cyberItems }, { t: 'master' }] });
}
