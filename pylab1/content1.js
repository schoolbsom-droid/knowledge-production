// محتوى معمل أول متوسط: الوحدة الرابعة «البرمجة مع بايثون» — كتاب المهارات الرقمية أول متوسط (ص١٢٠–١٧٥)
'use strict';
window.LABCFG = { grade: 1, gname: 'أول متوسط', slug: 'lab-g1', lab: 'pylab-g1', store: 'pylab-g1-v1', unit: 'الوحدة الرابعة «البرمجة مع بايثون»', sub: 'المهارات الرقمية · أول متوسط · الوحدة الرابعة' };
const FLOW = {
  oval: '<svg viewBox="0 0 60 30" width="54"><ellipse cx="30" cy="15" rx="27" ry="12" fill="#ECD571" stroke="#534057" stroke-width="2.5"/></svg>',
  para: '<svg viewBox="0 0 60 30" width="54"><path d="M12 3h45l-9 24H3z" fill="#B9DDF5" stroke="#534057" stroke-width="2.5"/></svg>',
  rect: '<svg viewBox="0 0 60 30" width="54"><rect x="4" y="4" width="52" height="22" fill="#C9EBD3" stroke="#534057" stroke-width="2.5"/></svg>',
  dia: '<svg viewBox="0 0 60 34" width="54"><path d="M30 2l27 15-27 15L3 17z" fill="#FFCB7D" stroke="#534057" stroke-width="2.5"/></svg>',
  arrow: '<svg viewBox="0 0 60 30" width="54"><path d="M6 15h40M38 7l10 8-10 8" stroke="#534057" stroke-width="3" fill="none"/></svg>',
};
const LESSONS = [
/* ==================== الدرس ١ ==================== */
{ id: 'a1', n: 1, title: 'ما البرنامج', pages: '١٢١–١٢٩', icon: 'list',
  skills: ['أفهم المشكلة وأحدد مدخلاتها ومخرجاتها', 'أكتب خوارزمية لمشكلة محددة', 'أرسم مخططًا انسيابيًا لخوارزمية'],
  acts: [
  { t: 'comic', title: 'قصة: صباح كودة المبرمَج', goal: 'تتعرفين على البرنامج والخوارزمية والمخطط الانسيابي.',
    panels: [
      { w: 'k', m: 'happy', s: 'كل صباح أتبع قواعد: أستيقظ، أتوضأ، أصلي، أنظّف أسناني، أفطر، أرتدي ملابسي، ثم أذهب للمدرسة.' },
      { w: 'b', m: 'wink', s: 'هذه خوارزمية! قائمة تعليمات واضحة تُتبع خطوة بخطوة لحل مشكلة.' },
      { w: 'k', m: 'think', s: 'لكن الحاسب لا يتخذ قرارات بنفسه… ولا يفهم إلا 0 و 1!' },
      { w: 'b', m: 'happy', s: 'لذلك نكتب له بلغة برمجة عالية المستوى مثل بايثون، ثم يحوّلها «المحوّل البرمجي» إلى لغة الآلة.', code: 'print("Hello world!")' },
      { w: 'b', m: 'wink', s: 'وقبل الكود نرسم الخوارزمية بأشكال: بيضاوي للبداية والنهاية، ومتوازي أضلاع للإدخال والإخراج، ومستطيل للعمليات، ومعين للقرار.' },
      { w: 'k', m: 'wow', s: 'إذن مراحل إنشاء البرنامج بالترتيب هي… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['تحديد المشكلة ← الخوارزمية ← المخطط الانسيابي ← كتابة البرنامج', 'كتابة البرنامج ← المخطط الانسيابي ← الخوارزمية', 'المخطط الانسيابي ← تحديد المشكلة ← البرنامج', 'كتابة البرنامج مباشرة دون تخطيط'], a: 0, why: 'أولًا نحدد المشكلة، ثم نكتب خطوات الخوارزمية، ثم نرسم المخطط الانسيابي، وأخيرًا نكتب البرنامج.' } },

  { t: 'match', title: 'طابقي: أشكال المخطط الانسيابي', p: '١٢٤', goal: 'لكل شكل وظيفة. طابقي الشكل بوظيفته.',
    pairs: [['⬭ الشكل البيضاوي', 'البداية / النهاية'], ['▱ متوازي الأضلاع', 'الإدخال / الإخراج'], ['▭ المستطيل', 'العمليات (المعالجة)'], ['◇ المعيّن', 'اتخاذ قرار (نعم / لا)'], ['→ السهم', 'تسلسل تنفيذ الخطوات']] },

  { t: 'mission', title: 'المهمة السرية: مطبخ الخوارزميات', goal: 'خمس مهمات تعطيكِ حروف الرمز السري.',
    story: 'سُرقت وصفة الفطيرة المحلاة من مطبخ المدرسة، ولم يبقَ إلا مخطط انسيابي ممزق! أعيدي بناء الخوارزمية.',
    missions: [
      { type: 'FIND IT', ar: 'اكتشفي', q: 'في وصفة الطعام: ما «المدخلات»؟', o: ['المكونات', 'الطبق الشهي', 'إجراءات الطهي'], a: 0, r: 'S', why: 'المدخلات = المكونات، والخوارزمية = إجراءات الطهي، والمخرجات = الطبق.' },
      { type: 'FIX IT', ar: 'صحّحي', q: 'خوارزمية متوسط رقمين: «احسب المتوسط ← أدخل الرقمين ← اعرض النتيجة». ما الخطأ؟', o: ['لا يمكن حساب المتوسط قبل إدخال الرقمين', 'يجب حذف «اعرض النتيجة»', 'لا يوجد خطأ'], a: 0, r: 'T', why: 'الترتيب الصحيح: أدخل الرقمين ← احسب المتوسط ← اعرض النتيجة (تدريب ١ ص١٢٧).' },
      { type: 'MATCH IT', ar: 'طابقي', kind: 'match', q: 'طابقي الخطوة بشكلها في المخطط:', pairs: [['البداية', '⬭ بيضاوي'], ['احصل على الطول', '▱ متوازي أضلاع'], ['اضرب الطول بالعرض', '▭ مستطيل'], ['هل الخليط متجانس؟', '◇ معيّن']], r: 'E' },
      { type: 'BUILD IT', ar: 'ابني', kind: 'order', q: 'رتّبي خوارزمية حساب متوسط درجاتك في ثلاث مواد (تدريب ٢):', lines: ['أدخل درجاتك في ثلاث مواد', 'احسب المجموع', 'احسب المتوسط بقسمة المجموع على 3', 'اطبع النتيجة على الشاشة'], r: 'P' },
      { type: 'DECIDE IT', ar: 'قرّري', q: 'في مخطط الفطيرة: «هل لون الفطيرة بُني من الجهتين؟» ← لا. ماذا نفعل؟', o: ['نعود ونطهوها مرة أخرى', 'نقدّمها مباشرة', 'نشتري المكونات من جديد'], a: 0, r: 'S' },
    ],
    code: 'STEPS',
    final: { story: 'فُتح الظرف! المطلوب: برنامج يحوّل الكيلومترات إلى أميال (الميل = 1.61 كيلو متر).', q: 'أي خوارزمية صحيحة؟', o: ['البداية ← احصل على الكيلومترات ← الأميال = الكيلومترات / 1.61 ← اعرض النتيجة ← النهاية', 'البداية ← اعرض النتيجة ← احصل على الكيلومترات ← النهاية', 'البداية ← الأميال = الكيلومترات × 1.61 ← النهاية', 'احصل على الكيلومترات ← النهاية ← البداية'], a: 0, why: 'تدريب ٣ ص١٢٩: إدخال ← عملية ← إخراج، بين بداية ونهاية.' } },

  { t: 'run', title: 'جرّبي بنفسك: أول برنامج', items: [
    { h: 'أبسط برنامج: الطباعة', p: '١٢٢', code: 'print("Hello world!")' },
    { h: 'برنامج مساحة المستطيل', p: '١٢٦', code: 'print("لتحسب مساحة المستطيل")\nprint("اكتب طول المستطيل: ")\nlength=int(input())\nprint("اكتب عرض المستطيل: ")\nwidth=int(input())\narea=length * width\nprint("مساحة المستطيل هي: ",area)', note: 'ستظهر نافذة لتكتبي الطول ثم العرض.' },
  ] },

  { t: 'traffic', title: 'إشارة المرور: البرنامج والخوارزمية',
    show: [
      { s: 'الخوارزمية قائمة تعليمات واضحة تُتبع خطوة بخطوة لحل مشكلة.', a: 'g', fix: 'صحيحة.' },
      { s: 'يستطيع الحاسب اتخاذ القرارات بنفسه دون تعليمات.', a: 'r', fix: 'الحاسب يتبع تعليمات محددة فقط.' },
      { s: 'المعيّن في المخطط الانسيابي يُستخدم للإدخال.', a: 'r', fix: 'المعيّن للقرار، والإدخال بمتوازي الأضلاع.' },
      { s: 'يجب أن يحتوي المخطط الانسيابي على بداية ونهاية.', a: 'g', fix: 'صحيحة، ولا تتقاطع الأسهم.' },
      { s: 'لغة الآلة تتكون من الأرقام 0 و 1، ونكتب بها برامجنا عادة.', a: 'y', fix: 'الشق الأول صحيح، لكننا نكتب بلغات عالية المستوى ثم تُحوَّل للغة الآلة.' },
    ],
    opinion: [
      { s: 'أرى أن رسم المخطط الانسيابي قبل البرمجة يوفر الوقت.' },
      { s: 'إحدى الطالبات قالت: «وصفة الطعام ليست خوارزمية».' },
      { s: 'من وجهة نظري، بايثون أسهل للمبتدئين من لغة سي شارب.' },
    ],
    move: [
      { s: 'خوارزميتك تبدأ بـ«اعرض النتيجة» قبل الحساب. نكمل؟', a: 'r', why: 'لا نعرض نتيجة لم نحسبها بعد.' },
      { s: 'رسمتِ «احسب المجموع» داخل مستطيل. نكمل؟', a: 'g', why: 'المستطيل للعمليات.' },
      { s: 'لا تعرفين: هل تحويل الكيلومترات يحتاج ضربًا أم قسمة على 1.61؟', a: 'y', why: 'فكّري: الميل أكبر من الكيلومتر، فعدد الأميال أقل: نقسم.' },
    ] },

  { t: 'code', title: 'تحدي البرمجة: برنامجي الأول', p: '١٣٣',
    task: 'اكتبي برنامجًا يطبع ثلاث رسائل، كل رسالة في سطر:<br>• <code>أتعلم لغة بايثون</code><br>• <code>أحب البرمجة</code><br>• اسمكِ',
    starter: 'print("أتعلم لغة بايثون")\n',
    checks: [ { out: 'أتعلم لغة بايثون', msg: 'الرسالة الأولى' }, { out: 'أحب البرمجة', msg: 'الرسالة الثانية' }, { lines: 3, msg: 'ثلاثة أسطر على الأقل' } ],
    hint: 'print("أحب البرمجة")\nprint("نورة")', sol: 'print("أتعلم لغة بايثون")\nprint("أحب البرمجة")\nprint("نورة")' },
  { t: 'master' },
] },

/* ==================== الدرس ٢ ==================== */
{ id: 'a2', n: 2, title: 'المتغيرات والثوابت', pages: '١٣٠–١٣٩', icon: 'book',
  skills: ['أميّز بين المتغيرات في لغة بايثون', 'أنشئ برنامجًا في بايثون', 'أسند قيمًا للمتغيرات'],
  acts: [
  { t: 'comic', title: 'قصة: صناديق كودة', goal: 'المتغير مكان محجوز في الذاكرة، له اسم وقيمة.',
    panels: [
      { w: 'k', m: 'think', s: 'أريد أن يحفظ برنامجي درجة اللاعب… أين يحفظها؟' },
      { w: 'b', m: 'happy', s: 'في متغير! مكان محجوز في ذاكرة الحاسب، كأنه صندوق عليه ملصق باسمه.', code: 'score=1200\nname="محمد"' },
      { w: 'b', m: 'wink', s: 'علامة = في البرمجة لا تعني «يساوي» كالرياضيات، بل: ضعي القيمة اليمنى في الصندوق الأيسر.', code: 'x=15\ny=20\nTotal=x+y\nprint(Total)  # 35' },
      { w: 'k', m: 'wow', s: 'وهل أسمّي الصندوق بأي اسم؟' },
      { w: 'b', m: 'happy', s: 'يبدأ بحرف أو _ ولا يبدأ برقم، ولا يكون كلمة محجوزة مثل print أو True. و age غير Age!' },
      { w: 'k', m: 'think', s: 'إذن أي هذه الأسماء صحيح لمتغير… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['CourseName', '2AB', 'True', 'my name'], a: 0, mono: 1, why: '2AB يبدأ برقم، و True كلمة محجوزة، و my name فيه مسافة.' } },

  { t: 'run', title: 'جرّبي بنفسك: المتغيرات', items: [
    { h: 'رسالة الترحيب', p: '١٣١', code: 'print("مرحبًا بك في بايثون")' },
    { h: 'جمع متغيرين', p: '١٣٥', code: 'x=15\ny=20\nTotal=x+y\nprint(Total)', predict: { q: 'توقّعي الناتج:', o: ['35', '1520', 'x+y', 'Total'], a: 0 } },
    { h: 'المتغيرات النصية', p: '١٣٦', code: 'name="محمد"\nprint(name)\nprint("اسمي:", name)' },
    { h: 'التعليقات لا تُنفَّذ', p: '١٣٦', code: '#عيّن قيمة لاسم المتغير\nname="محمد"\n#اطبع قيمة المتغير\nprint("اسمي:", name)' },
    { h: 'لعبة السباق الثلاثي', p: '١٣٧', code: 'print("لعبة السباق الثلاثي")\nSwimmingScore=70\nCyclingScore=40\nRunningScore=60\n#احسب نتيجة الرياضي في لعبة السباق الثلاثي\nTriathlonScore=SwimmingScore+CyclingScore+RunningScore\nprint("مجموع نقاط لعبة السباق الثلاثي:", TriathlonScore)' },
    { h: 'الثوابت: قيمة باي', p: '١٣٧', code: 'from math import pi\nprint("قيمة باي:", pi)' },
    { h: 'تدريب ٣: ما الناتج؟', p: '١٣٩', code: 'x=20\ny=30\nTotal=x+y\nprint("مجموع x و y يساوي:", Total)', predict: { q: 'ما الرقم الذي سيظهر؟', o: ['50', '2030', '600'], a: 0 } },
    { h: 'اختبري نفسك (س١١): لغز التبديل', p: '١٧٢', code: 'x=20\ny=30\nx=y\ny=x\nTotal=x+y\nprint("مجموع x و y يساوي:", Total)', predict: { q: 'انتبهي! ما الناتج؟', o: ['60', '50', '70'], a: 0 }, note: 'بعد x=y صار x = 30، ثم y=x أعادت 30 إلى y. القيمة 20 ضاعت! افتحي «حكاية الذاكرة» لتري ذلك خطوة خطوة.' },
  ] },

  { t: 'tpr', title: 'استجيبي: هل الاسم صالح لمتغير؟', goal: '👍 صالح  •  👉 غير متأكدة  •  👎 غير صالح',
    thumbs: [
      { s: 'CourseName', a: 'up', why: 'يبدأ بحرف وليس فيه مسافة.' },
      { s: '2AB', a: 'down', why: 'لا يبدأ اسم المتغير برقم.' },
      { s: 'True', a: 'down', why: 'كلمة محجوزة في بايثون.' },
      { s: 'GrAdE', a: 'up', why: 'صالح، لكنه مختلف عن grade وعن GRADE.' },
      { s: 'total_volume', a: 'up', why: 'الشرطة السفلية مسموحة.' },
      { s: 'print', a: 'down', why: 'اسم دالة الطباعة، وهي من الكلمات المحجوزة في الكتاب.' },
    ],
    conf: [
      { q: 'ما الناتج؟', code: 'a=5\nprint("a")', o: ['a', '5', 'خطأ'], a: 0 },
      { q: 'ما الناتج؟', code: 'name="سارة"\nprint("اسمي:", name)', o: ['اسمي: سارة', 'اسمي: name', 'name'], a: 0 },
      { q: 'ما الناتج؟', code: 'x=6\nx=x+1\nprint(x)', o: ['7', '6', 'x+1'], a: 0 },
    ] },

  { t: 'code', title: 'تحدي البرمجة: درجتي', p: '١٣٩ (تدريب ٢)',
    task: 'أنشئي المتغير <code>myGrade</code> وضعي فيه درجتكِ في الرياضيات، ثم اطبعيها على الشاشة مع رسالة توضيحية.',
    starter: '', checks: [ { py: '"myGrade" in globals() and isinstance(myGrade,(int,float))', msg: 'المتغير myGrade رقم' }, { py: 'str(myGrade) in _lab_code and "print" in _lab_code', msg: 'طباعة الدرجة' }, { out: '\\d', msg: 'الدرجة ظهرت على الشاشة' } ],
    hint: 'myGrade=95\nprint("درجتي في الرياضيات:", myGrade)', sol: 'myGrade=95\nprint("درجتي في الرياضيات:", myGrade)' },
  { t: 'master' },
] },

/* ==================== الدرس ٣ ==================== */
{ id: 'a3', n: 3, title: 'إدخال البيانات', pages: '١٤٠–١٤٥', icon: 'file',
  skills: ['أميّز بين أنواع البيانات المختلفة', 'أنشئ برنامجًا باستخدام دالتي الإدخال input والطباعة print'],
  acts: [
  { t: 'comic', title: 'قصة: صندوق البريد العجيب', goal: 'input تجعل البرنامج يتوقف وينتظر المستخدم، وما يُكتب يصل نصًا.',
    panels: [
      { w: 'k', m: 'think', s: 'برنامجي يجمع رقمين ثابتين دائمًا… أريد المستخدم أن يكتب الرقمين بنفسه!' },
      { w: 'b', m: 'happy', s: 'الدالة input() توقف البرنامج وتنتظر حتى يكتب المستخدم ويضغط Enter.', code: 'x=input("الرجاء إدخال قيمة x: ")' },
      { w: 'b', m: 'wow', s: 'لكن انتبهي: كل ما يُكتب يصل نصًّا str حتى لو كان رقمًا! "10" ليست 10.', fx: 'نص؟!' },
      { w: 'k', m: 'think', s: 'وكيف أحوّله إلى رقم؟' },
      { w: 'b', m: 'wink', s: 'int() للأعداد الصحيحة، و float() للأعداد العشرية.', code: 'x=int(input())\navg=float(input())' },
      { w: 'k', m: 'think', s: 'إذن نوع القيمة True هو… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['bool (بيانات منطقية)', 'str (نص)', 'int (عدد صحيح)', 'float (عدد عشري)'], a: 0, why: 'True و False قيم منطقية bool.' } },

  { t: 'run', title: 'جرّبي بنفسك: الإدخال', items: [
    { h: 'إدخال قيمة لمتغير', p: '١٤٠', code: 'print("الرجاء إدخال قيمة للمتغير x: ")\nx=input()\nprint("قيمة x: ", x)' },
    { h: 'البيانات المنطقية', p: '١٤١', code: 'a=False\nprint(a)\nb=True\nprint(b)' },
    { h: 'لماذا نحتاج int()؟ جرّبي بدونها', p: '١٤١', code: 'x=input("أدخلي رقمًا: ")\ny=input("أدخلي رقمًا آخر: ")\nprint(x+y)', note: 'أدخلي 10 ثم 5. ستظهر 105 لا 15! لأن النصين التصقا. ثم جرّبي الكود التالي.' },
    { h: 'جمع عددين من المستخدم', p: '١٤٢', code: 'x=int(input("الرجاء إدخال قيمة x: "))\ny=int(input("الرجاء إدخال قيمة y: "))\nTotal=x+y\nprint("مجموع x و y يساوي: ", Total)' },
    { h: 'لعبة السباق الثلاثي: إدخال النتائج', p: '١٤٣', code: 'print("لعبة السباق الثلاثي")\n# نقرأ اسم الرياضي\nAthleteName=input("اكتب اسم الرياضي: ")\n# نقرأ رقم الرياضي\nAthleteNumber=int(input("اكتب رقم الرياضي: "))\n# نقرأ نتيجة الرياضي في الرياضات الثلاث\nSwimmingScore=float(input("نتيجة رياضة السباحة: "))\nCyclingScore=float(input("نتيجة رياضة ركوب الدراجات: "))\nRunningScore=float(input("نتيجة رياضة الجري: "))\nprint("نتيجة رياضة السباحة: ", SwimmingScore)\nprint("نتيجة رياضة ركوب الدراجات: ", CyclingScore)\nprint("نتيجة رياضة الجري: ", RunningScore)' },
  ] },

  { t: 'quiz', title: 'تدريب ١: صِلي القيمة بنوعها', p: '١٤٤', items: [
    { q: 'نوع 7.23', o: ['float', 'int', 'str', 'bool'], a: 0 }, { q: 'نوع True', o: ['bool', 'str', 'int', 'float'], a: 0 },
    { q: 'نوع 36', o: ['int', 'float', 'str', 'bool'], a: 0 }, { q: 'نوع -98.27', o: ['float', 'int', 'str', 'bool'], a: 0 },
    { q: 'نوع "Python"', o: ['str', 'int', 'bool', 'float'], a: 0 }, { q: 'نوع "5" (بين علامتي تنصيص)', o: ['str', 'int', 'float', 'bool'], a: 0, why: 'علامتا التنصيص تجعلانه نصًا.' },
    { q: 'اختبري نفسك (س١٣): نوع 1.23', o: ['float', 'int', 'str'], a: 0 }, { q: 'نوع القيمة التي ترجعها input() دائمًا', o: ['str', 'int', 'float', 'bool'], a: 0, why: 'لذلك نستخدم int() أو float() للتحويل.' },
  ] },

  { t: 'prints', title: 'لغز البصمات: قضية المجموع الخاطئ', goal: 'حلّي البصمات الخمس لتكشفي لماذا ظهر مجموع غريب.',
    scene: { title: 'لوحة الأدلة', clues: ['x=input()', 'y=input()', 'print(x+y)', 'المستخدمة أدخلت 10 و 5', 'الشاشة: 105 ⚠', 'int()  float()  str()  bool'] },
    prints: [
      [ { q: 'ما نوع ما ترجعه input()؟', o: ['str', 'int', 'bool'], a: 0, mono: 1 }, { q: 'صح أم خطأ: input توقف البرنامج حتى يضغط المستخدم Enter.', o: ['صح', 'خطأ'], a: 0 }, { q: '"10" + "5" يساوي:', o: ['"105"', '15', 'خطأ'], a: 0, mono: 1 } ],
      [ { q: 'أي دالة تحوّل النص إلى عدد صحيح؟', o: ['int()', 'str()', 'print()'], a: 0, mono: 1 }, { q: 'أي دالة للأعداد العشرية؟', o: ['float()', 'int()', 'bool()'], a: 0, mono: 1 }, { q: 'نوع 3.0', o: ['float', 'int', 'str'], a: 0, mono: 1 } ],
      [ { q: 'لماذا ظهر 105؟', o: ['لأن x و y نصان فالتصقا', 'لأن الحاسب أخطأ', 'لأن 10+5=105'], a: 0 }, { q: 'ماذا لو كتبنا int(x)+int(y)؟', o: ['15', '105', 'خطأ'], a: 0, mono: 1 }, { q: 'صح أم خطأ: "Saad" من نوع str.', o: ['صح', 'خطأ'], a: 0 } ],
      [ { q: 'أي سطر يطلب قيمة y ويحوّلها لعدد؟', o: ['y=int(input("أدخل قيمة y: "))', 'print("أدخل قيمة y: ",y)', 'int("أدخل قيمة y: ")'], a: 0, mono: 1 }, { q: 'أدخلت المستخدمة 7.5 في int(input()). ماذا يحدث؟', o: ['خطأ ValueError', '7', '7.5'], a: 0 }, { q: 'الأنسب لدرجة الحرارة 36.6:', o: ['float(input())', 'int(input())', 'input() فقط'], a: 0, mono: 1 } ],
      [ { q: 'لكتابة الرسالة داخل input مباشرة:', o: ['x=int(input("الرجاء إدخال قيمة x: "))', 'x=int(print("x"))', 'input=x'], a: 0, mono: 1 }, { q: 'نوع المتغير ok=False', o: ['bool', 'str', 'int'], a: 0, mono: 1 }, { q: 'أي قيمة من نوع int؟', o: ['3756', '"3756"', '37.56'], a: 0, mono: 1 } ],
    ],
    final: { q: 'فتح القضية: ما التفسير والحل؟', code: 'x=input()\ny=input()\nprint(x+y)   # 105', o: ['input ترجع نصًا فالتصق "10" و "5"؛ الحل: x=int(input()) و y=int(input())', 'يجب استبدال + بـ *', 'الحاسب لا يجمع أرقامًا كبيرة', 'يجب كتابة print(x,y)'], a: 0, why: 'الأدلة: البصمة ١ (input نص) والبصمة ٢ (int للتحويل).' } },

  { t: 'code', title: 'تحدي البرمجة: اليوم ودرجة الحرارة', p: '١٤٥ (تدريب ٢)',
    task: 'اكتبي برنامجًا يطلب اسم اليوم ودرجة الحرارة، ويخزّنهما في المتغيرين <code>day</code> و <code>temp</code> (درجة الحرارة عدد عشري)، ثم يطبع: <code>اليوم هو ... ودرجة الحرارة ...</code>',
    starter: 'day=input("اكتبي اسم اليوم: ")\n',
    checks: [ { py: 'isinstance(day,str) and len(day)>0', msg: 'المتغير day نص' }, { py: 'isinstance(temp,float)', msg: 'temp عدد عشري float' }, { out: 'اليوم هو', msg: 'طباعة الرسالة' } ],
    hint: 'temp=float(input("اكتبي درجة الحرارة: "))\nprint("اليوم هو", day, "ودرجة الحرارة", temp)', sol: 'day=input("اكتبي اسم اليوم: ")\ntemp=float(input("اكتبي درجة الحرارة: "))\nprint("اليوم هو", day, "ودرجة الحرارة", temp)' },

  { t: 'code', title: 'تحدي البرمجة: املئي الفراغات', p: '١٤٥ (تدريب ٣)',
    task: 'أكملي الفراغات ليطلب البرنامج قيمتي <code>a</code> و <code>b</code> ويطبع مجموعهما (مثال: 12 و 34 ← 46).',
    starter: 'print("الرجاء إدخال قيمة a: ")\n____=int(input())\n____=int(input("الرجاء إدخال قيمة b: "))\ns=a+b\nprint("مجموع b و a يساوي:", ____)',
    checks: [ { py: '"____" not in _lab_code', msg: 'لا فراغات متبقية' }, { py: 'isinstance(a,int) and isinstance(b,int) and s==a+b', msg: 'a و b عددان و s مجموعهما' }, { out: 'يساوي', msg: 'طباعة المجموع' } ],
    hint: 'a=int(input())\nb=int(input("..."))\nprint("...", s)', sol: 'print("الرجاء إدخال قيمة a: ")\na=int(input())\nb=int(input("الرجاء إدخال قيمة b: "))\ns=a+b\nprint("مجموع b و a يساوي:", s)' },
  { t: 'master' },
] },

/* ==================== الدرس ٤ ==================== */
{ id: 'a4', n: 4, title: 'المعاملات في بايثون', pages: '١٤٦–١٥١', icon: 'grid',
  skills: ['أجري العمليات الحسابية باستخدام المعاملات الرياضية', 'أسند قيمًا للمتغيرات بمعاملات الإسناد'],
  acts: [
  { t: 'comic', title: 'قصة: آلة الحساب العجيبة', goal: 'المعاملات الرياضية وترتيب العمليات ومعاملات الإسناد.',
    panels: [
      { w: 'k', m: 'happy', s: 'في بايثون أحسب أي شيء! لكن الرموز مختلفة قليلًا عن الرياضيات.', code: '+  -  *  /  **' },
      { w: 'b', m: 'wink', s: '* للضرب بدل ×، و / للقسمة بدل ÷، و ** للأس.', code: 'x=a**2+2*a*b+b**2' },
      { w: 'k', m: 'think', s: 'كم ناتج 4 + 2 * 5 ؟ 30؟' },
      { w: 'b', m: 'happy', s: 'لا! 14. الأقواس أولًا، ثم الأس، ثم الضرب والقسمة، ثم الجمع والطرح، ومن اليسار إلى اليمين في المستوى نفسه.', fx: '١٤!' },
      { w: 'b', m: 'wink', s: 'ومعاملات الإسناد اختصار جميل:', code: 'x=6\nx+=3   # x = x + 3\nprint(x)  # 9' },
      { w: 'k', m: 'wow', s: 'إذن x=6 ثم x*=3 تجعل x تساوي… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['18', '9', '63', '3'], a: 0, mono: 1, why: 'x *= 3 تعني x = x * 3 = 18.' } },

  { t: 'run', title: 'جرّبي بنفسك: المعاملات', items: [
    { h: 'احسبي على الورق ثم جرّبي', p: '١٤٨', code: 'print(2**3 + 3 * 2)\nprint((20 + 4) / 4)\nprint(20 * 3 - 60 * 3)\nprint(12 * 3 / 6 + 5)', predict: { q: 'ما ناتج السطر الأول 2**3 + 3 * 2 ؟', o: ['14', '30', '12'], a: 0 } },
    { h: 'معاملات الإسناد', p: '١٤٩', code: 'x=6\nx+=3\nprint(x)\nx=6\nx-=3\nprint(x)\nx=6\nx*=3\nprint(x)\nx=6\nx/=3\nprint(x)', predict: { q: 'آخر سطر x/=3 يطبع:', o: ['2.0', '2', '3'], a: 0 } },
    { h: 'لعبة السباق الثلاثي: متوسط النقاط', p: '١٤٨', code: 'print("لعبة السباق الثلاثي")\nAthleteName=input("اكتب اسم الرياضي: ")\nSwimmingScore=float(input("نتيجة رياضة السباحة: "))\nCyclingScore=float(input("نتيجة رياضة ركوب الدراجات: "))\nRunningScore=float(input("نتيجة رياضة الجري: "))\n# حساب متوسط النقاط\nTriathlonPoints=(SwimmingScore+CyclingScore+RunningScore)/3\nprint(AthleteName, "نقاطك في لعبة السباق الثلاثي:", TriathlonPoints)' },
  ] },

  { t: 'tpr', title: 'استجيبي: إجابتي + ثقتي (ترتيب العمليات)',
    conf: [
      { q: 'ما الناتج؟', code: 'print(4 + 2 * 5)', o: ['14', '30', '11'], a: 0 },
      { q: 'ما الناتج؟', code: 'print((20 + 4) / 4)', o: ['6.0', '21.0', '6'], a: 0 },
      { q: 'ما الناتج؟', code: 'print(20 * 3 - 60 * 3)', o: ['-120', '0', '120'], a: 0 },
      { q: 'ما الناتج؟', code: 'print(12 * 3 / 6 + 5)', o: ['11.0', '3.0', '41'], a: 0 },
      { q: 'ما الناتج؟', code: 'x=10\nx-=4\nprint(x)', o: ['6', '14', '-4'], a: 0 },
    ] },

  { t: 'mission', title: 'المهمة السرية: مختبر المعادلات', goal: 'اكسري الشيفرة بالمعاملات الصحيحة.',
    story: 'المعادلات في مختبر العالمة سلمى مكتوبة بالرياضيات، والحاسب لا يفهمها! حوّليها إلى بايثون.',
    missions: [
      { type: 'FIND IT', ar: 'اكتشفي', q: 'أي رمز يعني «الأس» في بايثون؟', o: ['**', '^', 'x'], a: 0, r: 'P', mono: 1 },
      { type: 'FIX IT', ar: 'صحّحي', q: 'المعادلة x² + 2x مكتوبة: x2+2x . ما التصحيح؟', o: ['x**2+2*x', 'x^2+2x', 'x*2+2x'], a: 0, r: 'O', mono: 1 },
      { type: 'MATCH IT', ar: 'طابقي', kind: 'match', q: 'طابقي المعامل بمعناه:', pairs: [['+=', 'جمع وإسناد'], ['-=', 'طرح وإسناد'], ['*=', 'ضرب وإسناد'], ['/=', 'قسمة وإسناد']], r: 'W' },
      { type: 'BUILD IT', ar: 'ابني', kind: 'order', q: 'رتّبي برنامج متوسط درجتين:', lines: ['a=int(input())', 'b=int(input())', 'avg=(a+b)/2', 'print(avg)'], r: 'E' },
      { type: 'DECIDE IT', ar: 'قرّري', q: 'لحساب متوسط 3 درجات، أي سطر صحيح؟', o: ['(a+b+c)/3', 'a+b+c/3', 'a+b+c*3'], a: 0, r: 'R', mono: 1, why: 'بدون أقواس تُقسم c وحدها على 3.' },
    ],
    code: 'POWER',
    final: { story: 'فُتح الظرف! آخر معادلة في المختبر (تدريب ١ ص١٥٠):\na=15\nb=5\nc = (a + b) / 4\nd = 2 * b - a / 3\ne = (c + d) * 2', q: 'ما قيمة e؟', o: ['20.0', '10.0', '30.0', '15.0'], a: 0, why: 'c = 20/4 = 5.0 ، d = 10 - 5.0 = 5.0 ، e = (5.0 + 5.0) * 2 = 20.0' } },

  { t: 'code', title: 'تحدي البرمجة: متوسط مبيعات المتجر', p: '١٥١ (تدريب ٣)',
    task: 'اكتبي برنامجًا يطلب عدد المنتجات التي باعها المتجر في <b>أربعة أيام</b>، كل يوم في متغير منفصل (<code>d1</code> … <code>d4</code>)، ثم يحسب المتوسط في <code>avg</code> ويطبعه.',
    starter: 'd1=int(input("مبيعات اليوم الأول: "))\n',
    checks: [ { py: 'all(isinstance(v,int) for v in (d1,d2,d3,d4))', msg: 'أربعة متغيرات أعداد صحيحة' }, { py: 'abs(avg-(d1+d2+d3+d4)/4)<0.001', msg: 'المتوسط صحيح (بالأقواس)' }, { out: '\\d', msg: 'طباعة المتوسط' } ],
    hint: 'avg=(d1+d2+d3+d4)/4\nprint("المتوسط:", avg)', sol: 'd1=int(input("مبيعات اليوم الأول: "))\nd2=int(input("مبيعات اليوم الثاني: "))\nd3=int(input("مبيعات اليوم الثالث: "))\nd4=int(input("مبيعات اليوم الرابع: "))\navg=(d1+d2+d3+d4)/4\nprint("متوسط المبيعات:", avg)' },
  { t: 'master' },
] },

/* ==================== الدرس ٥ ==================== */
{ id: 'a5', n: 5, title: 'الرسم باستخدام البرمجة', pages: '١٥٢–١٦٠', icon: 'brush',
  skills: ['أرسم الأشكال باستخدام نموذج السلحفاة في بايثون'],
  acts: [
  { t: 'comic', title: 'قصة: سلحفاة كودة الرسّامة', goal: 'نموذج السلحفاة turtle يرسم وهو يتحرك.',
    panels: [
      { w: 'k', m: 'happy', s: 'عندي سلحفاة افتراضية تحمل قلمًا! كلما تحركت رسمت خطًا. 🐢' },
      { w: 'b', m: 'wink', s: 'نستورد النموذج ونصنع السلحفاة:', code: 'from turtle import*\nminiTurtle=Turtle()' },
      { w: 'b', m: 'happy', s: 'تبدأ في منتصف النافذة عند النقطة (0,0)، ووجهها إلى اليمين.' },
      { w: 'k', m: 'think', s: 'كيف أرسم مربعًا؟' },
      { w: 'b', m: 'wink', s: 'تقدّمي ثم استديري 90 درجة… أربع مرات!', code: 'miniTurtle.forward(70)\nminiTurtle.left(90)' },
      { w: 'k', m: 'wow', s: 'وللمثلث متساوي الأضلاع أستدير… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['120 درجة', '60 درجة', '90 درجة', '180 درجة'], a: 0, why: 'ثلاث استدارات × 120 = 360 درجة دورة كاملة.' } },

  { t: 'turtlepad', title: 'ورشة السلحفاة', goal: 'اضغطي الأوامر لتتحرك السلحفاة، وراقبي الكود يُكتب. أنجزي المهمات!' },

  { t: 'run', title: 'جرّبي بنفسك: السلحفاة', items: [
    { h: 'شكل السلحفاة ولونها وحجمها', p: '١٥٣', code: 'from turtle import*\nminiTurtle=Turtle()\nminiTurtle.shape("turtle")\nminiTurtle.color("green")\nminiTurtle.shapesize(2)' },
    { h: 'رسم خط', p: '١٥٤', code: 'from turtle import*\nminiTurtle=Turtle()\nminiTurtle.shape("turtle")\nminiTurtle.color("green")\nminiTurtle.shapesize(2)\nminiTurtle.forward(70)' },
    { h: 'رسم مربع', p: '١٥٥', code: 'from turtle import*\nminiTurtle=Turtle()\nminiTurtle.shape("turtle")\nminiTurtle.color("green")\nminiTurtle.shapesize(2)\nminiTurtle.forward(70)\nminiTurtle.left(90)\nminiTurtle.forward(70)\nminiTurtle.left(90)\nminiTurtle.forward(70)\nminiTurtle.left(90)\nminiTurtle.forward(70)', predict: { q: 'كم مرة تستدير السلحفاة؟', o: ['3', '4', '2'], a: 0 } },
    { h: 'رسم مثلث', p: '١٥٦', code: 'from turtle import*\nminiTurtle=Turtle()\nminiTurtle.shape("turtle")\nminiTurtle.color("green")\nminiTurtle.forward(100)\nminiTurtle.left(120)\nminiTurtle.forward(100)\nminiTurtle.left(120)\nminiTurtle.forward(100)' },
    { h: 'رسم دائرة', p: '١٥٦', code: 'from turtle import*\nminiTurtle=Turtle()\nminiTurtle.shape("turtle")\nminiTurtle.color("green")\nminiTurtle.circle(50)' },
    { h: 'كتابة نص', p: '١٥٧', code: 'from turtle import*\nminiTurtle=Turtle()\nminiTurtle.shape("turtle")\nminiTurtle.color("green")\nminiTurtle.forward(120)\nminiTurtle.hideturtle()\nminiTurtle.pencolor("blue")\nminiTurtle.write("هذا خط", align="center", font=(12,"calibri"))' },
    { h: 'رسم شخص بسيط', p: '١٥٨', code: 'from turtle import *\nt=Turtle()\nt.shapesize(2)\n# draw the head\nt.color("black")\nt.circle(70)\nt.penup()\n# draw the eyes\nt.goto(-30, 80)\nt.pendown()\nt.circle(10)\nt.penup()\nt.goto(30, 80)\nt.pendown()\nt.circle(10)\nt.penup()\n# draw mouth\nt.goto(-30, 60)\nt.pendown()\nt.right(90)\nt.circle(30,180)\nt.penup()\n# draw body\nt.goto(0, 0)\nt.pendown()\nt.right(180)\nt.forward(150)\nt.penup()\n# arms\nt.goto(0, -40)\nt.pendown()\nt.right(45)\nt.forward(80)\nt.penup()\nt.goto(0, -40)\nt.pendown()\nt.right(270)\nt.forward(80)\nt.penup()\n# feet\nt.goto(0, -150)\nt.pendown()\nt.right(45)\nt.right(45)\nt.forward(70)\nt.penup()\nt.goto(0, -150)\nt.pendown()\nt.right(270)\nt.forward(70)\nt.hideturtle()', note: 'عدّلت أرقام الذراعين والقدمين قليلًا لتظهر الصورة كاملة في نافذة المعمل.' },
    { h: 'اختبري نفسك (س١٤): الوجه المبتسم', p: '١٧٥', code: 'from turtle import *\nt=Turtle()\nt.shapesize(2)\nt.color("black")\nt.begin_fill()\nt.circle(100)\nt.fillcolor("yellow")\nt.end_fill()\nt.penup()\nt.goto(-40, 100)\nt.color("black")\nt.begin_fill()\nt.circle(15)\nt.color("black")\nt.end_fill()\nt.penup()\nt.goto(40, 100)\nt.pendown()\nt.color("black")\nt.begin_fill()\nt.circle(15)\nt.color("black")\nt.end_fill()\nt.penup()\nt.goto(-40, 60)\nt.pendown()\nt.pensize(5)\nt.right(90)\nt.circle(40,180)\nt.penup()\nt.hideturtle()' },
  ] },

  { t: 'match', title: 'تدريب ١: صِلي الأمر بالشرح', p: '١٥٩', pairs: [['miniTurtle.pensize(4)', 'يحدد حجم القلم للرسم'], ['miniTurtle.color("green")', 'يحدد لون السلحفاة'], ['miniTurtle.shapesize(2)', 'يحدد حجم السلحفاة'], ['miniTurtle.hideturtle()', 'يخفي السلحفاة'], ['miniTurtle.penup()', 'يرفع القلم فتتحرك دون رسم']], mono: 'l' },

  { t: 'code', title: 'تحدي الرسم: المستطيل', p: '١٥٥',
    task: 'اجعلي السلحفاة ترسم <b>مستطيلًا</b> طوله 150 وعرضه 80.',
    starter: 'from turtle import*\nminiTurtle=Turtle()\nminiTurtle.shape("turtle")\nminiTurtle.color("green")\n',
    checks: [ { py: 'sum(1 for e in __import__("turtle")._log if e[0]=="line")>=4', msg: 'أربعة أضلاع' }, { py: 'len(set(round(((e[3]-e[1])**2+(e[4]-e[2])**2)**.5) for e in __import__("turtle")._log if e[0]=="line"))==2', msg: 'ضلعان مختلفا الطول (150 و 80)' }, { py: 'sum(1 for e in __import__("turtle")._log if e[0]=="turn")>=3', msg: 'الاستدارة بين الأضلاع' } ],
    hint: 'miniTurtle.forward(150)\nminiTurtle.left(90)\nminiTurtle.forward(80)\nminiTurtle.left(90)\n...', sol: 'from turtle import*\nminiTurtle=Turtle()\nminiTurtle.shape("turtle")\nminiTurtle.color("green")\nminiTurtle.forward(150)\nminiTurtle.left(90)\nminiTurtle.forward(80)\nminiTurtle.left(90)\nminiTurtle.forward(150)\nminiTurtle.left(90)\nminiTurtle.forward(80)' },

  { t: 'code', title: 'تحدي الرسم: بيت ونص', p: '١٦٠ (تدريب ٣)',
    task: 'ادمجي الأشكال: ارسمي <b>مربعًا</b> للبيت، و<b>مثلثًا</b> فوقه للسقف، ثم اكتبي كلمة <code>بيتي</code> بالدالة write.',
    starter: 'from turtle import*\nt=Turtle()\nt.shape("turtle")\n',
    checks: [ { py: 'sum(1 for e in __import__("turtle")._log if e[0]=="line")>=6', msg: 'ستة أضلاع على الأقل (مربع + مثلث)' }, { py: 'any(e[0]=="turn" and abs(e[1]) in (120,60) for e in __import__("turtle")._log)', msg: 'استدارة المثلث (120 أو 60)' }, { py: 'any(e[0]=="write" for e in __import__("turtle")._log)', msg: 'كتابة نص بـ write' } ],
    hint: 'for i in range(4): ... أو كرري forward و left(90)\nثم: t.left(90) … وللمثلث left(120)', sol: 'from turtle import*\nt=Turtle()\nt.shape("turtle")\nt.forward(100)\nt.left(90)\nt.forward(100)\nt.left(90)\nt.forward(100)\nt.left(90)\nt.forward(100)\nt.left(90)\nt.penup()\nt.goto(0,100)\nt.pendown()\nt.color("brown")\nt.forward(100)\nt.left(120)\nt.forward(100)\nt.left(120)\nt.forward(100)\nt.penup()\nt.goto(50,30)\nt.color("blue")\nt.write("بيتي", align="center", font=(16,"calibri"))\nt.hideturtle()' },
  { t: 'master' },
] },

/* ==================== مشروع الوحدة ==================== */
{ id: 'ap', n: 6, title: 'مشروع الوحدة: متجر الأجهزة المستعملة', pages: '١٦١', icon: 'trophy', project: 1,
  skills: ['أصمم خوارزمية ومخططًا انسيابيًا وبرنامجًا لمشكلة حقيقية'],
  acts: [
  { t: 'comic', title: 'قصة: مشروع كودة وبيثو', goal: 'مشروع صغير لبيع الأجهزة الإلكترونية المستعملة.',
    panels: [
      { w: 'k', m: 'happy', s: 'سأفتح مع بيثو متجرًا صغيرًا لبيع الأجهزة المستعملة وملحقاتها!' },
      { w: 'b', m: 'wink', s: 'طريقة السداد: 30٪ من المبلغ مقدمًا، والباقي على 6 أقساط متساوية.' },
      { w: 'k', m: 'think', s: 'إذن البرنامج يقرأ السعرين، ويحسب: التكلفة الإجمالية، والمقدم، وقيمة القسط.' },
      { w: 'b', m: 'happy', s: 'خوارزمية ← مخطط انسيابي ← بايثون، ثم نقارن بالحساب على الورق!' },
    ] },
  { t: 'mission', title: 'الخوارزمية والمخطط', goal: 'ابني خطة المشروع قبل الكود.', story: 'جهاز سعره 800 وملحقاته 400. خططي للبرنامج.',
    missions: [
      { type: 'FIND IT', ar: 'المدخلات', q: 'ما مدخلات البرنامج؟', o: ['سعر الجهاز وسعر الملحقات', 'قيمة القسط', 'عدد الأقساط فقط'], a: 0, r: 'C' },
      { type: 'BUILD IT', ar: 'الخوارزمية', kind: 'order', q: 'رتّبي خطوات الخوارزمية:', lines: ['أدخل سعر الجهاز وسعر الملحقات', 'التكلفة الإجمالية = سعر الجهاز + سعر الملحقات', 'المقدم = التكلفة الإجمالية × 0.30', 'القسط = (التكلفة الإجمالية − المقدم) ÷ 6', 'اعرض التكلفة والمقدم والقسط'], r: 'A' },
      { type: 'MATCH IT', ar: 'المخطط', kind: 'match', q: 'طابقي الخطوة بالشكل:', pairs: [['أدخل سعر الجهاز', '▱ متوازي أضلاع'], ['احسب المقدم', '▭ مستطيل'], ['البداية', '⬭ بيضاوي'], ['اعرض القسط', '▱ إخراج']], r: 'S' },
      { type: 'DECIDE IT', ar: 'على الورق', q: 'الجهاز 800 والملحقات 400. كم المقدم؟', o: ['360', '240', '120'], a: 0, r: 'H', why: '(800+400) × 0.30 = 360' },
    ],
    code: 'CASH',
    final: { q: 'وكم قيمة القسط الواحد؟', o: ['140', '200', '120', '84'], a: 0, why: '(1200 − 360) ÷ 6 = 140' } },
  { t: 'code', title: 'المشروع: برنامج الأقساط', p: '١٦١', project: 1,
    task: 'اكتبي برنامجًا يقرأ <code>device</code> (سعر الجهاز) و <code>acc</code> (سعر الملحقات)، ويحسب:<br>• <code>total</code> التكلفة الإجمالية<br>• <code>upfront</code> المقدم (30٪)<br>• <code>installment</code> قيمة القسط (الباقي على 6 أقساط)<br>ثم يعرضها. جرّبي 800 و 400 وقارني بحسابك على الورق.',
    starter: 'device=float(input("سعر الجهاز: "))\n',
    checks: [ { py: 'total==device+acc', msg: 'التكلفة الإجمالية = الجهاز + الملحقات' }, { py: 'abs(upfront-total*0.3)<0.01', msg: 'المقدم 30٪' }, { py: 'abs(installment-(total-upfront)/6)<0.01', msg: 'القسط = الباقي ÷ 6' }, { lines: 3, msg: 'عرض النتائج الثلاث' } ],
    hint: 'acc=float(input("سعر الملحقات: "))\ntotal=device+acc\nupfront=total*0.30\ninstallment=(total-upfront)/6', sol: 'device=float(input("سعر الجهاز: "))\nacc=float(input("سعر الملحقات: "))\ntotal=device+acc\nupfront=total*0.30\ninstallment=(total-upfront)/6\nprint("التكلفة الإجمالية:", total)\nprint("المبلغ المقدم:", upfront)\nprint("قيمة كل قسط:", installment)' },
  { t: 'master' },
] },

/* ==================== اختبري نفسك ==================== */
{ id: 'ae', n: 7, title: 'اختبري نفسك: الوحدة الرابعة', pages: '١٧١–١٧٥', icon: 'star', exam: 1,
  skills: ['أراجع مهارات الوحدة كاملة'],
  acts: [
  { t: 'quiz', title: 'أسئلة «اختبر نفسك» من الكتاب', items: [
    { q: 'السؤال الثامن: أي شكل يمثل «هل x رقم موجب؟»', o: ['المعيّن (اتخاذ قرار)', 'البيضاوي', 'متوازي الأضلاع', 'المستطيل'], a: 0 },
    { q: 'السؤال الثامن: أي شكل يمثل a=5 ؟', o: ['المستطيل (عملية)', 'المعيّن', 'البيضاوي'], a: 0 },
    { q: 'السؤال التاسع: ما المرحلة الأولى في إنشاء البرنامج؟', o: ['تحديد المشكلة وكتابة الخطوات اللازمة لحلها', 'كتابة المقطع البرمجي', 'رسم المخطط الانسيابي'], a: 0 },
    { q: 'السؤال العاشر: أي اسم يصلح اسمًا لمتغير؟', o: ['Name', '234', 'A/2', 'محمد'], a: 0 },
    { q: 'السؤال العاشر: ماذا يعرض الأمر؟', code: 'name="محمد"\nprint("اسمي: ", name)', o: ['اسمي: محمد', 'اسمي: name', 'name'], a: 0 },
    { q: 'السؤال العاشر: نوع المتغير MyVar', code: 'MyVar = "محمد"', o: ['متغير نصي', 'متغير عددي', 'ليس بمتغير'], a: 0 },
    { q: 'السؤال الحادي عشر: ما الناتج؟', code: 'x=20\ny=30\nx=y\ny=x\nTotal=x+y\nprint("مجموع x و y يساوي:", Total)', o: ['60', '50', '70'], a: 0, why: 'بعد x=y صار x=30، ثم y=x فبقيت y=30: المجموع 60.' },
    { q: 'السؤال الثاني عشر: الأمر لعرض المجموع', o: ['print("مجموع x و y و n يساوي:", Total)', 'input("اكتب المجموع")', 'print (x,y,n)'], a: 0, mono: 1 },
    { q: 'السؤال الثاني عشر: لطلب قيمة المتغير y من المستخدم', o: ['y=int(input("أدخل قيمة y: "))', 'print("أدخل قيمة y: ",y)', 'int("أدخل قيمة y: ")'], a: 0, mono: 1 },
    { q: 'السؤال الثالث عشر: نوع "email"', o: ['string', 'integer', 'float'], a: 0 },
    { q: 'السؤال الثالث عشر: نوع 5', o: ['integer', 'string', 'float'], a: 0 },
    { q: 'السؤال الرابع عشر: لتلوين داخل الوجه بالأصفر نكتب بين begin_fill و end_fill:', o: ['t.fillcolor("yellow")', 't.pensize("yellow")', 't.shape("yellow")'], a: 0, mono: 1 },
    { q: 'السؤال الرابع عشر: لتحريك السلحفاة دون رسم قبل goto نكتب:', o: ['t.penup()', 't.pendown()', 't.hideturtle()'], a: 0, mono: 1 },
  ] },
  { t: 'master' },
] },
];

const JEOP = {
  cats: ['الخوارزميات والمخططات', 'المتغيرات', 'الإدخال والأنواع', 'المعاملات', 'السلحفاة'],
  q: [
    [ { q: 'ما الشكل الذي يمثل البداية والنهاية؟', a: 'البيضاوي', m: 'DRAW IT' }, { q: 'رتّبي مراحل إنشاء البرنامج', a: 'المشكلة ← الخوارزمية ← المخطط ← البرنامج', m: 'ORDER IT', sp: 'all' }, { q: 'ما مدخلات ومخرجات وصفة الطعام؟', a: 'المكونات / الطبق', m: 'SHOW IT' }, { q: 'ارسمن مخطط متوسط رقمين', a: 'بداية ← إدخال ← عملية ← إخراج ← نهاية', m: 'DRAW IT', sp: 'double' }, { q: 'خوارزمية تحويل الكيلومترات للأميال: نضرب أم نقسم على 1.61؟ برّرن', a: 'نقسم، لأن الميل أكبر', m: 'DEFEND IT', sp: 'risk' } ],
    [ { q: 'هل 2AB اسم صالح؟', a: 'لا، يبدأ برقم', m: 'SHOW IT' }, { q: 'x=15\ny=20\nprint(x+y)', a: '35', m: 'SHOW IT', sp: 'all' }, { q: 'ما فائدة التعليقات #؟', a: 'تلميحات لا ينفذها الحاسب', m: 'DEFEND IT' }, { q: 'x=20\ny=30\nx=y\ny=x\nprint(x+y)', a: '60', m: 'ACT IT', sp: 'double' }, { q: 'اكتبن برنامج السباق الثلاثي بثلاثة متغيرات ومجموعها', a: 'Swimming… + Cycling… + Running…', m: 'BUILD IT' } ],
    [ { q: 'ما نوع True؟', a: 'bool', m: 'SHOW IT' }, { q: 'ما نوع "5"؟', a: 'str', m: 'SHOW IT', sp: 'all' }, { q: 'x=input() أدخلنا 10 و 5 ثم x+y. ما الناتج؟', a: '105', m: 'EVIDENCE IT' }, { q: 'كيف نصلح المشكلة السابقة؟', a: 'int(input())', m: 'BUILD IT' }, { q: 'لدرجة حرارة 36.6: int أم float؟ ولماذا؟', a: 'float لأنها عشرية', m: 'DEFEND IT', sp: 'risk' } ],
    [ { q: 'رمز الأس في بايثون؟', a: '**', m: 'SHOW IT' }, { q: 'print(4 + 2 * 5)', a: '14', m: 'SHOW IT', sp: 'all' }, { q: 'x=6\nx*=3\nprint(x)', a: '18', m: 'ACT IT' }, { q: 'اكتبن x² + 2ab + b² ببايثون', a: 'a**2+2*a*b+b**2', m: 'BUILD IT', sp: 'double' }, { q: 'a=15, b=5: c=(a+b)/4 ، d=2*b-a/3 ، e=(c+d)*2. ما e؟', a: '20.0', m: 'EVIDENCE IT', sp: 'risk' } ],
    [ { q: 'من أين تبدأ السلحفاة؟', a: '(0,0) منتصف النافذة', m: 'ACT IT' }, { q: 'كم درجة تستدير السلحفاة لرسم مربع؟', a: '90', m: 'ACT IT', sp: 'all' }, { q: 'ما الأمر الذي يرفع القلم؟', a: 'penup()', m: 'SHOW IT' }, { q: 'ارسمن ما يرسمه: forward(100) left(120) ×3', a: 'مثلث', m: 'DRAW IT' }, { q: 'اكتبن كودًا يرسم دائرة صفراء ممتلئة', a: 'color، begin_fill، circle، end_fill', m: 'BUILD IT', sp: 'risk' } ],
  ],
  final: { q: 'التحدي النهائي: صمّمن برنامجًا يحسب سعر رحلة مدرسية: يُدخل المستخدم عدد الطالبات وسعر التذكرة، ويحسب الإجمالي، ثم خصم 10٪، ويعرض المبلغ النهائي. اكتبن الخوارزمية والمخطط والكود.', a: 'n=int(input()) • price=float(input()) • total=n*price • final=total-total*0.10 • print(final)' },
};
const MODES = {
  'SHOW IT': 'كل الطالبات يرفعن الإجابة معًا: 3…2…1 SHOW!', 'BUILD IT': 'كل عضوة تضيف جزءًا من الحل.', 'ACT IT': 'المجموعة تمثّل الإجابة بالحركة.',
  'DRAW IT': 'كل عضوة ترسم جزءًا على السبورة.', 'EVIDENCE IT': 'كل طالبة تقدّم دليلًا من الدرس.', 'ORDER IT': 'كل طالبة تحمل بطاقة وتقف في الترتيب الصحيح.', 'DEFEND IT': 'الفريق يختار إجابة ثم تبرّرها عضوتان.',
};
