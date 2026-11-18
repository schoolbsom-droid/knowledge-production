// أفلام ثاني متوسط ف٢ (برمجة الروبوت): فيلم لكل محطة + لقطة لكل أمر جديد
'use strict';
(() => {
  const { F, clip } = FILM, put = (id, films) => { const L = LESSONS.find(x => x.id === id); if (L) L.films = films; };
  const C = { c1: '#E17055', c2: '#FAB1A0' }, R = { c1: '#F28C28', c2: '#FDCB6E' };
  put('r1', [
    F('المتغيرات تتحكم في الروبوت', 'صندوق السرعة', [
      { t: 'talk', w: 'k', m: 'happy', say: 'روبوتي في فيكس كود في آر يحتاج أن يتذكر سرعته. أين يحفظها؟' },
      { t: 'boxes', title: 'المتغير speed', states: [{ ln: 'speed = 10', v: { speed: 10 }, hi: 'speed' }, { ln: 'speed = speed + 20', v: { speed: 30 }, hi: 'speed' }, { ln: 'speed = speed + 20', v: { speed: 50 }, hi: 'speed' }], say: 'المتغير صندوق يحمل قيمة واحدة، ولبنة «تغيير» تزيدها.' },
      { t: 'turtle', robot: 1, moves: [['fd', 50, 'drive_for(FORWARD, 200, MM)'], ['fd', 60, 'speed = speed + 20'], ['fd', 70, 'drive_for(FORWARD, 200, MM)']], color: '#F28C28', say: 'كلما زادت قيمة speed تحرك الروبوت أسرع.' },
      { t: 'talk', w: 'b', m: 'wink', say: 'وحدة تحكم المراقبة تعرض قيمة المتغير أثناء التشغيل، لكنها لا تغيّرها.' },
    ], C),
    clip('speed = speed + 20', 'لبنة «تغيير speed من قبل 20» تقرأ القيمة القديمة، وتجمع، ثم تضع الناتج مكانها.', 'speed = 10\nspeed = speed + 20\nprint(speed)', '30', 'للإنقاص نكتب رقمًا سالبًا.', R),
  ]);
  put('r2', [
    F('الحساب والتكرار', 'العدّاد يقود الروبوت', [
      { t: 'code', code: 'x = 2\nMultiplication = x * 6\nprint(Multiplication)', out: '12', say: 'لبنة الضرب في فئة العمليات، وفي بايثون نكتبها بالنجمة.' },
      { t: 'talk', w: 'q', m: 'happy', say: 'وتكرار حتى: أكرر الأوامر حتى يصبح الشرط صحيحًا، ومعي عدّاد يزيد في كل دورة.' },
      { t: 'turtle', robot: 1, moves: [['fd', 100, 'drive_for(FORWARD, 400, MM)'], ['rt', 90, 'turn_for(RIGHT, 90, DEGREES)'], ['fd', 100, 'Counter = Counter + 1'], ['rt', 90, ''], ['fd', 100, ''], ['rt', 90, ''], ['fd', 100, 'Counter == 4 ← توقف']], color: '#2B2030', say: 'أربعة أضلاع بانعطاف تسعين درجة، والعدّاد يوقف التكرار عند أربعة: مربع!' },
      { t: 'talk', w: 'b', m: 'wink', say: 'وباقي القسمة على اثنين يخبرنا: زوجي أم فردي.' },
    ], C),
    clip('% ما تبقى من', 'العدد الزوجي باقي قسمته على 2 يساوي صفرًا، والفردي باقيه واحد.', 'print(8 % 2)\nprint(7 % 2)', '0\n1', 'بها نلوّن الأضلاع بالتناوب.', R),
    clip('تكرار حتى = while not', 'لبنة «تكرار حتى» تُكتب في بايثون while not، وتتوقف عندما يصبح الشرط صحيحًا.', 'Counter = 0\nwhile not Counter > 5:\n    Counter = Counter + 1\nprint(Counter)', '6', 'لا تنسي زيادة العدّاد داخل الحلقة.', R),
  ]);
  put('r3', [
    F('عارض الكود', 'اللبنة تتكلم بايثون', [
      { t: 'talk', w: 'k', m: 'wow', say: 'ضغطتُ على عارض الكود فظهر مشروعي نفسه مكتوبًا بلغة بايثون!' },
      { t: 'code', code: 'drivetrain.drive_for(FORWARD, 200, MM)\ndrivetrain.turn_for(RIGHT, 90, DEGREES)', out: '🤖 تقدّم 200 mm ثم انعطف يمينًا', say: 'بين القوسين المعاملات: الاتجاه، ثم المسافة، ثم الوحدة، وبينها فواصل.' },
      { t: 'turtle', robot: 1, moves: [['fd', 90, 'drive_for(FORWARD, 200, MM)'], ['rt', 90, 'turn_for(RIGHT, 90, DEGREES)'], ['fd', 90, 'drive_for(FORWARD, 200, MM)']], color: '#0984E3', say: 'هكذا ينفّذ الروبوت الأمرين.' },
      { t: 'code', code: 'for repeat_count in range(9):\n    drivetrain.drive_for(FORWARD, 200, MM)', out: '🤖 تسع خطوات', say: 'ولبنة «تكرار 9» تصبح حلقة for مع النطاق range.' },
    ], C),
    clip('drive_for و turn_for', 'drive_for للحركة بالمليمتر، و turn_for للانعطاف بالدرجات.', 'drivetrain.drive_for(FORWARD, 400, MM)\ndrivetrain.turn_for(LEFT, 45, DEGREES)', '🤖 للأمام 400 ثم يسار 45', 'REVERSE للخلف، و RIGHT لليمين.', R),
    clip('set_drive_velocity', 'تضبط سرعة القيادة بنسبة مئوية.', 'drivetrain.set_drive_velocity(80, PERCENT)', '🤖 السرعة 80 %', 'تقابل لبنة «اضبط سرعة القيادة».', R),
  ]);
  put('r4', [
    F('البرمجة التركيبية', 'لبنة من صنعكِ', [
      { t: 'talk', w: 'k', m: 'think', say: 'أريد خطًا متعرجًا من تسع خطوات. هل أكرر اللبنات الأربع تسع مرات؟' },
      { t: 'talk', w: 'b', m: 'happy', say: 'لا! اجمعيها في عنصر برمجة جديد، وفي بايثون نعرّفه بـ def.' },
      { t: 'code', code: 'def one_step_zigzag():\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(RIGHT, 90, DEGREES)\n    drivetrain.drive_for(FORWARD, 200, MM)\n    drivetrain.turn_for(LEFT, 90, DEGREES)\n\nfor repeat_count in range(3):\n    one_step_zigzag()', out: '🤖 درج من ثلاث درجات', say: 'نعرّف الخطوة مرة واحدة، ثم نستدعيها داخل التكرار.' },
      { t: 'turtle', robot: 1, moves: [['fd', 50, ''], ['rt', 90, ''], ['fd', 50, ''], ['lt', 90, ''], ['fd', 50, ''], ['rt', 90, ''], ['fd', 50, ''], ['lt', 90, ''], ['fd', 50, ''], ['rt', 90, ''], ['fd', 50, '']], color: '#00A884', say: 'وهذا هو الدرج.' },
    ], C),
    clip('def = My Block', 'عنصر البرمجة الجديد يُعرَّف بـ def، ولا يُنفَّذ إلا عند استدعائه.', 'def Petal():\n    drivetrain.drive_for(FORWARD, 180, MM)\n    drivetrain.turn_for(RIGHT, 30, DEGREES)\n\nPetal()', '🌸 جزء من بتلة', 'استدعيه مرات كثيرة.', R),
  ]);
  put('r5', [
    F('المعاملات', 'زهرة صغيرة وزهرة كبيرة', [
      { t: 'talk', w: 'k', m: 'think', say: 'بتلتي حجمها ثابت دائمًا. كيف أرسم زهورًا بأحجام مختلفة؟' },
      { t: 'code', code: 'def square(side):\n    for repeat_count in range(4):\n        drivetrain.drive_for(FORWARD, side, MM)\n        drivetrain.turn_for(RIGHT, 90, DEGREES)\n\nsquare(200)\nsquare(400)', out: '🤖 مربعان بحجمين', say: 'المعامل side صندوق مؤقت يأخذ رقم الإدخال في كل استدعاء.' },
      { t: 'turtle', robot: 1, moves: [['fd', 50, 'square(200)'], ['rt', 90, ''], ['fd', 50, ''], ['rt', 90, ''], ['fd', 50, ''], ['rt', 90, ''], ['fd', 50, ''], ['rt', 90, ''], ['fd', 100, 'square(400)'], ['rt', 90, ''], ['fd', 100, ''], ['rt', 90, ''], ['fd', 100, ''], ['rt', 90, ''], ['fd', 100, '']], color: '#6C5CE7', say: 'الوصفة نفسها، والحجم يتغير بالرقم.' },
    ], C),
    clip('المعامل ورقم الإدخال', 'نضع اسم المعامل مكان الرقم الثابت، ونعطيه القيمة عند الاستدعاء.', 'def Petal(L):\n    drivetrain.drive_for(FORWARD, L, MM)\n\nPetal(100)\nPetal(270)', '🌸 بتلة صغيرة ثم كبيرة', 'يمكن أن يكون للعنصر أكثر من معامل.', R),
  ]);
})();
