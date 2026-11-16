// أول متوسط: «حكاية مدينة الذاكرة» (المتغيرات، الأنواع، الإدخال، المعاملات، التبديل) + «ورشة السلحفاة»
'use strict';
const STORY1 = { id: 'as', n: 0, title: 'حكاية مدينة الذاكرة', pages: '١٣٠–١٥١', icon: 'star', extra: 1,
  skills: ['أتخيل كيف يحفظ المعالج المتغيرات في الذاكرة', 'أعرف أن input ترجع نصًا وأحوّله بـ int و float'],
  acts: [
  { t: 'comic', title: 'المقدمة: مدينة داخل حاسبكِ', goal: 'تتعرفين على «برق» المعالج، وعلى مدينة الذاكرة.',
    panels: [
      { w: 'k', m: 'happy', s: 'هل تعلمين أن داخل كل حاسب مدينة لا تنام؟ اسمها «مدينة الذاكرة».' },
      { w: 'q', m: 'happy', s: 'وأنا «برق» ⚡ المعالج! أقرأ الكود سطرًا سطرًا من الأعلى للأسفل، وأنفّذ ما يُكتب لي بالضبط، لا أكثر ولا أقل.' },
      { w: 'b', m: 'wink', s: 'في المدينة صناديق كثيرة، على كل صندوق ملصق باسمه: هذه هي المتغيرات.' },
      { w: 'q', m: 'wow', s: 'وعندي بوابة أنتظر عندها ما تكتبه المستخدمة بلوحة المفاتيح، وورشة أحسب فيها!', fx: 'ززززت!' },
      { w: 'k', m: 'think', s: 'في كل فصل تصيرين أنتِ المعالج: تنفّذين السطر التالي، وتضغطين على المكان الذي يذهب إليه برق. مستعدة؟' },
    ],
    q: { q: 'ماذا يفعل المعالج «برق» بالكود؟', o: ['يقرأه سطرًا سطرًا من الأعلى للأسفل', 'ينفّذ كل الأسطر معًا', 'يبدأ من آخر سطر', 'يتخطى ما لا يعجبه'], a: 0 } },

  { t: 'story', title: 'الفصل ١: حي الصناديق (المتغيرات)', goal: 'المتغير = صندوق في الذاكرة عليه ملصق باسمه.',
    scene: '📦 حي الصناديق · كل صندوق عليه ملصق باسم',
    intro: 'وصل برق إلى حي الصناديق. اضغطي «ابدئي الحكاية» ونفّذي معه سطرًا سطرًا.',
    code: ['x = 15', 'y = 20', 'Total = x + y', 'print(Total)'],
    steps: [
      { ln: 0, say: 'يأخذ برق صندوقًا فارغًا، يضع فيه 15، ويلصق عليه x. علامة = عنده تعني «ضَعْ في» وليست «يساوي».', mem: { vars: [['x', 15]], hi: ['var', 'x'] } },
      { ln: 1, say: 'صندوق ثانٍ اسمه y وفيه 20.', mem: { vars: [['x', 15], ['y', 20]], hi: ['var', 'y'] } },
      { ln: 2, ask: { q: 'Total = x + y : يبدأ برق بالطرف الأيمن. من أي صندوق يقرأ أولًا؟', t: ['var', 'x'], hint: 'الطرف الأيمن من علامة = هو x + y، ويقرأ من اليسار: x أولًا.' }, say: 'يقرأ 15 من x و 20 من y، يجمعهما في ورشته = 35، ثم يضع الناتج في صندوق جديد اسمه Total.', mem: { vars: [['x', 15], ['y', 20], ['Total', 35]], hi: ['var', 'Total'] } },
      { ln: 3, say: 'print تقرأ ما في الصندوق Total وتكتبه على الشاشة.', mem: { vars: [['x', 15], ['y', 20], ['Total', 35]], out: ['35'] } },
    ],
    moral: 'المتغير اسمٌ ملصق على صندوق في الذاكرة. المعالج يحسب الطرف الأيمن من = أولًا، ثم يضع الناتج في الصندوق الأيسر.',
    quiz: { q: 'ماذا يظهر على الشاشة؟', code: 'a = 7\nb = 3\nc = a + b\nprint(c)', o: ['10', '73', 'a+b', 'c'], a: 0 } },

  { t: 'story', title: 'الفصل ٢: ألوان الصناديق (أنواع البيانات)', goal: 'لكل قيمة نوع: int و float و str و bool.',
    scene: '🎨 سوق الصناديق الملونة · لكل نوع لون',
    intro: 'في هذا الحي، لون الصندوق يخبر برق بنوع ما فيه: الأعداد الصحيحة int، والعشرية float، والنصوص str، والمنطقية bool.',
    code: ['name = "محمد"', 'age = 12', 'avg = 95.5', 'ok = True', 'a = "5" + "5"', 'b = 5 + 5'],
    steps: [
      { ln: 0, say: 'علامتا التنصيص " " تعنيان: هذا نص str. صندوق برتقالي.', mem: { vars: [['name', 'محمد', 'str']], hi: ['var', 'name'] } },
      { ln: 1, say: '12 عدد صحيح int بلا فاصلة: صندوق أزرق.', mem: { vars: [['name', 'محمد', 'str'], ['age', 12, 'int']], hi: ['var', 'age'] } },
      { ln: 2, say: '95.5 فيه فاصلة عشرية: float، صندوق أخضر.', mem: { vars: [['name', 'محمد', 'str'], ['age', 12, 'int'], ['avg', 95.5, 'float']], hi: ['var', 'avg'] } },
      { ln: 3, ask: { q: 'True: أي نوع هذا؟', o: ['bool', 'str', 'int'], a: 0 }, say: 'True و False قيمتان منطقيتان bool، صندوق بنفسجي.', mem: { vars: [['name', 'محمد', 'str'], ['age', 12, 'int'], ['avg', 95.5, 'float'], ['ok', true, 'bool']], hi: ['var', 'ok'] } },
      { ln: 4, ask: { q: '"5" + "5" : نصّان! ماذا يفعل برق بالنصوص عند الجمع؟', o: ['يلصقها: "55"', 'يجمعها: 10', 'يُظهر خطأ'], a: 0 }, say: 'مع النصوص، علامة + تلصق ولا تجمع: "55".', mem: { vars: [['age', 12, 'int'], ['ok', true, 'bool'], ['a', '55', 'str']], hi: ['var', 'a'] } },
      { ln: 5, say: 'أما مع الأعداد فـ + تجمع فعلًا: 10. نفس الرمز، وعمل مختلف حسب النوع!', mem: { vars: [['age', 12, 'int'], ['ok', true, 'bool'], ['a', '55', 'str'], ['b', 10, 'int']], hi: ['var', 'b'] } },
    ],
    moral: 'النوع يحدد ماذا يستطيع المعالج أن يفعل بالقيمة: "5" نص يُلصق، و 5 عدد يُجمع.',
    quiz: { q: 'ما الناتج؟', code: 'x = "3" + "4"\nprint(x)', o: ['34', '7', 'خطأ'], a: 0 } },

  { t: 'story', title: 'الفصل ٣: بوابة لوحة المفاتيح (input)', goal: 'input توقف البرنامج، وكل ما تكتبه المستخدمة يصل نصًا.',
    scene: '⌨️ بوابة لوحة المفاتيح · برق ينتظر هنا',
    intro: 'عند بوابة المدينة يقف برق وينتظر. كلما رأى input() توقف تمامًا حتى تكتب المستخدمة شيئًا وتضغط Enter.',
    code: ['x = input()', 'y = int(input())', 'z = x + y', 'z = int(x) + y', 'print(z)'],
    steps: [
      { ln: 0, say: 'يتوقف البرنامج… المستخدمة تكتب 10 وتضغط Enter. لكن لوحة المفاتيح لا ترسل إلا نصًا! فيصل "10" ويوضع في صندوق برتقالي (str).', mem: { inbox: '10', vars: [['x', '10', 'str']], hi: ['var', 'x'] } },
      { ln: 1, ask: { q: 'تكتب المستخدمة 5. الدالة int() تحوّل النص إلى عدد. ما نوع صندوق y؟', o: ['int', 'str', 'float'], a: 0 }, say: 'يصل "5" نصًا، ثم يحوّله int() إلى العدد 5 قبل أن يوضع في الصندوق.', mem: { inbox: '5', vars: [['x', '10', 'str'], ['y', 5, 'int']], hi: ['var', 'y'] } },
      { ln: 2, say: 'يحاول برق أن يجمع نصًا "10" مع عدد 5… لا يعرف كيف! تنطلق صفّارة الإنذار.', mem: { vars: [['x', '10', 'str'], ['y', 5, 'int']], err: 'TypeError: can only concatenate str (not "int") to str' } },
      { ln: 3, ask: { q: 'الحل: int(x) تحوّل ما في x إلى عدد. اضغطي على الصندوق الذي يقرأ منه int() أولًا.', t: ['var', 'x'] }, say: 'int(x) تحوّل "10" إلى 10، ثم 10 + 5 = 15 في صندوق z.', mem: { vars: [['x', '10', 'str'], ['y', 5, 'int'], ['z', 15, 'int']], hi: ['var', 'z'] } },
      { ln: 4, say: 'تظهر 15 على الشاشة. نجحنا!', mem: { vars: [['x', '10', 'str'], ['y', 5, 'int'], ['z', 15, 'int']], out: ['15'] } },
    ],
    moral: 'input() ترجع نصًا دائمًا. للحساب: int(input()) للأعداد الصحيحة، و float(input()) للأعداد العشرية.',
    quiz: { q: 'أدخلت المستخدمة 4 ثم 6. ما الناتج؟', code: 'a = input()\nb = input()\nprint(a + b)', o: ['46', '10', 'خطأ'], a: 0, why: 'النصان "4" و "6" التصقا.' } },

  { t: 'story', title: 'الفصل ٤: ورشة الحساب (المعاملات)', goal: 'ترتيب العمليات، ومعاملات الإسناد.',
    scene: '🔧 ورشة الحساب · الضرب قبل الجمع',
    intro: 'في ورشة برق قانون صارم: الأقواس أولًا، ثم الأس **، ثم الضرب * والقسمة /، ثم الجمع + والطرح -.',
    code: ['r = 4 + 2 * 5', 'x = 6', 'x += 3', 'x *= 2', 'print(r, x)'],
    steps: [
      { ln: 0, ask: { q: 'r = 4 + 2 * 5 : أي عملية ينفذها برق أولًا؟', o: ['2 * 5', '4 + 2'], a: 0 }, say: 'يضرب أولًا: 2 * 5 = 10، ثم يجمع 4 + 10 = 14. وليس 30!', mem: { vars: [['r', 14]], hi: ['var', 'r'] } },
      { ln: 1, say: 'صندوق x فيه 6.', mem: { vars: [['r', 14], ['x', 6]], hi: ['var', 'x'] } },
      { ln: 2, ask: { q: 'x += 3 تعني x = x + 3 . أي صندوق يتغير؟', t: ['var', 'x'] }, say: 'يقرأ 6 من x، يضيف 3، ويعيد 9 إلى x نفسه.', mem: { vars: [['r', 14], ['x', 9]], hi: ['var', 'x'] } },
      { ln: 3, ask: { q: 'x *= 2 : ما القيمة الجديدة في x؟', o: ['18', '11', '12'], a: 0 }, say: 'x = 9 * 2 = 18.', mem: { vars: [['r', 14], ['x', 18]], hi: ['var', 'x'] } },
      { ln: 4, say: 'يطبع الصندوقين.', mem: { vars: [['r', 14], ['x', 18]], out: ['14 18'] } },
    ],
    moral: 'الضرب والقسمة قبل الجمع والطرح، والأقواس قبل الجميع. و x += 3 اختصار لـ x = x + 3.',
    quiz: { q: 'ما الناتج؟', code: 'n = 10\nn -= 4\nn *= 2\nprint(n)', o: ['12', '16', '2'], a: 0 } },

  { t: 'story', title: 'الفصل ٥: لغز التبديل', goal: 'لماذا x=y ثم y=x لا تبدّل القيمتين؟ (اختبر نفسك س١١)',
    scene: '🕵️ لغز الصندوقين · قيمة اختفت!',
    intro: 'أرادت سارة أن تبدّل محتوى صندوقين، فكتبت x = y ثم y = x. لكن شيئًا غريبًا حدث… تابعي برق!',
    code: ['x = 20', 'y = 30', 'x = y', 'y = x', 'Total = x + y', 'print(Total)'],
    steps: [
      { ln: 0, say: 'صندوق x فيه 20.', mem: { vars: [['x', 20]], hi: ['var', 'x'] } },
      { ln: 1, say: 'صندوق y فيه 30.', mem: { vars: [['x', 20], ['y', 30]], hi: ['var', 'y'] } },
      { ln: 2, ask: { q: 'x = y : أي صندوق تتغير قيمته؟', t: ['var', 'x'], hint: 'الصندوق المكتوب يسار = هو الذي يتغير.' }, say: 'ينسخ 30 من y ويضعها في x… فتُمسح 20 إلى الأبد! الصندوق لا يتسع إلا لقيمة واحدة.', mem: { vars: [['x', 30], ['y', 30]], hi: ['var', 'x'] } },
      { ln: 3, ask: { q: 'y = x : ما القيمة التي ستوضع في y الآن؟', o: ['30', '20'], a: 0 }, say: 'x أصبحت 30، فتعود 30 إلى y. لم تتبدل القيمتان، بل صارتا 30 و 30.', mem: { vars: [['x', 30], ['y', 30]], hi: ['var', 'y'] } },
      { ln: 4, say: '30 + 30 = 60.', mem: { vars: [['x', 30], ['y', 30], ['Total', 60]], hi: ['var', 'Total'] } },
      { ln: 5, say: 'الناتج 60، وليس 50!', mem: { vars: [['x', 30], ['y', 30], ['Total', 60]], out: ['60'] } },
    ],
    moral: 'وضع قيمة جديدة في صندوق يمسح القيمة القديمة. للتبديل الصحيح نحتاج صندوقًا مؤقتًا: t = x ثم x = y ثم y = t.',
    quiz: { q: 'ما الناتج؟', code: 'a = 1\nb = 2\na = b\nprint(a, b)', o: ['2 2', '1 2', '2 1'], a: 0 } },

  { t: 'turtlepad', title: 'ورشة السلحفاة', goal: 'كل زر أمر من أوامر السلحفاة. أنجزي المهمات وراقبي الكود يُكتب.' },
  { t: 'master' },
] };
LESSONS.unshift(STORY1);

/* ورشة السلحفاة: أوامر بالأزرار، رسم متحرك، وكود يُكتب */
function turtlePad({ a, body, rec, got }) {
  const W = 420, H = 320;
  const MIS = [
    { g: 'ارسمي خطًا طوله 100 بالأمر forward(100).', ok: s => s.log.some(e => e.k === 'fd' && e.d >= 100 && e.pen) },
    { g: 'ارسمي مربعًا: تقدّمي واستديري 90 درجة أربع مرات.', ok: s => closed(s, 4, 90) },
    { g: 'ارسمي مثلثًا متساوي الأضلاع: استديري 120 درجة.', ok: s => closed(s, 3, 120) },
    { g: 'ارفعي القلم ثم تحرّكي دون أن ترسمي.', ok: s => s.log.length && s.log[s.log.length - 1].k === 'fd' && !s.log[s.log.length - 1].pen },
    { g: 'غيّري اللون، ثم ارسمي دائرة.', ok: s => s.log.some(e => e.k === 'circle' && e.c !== 'black') },
    { g: 'اكتبي نصًا بالأمر write.', ok: s => s.log.some(e => e.k === 'write') },
  ];
  function closed(s, n, ang) {
    const L = s.log; let fds = 0, i = L.length - 1, len = null;
    for (; i >= 0 && fds < n; i--) { const e = L[i]; if (e.k === 'fd') { if (!e.pen || (len != null && Math.abs(e.d - len) > 1)) return false; len = e.d; fds++; } else if (e.k === 'turn') { if (Math.abs(Math.abs(e.a) - ang) > 0.5) return false; } else return false; }
    if (fds < n) return false; const first = L[i + 1]; return Math.hypot(first.x0 - s.x, first.y0 - s.y) < 2;
  }
  let S = null;
  const reset = () => { S = { x: 0, y: 0, h: 0, pen: true, c: 'black', log: [], segs: [], code: ['from turtle import*', 't=Turtle()', 't.shape("turtle")'] }; };
  reset();
  const B = [
    ['forward(100)', '⬆ للأمام 100', s => fd(100)], ['forward(50)', '⬆ للأمام 50', s => fd(50)], ['backward(50)', '⬇ للخلف 50', s => fd(-50)],
    ['left(90)', '↺ يسار 90', () => turn(90)], ['right(90)', '↻ يمين 90', () => turn(-90)], ['left(120)', '↺ يسار 120', () => turn(120)], ['left(45)', '↺ يسار 45', () => turn(45)],
    ['penup()', '✋ ارفعي القلم', () => { S.pen = false; }], ['pendown()', '✏️ أنزلي القلم', () => { S.pen = true; }],
    ['color("red")', '🔴 أحمر', () => { S.c = 'red'; }], ['color("green")', '🟢 أخضر', () => { S.c = 'green'; }], ['color("blue")', '🔵 أزرق', () => { S.c = 'blue'; }],
    ['circle(40)', '◯ دائرة 40', () => circ(40)], ['write("مرحبا")', '✍ اكتبي «مرحبا»', () => { S.segs.push({ t: 'مرحبا', x: S.x, y: S.y, c: S.c }); S.log.push({ k: 'write' }); }],
    ['goto(0, 0)', '🏠 إلى (0,0)', () => goto(0, 0)],
  ];
  function fd(d) { const r = S.h * Math.PI / 180, nx = S.x + d * Math.cos(r), ny = S.y + d * Math.sin(r); S.log.push({ k: 'fd', d: Math.abs(d), pen: S.pen, x0: S.x, y0: S.y }); if (S.pen) S.segs.push({ x1: S.x, y1: S.y, x2: nx, y2: ny, c: S.c }); S.x = nx; S.y = ny; }
  function goto(x, y) { S.log.push({ k: 'goto' }); if (S.pen) S.segs.push({ x1: S.x, y1: S.y, x2: x, y2: y, c: S.c }); S.x = x; S.y = y; }
  function turn(a) { S.h += a; S.log.push({ k: 'turn', a }); }
  function circ(r) { const n = 36; for (let i = 0; i < n; i++) { const st = 2 * r * Math.sin(Math.PI / n); const hh = (S.h + (i + .5) * 360 / n) * Math.PI / 180; const nx = S.x + st * Math.cos(hh), ny = S.y + st * Math.sin(hh); if (S.pen) S.segs.push({ x1: S.x, y1: S.y, x2: nx, y2: ny, c: S.c }); S.x = nx; S.y = ny; } S.log.push({ k: 'circle', c: S.c }); }
  body.innerHTML = `<div class="tmis" id="tm"></div><div class="row" style="align-items:flex-start;gap:14px"><div class="coord"><canvas width="${W}" height="${H}" style="background:#fff"></canvas></div>
  <div style="flex:1;min-width:230px"><div class="tgrid" style="grid-template-columns:repeat(auto-fill,minmax(105px,1fr));margin-top:0">${B.map((b, i) => `<button class="tool" data-i="${i}" style="padding:6px"><b style="font-size:13px">${b[1]}</b><small class="mono">${esc(b[0])}</small></button>`).join('')}<button class="tool" id="rs" style="padding:6px"><b style="font-size:13px">↺ امسحي</b><small class="mono">reset()</small></button></div></div></div>
  <div class="stcode" style="margin-top:10px"><div class="tb">🐍 الكود الذي كتبتِه بالأزرار</div><div id="lg" class="out" style="border:0;min-height:60px"></div></div>`;
  const cv = $('canvas', body), x = cv.getContext('2d'), tx = X => W / 2 + X, ty = Y => H / 2 - Y;
  const draw = () => {
    x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.strokeStyle = '#eee'; for (let i = 0; i <= W; i += 20) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); } for (let j = 0; j <= H; j += 20) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); }
    x.strokeStyle = '#ccc'; x.beginPath(); x.moveTo(W / 2, 0); x.lineTo(W / 2, H); x.moveTo(0, H / 2); x.lineTo(W, H / 2); x.stroke(); x.fillStyle = '#999'; x.font = '11px Rubik'; x.fillText('(0,0)', W / 2 + 3, H / 2 - 4);
    S.segs.forEach(s => { if (s.t) { x.fillStyle = s.c; x.font = '18px Rubik'; x.direction = 'rtl'; x.fillText(s.t, tx(s.x), ty(s.y)); return; } x.strokeStyle = s.c; x.lineWidth = 3; x.lineCap = 'round'; x.beginPath(); x.moveTo(tx(s.x1), ty(s.y1)); x.lineTo(tx(s.x2), ty(s.y2)); x.stroke(); });
    x.save(); x.translate(tx(S.x), ty(S.y)); x.rotate(-S.h * Math.PI / 180); x.fillStyle = '#5BAA5B';
    [[-6, -9], [-6, 9], [7, -8], [7, 8]].forEach(([a, b]) => { x.beginPath(); x.ellipse(a * 1.4, b * 1.4, 5, 4, 0, 0, 7); x.fill(); });
    x.beginPath(); x.ellipse(18, 0, 6, 5, 0, 0, 7); x.fill(); x.fillStyle = S.c === 'black' ? '#2E7D32' : S.c; x.beginPath(); x.ellipse(0, 0, 14, 11, 0, 0, 7); x.fill(); x.strokeStyle = '#1B4D1E'; x.lineWidth = 1.5; x.stroke();
    if (!S.pen) { x.fillStyle = '#fff'; x.font = '12px sans-serif'; x.fillText('✋', -6, 4); }
    x.restore();
    const k = MIS.findIndex((_, i) => !got('m' + i));
    $('#tm', body).innerHTML = k < 0 ? '<b>🏆 أنجزتِ كل مهمات السلحفاة! ارسمي بحرية.</b>' : `<b>المهمة ${ar(k + 1)} من ${ar(MIS.length)}:</b> ${rich(MIS[k].g)}`;
    $('#lg', body).innerHTML = S.code.map(l => `<div>${esc(l)}</div>`).join('');
  };
  $$('.tool[data-i]', body).forEach(b => b.onclick = () => {
    const c = B[+b.dataset.i]; c[2](); S.code.push('t.' + c[0]); beep(1);
    const k = MIS.findIndex((_, i) => !got('m' + i));
    if (k >= 0 && MIS[k].ok(S)) { rec('m' + k, 5, { tries: 0 }); toast('✔ مهمة منجزة +٥ ⭐'); if (MIS.every((_, i) => got('m' + i))) confetti(); }
    draw();
  });
  $('#rs', body).onclick = () => { reset(); draw(); };
  a.missions = MIS.map(m => ({ goal: m.g }));
  draw();
}
