// «حكاية مدينة الذاكرة»: قصة خيالية تفاعلية عن تعامل المعالج «برق» مع المتغيرات والقوائم والصفوف والقواميس و if و for
'use strict';
function barq(m = 'happy') {
  return `<svg viewBox="0 0 120 150" role="img" aria-label="برق">
  ${[30, 48, 66, 84].map(x => `<rect x="${x}" y="14" width="6" height="14" rx="2" fill="#8A7A3A"/><rect x="${x}" y="100" width="6" height="14" rx="2" fill="#8A7A3A"/>`).join('')}
  ${[40, 58, 76].map(y => `<rect x="6" y="${y}" width="14" height="6" rx="2" fill="#8A7A3A"/><rect x="100" y="${y}" width="14" height="6" rx="2" fill="#8A7A3A"/>`).join('')}
  <rect x="18" y="24" width="84" height="80" rx="14" fill="#FFCB7D" stroke="#534057" stroke-width="4"/><rect x="28" y="34" width="64" height="60" rx="10" fill="#FFF3C4" stroke="#E0A85A" stroke-width="2"/>
  ${eyes(m, 46, 74, 56, '#534057')}${mouth(m, 60, 72, '#534057')}
  <path d="M64 0 L52 14 h9 l-5 12 16-16 h-9z" fill="#ECD571" stroke="#534057" stroke-width="2"/>
  <path d="M40 112 l-8 26 M80 112 l10 24" stroke="#534057" stroke-width="6" stroke-linecap="round"/><ellipse cx="28" cy="142" rx="10" ry="5" fill="#D64545"/><ellipse cx="94" cy="140" rx="10" ry="5" fill="#D64545"/></svg>`;
}
const lname = L => L.extra ? 'القصة' : L.project ? 'المشروع' : L.exam ? 'الاختبار' : 'م' + ar(L.n);
const cname = w => w === 'b' ? 'بيثو' : w === 'q' ? 'برق' : 'كودة';
const fv = v => v === null ? 'None' : typeof v === 'string' ? `"${v}"` : String(v);

/* رسم الذاكرة */
function memView(m) {
  const hi = (k, id) => m.hi && m.hi[0] === k && String(m.hi[1]) === String(id) ? ' hit' : '';
  const cells = (kind, o) => `<div class="mrow"><span class="mname">${o.name}</span><div class="train ${kind}">${kind === 'tuple' ? '<span class="seal">🔒</span>' : '<span class="loco">🚂</span>'}${o.items.map((v, i) => `<button class="car${hi(kind, i)}" data-kind="${kind}" data-id="${i}"><span class="v">${esc(fv(v))}</span><span class="ix">${i}</span><span class="nx">${i - o.items.length}</span></button>`).join('')}</div></div>`;
  return `<div class="mem">
  ${m.vars && m.vars.length ? `<div class="mrow"><span class="mname">المتغيرات</span><div class="boxes">${m.vars.map(([n, v, ty]) => `<button class="vbox${hi('var', n)}${ty ? ' t-' + ty : ''}" data-kind="var" data-id="${n}"><span class="tag">${n}</span><span class="v">${esc(fv(v))}</span>${ty ? `<span class="ty">${ty}</span>` : ''}</button>`).join('')}</div></div>` : ''}
  ${m.list ? cells('list', m.list) : ''}${m.tuple ? cells('tuple', m.tuple) : ''}
  ${m.dict ? `<div class="mrow"><span class="mname">${m.dict.name}</span><div class="boxes">${m.dict.items.map(([k, v]) => `<button class="locker${hi('dict', k)}" data-kind="dict" data-id="${esc(k)}"><span class="key">🔑 ${esc(fv(k))}</span><span class="v">${esc(fv(v))}</span></button>`).join('')}</div></div>` : ''}
  ${m.gate ? `<div class="gate"><div class="guard">💂 الحارس يسأل: <code dir="ltr">${esc(m.gate.q)}</code> ${m.gate.res == null ? '؟' : m.gate.res ? '<b style="color:var(--g)">True ✔</b>' : '<b style="color:var(--r)">False ✘</b>'}</div><div class="roads"><span class="road ${m.gate.res === true ? 'open' : m.gate.res === false ? 'shut' : ''}">طريق if</span><span class="road ${m.gate.res === false ? 'open' : m.gate.res === true ? 'shut' : ''}">طريق else</span></div></div>` : ''}
  ${m.inbox ? `<div class="inbox"><span class="kb">⌨️</span><div><div class="mute" style="font-size:12px">لوحة المفاتيح تكتب:</div><b class="mono">${esc(m.inbox)}</b></div><span class="arrow">← نص دائمًا!</span></div>` : ''}${m.err ? `<div class="alarm">🚨 ${esc(m.err)}</div>` : ''}
  <div class="screen"><span class="mute" style="font-size:11px;color:#9C8AA3">الشاشة</span>${(m.out || []).map(o => `<div>${esc(o)}</div>`).join('')}</div></div>`;
}

/* نشاط الحكاية */
function storyAct({ a, body, rec, got }) {
  let i = -1, mem = { vars: [] }, tries = 0;
  body.innerHTML = `<div class="city"><div class="sky">${a.scene}</div></div>
  <div class="stwrap"><div class="stcode"><div class="tb">🐍 الكود الذي ينفّذه برق</div>${a.code.map((l, k) => `<div class="cl" data-l="${k}"><span class="n">${k + 1}</span><span class="t">${esc(l)}</span></div>`).join('')}</div><div id="mem"></div></div>
  <div class="stsay"><div class="who">${barq('happy')}</div><div class="bub" id="bub"></div></div>
  <div class="row" style="justify-content:center;margin-top:10px"><button class="btn plum" id="nx">▶ ابدئي الحكاية</button><button class="btn ghost" id="rs">↺ من البداية</button></div><div id="end"></div>`;
  const bub = $('#bub', body), nx = $('#nx', body);
  const face = m => $('.stsay .who', body).innerHTML = barq(m);
  const paint = () => { $('#mem', body).innerHTML = memView(mem); $$('.cl', body).forEach(c => c.classList.toggle('on', i >= 0 && +c.dataset.l === a.steps[i]?.ln)); };
  const apply = () => { const s = a.steps[i]; mem = s.mem; paint(); bub.innerHTML = rich(s.say); face(s.mem.err ? 'wow' : 'happy'); nx.disabled = false; nx.textContent = i < a.steps.length - 1 ? '▶ السطر التالي' : '🏁 نهاية الفصل'; };
  const finish = () => {
    nx.hidden = true; $$('.cl', body).forEach(c => c.classList.remove('on'));
    $('#end', body).innerHTML = `<div class="moral">📜 <b>حكمة الفصل:</b> ${rich(a.moral)}</div><div id="sq"></div>`;
    mcq($('#sq', body), { ...a.quiz, q: '🎯 تحدي الفصل: ' + a.quiz.q }, { key: 'q', ctx: { rec, got }, mono: 1 });
  };
  const step = () => {
    if (i >= a.steps.length - 1) return finish();
    i++; const s = a.steps[i], k = 'a' + i; tries = 0;
    $$('.cl', body).forEach(c => c.classList.toggle('on', +c.dataset.l === s.ln));
    if (!s.ask) return apply();
    nx.disabled = true; face('think');
    const done = () => { if (rec(k, tries ? 2 : 5, { tries })) toast(tries ? '+٢ ⭐' : '+٥ ⭐ أنتِ معالج ماهر!'); beep(1); apply(); };
    if (s.ask.o) {
      bub.innerHTML = `<b>أنتِ المعالج الآن!</b> ${rich(s.ask.q)}<div class="row" style="margin-top:6px">${s.ask.o.map((o, j) => `<button class="btn ghost" data-j="${j}" style="padding:4px 16px">${esc(o)}</button>`).join('')}</div>`;
      $$('button', bub).forEach(b => b.onclick = () => { if (+b.dataset.j === s.ask.a) done(); else { tries++; beep(0); b.disabled = true; b.style.opacity = .4; } });
    } else {
      bub.innerHTML = `<b>أنتِ المعالج الآن!</b> ${rich(s.ask.q)} <span class="mute">(اضغطي على المكان الصحيح في الذاكرة ☝)</span>`;
      $$('#mem button', body).forEach(b => b.onclick = () => {
        if (b.dataset.kind === s.ask.t[0] && b.dataset.id === String(s.ask.t[1])) done();
        else { tries++; beep(0); b.classList.add('bad'); setTimeout(() => b.classList.remove('bad'), 600); bub.querySelector('.hn')?.remove(); bub.insertAdjacentHTML('beforeend', `<div class="hn fb no" style="margin-top:6px">${rich(s.ask.hint || 'ليس هنا. فكّري مرة أخرى.')}</div>`); }
      });
    }
  };
  nx.onclick = step;
  $('#rs', body).onclick = () => { i = -1; mem = { vars: [] }; nx.hidden = false; nx.disabled = false; nx.textContent = '▶ ابدئي الحكاية'; $('#end', body).innerHTML = ''; bub.innerHTML = rich(a.intro); paint(); face('happy'); };
  bub.innerHTML = rich(a.intro); paint();
}

/* فصول الحكاية */
const L3F = ['apple', 'orange', 'banana'];
const STORY = { id: 'st', n: 0, title: 'حكاية مدينة الذاكرة', pages: '١٣٣–٢٠٠', icon: 'star', extra: 1,
  skills: ['أتخيل كيف ينفّذ المعالج الكود سطرًا سطرًا', 'أفرّق بين طريقة الوصول في القائمة (رقم العربة) والقاموس (المفتاح)'],
  acts: [
  { t: 'comic', title: 'المقدمة: مدينة داخل حاسبكِ', goal: 'تتعرفين على «برق» المعالج، وعلى مدينة الذاكرة.',
    panels: [
      { w: 'k', m: 'happy', s: 'هل تعلمين أن داخل كل حاسب مدينة لا تنام؟ اسمها «مدينة الذاكرة» RAM.' },
      { w: 'q', m: 'happy', s: 'وأنا «برق» ⚡ المعالج! أسرع ساعي في المدينة. أقرأ الكود سطرًا سطرًا، من الأعلى إلى الأسفل، ولا أنفّذ إلا ما يُكتب لي بالضبط.' },
      { w: 'b', m: 'wink', s: 'في المدينة أحياء: حي الصناديق (المتغيرات)، ومحطة القطار (القوائم)، والقطار المختوم (الصفوف)، وحي الخزائن (القواميس).' },
      { w: 'q', m: 'wow', s: 'لكن احذري: ذاكرتي تُمسح عند إطفاء الحاسب! لذلك أعمل بسرعة البرق.', fx: 'ززززت!' },
      { w: 'k', m: 'think', s: 'في كل فصل ستصبحين أنتِ المعالج: تنفّذين السطر التالي، وتضغطين على المكان الذي يذهب إليه برق. مستعدة؟' },
    ],
    q: { q: 'كيف ينفّذ المعالج «برق» الكود؟', o: ['سطرًا سطرًا من الأعلى إلى الأسفل', 'كل الأسطر في لحظة واحدة', 'يبدأ من آخر سطر', 'يختار الأسطر التي تعجبه'], a: 0, why: 'المعالج ينفّذ تعليمة واحدة في كل مرة وبالترتيب، إلا إذا غيّرت if أو for مساره.' } },

  { t: 'story', title: 'الفصل ١: حي الصناديق (المتغيرات)', goal: 'المتغير = صندوق في الذاكرة عليه ملصق باسمه.',
    scene: '📦 حي الصناديق · كل صندوق عليه ملصق باسم',
    intro: 'وصل برق إلى حي الصناديق. هنا تُحفظ القيم في صناديق، وعلى كل صندوق ملصق باسمه. اضغطي «ابدئي الحكاية» ونفّذي معه سطرًا سطرًا.',
    code: ['x = 5', 'y = x', 'x = x + 1', 'print(x, y)'],
    steps: [
      { ln: 0, say: 'يأخذ برق صندوقًا فارغًا من المخزن، يضع فيه 5، ويلصق عليه الاسم x. علامة = عنده لا تعني «يساوي» بل «ضَعْ في».', mem: { vars: [['x', 5]], hi: ['var', 'x'] } },
      { ln: 1, say: 'يقرأ ما في صندوق x (وهو 5)، ثم يضع نسخة منه في صندوق جديد اسمه y. نسخة لا نقل: الصندوقان مستقلان.', mem: { vars: [['x', 5], ['y', 5]], hi: ['var', 'y'] } },
      { ln: 2, ask: { q: 'السطر x = x + 1: من أي صندوق يقرأ برق أولًا؟', t: ['var', 'x'], hint: 'يبدأ دائمًا بالطرف الأيمن من علامة = : يقرأ x.' }, say: 'يبدأ من يمين علامة = : يقرأ 5 من x، يحسب 5 + 1 = 6 في ورشته، ثم يعود ويضع 6 في صندوق x مكان القيمة القديمة.', mem: { vars: [['x', 6], ['y', 5]], hi: ['var', 'x'] } },
      { ln: 3, say: 'يقرأ الصندوقين ويكتب ما فيهما على الشاشة. لاحظي: y بقيت 5! لأنها كانت نسخة، ولم يطلب منه أحد تغييرها.', mem: { vars: [['x', 6], ['y', 5]], out: ['6 5'] } },
    ],
    moral: 'المتغير اسمٌ ملصق على صندوق في الذاكرة. وفي كل أمر إسناد يحسب المعالج الطرف الأيمن أولًا، ثم يضع الناتج في الصندوق المكتوب يسار علامة = .',
    quiz: { q: 'ماذا يظهر على الشاشة؟', code: 'a = 3\nb = a\na = 10\nprint(b)', o: ['3', '10', '13', 'خطأ'], a: 0, why: 'b أخذت نسخة من 3. تغيير a بعد ذلك لا يغيّر صندوق b.' } },

  { t: 'story', title: 'الفصل ٢: قطار القائمة', goal: 'القائمة = قطار عرباته مرقّمة من 0، ويمكن تبديل ما في العربات.',
    scene: '🚂 محطة القطار · العربات مرقّمة من 0',
    intro: 'في محطة القطار، كل قائمة قطار له اسم، وعرباته مرقّمة. والسرّ الذي يحيّر الزوار: العدّ يبدأ من 0، لأن الرقم يعني «كم عربة تبعد عن القاطرة».',
    code: ['fruits = ["apple","orange","banana"]', 'print(fruits[1])', 'fruits[1] = "grape"', 'fruits.append("kiwi")', 'print(fruits[-1])'],
    steps: [
      { ln: 0, say: 'يبني برق قطارًا من 3 عربات اسمه fruits ويرقّمها: 0 ثم 1 ثم 2. وتحت كل عربة رقم سالب يعدّ من آخر القطار.', mem: { list: { name: 'fruits', items: L3F } } },
      { ln: 1, ask: { q: 'fruits[1]: إلى أي عربة يذهب برق؟', t: ['list', 1], hint: 'العدّ يبدأ من 0، فالعربة رقم 1 هي الثانية.' }, say: 'العربة رقم 1 هي الثانية! يقرأ ما فيها ويكتبه على الشاشة.', mem: { list: { name: 'fruits', items: L3F }, hi: ['list', 1], out: ['orange'] } },
      { ln: 2, ask: { q: 'fruits[1] = "grape": أي عربة يفرغها برق ويملؤها من جديد؟', t: ['list', 1], hint: 'نفس الرقم بين القوسين المربعين: 1.' }, say: 'يذهب للعربة 1، يخرج orange ويضع grape. القائمة تقبل التبديل.', mem: { list: { name: 'fruits', items: ['apple', 'grape', 'banana'] }, hi: ['list', 1], out: ['orange'] } },
      { ln: 3, say: 'append: يربط برق عربة جديدة في آخر القطار، ورقمها 3.', mem: { list: { name: 'fruits', items: ['apple', 'grape', 'banana', 'kiwi'] }, hi: ['list', 3], out: ['orange'] } },
      { ln: 4, ask: { q: 'fruits[-1]: الرقم السالب يعدّ من آخر القطار. أين يذهب برق؟', t: ['list', 3], hint: '-1 تعني آخر عربة في القطار.' }, say: 'الفهرس -1 يعني آخر عربة مهما طال القطار. يقرأ kiwi.', mem: { list: { name: 'fruits', items: ['apple', 'grape', 'banana', 'kiwi'] }, hi: ['list', 3], out: ['orange', 'kiwi'] } },
    ],
    moral: 'القائمة قطار: الاسم للقطار كله، والرقم بين [ ] هو رقم العربة ويبدأ من 0. والقطار مفتوح: نبدّل ما في العربات ونضيف عربات.',
    quiz: { q: 'ماذا يظهر على الشاشة؟', code: 'C = ["red","orange","green","blue"]\nC[0] = C[3]\nprint(C[0], C[2])', o: ['blue green', 'red green', 'blue orange', 'red blue'], a: 0, why: 'C[3] هي blue فتُنسخ إلى العربة 0، و C[2] هي green.' } },

  { t: 'story', title: 'الفصل ٣: القطار المختوم (الصف)', goal: 'الصف Tuple = قطار مختوم: نقرأ ما فيه ولا نبدّله.',
    scene: '🔒 رصيف القطارات المختومة · للقراءة فقط',
    intro: 'على الرصيف المجاور قطار غريب: نوافذه زجاجية وأبوابه مختومة بالشمع الأحمر. إنه الصف Tuple، ويُكتب بأقواس دائرية ( ).',
    code: ['info = ("Khaled","khaled@edu.sa",1234)', 'print(info[0])', 'info[0] = "Saad"'],
    steps: [
      { ln: 0, say: 'يبني برق القطار بثلاث عربات، ثم يختم أبوابه بالشمع 🔒. الأقواس الدائرية معناها: لا تبديل بعد الآن.', mem: { tuple: { name: 'info', items: ['Khaled', 'khaled@edu.sa', 1234] } } },
      { ln: 1, ask: { q: 'info[0]: إلى أي عربة ينظر برق؟', t: ['tuple', 0], hint: 'الترقيم مثل القائمة تمامًا: يبدأ من 0.' }, say: 'القراءة مسموحة: ينظر من النافذة الزجاجية ويقرأ Khaled. الفهرسة مثل القائمة تمامًا.', mem: { tuple: { name: 'info', items: ['Khaled', 'khaled@edu.sa', 1234] }, hi: ['tuple', 0], out: ['Khaled'] } },
      { ln: 2, say: 'يحاول برق فتح العربة 0 ليبدّل ما فيها… فتنطلق صفّارة الإنذار ويتوقف البرنامج! الختم لا يُكسر.', mem: { tuple: { name: 'info', items: ['Khaled', 'khaled@edu.sa', 1234] }, hi: ['tuple', 0], out: ['Khaled'], err: "TypeError: 'tuple' object does not support item assignment" } },
    ],
    moral: 'الصف قطار مختوم: نقرأ منه بالفهرس، ولا نبدّل ولا نضيف. لذلك هو أكثر أمانًا للبيانات الثابتة مثل رقم الهوية والبريد.',
    quiz: { q: 'أي بيانات يناسبها القطار المختوم (الصف)؟', o: ['رقم الهوية والبريد الإلكتروني', 'درجات تتغير كل أسبوع', 'قائمة مشتريات نضيف إليها'], a: 0, why: 'البيانات التي لا نحتاج إلى تغييرها نحفظها في صف.' } },

  { t: 'story', title: 'الفصل ٤: حي الخزائن (القاموس)', goal: 'القاموس = خزائن بلا أرقام، لكل خزانة مفتاح باسمها.',
    scene: '🔑 حي الخزائن · لا أرقام هنا، بل مفاتيح',
    intro: 'في حي الخزائن لا توجد أرقام عربات! كل خزانة لها مفتاح مكتوب عليه اسم، وبرق يفتحها مباشرة بمفتاحها دون أن يعدّ.',
    code: ['grades = {"Sara":95, "Noura":88}', 'print(grades["Noura"])', 'grades["Reem"] = 91', 'grades["Sara"] = 97', 'print(grades.get("Hind"))'],
    steps: [
      { ln: 0, say: 'يبني برق خزانتين: مفتاح الأولى "Sara" وفيها 95، ومفتاح الثانية "Noura" وفيها 88. كل زوج = مفتاح : قيمة.', mem: { dict: { name: 'grades', items: [['Sara', 95], ['Noura', 88]] } } },
      { ln: 1, ask: { q: 'grades["Noura"]: أي خزانة يفتحها برق؟', t: ['dict', 'Noura'], hint: 'ابحثي عن الخزانة التي مفتاحها "Noura".' }, say: 'لا يعدّ ولا يمرّ على الخزائن واحدة واحدة: المفتاح يوصله إلى خزانته مباشرة. يقرأ 88.', mem: { dict: { name: 'grades', items: [['Sara', 95], ['Noura', 88]] }, hi: ['dict', 'Noura'], out: ['88'] } },
      { ln: 2, say: 'المفتاح "Reem" غير موجود، فيبني برق خزانة جديدة بهذا المفتاح ويضع فيها 91.', mem: { dict: { name: 'grades', items: [['Sara', 95], ['Noura', 88], ['Reem', 91]] }, hi: ['dict', 'Reem'], out: ['88'] } },
      { ln: 3, ask: { q: 'grades["Sara"] = 97: ماذا يفعل برق؟ اضغطي على الخزانة التي يذهب إليها.', t: ['dict', 'Sara'], hint: 'المفتاح "Sara" موجود من قبل، والمفتاح لا يتكرر.' }, say: 'المفتاح "Sara" موجود، والمفتاح لا يتكرر أبدًا. فلا يبني خزانة جديدة، بل يبدّل 95 بـ 97.', mem: { dict: { name: 'grades', items: [['Sara', 97], ['Noura', 88], ['Reem', 91]] }, hi: ['dict', 'Sara'], out: ['88'] } },
      { ln: 4, say: 'يبحث عن مفتاح "Hind" فلا يجده. الدالة get ترجع None بهدوء. أما لو كُتب grades["Hind"] لانطلق إنذار KeyError.', mem: { dict: { name: 'grades', items: [['Sara', 97], ['Noura', 88], ['Reem', 91]] }, out: ['88', 'None'] } },
    ],
    moral: 'في القائمة نصل إلى العنصر برقم عربته، وفي القاموس نصل إلى القيمة بمفتاحها. والمفتاح فريد: الإسناد إلى مفتاح موجود يبدّل قيمته.',
    quiz: { q: 'ماذا يظهر على الشاشة؟', code: 'd = {"a":1}\nd["a"] = 5\nd["b"] = 2\nprint(len(d))', o: ['2', '3', '1', '8'], a: 0, why: 'المفتاح "a" موجود فتبدّلت قيمته فقط، ثم أُضيف "b": المجموع خزانتان.' } },

  { t: 'story', title: 'الفصل ٥: مفترق الطرق (if)', goal: 'if = بوابة عليها حارس يسأل سؤالًا جوابه True أو False.',
    scene: '🚦 مفترق الطرق · حارس البوابة لا يقبل إلا True أو False',
    intro: 'يصل برق إلى مفترق طرق عليه حارس. الحارس يسأل سؤالًا واحدًا، وبحسب الجواب يفتح طريقًا ويغلق الآخر. وبرق لا يمشي في الطريقين معًا أبدًا.',
    code: ['grade = 45', 'if grade >= 50:', '    print("Pass")', 'else:', '    print("Try again")', 'print("End")'],
    steps: [
      { ln: 0, say: 'يضع برق 45 في صندوق اسمه grade.', mem: { vars: [['grade', 45]], hi: ['var', 'grade'] } },
      { ln: 1, ask: { q: 'يقرأ برق 45 من الصندوق، ويسأله الحارس: هل 45 >= 50؟ بماذا يجيب؟', o: ['True', 'False'], a: 1 }, say: 'الجواب False. يغلق الحارس طريق if ويفتح طريق else.', mem: { vars: [['grade', 45]], gate: { q: 'grade >= 50', res: false } } },
      { ln: 4, say: 'يقفز برق فوق السطر 3 ولا ينفّذه إطلاقًا، وينفّذ السطر المُزاح تحت else. المسافة البادئة تخبره أي الأسطر داخل الطريق.', mem: { vars: [['grade', 45]], gate: { q: 'grade >= 50', res: false }, out: ['Try again'] } },
      { ln: 5, say: 'هذا السطر غير مُزاح، فهو خارج الطريقين. ينفّذه برق مهما كان جواب الحارس.', mem: { vars: [['grade', 45]], out: ['Try again', 'End'] } },
    ],
    moral: 'if تجعل المعالج يختار: إن كان الشرط True نفّذ الأسطر المُزاحة تحتها، وإلا نفّذ ما تحت else. والأسطر غير المُزاحة تُنفَّذ دائمًا.',
    quiz: { q: 'ماذا يظهر على الشاشة؟', code: 'x = 7\nif x > 5:\n    print("A")\nelse:\n    print("B")\nprint("C")', o: ['A ثم C', 'B ثم C', 'A ثم B ثم C', 'A فقط'], a: 0, why: '7 > 5 جوابها True فيُطبع A ويُتخطى else، ثم C لأنه خارج الطريقين.' } },

  { t: 'story', title: 'الفصل ٦: جولة القطار (for)', goal: 'for = برق يزور العربات واحدة واحدة، وينسخ ما في كل عربة إلى صندوق مؤقت.',
    scene: '🎡 جولة التفتيش · عربة بعد عربة',
    intro: 'مهمة اليوم: جولة تفتيش على قطار fruits. في كل جولة ينسخ برق ما في عربة واحدة إلى صندوق صغير اسمه f، ثم ينفّذ الأسطر المُزاحة، ثم ينتقل إلى العربة التالية.',
    code: ['fruits = ["apple","orange","banana"]', 'for f in fruits:', '    print(f)', 'print("done")'],
    steps: [
      { ln: 0, say: 'يبني برق القطار بعرباته الثلاث.', mem: { list: { name: 'fruits', items: L3F } } },
      { ln: 1, say: 'الجولة الأولى: يصنع صندوقًا مؤقتًا اسمه f، يذهب إلى العربة 0، وينسخ ما فيها إلى f.', mem: { vars: [['f', 'apple']], list: { name: 'fruits', items: L3F }, hi: ['list', 0] } },
      { ln: 2, say: 'ينفّذ السطر المُزاح: يقرأ صندوق f ويكتبه على الشاشة.', mem: { vars: [['f', 'apple']], list: { name: 'fruits', items: L3F }, hi: ['var', 'f'], out: ['apple'] } },
      { ln: 1, ask: { q: 'انتهت الأسطر المُزاحة، فيعود برق إلى سطر for. إلى أي عربة ينتقل الآن؟', t: ['list', 1], hint: 'ينتقل إلى العربة التالية مباشرة: رقم 1.' }, say: 'الجولة الثانية: ينتقل إلى العربة 1 وينسخ orange إلى الصندوق f نفسه (فتختفي apple منه).', mem: { vars: [['f', 'orange']], list: { name: 'fruits', items: L3F }, hi: ['list', 1], out: ['apple'] } },
      { ln: 2, say: 'يطبع ما في f الآن.', mem: { vars: [['f', 'orange']], list: { name: 'fruits', items: L3F }, hi: ['var', 'f'], out: ['apple', 'orange'] } },
      { ln: 1, say: 'الجولة الثالثة: العربة 2، وينسخ banana إلى f.', mem: { vars: [['f', 'banana']], list: { name: 'fruits', items: L3F }, hi: ['list', 2], out: ['apple', 'orange'] } },
      { ln: 2, say: 'يطبع banana.', mem: { vars: [['f', 'banana']], list: { name: 'fruits', items: L3F }, hi: ['var', 'f'], out: ['apple', 'orange', 'banana'] } },
      { ln: 1, ask: { q: 'يعود برق إلى سطر for ويبحث عن العربة رقم 3. ماذا يحدث؟', o: ['يبدأ من العربة 0 من جديد', 'لا توجد عربة 3، فتنتهي الحلقة', 'يظهر خطأ'], a: 1 }, say: 'لا توجد عربة 3، فتنتهي الجولات بهدوء، ويخرج برق من الحلقة.', mem: { vars: [['f', 'banana']], list: { name: 'fruits', items: L3F }, out: ['apple', 'orange', 'banana'] } },
      { ln: 3, say: 'ينفّذ أول سطر غير مُزاح بعد الحلقة، مرة واحدة فقط.', mem: { vars: [['f', 'banana']], list: { name: 'fruits', items: L3F }, out: ['apple', 'orange', 'banana', 'done'] } },
    ],
    moral: 'for تكرّر الأسطر المُزاحة مرة لكل عنصر. وفي كل جولة يحمل المتغير (f) نسخة من عنصر واحد بالترتيب، من العربة 0 إلى آخر عربة.',
    quiz: { q: 'كم مرة تُطبع كلمة hi؟', code: 'nums = [10, 20, 30, 40]\nfor n in nums:\n    print("hi")\nprint("bye")', o: ['4', '5', '1', '40'], a: 0, why: 'القطار فيه 4 عربات، فتُنفَّذ الأسطر المُزاحة 4 مرات. و bye خارج الحلقة.' } },

  { t: 'master' },
] };
if ((window.LABCFG?.grade ?? 3) === 3) LESSONS.unshift(STORY);
