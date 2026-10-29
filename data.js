// بيانات المنصة: المراحل (روابط Google Drive) وجدول الحصص
const GRADES = [
  {name: 'أول متوسط', classes: 3,
   units: [['تعلّم الأساسيات', '1Mwfel_3CcE4wMX19PEGQAqSIIDUwqUKT'], ['معالجة النصوص المتقدمة', '1tgbHuiP06rFhJJ_bJ5fbwD4oVi4yh9bb'],
           ['التنسيق المتقدم والدوال', '16PLkWhp21iT5Rz-vShoimiq17bQ_cIx2'], ['البرمجة مع بايثون', '1gcUTzeQn1zathwY-Tz4irzDWR7WzDXPR']],
   plans: '1feaHc9273zvzqSkt978CzNCJLpC0DAfX', books: '1EeR8LDRdKIqGBiZ_9eG54sRR0LP0zIfU',
   dist: '1Pn-0T2iBjA7Uudf3Ewca9YyDjv4GiVhJ', font: '1QvRNPgFWtkQBPi1qp9mAGodDEL6AmPMi'},
  {name: 'ثاني متوسط', classes: 3,
   units: [['إنتاج مقطع فيديو', '1pkfo08wRVbpFZhcUhLkZ2BkLNgX8x1O-'], ['مخطط المعلومات البياني', '1ncWQZ44FS_Fq93D1WsMALv8Ih_PKRZqB'],
           ['البرمجة باستخدام لغة بايثون', '1rGKB0o7tHd0by1mu17Ld0N1c38RRJhd5']],
   plans: '1IUP74NedJdfS1hDFUeasDjkq_tvPxmyp', books: '1fOSkVzue837Rirq-DAKdd1bau9xV8Al9',
   dist: '1NDTgxjzun6ehmseWVcE4DzlGgBYsFp-e', font: '1_uipjQs9TQb6w8gmqxjcjpKlm1t_PCht'},
  {name: 'ثالث متوسط', classes: 3,
   units: [['الأمن السيبراني', '19g1szlFue2yMH5B1EF27YSzcA1pg5ULA'], ['قواعد البيانات', '1-ZXCOLZ_Ftj_LcAJ-QrSsM1oGFMDzroT'],
           ['التجارة الإلكترونية', '1NI5xVb8fPtwe_cr0BPSkfb8SVq6Gc7Ci'], ['البرمجة مع بايثون', '12Vi0ywzmTCarzSDJ5k5K_zL7lkT_taar']],
   plans: '1X9Vn8iJdGjVwsz7eFgtMHD_dLIBxU4Q9', books: '1-P1l7FubxjTPB_C_z9Xtcw_X4s6HZJgG',
   dist: '1xgASXWwRkxu29EIUFp2fwuiUTjWiC_sY', font: '1W0aVBTN7182Pf2UaWpaMsmWNZHg0MuXp'},
];

// الإنتاج المعرفي: g = رقم المرحلة (0 أول، 1 ثاني، 2 ثالث)، u = رقم الوحدة، kind = درس أو اختبار
const LESSONS = [
  {g: 1, u: 2, kind: 'اختبار', title: 'اختبار المعاملات في بايثون', url: 'lessons/python-operators-quiz.html'},
  {g: 1, u: 2, kind: 'اختبار', title: 'كيف أكتب جملة if؟', url: 'lessons/if-statement.html'},
  {g: 1, u: 2, kind: 'درس', title: 'الجمل الشرطية الثلاث والمسافة البادئة', url: 'lessons/conditional-statements.html'},];

// TT[0] = الأحد … TT[4] = الخميس؛ p = أرقام الحصص
const TT = [
  [{p: [2, 3], c: 'ثاني متوسط ٣'}, {p: [6, 7], c: 'ثالث متوسط ٣'}],
  [{p: [1, 2], c: 'أول متوسط ١'}, {p: [6, 7], c: 'أول متوسط ٣'}],
  [{p: [1, 2], c: 'ثاني متوسط ٢'}, {p: [5], c: 'ثالث متوسط ١', note: 'نشاط'}, {p: [6, 7], c: 'أول متوسط ٢'}],
  [{p: [3, 4], c: 'ثالث متوسط ٢'}, {p: [6, 7], c: 'ثالث متوسط ١'}],
  [{p: [5, 6], c: 'ثاني متوسط ١'}],
];
