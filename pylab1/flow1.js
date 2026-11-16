// «عالم المخططات الانسيابية» — أول متوسط (ص١٢٣–١٢٩): بطاقات الأشكال، ١٠ أمثلة حيّة، تمارين، وألعاب
'use strict';
const FK = { // لكل شكل لون ثابت وشخصية تساعد على التذكر
  oval: { n: 'البيضاوي', job: 'البداية / النهاية', c: '#ECD571', nick: 'بوابة المدينة', memo: 'كل رحلة تبدأ من بوابة وتنتهي عند بوابة. شكل ناعم بلا زوايا: لا عمل فيه، فقط «ابدئي» و«انتهينا».', ex: 'البداية · النهاية' },
  para: { n: 'متوازي الأضلاع', job: 'الإدخال / الإخراج', c: '#9CCBF0', nick: 'الزحليقة', memo: 'مائل مثل الزحليقة: البيانات تنزلق عليه داخلةً إلى البرنامج (input) أو خارجةً منه إلى الشاشة (print).', ex: 'أدخل الطول · اعرض النتيجة' },
  rect: { n: 'المستطيل', job: 'عملية (معالجة)', c: '#A9DDB8', nick: 'المصنع', memo: 'صندوق ثابت مثل المصنع: يدخل فيه شيء ويُصنع منه شيء جديد. كل حساب أو إسناد مكانه هنا.', ex: 'المساحة = الطول × العرض' },
  dia: { n: 'المعيّن', job: 'اتخاذ قرار', c: '#FFB870', nick: 'مفترق الطرق', memo: 'له رؤوس تشير إلى اتجاهات: سؤال جوابه «نعم» أو «لا»، ومن كل جواب يخرج طريق.', ex: 'هل الدرجة 50 أو أكثر؟' },
};
const K2S = { start: 'oval', end: 'oval', in: 'para', out: 'para', proc: 'rect', dec: 'dia' };
const NW = 196, NH = 56, RS = 92, CS = 236;
function nodeShape(s, x, y, fill, cls = '') {
  const w = NW, h = NH;
  if (s === 'oval') return `<ellipse class="${cls}" cx="${x}" cy="${y}" rx="${w / 2 - 8}" ry="${h / 2 - 2}" fill="${fill}"/>`;
  if (s === 'para') return `<path class="${cls}" d="M${x - w / 2 + 20} ${y - h / 2 + 3}H${x + w / 2}L${x + w / 2 - 20} ${y + h / 2 - 3}H${x - w / 2}Z" fill="${fill}"/>`;
  if (s === 'dia') return `<path class="${cls}" d="M${x} ${y - h / 2 - 6}L${x + w / 2 + 4} ${y}L${x} ${y + h / 2 + 6}L${x - w / 2 - 4} ${y}Z" fill="${fill}"/>`;
  return `<rect class="${cls}" x="${x - w / 2 + 6}" y="${y - h / 2 + 3}" width="${w - 12}" height="${h - 6}" rx="5" fill="${fill}"/>`;
}
function miniShape(s, size = 64) { return `<svg viewBox="-104 -40 208 80" width="${size}" height="${size * 80 / 208}">${nodeShape(s, 0, 0, FK[s].c).replace('/>', ' stroke="#534057" stroke-width="5"/>')}</svg>`; }

/* ---------- رسم المخطط ومسارات الأسهم ---------- */
function chartGeo(ex) {
  const cols = ex.nodes.map(n => n.c || 0), minC = Math.min(...cols, ex.loopLeft ? -0.45 : 0), maxC = Math.max(...cols);
  const X = c => (c - minC) * CS + NW / 2 + 16, Y = r => r * RS + NH / 2 + 14;
  const W = (maxC - minC) * CS + NW + 32, H = Math.max(...ex.nodes.map(n => n.r)) * RS + NH + 28;
  const by = {}; ex.nodes.forEach(n => by[n.id] = n);
  const edges = [];
  const route = (a, b, lab) => {
    const ax = X(a.c || 0), ay = Y(a.r), bx = X(b.c || 0), by_ = Y(b.r), dia = a.k === 'dec'; let p;
    if ((a.c || 0) === (b.c || 0) && b.r > a.r) p = [[ax, ay + NH / 2 + (dia ? 6 : 0)], [bx, by_ - NH / 2 - (b.k === 'dec' ? 6 : 0)]];
    else if ((a.c || 0) === (b.c || 0)) { const lx = ax - NW / 2 - 34; p = [[ax - NW / 2 - (dia ? 4 : 0) + (dia ? 0 : 6), ay], [lx, ay], [lx, by_], [bx - NW / 2 + (b.k === 'dec' ? -4 : 6), by_]]; } // رجوع للأعلى (حلقة)
    else if (dia) { const sx = ax + (bx > ax ? NW / 2 + 4 : -NW / 2 - 4); p = b.r === a.r ? [[sx, ay], [bx + (bx > ax ? -NW / 2 + 6 : NW / 2 - 6), by_]] : [[sx, ay], [bx, ay], [bx, by_ - NH / 2 - (b.k === 'dec' ? 6 : 0)]]; }
    else { const my = by_ - NH / 2 - 18; p = [[ax, ay + NH / 2], [ax, my], [bx, my], [bx, by_ - NH / 2 - (b.k === 'dec' ? 6 : 0)]]; }
    edges.push({ a: a.id, b: b.id, lab, p });
  };
  ex.nodes.forEach(n => { if (n.n) route(n, by[n.n]); if (n.y) route(n, by[n.y], 'نعم'); if (n.no) route(n, by[n.no], 'لا'); });
  return { X, Y, W, H, by, edges };
}
function chartSVG(ex, G, o = {}) {
  const id = 'ar' + Math.random().toString(36).slice(2, 7);
  return `<svg viewBox="0 0 ${G.W} ${G.H}" width="${G.W}" class="fchart" style="max-width:100%;height:auto"><defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#534057"/></marker></defs>
  ${G.edges.map(e => `<path class="fe" data-e="${e.a}>${e.b}" d="M${e.p.map(q => q.join(' ')).join('L')}" fill="none" stroke="#534057" stroke-width="2.5" marker-end="url(#${id})"/>${e.lab ? `<text x="${e.p[0][0] + (e.p[1][0] > e.p[0][0] ? 14 : e.p[1][0] < e.p[0][0] ? -14 : 24)}" y="${e.p[0][1] + (e.p[1][1] > e.p[0][1] ? 15 : -7)}" text-anchor="middle" class="fel ${e.lab === 'نعم' ? 'y' : 'n'}">${e.lab}</text>` : ''}`).join('')}
  ${ex.nodes.map(n => { const s = o.shapes ? o.shapes[n.id] : K2S[n.k], x = G.X(n.c || 0), y = G.Y(n.r); return `<g class="fn" data-id="${n.id}">${nodeShape(s, x, y, FK[s].c, 'fnb')}<foreignObject x="${x - NW / 2 + (s === 'dia' ? 34 : 22)}" y="${y - NH / 2 + 4}" width="${NW - (s === 'dia' ? 68 : 44)}" height="${NH - 8}"><div xmlns="http://www.w3.org/1999/xhtml" class="fnt">${esc(n.t)}</div></foreignObject></g>`; }).join('')}
  <g class="ftok" style="display:none"><circle r="13" fill="#534057"/><text y="6" text-anchor="middle" font-size="16">⚡</text></g></svg>`;
}

/* ---------- ١) بطاقات الأشكال ---------- */
function fShapes({ a, body, rec, got }) {
  body.innerHTML = `<div class="fcards">${Object.entries(FK).map(([k, v]) => `<button class="fcard" data-k="${k}" style="--fc:${v.c}"><div class="fin"><div class="ff">${miniShape(k, 150)}<b>${v.n}</b><span>${v.job}</span><small>اضغطي لتعرفي سرّه 👆</small></div><div class="fb2"><b>«${v.nick}»</b><p>${v.memo}</p><span class="mono">${v.ex}</span></div></div></button>`).join('')}
  <div class="fcard" style="--fc:#D9C5DF;cursor:default"><div class="fin"><div class="ff"><svg viewBox="0 0 150 58" width="150"><path d="M10 29h118M112 14l20 15-20 15" stroke="#534057" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><b>السهم</b><span>تسلسل الخطوات</span><small>«الطريق»: يخبر برق إلى أين يذهب بعد كل خطوة</small></div></div></div></div>
  <h3 style="margin:18px 0 6px">🎯 اختبار سريع: أي شكل؟</h3><div id="fq"></div>`;
  $$('.fcard[data-k]', body).forEach(c => c.onclick = () => c.classList.toggle('flip'));
  const QS = [['«أدخل عمر الطالبة»', 'para'], ['«المتوسط = المجموع ÷ 3»', 'rect'], ['«هل العدد أكبر من 10؟»', 'dia'], ['«النهاية»', 'oval'], ['«اطبع النتيجة على الشاشة»', 'para']];
  QS.forEach(([t, s], i) => {
    const row = h(`<div class="q"><div class="qt">${ar(i + 1)}. ما الشكل المناسب للخطوة ${t}؟</div><div class="fpick">${Object.keys(FK).map(k => `<button data-k="${k}" title="${FK[k].n}">${miniShape(k, 84)}<span>${FK[k].n}</span></button>`).join('')}</div><div class="fbw"></div></div>`); $('#fq', body).appendChild(row); let tries = 0;
    const fin = () => { $$('button', row).forEach(b => { b.disabled = true; if (b.dataset.k === s) b.classList.add('ok'); }); $('.fbw', row).innerHTML = `<div class="fb ok">✔ ${FK[s].n} «${FK[s].nick}»: ${FK[s].job}</div>`; };
    if (got('s' + i)) return fin();
    $$('button', row).forEach(b => b.onclick = () => { if (b.dataset.k === s) { beep(1); rec('s' + i, tries ? 2 : 5, { tries }); fin(); } else { beep(0); tries++; b.classList.add('no'); b.disabled = true; } });
  });
}

/* ---------- ٢) الأمثلة العشرة الحيّة ---------- */
const N = (id, k, t, r, o = {}) => ({ id, k, t, r, ...o });
const R2 = v => Math.round(v * 100) / 100;
const FLOWS = [
  { title: 'مساحة المستطيل', icon: '📐', src: 'الكتاب ص١٢٦', story: 'نريد برنامجًا يحسب مساحة المستطيل. المدخلات: الطول والعرض. المخرجات: المساحة.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'a' }), N('a', 'in', 'احصل على الطول', 1, { n: 'b', v: 'الطول' }), N('b', 'in', 'احصل على العرض', 2, { n: 'c', v: 'العرض' }), N('c', 'proc', 'المساحة = الطول × العرض', 3, { n: 'd', f: m => { m['المساحة'] = m['الطول'] * m['العرض']; } }), N('d', 'out', 'اعرض المساحة', 4, { n: 'e', o: m => 'مساحة المستطيل هي: ' + m['المساحة'] }), N('e', 'end', 'النهاية', 5)],
    quiz: { q: 'إذا أدخلنا الطول 5 والعرض 3، ماذا يظهر على الشاشة؟', o: ['15', '8', '53', '2'], a: 0, why: 'المستطيل الأخضر «المصنع» يضرب 5 × 3 = 15.' } },
  { title: 'متوسط رقمين', icon: '➗', src: 'تدريب ١ ص١٢٧', story: 'برنامج يحسب متوسط رقمين يدخلهما المستخدم.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'a' }), N('a', 'in', 'أدخل الرقم الأول', 1, { n: 'b', v: 'أ' }), N('b', 'in', 'أدخل الرقم الثاني', 2, { n: 'c', v: 'ب' }), N('c', 'proc', 'المتوسط = (أ + ب) ÷ 2', 3, { n: 'd', f: m => { m['المتوسط'] = (m['أ'] + m['ب']) / 2; } }), N('d', 'out', 'اعرض المتوسط', 4, { n: 'e', o: m => 'المتوسط: ' + m['المتوسط'] }), N('e', 'end', 'النهاية', 5)],
    quiz: { q: 'لماذا لا نضع «اعرض المتوسط» قبل «المتوسط = (أ + ب) ÷ 2»؟', o: ['لأن المتوسط لم يُحسب بعد فلا شيء نعرضه', 'لأن متوازي الأضلاع لا يأتي إلا في الآخر', 'يمكن وضعها في أي مكان'], a: 0 } },
  { title: 'متوسط ثلاث درجات', icon: '📝', src: 'تدريب ٢ ص١٢٨', story: 'أدخلي درجاتكِ في ثلاث مواد، واحسبي المجموع ثم المتوسط.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'a' }), N('a', 'in', 'أدخل الدرجات الثلاث', 1, { n: 'b', vs: ['د١', 'د٢', 'د٣'] }), N('b', 'proc', 'المجموع = د١ + د٢ + د٣', 2, { n: 'c', f: m => { m['المجموع'] = m['د١'] + m['د٢'] + m['د٣']; } }), N('c', 'proc', 'المتوسط = المجموع ÷ 3', 3, { n: 'd', f: m => { m['المتوسط'] = R2(m['المجموع'] / 3); } }), N('d', 'out', 'اطبع المتوسط', 4, { n: 'e', o: m => 'متوسط درجاتكِ: ' + m['المتوسط'] }), N('e', 'end', 'النهاية', 5)],
    quiz: { q: 'كم مستطيلًا أخضر «مصنعًا» في هذا المخطط؟ ولماذا؟', o: ['اثنان: عملية للمجموع وعملية للمتوسط', 'واحد فقط', 'ثلاثة: واحد لكل درجة'], a: 0 } },
  { title: 'من كيلومتر إلى ميل', icon: '🛣️', src: 'تدريب ٣ ص١٢٩', story: 'الميل = 1.61 كيلومتر. حوّلي المسافة من كيلومترات إلى أميال.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'a' }), N('a', 'in', 'احصل على عدد الكيلومترات', 1, { n: 'b', v: 'كم' }), N('b', 'proc', 'الأميال = كم ÷ 1.61', 2, { n: 'c', f: m => { m['الأميال'] = R2(m['كم'] / 1.61); } }), N('c', 'out', 'اعرض النتيجة', 3, { n: 'e', o: m => m['كم'] + ' كم = ' + m['الأميال'] + ' ميل' }), N('e', 'end', 'النهاية', 4)],
    quiz: { q: 'إذا أدخلنا 161 كيلومترًا، كم ميلًا تقريبًا؟', o: ['100', '259', '161', '1.61'], a: 0, why: '161 ÷ 1.61 = 100.' } },
  { title: 'هل العدد موجب؟', icon: '➕', src: 'اختبر نفسك س٨', story: 'أول مخطط فيه «مفترق طرق»! المعيّن البرتقالي يسأل، ومن كل جواب يخرج طريق.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'a' }), N('a', 'in', 'أدخل العدد x', 1, { n: 'd', v: 'x' }), N('d', 'dec', 'هل x أكبر من 0؟', 2, { y: 'y', no: 'n', cond: m => m.x > 0 }), N('y', 'out', 'اعرض «العدد موجب»', 3, { n: 'e', o: () => 'العدد موجب' }), N('n', 'out', 'اعرض «ليس موجبًا»', 3, { c: 1, n: 'e', o: () => 'العدد ليس موجبًا' }), N('e', 'end', 'النهاية', 4)],
    quiz: { q: 'إذا أدخلنا x = -4، في أي طريق يمشي برق؟', o: ['طريق «لا» ← يعرض «ليس موجبًا»', 'طريق «نعم» ← يعرض «العدد موجب»', 'الطريقين معًا'], a: 0, why: 'برق لا يمشي في الطريقين أبدًا: جواب واحد، طريق واحد.' } },
  { title: 'ناجحة أم تحتاج محاولة؟', icon: '🎓', src: 'تطبيق', story: 'درجة النجاح 50 من 100. المخطط يقرر الرسالة المناسبة.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'a' }), N('a', 'in', 'أدخل الدرجة', 1, { n: 'd', v: 'الدرجة' }), N('d', 'dec', 'هل الدرجة 50 أو أكثر؟', 2, { y: 'y', no: 'n', cond: m => m['الدرجة'] >= 50 }), N('y', 'out', 'اعرض «ناجحة 🎉»', 3, { n: 'e', o: () => 'ناجحة 🎉' }), N('n', 'out', 'اعرض «حاولي مرة أخرى»', 3, { c: 1, n: 'e', o: () => 'حاولي مرة أخرى 💪' }), N('e', 'end', 'النهاية', 4)],
    quiz: { q: 'الدرجة 50 بالضبط. ما الرسالة؟', o: ['ناجحة، لأن الشرط «50 أو أكثر» يشمل 50', 'حاولي مرة أخرى', 'لا تظهر رسالة'], a: 0 } },
  { title: 'زوجي أم فردي؟', icon: '🎲', src: 'تطبيق', story: 'العدد الزوجي باقي قسمته على 2 يساوي صفرًا.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'a' }), N('a', 'in', 'أدخل العدد', 1, { n: 'b', v: 'العدد' }), N('b', 'proc', 'الباقي = باقي قسمة العدد على 2', 2, { n: 'd', f: m => { m['الباقي'] = ((m['العدد'] % 2) + 2) % 2; } }), N('d', 'dec', 'هل الباقي = 0؟', 3, { y: 'y', no: 'n', cond: m => m['الباقي'] === 0 }), N('y', 'out', 'اعرض «زوجي»', 4, { n: 'e', o: () => 'العدد زوجي' }), N('n', 'out', 'اعرض «فردي»', 4, { c: 1, n: 'e', o: () => 'العدد فردي' }), N('e', 'end', 'النهاية', 5)],
    quiz: { q: 'أدخلنا العدد 7. ما قيمة «الباقي» وما الناتج؟', o: ['الباقي 1 ← فردي', 'الباقي 0 ← زوجي', 'الباقي 7 ← فردي'], a: 0 } },
  { title: 'أقساط متجر الأجهزة', icon: '🛒', src: 'مشروع الوحدة ص١٦١', story: 'المقدم 30٪ من التكلفة، والباقي على 6 أقساط متساوية.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'a' }), N('a', 'in', 'أدخل سعر الجهاز والملحقات', 1, { n: 'b', vs: ['الجهاز', 'الملحقات'] }), N('b', 'proc', 'التكلفة = الجهاز + الملحقات', 2, { n: 'c', f: m => { m['التكلفة'] = m['الجهاز'] + m['الملحقات']; } }), N('c', 'proc', 'المقدم = التكلفة × 0.30', 3, { n: 'c2', f: m => { m['المقدم'] = R2(m['التكلفة'] * 0.3); } }), N('c2', 'proc', 'القسط = (التكلفة − المقدم) ÷ 6', 4, { n: 'd', f: m => { m['القسط'] = R2((m['التكلفة'] - m['المقدم']) / 6); } }), N('d', 'out', 'اعرض التكلفة والمقدم والقسط', 5, { n: 'e', o: m => `التكلفة ${m['التكلفة']} · المقدم ${m['المقدم']} · القسط ${m['القسط']}` }), N('e', 'end', 'النهاية', 6)],
    quiz: { q: 'الجهاز 800 والملحقات 400. كم القسط الواحد؟', o: ['140', '200', '360', '120'], a: 0, why: 'التكلفة 1200، المقدم 360، الباقي 840 ÷ 6 = 140.' } },
  { title: 'الفطيرة المحلاة', icon: '🥞', src: 'الكتاب ص١٢٥', loopLeft: 1, story: 'مخطط من الحياة فيه أسئلة تُعيدكِ للخلف! أنتِ من يجيب عن أسئلة المعيّن.',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'd1' }), N('d1', 'dec', 'هل لديك جميع المكونات؟', 1, { y: 'p1', no: 'b', ask: 1 }), N('b', 'proc', 'اشترِ المكونات', 1, { c: 1, n: 'p1' }), N('p1', 'proc', 'اخلط المكونات معًا', 2, { n: 'd2' }), N('d2', 'dec', 'هل الخليط متجانس؟', 3, { y: 'p2', no: 'p1', ask: 1 }), N('p2', 'proc', 'اطهها دقيقتين ثم اقلبها', 4, { n: 'd3' }), N('d3', 'dec', 'هل لونها بني من الجهتين؟', 5, { y: 'o', no: 'p2', ask: 1 }), N('o', 'out', 'قدّمها مع الشراب المحبب', 6, { n: 'e', o: () => 'بالعافية! 🥞' }), N('e', 'end', 'النهاية', 7)],
    quiz: { q: 'أجبتِ «لا» عن «هل الخليط متجانس؟». إلى أين يذهب برق؟', o: ['يعود إلى «اخلط المكونات معًا»', 'ينتقل إلى الطهي', 'ينتهي المخطط'], a: 0, why: 'السهم يعود للأعلى: نكرر الخلط حتى يصير الجواب «نعم».' } },
  { title: 'صباح يوم جديد', icon: '🌅', src: 'الكتاب ص١٢١', story: 'قواعد الصباح خوارزمية! لكن ماذا لو كان اليوم إجازة؟',
    nodes: [N('s', 'start', 'البداية', 0, { n: 'p' }), N('p', 'proc', 'استيقظي وتوضئي وصلّي', 1, { n: 'p0' }), N('p0', 'proc', 'نظّفي أسنانكِ وتناولي فطوركِ', 2, { n: 'd' }), N('d', 'dec', 'هل اليوم يوم دراسي؟', 3, { y: 'y', no: 'n', ask: 1 }), N('y', 'proc', 'ارتدي الزي المدرسي', 4, { n: 'o' }), N('n', 'out', 'استمتعي بإجازتكِ', 4, { c: 1, n: 'e', o: () => 'إجازة سعيدة! 🌴' }), N('o', 'out', 'اذهبي إلى المدرسة', 5, { n: 'e', o: () => 'يوم دراسي موفق! 🎒' }), N('e', 'end', 'النهاية', 6)],
    quiz: { q: 'أي خطوة لا تُنفَّذ إذا كان اليوم إجازة؟', o: ['ارتدي الزي المدرسي', 'نظّفي أسنانكِ وتناولي فطوركِ', 'استيقظي وتوضئي وصلّي'], a: 0, why: 'الخطوات قبل المعيّن تُنفَّذ دائمًا، وما بعده يعتمد على الجواب.' } },
];
function fPlay({ a, body, rec, got }) {
  let cur = a.only ?? 0;
  body.innerHTML = `${a.only != null ? '' : `<div class="fex">${FLOWS.map((f, i) => `<button data-i="${i}"><span>${f.icon}</span><b>${ar(i + 1)}</b><small>${esc(f.title)}</small></button>`).join('')}</div>`}<div id="fx"></div>`;
  const open = i => {
    cur = i; const ex = FLOWS[i], G = chartGeo(ex), host = $('#fx', body);
    $$('.fex button', body).forEach((b, j) => { b.classList.toggle('on', j === i); b.classList.toggle('done', !!got('e' + j) && !!got('q' + j)); });
    host.innerHTML = `<div class="fxh"><span class="ficon">${ex.icon}</span><div><b>المثال ${ar(i + 1)}: ${esc(ex.title)}</b> <span class="badge wait">${esc(ex.src)}</span><div class="mute">${esc(ex.story)}</div></div></div>
    <div class="fxw"><div class="fxc">${chartSVG(ex, G)}</div><div class="fxp">
      <div class="fxbox"><b>🧠 الذاكرة</b><div class="boxes" id="fm" style="direction:ltr;justify-content:flex-end;min-height:48px"></div></div>
      <div class="fxbox"><b>🖥 الشاشة</b><div class="screen" id="fs" style="direction:rtl;text-align:right;font-family:Rubik"></div></div>
      <div class="stsay" style="margin-top:8px"><div class="who" style="width:60px">${barq('happy')}</div><div class="bub" id="fb" style="font-size:15px;min-height:54px">اضغطي «شغّلي المخطط» وتابعي برق ⚡ وهو يمشي على الأسهم.</div></div>
      <div class="row" style="margin-top:8px;justify-content:center"><button class="btn plum" id="fgo">▶ شغّلي المخطط</button><button class="btn ghost" id="frs">↺</button></div>
      <div class="legend" style="margin-top:8px;justify-content:center">${Object.values(FK).map(v => `<span><i style="background:${v.c};border-radius:3px"></i>${v.job}</span>`).join('')}</div>
    </div></div><div id="fqz"></div>`;
    const svg = $('.fchart', host), tok = $('.ftok', svg), bub = $('#fb', host), go_ = $('#fgo', host);
    let mem = {}, at = null, busy = false, outL = [];
    const paintMem = hi => { $('#fm', host).innerHTML = Object.entries(mem).map(([k, v]) => `<span class="vbox${hi === k ? ' hit' : ''}" style="min-width:56px"><span class="tag" style="direction:rtl">${esc(k)}</span><span class="v">${esc(String(v))}</span></span>`).join('') || '<span class="mute" style="font-size:13px;direction:rtl">فارغة</span>'; $('#fs', host).innerHTML = outL.map(l => `<div>${esc(l)}</div>`).join(''); };
    const mark = id => { $$('.fn', svg).forEach(g => g.classList.toggle('act', g.dataset.id === id)); const g = svg.querySelector(`.fn[data-id="${id}"]`); if (g) g.classList.add('seen'); };
    const move = (from, to) => new Promise(res => {
      const e = G.edges.find(x => x.a === from && x.b === to); svg.querySelector(`.fe[data-e="${from}>${to}"]`)?.classList.add('walk');
      const P = e.p, seg = P.slice(1).map((q, k) => Math.hypot(q[0] - P[k][0], q[1] - P[k][1])), tot = seg.reduce((x, y) => x + y, 0), dur = Math.min(900, 250 + tot * 2.2); tok.style.display = ''; const t0 = performance.now();
      (function fr(t) { let d = Math.min(1, (t - t0) / dur) * tot, k = 0; while (k < seg.length - 1 && d > seg[k]) { d -= seg[k]; k++; } const f = seg[k] ? d / seg[k] : 1; tok.setAttribute('transform', `translate(${P[k][0] + (P[k + 1][0] - P[k][0]) * f},${P[k][1] + (P[k + 1][1] - P[k][1]) * f})`); if (t - t0 < dur) requestAnimationFrame(fr); else res(); })(t0);
    });
    const askNum = (label) => new Promise(res => { bub.innerHTML = `<b style="color:#2A6FA8">الزحليقة الزرقاء تنتظر:</b> أدخلي «${esc(label)}» <input class="in mono" id="fi" type="number" inputmode="decimal" style="width:110px;display:inline-block;padding:4px 8px"> <button class="btn" id="fok" style="padding:4px 14px">إدخال</button>`; const i = $('#fi', bub); i.focus(); const ok = () => { if (i.value === '') return; res(+i.value); }; $('#fok', bub).onclick = ok; i.onkeydown = e => { if (e.key === 'Enter') ok(); }; });
    const askYN = (q) => new Promise(res => { bub.innerHTML = `<b style="color:#B5630A">مفترق الطرق يسأل:</b> ${esc(q)} <button class="btn g" data-v="1" style="padding:4px 16px">نعم</button> <button class="btn" data-v="0" style="padding:4px 16px;background:var(--r);color:#fff;box-shadow:none">لا</button>`; $$('button', bub).forEach(b => b.onclick = () => res(b.dataset.v === '1')); });
    const stepNode = async () => {
      const n = G.by[at]; mark(at); let next = n.n;
      if (n.k === 'start') bub.innerHTML = '<b>البوابة الصفراء:</b> من هنا تبدأ الرحلة.';
      else if (n.k === 'in') { for (const v of (n.vs || [n.v])) { mem[v] = await askNum(v); paintMem(v); } bub.innerHTML = `دخلت القيمة وحُفظت في الذاكرة.`; }
      else if (n.k === 'proc') { if (n.f) { const before = Object.keys(mem).length; n.f(mem); const k = Object.keys(mem).pop(); paintMem(k); bub.innerHTML = `<b style="color:#1E7A3C">المصنع الأخضر يعمل:</b> ${esc(n.t)} ← النتيجة <b class="mono">${esc(String(mem[k]))}</b>`; } else bub.innerHTML = `<b style="color:#1E7A3C">عملية:</b> ${esc(n.t)}`; }
      else if (n.k === 'dec') { const r = n.ask ? await askYN(n.t) : n.cond(mem); bub.innerHTML = `<b style="color:#B5630A">مفترق الطرق:</b> ${esc(n.t)} ← الجواب <b style="color:${r ? 'var(--g)' : 'var(--r)'}">${r ? 'نعم' : 'لا'}</b>، فيمشي برق في طريق «${r ? 'نعم' : 'لا'}» فقط.`; next = r ? n.y : n.no; }
      else if (n.k === 'out') { outL.push(n.o ? n.o(mem) : n.t); paintMem(); bub.innerHTML = `<b style="color:#2A6FA8">الزحليقة الزرقاء:</b> خرجت النتيجة إلى الشاشة.`; }
      else if (n.k === 'end') { bub.innerHTML = '<b>البوابة الصفراء:</b> انتهت الرحلة! 🎉 جرّبي قيمًا أخرى بالزر ↺ ثم حلّي التمرين أسفل المخطط.'; tok.style.display = 'none'; go_.hidden = true; if (rec('e' + i, 3)) toast('+٣ ⭐ شغّلتِ المخطط'); $$('.fex button', body)[i]?.classList.toggle('done', !!got('q' + i)); at = null; return; }
      go_.disabled = false; go_.textContent = '▶ الخطوة التالية'; go_.onclick = async () => { if (busy) return; busy = true; go_.disabled = true; await move(at, next); at = next; busy = false; await stepNode(); };
    };
    const reset = () => { mem = {}; outL = []; at = null; busy = false; paintMem(); $$('.fn', svg).forEach(g => g.classList.remove('act', 'seen')); $$('.fe', svg).forEach(e => e.classList.remove('walk')); tok.style.display = 'none'; go_.hidden = false; go_.disabled = false; go_.textContent = '▶ شغّلي المخطط'; bub.innerHTML = 'اضغطي «شغّلي المخطط» وتابعي برق ⚡ وهو يمشي على الأسهم.'; go_.onclick = async () => { at = 's'; go_.disabled = true; await stepNode(); }; };
    $('#frs', host).onclick = reset; reset();
    const qz = $('#fqz', host); qz.innerHTML = `<h3 style="margin:14px 0 0">✏️ تمرين المثال ${ar(i + 1)}</h3>`;
    mcq(qz, ex.quiz, { key: 'q' + i, ctx: { rec, got }, pts: 5, retry: 2, onDone: () => $$('.fex button', body)[i]?.classList.toggle('done', !!got('e' + i)) });
  };
  $$('.fex button', body).forEach(b => b.onclick = () => { open(+b.dataset.i); $('#fx', body).scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  open(cur);
}

/* ---------- ٣) لعبة صيّاد الأشكال ---------- */
const HUNT = [['اقرأ درجة الطالبة', 'para'], ['المجموع = أ + ب', 'rect'], ['هل الدرجة 50 أو أكثر؟', 'dia'], ['البداية', 'oval'], ['اطبع النتيجة', 'para'], ['x = x + 1', 'rect'], ['x = int(input())', 'para'], ['print(area)', 'para'], ['area = length * width', 'rect'], ['النهاية', 'oval'], ['هل كلمة المرور صحيحة؟', 'dia'], ['احسب المتوسط', 'rect'], ['هل الخليط متجانس؟', 'dia'], ['أدخل اسمك', 'para']];
function fHunt({ a, body, rec, got }) {
  const ROUNDS = 12, TIME = 7000; let list, r, score, streak, best, t0, raf, live;
  const home = () => { cancelAnimationFrame(raf); live = false; body.innerHTML = `<div class="tcenter"><div style="width:110px;margin:auto">${barq('wink')}</div><h2 class="h1">صيّاد الأشكال 🎯</h2><p>تظهر خطوة أو سطر كود، وعليكِ اختيار شكلها الصحيح قبل انتهاء الوقت.<br>${ar(ROUNDS)} جولة · ${ar(TIME / 1000)} ثوانٍ لكل جولة · السلسلة المتتالية تضاعف الحماس 🔥</p>${got('win') ? '<p class="badge">✔ فزتِ من قبل</p>' : `<p class="mute">للفوز: ${ar(9)} إجابات صحيحة على الأقل</p>`}<button class="btn plum" id="st">▶ ابدئي اللعب</button></div>`; $('#st', body).onclick = start; };
  const start = () => { list = shuffle(HUNT).slice(0, ROUNDS); r = 0; score = 0; streak = 0; best = 0; live = true; round(); };
  const round = () => {
    if (r >= ROUNDS) return end(); const [t, s] = list[r];
    body.innerHTML = `<div class="row" style="justify-content:space-between"><b>الجولة ${ar(r + 1)} / ${ar(ROUNDS)}</b><b>✔ ${ar(score)} ${streak >= 2 ? `<span class="fstreak">🔥 ×${ar(streak)}</span>` : ''}</b></div><div class="progress" style="margin:8px 0"><i id="tb" style="width:100%;transition:none"></i></div>
    <div class="fhq ${/[a-z(=]/.test(t) && !/[؀-ۿ]/.test(t) ? 'mono' : ''}">${esc(t)}</div><div class="fpick big">${Object.keys(FK).map(k => `<button data-k="${k}">${miniShape(k, 130)}<span>${FK[k].n}</span></button>`).join('')}</div><div class="fbw" id="hf"></div>`;
    t0 = performance.now(); let done = false;
    const fin = (k) => { if (done) return; done = true; cancelAnimationFrame(raf); const ok = k === s; if (ok) { score++; streak++; best = Math.max(best, streak); beep(1); } else { streak = 0; beep(0); }
      $$('.fpick button', body).forEach(b => { b.disabled = true; if (b.dataset.k === s) b.classList.add('ok'); else if (b.dataset.k === k) b.classList.add('no'); });
      $('#hf', body).innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}">${ok ? '✔ صحيح!' : k ? '✘ ' : '⏰ انتهى الوقت! '} ${FK[s].n} «${FK[s].nick}» لـ${FK[s].job}</div>`; r++; setTimeout(() => live && round(), ok ? 650 : 1500); };
    $$('.fpick button', body).forEach(b => b.onclick = () => fin(b.dataset.k));
    (function tick(t) { const p = 1 - (t - t0) / TIME; const tb = $('#tb', body); if (!tb || done) return; tb.style.width = Math.max(0, p * 100) + '%'; tb.style.background = p < .3 ? 'var(--r)' : ''; if (p <= 0) return fin(null); raf = requestAnimationFrame(tick); })(t0);
  };
  const end = () => { live = false; const win = score >= 9; if (rec('play', 5)) {} if (win && rec('win', 20, { score, best })) confetti();
    body.innerHTML = `<div class="tcenter"><div style="width:110px;margin:auto">${barq(win ? 'wow' : 'think')}</div><h2 class="h1">${win ? 'صيّادة ماهرة! 🏆' : 'قريبة جدًا!'}</h2><div class="count" style="font-size:64px">${ar(score)} / ${ar(ROUNDS)}</div><p>أطول سلسلة متتالية: 🔥 ${ar(best)}</p><p class="mute">${win ? 'ثبّتِ الأشكال الأربعة في ذاكرتكِ.' : `تحتاجين ${ar(9)} للفوز. راجعي «بطاقات الأشكال» وحاولي من جديد.`}</p><button class="btn plum" id="st">↺ العبي مرة أخرى</button></div>`; $('#st', body).onclick = start; };
  home();
}

/* ---------- ٤) لعبة أصلحي المخطط ---------- */
const FIX = [
  { why: '«أدخل الطول» إدخال، فشكله متوازي الأضلاع الأزرق «الزحليقة» لا المستطيل.', bad: 1, nodes: [['البداية', 'oval'], ['أدخل الطول والعرض', 'rect'], ['المساحة = الطول × العرض', 'rect'], ['اعرض المساحة', 'para'], ['النهاية', 'oval']] },
  { why: 'لا يمكن عرض المتوسط قبل إدخال الرقمين وحسابه: الترتيب خطأ.', bad: 1, nodes: [['البداية', 'oval'], ['اعرض المتوسط', 'para'], ['أدخل الرقمين', 'para'], ['المتوسط = (أ + ب) ÷ 2', 'rect'], ['النهاية', 'oval']] },
  { why: 'السؤال الذي جوابه نعم أو لا شكله المعيّن البرتقالي «مفترق الطرق».', bad: 2, nodes: [['البداية', 'oval'], ['أدخل العدد', 'para'], ['هل العدد موجب؟', 'rect'], ['اعرض النتيجة', 'para'], ['النهاية', 'oval']] },
  { why: 'البداية شكلها البيضاوي الأصفر «بوابة المدينة»، مثل النهاية تمامًا.', bad: 0, nodes: [['البداية', 'rect'], ['أدخل الكيلومترات', 'para'], ['الأميال = كم ÷ 1.61', 'rect'], ['اعرض الأميال', 'para'], ['النهاية', 'oval']] },
  { why: 'حساب المجموع عملية، فمكانه المستطيل الأخضر «المصنع» لا المعيّن.', bad: 2, nodes: [['البداية', 'oval'], ['أدخل الدرجات الثلاث', 'para'], ['المجموع = د١ + د٢ + د٣', 'dia'], ['اطبع المجموع', 'para'], ['النهاية', 'oval']] },
  { why: 'عرض النتيجة إخراج، فشكله متوازي الأضلاع الأزرق لا البيضاوي.', bad: 3, nodes: [['البداية', 'oval'], ['أدخل السعر', 'para'], ['الخصم = السعر × 0.10', 'rect'], ['اعرض السعر بعد الخصم', 'oval'], ['النهاية', 'oval']] },
];
function fFix({ a, body, rec, got }) {
  body.innerHTML = `<p class="mute">في كل مخطط <b>خطأ واحد</b>: شكل غير مناسب أو خطوة في غير مكانها. اضغطي على الخطوة الخطأ 🔍</p><div class="ffix"></div>`;
  FIX.forEach((f, i) => {
    const ex = { nodes: f.nodes.map(([t, s], j) => ({ id: 'n' + j, k: 'proc', t, r: j, n: j < f.nodes.length - 1 ? 'n' + (j + 1) : null })) }, G = chartGeo(ex), sh = {}; f.nodes.forEach(([, s], j) => sh['n' + j] = s);
    const card = h(`<div class="bk" style="text-align:center"><div class="bkh"><span class="bkn">المخطط ${ar(i + 1)}</span><span class="sp"></span><span id="fx${i}"></span></div>${chartSVG(ex, G, { shapes: sh })}<div class="fbw"></div></div>`); $('.ffix', body).appendChild(card); let tries = 0;
    const fin = () => { card.querySelector(`.fn[data-id="n${f.bad}"]`).classList.add('bad'); $$('.fn', card).forEach(g => g.style.pointerEvents = 'none'); $('.fbw', card).innerHTML = `<div class="fb ok" style="text-align:right">✔ ${esc(f.why)}</div>`; $('#fx' + i, card).innerHTML = '<span class="badge">✔</span>'; };
    if (got('f' + i)) return fin();
    $$('.fn', card).forEach(g => { g.style.cursor = 'pointer'; g.onclick = () => { if (g.dataset.id === 'n' + f.bad) { beep(1); rec('f' + i, tries ? 5 : 10, { tries }); fin(); } else { beep(0); tries++; g.classList.add('shake'); setTimeout(() => g.classList.remove('shake'), 400); $('.fbw', card).innerHTML = '<div class="fb no">هذه الخطوة سليمة. دققي في الأشكال وفي الترتيب.</div>'; } }; });
  });
}

/* ---------- المحطة ---------- */
const FSTEP2 = (t, s) => ({ t, s });
const FLOWST = { id: 'af', n: 0, title: 'عالم المخططات الانسيابية', pages: '١٢٣–١٢٩', icon: 'grid', extra: 1, badge: '◇', short: 'المخططات',
  skills: ['أميّز أشكال المخطط الانسيابي ووظيفة كل شكل', 'أتتبّع مخططًا انسيابيًا وأعرف ناتجه', 'أرسم مخططًا انسيابيًا لخوارزمية'],
  acts: [
    { t: 'fshapes', title: 'بطاقات الأشكال: لكل شكل لون وسرّ', goal: 'أربعة أشكال وسهم. اضغطي كل بطاقة لتعرفي لقبه وسرّه، ثم اختبري نفسكِ.' },
    { t: 'fplay', title: 'عشرة أمثلة حيّة', goal: 'في كل مثال: شغّلي المخطط بقيم من عندكِ وتابعي برق ⚡، ثم حلّي التمرين.' },
    { t: 'fhunt', title: 'لعبة صيّاد الأشكال', goal: 'سرعة ودقة: اختاري الشكل الصحيح قبل انتهاء الوقت.' },
    { t: 'ffix', title: 'لعبة أصلحي المخطط', goal: 'ستة مخططات، في كل واحد خطأ. اكتشفيه!' },
    { t: 'book', title: 'ابني المخطط بنفسكِ', goal: 'رتّبي الخطوات واختاري شكل كل خطوة، فيُرسم مخططكِ أمامكِ.', items: [
      { n: 'تحدي ١', p: '١٢٤', kind: 'flow', q: 'الصرّاف الآلي: ارسمي مخطط سحب مبلغ.', steps: [FSTEP2('البداية', 'oval'), FSTEP2('أدخل المبلغ المطلوب', 'para'), FSTEP2('هل الرصيد يكفي؟', 'dia'), FSTEP2('الرصيد = الرصيد − المبلغ', 'rect'), FSTEP2('اعرض الرصيد الجديد', 'para'), FSTEP2('النهاية', 'oval')] },
      { n: 'تحدي ٢', p: '١٢٤', kind: 'flow', q: 'خصم المتجر: السعر بعد خصم 10٪.', steps: [FSTEP2('البداية', 'oval'), FSTEP2('أدخل السعر', 'para'), FSTEP2('الخصم = السعر × 0.10', 'rect'), FSTEP2('السعر الجديد = السعر − الخصم', 'rect'), FSTEP2('اعرض السعر الجديد', 'para'), FSTEP2('النهاية', 'oval')] },
      { n: 'تحدي ٣', p: '١٢٤', kind: 'flow', q: 'عمر الطالبة: من سنة الميلاد إلى العمر.', steps: [FSTEP2('البداية', 'oval'), FSTEP2('أدخل سنة الميلاد', 'para'), FSTEP2('أدخل السنة الحالية', 'para'), FSTEP2('العمر = السنة الحالية − سنة الميلاد', 'rect'), FSTEP2('اعرض العمر', 'para'), FSTEP2('النهاية', 'oval')] },
    ] },
    { t: 'master' },
  ] };
LESSONS.splice(1, 0, FLOWST);
