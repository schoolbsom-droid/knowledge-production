// محتوى المعمل: الوحدة الرابعة «البرمجة مع بايثون» — المهارات الرقمية ثالث متوسط ف١ ١٤٤٨هـ (ص١٣٣–٢٢٤)
// كل درس = محطة. كل نشاط له نوع t:
// comic قصة مصورة | run جرّبي بنفسك | traffic إشارة المرور | tpr استجيبي | mission المهمة السرية
// prints لغز البصمات | match طابقي | quiz اختاري | code تحدي البرمجة | explore مستكشف | master بطاقة الإتقان
'use strict';
const LESSONS = [
/* ==================== الدرس ١ ==================== */
{ id: 'l1', n: 1, title: 'القوائم وصفوف البيانات', pages: '١٣٣–١٤٧', icon: 'list',
  skills: ['أميّز بين هياكل البيانات', 'أستخدم القوائم والصفوف لتخزين البيانات'],
  acts: [
  { t: 'comic', title: 'قصة: درجات كودة الأربع', goal: 'تتعرفين على القائمة والصف والفرق بينهما.',
    panels: [
      { w: 'k', m: 'happy', s: 'مرحبًا! أنا كودة 🤖 عندي درجات ٤ اختبارات… هل أصنع ٤ متغيرات؟' },
      { w: 'b', m: 'wink', s: 'ما يحتاج! القائمة List تحفظها كلها في متغير واحد بين أقواس مربعة:', code: 'grades=[89,88,98,95]' },
      { w: 'b', m: 'happy', s: 'كل عنصر له رقم موقع اسمه «الفهرس»، والعدّ يبدأ من 0 لا من 1!', code: 'print(grades[0])   # 89\nprint(grades[-1])  # 95' },
      { w: 'k', m: 'think', s: 'وإذا أردتُ حفظ بيانات لا يجب أن تتغير أبدًا، مثل رقم الهوية والبريد؟' },
      { w: 'b', m: 'happy', s: 'استخدمي الصف Tuple بأقواس دائرية. إنه مقفل 🔒 لا يقبل التعديل، فهو أكثر أمانًا.', code: 'PersonalInfo=("Khaled","khaled@edu.sa",1234)' },
      { w: 'k', m: 'wow', s: 'إذن الفرق بينهما هو… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة الأخيرة بأدق جملة:', o: ['القائمة [ ] قابلة للتعديل، والصف ( ) غير قابل للتعديل', 'الصف أسهل في التعديل من القائمة', 'القائمة يبدأ ترقيمها من 1 والصف من 0', 'لا فرق بينهما إلا الاسم'], a: 0, why: 'القائمة بين أقواس مربعة ويمكن تعديل عناصرها، والصف بين أقواس دائرية ولا يمكن تعديله بعد إنشائه. وكلاهما يبدأ ترقيمه من 0.' } },

  { t: 'run', title: 'جرّبي بنفسك: القوائم', goal: 'شغّلي أمثلة الكتاب، وعدّلي فيها وراقبي الناتج.', items: [
    { h: 'إنشاء قائمة وطباعة عناصرها بالتكرار for', p: '١٣٥', code: 'fruits=["apple","orange","banana"]\nfor f in fruits:\n    print(f)' },
    { h: 'الفهرسة السالبة', p: '١٣٦', code: 'fruits=["apple","orange","banana"]\nprint(fruits[-1])\nprint(fruits[-2])',
      predict: { q: 'توقّعي قبل التشغيل: ما أول كلمة ستظهر؟', o: ['banana', 'apple', 'orange', 'رسالة خطأ'], a: 0 } },
    { h: 'تعديل عنصر في القائمة', p: '١٣٦', code: 'fruits=["apple","orange","banana"]\nfruits[1]="grape"\nprint(fruits)',
      predict: { q: 'ماذا ستطبع print(fruits)؟', o: ["['apple', 'grape', 'banana']", "['grape', 'orange', 'banana']", "['apple', 'orange', 'grape']"], a: 0 } },
    { h: 'الدوال الجاهزة len و sum و max و min', p: '١٣٧–١٣٨', code: 'grades=[89,88,98,95]\nprint("The number of elements:", len(grades))\nprint("The sum of the grades is:", sum(grades))\nprint("The maximum grade is:", max(grades))\nprint("The minimum grade is:", min(grades))' },
    { h: 'ماذا تلاحظين؟ min مع الحروف', p: '١٣٨', code: 'letters=["b", "a", "x"]\nminLetter=min(letters)\nprint("The smallest letter is: ",minLetter)', note: 'مع الحروف تقارن بايثون حسب الترتيب الأبجدي، فأصغر حرف هو a.' },
    { h: 'دوال القائمة: append و remove و count و sort و reverse و clear', p: '١٣٩–١٤١', code: 'grades=[89,88,98,95]\ngrades.append(100)\ngrades.remove(88)\nprint(grades)\ngrades.sort()\nprint(grades)\ngrades.reverse()\nprint(grades)\nprint(grades.count(95))\ngrades.clear()\nprint(grades)' },
    { h: 'إدخال عناصر القائمة من المستخدمة', p: '١٣٩', code: 'subjects=[ ]\nfor i in range(3):\n    print("type the name of the subject",i)\n    subjects.append((input()))\nprint(subjects)', note: 'ستظهر لكِ نافذة صغيرة لكتابة اسم المادة ثلاث مرات.' },
    { h: 'ماذا يحدث إذا حاولنا تعديل الصف؟', p: '١٤٤', code: 'PersonalInfo =("Khaled","khaled@edu.sa", 1234)\nPersonalInfo[0]="Saad"\nprint(PersonalInfo[0])',
      predict: { q: 'توقّعي: ماذا سيحدث؟', o: ['يطبع Saad', 'يطبع Khaled', 'تظهر رسالة خطأ'], a: 2 } },
  ] },

  { t: 'traffic', title: 'إشارة المرور: القوائم والصفوف', goal: 'نفس الألوان الثلاثة، لكن معناها يتغير في كل محطة.',
    show: [
      { s: 'ترقيم عناصر القائمة يبدأ من 1.', a: 'r', fix: 'يبدأ الترقيم من 0.' },
      { s: 'fruits[-1] تعطي آخر عنصر في القائمة.', a: 'g', fix: 'صحيحة: الفهرس -1 يشير إلى آخر عنصر.' },
      { s: 'القائمة تُكتب بين أقواس دائرية ( ).', a: 'r', fix: 'القائمة بين أقواس مربعة [ ]، والأقواس الدائرية للصف.' },
      { s: 'الدالة append() تضيف عنصرًا جديدًا إلى القائمة في بدايتها.', a: 'y', fix: 'تضيف العنصر فعلًا، لكن في نهاية القائمة لا في بدايتها.' },
      { s: 'الدالة sum() تجمع عناصر أي قائمة، حتى لو كانت نصوصًا.', a: 'y', fix: 'تجمع العناصر، لكنها تتعامل مع القيم العددية فقط.' },
      { s: 'يمكن تعديل الصف بكتابة PersonalInfo[0]="Saad".', a: 'r', fix: 'الصف غير قابل للتعديل، وستظهر رسالة خطأ TypeError.' },
    ],
    opinion: [
      { s: 'أعتقد أن الصف أنسب من القائمة لحفظ رقم الهوية.' },
      { s: 'إحدى الطالبات قالت: «القائمة أفضل دائمًا لأنها تقبل التعديل».' },
      { s: 'من وجهة نظري، الفهرسة السالبة تسهّل الوصول إلى آخر العناصر.' },
      { s: 'يمكننا القول إن sort() و reverse() تؤديان العمل نفسه.' },
    ],
    move: [
      { s: 'تريدين حفظ درجات تتغير كل أسبوع في قائمة. هل نكمل؟', a: 'g', why: 'القائمة مناسبة للبيانات المتغيرة.' },
      { s: 'كتبتِ print(fruits[3]) والقائمة فيها ٣ عناصر فقط. هل نشغّل؟', a: 'r', why: 'آخر فهرس هو 2، فسيظهر خطأ IndexError.' },
      { s: 'تريدين حذف "dairy" بالأمر groceryList.remove("dairy"). هل نكمل؟', a: 'g', why: 'remove() تحذف عنصرًا محددًا من القائمة.' },
      { s: 'تريدين معرفة عدد عناصر القائمة ولا تتذكرين: len أم count؟', a: 'y', why: 'توقفي وفكري: len() تعد العناصر، و count(x) تعد مرات ظهور عنصر محدد.' },
      { s: 'تريدين ترتيب قائمة فيها أرقام ونصوص معًا بـ sort().', a: 'r', why: 'لا يمكن ترتيب أو مقارنة أرقام ونصوص معًا.' },
    ] },

  { t: 'mission', title: 'المهمة السرية: ملف المتجر', goal: 'خمس مهمات، كل مهمة تعطيكِ حرفًا من الرمز السري. لا تُفتح المهمة النهائية إلا بالرمز كاملًا.',
    story: 'وصلنا ملف سري من متجر «ريم» الإلكتروني. بيانات المتجر مبعثرة، ومهمتكِ ترتيبها بالقوائم والصفوف.',
    missions: [
      { type: 'FIND IT', ar: 'اكتشفي', q: 'ما قيمة C[3]؟', code: 'C=["red", "orange", "green", "blue", "white"]', o: ['blue', 'green', 'white', 'orange'], a: 0, r: 'T', why: 'العدّ من 0: red=0، orange=1، green=2، blue=3.' },
      { type: 'FIX IT', ar: 'صحّحي', q: 'في هذا الكود خطأ. ما الإصلاح؟', code: 'prices=(25,40,15)\nprices.append(30)', o: ['نكتب الأسعار بين أقواس مربعة [ ] لأن الصف لا يقبل الإضافة', 'نكتب Append بحرف كبير', 'نضع 30 بين علامتي تنصيص'], a: 0, r: 'U', why: 'الصف ثابت لا يقبل append، أما القائمة فتقبلها.' },
      { type: 'MATCH IT', ar: 'طابقي', kind: 'match', q: 'طابقي كل دالة بعملها:', pairs: [['len()', 'عدد عناصر القائمة'], ['max()', 'أكبر عنصر'], ['count(x)', 'عدد مرات ظهور x'], ['clear()', 'حذف جميع العناصر']], r: 'P' },
      { type: 'BUILD IT', ar: 'ابني', kind: 'order', q: 'رتّبي الأسطر ليضيف البرنامج سعرًا جديدًا ثم يطبع الأسعار مرتبة تصاعديًا:', lines: ['prices=[25,40,15]', 'prices.append(30)', 'prices.sort()', 'print(prices)'], r: 'L' },
      { type: 'DECIDE IT', ar: 'قرّري', q: 'المتجر يريد حفظ أيام الدوام (الأحد إلى الخميس) لتبقى ثابتة لا تتغير. الأنسب:', o: ['صف Tuple', 'قائمة List', 'متغير منفصل لكل يوم'], a: 0, r: 'E', why: 'البيانات الثابتة التي لا نحتاج لتغييرها مكانها الصف.' },
    ],
    code: 'TUPLE',
    final: { story: 'فُتح الظرف النهائي! ريم تبرمج متجرها: أسعار المنتجات تتغير مع العروض، أما بيانات المتجر (الاسم، السجل التجاري، رقم التواصل) فثابتة.', q: 'أنقذي الخطة: ما أفضل تصميم؟', o: ['الأسعار في قائمة لأنها تتغير، وبيانات المتجر في صف لأنها ثابتة وآمنة', 'الكل في صف واحد', 'الكل في قائمة لأنها أسهل', 'الأسعار في صف، وبيانات المتجر في قائمة'], a: 0, why: 'استخدمي الدليل من المهمات: الصف لا يقبل الإضافة (FIX IT)، والقائمة تُرتَّب وتُعدَّل (BUILD IT)، والبيانات الثابتة للصف (DECIDE IT).' } },

  { t: 'code', title: 'تحدي البرمجة: قائمة المواد', p: '١٤٧ (تدريب ٣)',
    task: 'اكتبي برنامجًا ينفذ الآتي:<br>١. أنشئي القائمة <code>Subject</code> وفيها: Arabic, Math, Social, Biology<br>٢. اطبعي العنصر الثالث (فهرسه 2)<br>٣. اجعلي قيمة العنصر الثالث <code>"English"</code><br>٤. اطبعي القائمة بعد التعديل',
    starter: 'Subject=["Arabic","Math","Social","Biology"]\n# اطبعي العنصر الثالث\n\n# عدّلي العنصر الثالث\n\n# اطبعي القائمة\n',
    checks: [
      { py: 'isinstance(Subject, list) and len(Subject)==4', msg: 'القائمة Subject فيها ٤ عناصر' },
      { out: 'Social', msg: 'طباعة العنصر الثالث Social' },
      { py: 'Subject[2]=="English"', msg: 'العنصر الثالث أصبح English' },
      { out: "\\['Arabic', 'Math', 'English', 'Biology'\\]", msg: 'طباعة القائمة بعد التعديل' },
    ],
    hint: 'العنصر الثالث فهرسه 2: print(Subject[2]) ثم Subject[2]="English"',
    sol: 'Subject=["Arabic","Math","Social","Biology"]\nprint(Subject[2])\nSubject[2]="English"\nprint(Subject)' },

  { t: 'code', title: 'تحدي البرمجة: صف معلوماتي', p: '١٤٧ (تدريب ٤)',
    task: 'أنشئي الصف <code>Info</code> وفيه ٤ عناصر: اسمك، صفك، عمرك، درجتك في المهارات الرقمية.<br>اطبعيه كاملًا بـ print، ثم اطبعي عناصره عنصرًا بعد الآخر بالتكرار for.',
    starter: 'Info=("نورة","ثالث متوسط",15,98)\n',
    checks: [
      { py: 'isinstance(Info, tuple) and len(Info)==4', msg: 'Info صف فيه ٤ عناصر' },
      { py: '"for" in _lab_code', msg: 'استخدام التكرار for' },
      { lines: 5, msg: 'طباعة الصف ثم كل عنصر في سطر' },
    ],
    hint: 'print(Info)\nfor x in Info:\n    print(x)',
    sol: 'Info=("نورة","ثالث متوسط",15,98)\nprint(Info)\nfor x in Info:\n    print(x)' },

  { t: 'master' },
] },

/* ==================== الدرس ٢ ==================== */
{ id: 'l2', n: 2, title: 'المكتبات البرمجية', pages: '١٤٨–١٧٠', icon: 'lib',
  skills: ['أستخدم النماذج البرمجية', 'أستخدم المكتبات البرمجية لإنشاء مقطع برمجي في بايثون'],
  acts: [
  { t: 'comic', title: 'قصة: مكتبة المدرسة السحرية', goal: 'تتعرفين على المكتبة والنموذج والدالة وطرق الاستيراد.',
    panels: [
      { w: 'k', m: 'think', s: 'أريد حساب الجذر التربيعي للعدد 20… هل أكتب خوارزمية كاملة من الصفر؟' },
      { w: 'b', m: 'happy', s: 'لا داعي! المكتبة البرمجية مثل مكتبة المدرسة: تعليمات جاهزة تستعيرينها متى شئتِ.' },
      { w: 'b', m: 'wink', s: 'المكتبة القياسية فيها نماذج Modules، وفي كل نموذج دوال Functions.', code: 'import math\nprint(math.sqrt(20))' },
      { w: 'k', m: 'wow', s: 'وكم طريقة للاستيراد؟' },
      { w: 'b', m: 'happy', s: 'ثلاث طرق:', code: 'from math import *        # الكل\nfrom math import sqrt, pi # دوال محددة\nimport math               # الأفضل' },
      { w: 'k', m: 'think', s: 'إذن ترتيبها من الأكبر إلى الأصغر هو… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['المكتبة ← النموذج ← الدالة', 'الدالة ← النموذج ← المكتبة', 'النموذج ← المكتبة ← الدالة'], a: 0, why: 'الدالة جزء من النموذج، والنموذج جزء من المكتبة القياسية.' } },

  { t: 'run', title: 'جرّبي بنفسك: نماذج المكتبة القياسية', items: [
    { h: 'النموذج math: الثوابت الرياضية', p: '١٥٨', code: 'import math\nprint(math.pi)\nprint(math.e)' },
    { h: 'تحويل الزوايا والدوال المثلثية', p: '١٥٨–١٥٩', code: 'import math\nprint(math.radians(60))\nprint(math.sin(math.radians(60)))\nprint(math.cos(math.radians(60)))' },
    { h: 'الأسس والجذور واللوغاريتمات', p: '١٥٩', code: 'import math\nprint(math.pow(2,8))\nprint(math.sqrt(20))\nprint(math.log10(10))',
      predict: { q: 'توقّعي: ماذا تطبع math.pow(2,8)؟', o: ['256.0', '16', '64.0', '28'], a: 0 } },
    { h: 'السقف والأرضية (انتبهي للسالب!)', p: '١٦٠', code: 'import math\nprint(math.ceil(10.1657))\nprint(math.floor(10.1657))\nprint(math.floor(-10.1657))',
      predict: { q: 'ما ناتج math.floor(-10.1657)؟', o: ['-11', '-10', '10'], a: 0 } },
    { h: 'جرّبي الدالتين على الرقم 3.4-', p: '١٦٠', code: 'import math\nprint(math.ceil(-3.4))\nprint(math.floor(-3.4))' },
    { h: 'النموذج time: الوقت واليوم', p: '١٦١', code: 'import time\nprint(time.strftime("%H:%M"), time.strftime("%A %p"))' },
    { h: 'النموذج datetime: تاريخ اليوم بالتفصيل', p: '١٦١–١٦٢', code: 'import datetime\nprint(datetime.date.today())\nprint(datetime.date.today().day)\nprint(datetime.date.today().month)\nprint(datetime.date.today().year)' },
    { h: 'كم يومًا بقي على ذكرى يوم التأسيس؟', p: '١٦٢', code: 'from datetime import date\ntoday = date.today()\nprint("Today is:",today)\nfoundationDay = date(today.year, 2, 22)\nif foundationDay < today:\n    foundationDay = foundationDay.replace(year=today.year + 1)\nprint("The Foundation day is on",foundationDay)\ntime_to_foundationDay = foundationDay - today\nprint("Days left for the Foundation Day:",time_to_foundationDay.days)' },
    { h: 'النموذجان sys و os', p: '١٥٤–١٥٦', code: 'import sys, os\nprint(sys.version)\nprint(sys.platform)\nprint(os.getcwd())\nprint(os.listdir())', note: 'المعمل يعمل داخل المتصفح، لذلك يظهر نظام التشغيل emscripten والمسار /home/pyodide. في PyCharm سترين win32 ومسار جهازك.' },
    { h: 'الدالة dir(): ماذا يحتوي النموذج؟', p: '١٥٧', code: 'import math\nprint(dir(math))' },
    { h: 'تدريب ١: هل هذه الدقيقة فردية؟', p: '١٦٩', code: 'from datetime import datetime\nodds=[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,\n41,43,45,47,49,51,53,55,57,59]\nright_this_minute = datetime.today().minute\nif right_this_minute in odds:\n    print("This minute is odd.")\nelse:\n    print("Not odd.")' },
  ] },

  { t: 'match', title: 'طابقي: النموذج المناسب للمهمة', goal: 'اضغطي على عنصر من اليمين ثم ما يناسبه من اليسار.', pairs: [
    ['sys', 'معرفة نسخة بايثون ونظام التشغيل'], ['os', 'المجلد الحالي ومحتوياته getcwd()'], ['math', 'الدوال الرياضية مثل sqrt()'],
    ['datetime', 'التعامل مع التواريخ'], ['tkinter', 'الواجهة الرسومية ولوحة الرسم'], ['pygame', 'مكتبة خارجية للألعاب تُثبَّت بـ PIP'] ], mono: 'l' },

  { t: 'prints', title: 'لغز البصمات: قضية الدالة المفقودة', goal: 'كل بصمة فيها ٣ أسئلة مخفية. حلّي البصمات الخمس لتفتحي القضية.',
    scene: { title: 'لوحة الأدلة', clues: ['import math', 'from datetime import date', 'math.floor(-3.4) = ?', 'أكثر من 200 نموذج', 'pip install pygame', 'dir(os)', 'sqrt(25) ← NameError ⚠', 'PyPI 📦'] },
    prints: [
      [ { q: 'صح أم خطأ: مكتبة بايثون القياسية تُثبَّت تلقائيًا مع بايثون.', o: ['صح', 'خطأ'], a: 0 },
        { q: 'أكملي: الدالة جزء من …', o: ['النموذج', 'المتغير', 'الملف النصي'], a: 0 },
        { q: 'أي سطر يستورد النموذج كاملًا مع ذكر اسمه قبل الدالة؟', o: ['import math', 'from math import sqrt', 'math import *'], a: 0, mono: 1 } ],
      [ { q: 'صنّفي pygame:', o: ['مكتبة خارجية تُثبَّت بـ PIP', 'نموذج في المكتبة القياسية', 'دالة في math'], a: 0 },
        { q: 'أي نموذج يعرض نظام التشغيل؟', o: ['sys', 'math', 'time'], a: 0, mono: 1 },
        { q: 'أي نموذج يعرض المجلد الحالي؟', o: ['os', 'datetime', 'tkinter'], a: 0, mono: 1 } ],
      [ { q: 'ما ناتج math.floor(-3.4)؟', o: ['-4', '-3', '3'], a: 0, mono: 1 },
        { q: 'ما ناتج math.ceil(-3.4)؟', o: ['-3', '-4', '4'], a: 0, mono: 1 },
        { q: 'لماذا لا يُنصح باستيراد الكل * دائمًا؟', o: ['يزيد حجم الكود وأعباء الصيانة والأمن بلا سبب', 'لأنه لا يعمل أبدًا', 'لأنه يحذف دوال النموذج'], a: 0 } ],
      [ { q: 'كتبتِ import math ثم sqrt(16) مباشرة. ماذا يحدث؟', o: ['خطأ NameError: يجب كتابة math.sqrt(16)', 'يطبع 4.0', 'يطبع 16'], a: 0 },
        { q: 'ما علاقة PIP بـ PyPI؟', o: ['PIP يبحث في فهرس PyPI ويثبّت الحزم منه', 'لا علاقة بينهما', 'PyPI يحذف الحزم التي يثبتها PIP'], a: 0 },
        { q: 'الدوال sin و cos تحتاج الزاوية بـ:', o: ['التقدير الدائري', 'التقدير الستيني', 'الأعداد الصحيحة فقط'], a: 0 } ],
      [ { q: 'تريدين حساب الأيام المتبقية لليوم الوطني. أي نموذج؟', o: ['datetime', 'math', 'sys'], a: 0, mono: 1 },
        { q: 'أي سطر يحسب 2 أس 10؟', o: ['math.pow(2,10)', 'math.pow(10,2)', 'math.sqrt(2,10)'], a: 0, mono: 1 },
        { q: 'من مميزات كتابة مقطعكِ البرمجي الخاص:', o: ['التحكم الكامل وتصحيح الأخطاء فورًا عند الضرورة', 'أنه لا يحتاج إلى اختبار', 'أنه يعمل دون بايثون'], a: 0 } ],
    ],
    final: { q: 'فتح القضية: سارة كتبت الكود الآتي فظهر خطأ. ما التفسير والحل؟', code: 'from math import sqrt\nprint(math.sqrt(25))', o: ['استوردت الدالة sqrt وحدها فاسم math غير معروف؛ الحل: print(sqrt(25)) أو import math', 'العدد 25 ليس له جذر', 'يجب تثبيت math بـ PIP أولًا', 'الدالة sqrt غير موجودة في math'], a: 0, why: 'الأدلة: البصمة ١ (طرق الاستيراد) والبصمة ٤ (NameError عند غياب اسم النموذج).' } },

  { t: 'tpr', title: 'استجيبي: الإبهام ومقياس الثقة', goal: 'فكّري ← اختاري ← أظهري إجابتك. ثم قيّمي ثقتك بإجابتك.',
    thumbs: [
      { s: 'from math import * يجعلني أستدعي sqrt() مباشرة دون كتابة math.', a: 'up', why: 'استيراد الكل يتيح استدعاء الدوال بأسمائها فقط.' },
      { s: 'النماذج البرمجية الخارجية دائمًا موثّقة توثيقًا صحيحًا وكاملًا.', a: 'down', why: 'قد لا تتوفر معلومات توثيق كافية أو صحيحة.' },
      { s: 'dir(os) تعرض جميع دوال النموذج os كقائمة.', a: 'up', why: 'dir مفيدة لمعرفة محتويات أي نموذج.' },
      { s: 'كل نماذج المكتبة القياسية مكتوبة بلغة بايثون.', a: 'down', why: 'بعضها مدمج مكتوب بلغة C ويوفر الوصول لوظائف النظام.' },
      { s: 'استيراد دالة واحدة يجعل برنامجي أسرع دائمًا بشكل ملحوظ.', a: 'side', why: 'لم يذكر الدرس دليلًا على ذلك؛ ذكر فقط زيادة حجم الكود وأعباء الصيانة.' },
    ],
    conf: [
      { q: 'ما الناتج؟', code: 'import math\nprint(math.sqrt(16))', o: ['4.0', '4', '16', 'خطأ'], a: 0 },
      { q: 'ما الناتج؟', code: 'from datetime import date\nd=date(2026,9,23)\nprint(d.month)', o: ['9', '23', '2026', 'خطأ'], a: 0 },
      { q: 'ما الناتج؟', code: 'import math\nprint(math.ceil(7.01))', o: ['8', '7', '7.0', '7.01'], a: 0 },
    ] },

  { t: 'code', title: 'تحدي البرمجة: العدّ التنازلي لليوم الوطني', p: 'على نمط ص١٦٢',
    task: 'اكتبي برنامجًا يطبع عدد الأيام المتبقية على اليوم الوطني السعودي (٢٣ سبتمبر) مستخدمة النموذج <code>datetime</code>.<br>إذا كان اليوم الوطني لهذا العام قد مضى فاحسبي للعام القادم.',
    starter: 'from datetime import date\ntoday = date.today()\nnationalDay = date(today.year, 9, 23)\n# أكملي\n',
    checks: [
      { py: '"nationalDay" in globals() and nationalDay.month==9 and nationalDay.day==23', msg: 'تاريخ اليوم الوطني ٢٣/٩' },
      { py: 'nationalDay >= today', msg: 'اليوم الوطني القادم (لم يمضِ بعد)' },
      { out: '\\d+', msg: 'طباعة عدد الأيام' },
    ],
    hint: 'if nationalDay < today:\n    nationalDay = nationalDay.replace(year=today.year + 1)\nprint((nationalDay - today).days)',
    sol: 'from datetime import date\ntoday = date.today()\nnationalDay = date(today.year, 9, 23)\nif nationalDay < today:\n    nationalDay = nationalDay.replace(year=today.year + 1)\nprint("Days left:", (nationalDay - today).days)' },

  { t: 'code', title: 'تحدي البرمجة: مساحة الدائرة', p: 'النموذج math',
    task: 'استوردي النموذج <code>math</code> واحسبي مساحة دائرة نصف قطرها 5 (المساحة = π × نق²) باستخدام <code>math.pi</code> و <code>math.pow</code>، ثم اطبعيها.',
    starter: 'import math\nr = 5\n',
    checks: [ { py: '"area" in globals() or True', msg: 'تشغيل البرنامج' }, { out: '78\\.5', msg: 'الناتج 78.5…' }, { py: '"math.pi" in _lab_code', msg: 'استخدام math.pi' } ],
    hint: 'area = math.pi * math.pow(r, 2)\nprint(area)',
    sol: 'import math\nr = 5\narea = math.pi * math.pow(r, 2)\nprint(area)' },

  { t: 'master' },
] },

/* ==================== الدرس ٣ ==================== */
{ id: 'l3', n: 3, title: 'بناء الواجهات الرسومية بلغة بايثون', pages: '١٧١–١٨٢', icon: 'brush',
  skills: ['أستخدم النموذج البرمجي تكينتر لرسم الأشكال في بايثون'],
  acts: [
  { t: 'comic', title: 'قصة: لوحة كودة المقلوبة', goal: 'تتعرفين على لوحة الرسم وإحداثياتها ودوال الأشكال.',
    panels: [
      { w: 'k', m: 'happy', s: 'أريد أن أرسم بالبرمجة! 🎨' },
      { w: 'b', m: 'wink', s: 'النموذج tkinter يعطيكِ نافذة، وداخلها لوحة رسم قماشية Canvas:', code: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="teal",width=400,height=400)\ncanvas.pack()\nwindow.mainloop()' },
      { w: 'k', m: 'wow', s: 'لكن… لماذا تزيد y كلما نزلتُ للأسفل؟!', fx: 'مقلوبة؟!' },
      { w: 'b', m: 'happy', s: 'في الشاشة النقطة (0,0) في الزاوية اليسرى العليا. x تكبر يمينًا، و y تكبر نزولًا.' },
      { w: 'b', m: 'wink', s: 'الأشكال:', code: 'create_line(x1,y1,x2,y2)\ncreate_rectangle(x1,y1,x2,y2)\ncreate_oval(x1,y1,x2,y2)\ncreate_polygon(points)' },
      { w: 'k', m: 'think', s: 'إذن create_oval(50,50,150,150) سترسم… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['دائرة، لأن المستطيل المحيط بها مربع', 'شكلًا بيضاويًا أفقيًا', 'مربعًا'], a: 0, why: 'الشكل البيضاوي يُرسم داخل مستطيل وهمي، وإذا كان المستطيل مربعًا (العرض = الارتفاع = 100) تظهر دائرة.' } },

  { t: 'explore', w: 'coords', title: 'مستكشف الإحداثيات', goal: 'حرّكي المؤشر لتري الإحداثيات، ثم اضغطي على النقطة المطلوبة. (FIND IT)',
    targets: [[300, 100], [50, 250], [200, 150], [350, 30], [120, 60]] },

  { t: 'run', title: 'جرّبي بنفسك: الرسم في تكينتر', items: [
    { h: 'إنشاء نافذة الرسم', p: '١٧١', code: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="teal",width=400,height=200)\ncanvas.pack()\nwindow.mainloop()' },
    { h: 'رسم الخطوط', p: '١٧٤', code: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="teal",width=600,height=200)\ncanvas.pack()\ncanvas.create_line(10,10,100,100,width=5,fill="red")\ncanvas.create_line(10,100,100,10,width=3,fill="gold")\nwindow.mainloop()' },
    { h: 'خطوط أفقية بأحجام مختلفة (تكرار)', p: '١٧٤', code: 'from tkinter import*\nwindow=Tk()\nwindow.title("Lines")\ncanvas=Canvas(bg="darkgreen", width=600, height=200)\ncanvas.pack()\nfor i in range(0,10):\n    canvas.create_line(40, i*15, 500, i*15, width=i, fill="orange")\nwindow.mainloop()' },
    { h: 'ماذا تلاحظين؟ الخاصية dash', p: '١٧٥', code: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="teal",width=400,height=300)\ncanvas.pack()\ncanvas.create_line(0,100,400,100,fill="white",dash=100)\ncanvas.create_line(0,200,400,200,fill="white",dash=1)\nwindow.mainloop()' },
    { h: 'أحداث الفأرة: اضغطي داخل اللوحة', p: '١٧٦', code: 'from tkinter import*\nwindow=Tk()\ndef callback(event):\n    print("clicked at", event.x, event.y)\ncanvas=Canvas(bg="teal",width=400,height=250)\ncanvas.bind("<Button-1>", callback)\ncanvas.pack()\nwindow.mainloop()', note: 'بعد التشغيل اضغطي داخل اللوحة عدة مرات وراقبي المخرجات. جرّبي تغيير الحدث إلى <Double-Button-1>.' },
    { h: 'رسم مثلث بالخطوط', p: '١٧٧', code: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="teal",width=400,height=150)\ncanvas.pack()\ncanvas.create_line(240,20,160,100,320,100,240,20)\nwindow.mainloop()' },
    { h: 'رسم مستطيل', p: '١٧٨', code: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="teal",width=500,height=300)\ncanvas.pack()\ncanvas.create_rectangle(100,150,400,250,width=3,outline="coral",fill="white")\ncanvas.create_rectangle(30,10,120,80,width=5,fill="green")\nwindow.mainloop()' },
    { h: 'رسم شكل بيضاوي', p: '١٧٩', code: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="teal",width=600,height=320)\ncanvas.pack()\ncanvas.create_oval(50,50,300,300,width=3)\nwindow.mainloop()',
      predict: { q: 'توقّعي: ما الشكل الذي سيظهر؟', o: ['دائرة', 'بيضاوي أفقي', 'مستطيل'], a: 0 } },
    { h: 'رسم مضلع (في كود الكتاب خطأ إملائي، اكتشفيه!)', p: '١٨٠', code: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="white",width=300,height=300)\ncanvas.pack()\npoints=[100,80,180,80,220,150,180,220,100,220,60,150]\ncanvas.create_polygon(poits,fill="green")\nwindow.mainloop()', note: 'شغّليه، اقرئي رسالة الخطأ، ثم صحّحيه.' },
    { h: 'تدريب ١: مستطيل بحد أحمر', p: '١٨١', code: 'from tkinter import*\nwindow=Tk()\nwindow.title("Graphics Window")\ncanvas=Canvas(bg="cyan", width=300, height=300)\ncanvas.pack()\ncanvas.create_rectangle(70,60,100,150,width=10,fill="green", outline="red")\nwindow.mainloop()' },
  ] },

  { t: 'match', title: 'تدريب ١: طابقي خصائص تكينتر', p: '١٨١', pairs: [
    ['window.title("Graphics Window")', 'تحديد عنوان للنافذة'], ['canvas=Canvas(bg="cyan")', 'اختيار لون خلفية لوحة الرسم'], ['canvas.create_rectangle', 'إنشاء مستطيل'],
    ['outline="red"', 'تحديد لون الحد'], ['canvas.pack()', 'عرض نافذة الرسومات'], ['fill="green"', 'تعبئة المستطيل باللون'], ['width=10', 'تحديد عرض الحد'] ], mono: 'l' },

  { t: 'mission', title: 'المهمة السرية: الرسّامة الخفية', goal: 'خمس مهمات تعطيكِ حروف الرمز السري.',
    story: 'رسّامة خفية تركت لوحات غامضة في المعمل، وكل لوحة تخفي حرفًا. اجمعيها!',
    missions: [
      { type: 'FIND IT', ar: 'اكتشفي', q: 'ما لون هذا الخط وما سُمكه؟', code: 'canvas.create_line(10,10,100,100,width=5,fill="red")', o: ['أحمر، سُمكه 5', 'أحمر، سُمكه 10', 'أبيض، سُمكه 5'], a: 0, r: 'S' },
      { type: 'FIX IT', ar: 'صحّحي', q: 'لماذا لا يُرسم المضلع؟', code: 'points=[100,80,180,80,220,150]\ncanvas.create_polygon(poits,fill="green")', o: ['اسم المتغير مكتوب poits بدل points', 'المضلع يحتاج 4 نقاط على الأقل', 'اللون green غير مدعوم'], a: 0, r: 'H' },
      { type: 'DECIDE IT', ar: 'قرّري', q: 'أي حدث يستدعي الدالة عند الضغط المزدوج على زر الفأرة الأيسر؟', o: ['<Double-Button-1>', '<Button-1>', '<Return>'], a: 0, r: 'A', mono: 1 },
      { type: 'BUILD IT', ar: 'ابني', kind: 'order', q: 'رتّبي الأسطر لرسم مستطيل أحمر:', lines: ['from tkinter import*', 'window=Tk()', 'canvas=Canvas(bg="white",width=300,height=200)', 'canvas.pack()', 'canvas.create_rectangle(50,50,150,120,fill="red")', 'window.mainloop()'], r: 'P' },
      { type: 'MYSTERY', ar: 'لغز', q: 'شكل رؤوسه (240,20) و (160,100) و (320,100). ما هو؟', o: ['مثلث', 'مستطيل', 'خط مستقيم'], a: 0, r: 'E' },
    ],
    code: 'SHAPE',
    final: { story: 'فُتح الظرف النهائي! وجدنا ورقة الرسّامة: «رسمتُ مستطيلًا من (100,150) إلى (400,250)».', q: 'فسّري: أين يقع المستطيل في لوحة عرضها 600 وارتفاعها 400؟', o: ['في النصف السفلي، لأن y من 150 إلى 250 وy تكبر للأسفل', 'في الأعلى، لأن y الكبيرة تعني الأعلى', 'في الزاوية اليمنى العليا'], a: 0, why: 'الدليل من MYSTERY ومستكشف الإحداثيات: y تكبر كلما نزلنا.' } },

  { t: 'code', title: 'تحدي الرسم: بيتي البرمجي', p: 'تطبيق',
    task: 'ارسمي بيتًا على لوحة الرسم يتكون من:<br>• مستطيل للجدار<br>• سقف مثلث (create_polygon أو create_line)<br>• باب (مستطيل صغير)<br>• شمس (create_oval)',
    starter: 'from tkinter import*\nwindow=Tk()\nwindow.title("My House")\ncanvas=Canvas(bg="lightblue",width=400,height=300)\ncanvas.pack()\n# الجدار\n\n# السقف\n\n# الباب\n\n# الشمس\n\nwindow.mainloop()',
    checks: [
      { py: 'sum(1 for s in __import__("tkinter")._shapes if s[0]=="rectangle")>=2', msg: 'مستطيلان على الأقل (الجدار والباب)' },
      { py: 'any(s[0]=="polygon" or (s[0]=="line" and len(s[1])>=6) for s in __import__("tkinter")._shapes)', msg: 'سقف مثلث' },
      { py: 'any(s[0]=="oval" for s in __import__("tkinter")._shapes)', msg: 'شمس (شكل بيضاوي)' },
    ],
    hint: 'canvas.create_rectangle(100,140,300,280,fill="wheat")\ncanvas.create_polygon(90,140,200,60,310,140,fill="brown")\ncanvas.create_rectangle(180,200,220,280,fill="sienna")\ncanvas.create_oval(320,20,380,80,fill="gold")',
    sol: 'from tkinter import*\nwindow=Tk()\nwindow.title("My House")\ncanvas=Canvas(bg="lightblue",width=400,height=300)\ncanvas.pack()\ncanvas.create_rectangle(100,140,300,280,fill="wheat")\ncanvas.create_polygon(90,140,200,60,310,140,fill="brown")\ncanvas.create_rectangle(180,200,220,280,fill="sienna")\ncanvas.create_oval(320,20,380,80,fill="gold",outline="orange")\nwindow.mainloop()' },

  { t: 'code', title: 'تدريب ٣: خطوط تتغير ألوانها بالضغط', p: '١٨٢',
    task: 'أنشئي لوحة رسم، وعند كل ضغطة داخلها يُرسم خط من نقطة الضغط بلون مختلف عن السابق. (استخدمي قائمة ألوان و <code>canvas.bind</code>)<br>بعد التشغيل اضغطي داخل اللوحة ٣ مرات على الأقل ثم اضغطي «تحققي».',
    starter: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="white",width=400,height=300)\ncanvas.pack()\ncolors=["red","green","blue","orange","purple"]\nn=[0]\ndef draw(event):\n    c=colors[n[0] % len(colors)]\n    # ارسمي خطًا من (event.x, event.y) باللون c\n\n    n[0]=n[0]+1\ncanvas.bind("<Button-1>", draw)\nwindow.mainloop()',
    checks: [
      { py: '"bind" in _lab_code', msg: 'ربط حدث الضغط' },
      { py: 'len(set(s[2].get("fill") for s in __import__("tkinter")._shapes if s[0]=="line"))>=3', msg: '٣ خطوط بألوان مختلفة (اضغطي داخل اللوحة)', live: 1 },
    ],
    hint: 'canvas.create_line(event.x, event.y, 200, 150, width=3, fill=c)',
    sol: 'from tkinter import*\nwindow=Tk()\ncanvas=Canvas(bg="white",width=400,height=300)\ncanvas.pack()\ncolors=["red","green","blue","orange","purple"]\nn=[0]\ndef draw(event):\n    c=colors[n[0] % len(colors)]\n    canvas.create_line(event.x, event.y, 200, 150, width=3, fill=c)\n    n[0]=n[0]+1\ncanvas.bind("<Button-1>", draw)\nwindow.mainloop()' },

  { t: 'master' },
] },

/* ==================== الدرس ٤ ==================== */
{ id: 'l4', n: 4, title: 'القواميس', pages: '١٨٣–١٩٤', icon: 'book',
  skills: ['أستخدم القاموس في بايثون', 'أستخدم الدوال المدمجة مع القواميس لإنشاء برامج في بايثون'],
  acts: [
  { t: 'comic', title: 'قصة: دليل هاتف كودة', goal: 'تتعرفين على القاموس: المفتاح والقيمة.',
    panels: [
      { w: 'k', m: 'sad', s: 'حفظتُ أسماء صديقاتي وأرقامهن في قائمة… كيف أجد رقم سارة؟ أبحث بالفهرس واحدًا واحدًا؟! 😩' },
      { w: 'b', m: 'happy', s: 'القاموس Dictionary يحفظ أزواجًا «مفتاح: قيمة»، وتصلين للقيمة بالمفتاح مباشرة.', code: 'ArabGulf={"Saudi Arabia":"Riyadh",\n          "Oman":"Muscat"}' },
      { w: 'b', m: 'wink', s: 'طريقتان للوصول:', code: 'print(ArabGulf["Oman"])     # Muscat\nprint(ArabGulf.get("Oman")) # Muscat' },
      { w: 'k', m: 'think', s: 'وإذا كررتُ المفتاح نفسه مرتين؟' },
      { w: 'b', m: 'happy', s: 'لا يتكرر المفتاح! كل مفتاح فريد، مثل رقم الحساب في البنك.' },
      { w: 'k', m: 'wow', s: 'إذن الفرق الأهم بين القائمة والقاموس… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['القائمة نصل إلى عناصرها بالفهرس، والقاموس بالمفتاح', 'القاموس لا يمكن تعديله', 'القائمة لا تقبل النصوص'], a: 0, why: 'هذا هو الاختلاف الرئيس كما في ص١٨٥: القائمة بالفهرس، والقاموس بالمفاتيح.' } },

  { t: 'run', title: 'جرّبي بنفسك: القواميس', items: [
    { h: 'إنشاء القاموس بالأقواس المتعرجة', p: '١٨٥', code: 'ArabGulf={"Saudi Arabia":"Riyadh","Oman":"Muscat","Bahrain":"Manama"}\nprint(ArabGulf)' },
    { h: 'إنشاء القاموس بالأمر dict()', p: '١٨٥', code: 'ArabGulf=dict(SaudiArabia="Riyadh", Oman="Muscat", Bahrain="Manama")\nprint(ArabGulf)' },
    { h: 'قاموس يُدخل المستخدم بياناته', p: '١٨٦', code: 'myDict = dict()\nfor i in range(3):\n    key = input("Enter the key: ")\n    value = input("Enter the value: ")\n    myDict[key] = value\nprint(myDict)' },
    { h: 'الوصول إلى العناصر بالمفتاح و get()', p: '١٨٧', code: 'ArabGulf= {\n    "SaudiArabia" : "Riyadh",\n    "Oman" : "Muscat",\n    "Bahrain" : "Manama"\n    }\ncapital1=ArabGulf["SaudiArabia"]\nprint(capital1)\ncapital2=ArabGulf.get("Oman")\nprint(capital2)\nprint(ArabGulf.get("Qatar"))',
      predict: { q: 'ماذا تطبع ArabGulf.get("Qatar") والمفتاح غير موجود؟', o: ['None', 'رسالة خطأ KeyError', 'Doha'], a: 0 } },
    { h: 'تغيير قيمة عنصر', p: '١٨٨', code: 'Students= {\n    "Khalid" : "Science",\n    "Sara" : "Maths",\n    "Ali" : "English Language"\n    }\nStudents["Ali"]= "Social Studies"\nprint(Students)' },
    { h: 'الدالة update(): إضافة وتحديث', p: '١٨٩', code: 'id_numbers= {\n    "Khalid": 154327,\n    "Saad": 154876,\n    "Hamad": 164523\n    }\nnew_id={"Ahmed":174527}\nid_numbers.update(new_id)\nprint(id_numbers)\nupdate_id={"Saad":154651}\nid_numbers.update(update_id)\nprint(id_numbers)' },
    { h: 'المفاتيح والقيم keys و values', p: '١٨٩', code: 'ArabGulf= {"SaudiArabia":"Riyadh","Oman":"Muscat","Bahrain":"Manama"}\nk=ArabGulf.keys()\nprint(k)\nv=ArabGulf.values()\nprint(v)' },
    { h: 'حذف عنصر بـ del ثم تفريغ القاموس بـ clear', p: '١٩٠', code: 'ArabGulf= {"SaudiArabia":"Riyadh","Oman":"Muscat","Bahrain":"Manama"}\ndel ArabGulf["Oman"]\nprint(ArabGulf)\nArabGulf.clear()\nprint(ArabGulf)' },
    { h: 'حذف القاموس كاملًا ثم طباعته!', p: '١٩١', code: 'ArabGulf= {"SaudiArabia":"Riyadh","Oman":"Muscat"}\ndel ArabGulf\nprint(ArabGulf)',
      predict: { q: 'توقّعي: ماذا سيحدث؟', o: ['خطأ NameError لأن القاموس حُذف', 'يطبع {}', 'يطبع القاموس كما هو'], a: 0 } },
    { h: 'مشروع البنك: عملية الإيداع', p: '١٩٢', code: 'bankInfo={\n123:["Ali",15000],\n444:["Fahd",13000],\n888:["Khalid",11000]\n}\nprint("Bank info state:", bankInfo)\naccountNo=int(input("Enter an account number: "))\naccount=bankInfo.get(accountNo)\nbalance=account[1]\namount=float(input("Enter amount to be deposited: "))\nnewBalance=balance+amount\naccount[1]=newBalance\nprint("Bank info state: ", bankInfo)', note: 'جرّبي الحساب 123 والمبلغ 2000.' },
  ] },

  { t: 'traffic', title: 'إشارة المرور: القواميس',
    show: [
      { s: 'القاموس يُكتب بين أقواس متعرجة { } والنقطتان تفصلان المفتاح عن القيمة.', a: 'g', fix: 'صحيحة.' },
      { s: 'يمكن أن يتكرر المفتاح نفسه مرتين في القاموس.', a: 'r', fix: 'المفتاح فريد ولا يتكرر.' },
      { s: 'الدالة get() تُرجع None إذا لم تجد المفتاح.', a: 'g', fix: 'صحيحة، بينما [ ] تُظهر خطأ.' },
      { s: 'الدالة update() تضيف عناصر جديدة إلى القاموس.', a: 'y', fix: 'تضيف الجديد، وتحدّث أيضًا قيمة المفتاح الموجود سابقًا.' },
      { s: 'الأمر del ArabGulf يفرّغ القاموس ويبقيه موجودًا.', a: 'r', fix: 'del يحذف القاموس كاملًا؛ الذي يفرّغه ويبقيه هو clear().' },
      { s: 'الدالة keys() تُرجع جميع القيم.', a: 'r', fix: 'keys() تُرجع المفاتيح، و values() تُرجع القيم.' },
    ],
    opinion: [
      { s: 'أرى أن رقم الحساب أفضل مفتاح في برنامج البنك من اسم العميل.' },
      { s: 'إحدى الطالبات قالت: «get() أفضل من الأقواس [ ] دائمًا».' },
      { s: 'يمكننا القول إن القاموس أنسب من القائمة لدليل الهاتف.' },
      { s: 'أعتقد أن clear() و del متشابهتان تمامًا.' },
    ],
    move: [
      { s: 'تريدين تخزين اسم ورصيد لكل رقم حساب، فتكون القيمة قائمة [الاسم، الرصيد]. نكمل؟', a: 'g', why: 'يمكن أن تكون القيمة قائمة، كما في مشروع البنك.' },
      { s: 'كتبتِ Employees["Noura"] والمفتاح غير موجود. نشغّل؟', a: 'r', why: 'سيظهر خطأ KeyError؛ استخدمي get().' },
      { s: 'تريدين تحديث رقم سعد: id_numbers.update({"Saad":154651}). نكمل؟', a: 'g', why: 'update() تحدّث قيمة المفتاح الموجود.' },
      { s: 'طبعتِ القاموس بعد الأمر del ArabGulf.', a: 'r', why: 'القاموس محذوف، فيظهر NameError.' },
      { s: 'تبحثين عن مفتاح قد يكون غير موجود: [ ] أم get()؟', a: 'y', why: 'توقفي وفكري: get() أكثر أمانًا لأنها لا تُظهر خطأ.' },
    ] },

  { t: 'mission', title: 'المهمة السرية: لغز البنك', goal: 'اكتشفي ماذا حدث للأرصدة.',
    story: 'اختفى مبلغ من أحد الحسابات في «بنك المعمل»! السجل الأصلي:\nbankInfo={123:["Ali",15000], 444:["Fahd",13000], 888:["Khalid",11000]}',
    missions: [
      { type: 'FIND IT', ar: 'اكتشفي', q: 'ما ناتج bankInfo[444][1]؟', o: ['13000', 'Fahd', '444', '15000'], a: 0, r: 'V', why: 'القيمة قائمة: [0] الاسم و [1] الرصيد.' },
      { type: 'FIX IT', ar: 'صحّحي', q: 'هذا السطر أعاد None. لماذا؟', code: 'account=bankInfo.get("123")', o: ['المفتاح رقم 123 وليس نصًا "123"', 'get لا تعمل مع الأرقام', 'الحساب 123 محذوف'], a: 0, r: 'A' },
      { type: 'MATCH IT', ar: 'طابقي', kind: 'match', q: 'طابقي الأمر بناتجه:', pairs: [['bankInfo.keys()', 'أرقام الحسابات'], ['bankInfo.values()', 'الأسماء والأرصدة'], ['bankInfo.get(888)', "['Khalid', 11000]"], ['bankInfo.clear()', '{}']], r: 'U' },
      { type: 'BUILD IT', ar: 'ابني', kind: 'order', q: 'رتّبي خطوات إيداع 2000 في الحساب 123:', lines: ['accountNo=123', 'account=bankInfo.get(accountNo)', 'balance=account[1]', 'amount=2000', 'account[1]=balance+amount', 'print(bankInfo)'], r: 'L' },
      { type: 'EVIDENCE', ar: 'الدليل', q: "بعد الإيداع ظهر: {123: ['Ali', 17000.0], …}. أي دليل يثبت أن المبلغ أُدخل بـ float()؟", o: ['الرقم 17000.0 فيه فاصلة عشرية', 'اسم Ali لم يتغير', 'رقم الحساب 123'], a: 0, r: 'T' },
    ],
    code: 'VAULT',
    final: { story: "فُتحت الخزنة! السجل الجديد: {123: ['Ali', 15000], 444: ['Fahd', 11000], 888: ['Khalid', 13000]}", q: 'اكتشفي الحقيقة: ماذا حدث؟', o: ['حُوّل 2000 من حساب Fahd (444) إلى حساب Khalid (888)', 'حُذف حساب Ali', 'أُودع 2000 في حساب Ali'], a: 0, why: 'قارني القيم [1] قبل وبعد: 444 نقص 2000، و 888 زاد 2000، و 123 لم يتغير.' } },

  { t: 'tpr', title: 'استجيبي: إجابتي + مدى ثقتي', goal: 'اختاري الإجابة أولًا، ثم أظهري ثقتك من ١ إلى ٥.',
    conf: [
      { q: 'ما الناتج؟', code: 'numbers={1:"One", 2:"Two", 3:"Three"}\nprint(numbers[2])', o: ['Two', 'One', 'Three', '2'], a: 0 },
      { q: 'ما الناتج؟', code: 'd={"a":1}\nd.update({"a":5})\nprint(d)', o: ["{'a': 5}", "{'a': 1, 'a': 5}", "{'a': 6}"], a: 0 },
      { q: 'ما الناتج؟', code: 'd={"x":1,"y":2}\ndel d["x"]\nprint(len(d))', o: ['1', '2', '0'], a: 0 },
      { q: 'ما الناتج؟', code: 'numbers={1:"One", 2:"Two"}\nnumbers.clear()\nprint(numbers)', o: ['{}', 'None', 'خطأ'], a: 0 },
    ] },

  { t: 'code', title: 'تحدي البرمجة: معدلات الطالبات', p: '١٩٤ (تدريب ٥)',
    task: '١. أنشئي قاموسًا <code>students</code> فيه اسم الطالبة ومعدلها لخمس طالبات.<br>٢. اطبعي قائمة المفاتيح ٣. اطبعي قائمة القيم<br>٤. أضيفي طالبة جديدة بـ update() ٥. اطبعي القيم الجديدة<br>٦. احذفي جميع العناصر واطبعي القاموس.',
    starter: 'students={"Noura":95, "Sara":88}\n',
    checks: [
      { out: 'dict_keys\\(', msg: 'طباعة المفاتيح keys()' },
      { out: 'dict_values\\(\\[[^\\]]*,[^\\]]*,[^\\]]*,[^\\]]*,[^\\]]*\\]\\)', msg: 'طباعة قيم ٥ طالبات' },
      { out: 'dict_values\\(\\[[^\\]]*,[^\\]]*,[^\\]]*,[^\\]]*,[^\\]]*,[^\\]]*\\]\\)', msg: 'القيم بعد إضافة الطالبة السادسة' },
      { py: '"update" in _lab_code', msg: 'استخدام update()' },
      { out: '\\{\\}', msg: 'القاموس فارغ بعد clear()' },
    ],
    hint: 'print(students.keys())\nprint(students.values())\nstudents.update({"Hind":91})\nprint(students.values())\nstudents.clear()\nprint(students)',
    sol: 'students={"Noura":95, "Sara":88, "Reem":92, "Lama":85, "Joud":99}\nprint(students.keys())\nprint(students.values())\nstudents.update({"Hind":91})\nprint(students.values())\nstudents.clear()\nprint(students)' },

  { t: 'master' },
] },

/* ==================== الدرس ٥ ==================== */
{ id: 'l5', n: 5, title: 'القوائم المتداخلة', pages: '١٩٥–٢٠٠', icon: 'grid',
  skills: ['أستخدم القوائم المتداخلة لإنشاء مقطع برمجي'],
  acts: [
  { t: 'comic', title: 'قصة: عمارة القوائم', goal: 'تتعرفين على القائمة داخل القائمة وفهرستها برقمين.',
    panels: [
      { w: 'k', m: 'think', s: 'عندي عمارة فيها طوابق، وفي كل طابق شقق… كيف أمثّلها في بايثون؟' },
      { w: 'b', m: 'happy', s: 'قائمة داخل قائمة = قائمة متداخلة!', code: 'building=[[1,2],[3,4],[5,6,7]]' },
      { w: 'b', m: 'wink', s: 'الفهرس الأول للطابق (القائمة الخارجية)، والثاني للشقة (القائمة الداخلية).', code: 'print(building[2][0])  # 5' },
      { w: 'k', m: 'wow', s: 'وكم طول القائمة [3,["a","b","c"],7.5]؟ ستة؟', fx: '٦؟' },
      { w: 'b', m: 'happy', s: 'لا! ثلاثة. القائمة الداخلية تُعد عنصرًا واحدًا. ولطباعة الكل نستخدم تكرارًا داخل تكرار:', code: 'for i in building:\n    for j in i:\n        print(j)' },
      { w: 'k', m: 'think', s: 'إذن list=[[7,"a"],4,["c","b"]] قيمة list[0][1] هي… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['a', '7', 'c', 'b'], a: 0, why: 'list[0] هي [7,"a"]، وعنصرها الذي فهرسه 1 هو "a".' } },

  { t: 'explore', w: 'grid', title: 'مستكشف القائمة المتداخلة', goal: 'اضغطي على العنصر المطلوب في الشبكة.',
    data: [[1, 2], ['c', 'd'], [15, 62, 79]], targets: [[2, 1], [0, 0], [1, 1], [2, 2], [1, 0]] },

  { t: 'run', title: 'جرّبي بنفسك: القوائم المتداخلة', items: [
    { h: 'قائمة فيها قائمة', p: '١٩٥', code: 'list=[3, ["a", "b", "c"], 7.5, -2, "orange"]\nprint(list)\nprint(list[0])\nprint(list[1])\nprint(list[2])\nprint(list[3])\nprint(list[4])' },
    { h: 'طول القائمة المتداخلة', p: '١٩٦', code: 'list=[3,["a","b","c"],7.5,-2,"orange"]\nl=len(list)\nprint("the length of the list is:",l)',
      predict: { q: 'توقّعي الطول:', o: ['5', '7', '3'], a: 0 } },
    { h: 'ماذا تلاحظين؟', p: '١٩٦', code: 'thisList= ["a", "b", ["c", "d"], "e", "f"]\nprint(thisList[3])\nprint(thisList[-3])' },
    { h: 'فهرسة القوائم المتداخلة برقمين', p: '١٩٧', code: 'list=[[1,2],[\'c\',\'d\'],[15,62,79]]\nprint(list[0])\nprint(list[0][0])\nprint(list[0][1])\nprint(list[1])\nprint(list[1][0])\nprint(list[2][2])' },
    { h: 'التكرارات المتداخلة', p: '١٩٨', code: 'list=[[1,2],[\'c\',\'d\'],[15,62,79]]\nfor i in list:\n    print(i)\n    for j in i:\n        print(j)' },
    { h: 'جرّبي واكتبي النتيجة', p: '١٩٨', code: 'ThisList = [[1, 2, 3],[4, 5, 6],[7, 8, 9]]\nfor list in ThisList:\n    for number in list:\n        print(number)' },
  ] },

  { t: 'quiz', title: 'تدريب ١: ما الذي ستتم طباعته؟', p: '١٩٩', items: [
    { q: 'ما الناتج؟', code: 'list=[3,4,["a","b"]]\nprint(list[2][1])', o: ['b', 'a', '4', '3'], a: 0, why: 'list[2] هي ["a","b"] وعنصرها [1] هو b.' },
    { q: 'ما الناتج؟', code: 'list=[1,"a",[0,"b"]]\nprint(list[1])', o: ['a', '0', 'b', '1'], a: 0, why: 'العنصر الذي فهرسه 1 في القائمة الخارجية هو "a".' },
    { q: 'ما الناتج؟', code: 'list=[3,["c","d"],["a","b"]]\nprint(list[1][1])', o: ['d', 'c', 'a', '3'], a: 0, why: 'list[1] هي ["c","d"]، والعنصر [1] هو d.' },
    { q: 'ما الناتج؟', code: 'list=[[7,"a"],4,["c","b"]]\nprint(list[0][1])', o: ['a', '7', 'c', 'b'], a: 0, why: 'list[0] هي [7,"a"].' },
    { q: 'اختبري نفسك (س١١): ما الناتج؟', code: 'list=[[1,2],["a","b"],[35,"e"]]\nprint(list[1][0])', o: ['a', 'b', '1', '2'], a: 0, why: 'list[1] هي ["a","b"] والعنصر [0] هو a.' },
  ] },

  { t: 'tpr', title: 'تدريب ٣: صحيحة أم خطأ؟ (بالإبهام)', p: '٢٠٠', goal: '👍 صحيحة  •  👉 غير متأكدة  •  👎 خطأ',
    thumbs: [
      { s: 'يُنشئ بايثون مصفوفة ثنائية الأبعاد 2D array باستخدام القوائم المتداخلة.', a: 'up', why: 'صحيحة كما في ص١٩٥.' },
      { s: 'يبدأ الترقيم في القائمة من الصفر.', a: 'up', why: 'صحيحة.' },
      { s: 'تتم فهرسة كل عنصر في القائمة المتداخلة بفهرس واحد.', a: 'down', why: 'العنصر الداخلي يحتاج فهرسين: الخارجي ثم الداخلي.' },
      { s: 'عناصر القائمة المتداخلة يمكن أن تكون أعدادًا ونصوصًا وقوائم أخرى.', a: 'up', why: 'صحيحة.' },
      { s: 'لطباعة جميع عناصر القائمة المتداخلة نحتاج إلى التكرارات المتداخلة.', a: 'up', why: 'صحيحة: تكرار للخارجية وتكرار للداخلية.' },
    ] },

  { t: 'prints', title: 'لغز البصمات: شقة العمارة المجهولة', goal: 'حلّي البصمات الخمس لتعرفي من يسكن الشقة المجهولة.',
    scene: { title: 'مخطط العمارة', clues: ['building=[["Noura","Sara"],["Reem","Lama"],["Hind","Joud","Dana"]]', 'الطابق = الفهرس الأول', 'الشقة = الفهرس الثاني', 'len(building) = ؟', 'building[-1][-1] = ؟'] },
    prints: [
      [ { q: 'كم طابقًا في العمارة؟ len(building)', o: ['3', '7', '2'], a: 0, mono: 1 }, { q: 'من تسكن building[0][0]؟', o: ['Noura', 'Sara', 'Reem'], a: 0, mono: 1 }, { q: 'صح أم خطأ: building[1] قائمة.', o: ['صح', 'خطأ'], a: 0 } ],
      [ { q: 'كم شقة في الطابق الأخير؟ len(building[2])', o: ['3', '2', '7'], a: 0, mono: 1 }, { q: 'أكملي: building[1][1] = …', o: ['Lama', 'Reem', 'Sara'], a: 0, mono: 1 }, { q: 'Dana في building[…][…]', o: ['[2][2]', '[3][3]', '[2][3]'], a: 0, mono: 1 } ],
      [ { q: 'ما ناتج building[-1][-1]؟', o: ['Dana', 'Hind', 'Noura'], a: 0, mono: 1 }, { q: 'ما ناتج building[0][-1]؟', o: ['Sara', 'Noura', 'Dana'], a: 0, mono: 1 }, { q: 'لماذا building[3][0] تعطي خطأ؟', o: ['لا يوجد طابق فهرسه 3', 'لأن 0 غير مسموح', 'لأن الأسماء نصوص'], a: 0 } ],
      [ { q: 'إذا أضفنا building[0].append("Amal") كم شقة في الطابق الأول؟', o: ['3', '2', '4'], a: 0 }, { q: 'إذا أضفنا building.append(["Rana"]) كم طابقًا يصبح؟', o: ['4', '3', '8'], a: 0 }, { q: 'كم مرة يُنفَّذ print(j) في تكرار متداخل على العمارة الأصلية؟', o: ['7', '3', '6'], a: 0 } ],
      [ { q: 'أي كود يطبع كل الساكنات؟', o: ['for f in building:\n    for p in f:\n        print(p)', 'print(building[0])', 'for f in building:\n    print(f[0])'], a: 0, mono: 1 }, { q: 'نريد تغيير Reem إلى Rahaf:', o: ['building[1][0]="Rahaf"', 'building[1]="Rahaf"', 'building[0][1]="Rahaf"'], a: 0, mono: 1 }, { q: 'أي شقة فارغة لو كان building[1]=[]؟', o: ['الطابق الثاني كله', 'الطابق الأول', 'لا شيء'], a: 0 } ],
    ],
    final: { q: 'فتح القضية: الساكنة المجهولة تسكن في الطابق الأخير، وفي الشقة التي فهرسها يساوي عدد الطوابق ناقص 2. من هي؟', o: ['Joud', 'Hind', 'Dana', 'Lama'], a: 0, why: 'الطابق الأخير building[2]، وعدد الطوابق 3، و 3-2 = 1، و building[2][1] = Joud.' } },

  { t: 'code', title: 'تحدي البرمجة: بيانات العائلات', p: '٢٠٠ (تدريب ٢)',
    task: '١. أنشئي القائمة <code>Families</code> وعناصرها: اسم الأب، عدد الذكور، عدد الإناث:<br><code>[["Hamad",2,3],["Jassem",2,4],["Ibrahem",4,0]]</code><br>٢. اعرضي جميع العناصر عنصرًا بعد الآخر.<br>٣. اطبعي مجموع الذكور ومجموع الإناث لجميع العوائل.',
    starter: 'Families=[["Hamad",2,3],["Jassem",2,4],["Ibrahem",4,0]]\nmales=0\nfemales=0\n',
    checks: [
      { py: 'Families==[["Hamad",2,3],["Jassem",2,4],["Ibrahem",4,0]]', msg: 'القائمة Families صحيحة' },
      { out: 'Ibrahem', msg: 'عرض العناصر' },
      { py: 'males==8 and females==7', msg: 'مجموع الذكور 8 والإناث 7' },
      { out: '8[\\s\\S]*7|7[\\s\\S]*8', msg: 'طباعة المجموعين' },
    ],
    hint: 'for f in Families:\n    print(f)\n    males=males+f[1]\n    females=females+f[2]\nprint("Males:",males,"Females:",females)',
    sol: 'Families=[["Hamad",2,3],["Jassem",2,4],["Ibrahem",4,0]]\nmales=0\nfemales=0\nfor f in Families:\n    for item in f:\n        print(item)\n    males=males+f[1]\n    females=females+f[2]\nprint("Males:",males)\nprint("Females:",females)' },

  { t: 'master' },
] },

/* ==================== الدرس ٦ ==================== */
{ id: 'l6', n: 6, title: 'الملفات', pages: '٢٠١–٢١٤', icon: 'file',
  skills: ['أخزّن البيانات في ملفات نصية'],
  acts: [
  { t: 'comic', title: 'قصة: ذاكرة كودة القصيرة', goal: 'تتعرفين على الملفات النصية وأوضاع فتحها.',
    panels: [
      { w: 'k', m: 'sad', s: 'كتبتُ برنامج درجات رائعًا… أغلقته فاختفت كل البيانات! 😢' },
      { w: 'b', m: 'think', s: 'لأنها كانت في ذاكرة الوصول العشوائي RAM، وتُفقد فور إيقاف البرنامج. احفظيها في ملف نصي.' },
      { w: 'b', m: 'happy', s: 'افتحي ← اقرئي أو اكتبي ← أغلقي:', code: 'f=open("file.txt", "r")\nprint(f.read())\nf.close()' },
      { w: 'b', m: 'wink', s: 'الأوضاع: "r" قراءة، "w" كتابة (تمسح القديم!)، "a" إلحاق في النهاية.' },
      { w: 'k', m: 'wow', s: 'يعني "w" خطيرة؟!', fx: 'احذري!' },
      { w: 'k', m: 'think', s: 'أريد إضافة سطر لنهاية ملف درجاتي دون حذف القديم، فأستخدم… ؟', blank: 1 },
    ],
    q: { q: 'أكملي فقاعة كودة:', o: ['الوضع "a"', 'الوضع "w"', 'الوضع "r"'], a: 0, why: 'الوضع a يُلحق البيانات بنهاية الملف، أما w فيحذف المحتوى السابق.' } },

  { t: 'run', title: 'جرّبي بنفسك: الملفات', files: 1, goal: 'الملفات file.txt و cities.txt و Riyadh.txt و grades.txt جاهزة في المعمل. افتحيها من «ملفاتي» أسفل الكود.', items: [
    { h: 'قراءة الملف كاملًا read()', p: '٢٠٣', code: 'f=open("file.txt", "r")\nprint(f.read())\nf.close()' },
    { h: 'قراءة سطر سطر readline()', p: '٢٠٤', code: 'f=open("file.txt", "r")\nprint(f.readline())\nprint(f.readline())\nf.close()' },
    { h: 'قراءة الملف كله بالتكرار while', p: '٢٠٤', code: 'f=open("file.txt", "r")\nline = f.readline()\nwhile line:\n    print(line)\n    line=f.readline()\nf.close()' },
    { h: 'إلحاق نص جديد بالملف "a"', p: '٢٠٥', code: 'f=open("file.txt", "a")\nf.write("\\nThis is the new text.")\nf.close()\nf=open("file.txt", "r")\nprint(f.read())\nf.close()', note: 'شغّليه مرتين وراقبي: يُضاف السطر كل مرة.' },
    { h: 'الكتابة في ملف "w"', p: '٢٠٦', code: 'f=open("cities.txt", "w")\nf.write("Riyadh\\n")\nf.write("Jeddah\\n")\nf.write("Abha\\n")\nf.write("Dammam\\n")\nf.close()\nf=open("cities.txt", "r")\nprint(f.read())\nf.close()' },
    { h: 'الوضع "w" يمسح المحتوى السابق!', p: '٢٠٦', code: 'f=open("file.txt", "w")\nf.write("The previous text has been deleted...")\nf.close()\nf=open("file.txt", "r")\nprint(f.read())\nf.close()',
      predict: { q: 'توقّعي: ماذا سيبقى في file.txt؟', o: ['جملة واحدة فقط: The previous text has been deleted...', 'النص القديم ثم الجملة الجديدة', 'الملف فارغ'], a: 0 } },
    { h: 'تخزين أسطر الملف في قائمة', p: '٢٠٧', code: 'citiesList=[ ]\nf=open("cities.txt", "r")\nfor i in range(4):\n    city= f.readline()\n    c=city.replace("\\n","")\n    citiesList.append(c)\nprint(citiesList)\nf.close()' },
    { h: 'readlines(): كل الأسطر في قائمة', p: '٢٠٨', code: 'f=open("cities.txt", "r")\nprint(f.readlines())\nf.close()' },
    { h: 'كم مرة تظهر كلمة في الملف؟', p: '٢٠٩', code: 'f=open("Riyadh.txt", "r")\ncounter=0\nword=input("Type a word: ")\ndatafile = f.readlines()\nfor line in datafile:\n    nb=line.count(word)\n    counter=counter+nb\nprint("Word count for", word, "in file: ",counter)\nf.close()', note: 'اكتبي Riyadh عند السؤال.' },
    { h: 'مجموع الدرجات ومعدلها من ملف، ثم إضافتها إليه', p: '٢١٠–٢١١', code: 'gr=open("grades.txt", "r")\nsumGrades=0\ngrade=gr.readline()\ncount=0\nwhile grade:\n    gradeInt=int(grade)\n    print(gradeInt)\n    count=count+1\n    sumGrades=sumGrades+gradeInt\n    grade=gr.readline()\nprint("The sum is: ",sumGrades)\naverage= sumGrades/count\nprint("The average is: ",average)\ngr.close()\naverageG=str(average)\nsumG=str(sumGrades)\ngr = open("grades.txt", "a")\ngr.write("\\nThe sum of the grades is:"+ sumG)\ngr.write("\\nThe average of the grades is:"+ averageG)\ngr.close()\ngr=open("grades.txt" , "r")\nprint(gr.read())\ngr.close()' },
  ] },

  { t: 'traffic', title: 'إشارة المرور: أوضاع الملفات',
    show: [
      { s: 'الوضع "r" هو الوضع الافتراضي لفتح الملف.', a: 'g', fix: 'صحيحة.' },
      { s: 'الوضع "w" يضيف النص إلى نهاية الملف.', a: 'r', fix: '"w" يمسح المحتوى ويكتب من جديد؛ الإضافة للنهاية بالوضع "a".' },
      { s: 'الوضع "a" ينشئ الملف إذا لم يكن موجودًا.', a: 'g', fix: 'صحيحة.' },
      { s: 'الدالة readline() تقرأ جميع أسطر الملف دفعة واحدة.', a: 'r', fix: 'readline() تقرأ سطرًا واحدًا، و readlines() تقرأ كل الأسطر في قائمة.' },
      { s: 'الرمز \\n ينقل الكتابة إلى سطر جديد.', a: 'g', fix: 'صحيحة.' },
      { s: 'الدالة close() تغلق الملف فقط وليس لها علاقة بحفظ التغييرات.', a: 'y', fix: 'تغلق الملف وتحفظ أي تغييرات أُجريت عليه أيضًا.' },
    ],
    opinion: [
      { s: 'أرى أن الملفات أفضل من المتغيرات لحفظ درجات الطالبات.' },
      { s: 'إحدى الطالبات قالت: «الأسلم أن أفتح الملف بالوضع a بدل w دائمًا».' },
      { s: 'readlines() أنسب من readline() للبحث عن كلمة في النص كله.' },
      { s: 'يمكننا القول إن الملف النصي قاعدة بيانات صغيرة.' },
    ],
    move: [
      { s: 'تريدين قراءة ملف غير موجود بالوضع "r".', a: 'r', why: 'سيظهر خطأ FileNotFoundError.' },
      { s: 'تريدين إنشاء ملف جديد للمدن بالوضع "w".', a: 'g', why: '"w" تنشئ ملفًا جديدًا إن لم يكن موجودًا.' },
      { s: 'تريدين إضافة المجموع إلى نهاية grades.txt بالوضع "w".', a: 'r', why: 'ستُحذف الدرجات! استخدمي "a".' },
      { s: 'تريدين حذف \\n من نهاية السطر: replace() أم strip()؟', a: 'y', why: 'فكّري: الكتاب استخدم replace("\\n","")، و strip() تحذف المسافات و \\n من الطرفين.' },
      { s: 'كتبتِ حلقة while line: ونسيتِ داخلها line=f.readline().', a: 'r', why: 'ستصبح حلقة لا تنتهي لأن الشرط لا يتغير.' },
    ] },

  { t: 'mission', title: 'المهمة السرية: الملف المفقود', goal: 'خمس مهمات تكشف حروف الرمز.',
    story: 'ملف درجات سري اختفت محتوياته! مهمتكِ معرفة ما حدث له.',
    missions: [
      { type: 'FIND IT', ar: 'اكتشفي', q: 'في file.txt ثلاثة أسطر أولها Welcome to Python! ماذا يطبع f.readline() أول مرة؟', o: ['Welcome to Python!', 'كل الأسطر', "Let's start programming..."], a: 0, r: 'F' },
      { type: 'FIX IT', ar: 'صحّحي', q: 'لماذا يظهر خطأ هنا؟', code: 'f=open("cities.txt", "w")\nprint(f.read())', o: ['الملف مفتوح للكتابة لا للقراءة', 'اسم الملف خطأ', 'read تحتاج رقمًا'], a: 0, r: 'I' },
      { type: 'MATCH IT', ar: 'طابقي', kind: 'match', q: 'طابقي الوضع أو الدالة بعملها:', pairs: [['"r"', 'قراءة'], ['"w"', 'كتابة مع حذف القديم'], ['"a"', 'إلحاق بنهاية الملف'], ['close()', 'إغلاق الملف وحفظ التغييرات']], r: 'L' },
      { type: 'BUILD IT', ar: 'ابني', kind: 'order', q: 'رتّبي الأسطر لحساب مجموع الدرجات من الملف:', lines: ['gr=open("grades.txt","r")', 'total=0', 'for line in gr.readlines():', '    total=total+int(line)', 'print(total)', 'gr.close()'], r: 'E' },
      { type: 'DECIDE IT', ar: 'قرّري', q: 'سجل حضور يومي يزيد كل يوم دون حذف الأيام السابقة. أي وضع؟', o: ['"a"', '"w"', '"r"'], a: 0, r: 'S', mono: 1 },
    ],
    code: 'FILES',
    final: { story: 'فُتح الظرف! بعد تشغيل كود هدى أصبح ملف grades.txt فيه سطر واحد فقط: The sum is: 453', q: 'اكتشفي الحقيقة: ماذا حدث؟', o: ['فتحت الملف بالوضع "w" فحُذفت الدرجات وكُتب المجموع فقط', 'فتحته بالوضع "a"', 'نسيت close() فاختفت الدرجات', 'استخدمت readlines()'], a: 0, why: 'الأدلة: MATCH IT ("w" يحذف القديم) و DECIDE IT ("a" للإضافة دون حذف).' } },

  { t: 'code', title: 'تحدي البرمجة: درجات الحرارة', p: '٢١٤ (تدريب ٤)', files: 1,
    task: '١. أنشئي الملف <code>temperature.txt</code> بالوضع "w".<br>٢. اكتبي فيه متوسط درجة الحرارة لأربعة أسابيع من شهر يناير في الرياض (رقم في كل سطر).<br>٣. اقرئي الأرقام واحسبي المتوسط، ثم أضيفيه إلى نهاية الملف بالوضع "a".',
    starter: 'f=open("temperature.txt","w")\nf.write("14\\n")\n',
    checks: [
      { py: 'len([l for l in open("temperature.txt").read().split("\\n") if l.strip()])>=5', msg: 'الملف فيه ٤ درجات + سطر المتوسط' },
      { py: '"\\"a\\"" in _lab_code or "\'a\'" in _lab_code', msg: 'استخدام الوضع "a" للإضافة' },
      { py: 'any(c.isdigit() for c in open("temperature.txt").read().strip().split("\\n")[-1])', msg: 'آخر سطر فيه المتوسط' },
    ],
    hint: 'f=open("temperature.txt","r")\ntotal=0\nfor line in f.readlines():\n    total=total+int(line)\nf.close()\navg=total/4\nf=open("temperature.txt","a")\nf.write("Average: "+str(avg))\nf.close()',
    sol: 'f=open("temperature.txt","w")\nf.write("14\\n")\nf.write("13\\n")\nf.write("15\\n")\nf.write("16")\nf.close()\nf=open("temperature.txt","r")\ntotal=0\nfor line in f.readlines():\n    total=total+int(line)\nf.close()\navg=total/4\nf=open("temperature.txt","a")\nf.write("\\nAverage: "+str(avg))\nf.close()\nprint(open("temperature.txt").read())' },

  { t: 'code', title: 'تحدي البرمجة: الناجحات والراسبات', p: '٢١٤ (تدريب ٥)', files: 1,
    task: 'الدرجة من 100، والنجاح من 50 فأعلى. في البداية يُنشئ الكود ملفي <code>Names.txt</code> و <code>Degrees.txt</code>.<br>أكملي البرنامج ليكتب أسماء الناجحات ودرجاتهن في <code>Success.txt</code>، والراسبات في <code>Fails.txt</code>.',
    starter: 'open("Names.txt","w").write("Noura\\nSara\\nReem\\nLama\\nHind")\nopen("Degrees.txt","w").write("75\\n45\\n90\\n30\\n50")\nnames=open("Names.txt").read().split("\\n")\ndegrees=open("Degrees.txt").read().split("\\n")\ns=open("Success.txt","w")\nf=open("Fails.txt","w")\nfor i in range(len(names)):\n    # أكملي هنا\n\ns.close()\nf.close()\nprint(open("Success.txt").read())',
    checks: [
      { py: 'all(n in open("Success.txt").read() for n in ["Noura","Reem","Hind"])', msg: 'Success.txt فيه Noura و Reem و Hind (50 ناجحة)' },
      { py: 'all(n in open("Fails.txt").read() for n in ["Sara","Lama"]) and "Noura" not in open("Fails.txt").read()', msg: 'Fails.txt فيه Sara و Lama فقط' },
    ],
    hint: '    if int(degrees[i])>=50:\n        s.write(names[i]+" "+degrees[i]+"\\n")\n    else:\n        f.write(names[i]+" "+degrees[i]+"\\n")',
    sol: 'open("Names.txt","w").write("Noura\\nSara\\nReem\\nLama\\nHind")\nopen("Degrees.txt","w").write("75\\n45\\n90\\n30\\n50")\nnames=open("Names.txt").read().split("\\n")\ndegrees=open("Degrees.txt").read().split("\\n")\ns=open("Success.txt","w")\nf=open("Fails.txt","w")\nfor i in range(len(names)):\n    if int(degrees[i])>=50:\n        s.write(names[i]+" "+degrees[i]+"\\n")\n    else:\n        f.write(names[i]+" "+degrees[i]+"\\n")\ns.close()\nf.close()\nprint(open("Success.txt").read())' },

  { t: 'master' },
] },

/* ==================== مشروع الوحدة ==================== */
{ id: 'pr', n: 7, title: 'مشروع الوحدة: حساب الدرجات', pages: '٢١٥', icon: 'trophy', project: 1,
  skills: ['أدمج القوائم والقوائم المتداخلة والملفات في برنامج واحد'],
  acts: [
  { t: 'comic', title: 'قصة: تحدي المعدّل', goal: 'مشروع يجمع كل ما تعلمتِه في الوحدة.',
    panels: [
      { w: 'k', m: 'think', s: 'عندي درجات ثلاث مواد، لكل مادة ملف فيه ٣ درجات: اختبار، ونصفي، ونهائي.' },
      { w: 'b', m: 'happy', s: 'خطة المشروع: ملفات ← قوائم ← قائمة متداخلة ← حسابات!', code: 'math.txt\nscience.txt\nsocial.txt' },
      { w: 'k', m: 'wow', s: 'سأحسب المعدل، وأعد الدرجة 19، وأحدد المادة الأعلى!' },
      { w: 'b', m: 'wink', s: 'كل خطوة يتحقق منها المعمل. هيا!' },
    ] },
  { t: 'code', title: 'المشروع: حساب الدرجات (٦ خطوات)', p: '٢١٥', files: 1, project: 1,
    task: 'الملفات <code>math.txt</code> و <code>science.txt</code> و <code>social.txt</code> جاهزة (افتحيها من «ملفاتي»).<br>١. اقرئي كل ملف في قائمة أعداد: <code>math_list</code> و <code>science_list</code> و <code>social_list</code><br>٢. اجمعي القوائم الثلاث في قائمة متداخلة <code>grades</code><br>٣. احسبي معدل الدرجات التسع في <code>avg</code><br>٤. احسبي عدد مرات تكرار الدرجة 19 في <code>c19</code><br>٥. حددي المادة التي فيها أكبر درجة في <code>best</code> (نص: "Math" أو "Science" أو "Social")',
    starter: 'def read_list(name):\n    f=open(name,"r")\n    result=[]\n    for line in f.readlines():\n        result.append(int(line))\n    f.close()\n    return result\n\nmath_list=read_list("math.txt")\n# أكملي\n',
    checks: [
      { py: 'math_list==[19,17,20] and science_list==[18,19,16] and social_list==[19,18,19]', msg: 'الخطوتان ١ و ٢: قراءة الملفات في قوائم' },
      { py: 'grades==[math_list,science_list,social_list]', msg: 'الخطوة ٣: القائمة المتداخلة grades' },
      { py: 'abs(avg-165/9)<0.01', msg: 'الخطوة ٤: المعدل ≈ 18.33' },
      { py: 'c19==4', msg: 'الخطوة ٥: الدرجة 19 تكررت 4 مرات' },
      { py: 'best=="Math"', msg: 'الخطوة ٦: المادة الأعلى Math' },
    ],
    hint: 'grades=[math_list,science_list,social_list]\ntotal=0\nc19=0\nfor sub in grades:\n    for g in sub:\n        total=total+g\n        if g==19: c19=c19+1\navg=total/9\nnames=["Math","Science","Social"]\nbest=names[[max(s) for s in grades].index(max(max(s) for s in grades))]',
    sol: 'def read_list(name):\n    f=open(name,"r")\n    result=[]\n    for line in f.readlines():\n        result.append(int(line))\n    f.close()\n    return result\n\nmath_list=read_list("math.txt")\nscience_list=read_list("science.txt")\nsocial_list=read_list("social.txt")\ngrades=[math_list,science_list,social_list]\ntotal=0\nc19=0\nfor sub in grades:\n    for g in sub:\n        total=total+g\n        if g==19:\n            c19=c19+1\navg=total/9\nprint("Average:",avg)\nprint("Count of 19:",c19)\nnames=["Math","Science","Social"]\ntops=[max(s) for s in grades]\nbest=names[tops.index(max(tops))]\nprint("Best subject:",best)' },
  { t: 'master' },
] },

/* ==================== اختبري نفسك ==================== */
{ id: 'ex', n: 8, title: 'اختبري نفسك: الوحدة الرابعة', pages: '٢٢٤–٢٢٧', icon: 'star', exam: 1,
  skills: ['أراجع مهارات الوحدة كاملة'],
  acts: [
  { t: 'quiz', title: 'أسئلة «اختبر نفسك» من الكتاب', items: [
    { q: 'السؤال السابع: ما آخر سطر يظهر على الشاشة؟', code: 'fruits=["apple","orange","banana"]\nprint(fruits)\nfruits.remove("apple")\nfruits.append("cherry")\nprint(fruits)\nfruits.sort()\nprint(fruits)\nfruits.reverse()\nprint(fruits)', o: ["['orange', 'cherry', 'banana']", "['banana', 'cherry', 'orange']", "['cherry', 'banana', 'orange']", "['orange', 'banana', 'cherry']"], a: 0, why: "بعد الحذف والإضافة: ['orange','banana','cherry']، بعد sort: ['banana','cherry','orange']، بعد reverse: ['orange','cherry','banana']." },
    { q: 'السؤال الثامن: صحيحة أم خطأ؟ «المكتبة البرمجية منظمة بحيث يمكن استخدامها بواسطة برامج متعددة ذات طبيعة مختلفة».', o: ['صحيحة', 'خطأ'], a: 0 },
    { q: 'السؤال الثامن: صحيحة أم خطأ؟ «تحتوي عينات المقطع البرمجي الخارجي دائمًا على وثائق صحيحة وكاملة».', o: ['صحيحة', 'خطأ'], a: 1, why: 'قد لا تتوفر معلومات توثيق كافية أو صحيحة.' },
    { q: 'السؤال التاسع: ما الكلمة في الفراغ الأول؟', code: 'from _______ import*\nwindow=Tk()', o: ['tkinter', 'math', 'Tk', 'canvas'], a: 0 },
    { q: 'السؤال التاسع: مستطيل يبدأ عند y=100 وارتفاعه 150. ما قيمة y2؟', code: 'canvas.create_rectangle(150,100,300,____,width=3)', o: ['250', '150', '300', '100'], a: 0, why: 'y2 = 100 + 150 = 250.' },
    { q: 'السؤال العاشر: ما الناتج الأخير؟', code: 'numbers = {1:"One", 2:"Two", 3:"Three"}\nnumbers.clear()\nprint(numbers)', o: ['{}', 'None', '[]', 'خطأ'], a: 0 },
    { q: 'السؤال العاشر: ماذا تطبع numbers.values()؟', code: 'numbers = {1:"One", 2:"Two", 3:"Three"}\nprint(numbers.values())', o: ["dict_values(['One', 'Two', 'Three'])", 'dict_keys([1, 2, 3])', "['One', 'Two', 'Three']"], a: 0 },
    { q: 'السؤال الحادي عشر: ما الناتج؟', code: 'list=[1,"a",[35,"e"]]\nprint(list[2][1])', o: ['e', '35', 'a', '1'], a: 0 },
    { q: 'السؤال الحادي عشر: ما الناتج؟', code: 'list=[["a",2],[5,"d"],[3,"e"]]\nprint(list[0][1])', o: ['2', 'a', '5', '3'], a: 0 },
    { q: 'السؤال الثاني عشر: صحيحة أم خطأ؟ «لفتح ملف للقراءة استخدم الوضع "k"».', o: ['صحيحة', 'خطأ'], a: 1, why: 'وضع القراءة هو "r".' },
    { q: 'السؤال الثاني عشر: صحيحة أم خطأ؟ «يحذف الملف السابق عندما تستخدم الوضع "w"».', o: ['صحيحة', 'خطأ'], a: 0 },
    { q: 'السؤال الثاني عشر: صحيحة أم خطأ؟ «يمكنك استخدام الوضع "a" لإلحاق نص جديد في الملف».', o: ['صحيحة', 'خطأ'], a: 0 },
  ] },
  { t: 'master' },
] },
];

// لوحة التحدي على السبورة (Jeopardy) — ٥ فئات × ٥ مستويات
// m = طريقة المشاركة | sp = مربع خاص: double / all / risk
const JEOP = {
  cats: ['القوائم والصفوف', 'المكتبات', 'تكينتر', 'القواميس', 'المتداخلة والملفات'],
  q: [
    [ { q: 'بأي رقم يبدأ ترقيم القائمة؟', a: '0', m: 'SHOW IT' },
      { q: 'ما الفرق بين القائمة والصف من حيث الأقواس والتعديل؟', a: 'القائمة [ ] قابلة للتعديل، الصف ( ) غير قابل للتعديل', m: 'DEFEND IT' },
      { q: 'grades=[89,88,98,95]\ngrades.append(100)\ngrades.remove(88)\nprint(grades)', a: '[89, 98, 95, 100]', m: 'BUILD IT', sp: 'all' },
      { q: 'رتّبي (كل طالبة تحمل سطرًا): print(C) ، C.sort() ، C=[3,1,2] ، C.reverse()\nلتطبع [3, 2, 1]', a: 'C=[3,1,2] ← C.sort() ← C.reverse() ← print(C)', m: 'ORDER IT' },
      { q: 'برنامج يحفظ رقم الهوية والبريد ودرجات تتغير. صمّمي الهياكل وبرّري.', a: 'الهوية والبريد في صف (ثابتة وآمنة)، الدرجات في قائمة', m: 'EVIDENCE IT', sp: 'risk' } ],
    [ { q: 'ما اسم النموذج الذي فيه sqrt و pi؟', a: 'math', m: 'SHOW IT' },
      { q: 'رتّبي من الأكبر للأصغر: الدالة، المكتبة القياسية، النموذج', a: 'المكتبة ← النموذج ← الدالة', m: 'ORDER IT' },
      { q: 'print(math.floor(-10.1657))', a: '-11', m: 'SHOW IT', sp: 'all' },
      { q: 'from math import sqrt\nprint(math.sqrt(9))\nلماذا الخطأ؟', a: 'math غير معرّف لأننا استوردنا sqrt وحدها', m: 'DEFEND IT', sp: 'double' },
      { q: 'اكتبي برنامجًا يحسب الأيام الباقية ليوم التأسيس ٢٢ فبراير', a: 'date.today() ثم date(today.year,2,22) وإن مضى replace(year+1) ثم الفرق .days', m: 'BUILD IT' } ],
    [ { q: 'أين تقع النقطة (0,0) في لوحة الرسم؟', a: 'الزاوية اليسرى العليا', m: 'ACT IT' },
      { q: 'ماذا ترسم create_oval(50,50,150,150)؟', a: 'دائرة', m: 'DRAW IT', sp: 'all' },
      { q: 'ما الحدث للضغط المزدوج على زر الفأرة الأيسر؟', a: '<Double-Button-1>', m: 'SHOW IT' },
      { q: 'ارسمي على السبورة: canvas.create_line(240,20,160,100,320,100,240,20)', a: 'مثلث', m: 'DRAW IT' },
      { q: 'أصلحي: points=[...]\ncanvas.create_polygon(poits,fill="green")', a: 'poits ← points', m: 'EVIDENCE IT', sp: 'risk' } ],
    [ { q: 'بماذا نصل لعناصر القاموس؟', a: 'بالمفتاح', m: 'SHOW IT' },
      { q: 'ما الفرق بين del d و d.clear()؟', a: 'del يحذف القاموس كاملًا، clear يفرغه', m: 'DEFEND IT' },
      { q: 'd={"a":1}\nd.update({"b":2,"a":5})\nprint(d)', a: "{'a': 5, 'b': 2}", m: 'BUILD IT', sp: 'all' },
      { q: 'ماذا تُرجع get() لمفتاح غير موجود؟ وماذا تُظهر [ ]؟', a: 'None / خطأ KeyError', m: 'EVIDENCE IT' },
      { q: 'بنك: bankInfo={123:["Ali",15000]}\nاكتبي سطرًا يودع 500 في الحساب 123', a: 'bankInfo[123][1]=bankInfo[123][1]+500', m: 'BUILD IT', sp: 'double' } ],
    [ { q: 'كم طول [3,["a","b","c"],7.5]؟', a: '3', m: 'SHOW IT', sp: 'all' },
      { q: 'L=[[1,2],["c","d"],[15,62,79]]\nprint(L[2][1])', a: '62', m: 'SHOW IT' },
      { q: 'أي وضع يضيف لنهاية الملف دون حذف؟', a: '"a"', m: 'ACT IT' },
      { q: 'ما الفرق بين readline() و readlines()؟', a: 'سطر واحد / كل الأسطر في قائمة', m: 'DEFEND IT' },
      { q: 'ملف الدرجات أصبح فيه سطر المجموع فقط. ماذا حدث؟ وكيف نمنعه؟', a: 'فُتح بالوضع "w"؛ نستخدم "a"', m: 'EVIDENCE IT', sp: 'risk' } ],
  ],
  final: { q: 'التحدي النهائي: صمّمن برنامجًا لمتجر إلكتروني يحفظ: بيانات المتجر الثابتة، وأسعار المنتجات (تتغير)، ورصيد كل عميل برقم حسابه، ويحفظ الطلبات في ملف دون حذف القديمة. حددن هيكل البيانات لكل جزء ووضع الملف مع التبرير.', a: 'بيانات المتجر: صف • الأسعار: قائمة (أو قاموس منتج: سعر) • العملاء: قاموس رقم الحساب: [الاسم، الرصيد] • الطلبات: ملف بالوضع "a"' },
};
const MODES = {
  'SHOW IT': 'كل الطالبات يرفعن الإجابة معًا: 3…2…1 SHOW!',
  'BUILD IT': 'كل عضوة تضيف جزءًا من الحل.',
  'ACT IT': 'المجموعة تمثّل الإجابة بالحركة.',
  'DRAW IT': 'كل عضوة ترسم جزءًا على السبورة.',
  'EVIDENCE IT': 'كل طالبة تقدّم دليلًا من الدرس.',
  'ORDER IT': 'كل طالبة تحمل بطاقة وتقف في الترتيب الصحيح.',
  'DEFEND IT': 'الفريق يختار إجابة ثم تبرّرها عضوتان.',
};
