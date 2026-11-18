// أفلام ثاني متوسط ف١: فيلم لكل محطة + لقطة سريعة لكل دالة أو أمر جديد
'use strict';
(() => {
  const { F, clip } = FILM, put = (id, films) => { const L = LESSONS.find(x => x.id === id); if (L) L.films = films; };
  const C = { c1: '#6C5CE7', c2: '#A29BFE' };
  put('t1', [
    F('المعاملات الشرطية والمنطقية', 'صواب أم خطأ؟', [
      { t: 'talk', w: 'k', m: 'think', say: 'كيف يعرف الحاسب أن 7 أكبر من 3؟' },
      { t: 'steps', title: 'المعاملات الشرطية', items: ['== يساوي', '!= لا يساوي', '> أكبر من', '< أصغر من', '>= أكبر من أو يساوي', '<= أصغر من أو يساوي'], say: 'المعاملات الشرطية تقارن بين قيمتين، وترجع صوابًا أو خطأ.' },
      { t: 'code', code: 'x = 5\ny = 6\nprint(x == y)\nprint(x < y)', out: 'False\nTrue', say: 'خمسة لا تساوي ستة فيظهر False، وخمسة أصغر من ستة فيظهر True.' },
      { t: 'talk', w: 'b', m: 'wink', say: 'وللجمع بين مقارنتين: and تحتاج الاثنتين صحيحتين، و or تكفيها واحدة، و not تعكس الجواب.' },
    ], C),
    clip('== و =', 'علامة = تضع قيمة في المتغير، أما == فتسأل: هل القيمتان متساويتان؟', 'x = 10\nprint(x == 10)\nprint(x == 7)', 'True\nFalse', 'أكثر خطأ شائع: كتابة = بدل ==.'),
    clip('and و or و not', 'and صحيحة إذا صحّ الشرطان، و or إذا صحّ أحدهما، و not تعكس.', 'a = 2\nprint(a > 0 and a < 5)\nprint(a > 9 or a == 2)\nprint(not a == 2)', 'True\nTrue\nFalse', 'يُنفَّذ not أولًا، ثم and، ثم or.'),
  ]);
  put('t2', [
    F('الجملة الشرطية if', 'الحاسب يقرر', [
      { t: 'talk', w: 'q', m: 'happy', say: 'أمام البوابة حارس يسألني عن الشرط. إذا كان صحيحًا تُفتح البوابة.' },
      { t: 'code', code: 'grade = 17\nif grade >= 10:\n    print("ناجح")', out: 'ناجح', say: 'الشرط صحيح، فيُنفَّذ السطر المُزاح تحت if.' },
      { t: 'code', code: 'grade = 7\nif grade >= 10:\n    print("ناجح")\nprint("انتهى")', out: 'انتهى', say: 'الشرط خطأ فيُتجاوز السطر المُزاح، أما السطر غير المُزاح فيُنفَّذ دائمًا.' },
      { t: 'steps', title: 'لا تنسي', items: ['النقطتان : بعد الشرط', 'المسافة البادئة قبل العبارات التابعة', 'المقارنة بـ == لا بـ ='], say: 'نقطتان بعد الشرط، ومسافة بادئة، ومقارنة بعلامتي يساوي.' },
    ], C),
    clip('if: جملة الشرط', 'if تنفّذ العبارات المُزاحة تحتها فقط إذا تحقق الشرط.', 'x = 5\nif x > 0:\n    print("رقم موجب")', 'رقم موجب', 'جرّبي x = -3: لن يُطبع شيء.'),
  ]);
  put('t3', [
    F('else و elif', 'طريقان… أو أكثر', [
      { t: 'talk', w: 'k', m: 'think', say: 'if تخبرني ماذا أفعل إذا تحقق الشرط. فماذا لو لم يتحقق؟' },
      { t: 'code', code: 'x = -2\nif x > 0:\n    print("موجب")\nelse:\n    print("سالب أو صفر")', out: 'سالب أو صفر', say: 'else طريق ثانٍ يُنفَّذ عندما يكون الشرط خطأ، ولا يأتي بعدها شرط.' },
      { t: 'code', code: 'g = 6\nif g >= 8:\n    print("ممتاز")\nelif g >= 5:\n    print("جيد جدًا")\nelse:\n    print("اجتهد أكثر")', out: 'جيد جدًا', say: 'elif لشروط إضافية. أول شرط صحيح يُنفَّذ، ويُتجاوز الباقي.' },
      { t: 'steps', title: 'أي نوع أختار؟', items: ['خيار واحد ← if', 'خياران ← if...else', 'أكثر من خيارين ← if...elif...else'], say: 'عدّي الطرق في المشكلة: طريق واحد، أو طريقان، أو أكثر.' },
    ], C),
    clip('else', 'else تلتقط كل ما لم يحققه شرط if، ولا يأتي بعدها شرط أبدًا.', 'age = 15\nif age >= 18:\n    print("يمكنكِ القيادة")\nelse:\n    print("لم يحن الوقت")', 'لم يحن الوقت', 'else: بنقطتين فقط.'),
    clip('elif', 'elif تعني «وإلا إذا»: شرط جديد يُفحص فقط إذا كان ما قبله خطأ.', 't = 34\nif t < 15:\n    print("بارد")\nelif t <= 30:\n    print("معتدل")\nelse:\n    print("حار")', 'حار', 'ترتيب الشروط مهم!'),
  ]);
  put('t4', [
    F('الشروط المتداخلة', 'بوابة داخل بوابة', [
      { t: 'talk', w: 'b', m: 'wink', say: 'التداخل: جملة if داخل جملة if أخرى. والمسافة البادئة تحدد لمن تنتمي.' },
      { t: 'code', code: 'g = 16\nif g > 10:\n    print("نجحت")\n    if g <= 15:\n        print("C")\n    else:\n        print("B أو A")\nelse:\n    print("لم تنجحي")', out: 'نجحت\nB أو A', say: 'الشرط الداخلي لا يُفحص إلا إذا تحقق الشرط الخارجي.' },
      { t: 'talk', w: 'k', m: 'wow', say: 'إذن لو كانت الدرجة ثمانية، لن تُفحص الشروط الداخلية أبدًا!' },
    ], C),
    clip('if داخل else', 'نضع if داخل else بمسافة بادئة إضافية.', 'x = -4\nif x == 0:\n    print("صفر")\nelse:\n    if x < 0:\n        print("سالب")\n    else:\n        print("موجب")', 'سالب', 'كل مستوى أعمق: أربع مسافات إضافية.'),
  ]);
  put('t5', [
    F('الحلقات', 'آلة التكرار', [
      { t: 'talk', w: 'k', m: 'think', say: 'أريد طباعة الأرقام من صفر إلى أربعة. هل أكتب print خمس مرات؟' },
      { t: 'code', code: 'for i in range(5):\n    print(i)', out: '0\n1\n2\n3\n4', say: 'حلقة for تكرر الأوامر، والنطاق range يحدد العدد: يبدأ من صفر وينتهي قبل الرقم.' },
      { t: 'code', code: 'x = 3\nwhile x > 0:\n    print(x)\n    x = x - 1', out: '3\n2\n1', say: 'while تتكرر ما دام الشرط صحيحًا. ولا بد أن يتغير شيء داخلها، وإلا لن تتوقف!' },
      { t: 'talk', w: 'b', m: 'wink', say: 'وعبارة break توقف الحلقة فورًا.' },
    ], C),
    clip('range', 'range(بداية, نهاية, خطوة): تبدأ من البداية وتتوقف قبل النهاية.', 'for i in range(2, 10, 3):\n    print(i)', '2\n5\n8', 'الخطوة يمكن أن تكون سالبة للعد التنازلي.'),
    clip('while', 'while تكرر ما دام شرطها صحيحًا.', 'n = 1\nwhile n < 20:\n    n = n * 2\nprint(n)', '32', 'تحققي أن الشرط يصبح خطأ يومًا ما.'),
    clip('break', 'break تخرج من الحلقة فورًا، حتى لو كان شرطها ما زال صحيحًا.', 'for i in range(10):\n    if i == 4:\n        break\n    print(i)', '0\n1\n2\n3', 'تعمل مع for و while.'),
  ]);
  put('t6', [
    F('الحلقات المتداخلة', 'حلقة داخل حلقة', [
      { t: 'talk', w: 'q', m: 'happy', say: 'الساعة الرقمية: الثواني تدور ستين مرة لكل دقيقة، والدقائق ستين مرة لكل ساعة!' },
      { t: 'code', code: 'for i in range(2):\n    for j in range(3):\n        print(i, j)', out: '0 0\n0 1\n0 2\n1 0\n1 1\n1 2', say: 'الحلقة الداخلية تُكمل كل دوراتها لكل دورة من الخارجية: اثنان في ثلاثة يساوي ستة أسطر.' },
      { t: 'code', code: 'for i in range(1, 5):\n    for j in range(i):\n        print("*", end=" ")\n    print()', out: '*\n* *\n* * *\n* * * *', say: 'وبها نرسم أنماطًا: الخارجية للصفوف، والداخلية للأعمدة.' },
    ], C),
    clip('end=" "', 'end=" " تجعل print تختم بمسافة بدل الانتقال إلى سطر جديد.', 'for i in range(4):\n    print(i, end=" ")', '0 1 2 3', 'ثم نستخدم print() الفارغة للانتقال إلى سطر جديد.'),
  ]);
  put('t7', [
    F('الدوال', 'وصفة باسم', [
      { t: 'talk', w: 'k', m: 'happy', say: 'استخدمتُ دوالًا جاهزة كثيرة: print و input و range. والآن أصنع دالتي!' },
      { t: 'code', code: 'def hello():\n    print("مرحبًا")\n\nhello()\nhello()', out: 'مرحبًا\nمرحبًا', say: 'def تعرّف الدالة، ولا تُنفَّذ إلا عند استدعائها باسمها والأقواس.' },
      { t: 'code', code: 'def area(l, w):\n    return l * w\n\nprint(area(3, 5))', out: '15', say: 'المعاملات بين قوسي التعريف، والوسائط عند الاستدعاء، و return ترجع الناتج.' },
      { t: 'talk', w: 'q', m: 'wow', say: 'والمتغيرات داخل الدالة محلية: تولد عند الاستدعاء وتختفي بعده.' },
    ], C),
    clip('def', 'def تعرّف دالة جديدة: اسم، وأقواس، ونقطتان، وأوامر مُزاحة.', 'def welcome(name):\n    print("مرحبًا يا", name)\n\nwelcome("ريم")', 'مرحبًا يا ريم', 'الدالة توفّر تكرار الكود.'),
    clip('return', 'return تنهي الدالة وترجع قيمة يمكن تخزينها أو استخدامها.', 'def square(a):\n    return a * a\n\nx = square(4) + 1\nprint(x)', '17', 'print تعرض فقط، أما return فترجع القيمة.'),
    clip('global', 'global تسمح للدالة بتغيير متغير عام.', 'x = 50\ndef f():\n    global x\n    x = 2\nf()\nprint(x)', '2', 'بدون global يبقى x = 50.'),
  ]);
  put('t8', [
    F('بايثون وإكسل', 'مكتبة أوبين بيكسل', [
      { t: 'talk', w: 'k', m: 'think', say: 'ملف التغذية فيه عشرة أطعمة. هل أغيّر كل خلية بيدي؟' },
      { t: 'code', code: 'import openpyxl\nwb = openpyxl.load_workbook("nutrition.xlsx")\nprint(wb.sheetnames)', out: "['english', 'arabic']", say: 'نستورد المكتبة، ونحمّل دفتر العمل، ونرى أسماء أوراقه.' },
      { t: 'code', code: 'sheet = wb["arabic"]\nprint(sheet["C3"].value)', out: '61', say: 'نختار الورقة، ونصل إلى الخلية بموقعها، ونأخذ قيمتها بـ value.' },
      { t: 'talk', w: 'b', m: 'wink', say: 'وبحلقة واحدة نعدّل الخلايا كلها، ثم نحفظ بـ wb.save.' },
    ], C),
    clip('load_workbook', 'load_workbook تفتح ملف إكسل موجودًا في المجلد نفسه.', 'import openpyxl\nwb = openpyxl.load_workbook("nutrition.xlsx")\nsheet = wb["arabic"]\nprint(sheet.max_row)', '12', 'max_row عدد الصفوف.'),
    clip('cell(row, column).value', 'نقرأ الخلية برقم صفها وعمودها، ونأخذ قيمتها.', 'print(sheet.cell(row=3, column=1).value)', 'الحليب', 'الصف 3 والعمود 1 = A3.'),
    clip('iter_rows', 'iter_rows تعطينا صفوفًا كاملة نمر عليها بحلقتين.', 'for row in sheet.iter_rows(min_row=3, max_row=3, min_col=1, max_col=3):\n    for cell in row:\n        print(cell.value, end=" ")', 'الحليب 88.1 61', 'و iter_cols للأعمدة.'),
    clip('wb.save', 'التعديلات لا تُحفظ في الملف إلا بـ wb.save.', 'sheet.cell(row=1, column=2).value = "30 جرام"\nwb.save("nutrition.xlsx")', '✔ حُفظ الملف', 'أغلقي الملف في إكسل قبل الحفظ.'),
  ]);
})();
