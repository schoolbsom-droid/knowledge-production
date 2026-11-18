// أفلام ثالث متوسط: فيلم لكل محطة + لقطة سريعة لكل دالة أو أمر جديد
'use strict';
(() => {
  const { F, clip } = FILM, put = (id, films) => { const L = LESSONS.find(x => x.id === id); if (L) L.films = films; };
  const C = { c1: '#0984E3', c2: '#74B9FF' };
  put('l1', [
    F('القوائم والصفوف', 'قطار من العربات', [
      { t: 'talk', w: 'q', m: 'happy', say: 'القائمة مثل قطار: كل عربة فيها قيمة، وعليها رقم يبدأ من صفر.' },
      { t: 'boxes', title: 'grades = [89, 88, 98]', states: [{ ln: 'grades[0]', v: { '[0]': 89, '[1]': 88, '[2]': 98 }, hi: '[0]' }, { ln: 'grades[-1]', v: { '[0]': 89, '[1]': 88, '[2]': 98 }, hi: '[2]' }, { ln: 'grades.append(95)', v: { '[0]': 89, '[1]': 88, '[2]': 98, '[3]': 95 }, hi: '[3]' }], say: 'الفهرس صفر لأول عنصر، وسالب واحد لآخر عنصر، و append تضيف عربة في النهاية.' },
      { t: 'code', code: 'grades = [89, 88, 98]\ngrades.append(95)\nprint(grades[0], grades[-1], len(grades))', out: '89 95 4', say: 'len تعطينا عدد العناصر.' },
      { t: 'talk', w: 'b', m: 'wink', say: 'أما الصف tuple فقطار مقفل: بين قوسين، ولا يمكن تعديل عناصره.' },
    ], C),
    clip('الفهرسة [ ]', 'نصل إلى العنصر برقمه بين قوسين مربعين، والعد يبدأ من صفر.', 'a = ["قلم", "كتاب", "دفتر"]\nprint(a[1])\nprint(a[-1])', 'كتاب\nدفتر', 'a[3] هنا تسبب IndexError.'),
    clip('append و remove', 'append تضيف في النهاية، و remove تحذف قيمة.', 'a = [5, 8]\na.append(3)\na.remove(8)\nprint(a)', '[5, 3]', 'و insert تضيف في مكان محدد.'),
    clip('الصف tuple', 'الصف مثل القائمة لكنه بين قوسين ولا يُعدَّل.', 't = (4, 7, 9)\nprint(t[1])', '7', 't[1] = 8 تسبب خطأ.'),
  ]);
  put('l2', [
    F('المكتبات البرمجية', 'صناديق أدوات جاهزة', [
      { t: 'talk', w: 'k', m: 'think', say: 'أريد جذرًا تربيعيًا ورقمًا عشوائيًا… هل أبرمجهما من الصفر؟' },
      { t: 'talk', w: 'b', m: 'happy', say: 'لا! المكتبة صندوق دوال جاهزة. نستوردها بـ import ونستخدمها.' },
      { t: 'code', code: 'import math\nimport random\nprint(math.sqrt(16))\nprint(random.randint(1, 6))', out: '4.0\n3', say: 'sqrt للجذر التربيعي، و randint لعدد عشوائي بين رقمين.' },
      { t: 'code', code: 'from math import pi\nprint(round(pi, 2))', out: '3.14', say: 'ومع from نستورد دالة واحدة ونكتب اسمها مباشرة.' },
    ], C),
    clip('import math', 'مكتبة الرياضيات فيها الجذر والتقريب والثوابت.', 'import math\nprint(math.sqrt(25))\nprint(math.floor(4.9))', '5.0\n4', 'نكتب اسم المكتبة ثم نقطة ثم الدالة.'),
    clip('random.randint', 'randint(أ, ب) تعطي عددًا صحيحًا عشوائيًا من أ إلى ب.', 'import random\nprint(random.randint(1, 10))', '7', 'يتغير الناتج في كل تشغيل.'),
  ]);
  put('l3', [
    F('تكينتر: الرسم بالكود', 'لوحة وألوان', [
      { t: 'talk', w: 'k', m: 'happy', say: 'سأصنع نافذة فيها لوحة رسم، وأرسم بالأوامر!' },
      { t: 'code', code: 'from tkinter import *\nw = Tk()\nc = Canvas(w, width=300, height=200)\nc.pack()', out: '🪟 نافذة فيها لوحة 300 × 200', say: 'Tk تصنع النافذة، و Canvas لوحة الرسم، و pack تعرضها.' },
      { t: 'talk', w: 'q', m: 'wow', say: 'انتبهي: النقطة صفر صفر في الزاوية العليا اليسرى، وكلما زادت y نزلنا للأسفل!' },
      { t: 'code', code: 'c.create_rectangle(20, 20, 120, 80, fill="red")\nc.create_oval(150, 20, 250, 120, fill="yellow")', out: '🟥 مستطيل أحمر و 🟡 دائرة صفراء', say: 'نحدد زاويتين متقابلتين، و fill للون.' },
    ], C),
    clip('create_line', 'create_line ترسم خطًا بين نقطتين.', 'c.create_line(0, 0, 300, 200, width=3)', '╲ خط قطري', 'النقطة الأولى ثم الثانية.'),
    clip('create_oval', 'create_oval ترسم شكلًا بيضاويًا داخل مستطيل وهمي، ويصبح دائرة إذا تساوى العرض والارتفاع.', 'c.create_oval(50, 50, 150, 150, fill="blue")', '🔵 دائرة', 'جرّبي 50, 50, 250, 150.'),
  ]);
  put('l4', [
    F('القواميس', 'خزائن بمفاتيح', [
      { t: 'talk', w: 'q', m: 'happy', say: 'القاموس خزائن: لكل خزانة مفتاح، وفيها قيمة. نفتحها بالمفتاح لا بالرقم.' },
      { t: 'boxes', title: 'grades = {"Sara": 95, "Noura": 88}', states: [{ ln: 'grades["Noura"]', v: { Sara: 95, Noura: 88 }, hi: 'Noura' }, { ln: 'grades["Reem"] = 91', v: { Sara: 95, Noura: 88, Reem: 91 }, hi: 'Reem' }], say: 'نقرأ القيمة بمفتاحها، ونضيف مفتاحًا جديدًا بالإسناد.' },
      { t: 'code', code: 'g = {"Sara": 95}\nprint(g.get("Hind"))', out: 'None', say: 'get ترجع None بهدوء إذا لم يوجد المفتاح، أما الأقواس المربعة فتسبب KeyError.' },
    ], C),
    clip('get', 'get(المفتاح) تقرأ القيمة بأمان.', 'g = {"a": 1}\nprint(g.get("a"))\nprint(g.get("z"))', '1\nNone', 'لا خطأ حتى لو لم يوجد المفتاح.'),
    clip('keys و values و items', 'نحصل على المفاتيح أو القيم أو الأزواج.', 'g = {"Sara": 95, "Noura": 88}\nfor k, v in g.items():\n    print(k, v)', 'Sara 95\nNoura 88', 'items مفيدة مع الحلقات.'),
  ]);
  put('l5', [
    F('القوائم المتداخلة', 'جدول من صفوف وأعمدة', [
      { t: 'talk', w: 'b', m: 'wink', say: 'القائمة المتداخلة قائمة عناصرها قوائم: مثل جدول له صفوف وأعمدة.' },
      { t: 'code', code: 'm = [[1, 2, 3],\n     [4, 5, 6]]\nprint(m[1][2])', out: '6', say: 'الرقم الأول للصف، والثاني للعمود: الصف واحد والعمود اثنان.' },
      { t: 'code', code: 'for row in m:\n    for x in row:\n        print(x, end=" ")\n    print()', out: '1 2 3\n4 5 6', say: 'وبحلقتين متداخلتين نمر على كل العناصر.' },
    ], C),
    clip('m[i][j]', 'i رقم الصف (القائمة الداخلية)، و j رقم العمود داخلها.', 'm = [[5, 6], [7, 8]]\nprint(m[0][1])\nprint(m[1][0])', '6\n7', 'm[1, 0] خطأ؛ نكتب m[1][0].'),
  ]);
  put('l6', [
    F('الملفات', 'نحفظ ونقرأ', [
      { t: 'talk', w: 'k', m: 'think', say: 'أغلقتُ البرنامج فضاعت البيانات! كيف أحفظها؟' },
      { t: 'steps', title: 'أوضاع فتح الملف', items: ['"r" للقراءة', '"w" للكتابة: يمسح القديم', '"a" للإضافة في النهاية'], say: 'r للقراءة، و w للكتابة من جديد، و a للإضافة دون حذف.' },
      { t: 'code', code: 'f = open("notes.txt", "w")\nf.write("مرحبا\\n")\nf.close()\nf = open("notes.txt", "r")\nprint(f.read())', out: 'مرحبا', say: 'نفتح، ونكتب، ونغلق، ثم نفتح للقراءة.' },
    ], C),
    clip('open و close', 'open تفتح الملف بوضع محدد، و close تغلقه بعد الانتهاء.', 'f = open("cities.txt", "r")\nprint(f.readline())\nf.close()', 'Riyadh', 'readline تقرأ سطرًا واحدًا.'),
    clip('الوضع "a"', 'الوضع "a" يضيف إلى نهاية الملف دون حذف القديم.', 'f = open("cities.txt", "a")\nf.write("Abha\\n")\nf.close()', '✔ أُضيفت مدينة', 'أما "w" فيمسح المحتوى.'),
  ]);
})();
