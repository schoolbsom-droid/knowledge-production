// وضع الشرح للمعلمة: عرض المحطة كشرائح على السبورة (لا يسجّل نقاطًا)
'use strict';
function teachSlides(L) {
  const S_ = [];
  const add = (title, tag, fn) => S_.push({ title, tag, fn });
  add(L.title, 'START', el => { el.innerHTML = `<div class="tcenter"><div style="width:170px;margin:auto">${koda('happy')}</div><div class="mute">الوحدة الرابعة · الكتاب ص${L.pages}</div><h1 class="tbig">${esc(L.title)}</h1><div class="tgoals"><b>🎯 أهداف المحطة</b>${L.skills.map(s => `<div>• ${rich(s)}</div>`).join('')}</div></div>`; });
  L.acts.forEach(a => {
    if (a.t === 'comic') {
      a.panels.forEach((p, i) => add(a.title, 'COMIC', el => {
        el.innerHTML = `<div class="tpanel ${p.w === 'b' ? 'flip' : ''}"><div class="twho">${char(p.w, p.m)}</div><div class="tsay"><b style="color:var(--plum)">${cname(p.w)}:</b> ${rich(p.s)}${p.code ? `<pre class="mono">${esc(p.code)}</pre>` : ''}${p.fx ? `<div class="fx2">${esc(p.fx)}</div>` : ''}</div></div><div class="mute tcenter">${ar(i + 1)} / ${ar(a.panels.length)}</div>`;
        if (p.blank && a.q) tAsk(el, a.q);
      }));
    }
    if (a.t === 'run') a.items.forEach(it => add(it.h, 'CODE LAB', el => {
      el.innerHTML = `<h2 class="th2">${esc(it.h)} <span class="mute" style="font-size:16px">ص${it.p}</span></h2><div class="tp"></div><div class="ted"></div>${it.note ? `<div class="fb info" style="font-size:18px">💡 ${rich(it.note)}</div>` : ''}`;
      if (it.predict) tAsk($('.tp', el), { ...it.predict, q: '🔮 ' + it.predict.q, mono: 1 });
      ide($('.ted', el), it.code, { files: a.files });
    }));
    if (a.t === 'traffic') {
      const part = (arr, en, nm, leg, kind) => arr.forEach((x, i) => add(`${a.title}: ${nm}`, en, el => {
        el.innerHTML = `<h2 class="th2">${nm} <span class="mode">${en}</span></h2><div class="legend" style="font-size:18px">${leg}</div><div class="tstate">${rich(x.s)}</div><div class="row tcenter" style="justify-content:center"><button class="btn ghost cd"><bdi dir="ltr">3…2…1 SHOW!</bdi></button>${kind !== 'op' ? '<button class="btn sa">إظهار الإجابة</button>' : ''}</div><div class="tans"></div>`;
        $('.cd', el).onclick = () => countdown();
        const sa = $('.sa', el); if (sa) sa.onclick = () => { const c = x.a; $('.tans', el).innerHTML = kind === 'mv' ? `<div class="tlight">${GEST[c][0]}<b>${GEST[c][1]}</b></div><div class="fb ok" style="font-size:20px">${rich(x.why)}</div>` : `<div class="tlight"><span class="lt ${c} on" style="width:70px;height:70px"></span></div><div class="fb ${c === 'g' ? 'ok' : 'info'}" style="font-size:20px">✍ ${rich(x.fix)}</div>`; };
        if (kind === 'op') $('.tans', el).innerHTML = '<div class="fb info" style="font-size:18px">لا توجد إجابة واحدة صحيحة: اطلبي من طالبة «أوافق» وطالبة «لا أوافق» أن تقدّم كل منهما دليلًا من الدرس، ثم اسمحي للبقية بتغيير رأيهن.</div>';
      }, ));
      const L3 = (g, y, r) => `<span><i style="background:var(--g)"></i>${g}</span><span><i style="background:#F2C200"></i>${y}</span><span><i style="background:var(--r)"></i>${r}</span>`;
      part(a.show, 'COLOR SHOW', 'ارفعي اللون المناسب', L3('صحيحة', 'صحيحة جزئيًا', 'غير صحيحة'), 'sh');
      part(a.opinion, 'OPINION LIGHT', 'عبّري عن رأيكِ', L3('أوافق', 'غير متأكدة', 'لا أوافق'), 'op');
      part(a.move, 'MOVE WITH THE LIGHT', 'استجيبي بالحركة', ['g', 'y', 'r'].map(c => `<span>${GEST[c][1]}</span>`).join(' • '), 'mv');
    }
    if (a.t === 'tpr') {
      const TH = { up: '👍 أوافق / صحيحة', side: '👉 غير متأكدة', down: '👎 لا أوافق / خطأ' };
      (a.thumbs || []).forEach(x => add('مقياس الإبهام', 'THUMB METER', el => {
        el.innerHTML = `<h2 class="th2">مقياس الإبهام <span class="mode">THUMB METER</span></h2><div class="legend" style="font-size:20px">${Object.values(TH).map(v => `<span>${v}</span>`).join(' • ')}</div><div class="tstate">${rich(x.s)}</div><div class="row" style="justify-content:center"><button class="btn ghost cd"><bdi dir="ltr">3…2…1 SHOW!</bdi></button><button class="btn sa">إظهار الإجابة</button></div><div class="tans"></div>`;
        $('.cd', el).onclick = () => countdown(); $('.sa', el).onclick = () => $('.tans', el).innerHTML = `<div class="tlight" style="font-size:60px">${TH[x.a].split(' ')[0]}</div><div class="fb info" style="font-size:20px">${rich(x.why)}</div>`;
      }));
      (a.conf || []).forEach(x => add('إجابتي + مدى ثقتي', 'CONFIDENCE', el => {
        el.innerHTML = `<h2 class="th2">إجابتي + مدى ثقتي <span class="mode">CONFIDENCE SIGNAL</span></h2><p style="font-size:18px">اختاري الإجابة أولًا، ثم ارفعي أصابعكِ لثقتكِ: ١ خمّنت … ٥ أستطيع شرحها لغيري.</p>`; tAsk(el, { ...x, mono: 1 });
      }));
    }
    if (a.t === 'quiz') a.items.forEach((q, i) => add(a.title, 'QUIZ', el => { el.innerHTML = `<h2 class="th2">${esc(a.title)} <span class="mute" style="font-size:16px">${ar(i + 1)} / ${ar(a.items.length)}</span></h2>`; tAsk(el, { ...q, mono: !!q.code }); }));
    if (a.t === 'match') add(a.title, 'MATCH IT', el => { el.innerHTML = `<h2 class="th2">${esc(a.title)}</h2><p style="font-size:18px">كل فريق يطابق على ورقة، ثم نكشف الإجابة:</p><div class="tmatch"></div><div class="row" style="justify-content:center"><button class="btn sa">إظهار الإجابة</button></div>`; const sh = shuffle(a.pairs.map(p => p[1])); $('.tmatch', el).innerHTML = a.pairs.map((p, i) => `<div class="mono">${esc(p[0])}</div><div>${rich(sh[i])}</div>`).join(''); $('.sa', el).onclick = () => { $('.tmatch', el).innerHTML = a.pairs.map(p => `<div class="mono">${esc(p[0])}</div><div style="color:var(--g)">✔ ${rich(p[1])}</div>`).join(''); }; });
    if (a.t === 'mission') {
      add(a.title, 'SECRET MISSION', el => { el.innerHTML = `<div class="tcenter"><span class="stamp" style="font-size:30px">TOP SECRET</span><h2 class="tbig" style="font-size:40px">${esc(a.title)}</h2><div class="tstate" style="white-space:pre-line">${rich(a.story)}</div><p style="font-size:18px">كل طالبة في المجموعة مسؤولة عن مهمة واحدة، وكل مهمة تعطي حرفًا من الرمز السري.</p><div class="codebar">${a.code.split('').map(() => '<span>?</span>').join('')}</div></div>`; });
      a.missions.forEach((m, i) => add(`المهمة ${ar(i + 1)}: ${m.ar}`, m.type, el => {
        el.innerHTML = `<h2 class="th2">المهمة ${ar(i + 1)}: ${m.ar} <span class="mode">${m.type}</span></h2>`;
        if (m.kind === 'order') { el.innerHTML += `<p style="font-size:20px">${rich(m.q)}</p><ol class="torder">${shuffle(m.lines).map(l => `<li class="mono">${esc(l)}</li>`).join('')}</ol><div class="row" style="justify-content:center"><button class="btn sa">إظهار الترتيب</button></div><div class="tans"></div>`; $('.sa', el).onclick = () => $('.tans', el).innerHTML = `<pre class="mono codeblk" style="font-size:20px">${esc(m.lines.join('\n'))}</pre><div class="fb ok" style="font-size:22px">الحرف السري: <b class="mono">${m.r}</b></div>`; }
        else if (m.kind === 'match') { el.innerHTML += `<p style="font-size:20px">${rich(m.q)}</p><div class="tmatch">${m.pairs.map(p => `<div class="mono">${esc(p[0])}</div><div class="hid">${rich(p[1])}</div>`).join('')}</div><div class="row" style="justify-content:center"><button class="btn sa">إظهار الإجابة</button></div><div class="tans"></div>`; $('.sa', el).onclick = () => { $$('.hid', el).forEach(x => x.classList.remove('hid')); $('.tans', el).innerHTML = `<div class="fb ok" style="font-size:22px">الحرف السري: <b class="mono">${m.r}</b></div>`; }; }
        else tAsk(el, m, `الحرف السري: <b class="mono">${m.r}</b>`);
      }));
      add('المهمة النهائية', 'FINAL MISSION', el => { el.innerHTML = `<h2 class="th2">المهمة النهائية <span class="mode">FINAL MISSION</span></h2><div class="codebar">${a.code.split('').map(c => `<span class="f">${c}</span>`).join('')}</div><div class="tstate" style="white-space:pre-line">${rich(a.final.story || '')}</div>`; tAsk(el, a.final); });
    }
    if (a.t === 'prints') {
      add(a.title, 'FINGERPRINT', el => { el.innerHTML = `<h2 class="th2">${esc(a.title)}</h2><div class="scene"><b style="font-family:Lalezar;font-size:24px">🔎 ${esc(a.scene.title)}</b><div>${a.scene.clues.map(c => `<span class="clue mono" style="font-size:18px">${esc(c)}</span>`).join('')}</div></div><p style="font-size:18px">٥ مجموعات، كل مجموعة تحل بصمة. بعدها تجتمع الأدلة لفتح القضية.</p>`; });
      a.prints.forEach((pr, j) => pr.forEach((q, i) => add(`البصمة ${ar(j + 1)} · سؤال ${ar(i + 1)}`, 'FINGERPRINT', el => { el.innerHTML = `<h2 class="th2">البصمة ${ar(j + 1)} · سؤال ${ar(i + 1)}</h2>`; tAsk(el, q); })));
      add('فتح القضية', 'FINAL CASE', el => { el.innerHTML = '<h2 class="th2">فتح القضية <span class="mode">FINAL CASE</span></h2>'; tAsk(el, a.final); });
    }
    if (a.t === 'fplay') FLOWS.forEach((f, i) => add(`${f.icon} المرحلة ${ar(i + 1)}: ${f.title}`, 'LIVE', el => { el.innerHTML = '<div class="tex"></div>'; fPlay({ a: { ...a, only: i }, body: $('.tex', el), rec: () => true, got: () => null }); }));
    if (['fshapes', 'fhunt', 'ffix'].includes(a.t)) add(a.title, 'FLOW', el => { el.innerHTML = `<h2 class="th2">${esc(a.title)}</h2><div class="tex"></div>`; R[a.t]({ a, body: $('.tex', el), rec: () => true, got: () => null }); });
    if (a.t === 'book') a.items.forEach(it => add(`${it.n} · ص${it.p}`, 'BOOK', el => { el.innerHTML = `<h2 class="th2">📘 ${esc(it.n)} <span class="mute" style="font-size:16px">الكتاب ص${esc(it.p)}</span></h2><div class="tex"></div>`; bookAct({ a: { items: [it] }, body: $('.tex', el), rec: () => true, got: () => null }); }));
    if (a.t === 'turtlepad') add(a.title, 'TURTLE', el => { el.innerHTML = `<h2 class="th2">${esc(a.title)}</h2><div class="tex"></div>`; turtlePad({ a, body: $('.tex', el), rec: () => true, got: () => null }); });
    if (a.t === 'story' || a.t === 'tools') add(a.title, a.t === 'story' ? 'STORY' : 'TOOLS', el => { el.innerHTML = `<h2 class="th2">${esc(a.title)}</h2><div class="tex"></div>`; (a.t === 'story' ? storyAct : toolsAct)({ a, body: $('.tex', el), rec: () => true, got: () => null }); });
    if (a.t === 'explore') add(a.title, 'EXPLORE', el => { el.innerHTML = `<h2 class="th2">${esc(a.title)}</h2><div class="tex"></div>`; const fake = { a, body: $('.tex', el), rec: () => true, got: () => null }; R.explore(fake); });
    if (a.t === 'code') add(a.title, 'CHALLENGE', el => {
      el.innerHTML = `<h2 class="th2">${esc(a.title)} ${a.p ? `<span class="mute" style="font-size:16px">ص${a.p}</span>` : ''}</h2><div class="fb info" style="font-size:19px">${a.task}</div><div class="ted" style="margin-top:10px"></div><div class="row" style="margin-top:10px"><button class="btn ghost hn">💡 تلميح</button><button class="btn sl">👀 الحل النموذجي</button></div><div class="tans"></div>`;
      const ed = ide($('.ted', el), a.starter, { files: a.files });
      $('.hn', el).onclick = () => $('.tans', el).innerHTML = `<pre class="mono codeblk" style="font-size:18px">${esc(a.hint)}</pre>`;
      $('.sl', el).onclick = () => { ed.set(a.sol); $('.run', ed.el).click(); };
    });
  });
  add('الختام', 'END', el => { el.innerHTML = `<div class="tcenter"><div style="width:150px;margin:auto">${koda('wow')}</div><h1 class="tbig">أحسنتن! 🌟</h1><div class="tgoals"><b>قيّمي نفسكِ (جدول المهارات ص٢١٦)</b>${L.skills.map(s => `<div>☐ ${rich(s)}</div>`).join('')}</div><p style="font-size:20px">الآن افتحن المعمل وأكملن أنشطة المحطة لتصبحن «متقنات»:</p><div class="mono" style="font-size:20px;direction:ltr">${location.host + location.pathname.replace(/index\.html$/, '')}</div></div>`; });
  return S_;
}
// سؤال على السبورة: الخيارات ظاهرة، والإجابة تُكشف بالزر
function tAsk(host, q, extra) {
  const el = h(`<div><div class="tstate">${rich(q.q)}</div>${q.code ? `<pre class="mono codeblk" style="font-size:20px">${esc(q.code)}</pre>` : ''}<div class="topts">${q.o.map((o, i) => `<div class="topt ${q.mono ? 'mono' : ''}" data-i="${i}"><b>${'أبجدهو'[i]}</b> ${q.mono ? esc(o).replace(/\n/g, '<br>') : rich(o)}</div>`).join('')}</div><div class="row" style="justify-content:center;margin-top:10px"><button class="btn ghost cd"><bdi dir="ltr">3…2…1 SHOW!</bdi></button><button class="btn sa">إظهار الإجابة</button></div><div class="tans"></div></div>`);
  host.appendChild(el);
  $('.cd', el).onclick = () => countdown();
  $('.sa', el).onclick = () => { $$('.topt', el).forEach(o => o.classList.toggle('ok', +o.dataset.i === q.a)); $('.tans', el).innerHTML = (q.why ? `<div class="fb ok" style="font-size:20px">${rich(q.why)}</div>` : '') + (extra ? `<div class="fb ok" style="font-size:22px">${extra}</div>` : ''); beep(1); };
}
let TS = { L: 0, i: 0 };
function vTeach() {
  if (CUR.L == null) {
    main().innerHTML = `<div class="greet"><div class="avatar">${koda('happy')}</div><div class="bubble">أهلًا أ. ابتسام! اختاري المحطة التي ستشرحينها اليوم. تُعرض كشرائح على السبورة، والكود يعمل مباشرة.</div></div>
    <div class="stations">${LESSONS.map((L, i) => `<button class="st" onclick="go('teach',${i})"><span class="num">${L.extra ? (L.badge || '⚡') : L.project ? icon('trophy', 24) : L.exam ? icon('star', 24) : ar(L.n)}</span><span class="t">${esc(L.title)}</span><span class="meta">ص${L.pages} · ${ar(teachSlides(L).length)} شريحة</span></button>`).join('')}</div>`;
    return;
  }
  const L = LESSONS[CUR.L], sl = teachSlides(L);
  if (TS.L !== CUR.L) TS = { L: CUR.L, i: 0 };
  const show = () => {
    const s = sl[TS.i];
    $('#tbar').innerHTML = `<span class="mode">${s.tag}</span><b>${esc(s.title)}</b><span class="sp"></span><span class="mute">${ar(TS.i + 1)} / ${ar(sl.length)}</span>`;
    $('#tprog').style.width = ((TS.i + 1) / sl.length * 100) + '%';
    const el = $('#slide'); el.innerHTML = ''; el.className = 'card tslide act'; s.fn(el);
    $('#tprev').disabled = TS.i === 0; $('#tnext').textContent = TS.i < sl.length - 1 ? 'التالي ←' : 'إنهاء';
  };
  main().innerHTML = `<div class="lhead"><button class="iconbtn" style="background:var(--plum)" onclick="go('teach')" title="المحطات">${icon('back')}</button><h1 class="h1" style="font-size:24px;margin:0;flex:1">${esc(L.title)}</h1><select class="in" id="tjump" style="max-width:260px">${sl.map((s, i) => `<option value="${i}">${ar(i + 1)}. ${esc(s.title)}</option>`).join('')}</select><button class="btn ghost" onclick="document.documentElement.requestFullscreen?.()">⛶</button></div>
  <div class="progress"><i id="tprog"></i></div><div id="tbar" class="row" style="margin:10px 0"></div><div id="slide"></div>
  <div class="nav"><button class="btn ghost" id="tprev">→ السابق</button><button class="btn" id="tnext"></button></div>`;
  const mv = d => { const n = TS.i + d; if (n >= sl.length) return go('teach'); if (n < 0) return; TS.i = n; $('#tjump').value = n; show(); window.scrollTo(0, 0); };
  $('#tprev').onclick = () => mv(-1); $('#tnext').onclick = () => mv(1);
  $('#tjump').value = TS.i; $('#tjump').onchange = e => { TS.i = +e.target.value; show(); };
  document.onkeydown = e => { if (CUR.view !== 'teach' || /TEXTAREA|INPUT|SELECT/.test(document.activeElement.tagName)) return; if (e.key === 'ArrowLeft' || e.key === 'PageDown') mv(1); if (e.key === 'ArrowRight' || e.key === 'PageUp') mv(-1); };
  show();
}
