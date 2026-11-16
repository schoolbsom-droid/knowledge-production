// «ورشة الدوال»: كل دالة أداة لها صورة ذهنية؛ الطالبة تستخدمها وترى أثرها في الذاكرة والكود المقابل
'use strict';
const pyList = a => '[' + a.map(fv).join(', ').replace(/"/g, "'") + ']';
const pyDict = a => '{' + a.map(([k, v]) => `'${k}': ${fv(v)}`).join(', ') + '}';
const LIST_TOOLS = [
  { n: 'len', ic: '📏', img: 'مسطرة تقيس طول القطار', ret: 1, code: s => `len(${s.name})`, run: s => ({ ret: s.items.length, say: `برق يمرّ بالمسطرة على القطار ويعدّ العربات: ${s.items.length}. القطار نفسه لا يتغير.` }) },
  { n: 'sum', ic: '➕', img: 'آلة حاسبة تجمع ما في العربات', ret: 1, code: s => `sum(${s.name})`, run: s => ({ ret: s.items.reduce((x, y) => x + y, 0), say: 'برق يمرّ على كل عربة ويجمع ما فيها في آلته الحاسبة. تعمل مع الأرقام فقط.' }) },
  { n: 'max', ic: '🔭', img: 'منظار يبحث عن أكبر قيمة', ret: 1, code: s => `max(${s.name})`, run: s => s.items.length ? ({ ret: Math.max(...s.items), hi: s.items.indexOf(Math.max(...s.items)), say: 'برق يقارن العربات واحدة واحدة ويحتفظ بالأكبر.' }) : ({ err: 'ValueError: القطار فارغ، لا يوجد أكبر عنصر' }) },
  { n: 'min', ic: '🔬', img: 'مجهر يبحث عن أصغر قيمة', ret: 1, code: s => `min(${s.name})`, run: s => s.items.length ? ({ ret: Math.min(...s.items), hi: s.items.indexOf(Math.min(...s.items)), say: 'برق يقارن العربات ويحتفظ بالأصغر.' }) : ({ err: 'ValueError: القطار فارغ، لا يوجد أصغر عنصر' }) },
  { n: 'append', ic: '🚃', img: 'عربة جديدة تُربط في آخر القطار', arg: [100, 73, 88], code: (s, x) => `${s.name}.append(${x})`, run: (s, x) => ({ items: [...s.items, x], hi: s.items.length, say: `برق يربط عربة جديدة فيها ${x} في آخر القطار دائمًا، لا في أوله.` }) },
  { n: 'remove', ic: '✂️', img: 'مقصّ يفكّ أول عربة فيها القيمة', arg: [88, 95, 100], code: (s, x) => `${s.name}.remove(${x})`, run: (s, x) => { const i = s.items.indexOf(x); return i < 0 ? { err: `ValueError: القيمة ${x} غير موجودة في القطار` } : { items: s.items.filter((_, j) => j !== i), say: `برق يبحث عن أول عربة فيها ${x} ويفكّها، ثم تُعاد ترقيم العربات التي بعدها.` }; } },
  { n: 'count', ic: '🔢', img: 'عدّاد يحسب مرات ظهور قيمة', ret: 1, arg: [88, 95, 100], code: (s, x) => `${s.name}.count(${x})`, run: (s, x) => ({ ret: s.items.filter(v => v === x).length, say: `برق يمرّ على العربات ويضغط العدّاد كلما رأى ${x}. انتبهي: count تعدّ قيمة محددة، و len تعدّ كل العربات.` }) },
  { n: 'sort', ic: '📶', img: 'سلّم يرتّب العربات من الأصغر إلى الأكبر', code: s => `${s.name}.sort()`, run: s => ({ items: [...s.items].sort((a, b) => a - b), say: 'برق يعيد ترتيب العربات تصاعديًا: الأصغر عند القاطرة. القطار نفسه يتغير.' }) },
  { n: 'reverse', ic: '🔄', img: 'دوّارة تقلب القطار', code: s => `${s.name}.reverse()`, run: s => ({ items: [...s.items].reverse(), say: 'برق يقلب ترتيب العربات: الأخيرة تصبح الأولى. هي لا ترتّب، بل تعكس فقط.' }) },
  { n: 'clear', ic: '🧹', img: 'مكنسة تفرغ القطار ويبقى اسمه', code: s => `${s.name}.clear()`, run: s => ({ items: [], say: 'برق يفكّ كل العربات. يبقى القطار باسمه لكنه فارغ: [ ].' }) },
];
const DICT_TOOLS = [
  { n: 'get', ic: '🔑', img: 'مفتاح يفتح خزانته مباشرة', ret: 1, arg: ['Noura', 'Sara', 'Hind'], code: (s, x) => `${s.name}.get("${x}")`, run: (s, x) => { const f = s.items.find(e => e[0] === x); return f ? { ret: f[1], hi: x, say: `برق يذهب مباشرة إلى خزانة "${x}" ويقرأ ما فيها.` } : { ret: null, say: `لا توجد خزانة مفتاحها "${x}". الدالة get ترجع None بهدوء دون إنذار.` }; } },
  { n: 'update', ic: '🔁', img: 'عامل يضيف خزانة أو يبدّل ما في خزانة موجودة', arg: [['Reem', 91], ['Sara', 97], ['Hind', 80]], argLabel: x => `{"${x[0]}": ${x[1]}}`, code: (s, x) => `${s.name}.update({"${x[0]}": ${x[1]}})`, run: (s, x) => s.items.some(e => e[0] === x[0]) ? { items: s.items.map(e => e[0] === x[0] ? [x[0], x[1]] : e), hi: x[0], say: `المفتاح "${x[0]}" موجود، والمفتاح لا يتكرر، فيبدّل برق القيمة التي في خزانته فقط.` } : { items: [...s.items, [x[0], x[1]]], hi: x[0], say: `المفتاح "${x[0]}" جديد، فيبني برق خزانة جديدة له.` } },
  { n: 'keys', ic: '🗝️', img: 'حلقة فيها كل المفاتيح', ret: 1, code: s => `${s.name}.keys()`, run: s => ({ retRaw: `dict_keys([${s.items.map(e => `'${e[0]}'`).join(', ')}])`, say: 'برق يجمع الملصقات المكتوبة على كل الخزائن (المفاتيح فقط).' }) },
  { n: 'values', ic: '💎', img: 'سلة فيها كل ما بداخل الخزائن', ret: 1, code: s => `${s.name}.values()`, run: s => ({ retRaw: `dict_values([${s.items.map(e => fv(e[1])).join(', ')}])`, say: 'برق يجمع ما بداخل الخزائن (القيم فقط) دون مفاتيحها.' }) },
  { n: 'del', ic: '🗑️', img: 'رافعة تزيل خزانة بمفتاحها', arg: ['Noura', 'Sara', 'Reem'], code: (s, x) => `del ${s.name}["${x}"]`, run: (s, x) => s.items.some(e => e[0] === x) ? { items: s.items.filter(e => e[0] !== x), say: `برق يزيل خزانة "${x}" كاملة: المفتاح والقيمة معًا.` } : { err: `KeyError: '${x}' — لا توجد خزانة بهذا المفتاح` } },
  { n: 'clear', ic: '🧹', img: 'مكنسة تزيل كل الخزائن ويبقى الاسم', code: s => `${s.name}.clear()`, run: s => ({ items: [], say: 'برق يزيل كل الخزائن. يبقى القاموس باسمه لكنه فارغ: { }.' }) },
];
function toolsAct({ a, body, rec, got }) {
  const T = a.kind === 'dict' ? DICT_TOOLS : LIST_TOOLS, isD = a.kind === 'dict';
  let st = { name: a.name, items: a.start.map(x => Array.isArray(x) ? [...x] : x) }, last = null, log = [], cur = null, hi = null, err = '';
  body.innerHTML = `<div class="city"><div class="sky">${a.scene}</div></div>
  <div class="tmis" id="mis"></div><div id="mem"></div>
  <div class="tgrid">${T.map((t, i) => `<button class="tool" data-i="${i}"><span class="ic">${t.ic}</span><b class="mono">${t.n}</b><small>${t.img}</small></button>`).join('')}</div>
  <div id="args"></div><div class="stsay"><div class="who">${barq('happy')}</div><div class="bub" id="bub">${rich(a.intro)}</div></div>
  <div class="stcode" style="margin-top:10px"><div class="tb">🐍 الكود الذي كتبتِه بأدواتكِ <span style="flex:1"></span><button class="rst" id="rs" style="border:0;border-radius:999px;padding:2px 12px;background:rgba(255,255,255,.15);color:#fff">↺ من جديد</button></div><div id="log" class="out" style="border:0;min-height:60px"></div></div>`;
  const misIdx = () => a.missions.findIndex((_, i) => !got('m' + i));
  const paint = () => {
    const mem = isD ? { dict: { name: st.name, items: st.items }, hi: hi != null ? ['dict', hi] : null, err, out: [] } : { list: { name: st.name, items: st.items }, hi: hi != null ? ['list', hi] : null, err, out: [] };
    $('#mem', body).innerHTML = memView(mem).replace(/<div class="screen">[\s\S]*?<\/div><\/div>$/, '</div>');
    const k = misIdx();
    $('#mis', body).innerHTML = k < 0 ? '<b>🏆 أنجزتِ كل المهمات! جرّبي الأدوات بحرية.</b>' : `<b>المهمة ${ar(k + 1)} من ${ar(a.missions.length)}:</b> ${rich(a.missions[k].goal)}`;
    $('#log', body).innerHTML = log.length ? log.map(l => `<div>${esc(l.c)}${l.r != null ? `  <span class="in"># ← ${esc(l.r)}</span>` : ''}${l.e ? `  <span class="err"># ${esc(l.e)}</span>` : ''}</div>`).join('') : '<span class="sys">كل أداة تضغطينها تُكتب هنا ككود بايثون</span>';
  };
  const exec = (t, x) => {
    const code = t.code(st, t.argLabel ? x : x), r = t.run(st, x); err = r.err || ''; hi = r.hi ?? null;
    const before = st.items;
    if (r.items) st = { ...st, items: r.items };
    const rr = r.retRaw != null ? r.retRaw : r.ret !== undefined ? fv(r.ret) : null;
    last = { n: t.n, x, ret: r.ret, err: !!r.err };
    log.push({ c: t.ret ? `print(${code})` : code, r: r.err ? null : rr != null ? rr : (isD ? pyDict(st.items) : pyList(st.items)), e: r.err });
    $('#bub', body).innerHTML = r.err ? `🚨 <b>إنذار!</b> ${esc(r.err)}` : `${rich(r.say)}${rr != null ? `<div class="retv">الدالة تُرجع: <b class="mono">${esc(rr)}</b></div>` : ''}`;
    $('.stsay .who', body).innerHTML = barq(r.err ? 'wow' : 'happy'); beep(!r.err);
    const k = misIdx();
    if (k >= 0 && !r.err && a.missions[k].ok(st, last, before)) { rec('m' + k, 5, { tries: 0 }); toast('✔ مهمة منجزة +٥ ⭐'); if (misIdx() < 0) confetti(); }
    paint();
  };
  $$('.tool', body).forEach(b => b.onclick = () => {
    const t = T[+b.dataset.i]; $$('.tool', body).forEach(x => x.classList.toggle('on', x === b));
    if (!t.arg) { $('#args', body).innerHTML = ''; return exec(t); }
    $('#args', body).innerHTML = `<div class="row" style="justify-content:center;margin:8px 0"><span>اختاري القيمة:</span>${t.arg.map((x, j) => `<button class="btn ghost mono" data-j="${j}" style="padding:4px 14px">${esc(t.argLabel ? t.argLabel(x) : fv(x))}</button>`).join('')}</div>`;
    $$('#args button', body).forEach(c => c.onclick = () => exec(t, t.arg[+c.dataset.j]));
  });
  $('#rs', body).onclick = () => { st = { name: a.name, items: a.start.map(x => Array.isArray(x) ? [...x] : x) }; log = []; hi = null; err = ''; $('#bub', body).innerHTML = rich(a.intro); $('#args', body).innerHTML = ''; paint(); };
  paint();
}
const eqA = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);
if ((window.LABCFG?.grade ?? 3) === 3) STORY.acts.splice(3, 0, { t: 'tools', kind: 'list', name: 'grades', start: [89, 88, 98, 95], title: 'ورشة الدوال ١: أدوات القطار', goal: 'كل دالة أداة لها صورة. استخدميها لتنجزي المهمات، وراقبي القطار والكود.',
  scene: '🧰 ورشة برق · عشر أدوات للقوائم',
  intro: 'هذه ورشتي! كل دالة أداة. بعض الأدوات تقيس وتُرجع جوابًا دون أن تغيّر القطار (مثل len و max)، وبعضها يغيّر القطار نفسه (مثل append و sort). اضغطي أداة وجرّبي.',
  missions: [
    { goal: 'اعرفي كم عربة في القطار grades.', ok: (s, l) => l.n === 'len' },
    { goal: 'أضيفي الدرجة 100 إلى آخر القطار.', ok: s => s.items[s.items.length - 1] === 100 },
    { goal: 'احذفي الدرجة 88 من القطار.', ok: (s, l, b) => l.n === 'remove' && !s.items.includes(88) },
    { goal: 'اعرفي كم مرة تظهر الدرجة 95.', ok: (s, l) => l.n === 'count' && l.x === 95 },
    { goal: 'رتّبي القطار من الأكبر إلى الأصغر. (تحتاجين أداتين!)', ok: s => s.items.length > 1 && eqA(s.items, [...s.items].sort((a, b) => b - a)) },
    { goal: 'اعرفي أكبر درجة، ثم مجموع الدرجات.', ok: (s, l) => l.n === 'sum' },
    { goal: 'أفرغي القطار كاملًا.', ok: s => s.items.length === 0 },
  ] });
if ((window.LABCFG?.grade ?? 3) === 3) STORY.acts.splice(6, 0, { t: 'tools', kind: 'dict', name: 'grades', start: [['Sara', 95], ['Noura', 88]], title: 'ورشة الدوال ٢: أدوات الخزائن', goal: 'أدوات القاموس تعمل بالمفاتيح لا بالأرقام.',
  scene: '🧰 ورشة برق · أدوات القواميس',
  intro: 'في حي الخزائن أدواتي تسأل دائمًا: «ما المفتاح؟». جرّبي كل أداة، ولاحظي الفرق بين get التي تسأل بهدوء و del التي تطلق الإنذار إن لم تجد المفتاح.',
  missions: [
    { goal: 'اعرفي درجة Noura.', ok: (s, l) => l.n === 'get' && l.x === 'Noura' },
    { goal: 'أضيفي الطالبة Reem ودرجتها 91.', ok: s => s.items.some(e => e[0] === 'Reem' && e[1] === 91) },
    { goal: 'غيّري درجة Sara إلى 97 دون إضافة خزانة جديدة.', ok: s => s.items.some(e => e[0] === 'Sara' && e[1] === 97) },
    { goal: 'اعرضي كل المفاتيح، ثم كل القيم.', ok: (s, l) => l.n === 'values' },
    { goal: 'اسألي عن Hind (غير موجودة) دون أن ينطلق الإنذار.', ok: (s, l) => l.n === 'get' && l.x === 'Hind' && l.ret === null },
    { goal: 'احذفي خزانة Noura.', ok: (s, l) => l.n === 'del' && !s.items.some(e => e[0] === 'Noura') },
  ] });
