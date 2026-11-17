// محتوى معمل ثاني متوسط: الوحدة الخامسة «برمجة الروبوت» (فيكس كود في آر + بايثون) — كتاب المهارات الرقمية ثاني متوسط (ص٣٣٦–٣٩٣)
'use strict';
window.LABCFG = { grade: 2, gname: 'ثاني متوسط', slug: 'video-1448', lab: 'pylab-g2', store: 'pylab-g2-v1', unit: 'الوحدة الخامسة «برمجة الروبوت»', sub: 'المهارات الرقمية · ثاني متوسط · الوحدة الخامسة' };
const VX = '__import__("vex")';
const GRID = '# Playground: Grid Map\n', ART = '# Playground: Art Canvas\n';
const PETAL = 'def Petal():\n    for repeat_count in range(3):\n        drivetrain.drive_for(FORWARD, 180, MM)\n        drivetrain.turn_for(RIGHT, 30, DEGREES)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    for repeat_count in range(3):\n        drivetrain.drive_for(FORWARD, 180, MM)\n        drivetrain.turn_for(RIGHT, 30, DEGREES)\n';
const PETALP = 'def Petal(Petal_side_length):\n    for repeat_count in range(3):\n        drivetrain.drive_for(FORWARD, Petal_side_length, MM)\n        drivetrain.turn_for(RIGHT, 30, DEGREES)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    for repeat_count in range(3):\n        drivetrain.drive_for(FORWARD, Petal_side_length, MM)\n        drivetrain.turn_for(RIGHT, 30, DEGREES)\n';
const ZIG = 'def one_step_zigzag():\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(LEFT, 90, DEGREES)\n';
const PEN = (c, w) => `pen.set_pen_color(${c})\npen.set_pen_width(${w})\npen.move(DOWN)\n`;

const LESSONS = [
/* ==================== المحطة ١ ==================== */
{ id: 'r1', n: 1, title: 'المتغيرات تتحكم في الروبوت', pages: '٣٣٧–٣٤٦', icon: 'grid',
  skills: ['أعرف المقصود بالمتغيرات وكيفية استخدامها', 'أطبق قواعد تسمية المتغير', 'أستخدم المتغيرات للتحكم في حركة الروبوت'],
  acts: [
  { t: 'comic', title: 'قصة: روبوت يتذكر', goal: 'تتعرفين على المتغير: اسم مستعار لشيء يتذكره الحاسب.',
    panels: [
      { w: 'k', m: 'happy', s: 'هذا روبوت الواقع الافتراضي في بيئة فيكس كود في آر! أبرمجه باللبنات، وكل لبنة لها أمر بلغة بايثون.' },
      { w: 'b', m: 'wink', s: 'ولكي يتذكر الروبوت سرعته نحتاج متغيرًا: حاوية في البرنامج تحفظ بيانات، أرقامًا أو نصوصًا.' },
      { w: 'k', m: 'think', s: 'لبنة «مجموعة speed إلى 10» تهيّئ المتغير. وفي بايثون أكتبها هكذا:', code: 'speed = 10' },
      { w: 'b', m: 'happy', s: 'ولبنة «تغيير speed من قبل 20» تزيد القيمة. وللإنقاص نكتب الرقم بإشارة سالبة.', code: 'speed = speed + 20' },
      { w: 'k', m: 'wow', s: 'المتغير يحتوي على قيمة واحدة فقط في كل مرة! فإذا كانت speed تساوي 10 ثم زدناها 20 صارت… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة: كم تصبح قيمة speed؟', o: ['30', '10', '20', '1020'], a: 0, why: 'القيمة القديمة 10 تُستبدل بالجديدة 10 + 20 = 30، فالمتغير يحمل قيمة واحدة فقط.' } },

  { t: 'match', title: 'طابقي: لبنات المتغير وأوامر بايثون', p: '٣٤٠', goal: 'كل لبنة في فيكس كود في آر لها سطر بايثون يقابلها.',
    pairs: [['speed = 0', 'لبنة تهيئة المتغير: مجموعة speed إلى 0'], ['speed = speed + 1', 'لبنة تغيير المتغير: تغيير speed من قبل 1'], ['speed = speed + -5', 'إنقاص قيمة المتغير بمقدار 5'], ['brain.print(speed)', 'طباعة قيمة المتغير في وحدة تحكم العرض'], ['drivetrain.set_drive_velocity(speed, PERCENT)', 'استخدام لبنة عرض المتغير داخل لبنة أخرى']], mono: 'l' },

  { t: 'tpr', title: 'استجيبي: هل الاسم صالح لمتغير؟', goal: '👍 صالح  •  👉 غير متأكدة  •  👎 غير صالح',
    thumbs: [
      { s: 'speed', a: 'up', why: 'اسم فريد يمثل محتواه.' },
      { s: 'Travel_distance', a: 'up', why: 'أكثر من كلمة بينهما شرطة سفلية ( _ ).' },
      { s: '2speed', a: 'down', why: 'لا يبدأ اسم المتغير برقم.' },
      { s: 'my speed', a: 'down', why: 'لا يحتوي اسم المتغير على مسافات.' },
      { s: 'repeat', a: 'down', why: 'كلمة محجوزة تستخدمها بيئة البرمجة (تكرار).' },
      { s: 'Turn!', a: 'down', why: 'لا يحتوي على أحرف خاصة مثل ! و " .' },
      { s: 'newVariable', a: 'up', why: 'حروف كبيرة وصغيرة معًا مسموحة.' },
    ],
    conf: [
      { q: 'ما قيمة speed في النهاية؟', code: 'speed = 10\nspeed = speed + 20\nspeed = speed + 20', o: ['50', '30', '10'], a: 0 },
      { q: 'ما الذي يُطبع؟', code: 'x = 2\nx = 7\nbrain.print(x)', o: ['7', '2', '27'], a: 0 },
      { q: 'ما قيمة speed في النهاية؟', code: 'speed = 100\nspeed = speed + -30', o: ['70', '130', '-30'], a: 0 },
    ] },

  { t: 'run', title: 'جرّبي بنفسك: المتغير speed', items: [
    { h: 'تهيئة متغير وطباعته', p: '٣٤٠', code: 'speed = 10\nbrain.print(speed)', note: 'أسفل المخرجات تظهر «المراقبة» وفيها قيم متغيراتك، مثل وحدة تحكم المراقبة (Monitor Console) في الكتاب.' },
    { h: 'تغيير قيمة المتغير', p: '٣٤٠', code: 'speed = 10\nspeed = speed + 20\nbrain.print(speed)', predict: { q: 'ما الذي سيُطبع؟', o: ['30', '10', '20'], a: 0 } },
    { h: 'مثال ١: التسارع', p: '٣٤٤', code: GRID + 'speed = 10\nfor repeat_count in range(4):\n    drivetrain.set_drive_velocity(speed, PERCENT)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    speed = speed + 20', predict: { q: 'بأي سرعة يتحرك الروبوت في المرة الرابعة (الأخيرة)؟', o: ['70 %', '90 %', '40 %'], a: 0 }, note: 'يبدأ الروبوت بسرعة 10 % ويتسارع 20 % كل 200 mm. لاحظي أن speed في النهاية 90 مع أن آخر سرعة تحرك بها 70.' },
  ] },

  { t: 'traffic', title: 'إشارة المرور: المتغيرات',
    show: [
      { s: 'المتغير حاوية تحفظ بيانات يمكن أن تكون أرقامًا وأحرفًا.', a: 'g', fix: 'صحيحة.' },
      { s: 'يمكن أن يحتوي المتغير على قيمتين في الوقت نفسه.', a: 'r', fix: 'المتغير يحتوي على قيمة واحدة فقط في كل مرة.' },
      { s: 'المتغيرات النصية تسمى أيضًا السلاسل النصية (Strings).', a: 'g', fix: 'صحيحة، وهناك أيضًا المتغيرات الرقمية.' },
      { s: 'لتقليل قيمة المتغير في لبنة «تغيير» نكتب الرقم بإشارة سالبة.', a: 'g', fix: 'صحيحة.' },
      { s: 'وحدة تحكم المراقبة تغيّر قيمة المتغير أثناء التشغيل.', a: 'r', fix: 'هي تعرض التغييرات فقط، ولا تغيّر القيمة.' },
    ],
    opinion: [
      { s: 'أرى أن الاسم speed أفضل من الاسم x لمتغير السرعة.' },
      { s: 'إحدى الطالبات قالت: «لا أحتاج متغيرات، أكتب الأرقام مباشرة في اللبنات».' },
      { s: 'من وجهة نظري، مراقبة قيم المتغيرات تساعدني على اكتشاف الأخطاء.' },
    ],
    move: [
      { s: 'سمّيتِ المتغير Travel distance بمسافة بين الكلمتين. نكمل؟', a: 'r', why: 'استخدمي الشرطة السفلية: Travel_distance.' },
      { s: 'وضعتِ «تغيير speed من قبل 20» داخل حلقة التكرار. نكمل؟', a: 'g', why: 'هكذا تزيد السرعة في نهاية كل حلقة.' },
      { s: 'لا تعرفين هل تضعين «اضبط السرعة» قبل «تحرك» أم بعدها.', a: 'y', why: 'فكّري: تُضبط السرعة أولًا ثم يتحرك الروبوت بها.' },
    ] },

  { t: 'code', title: 'تحدي البرمجة: التسارع', p: '٣٤٤ (مثال ١)',
    task: 'اجعلي الروبوت يتسارع على ملعب <b>شبكة خريطة</b>:<br>• المتغير <code>speed</code> يبدأ من 10<br>• كرّري 4 مرات: اضبطي السرعة على <code>speed</code>، تحركي للأمام 200 mm، ثم زيدي <code>speed</code> بمقدار 20',
    starter: GRID + 'speed = 10\n',
    checks: [ { py: `${VX}._drives()==[200,200,200,200]`, msg: 'أربع حركات للأمام، كل حركة 200 mm' }, { py: `[e[1] for e in ${VX}._log if e[0]=="vel"]==[10,30,50,70]`, msg: 'السرعات: 10 ثم 30 ثم 50 ثم 70' }, { py: 'speed==90', msg: 'قيمة speed في النهاية 90' } ],
    hint: 'for repeat_count in range(4):\n    drivetrain.set_drive_velocity(speed, PERCENT)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    speed = speed + 20',
    sol: GRID + 'speed = 10\nfor repeat_count in range(4):\n    drivetrain.set_drive_velocity(speed, PERCENT)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    speed = speed + 20' },
  { t: 'master' },
] },

/* ==================== المحطة ٢ ==================== */
{ id: 'r2', n: 2, title: 'العمليات الحسابية والتكرارات', pages: '٣٤٧–٣٥٦', icon: 'list',
  skills: ['أجري العمليات الحسابية في فيكس كود في آر', 'أستخدم الشرط', 'أستخدم التكرار وأميز بين أنواعه'],
  acts: [
  { t: 'comic', title: 'قصة: العدّاد الذي يوقف الحلقة', goal: 'المعاملات الحسابية، والتكرار، والشرط، والعدّاد.',
    panels: [
      { w: 'k', m: 'happy', s: 'في فئة العمليات (Operators) لبنات الجمع والطرح والضرب والقسمة. جرّبت الضرب:', code: 'x = 2\nMultiplication = x * 6' },
      { w: 'b', m: 'wink', s: 'ولتنفيذ التعليمات عدة مرات نستخدم التكرارات (Loops). أنواعها أربعة: تكرار، تكرار حتى، إلى الأبد، في حين.' },
      { w: 'k', m: 'think', s: 'لبنة «تكرار 10» تعرف عدد المرات مسبقًا. لكن ماذا لو أردت التوقف عند شرط؟' },
      { w: 'b', m: 'happy', s: 'استخدمي «تكرار حتى» مع عدّاد (Counter): يزيد 1 في كل مرة، وتتوقف الحلقة عندما يصبح الشرط صحيحًا.', code: 'Counter = 0\nwhile not Counter > 5:\n    Counter = Counter + 1' },
      { w: 'k', m: 'wow', s: 'وأستطيع معرفة هل العدّاد زوجي أم فردي بلبنة «ما تبقى من»! فباقي قسمة العدد الزوجي على 2 يساوي… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['0', '1', '2', 'العدد نفسه'], a: 0, why: 'العدد الزوجي لا باقي له عند قسمته على 2، والفردي باقيه دائمًا 1.' } },

  { t: 'quiz', title: 'اختاري: المعاملات والتكرار', p: '٣٤٧–٣٥٥', items: [
    { q: 'رمز عملية الضرب في بايثون', o: ['*', 'x', '×', '#'], a: 0 },
    { q: 'ما قيمة Multiplication؟', code: 'x = 2\nMultiplication = x * 6', o: ['12', '8', '26', '62'], a: 0 },
    { q: 'أي تكرار نستخدمه عندما نعرف عدد المرات مسبقًا؟', o: ['تكرار ( ) مرات (repeat)', 'تكرار حتى (repeat until)', 'إلى الأبد (forever)'], a: 0 },
    { q: 'متى تتوقف لبنة «تكرار حتى»؟', o: ['عندما يصبح الشرط صحيحًا', 'عندما يصبح الشرط خطأ', 'بعد 10 مرات دائمًا'], a: 0, why: 'تتكرر طالما الشرط خطأ، وتتوقف حين يصبح صحيحًا.' },
    { q: 'ما ناتج 7 % 2 (ما تبقى من 7 / 2)؟', o: ['1', '0', '3.5', '2'], a: 0 },
    { q: 'ما ناتج 8 % 2؟', o: ['0', '1', '4', '2'], a: 0 },
    { q: 'كم مرة تُنفَّذ الطباعة؟', code: 'x = 0\nfor repeat_count in range(10):\n    x = x + 1\n    Multiplication = x * 6\n    if Multiplication < 30:\n        brain.print(Multiplication)\n        brain.new_line()', o: ['4 مرات', '10 مرات', '5 مرات', '30 مرة'], a: 0, why: 'تُطبع 6 و 12 و 18 و 24 فقط، لأنها أقل من 30.' },
  ] },

  { t: 'run', title: 'جرّبي بنفسك: الحساب والتكرار والشرط', items: [
    { h: 'مثال ٢: العمليات الحسابية', p: '٣٤٧', code: 'x = 2\nMultiplication = x * 6\nbrain.print(Multiplication)', predict: { q: 'ما الذي سيُطبع؟', o: ['12', '8', '6'], a: 0 } },
    { h: 'مثال ٣: العمليات الحسابية في تكرارات', p: '٣٤٩', code: 'x = 0\nfor repeat_count in range(10):\n    x = x + 1\n    Multiplication = x * 6\n    brain.print(Multiplication)\n    brain.new_line()', note: 'brain.new_line() تنقل المؤشر إلى الصف التالي، مثل لبنة «نقل المؤشر الصف التالي».' },
    { h: 'مثال ٤: الشرط داخل الحلقة', p: '٣٥١', code: 'x = 0\nfor repeat_count in range(10):\n    x = x + 1\n    Multiplication = x * 6\n    if Multiplication < 30:\n        brain.print(Multiplication)\n        brain.new_line()', predict: { q: 'ما آخر رقم يُطبع؟', o: ['24', '30', '60'], a: 0 } },
    { h: 'مثال ٥: العدّ بتكرار حتى', p: '٣٥٢', code: 'Counter = 0\nwhile not Counter > 5:\n    Counter = Counter + 1\n    wait(1, SECONDS)\nbrain.print(Counter)', predict: { q: 'ما قيمة Counter عند توقف التكرار؟', o: ['6', '5', '0'], a: 0 }, note: 'تتوقف الحلقة عندما يصبح العدّاد أكبر من 5، أي عند 6.' },
    { h: 'مثال ٦: رسم مربع', p: '٣٥٤', code: ART + 'Counter = 0\nTravel_distance = 400\nTurn = 90\npen.move(DOWN)\nwhile not Counter == 4:\n    drivetrain.drive_for(FORWARD, Travel_distance, MM)\n    drivetrain.turn_for(RIGHT, Turn, DEGREES)\n    Counter = Counter + 1' },
    { h: 'مثال ٧: رسم شكل ثماني بلونين', p: '٣٥٥', code: ART + 'Counter = 0\nTravel_distance = 300\nTurn = 45\npen.move(DOWN)\nwhile not Counter == 8:\n    if Counter % 2 == 0:\n        pen.set_pen_color(BLACK)\n    else:\n        pen.set_pen_color(RED)\n    drivetrain.drive_for(FORWARD, Travel_distance, MM)\n    drivetrain.turn_for(RIGHT, Turn, DEGREES)\n    Counter = Counter + 1', predict: { q: 'ما لون الضلع الأول (العدّاد = 0)؟', o: ['أسود', 'أحمر'], a: 0 } },
  ] },

  { t: 'mission', title: 'المهمة السرية: شفرة العدّاد', goal: 'خمس مهمات تعطيكِ حروف الرمز السري.',
    story: 'تعطّل روبوت المصنع وهو يرسم شكلًا ثمانيًا ملونًا! لن يعود للعمل إلا بكلمة السر. أصلحي برنامجه خطوة خطوة.',
    missions: [
      { type: 'FIND IT', ar: 'اكتشفي', q: 'أي متغير يحسب عدد مرات تنفيذ التكرار؟', o: ['Counter', 'Turn', 'Travel_distance'], a: 0, r: 'C', why: 'العدّاد Counter يبدأ من 0 ويزيد 1 في كل تكرار.' },
      { type: 'FIX IT', ar: 'صحّحي', q: 'المبرمجة نسيت سطر Counter = Counter + 1 داخل «تكرار حتى Counter = 8». ماذا يحدث؟', o: ['لا تتوقف الحلقة أبدًا', 'تتوقف بعد 8 مرات', 'لا تبدأ الحلقة'], a: 0, r: 'O', why: 'يبقى العدّاد 0 فلا يصبح الشرط صحيحًا.' },
      { type: 'MATCH IT', ar: 'طابقي', kind: 'match', q: 'طابقي اللبنة بأمر بايثون:', pairs: [['تكرار 10', 'for repeat_count in range(10):'], ['تكرار حتى Counter > 5', 'while not Counter > 5:'], ['إذا Multiplication < 30', 'if Multiplication < 30:'], ['ما تبقى من Counter / 2', 'Counter % 2']], r: 'U' },
      { type: 'BUILD IT', ar: 'ابني', kind: 'order', q: 'رتّبي برنامج رسم المربع (مثال ٦):', lines: ['Counter = 0', 'pen.move(DOWN)', 'while not Counter == 4:', '    drivetrain.drive_for(FORWARD, 400, MM)', '    drivetrain.turn_for(RIGHT, 90, DEGREES)', '    Counter = Counter + 1'], r: 'N' },
      { type: 'DECIDE IT', ar: 'قرّري', q: 'في الشكل الثماني: العدّاد = 3. ما لون القلم؟', o: ['أحمر، لأن 3 عدد فردي', 'أسود، لأن 3 عدد زوجي', 'أخضر'], a: 0, r: 'T', why: '3 % 2 = 1 فالشرط خطأ، وينفَّذ «آخر»: اللون الأحمر.' },
    ],
    code: 'COUNT',
    final: { story: 'عاد الروبوت للعمل! المطلوب الأخير: شكل سداسي (6 أضلاع).', q: 'ما قيمة Turn الصحيحة، ومتى يتوقف التكرار؟', o: ['Turn = 60 ويتوقف عند Counter = 6', 'Turn = 90 ويتوقف عند Counter = 4', 'Turn = 45 ويتوقف عند Counter = 8', 'Turn = 6 ويتوقف عند Counter = 60'], a: 0, why: '360 ÷ 6 = 60 درجة لكل انعطاف، وستة أضلاع.' } },

  { t: 'code', title: 'تحدي البرمجة: جدول ضرب 6', p: '٣٤٩ (مثال ٣)',
    task: 'اطبعي حاصل ضرب 6 في الأعداد من 1 إلى 10، كل ناتج في سطر (6 ثم 12 … حتى 60).<br>استخدمي المتغير <code>x</code> وحلقة تكرار، واطبعي بـ <code>brain.print</code> ثم <code>brain.new_line()</code>.',
    starter: 'x = 0\n',
    checks: [ { out: '^6\\n12\\n18\\n24\\n30\\n36\\n42\\n48\\n54\\n60\\s*$', msg: 'النواتج العشرة بالترتيب من 6 إلى 60' }, { py: '"for " in _lab_code or "while " in _lab_code', msg: 'استخدام حلقة تكرار' }, { py: 'x==10', msg: 'x وصلت إلى 10' } ],
    hint: 'for repeat_count in range(10):\n    x = x + 1\n    Multiplication = x * 6\n    brain.print(Multiplication)\n    brain.new_line()',
    sol: 'x = 0\nfor repeat_count in range(10):\n    x = x + 1\n    Multiplication = x * 6\n    brain.print(Multiplication)\n    brain.new_line()' },

  { t: 'code', title: 'تحدي الرسم: الشكل الثماني بلونين', p: '٣٥٥ (مثال ٧)',
    task: 'على ملعب <b>الفن قماش</b> ارسمي شكلًا ثمانيًا طول ضلعه 300 وانعطافه 45 درجة:<br>• استخدمي العدّاد <code>Counter</code> و«تكرار حتى» (<code>while not</code>)<br>• إذا كان العدّاد <b>زوجيًا</b> فاللون أسود، وإذا كان <b>فرديًا</b> فاللون أحمر',
    starter: ART + 'Counter = 0\nTravel_distance = 300\nTurn = 45\npen.move(DOWN)\n',
    checks: [ { py: `len(${VX}._lines())==8`, msg: 'ثمانية أضلاع مرسومة' }, { py: `[e[5] for e in ${VX}._lines()]==["BLACK","RED"]*4`, msg: 'الألوان بالتناوب: أسود ثم أحمر' }, { py: `${VX}._home()`, msg: 'الشكل مغلق: عاد الروبوت لنقطة البداية' }, { py: '"%" in _lab_code and Counter==8', msg: 'استخدام ما تبقى من ( % ) والعدّاد وصل 8' } ],
    hint: 'while not Counter == 8:\n    if Counter % 2 == 0:\n        pen.set_pen_color(BLACK)\n    else:\n        pen.set_pen_color(RED)\n    ...\n    Counter = Counter + 1',
    sol: ART + 'Counter = 0\nTravel_distance = 300\nTurn = 45\npen.move(DOWN)\nwhile not Counter == 8:\n    if Counter % 2 == 0:\n        pen.set_pen_color(BLACK)\n    else:\n        pen.set_pen_color(RED)\n    drivetrain.drive_for(FORWARD, Travel_distance, MM)\n    drivetrain.turn_for(RIGHT, Turn, DEGREES)\n    Counter = Counter + 1' },
  { t: 'master' },
] },

/* ==================== المحطة ٣ ==================== */
{ id: 'r3', n: 3, title: 'عارض الكود ومعاملات بايثون', pages: '٣٥٧–٣٦٣', icon: 'file',
  skills: ['أقرأ المقطع البرمجي بلغة بايثون في عارض الكود', 'أميز معاملات أوامر بايثون', 'أستخدم حلقتي for و while'],
  acts: [
  { t: 'comic', title: 'قصة: اللبنة تتكلم بايثون', goal: 'نافذة عارض الكود (Code Viewer) تترجم كل لبنة إلى بايثون.',
    panels: [
      { w: 'k', m: 'wow', s: 'ضغطتُ على أيقونة عارض الكود فظهر مشروعي نفسه مكتوبًا بلغة بايثون!' },
      { w: 'b', m: 'wink', s: 'كل مشروع فيه الدالة الرئيسة للمقطع البرمجي، والسطر الأخير يشغّل الروبوت في الملعب:', code: 'def when_started1():\n    pass\n\nvr_thread(when_started1)' },
      { w: 'k', m: 'think', s: 'وهذه لبنة «تحرك إلى الأمام 200 mm». ما الذي بين القوسين؟', code: 'drivetrain.drive_for(FORWARD, 200, MM)' },
      { w: 'b', m: 'happy', s: 'هذه المعاملات: الاتجاه، ثم المسافة، ثم الوحدة، وبينها فواصل. واسم العملية يُفصل عن معاملاتها بالنقطة (.).' },
      { w: 'k', m: 'wow', s: 'إذن لأجعل الروبوت ينعطف يمينًا 90 درجة أكتب… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['drivetrain.turn_for(RIGHT, 90, DEGREES)', 'drivetrain.drive_for(RIGHT, 90, MM)', 'turn_for.drivetrain(90)', 'drivetrain.turn_for(90 RIGHT DEGREES)'], a: 0, why: 'turn_for للانعطاف، ومعاملاتها: الاتجاه RIGHT ثم الزاوية 90 ثم الوحدة DEGREES، بينها فواصل.' } },

  { t: 'match', title: 'طابقي: لبنات فيكس كود في آر وأوامر بايثون', p: '٣٥٨', goal: 'الجدول الأساسي للأوامر الخمسة.',
    pairs: [['drivetrain.drive_for(FORWARD, 200, MM)', 'تحرك إلى الأمام 200 mm'], ['drivetrain.turn_for(RIGHT, 90, DEGREES)', 'إنعطف يمين لمدة 90 درجة'], ['drivetrain.set_drive_velocity(50, PERCENT)', 'اضبط سرعة القيادة إلى 50 %'], ['for repeat_count in range(10):', 'تكرار 10'], ['wait(1, SECONDS)', 'الانتظار 1 ثانية']], mono: 'l' },

  { t: 'run', title: 'جرّبي بنفسك: بايثون يحرّك الروبوت', items: [
    { h: 'مثال ٨: الحركة', p: '٣٥٩', code: GRID + 'def when_started1():\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n\nvr_thread(when_started1)', note: 'هكذا يظهر الكود في عارض الكود تمامًا: دالة رئيسة ثم سطر التشغيل.' },
    { h: 'مثال ٩: تكرار الحركة بحلقة for', p: '٣٦٠', code: GRID + 'def when_started1():\n    drivetrain.set_drive_velocity(80, PERCENT)\n    for repeat_count in range(9):\n        drivetrain.drive_for(FORWARD, 200, MM)\n        wait(5, MSEC)\n\nvr_thread(when_started1)', predict: { q: 'كم mm يقطع الروبوت في المجموع؟', o: ['1800', '200', '900', '80'], a: 0 }, note: 'يجب أن تكون هناك مسافة بادئة قبل العبارات المكررة.' },
    { h: 'مثال ١٠: العدّ بحلقة while', p: '٣٦٠', code: 'Counter = 0\n\ndef when_started1():\n    global Counter\n    Counter = 0\n    while not Counter > 5:\n        Counter = Counter + 1\n        wait(1, SECONDS)\n\nvr_thread(when_started1)\nbrain.print(Counter)', note: 'global Counter: يجب الإعلان عن المتغير داخل الدالة حتى تستطيع تغييره.' },
    { h: 'غيّري المعاملات وشاهدي', p: '٣٥٨', code: GRID + 'drivetrain.set_drive_velocity(100, PERCENT)\ndrivetrain.drive_for(FORWARD, 600, MM)\ndrivetrain.turn_for(RIGHT, 90, DEGREES)\ndrivetrain.drive_for(FORWARD, 400, MM)\ndrivetrain.turn_for(LEFT, 45, DEGREES)\ndrivetrain.drive_for(REVERSE, 200, MM)', note: 'جرّبي تغيير الاتجاه والمسافة والزاوية ثم شغّلي من جديد.' },
  ] },

  { t: 'prints', title: 'لغز البصمات: قضية الروبوت الواقف', goal: 'حلّي البصمات الأربع لتكشفي لماذا لم يتحرك الروبوت.',
    scene: { title: 'لوحة الأدلة', clues: ['drivetrain.drive_for(FORWARD 200 MM)', 'for repeat_count in range(9)', 'drivetrain.drive_for(FORWARD, 200, MM)', 'الروبوت لم يتحرك ⚠', 'SyntaxError', 'الفاصلة ,  النقطتان :  المسافة البادئة'] },
    prints: [
      [ { q: 'ما الذي يفصل بين المعاملات داخل القوسين؟', o: ['الفواصل ,', 'النقاط .', 'المسافات فقط'], a: 0 }, { q: 'ما الذي يفصل اسم العملية عن معاملاتها ونظامها؟', o: ['النقطة (.)', 'الفاصلة', 'علامة ='], a: 0 }, { q: 'أي معامل يحدد الوحدة في drive_for؟', o: ['MM', 'FORWARD', '200'], a: 0, mono: 1 } ],
      [ { q: 'بماذا ينتهي سطر for؟', o: ['بنقطتين :', 'بفاصلة ,', 'بلا شيء'], a: 0 }, { q: 'ما معامل النطاق الذي يحدد عدد التكرارات؟', o: ['range( )', 'repeat( )', 'count( )'], a: 0, mono: 1 }, { q: 'صح أم خطأ: العبارات المكررة تُكتب بمسافة بادئة.', o: ['صح', 'خطأ'], a: 0 } ],
      [ { q: 'متى نستخدم حلقة for؟', o: ['عند تكرار الأوامر لعدد محدد من المرات', 'عندما لا نعرف عدد التكرارات', 'للطباعة فقط'], a: 0 }, { q: 'متى نستخدم حلقة while؟', o: ['عندما لا يكون عدد التكرارات معروفًا', 'عندما نعرف العدد مسبقًا فقط', 'لرسم الدوائر'], a: 0 }, { q: 'إذا كان شرط while خطأ من البداية:', o: ['لا تُنفَّذ عبارات الحلقة إطلاقًا', 'تُنفَّذ مرة واحدة', 'تُنفَّذ إلى الأبد'], a: 0 } ],
      [ { q: 'أي سطر مكتوب بشكل صحيح؟', o: ['drivetrain.turn_for(RIGHT, 90, DEGREES)', 'drivetrain.turn_for(RIGHT 90 DEGREES)', 'drivetrain turn_for(RIGHT, 90, DEGREES)'], a: 0, mono: 1 }, { q: 'ما وحدة الانعطاف؟', o: ['DEGREES', 'MM', 'PERCENT'], a: 0, mono: 1 }, { q: 'ما الأمر الذي يضبط السرعة على 20 %؟', o: ['drivetrain.set_drive_velocity(20, PERCENT)', 'speed.drive(20)', 'drivetrain.drive_for(20, PERCENT)'], a: 0, mono: 1 } ],
    ],
    final: { q: 'لماذا لم يتحرك الروبوت في السطر الأول من لوحة الأدلة؟', code: 'drivetrain.drive_for(FORWARD 200 MM)', o: ['نُسيت الفواصل بين المعاملات', 'المسافة 200 كبيرة جدًا', 'FORWARD ليست اتجاهًا', 'يجب حذف الأقواس'], a: 0, why: 'الصحيح: drivetrain.drive_for(FORWARD, 200, MM) بفواصل بين المعاملات.' } },

  { t: 'code', title: 'تحدي البرمجة: من اللبنات إلى بايثون', p: '٣٦٠ (مثال ٩)',
    task: 'ترجمي هذه اللبنات إلى بايثون على ملعب <b>شبكة خريطة</b>:<br>🟦 اضبط سرعة القيادة إلى 80 %<br>🟧 تكرار 9<br>&nbsp;&nbsp;&nbsp;🟦 تحرك إلى الأمام 200 mm',
    starter: GRID,
    checks: [ { py: `[e[1] for e in ${VX}._log if e[0]=="vel"]==[80]`, msg: 'السرعة 80 %' }, { py: `${VX}._drives()==[200]*9`, msg: 'تسع حركات للأمام، كل حركة 200 mm' }, { py: '"for " in _lab_code and "range(9)" in _lab_code.replace(" ","")', msg: 'حلقة for مع range(9)' } ],
    hint: 'drivetrain.set_drive_velocity(80, PERCENT)\nfor repeat_count in range(9):\n    drivetrain.drive_for(FORWARD, 200, MM)',
    sol: GRID + 'drivetrain.set_drive_velocity(80, PERCENT)\nfor repeat_count in range(9):\n    drivetrain.drive_for(FORWARD, 200, MM)' },

  { t: 'code', title: 'تحدي الرسم: المثلثات الحلزونية', p: '٣٦٣ (تدريب ٤)',
    task: 'على ملعب <b>الفن قماش</b> ارسمي مثلثات حلزونية:<br>• استخدمي متغيرًا لطول الجانب (مثل <code>side</code>) ومتغيرًا للتكرار<br>• في كل مرة يرسم الروبوت جانبًا جديدًا <b>أكبر</b> من الجانب الذي قبله، ثم ينعطف 120 درجة<br>• ارسمي 9 جوانب على الأقل',
    starter: ART + 'side = 100\npen.move(DOWN)\n',
    checks: [ { py: `len(${VX}._lines())>=9`, msg: 'تسعة جوانب على الأقل' }, { py: `all(abs(a)==120 for a in ${VX}._turns()) and len(${VX}._turns())>=8`, msg: 'الانعطاف 120 درجة' }, { py: `all(b>a for a,b in zip(${VX}._drives(), ${VX}._drives()[1:]))`, msg: 'كل جانب أكبر من الجانب الذي قبله' }, { py: `${VX}._n("wall")==0`, msg: 'الروبوت لم يصطدم بالجدار' } ],
    hint: 'for repeat_count in range(9):\n    drivetrain.drive_for(FORWARD, side, MM)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)\n    side = side + 80',
    sol: ART + 'side = 100\npen.move(DOWN)\nfor repeat_count in range(9):\n    drivetrain.drive_for(FORWARD, side, MM)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)\n    side = side + 80' },
  { t: 'master' },
] },

/* ==================== المحطة ٤ ==================== */
{ id: 'r4', n: 4, title: 'البرمجة التركيبية', pages: '٣٦٤–٣٧٥', icon: 'lib',
  skills: ['أقسّم المهمة إلى وحدات برامج صغيرة', 'أنشئ عنصر برمجة جديدة (My Block) وأستخدمه', 'أحدد النمط المتكرر في المشكلة'],
  acts: [
  { t: 'comic', title: 'قصة: خطوة واحدة تكفي', goal: 'البرمجة التركيبية: تقسيم البرنامج إلى وحدات صغيرة (دوال).',
    panels: [
      { w: 'k', m: 'think', s: 'أريد رسم خط متعرج من تسع خطوات. هل أكرر اللبنات الأربع نفسها تسع مرات؟ برنامجي سيصبح طويلًا جدًا!' },
      { w: 'b', m: 'wink', s: 'في البرمجة، من المهم تحديد مشكلة الأنماط. ما النمط الذي يتكرر؟' },
      { w: 'k', m: 'happy', s: 'خطوة واحدة: أمام 200، يمين 90، أمام 200، يسار 90.' },
      { w: 'b', m: 'happy', s: 'اجمعيها في عنصر برمجة جديدة (My Block). في بايثون نعرّفه بالكلمة def، وهو ما تسميه لغات البرمجة: الدالة (Function).', code: 'def one_step_zigzag():\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(LEFT, 90, DEGREES)' },
      { w: 'k', m: 'wow', s: 'والآن أستدعيه داخل تكرار 9، فيصير المقطع الرئيس… كم سطرًا؟', code: 'for repeat_count in range(9):\n    one_step_zigzag()', blank: 1 },
    ],
    q: { q: 'ما فائدة عنصر البرمجة الجديدة (My Block)؟', o: ['أكتب تسلسل اللبنات مرة واحدة وأستخدمه كلبنة واحدة عدة مرات', 'يجعل الروبوت أسرع', 'يحذف المتغيرات', 'يغيّر لون القلم'], a: 0, why: 'بدلًا من إعادة إنشاء التسلسل نفسه عدة مرات، يُنشأ مرة واحدة ويُجمع في عنصر البرمجة الجديد.' } },

  { t: 'traffic', title: 'إشارة المرور: البرمجة التركيبية',
    show: [
      { s: 'البرمجة التركيبية تقسّم المهام التي ينفذها البرنامج إلى وحدات صغيرة.', a: 'g', fix: 'صحيحة، وتسمى وحدة برنامج (Module Program).' },
      { s: 'تسمى وحدات البرامج في لغات البرمجة الأخرى باسم الدوال (Functions).', a: 'g', fix: 'صحيحة.' },
      { s: 'فئة عناصر برمجة جديدة (My Blocks) تكون مليئة باللبنات الجاهزة عند بداية المقطع.', a: 'r', fix: 'تكون خالية في البداية، ثم تمتلئ باللبنات التي ينشئها المستخدم.' },
      { s: 'بعد إنشاء عنصر البرمجة الجديد تظهر لبنة جديدة باسم «تعريف» (Definition).', a: 'g', fix: 'صحيحة، ونضع تحتها المقطع الذي سيُنفَّذ.' },
      { s: 'يُنفَّذ المقطع الموجود تحت لبنة «تعريف» حتى لو لم نستخدم العنصر في المقطع الرئيس.', a: 'r', fix: 'التعريف وحده لا ينفّذ شيئًا؛ يجب استخدام العنصر (استدعاؤه) في المقطع الرئيس.' },
    ],
    opinion: [
      { s: 'أرى أن البرنامج المقسّم إلى عناصر برمجة أسهل في القراءة والتصحيح.' },
      { s: 'إحدى الطالبات قالت: «نسخ اللبنات ولصقها أسرع من إنشاء عنصر برمجة جديد».' },
      { s: 'من وجهة نظري، اختيار اسم واضح للعنصر مثل Petal مهم.' },
    ],
    move: [
      { s: 'عرّفتِ Petal لكن الروبوت لم يرسم شيئًا عند التشغيل. نكمل؟', a: 'r', why: 'أضيفي استدعاء Petal() في المقطع الرئيس.' },
      { s: 'وضعتِ لبنات لون القلم وعرضه داخل تعريف Petal. نكمل؟', a: 'g', why: 'هكذا تُضبط خصائص القلم مع كل بتلة.' },
      { s: 'لا تعرفين كم درجة ينعطف الروبوت بعد كل بتلة ليرسم 12 بتلة.', a: 'y', why: 'في الكتاب: 120 درجة بعد كل بتلة، وتتكرر 12 مرة.' },
    ] },

  { t: 'run', title: 'جرّبي بنفسك: عناصر البرمجة الجديدة', items: [
    { h: 'خطوة متعرجة واحدة', p: '٣٦٥', code: GRID + PEN('GREEN', 'MEDIUM') + 'drivetrain.drive_for(FORWARD, 200, MM)\ndrivetrain.turn_for(RIGHT, 90, DEGREES)\ndrivetrain.drive_for(FORWARD, 200, MM)\ndrivetrain.turn_for(LEFT, 90, DEGREES)' },
    { h: 'مثال ١: خط متعرج بعنصر one step zigzag', p: '٣٦٩', code: GRID + ZIG + '\n' + PEN('GREEN', 'MEDIUM') + 'for repeat_count in range(9):\n    one_step_zigzag()', predict: { q: 'كم مرة يُستدعى العنصر one_step_zigzag؟', o: ['9', '1', '4', '18'], a: 0 }, note: 'في بايثون لا يحتوي اسم الدالة على مسافات، فنكتب one_step_zigzag بشرطة سفلية.' },
    { h: 'مثال ٢: بتلة واحدة', p: '٣٧١', code: ART + PETAL + '\n' + PEN('RED', 'EXTRA_THIN') + 'Petal()', note: 'البتلة ستة جوانب متساوية، طول كل جانب 180 mm.' },
    { h: 'مثال ٢: زهرة من 12 بتلة', p: '٣٨٠', code: ART + PETAL + '\n' + PEN('RED', 'EXTRA_THIN') + 'for repeat_count in range(12):\n    Petal()\n    drivetrain.turn_for(RIGHT, 120, DEGREES)', predict: { q: 'كم جانبًا يرسم الروبوت في المجموع؟', o: ['72', '12', '36', '6'], a: 0 }, note: 'اضغطي «⏩ تسريع» أعلى الملعب إن أردتِ.' },
  ] },

  { t: 'tpr', title: 'استجيبي: تعريف أم استدعاء؟', goal: '👍 صحيح  •  👉 غير متأكدة  •  👎 خطأ',
    thumbs: [
      { s: 'السطر def Petal(): يعرّف عنصر البرمجة الجديد Petal.', a: 'up', why: 'def تقابل لبنة «تعريف».' },
      { s: 'السطر Petal() يستدعي العنصر، أي ينفّذ ما تحت تعريفه.', a: 'up', why: 'هذا استخدام العنصر في المقطع الرئيس.' },
      { s: 'يجب أن يأتي الاستدعاء قبل التعريف في الكود.', a: 'down', why: 'نعرّف العنصر أولًا ثم نستدعيه.' },
      { s: 'الأسطر التابعة لـ def تُكتب بمسافة بادئة.', a: 'up', why: 'المسافة البادئة تحدد ما بداخل التعريف.' },
      { s: 'لا يمكن استدعاء العنصر نفسه أكثر من مرة.', a: 'down', why: 'فائدته أن يُستخدم عدة مرات.' },
    ],
    conf: [
      { q: 'كم خطًا يرسم الروبوت؟', code: 'def line():\n    drivetrain.drive_for(FORWARD, 100, MM)\n\npen.move(DOWN)\nline()\nline()\nline()', o: ['3', '1', '0'], a: 0 },
      { q: 'كم خطًا يرسم الروبوت؟', code: 'def line():\n    drivetrain.drive_for(FORWARD, 100, MM)\n\npen.move(DOWN)', o: ['0', '1', '100'], a: 0 },
      { q: 'كم مرة ينعطف الروبوت؟', code: ZIG + '\nfor repeat_count in range(3):\n    one_step_zigzag()', o: ['6', '3', '2'], a: 0 },
    ] },

  { t: 'code', title: 'تحدي البرمجة: الخط المتعرج', p: '٣٦٩ (مثال ١)',
    task: 'على ملعب <b>شبكة خريطة</b>:<br>١. عرّفي العنصر <code>one_step_zigzag</code>: أمام 200، يمين 90، أمام 200، يسار 90<br>٢. أنزلي القلم<br>٣. استدعي العنصر 9 مرات ليصل الروبوت إلى الزاوية المقابلة',
    starter: GRID + 'def one_step_zigzag():\n    \n\npen.move(DOWN)\n',
    checks: [ { py: '"def one_step_zigzag" in _lab_code and callable(one_step_zigzag)', msg: 'تعريف العنصر one_step_zigzag' }, { py: `len(${VX}._lines())==18`, msg: 'تسع خطوات متعرجة (18 خطًا)' }, { py: `${VX}._at(900,900)`, msg: 'وصل الروبوت إلى الزاوية المقابلة' }, { py: '_lab_code.count("drive_for")<=2', msg: 'المقطع قصير: الحركة مكتوبة داخل التعريف فقط' } ],
    hint: 'def one_step_zigzag():\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    ...\n\nfor repeat_count in range(9):\n    one_step_zigzag()',
    sol: GRID + ZIG + '\npen.move(DOWN)\nfor repeat_count in range(9):\n    one_step_zigzag()' },

  { t: 'code', title: 'تحدي الرسم: زهرتي الأولى', p: '٣٨٠ (مثال ٢)',
    task: 'على ملعب <b>الفن قماش</b>: استخدمي العنصر <code>Petal</code> الجاهز لرسم <b>زهرة من 12 بتلة</b> باللون الأحمر، والروبوت ينعطف يمينًا 120 درجة بعد كل بتلة.',
    starter: ART + PETAL + '\n' + PEN('RED', 'EXTRA_THIN'),
    checks: [ { py: `len(${VX}._lines())==72`, msg: '12 بتلة (72 جانبًا)' }, { py: `${VX}._turns().count(120)==12`, msg: 'انعطاف 120 درجة بعد كل بتلة' }, { py: `${VX}._colors()=={"RED"}`, msg: 'اللون أحمر' }, { py: '_lab_code.count("Petal()")>=1 and "for " in _lab_code', msg: 'استدعاء Petal داخل تكرار' } ],
    hint: 'for repeat_count in range(12):\n    Petal()\n    drivetrain.turn_for(RIGHT, 120, DEGREES)',
    sol: ART + PETAL + '\n' + PEN('RED', 'EXTRA_THIN') + 'for repeat_count in range(12):\n    Petal()\n    drivetrain.turn_for(RIGHT, 120, DEGREES)' },
  { t: 'master' },
] },

/* ==================== المحطة ٥ ==================== */
{ id: 'r5', n: 5, title: 'عناصر البرمجة مع المعاملات', pages: '٣٧٦–٣٩٠', icon: 'brush',
  skills: ['أضيف معامل إدخال رقمي إلى عنصر البرمجة الجديد', 'أعطي قيم إدخال مختلفة للعنصر نفسه', 'أنشئ مقاطع برمجية باستخدام معامل عنصر البرمجة الجديد'],
  acts: [
  { t: 'comic', title: 'قصة: زهرة صغيرة وزهرة كبيرة', goal: 'المعاملات (Parameters): متغيرات داخل عنصر البرمجة تأخذ قيمتها عند الاستدعاء.',
    panels: [
      { w: 'k', m: 'think', s: 'بتلتي حجمها ثابت: طول جانبها 180 دائمًا. فكل زهوري بحجم واحد!' },
      { w: 'b', m: 'wink', s: 'أضيفي للعنصر معامل إدخال رقمي (numeric input parameter)، واكتبي اسمه مكان الرقم الثابت 180.', code: 'def Petal(Petal_side_length):\n    drivetrain.drive_for(FORWARD, Petal_side_length, MM)' },
      { w: 'k', m: 'happy', s: 'وعند الاستدعاء أعطيه رقم الإدخال الذي أريد:', code: 'Petal(100)\nPetal(270)' },
      { w: 'b', m: 'happy', s: 'هكذا يتأقلم العنصر نفسه مع أكثر من مشكلة: زهور، وأوراق، وحتى فراشات بأحجام مختلفة.' },
      { w: 'k', m: 'wow', s: 'ولو عندي عنصر square له المعامل side، فالاستدعاء square(600) يرسم مربعًا طول جانبه… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['600', '200', '4', '180'], a: 0, why: 'قيمة الإدخال 600 توضع في المعامل side، فيرسم الروبوت كل جانب بطول 600.' } },

  { t: 'quiz', title: 'اختاري: المعاملات', p: '٣٧٦–٣٨٧', items: [
    { q: 'ما المعامل (Parameter) في عنصر البرمجة الجديد؟', o: ['متغير داخل وحدة البرنامج يأخذ قيمة إدخال', 'لون القلم', 'عدد التكرارات فقط', 'اسم الملعب'], a: 0 },
    { q: 'ما اسم المعامل هنا؟', code: 'def Petal(Petal_side_length):', o: ['Petal_side_length', 'Petal', 'def'], a: 0, mono: 1 },
    { q: 'ما رقم الإدخال هنا؟', code: 'Petal(270)', o: ['270', 'Petal', 'لا يوجد'], a: 0 },
    { q: 'كم مربعًا يرسم الروبوت، وما أطوال جوانبها؟', code: 'square(200)\nsquare(300)\nsquare(600)', o: ['3 مربعات: 200 و 300 و 600', 'مربع واحد طوله 1100', '3 مربعات كلها 200'], a: 0 },
    { q: 'القيمة الافتراضية للمعامل الرقمي في لبنة العنصر داخل الفئة تساوي:', o: ['1', '0', '180', '100'], a: 0, why: 'ص٣٨٤: يظهر العنصر في فئة عناصر برمجة جديدة بمعامل رقمي قيمته الافتراضية 1.' },
    { q: 'هل يمكن إنشاء أكثر من مدخل رقمي لعنصر البرمجة الجديد؟', o: ['نعم، حسب الحاجة', 'لا، مدخل واحد فقط'], a: 0, why: 'معلومة ص٣٨٣، مثل shape(side length, angle).' },
    { q: 'أي تعريف يطابق الاستدعاء shape(100, 90)؟', o: ['def shape(side_length, angle):', 'def shape():', 'def shape(side_length):'], a: 0, mono: 1 },
  ] },

  { t: 'run', title: 'جرّبي بنفسك: المعاملات', items: [
    { h: 'مربعات بأحجام مختلفة', p: '٣٧٦', code: ART + 'def square(side):\n    for repeat_count in range(4):\n        drivetrain.drive_for(FORWARD, side, MM)\n        drivetrain.turn_for(RIGHT, 90, DEGREES)\n\n' + PEN('GREEN', 'MEDIUM') + 'square(200)\nsquare(300)\nsquare(600)', predict: { q: 'كم مربعًا سيرسم الروبوت؟', o: ['3', '1', '4'], a: 0 } },
    { h: 'زهرة صغيرة: رقم الإدخال 100', p: '٣٨٤', code: ART + PETALP + '\n' + PEN('RED', 'EXTRA_THIN') + 'for repeat_count in range(12):\n    Petal(100)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)' },
    { h: 'زهرتان متداخلتان: 100 و 270', p: '٣٨٦', code: ART + PETALP + '\n' + PEN('RED', 'EXTRA_THIN') + 'for repeat_count in range(12):\n    Petal(100)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)\nfor repeat_count in range(12):\n    Petal(270)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)', predict: { q: 'أي زهرة تُرسم أولًا؟', o: ['الصغيرة (100)', 'الكبيرة (270)'], a: 0 } },
    { h: 'زهرتان في مكانين مختلفين: 100 و 200', p: '٣٨٧', code: ART + PETALP + '\npen.set_pen_color(RED)\npen.set_pen_width(EXTRA_THIN)\ndrivetrain.turn_for(RIGHT, 90, DEGREES)\ndrivetrain.drive_for(FORWARD, 650, MM)\npen.move(DOWN)\nfor repeat_count in range(12):\n    Petal(100)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)\npen.move(UP)\ndrivetrain.drive_for(REVERSE, 1000, MM)\npen.move(DOWN)\nfor repeat_count in range(12):\n    Petal(200)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)', note: 'يرفع الروبوت القلم لينتقل دون رسم إلى موضع بداية الزهرة الثانية.' },
  ] },

  { t: 'mission', title: 'المهمة السرية: بستان الأرقام', goal: 'أربع مهمات تعطيكِ حروف الرمز السري.',
    story: 'بستاني المدينة يريد زهورًا بأحجام مختلفة من برنامج واحد قصير. ساعديه بالمعاملات!',
    missions: [
      { type: 'FIND IT', ar: 'اكتشفي', q: 'في def Petal(Petal_side_length): أين نضع المعامل داخل التعريف؟', o: ['مكان الرقم الثابت 180 في لبنتي «تحرك»', 'مكان الزاوية 30', 'مكان عدد التكرار 3'], a: 0, r: 'S', why: 'طول الجانب استُخدم مرتين، فنضع المعامل في الموضعين.' },
      { type: 'FIX IT', ar: 'صحّحي', q: 'كتبت طالبة Petal() دون رقم مع أن التعريف def Petal(Petal_side_length):. ماذا يحدث؟', o: ['خطأ: العنصر يحتاج رقم إدخال', 'يرسم بتلة حجمها 180', 'يرسم بتلة حجمها 0'], a: 0, r: 'I', why: 'للعنصر معامل، فيجب إعطاؤه قيمة عند كل استدعاء.' },
      { type: 'MATCH IT', ar: 'طابقي', kind: 'match', q: 'تدريب ١ ص٣٨٨: صِلي الاستدعاء بتعريفه:', pairs: [['shape()', 'def shape():'], ['shape(10)', 'def shape(side_length):'], ['shape(100, 90)', 'def shape(side_length, angle):']], r: 'Z' },
      { type: 'DECIDE IT', ar: 'قرّري', q: 'تريدين زهرة أكبر من زهرة Petal(100). ماذا تكتبين؟', o: ['Petal(200)', 'Petal(50)', 'Petal(100) مرتين'], a: 0, r: 'E', why: 'كلما كبر رقم الإدخال كبر طول جوانب البتلة.' },
    ],
    code: 'SIZE',
    final: { story: 'أزهر البستان! بقي سؤال البستاني الأخير.', q: 'ما الذي يجعل العنصر Petal صالحًا لرسم الزهور والأوراق معًا؟', o: ['معامل الإدخال: نغيّر الحجم دون تغيير التعريف', 'لون القلم الأحمر', 'عدد البتلات 12', 'ملعب الفن قماش'], a: 0, why: 'ص٣٧٧: يمكن استخدام Petal مع معامل إدخال لإنشاء أحجام مختلفة من الزهور أو الأوراق أو حتى الفراشات.' } },

  { t: 'code', title: 'تحدي البرمجة: ثلاثة مربعات', p: '٣٧٦',
    task: 'على ملعب <b>الفن قماش</b>:<br>١. عرّفي العنصر <code>square</code> بمعامل إدخال رقمي <code>side</code> يرسم مربعًا<br>٢. استدعيه ثلاث مرات بقيم الإدخال: 200 ثم 300 ثم 600',
    starter: ART + 'def square(side):\n    \n\npen.move(DOWN)\n',
    checks: [ { py: '__import__("re").search(r"def\\s+square\\s*\\(\\s*\\w+\\s*\\)", _lab_code) is not None', msg: 'تعريف square بمعامل واحد' }, { py: `len(${VX}._lines())==12`, msg: 'ثلاثة مربعات (12 جانبًا)' }, { py: `[round(d) for d in ${VX}._drives()]==[200]*4+[300]*4+[600]*4`, msg: 'الأطوال 200 ثم 300 ثم 600' }, { py: `${VX}._home()`, msg: 'كل مربع مغلق' } ],
    hint: 'def square(side):\n    for repeat_count in range(4):\n        drivetrain.drive_for(FORWARD, side, MM)\n        drivetrain.turn_for(RIGHT, 90, DEGREES)\n\nsquare(200)',
    sol: ART + 'def square(side):\n    for repeat_count in range(4):\n        drivetrain.drive_for(FORWARD, side, MM)\n        drivetrain.turn_for(RIGHT, 90, DEGREES)\n\npen.move(DOWN)\nsquare(200)\nsquare(300)\nsquare(600)' },

  { t: 'code', title: 'تحدي الرسم: زهرتان متداخلتان', p: '٣٨٦',
    task: 'على ملعب <b>الفن قماش</b>: أضيفي المعامل <code>Petal_side_length</code> إلى العنصر <code>Petal</code>، ثم ارسمي زهرة صغيرة (رقم الإدخال 100) وزهرة كبيرة (رقم الإدخال 270) متداخلتين، كل زهرة 12 بتلة.',
    starter: ART + PETAL + '\n' + PEN('RED', 'EXTRA_THIN'),
    checks: [ { py: '__import__("re").search(r"def\\s+Petal\\s*\\(\\s*\\w+\\s*\\)", _lab_code) is not None', msg: 'تعريف Petal بمعامل إدخال' }, { py: `len(${VX}._lines())==144`, msg: 'زهرتان (144 جانبًا)' }, { py: `set(round(abs(d)) for d in ${VX}._drives())=={100,270}`, msg: 'طولا الجانب 100 و 270' }, { py: '"180" not in _lab_code', msg: 'لا يوجد الرقم الثابت 180 في الكود' } ],
    hint: 'def Petal(Petal_side_length):\n    ... drivetrain.drive_for(FORWARD, Petal_side_length, MM) ...\n\nfor repeat_count in range(12):\n    Petal(100)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)',
    sol: ART + PETALP + '\n' + PEN('RED', 'EXTRA_THIN') + 'for repeat_count in range(12):\n    Petal(100)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)\nfor repeat_count in range(12):\n    Petal(270)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)' },
  { t: 'master' },
] },

/* ==================== مشروع الوحدة ==================== */
{ id: 'rp', n: 6, title: 'مشروع الوحدة: حديقة الزهور', pages: '٣٩١–٣٩٢', icon: 'trophy', project: 1,
  skills: ['أصمم مقطعًا برمجيًا بتقنيات البرمجة التركيبية', 'أجمع المتغيرات والشرط والتكرار ومعاملات العناصر في مشروع واحد'],
  acts: [
  { t: 'comic', title: 'قصة: حديقة كودة', goal: 'ستبرمجين حديقة زهور من ثلاث زهرات.',
    panels: [
      { w: 'k', m: 'happy', s: 'مشروعنا: حديقة فيها ثلاث زهرات، لكل زهرة جذع أخضر وورقتان!' },
      { w: 'b', m: 'wink', s: 'نبدأ بعنصر Petal له المعامل Petal side length: تسع حركات قصيرة مع انعطاف 10 درجات ترسم قوسًا، وقوسان يصنعان بتلة.' },
      { w: 'k', m: 'think', s: 'الزهرة 8 بتلات، وبعد كل بتلة ينعطف الروبوت 135 درجة. ورقم الإدخال للبتلة 35 وللورقة 45.' },
      { w: 'b', m: 'happy', s: 'وفي المقطع الرئيس عدّاد Counter: إذا كان رقم التكرار فرديًا فالزهرة حمراء، وإذا كان زوجيًا فهي زرقاء.' },
    ] },
  { t: 'mission', title: 'خطة المشروع', goal: 'خططي قبل الكود.', story: 'اقرئي خطوات المشروع في الكتاب ص٣٩١–٣٩٢ ثم أجيبي.',
    missions: [
      { type: 'FIND IT', ar: 'المعامل', q: 'ما الذي تحدده قيمة Petal side length؟', o: ['حجم البتلات، وبالتالي حجم الزهور', 'لون الزهرة', 'عدد الزهور'], a: 0, r: 'R' },
      { type: 'BUILD IT', ar: 'الترتيب', kind: 'order', q: 'رتّبي خطوات بناء المشروع:', lines: ['إنشاء عنصر Petal بمعامل Petal side length', 'إنشاء عنصر الزهرة: 8 بتلات وانعطاف 135', 'إنشاء عنصر الزهرة الكاملة مع الجذع والأوراق', 'المقطع الرئيس: تكرار 3 مرات مع المتغير Counter'], r: 'O' },
      { type: 'DECIDE IT', ar: 'اللون', q: 'Counter = 2 (الزهرة الثانية). ما لونها؟', o: ['أزرق، لأن رقم التكرار زوجي', 'أحمر، لأن رقم التكرار فردي', 'أخضر'], a: 0, r: 'S' },
      { type: 'DECIDE IT', ar: 'الحساب', q: 'ينعطف الروبوت 135 درجة بعد كل بتلة من البتلات الثماني. كم درجة مجموع الانعطافات؟', o: ['1080', '360', '135', '800'], a: 0, r: 'E', why: '8 × 135 = 1080 درجة، أي ثلاث دورات كاملة.' },
    ],
    code: 'ROSE',
    final: { q: 'كم يتحرك الروبوت للأمام لينتقل إلى موضع الزهرة التالية؟', o: ['550 mm', '135 mm', '35 mm', '90 mm'], a: 0, why: 'ص٣٩٢: يتحرك للأمام 550 ملميتر بين الزهرات.' } },
  { t: 'code', title: 'المشروع: حديقة الزهور', p: '٣٩١', project: 1,
    task: 'برمجي حديقة من <b>ثلاث زهرات</b> على ملعب <b>الفن قماش</b>:<br>• عنصر <code>Petal</code> بمعامل <code>Petal_side_length</code> (جاهز أمامك)<br>• عنصر للزهرة: 8 بتلات برقم الإدخال 35، وانعطاف 135 بعد كل بتلة<br>• جذع أخضر وورقتان (رقم الإدخال 45)<br>• عدّاد <code>Counter</code>: الزهرة حمراء إذا كان رقم التكرار فرديًا، وزرقاء إذا كان زوجيًا<br>• المسافة بين الزهرات 550 mm',
    starter: ART + 'def Petal(Petal_side_length):\n    for repeat_count in range(9):\n        drivetrain.drive_for(FORWARD, Petal_side_length, MM)\n        drivetrain.turn_for(RIGHT, 10, DEGREES)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    for repeat_count in range(9):\n        drivetrain.drive_for(FORWARD, Petal_side_length, MM)\n        drivetrain.turn_for(RIGHT, 10, DEGREES)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n\ndef Flower():\n    for repeat_count in range(8):\n        Petal(35)\n        drivetrain.turn_for(RIGHT, 135, DEGREES)\n\npen.set_pen_width(THIN)\nCounter = 1\n',
    checks: [ { py: `sum(1 for e in ${VX}._lines() if e[5] in ("RED","BLUE"))>=3*8*18`, msg: 'ثلاث زهرات، كل زهرة 8 بتلات' }, { py: `[c for c in dict.fromkeys(e[5] for e in ${VX}._lines()) if c!="GREEN"]==["RED","BLUE"]`, msg: 'الألوان: أحمر للفردي ثم أزرق للزوجي' }, { py: `"GREEN" in ${VX}._colors()`, msg: 'الجذع والأوراق باللون الأخضر' }, { py: '"%" in _lab_code and "Counter" in _lab_code', msg: 'استخدام العدّاد Counter مع ما تبقى من ( % )' } ],
    hint: 'def Full_flower():\n    pen.move(DOWN)\n    Flower()\n    pen.set_pen_color(GREEN)\n    drivetrain.drive_for(REVERSE, 500, MM)\n    Petal(45) ...\n\nfor repeat_count in range(3):\n    if Counter % 2 == 0:\n        pen.set_pen_color(BLUE)\n    else:\n        pen.set_pen_color(RED)\n    Full_flower()\n    Counter = Counter + 1',
    sol: ART + 'def Petal(Petal_side_length):\n    for repeat_count in range(9):\n        drivetrain.drive_for(FORWARD, Petal_side_length, MM)\n        drivetrain.turn_for(RIGHT, 10, DEGREES)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    for repeat_count in range(9):\n        drivetrain.drive_for(FORWARD, Petal_side_length, MM)\n        drivetrain.turn_for(RIGHT, 10, DEGREES)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n\ndef Flower():\n    for repeat_count in range(8):\n        Petal(35)\n        drivetrain.turn_for(RIGHT, 135, DEGREES)\n\ndef Full_flower():\n    pen.move(DOWN)\n    Flower()\n    pen.set_pen_color(GREEN)\n    drivetrain.drive_for(REVERSE, 550, MM)\n    drivetrain.turn_for(RIGHT, 20, DEGREES)\n    Petal(45)\n    drivetrain.turn_for(LEFT, 110, DEGREES)\n    Petal(45)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    pen.move(UP)\n    drivetrain.drive_for(FORWARD, 550, MM)\n\npen.set_pen_width(THIN)\nCounter = 1\ndrivetrain.turn_for(LEFT, 90, DEGREES)\ndrivetrain.drive_for(FORWARD, 550, MM)\ndrivetrain.turn_for(RIGHT, 90, DEGREES)\ndrivetrain.drive_for(FORWARD, 250, MM)\nfor repeat_count in range(3):\n    if Counter % 2 == 0:\n        pen.set_pen_color(BLUE)\n    else:\n        pen.set_pen_color(RED)\n    Full_flower()\n    if Counter < 3:\n        drivetrain.turn_for(RIGHT, 90, DEGREES)\n        drivetrain.drive_for(FORWARD, 550, MM)\n        drivetrain.turn_for(LEFT, 90, DEGREES)\n    Counter = Counter + 1' },
  { t: 'master' },
] },

/* ==================== اختبار الوحدة ==================== */
{ id: 're', n: 7, title: 'اختبار الوحدة: برمجة الروبوت', pages: '٣٣٦–٣٩٣', icon: 'book', exam: 1,
  skills: ['أراجع مهارات الوحدة الست في جدول المهارات ص٣٩٣'],
  acts: [
  { t: 'quiz', title: 'اختبار: المتغيرات والحساب', items: [
    { q: 'المتغير هو:', o: ['اسم مستعار لشيء يتذكره الحاسب، يحفظ بيانات', 'لبنة لتحريك الروبوت', 'ملعب افتراضي', 'نوع من التكرار'], a: 0 },
    { q: 'أي اسم متغير صحيح؟', o: ['Travel_distance', 'Travel distance', '4Travel', 'Travel!'], a: 0, mono: 1 },
    { q: 'ما قيمة Counter في النهاية؟', code: 'Counter = 0\nfor repeat_count in range(4):\n    Counter = Counter + 1', o: ['4', '0', '1', '5'], a: 0 },
    { q: 'ما الذي يُطبع؟', code: 'x = 5\nMultiplication = x * 6\nbrain.print(Multiplication)', o: ['30', '11', '56', '6'], a: 0 },
    { q: 'ما ناتج 9 % 2؟', o: ['1', '0', '4', '4.5'], a: 0 },
    { q: 'المصطلح Remainder يعني:', o: ['المتبقي', 'المعاملات', 'عرض متغير', 'رقمي'], a: 0 },
  ] },
  { t: 'quiz', title: 'اختبار: التكرار والشرط وبايثون', items: [
    { q: 'أي سطر يحرك الروبوت للخلف 300 mm؟', o: ['drivetrain.drive_for(REVERSE, 300, MM)', 'drivetrain.drive_for(FORWARD, 300, MM)', 'drivetrain.turn_for(LEFT, 300, DEGREES)', 'drivetrain.drive_back(300)'], a: 0, mono: 1 },
    { q: 'اللبنة «تكرار 20» تقابل في بايثون:', o: ['for repeat_count in range(20):', 'while 20:', 'repeat(20)', 'if range(20):'], a: 0, mono: 1 },
    { q: 'كم مرة يتحرك الروبوت؟', code: 'Counter = 0\nwhile not Counter == 3:\n    drivetrain.drive_for(FORWARD, 100, MM)\n    Counter = Counter + 1', o: ['3', '4', '0', 'إلى الأبد'], a: 0 },
    { q: 'ما لون القلم عندما Counter = 6؟', code: 'if Counter % 2 == 0:\n    pen.set_pen_color(BLACK)\nelse:\n    pen.set_pen_color(RED)', o: ['أسود', 'أحمر'], a: 0 },
    { q: 'نافذة عارض الكود (Code Viewer) تعرض:', o: ['المقطع المكوّن من لبنات بلغة بايثون', 'قيم المتغيرات فقط', 'مقاطع الفيديو التعليمية', 'الملعب'], a: 0 },
    { q: 'لماذا نكتب global Counter داخل الدالة when_started1؟', o: ['للإعلان عن المتغير داخل الدالة', 'لحذف المتغير', 'لطباعة المتغير', 'لتكرار المتغير'], a: 0 },
  ] },
  { t: 'quiz', title: 'اختبار: البرمجة التركيبية', items: [
    { q: 'البرمجة التركيبية (Modular Programming) هي:', o: ['تقسيم مهام البرنامج إلى وحدات صغيرة', 'كتابة البرنامج كله في مقطع واحد طويل', 'حذف التكرارات', 'تغيير لون اللبنات'], a: 0 },
    { q: 'كم خطًا يرسم الروبوت؟', code: 'def step():\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n\npen.move(DOWN)\nfor repeat_count in range(4):\n    step()', o: ['4', '1', '8', '0'], a: 0 },
    { q: 'ما الشكل الذي يرسمه المقطع السابق؟', o: ['مربع', 'مثلث', 'خط متعرج', 'زهرة'], a: 0 },
    { q: 'في Petal(100) العدد 100 هو:', o: ['رقم الإدخال للمعامل', 'عدد البتلات', 'زاوية الانعطاف', 'سرعة الروبوت'], a: 0 },
    { q: 'أي لبنة تُظهر قيمة المتغير لاستخدامها داخل لبنة أخرى؟', o: ['لبنة عرض المتغير (Reporter)', 'لبنة تكرار', 'لبنة تعريف', 'لبنة الانتظار'], a: 0 },
    { q: 'ما الملعب المناسب لرسم الزهور؟', o: ['الفن قماش (Art Canvas)', 'جدار المتاهة (Wall Maze)', 'لا يوجد ملعب للرسم'], a: 0 },
  ] },
  { t: 'code', title: 'السؤال العملي: درج الروبوت', p: '٣٨٩ (تدريب ٣)',
    task: 'على ملعب <b>شبكة خريطة</b>: أنشئي عنصر برمجة جديدًا بمعامل لطول الجانب يرسم <b>مربعًا</b>، ثم استخدميه لرسم سلسلة من <b>9 مربعات</b> على القطر المائل، طول كل جانب 200 mm.',
    starter: GRID + 'def square(side):\n    \n\npen.set_pen_color(GREEN)\npen.set_pen_width(MEDIUM)\npen.move(DOWN)\n',
    checks: [ { py: '__import__("re").search(r"def\\s+\\w+\\s*\\(\\s*\\w+\\s*\\)", _lab_code) is not None', msg: 'عنصر برمجة جديد بمعامل' }, { py: `len(${VX}._lines())>=36`, msg: 'تسعة مربعات (36 جانبًا على الأقل)' }, { py: `${VX}._span()==(1800,1800)`, msg: 'السلسلة تمتد على القطر كله' }, { py: `${VX}._n("wall")==0`, msg: 'الروبوت لم يصطدم بالجدار' } ],
    hint: 'def square(side):\n    for repeat_count in range(4):\n        drivetrain.drive_for(FORWARD, side, MM)\n        drivetrain.turn_for(RIGHT, 90, DEGREES)\n\nfor repeat_count in range(9):\n    square(200)\n    # انتقلي إلى زاوية المربع التالي',
    sol: GRID + 'def square(side):\n    for repeat_count in range(4):\n        drivetrain.drive_for(FORWARD, side, MM)\n        drivetrain.turn_for(RIGHT, 90, DEGREES)\n\npen.set_pen_color(GREEN)\npen.set_pen_width(MEDIUM)\npen.move(DOWN)\nfor repeat_count in range(9):\n    square(200)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(LEFT, 90, DEGREES)' },
  { t: 'master' },
] },
];

/* ==================== المحطة الإضافية: حكاية الروبوت والذاكرة ==================== */
const STORY2 = { id: 'rs', n: 0, title: 'حكاية الروبوت ومدينة الذاكرة', pages: '٣٣٩–٣٨٧', icon: 'star', extra: 1, short: 'الحكاية', badge: '🤖',
  skills: ['أتخيل كيف يحفظ المعالج المتغيرات في الذاكرة', 'أتتبع العدّاد والشرط والمعامل سطرًا سطرًا'],
  acts: [
  { t: 'comic', title: 'المقدمة: عقل الروبوت', goal: 'تتعرفين على «برق» المعالج الذي يسكن داخل الروبوت.',
    panels: [
      { w: 'k', m: 'happy', s: 'داخل روبوت الواقع الافتراضي عقل صغير لا ينام، فيه «مدينة الذاكرة».' },
      { w: 'q', m: 'happy', s: 'وأنا «برق» ⚡ المعالج! أقرأ الكود سطرًا سطرًا من الأعلى للأسفل، وأنفّذ ما يُكتب لي بالضبط.' },
      { w: 'b', m: 'wink', s: 'في المدينة صناديق، على كل صندوق ملصق باسمه: هذه هي المتغيرات، مثل speed و Counter.' },
      { w: 'q', m: 'wow', s: 'وعندي حارس بوابة يسألني عن الشرط: صحيح أم خطأ؟ وعلى جوابي يتحدد الطريق!', fx: 'ززززت!' },
      { w: 'k', m: 'think', s: 'في كل فصل تصيرين أنتِ المعالج: تنفّذين السطر التالي وتجيبين عن سؤال برق. مستعدة؟' },
    ],
    q: { q: 'ماذا يفعل المعالج «برق» بالكود؟', o: ['يقرأه سطرًا سطرًا من الأعلى للأسفل', 'ينفّذ كل الأسطر معًا', 'يبدأ من آخر سطر', 'يتخطى ما لا يعجبه'], a: 0 } },

  { t: 'robopad', title: 'ورشة الروبوت: من اللبنات إلى بايثون', goal: 'كل زر لبنة. اضغطيها فيتحرك الروبوت ويظهر أمر بايثون في عارض الكود. أنجزي المهمات السبع!' },

  { t: 'story', title: 'الفصل ١: صندوق السرعة (المتغيرات)', goal: 'المتغير = صندوق في الذاكرة عليه ملصق باسمه، وفيه قيمة واحدة فقط.',
    scene: '📦 حي الصناديق · كل صندوق عليه ملصق باسم',
    intro: 'وصل برق إلى حي الصناديق. اضغطي «ابدئي الحكاية» ونفّذي معه سطرًا سطرًا.',
    code: ['speed = 10', 'speed = speed + 20', 'speed = speed + 20', 'brain.print(speed)'],
    steps: [
      { ln: 0, say: 'يأخذ برق صندوقًا فارغًا، يضع فيه 10، ويلصق عليه speed. هذه لبنة «مجموعة speed إلى 10».', mem: { vars: [['speed', 10]], hi: ['var', 'speed'] } },
      { ln: 1, ask: { q: 'speed = speed + 20 : يبدأ برق بالطرف الأيمن. من أي صندوق يقرأ؟', t: ['var', 'speed'], hint: 'يقرأ القيمة الحالية من الصندوق speed.' }, say: 'يقرأ 10 من الصندوق، يجمع 10 + 20 = 30، ثم يرمي القيمة القديمة ويضع 30 مكانها. الصندوق لا يتسع إلا لقيمة واحدة!', mem: { vars: [['speed', 30]], hi: ['var', 'speed'] } },
      { ln: 2, ask: { q: 'ينفّذ برق السطر نفسه مرة أخرى. كم تصبح قيمة speed؟', o: ['50', '30', '40'], a: 0 }, say: '30 + 20 = 50. هذه لبنة «تغيير speed من قبل 20» للمرة الثانية.', mem: { vars: [['speed', 50]], hi: ['var', 'speed'] } },
      { ln: 3, say: 'brain.print تقرأ ما في الصندوق وتكتبه في وحدة تحكم العرض.', mem: { vars: [['speed', 50]], out: ['50'] } },
    ],
    moral: 'المتغير صندوق باسم، يحمل قيمة واحدة فقط في كل مرة. والسطر speed = speed + 20 يعني: اقرأ القديمة، اجمع، ثم ضع الجديدة مكانها.',
    quiz: { q: 'ما قيمة speed بعد تنفيذ السطرين؟\nspeed = 100\nspeed = speed + -40', o: ['60', '140', '-40', '100'], a: 0 } },

  { t: 'story', title: 'الفصل ٢: العدّاد وحلقة «تكرار حتى»', goal: 'while not: تتكرر الحلقة طالما الشرط خطأ، وتتوقف حين يصبح صحيحًا.',
    scene: '🔁 ساحة الدوران · برق يدور حتى يصبح الشرط صحيحًا',
    intro: 'في ساحة الدوران يدور برق مع العدّاد Counter. نفّذي معه.',
    code: ['Counter = 0', 'while not Counter > 2:', '    Counter = Counter + 1', 'brain.print(Counter)'],
    steps: [
      { ln: 0, say: 'صندوق جديد اسمه Counter وفيه 0. هذا هو العدّاد.', mem: { vars: [['Counter', 0]], hi: ['var', 'Counter'] } },
      { ln: 1, ask: { q: 'يسأل الحارس: هل Counter > 2؟ والعدّاد الآن 0.', o: ['صحيح', 'خطأ'], a: 1 }, say: 'الشرط خطأ، إذن يدخل برق الحلقة (تكرار حتى: نكرر طالما الشرط خطأ).', mem: { vars: [['Counter', 0]], gate: { q: 'Counter > 2', res: false } } },
      { ln: 2, say: 'يزيد العدّاد 1 فيصبح 1، ثم يعود برق إلى سطر الشرط.', mem: { vars: [['Counter', 1]], hi: ['var', 'Counter'] } },
      { ln: 1, say: 'هل 1 > 2؟ خطأ. يدخل الحلقة مرة ثانية.', mem: { vars: [['Counter', 1]], gate: { q: 'Counter > 2', res: false } } },
      { ln: 2, say: 'العدّاد يصبح 2.', mem: { vars: [['Counter', 2]], hi: ['var', 'Counter'] } },
      { ln: 1, ask: { q: 'العدّاد الآن 2. هل Counter > 2؟', o: ['صحيح', 'خطأ'], a: 1 }, say: '2 ليست أكبر من 2، فالشرط خطأ، ويدخل الحلقة مرة ثالثة.', mem: { vars: [['Counter', 2]], gate: { q: 'Counter > 2', res: false } } },
      { ln: 2, say: 'العدّاد يصبح 3.', mem: { vars: [['Counter', 3]], hi: ['var', 'Counter'] } },
      { ln: 1, ask: { q: 'العدّاد الآن 3. هل Counter > 2؟', o: ['صحيح', 'خطأ'], a: 0 }, say: 'أصبح الشرط صحيحًا! يتوقف التكرار ويخرج برق من الحلقة.', mem: { vars: [['Counter', 3]], gate: { q: 'Counter > 2', res: true } } },
      { ln: 3, say: 'السطر غير مُزاح فهو خارج الحلقة. يطبع برق قيمة العدّاد.', mem: { vars: [['Counter', 3]], out: ['3'] } },
    ],
    moral: 'حلقة «تكرار حتى» تفحص الشرط قبل كل دورة: إن كان خطأ كرّرت، وإن صار صحيحًا توقفت. ولا بد أن يتغير العدّاد داخلها وإلا دارت إلى الأبد.',
    quiz: { q: 'كم مرة تُنفَّذ الحلقة؟\nCounter = 0\nwhile not Counter == 4:\n    Counter = Counter + 1', o: ['4', '3', '5', '0'], a: 0 } },

  { t: 'story', title: 'الفصل ٣: بوابة الزوجي والفردي (الشرط)', goal: 'ما تبقى من القسمة على 2 يحدد: زوجي (0) أم فردي (1).',
    scene: '💂 بوابة الحارس · طريقان: if و else',
    intro: 'وصل برق إلى بوابة لها طريقان. الحارس يسأل عن باقي القسمة.',
    code: ['Counter = 3', 'if Counter % 2 == 0:', '    pen.set_pen_color(BLACK)', 'else:', '    pen.set_pen_color(RED)', 'Counter = Counter + 1'],
    steps: [
      { ln: 0, say: 'العدّاد الآن 3.', mem: { vars: [['Counter', 3]], hi: ['var', 'Counter'] } },
      { ln: 1, ask: { q: 'يحسب برق ما تبقى من 3 / 2. كم الباقي؟', o: ['1', '0', '1.5'], a: 0 }, say: 'الباقي 1، فهل 1 == 0؟ خطأ. يغلق الحارس طريق if ويفتح طريق else.', mem: { vars: [['Counter', 3]], gate: { q: 'Counter % 2 == 0', res: false } } },
      { ln: 4, say: 'يقفز برق فوق السطر 3 ولا ينفّذه، وينفّذ السطر الذي تحت else: لون القلم أحمر، لأن 3 عدد فردي.', mem: { vars: [['Counter', 3]], gate: { q: 'Counter % 2 == 0', res: false }, out: ['🖊 القلم: RED'] } },
      { ln: 5, say: 'هذا السطر غير مُزاح، فينفّذه برق مهما كان جواب الحارس. العدّاد يصبح 4، وفي الدورة القادمة يكون زوجيًا فيصير القلم أسود.', mem: { vars: [['Counter', 4]], hi: ['var', 'Counter'], out: ['🖊 القلم: RED'] } },
    ],
    moral: 'عند قسمة عدد فردي على 2 يكون الباقي دائمًا 1، والعدد الزوجي لا باقي له. بهذا يلوّن الروبوت أضلاع الشكل الثماني بالتناوب.',
    quiz: { q: 'ما لون القلم عندما Counter = 8؟ (الشرط: Counter % 2 == 0 ← BLACK وإلا RED)', o: ['BLACK', 'RED'], a: 0 } },

  { t: 'story', title: 'الفصل ٤: صندوق المعامل (عناصر البرمجة)', goal: 'المعامل صندوق مؤقت يُملأ برقم الإدخال عند كل استدعاء.',
    scene: '🧩 ورشة العناصر · التعريف وصفة، والاستدعاء تنفيذ',
    intro: 'في الورشة وصفة اسمها square. شاهدي متى ينفّذها برق.',
    code: ['def square(side):', '    drivetrain.drive_for(FORWARD, side, MM)', 'square(200)', 'square(600)'],
    steps: [
      { ln: 0, say: 'يحفظ برق الوصفة square في دفتره فقط. لا يتحرك الروبوت الآن! التعريف ليس تنفيذًا.', mem: { vars: [], out: ['📒 حُفظت الوصفة square'] } },
      { ln: 2, ask: { q: 'square(200): ماذا يضع برق في صندوق المعامل side؟', o: ['200', '600', '0'], a: 0 }, say: 'استدعاء! ينشئ برق صندوقًا مؤقتًا اسمه side ويضع فيه رقم الإدخال 200، ثم يقفز إلى داخل الوصفة.', mem: { vars: [['side', 200]], hi: ['var', 'side'], out: ['📒 حُفظت الوصفة square'] } },
      { ln: 1, say: 'يقرأ 200 من الصندوق side، فيتحرك الروبوت للأمام 200 mm. ثم تنتهي الوصفة ويُزال الصندوق المؤقت.', mem: { vars: [['side', 200]], out: ['📒 حُفظت الوصفة square', '🤖 تحرك 200 mm'] } },
      { ln: 3, ask: { q: 'square(600): كم يصبح ما في الصندوق side؟', o: ['600', '200', '800'], a: 0 }, say: 'استدعاء جديد بصندوق جديد: side فيه 600 هذه المرة.', mem: { vars: [['side', 600]], hi: ['var', 'side'], out: ['📒 حُفظت الوصفة square', '🤖 تحرك 200 mm'] } },
      { ln: 1, say: 'الوصفة نفسها، لكن الروبوت يتحرك 600 mm. عنصر واحد وأحجام مختلفة!', mem: { vars: [['side', 600]], out: ['📒 حُفظت الوصفة square', '🤖 تحرك 200 mm', '🤖 تحرك 600 mm'] } },
    ],
    moral: 'التعريف def وصفة تُحفظ ولا تُنفَّذ. والاستدعاء ينفّذها، ورقم الإدخال يملأ صندوق المعامل. لذلك يرسم Petal(100) زهرة صغيرة و Petal(270) زهرة كبيرة.',
    quiz: { q: 'كم مرة يتحرك الروبوت؟\ndef go(d):\n    drivetrain.drive_for(FORWARD, d, MM)\ngo(100)\ngo(300)\ngo(50)', o: ['3', '1', '0', '450'], a: 0 } },
  { t: 'master' },
] };
LESSONS.unshift(STORY2);

const JEOP = {
  cats: ['المتغيرات', 'الحساب والتكرار', 'أوامر بايثون', 'البرمجة التركيبية', 'المعاملات'],
  q: [
    [ { q: 'ما فئة اللبنات التي نجد فيها لبنات المتغير؟', a: 'فئة المتغيرات (Variables)', m: 'SHOW IT' }, { q: 'هل my speed اسم صالح لمتغير؟', a: 'لا، فيه مسافة', m: 'SHOW IT', sp: 'all' }, { q: 'speed = 10\nspeed = speed + 20\nbrain.print(speed)', a: '30', m: 'SHOW IT' }, { q: 'اذكرن ثلاث قواعد لاسم المتغير', a: 'فريد، لا يبدأ برقم، بلا مسافات ولا أحرف خاصة، ليس كلمة محجوزة', m: 'EVIDENCE IT', sp: 'double' }, { q: 'مثّلن حركة الروبوت في مثال التسارع: speed يبدأ 10 ويزيد 20 أربع مرات', a: '10 ← 30 ← 50 ← 70', m: 'ACT IT', sp: 'risk' } ],
    [ { q: 'x = 2\nbrain.print(x * 6)', a: '12', m: 'SHOW IT' }, { q: 'ما أنواع التكرارات الأربعة في فيكس كود في آر؟', a: 'تكرار، تكرار حتى، إلى الأبد، في حين', m: 'EVIDENCE IT', sp: 'all' }, { q: 'ما ناتج 9 % 2؟', a: '1', m: 'SHOW IT' }, { q: 'Counter = 0\nwhile not Counter > 5:\n    Counter = Counter + 1\nbrain.print(Counter)', a: '6', m: 'SHOW IT', sp: 'double' }, { q: 'لماذا يكون ضلع الشكل الثماني الأول أسود والثاني أحمر؟ برّرن', a: 'العدّاد 0 زوجي (أسود) ثم 1 فردي (أحمر)', m: 'DEFEND IT', sp: 'risk' } ],
    [ { q: 'ما أمر بايثون للبنة «تحرك إلى الأمام 200 mm»؟', a: 'drivetrain.drive_for(FORWARD, 200, MM)', m: 'SHOW IT' }, { q: 'ما المعاملات الثلاثة في drive_for؟', a: 'الاتجاه، المسافة، الوحدة', m: 'SHOW IT', sp: 'all' }, { q: 'مثّلن: drivetrain.turn_for(RIGHT, 90, DEGREES) مرتين', a: 'استدارة للخلف (180 درجة)', m: 'ACT IT' }, { q: 'اكتبن بايثون: اضبط السرعة 80 %، ثم كرر 9 مرات: تحرك للأمام 200', a: 'set_drive_velocity(80, PERCENT) ثم for … range(9): drive_for(FORWARD, 200, MM)', m: 'BUILD IT', sp: 'double' }, { q: 'متى نستخدم for ومتى نستخدم while؟', a: 'for لعدد محدد من المرات، while عندما لا يكون العدد معروفًا', m: 'DEFEND IT' } ],
    [ { q: 'ما الاسم الآخر لوحدات البرامج في لغات البرمجة؟', a: 'الدوال (Functions)', m: 'SHOW IT' }, { q: 'ما الكلمة التي تعرّف عنصر البرمجة الجديد في بايثون؟', a: 'def', m: 'SHOW IT', sp: 'all' }, { q: 'رتّبن خطوة متعرجة واحدة', a: 'أمام 200 ← يمين 90 ← أمام 200 ← يسار 90', m: 'ORDER IT' }, { q: 'ارسمن ما يرسمه: one_step_zigzag ثلاث مرات', a: 'درج من ثلاث درجات', m: 'DRAW IT', sp: 'double' }, { q: 'كم بتلة في زهرة الكتاب، وكم درجة ينعطف الروبوت بعد كل بتلة؟', a: '12 بتلة، 120 درجة', m: 'EVIDENCE IT', sp: 'risk' } ],
    [ { q: 'ما المعامل (Parameter)؟', a: 'متغير داخل عنصر البرمجة يأخذ قيمة إدخال', m: 'SHOW IT' }, { q: 'في Petal(270): ما رقم الإدخال؟', a: '270', m: 'SHOW IT', sp: 'all' }, { q: 'ارسمن ناتج: square(200) ثم square(300) ثم square(600)', a: 'ثلاثة مربعات متداخلة من زاوية واحدة', m: 'DRAW IT' }, { q: 'اكتبن تعريف square بمعامل side', a: 'def square(side): ثم for range(4): drive_for(FORWARD, side, MM) و turn_for(RIGHT, 90, DEGREES)', m: 'BUILD IT', sp: 'double' }, { q: 'لماذا نضيف معاملًا إلى Petal بدل إنشاء عنصر لكل حجم؟ برّرن', a: 'عنصر واحد يتأقلم مع أكثر من مشكلة: أحجام مختلفة بلا تكرار للكود', m: 'DEFEND IT', sp: 'risk' } ],
  ],
  final: { q: 'التحدي النهائي: صمّمن حديقة من ثلاث زهرات: عنصر Petal بمعامل، وعنصر للزهرة (8 بتلات، انعطاف 135)، وعدّاد يجعل الزهرة حمراء إذا كان رقم التكرار فرديًا وزرقاء إذا كان زوجيًا. اكتبن المقطع الرئيس.', a: 'for … range(3): if Counter % 2 == 0: BLUE else: RED • Flower() • الانتقال 550 mm • Counter = Counter + 1' },
};
const MODES = {
  'SHOW IT': 'كل الطالبات يرفعن الإجابة معًا: 3…2…1 SHOW!', 'BUILD IT': 'كل عضوة تضيف جزءًا من الحل.', 'ACT IT': 'المجموعة تمثّل الإجابة بالحركة.',
  'DRAW IT': 'كل عضوة ترسم جزءًا على السبورة.', 'EVIDENCE IT': 'كل طالبة تقدّم دليلًا من الدرس.', 'ORDER IT': 'كل طالبة تحمل بطاقة وتقف في الترتيب الصحيح.', 'DEFEND IT': 'الفريق يختار إجابة ثم تبرّرها عضوتان.',
};
