// تمارين «لنطبق معًا» من كتاب ثاني متوسط — الوحدة الخامسة «برمجة الروبوت» (ص٣٦١–٣٦٣ و ص٣٨٨–٣٨٩)
'use strict';
const VXB = '__import__("vex")';
const VELS = `[e[1] for e in ${VXB}._log if e[0]=="vel"]`;
const BOOK2 = {
  r1: [
    { n: 'تدريب ١', p: '٣٦١', kind: 'choice', q: 'قواعد اسم المتغير في فيكس كود في آر. حدّدي الجملة الصحيحة والجملة الخطأ:', qs: [
      { q: '١. في المقطع البرمجي يجب أن يكون اسم المتغير فريدًا.', o: ['صحيحة', 'خطأ'], a: 0 },
      { q: '٢. كل كلمة يمكن أن تكون اسم متغير.', o: ['خطأ', 'صحيحة'], a: 0, why: 'الكلمات المحجوزة مثل تكرار وإذا لا تصلح.' },
      { q: '٣. قد يحتوي اسم المتغير على أحرف خاصة.', o: ['خطأ', 'صحيحة'], a: 0, why: 'لا يحتوي على أحرف خاصة مثل ! و " .' },
      { q: '٤. قد يحتوي اسم المتغير على مسافات.', o: ['خطأ', 'صحيحة'], a: 0, why: 'نستخدم الشرطة السفلية ( _ ) بين الكلمات.' },
      { q: '٥. قد يتكون اسم المتغير من مجموعة من الأحرف الكبيرة والصغيرة.', o: ['صحيحة', 'خطأ'], a: 0 } ] },
    { n: 'تدريب ٣', p: '٣٦٣', kind: 'code', q: 'بناء على مقطع مثال التسارع، أجري التغييرات المناسبة حتى يتباطأ الروبوت هذه المرة. يجب أن تكون سرعة بدء الروبوت 100.',
      starter: '# Playground: Grid Map\nspeed = 10\nfor repeat_count in range(4):\n    drivetrain.set_drive_velocity(speed, PERCENT)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    speed = speed + 20',
      checks: [{ py: `${VELS}[:1]==[100]`, msg: 'سرعة البدء 100' }, { py: `(lambda v: len(v)>=3 and all(b<a for a,b in zip(v,v[1:])))(${VELS})`, msg: 'السرعة تقل في كل مرة' }, { py: `len(${VXB}._drives())>=3`, msg: 'الروبوت يتحرك في كل تكرار' }],
      hint: 'speed = 100\n...\n    speed = speed + -20' },
  ],
  r2: [
    { n: 'تدريب ٥', p: '٣٦٣', kind: 'code', q: 'أنشئي مقطعًا برمجيًا لتحديد ما إذا كانت نتيجة طرح متغيرين فردية أو زوجية، وبناء على النتيجة اطبعي: «العدد فردي» أو «العدد زوجي». جرّبي بالقيم a = 17 و b = 4.',
      starter: 'a = 17\nb = 4\nresult = a - b\n',
      checks: [{ py: 'result==a-b', msg: 'result = a - b' }, { py: '"%" in _lab_code and "if " in _lab_code and "else" in _lab_code', msg: 'استخدام ما تبقى من ( % ) مع إذا / آخر' }, { out: 'العدد فردي', msg: 'نتيجة 17 - 4 = 13: العدد فردي' }, { py: '_lab_code.count("زوجي")>=1', msg: 'رسالة «العدد زوجي» موجودة في الفرع الآخر' }],
      hint: 'if result % 2 == 0:\n    brain.print("العدد زوجي")\nelse:\n    brain.print("العدد فردي")' },
  ],
  r3: [
    { n: 'تدريب ٢', p: '٣٦٢', kind: 'match', q: 'صِلي كل لبنة برمجية بالأمر الصحيح بلغة بايثون:', pairs: [['١. اضبط سرعة القيادة إلى 20 %', 'drivetrain.set_drive_velocity(20, PERCENT)'], ['٢. مجموعة speed إلى 20', 'speed = 20'], ['٣. تكرار 20', 'for repeat_count in range(20):'], ['٤. تحرك إلى الأمام 300 mm', 'drivetrain.drive_for(FORWARD, 300, MM)'], ['٥. تحرك إلى الخلف 300 mm', 'drivetrain.drive_for(REVERSE, 300, MM)']], mono: 'r' },
    { n: 'تدريب ٢ (تابع)', p: '٣٦٢', kind: 'fill', q: 'أكملي أوامر بايثون:', blanks: [
      { l: 'drivetrain.drive_for(____, 300, MM)   # backward', a: ['REVERSE'] },
      { l: 'for repeat_count in ____(20):', a: ['range'] },
      { l: 'drivetrain.set_drive_velocity(20, ____)', a: ['PERCENT'] } ], hint: 'الخلف REVERSE، والنطاق range، والنسبة PERCENT.' },
  ],
  r4: [
    { n: 'تدريب ٢', p: '٣٨٨', kind: 'code', q: 'المقطع التالي ينشئ زهرة من 9 بتلات في ملعب الفن قماش. أنشئي هذه الزهرة باستخدام عنصر برمجة جديد (My Block) لكل بتلة، وأعيدي إنشاء المقطع البرمجي.',
      starter: '# Playground: Art Canvas\npen.move(DOWN)\npen.set_pen_width(EXTRA_THIN)\npen.set_pen_color(BLUE)\nfor repeat_count in range(9):\n    for repeat_count2 in range(3):\n        drivetrain.drive_for(FORWARD, 180, MM)\n        drivetrain.turn_for(RIGHT, 40, DEGREES)\n    drivetrain.turn_for(RIGHT, 60, DEGREES)\n    for repeat_count2 in range(3):\n        drivetrain.drive_for(FORWARD, 180, MM)\n        drivetrain.turn_for(RIGHT, 40, DEGREES)\n    drivetrain.turn_for(RIGHT, 100, DEGREES)',
      checks: [{ py: '__import__("re").search(r"def\\s+\\w+\\s*\\(", _lab_code) is not None', msg: 'تعريف عنصر برمجة جديد للبتلة' }, { py: `len(${VXB}._lines())==54`, msg: 'تسع بتلات (54 جانبًا)' }, { py: `${VXB}._home()`, msg: 'الزهرة مكتملة: عاد الروبوت لمركزها' }, { py: '_lab_code.count("drive_for")<=2', msg: 'الحركة مكتوبة داخل التعريف فقط' }],
      hint: 'def Petal():\n    for repeat_count in range(3):\n        ...\n    drivetrain.turn_for(RIGHT, 60, DEGREES)\n    for repeat_count in range(3):\n        ...\n\nfor repeat_count in range(9):\n    Petal()\n    drivetrain.turn_for(RIGHT, 100, DEGREES)' },
  ],
  r5: [
    { n: 'تدريب ١', p: '٣٨٨', kind: 'match', q: 'صِلي تعريف اللبنات مع عناصر البرمجة الجديدة (My Blocks):', pairs: [['تعريف shape', 'shape()'], ['تعريف shape (side length)', 'shape(10)'], ['تعريف shape (side length) (angle)', 'shape(100, 90)']], mono: 'r' },
    { n: 'تدريب ٣', p: '٣٨٩', kind: 'code', q: 'أضيفي إلى عنصر البرمجة الجديد رقم إدخال يسمح بتغيير حجم المربع، ثم أنشئي سلسلة من 4 مربعات على القطر المائل طول الجانب فيها 400 mm (الصورة رقم ٢).',
      starter: '# Playground: Grid Map\ndef square():\n    for repeat_count in range(4):\n        drivetrain.drive_for(FORWARD, 200, MM)\n        drivetrain.turn_for(RIGHT, 90, DEGREES)\n\npen.set_pen_color(GREEN)\npen.set_pen_width(MEDIUM)\npen.move(DOWN)\n',
      checks: [{ py: '__import__("re").search(r"def\\s+\\w+\\s*\\(\\s*\\w+\\s*\\)", _lab_code) is not None', msg: 'عنصر برمجة جديد برقم إدخال' }, { py: `len(${VXB}._lines())>=16`, msg: 'أربعة مربعات (16 جانبًا على الأقل)' }, { py: `${VXB}._span()==(1600,1600)`, msg: 'سلسلة من 4 مربعات طول جانبها 400' }, { py: `${VXB}._n("wall")==0`, msg: 'الروبوت لم يصطدم بالجدار' }],
      hint: 'def square(side):\n    ... drive_for(FORWARD, side, MM) ...\n\nfor repeat_count in range(4):\n    square(400)\n    drivetrain.drive_for(FORWARD, 400, MM)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    drivetrain.drive_for(FORWARD, 400, MM)\n    drivetrain.turn_for(LEFT, 90, DEGREES)' },
    { n: 'تدريب ٤', p: '٣٨٩', kind: 'code', q: 'برمجي روبوت الواقع الافتراضي ليرسم زهرة لها جذع وورقتان. سيرسم عنصر البرمجة الجديد مع معامل رقم الإدخال البتلات والورقتين، ولون القلم يُحدَّد في المقطع الرئيس فقط.',
      starter: '# Playground: Art Canvas\ndef Petal(Petal_side_length):\n    for repeat_count in range(3):\n        drivetrain.drive_for(FORWARD, Petal_side_length, MM)\n        drivetrain.turn_for(RIGHT, 30, DEGREES)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    for repeat_count in range(3):\n        drivetrain.drive_for(FORWARD, Petal_side_length, MM)\n        drivetrain.turn_for(RIGHT, 30, DEGREES)\n\npen.set_pen_width(EXTRA_THIN)\npen.set_pen_color(RED)\npen.move(DOWN)\n',
      checks: [{ py: `sum(1 for e in ${VXB}._lines() if e[5]=="RED")>=72`, msg: 'زهرة حمراء من 12 بتلة' }, { py: `sum(1 for e in ${VXB}._lines() if e[5]=="GREEN")>=13`, msg: 'جذع وورقتان باللون الأخضر' }, { py: `len(set(round(${VXB}._seglen(e)) for e in ${VXB}._lines()))>=2`, msg: 'استخدام Petal بأكثر من رقم إدخال' }, { py: `${VXB}._n("wall")==0`, msg: 'الروبوت لم يصطدم بالجدار' }],
      hint: 'for repeat_count in range(12):\n    Petal(120)\n    drivetrain.turn_for(RIGHT, 120, DEGREES)\npen.set_pen_color(GREEN)\ndrivetrain.drive_for(REVERSE, 600, MM)\nPetal(100)\ndrivetrain.turn_for(RIGHT, 90, DEGREES)\ndrivetrain.turn_for(RIGHT, 120, DEGREES)\nPetal(100)' },
  ],
};
// تُضاف «تمارين الكتاب» قبل بطاقة الإتقان في كل محطة
LESSONS.forEach(L => { const items = BOOK2[L.id]; if (!items) return; const mi = L.acts.findIndex(a => a.t === 'master'); L.acts.splice(mi < 0 ? L.acts.length : mi, 0, { t: 'book', title: 'تمارين الكتاب: لنطبق معًا', goal: 'كل تدريب برقمه وصفحته في الكتاب. حلّيه هنا، ويُصحَّح فورًا، ويصل حلّكِ للمعلمة.', items }); });
