// معمل بايثون الافتراضي — المحرك
'use strict';
const SB = 'https://uautjfgslrfhceciqwyn.supabase.co/rest/v1/rpc/';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdXRqZmdzbHJmaGNlY2lxd3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyNjI3NzMsImV4cCI6MjEwODgzODc3M30.Dj1dYWNMwhp02hJEko8XnDD23Mi-gK-Q82BkICdrj_Q'; // مفتاح عام: الجداول مقفلة، والوصول عبر الدوال فقط
const CFG = Object.assign({ grade: 3, gname: 'ثالث متوسط', slug: 'store-1448', lab: 'pylab-g3', store: 'pylab-g3-v1', unit: 'الوحدة الرابعة «البرمجة مع بايثون»', sub: 'المهارات الرقمية · ثالث متوسط · الوحدة الرابعة' }, window.LABCFG || {});
const SLUG = CFG.slug; // ثالث: نفس طالبات صفحة مشاريع المتاجر
const TEACHER = location.hash === '#teacher' || location.hash === '#students';
const STORE = CFG.store;
const MASTER = 0.8;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const ar = x => String(x ?? '').replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
// يعزل الكود الإنجليزي داخل الجمل العربية حتى لا تنقلب رموزه
const rich = s => esc(s).replace(/[\x21-\x7E](?:[\x20-\x7E]*[\x21-\x7E])?/g, m => { const tail = (m.match(/[.,:]+$/) || [''])[0]; const core = tail ? m.slice(0, -tail.length) : m; return (/[A-Za-z=<>]/.test(core) || (/[\[\]()]/.test(core) && core.length > 2)) ? '<code dir="ltr">' + core + '</code>' + tail : m; }).replace(/\n/g, '<br>');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const h = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
async function rpc(fn, body) {
  const r = await fetch(SB + fn, { method: 'POST', headers: { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error('تعذّر الاتصال');
  return r.json();
}

/* ---------- الحفظ ---------- */
let S = { user: null, p: {} };
try { S = Object.assign(S, JSON.parse(localStorage.getItem(STORE) || '{}')); } catch (e) {}
const LAB = CFG.lab;
const save = () => { try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} sync(); };
let syncT = null;
function sync(visit) {
  if (!S.user?.sid) return;
  clearTimeout(syncT);
  syncT = setTimeout(() => {
    const pct = {}; LESSONS.forEach(L => pct[L.id] = Math.round(lessonStat(L).pct * 100) / 100);
    rpc('api_lab_save', { p_lab: LAB, p_student: S.user.sid, p_data: { p: S.p, self: S.self || {}, cele: S.cele || {} }, p_score: totalXP(), p_pct: pct, p_visit: !!visit }).catch(() => {});
  }, visit ? 0 : 2500);
}
const sumP = p => Object.values(p || {}).reduce((x, L) => x + Object.values(L).reduce((y, a) => y + Object.values(a.it || {}).reduce((z, v) => z + (v.s || 0), 0), 0), 0);
async function pullServer() {
  try {
    const r = await rpc('api_lab_load', { p_lab: LAB, p_student: S.user.sid });
    if (r.data && r.data.p && sumP(r.data.p) > sumP(S.p)) { S.p = r.data.p; S.self = r.data.self || {}; S.cele = r.data.cele || {}; try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} }
  } catch (e) {}
}
const P = (lid, ai) => ((S.p[lid] ||= {})[ai] ||= { it: {} });
function rec(lid, ai, k, s, data) {
  const a = P(lid, ai); if (a.it[k]) return false;
  a.it[k] = { s, t: Date.now(), ...(data ? { d: data } : {}) }; save(); paintXP(); return true;
}
const got = (lid, ai, k) => (S.p[lid]?.[ai]?.it || {})[k];

/* ---------- النقاط والإتقان ---------- */
function maxOf(a) {
  switch (a.t) {
    case 'comic': return a.q ? 10 : 0;
    case 'run': return a.items.length * 2 + a.items.filter(i => i.predict).length * 3;
    case 'traffic': return a.show.length * 10 + a.opinion.length * 5 + a.move.length * 10;
    case 'tpr': return ((a.thumbs || []).length + (a.conf || []).length) * 10;
    case 'mission': return a.missions.length * 10 + 20;
    case 'prints': return a.prints.flat().length * 5 + 20;
    case 'match': return a.pairs.length * 5;
    case 'quiz': return a.items.length * 10;
    case 'code': return a.project ? 50 : 30;
    case 'explore': return a.targets.length * 5;
    case 'story': return a.steps.filter(s => s.ask).length * 5 + 10;
    case 'tools': return a.missions.length * 5;
    case 'turtlepad': return 30;
    case 'robopad': return 35;
    case 'ifplay': return a.stages.length * 10;
    case 'book': return a.items.length * 10;
    case 'fshapes': return 25;
    case 'fplay': return (a.flows || FLOWS).length * 13;
    case 'fhunt': return 25;
    case 'ffix': return FIX.length * 10;
    default: return 0;
  }
}
function scoreOf(lid, ai) { const it = S.p[lid]?.[ai]?.it || {}; return Object.values(it).reduce((x, v) => x + (v.s || 0), 0); }
function lessonStat(L) {
  let s = 0, m = 0, done = 0, cnt = 0;
  L.acts.forEach((a, i) => { const mx = maxOf(a); if (!mx) return; cnt++; const sc = Math.min(scoreOf(L.id, i), mx); s += sc; m += mx; if (sc >= mx * 0.6) done++; });
  return { s, m, pct: m ? s / m : 0, done, cnt };
}
const totalXP = () => LESSONS.reduce((x, L) => x + lessonStat(L).s, 0);
function level(xp) { return xp >= 2400 ? ['خبيرة بايثون', 4] : xp >= 1500 ? ['مبرمجة ماهرة', 3] : xp >= 700 ? ['مبرمجة صاعدة', 2] : ['مستكشفة', 1]; }
function paintXP() { const x = $('#xp'); if (x) x.innerHTML = `⭐ <b>${ar(totalXP())}</b><span class="lv"> · ${level(totalXP())[0]}</span>`; }

/* ---------- الشخصيات (SVG أصلي) ---------- */
function eyes(m, cx1, cx2, cy, col) {
  if (m === 'happy') return `<path d="M${cx1 - 7} ${cy + 2} q7 -9 14 0 M${cx2 - 7} ${cy + 2} q7 -9 14 0" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (m === 'wink') return `<path d="M${cx1 - 7} ${cy + 2} q7 -9 14 0" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="${cx2}" cy="${cy}" r="5.5" fill="${col}"/>`;
  if (m === 'wow') return `<circle cx="${cx1}" cy="${cy}" r="8" fill="${col}"/><circle cx="${cx2}" cy="${cy}" r="8" fill="${col}"/><circle cx="${cx1 + 2}" cy="${cy - 2}" r="2.5" fill="#fff"/><circle cx="${cx2 + 2}" cy="${cy - 2}" r="2.5" fill="#fff"/>`;
  if (m === 'sad') return `<path d="M${cx1 - 7} ${cy - 2} q7 7 14 0 M${cx2 - 7} ${cy - 2} q7 7 14 0" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return `<circle cx="${cx1 + 3}" cy="${cy - 3}" r="5.5" fill="${col}"/><circle cx="${cx2 + 3}" cy="${cy - 3}" r="5.5" fill="${col}"/>`;
}
function mouth(m, cx, cy, col) {
  if (m === 'wow') return `<ellipse cx="${cx}" cy="${cy + 2}" rx="6" ry="7" fill="${col}"/>`;
  if (m === 'sad') return `<path d="M${cx - 9} ${cy + 6} q9 -8 18 0" stroke="${col}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  if (m === 'think') return `<path d="M${cx - 7} ${cy + 3} h12" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`;
  return `<path d="M${cx - 11} ${cy} q11 12 22 0" stroke="${col}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
}
function koda(m = 'happy') {
  return `<svg viewBox="0 0 120 150" role="img" aria-label="كودة"><line x1="60" y1="8" x2="60" y2="26" stroke="#534057" stroke-width="4"/><circle cx="60" cy="8" r="7" fill="#ECD571" stroke="#534057" stroke-width="3"/>
  <rect x="14" y="24" width="92" height="74" rx="26" fill="#C1A4CA" stroke="#534057" stroke-width="4"/><rect x="24" y="36" width="72" height="50" rx="18" fill="#534057"/>
  ${eyes(m, 44, 76, 56, '#ECD571')}${mouth(m, 60, 70, '#ECD571')}<circle cx="30" cy="80" r="0"/>
  <rect x="6" y="52" width="10" height="22" rx="5" fill="#AC88B7" stroke="#534057" stroke-width="3"/><rect x="104" y="52" width="10" height="22" rx="5" fill="#AC88B7" stroke="#534057" stroke-width="3"/>
  <rect x="34" y="100" width="52" height="36" rx="14" fill="#FFCB7D" stroke="#534057" stroke-width="4"/><path d="M52 113 q8 -8 16 0 q-8 14 -16 0z" fill="#D64545"/>
  <rect x="38" y="134" width="14" height="12" rx="5" fill="#534057"/><rect x="68" y="134" width="14" height="12" rx="5" fill="#534057"/>
  ${m === 'think' ? '<text x="104" y="26" font-size="26" font-family="Lalezar" fill="#534057">?</text>' : ''}</svg>`;
}
function bitho(m = 'happy') {
  return `<svg viewBox="0 0 120 150" role="img" aria-label="بيثو"><path d="M20 140 C 0 120, 40 108, 60 118 S 112 134, 100 104 S 52 86, 62 64" stroke="#3776AB" stroke-width="22" fill="none" stroke-linecap="round"/>
  <path d="M20 140 C 0 120, 40 108, 60 118 S 112 134, 100 104 S 52 86, 62 64" stroke="#FFD43B" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="2 10"/>
  <ellipse cx="64" cy="46" rx="34" ry="30" fill="#3776AB" stroke="#21476B" stroke-width="3"/><ellipse cx="64" cy="58" rx="22" ry="12" fill="#FFD43B"/>
  <circle cx="50" cy="38" r="11" fill="#fff"/><circle cx="78" cy="38" r="11" fill="#fff"/>${eyes(m, 50, 78, 38, '#1F1A24')}${mouth(m, 64, 56, '#7a3b00')}
  ${m === 'happy' || m === 'wink' ? '<path d="M64 66 v10 l-5 5 M64 76 l5 5" stroke="#D64545" stroke-width="2.5" fill="none" stroke-linecap="round"/>' : ''}</svg>`;
}
const char = (w, m) => w === 'b' ? bitho(m) : w === 'q' ? barq(m) : koda(m);
function say(text, m = 'happy', w = 'k') { return `<div class="hintbox">${char(w, m)}<div>${text}</div></div>`; }

/* ---------- أيقونات ---------- */
const IC = {
  list: '<path d="M5 6h14M5 12h14M5 18h9" />', lib: '<path d="M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5 1 -3 14 -3.5-1z"/>', brush: '<path d="M4 20c4 0 5-2 5-4l-2-2c-2 0-4 1-3 6zM9 14l10-10 1 1-10 10"/>',
  book: '<path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM8 8h6M8 12h6"/>', grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>', file: '<path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8"/>', star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  back: '<path d="M9 5l7 7-7 7"/>', home: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>', board: '<path d="M3 4h18v12H3zM8 20h8M12 16v4"/>', moon: '<path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z"/>', out: '<path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/>',
};
const icon = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${IC[n] || ''}</svg>`;
const TYPE = { comic: ['قصة مصورة', 'COMIC'], run: ['جرّبي بنفسك', 'CODE LAB'], traffic: ['إشارة المرور', 'TRAFFIC LIGHT'], tpr: ['استجيبي', 'TPR'], mission: ['المهمة السرية', 'SECRET MISSION'], prints: ['لغز البصمات', 'FINGERPRINT'], match: ['طابقي', 'MATCH IT'], quiz: ['اختاري', 'QUIZ'], code: ['تحدي البرمجة', 'CHALLENGE'], explore: ['استكشفي', 'EXPLORE'], master: ['بطاقة الإتقان', 'MASTERY'], story: ['حكاية', 'STORY'], tools: ['ورشة الدوال', 'TOOLS'], turtlepad: ['ورشة السلحفاة', 'TURTLE'], robopad: ['ورشة الروبوت', 'ROBOT'], ifplay: ['مراحل الكود', 'CODE LEVELS'], book: ['تمارين الكتاب', 'BOOK'], fshapes: ['بطاقات الأشكال', 'SHAPES'], fplay: ['المراحل العشر', 'LEVELS'], fhunt: ['صيّاد الأشكال', 'GAME'], ffix: ['أصلحي المخطط', 'GAME'] };

/* ---------- عام ---------- */
function toast(t) { const d = h(`<div class="toast">${t}</div>`); document.body.appendChild(d); setTimeout(() => d.remove(), 2200); }
function confetti() {
  const c = h('<canvas class="confetti"></canvas>'); document.body.appendChild(c); c.width = innerWidth; c.height = innerHeight; const x = c.getContext('2d');
  const cols = ['#ECD571', '#FFCB7D', '#AC88B7', '#534057', '#2E9E5B']; const ps = Array.from({ length: 120 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height / 2, v: 2 + Math.random() * 4, r: Math.random() * 6, c: cols[Math.random() * 5 | 0], a: Math.random() * 6 }));
  let n = 0; (function f() { x.clearRect(0, 0, c.width, c.height); ps.forEach(p => { p.y += p.v; p.a += .1; x.fillStyle = p.c; x.save(); x.translate(p.x + Math.sin(p.a) * 10, p.y); x.rotate(p.a); x.fillRect(-4, -3, 8, 6); x.restore(); }); if (n++ < 160) requestAnimationFrame(f); else c.remove(); })();
}
let SOUND = true;
function beep(ok) { if (!SOUND) return; try { const a = new (window.AudioContext || window.webkitAudioContext)(); const o = a.createOscillator(), g = a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value = ok ? 880 : 220; g.gain.setValueAtTime(.08, a.currentTime); g.gain.exponentialRampToValueAtTime(.001, a.currentTime + .25); o.start(); o.stop(a.currentTime + .26); } catch (e) {} }
const main = () => $('main');

/* ---------- الشريط ---------- */
function bar() {
  const u = S.user;
  $('#bar').innerHTML = `<div class="brand">معمل بايثون<small>${CFG.sub}</small></div><span class="sp"></span>
  ${u ? `<span class="chip" title="${esc(u.cls)}">👩‍💻 <b>${esc(u.name.split(' ')[0])}</b></span><span class="chip xp" id="xp"></span>` : ''}
  ${TEACHER ? `<button class="chip" style="border:0;cursor:pointer;color:#fff" onclick="go('teach')">📖 الشرح</button><button class="chip" style="border:0;cursor:pointer;color:#fff" onclick="go('board')">🎯 لوحة التحدي</button><button class="chip" style="border:0;cursor:pointer;color:#fff" onclick="go('students')">👩‍🎓 الطالبات</button>` : ''}
  <a class="chip" href="../esp32/" title="معمل ESP32: الليد والكود + تعلّمي توصيل الليد" style="text-decoration:none;color:#fff;background:#ff8c1a">💡 معمل ESP32</a>
  ${u ? `<button class="iconbtn" title="الخريطة" onclick="go('map')">${icon('home')}</button>` : ''}
  <button class="iconbtn" title="الوضع الليلي" onclick="theme()">${icon('moon')}</button>
  ${u ? `<button class="iconbtn" title="خروج" onclick="logout()">${icon('out')}</button>` : ''}`;
  paintXP();
}
function theme() { const r = document.documentElement, d = r.dataset.theme === 'dark' || (!r.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches); r.dataset.theme = d ? 'light' : 'dark'; try { localStorage.setItem('pylab-theme', r.dataset.theme); } catch (e) {} }
function logout() { if (!confirm('تسجيل الخروج؟ يبقى تقدّمكِ محفوظًا على هذا الجهاز.')) return; S.user = null; save(); go('login'); }

let CUR = { view: 'login', L: null, ai: 0 };
function go(v, L, ai = 0) { CUR = { view: v, L, ai }; bar(); window.scrollTo(0, 0); ({ login: vLogin, map: vMap, lesson: vLesson, cert: vCert, board: vBoard, teach: vTeach, students: vStudents })[v](); }

/* ---------- الدخول ---------- */
async function vLogin() {
  main().innerHTML = `<div class="login"><div class="hero">${koda('happy')}</div>
  <div class="card"><h1 class="h1">أهلًا بكِ في المعمل!</h1><p class="mute">معمل افتراضي تتعلمين فيه البرمجة بلغة بايثون بالتجربة: قصص مصورة، ومهمات سرية، وألغاز، وتحديات برمجة حقيقية.</p>
  <label class="f" for="lc">الفصل</label><select class="in" id="lc"><option value="">جارٍ التحميل…</option></select>
  <div id="pickwrap"><label class="f" for="ln">اسمكِ</label><select class="in" id="ln" disabled><option value="">اختاري الفصل أولًا</option></select>
  <p class="mute" style="font-size:13px;margin:6px 0 0">اسمكِ غير موجود؟ أخبري معلمتكِ.</p></div>
  <div style="margin-top:16px" class="row"><button class="btn plum" id="enter">ادخلي المعمل ←</button></div><p id="lmsg" class="mute" style="font-size:14px"></p></div></div>`;
  let classes = ['١', '٢', '٣'].map(s => ({ id: 0, name: CFG.gname.split(' ')[0] + '/' + s })), online = false;
  try { const p = await rpc('api_project', { p_slug: SLUG }); if (p.classes?.length) { classes = p.classes; online = true; } } catch (e) {}
  $('#lc').innerHTML = '<option value="">اختاري فصلكِ</option>' + classes.map((c, i) => `<option value="${i}">${esc(c.name)}</option>`).join('');
  if (!online) $('#lmsg').textContent = 'تعذّر الاتصال، تأكدي من الإنترنت ثم أعيدي فتح الصفحة.';
  $('#lc').onchange = async () => {
    if (!online) { try { const p = await rpc('api_project', { p_slug: SLUG }); if (p && p.classes?.length) { const i = +$('#lc').value; classes = p.classes; online = true; $('#lmsg').textContent = ''; $('#lc').value = String(i); } } catch (e) {} }
    const c = classes[$('#lc').value]; if (!c) return; if (!online) return $('#lmsg').textContent = 'تعذّر تحميل الأسماء، حدّثي الصفحة ثم أعيدي المحاولة.';
    $('#ln').innerHTML = '<option>جارٍ التحميل…</option>';
    try { const st = await rpc('api_class_students', { p_slug: SLUG, p_class: c.id }); $('#ln').innerHTML = '<option value="">اختاري اسمكِ</option>' + st.map(s => `<option value="${s.id}">${esc(s.name)}</option>`).join(''); $('#ln').disabled = false; }
    catch (e) { $('#lmsg').textContent = 'تعذّر تحميل الأسماء، أعيدي المحاولة.'; }
  };
  $('#enter').onclick = async () => {
    const c = classes[$('#lc').value]; if (!c) return $('#lmsg').textContent = 'اختاري الفصل أولًا.';
    const o = $('#ln').selectedOptions[0]; if (!o || !o.value) return $('#lmsg').textContent = 'اختاري اسمكِ.';
    const sid = +o.value;
    if (S.user && S.user.sid !== sid) { S.p = {}; S.self = {}; S.cele = {}; }
    S.user = { cls: c.name, cid: c.id, sid, name: o.textContent };
    $('#enter').disabled = true; $('#lmsg').textContent = 'جارٍ الدخول…';
    await pullServer(); try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {}
    sync(true); go('map');
  };
}

/* ---------- الخريطة ---------- */
function ring(p) { const r = 22, C = 2 * Math.PI * r; return `<svg class="ring" viewBox="0 0 54 54"><circle cx="27" cy="27" r="${r}" fill="none" stroke="var(--lilac3)" stroke-width="6"/><circle cx="27" cy="27" r="${r}" fill="none" stroke="${p >= MASTER ? 'var(--g)' : 'var(--org)'}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${C * p} ${C}" transform="rotate(-90 27 27)"/><text x="27" y="31" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${ar(Math.round(p * 100))}٪</text></svg>`; }
function vMap() {
  const u = S.user; if (!u) return go('login');
  const all = LESSONS.filter(L => !L.exam && !L.project && !L.extra).every(L => lessonStat(L).pct >= MASTER);
  const next = LESSONS.find(L => lessonStat(L).pct < MASTER);
  main().innerHTML = `<div class="greet"><div class="avatar">${koda(all ? 'wow' : 'happy')}</div><div class="bubble">أهلًا ${esc(u.name.split(' ')[0])}! ${all ? 'أتقنتِ كل المحطات 🎉 شهادتكِ جاهزة!' : next ? `محطتكِ التالية: <b>${esc(next.title)}</b>. لتصبحي «متقنة» في أي محطة اجمعي ${ar(80)}٪ من نقاطها.` : ''}</div></div>
  <div class="stations">${LESSONS.map((L, i) => { const st = lessonStat(L); return `<button class="st${L.extra ? ' stx' : ''}" onclick="go('lesson',${i})">${ring(st.pct)}<span class="num">${L.extra ? (L.badge || '⚡') : L.project ? icon('trophy', 24) : L.exam ? icon('star', 24) : ar(L.n)}</span><span class="t">${esc(L.title)}</span><span class="meta">ص${L.pages} · ${ar(L.acts.filter(a => a.t !== 'master').length)} أنشطة</span><span>${st.pct >= MASTER ? '<span class="badge">✔ متقنة</span>' : st.s ? '<span class="badge go">قيد الإنجاز</span>' : '<span class="badge wait">لم تبدئي</span>'}</span></button>`; }).join('')}</div>
  <div class="card" style="margin-top:22px"><div class="row"><div style="flex:1"><h2 class="h2">شهادة إتقان الوحدة</h2><p class="mute" style="margin:0">تُفتح عندما تصلين إلى ${ar(80)}٪ في المحطات ${({ 4: 'الأربع', 5: 'الخمس', 6: 'الست', 7: 'السبع', 8: 'الثماني' })[LESSONS.filter(L => !L.exam && !L.project && !L.extra).length] || 'الأساسية'}.</p></div><button class="btn ${all ? 'g' : 'ghost'}" ${all ? '' : 'disabled'} onclick="go('cert')">🎓 شهادتي</button></div></div>`;
}

/* ---------- صفحة الدرس ---------- */
function vLesson() {
  const L = LESSONS[CUR.L], ai = CUR.ai, a = L.acts[ai];
  main().innerHTML = `<div class="lhead"><button class="iconbtn" style="background:var(--plum)" onclick="go('map')" title="رجوع">${icon('back')}</button><div><h1 class="h1" style="font-size:24px;margin:0">${esc(L.title)}</h1><div class="mute" style="font-size:13px">الكتاب ص${L.pages}</div></div></div>
  <div class="steps">${L.acts.map((x, i) => { const mx = maxOf(x), sc = scoreOf(L.id, i); return `<button class="${i === ai ? 'on' : ''} ${mx && sc >= mx * .6 ? 'ok' : ''}" onclick="go('lesson',${CUR.L},${i})"><span class="dot"></span>${ar(i + 1)}. ${x.t === 'story' ? esc(x.title.split(':')[1] || x.title).trim() : x.t === 'book' && L.extra ? 'ابني المخطط' : TYPE[x.t][0]}</button>`; }).join('')}</div>
  <div class="card act" id="act"></div>
  <div class="nav"><button class="btn ghost" ${ai ? '' : 'disabled'} onclick="go('lesson',${CUR.L},${ai - 1})">→ السابق</button><button class="btn" onclick="${ai < L.acts.length - 1 ? `go('lesson',${CUR.L},${ai + 1})` : `go('map')`}">${ai < L.acts.length - 1 ? 'التالي ←' : 'إلى الخريطة'}</button></div>`;
  const box = $('#act');
  box.innerHTML = `<div class="acthead"><span class="tag">${TYPE[a.t][1]}</span><div style="flex:1"><h2 class="h2" style="margin:0">${esc(a.title || TYPE[a.t][0])}</h2>${a.p ? `<div class="mute" style="font-size:13px">الكتاب ص${a.p}</div>` : ''}</div><span class="chip" style="background:var(--lilac3);color:var(--plum)" id="sc"></span></div>${a.goal ? `<div class="goal">🎯 ${a.goal}</div>` : ''}<div id="body"></div>`;
  const ctx = { L, ai, a, body: $('#body', box), rec: (k, s, d) => { const r = rec(L.id, ai, k, s, d); paintSc(); return r; }, got: k => got(L.id, ai, k) };
  const paintSc = () => { const mx = maxOf(a); $('#sc').innerHTML = mx ? `⭐ ${ar(Math.min(scoreOf(L.id, ai), mx))} / ${ar(mx)}` : ''; $('#sc').hidden = !mx; };
  paintSc(); R[a.t](ctx);
}

/* ---------- عناصر مشتركة ---------- */
function codeHTML(c) { return `<pre class="mono">${esc(c)}</pre>`; }
// سؤال اختيار من متعدد قابل لإعادة المحاولة
function mcq(host, q, { key, ctx, pts = 10, retry = 5, onDone, mono, noShuffle } = {}) {
  const prev = key && ctx.got(key);
  const idx = noShuffle ? q.o.map((_, i) => i) : shuffle(q.o.map((_, i) => i));
  const el = h(`<div class="q"><div class="qt">${rich(q.q)}</div>${q.code ? codeHTML(q.code) : ''}<div class="opts">${idx.map(i => `<button class="opt ${mono || q.mono ? 'mono' : ''}" data-i="${i}">${mono || q.mono ? esc(q.o[i]).replace(/\n/g, '<br>') : rich(q.o[i])}</button>`).join('')}</div><div class="fbw"></div></div>`);
  host.appendChild(el); let tries = 0;
  const fin = (ok) => { $$('.opt', el).forEach(b => { b.disabled = true; if (+b.dataset.i === q.a) b.classList.add('ok'); }); if (q.why) $('.fbw', el).innerHTML = `<div class="fb ${ok ? 'ok' : 'info'}">${ok ? '✔ أحسنتِ! ' : ''}${rich(q.why)}</div>`; else if (ok) $('.fbw', el).innerHTML = '<div class="fb ok">✔ أحسنتِ!</div>'; };
  if (prev) { fin(true); onDone && onDone(true, true); return el; }
  $$('.opt', el).forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    if (i === q.a) { beep(1); const s = tries ? retry : pts; if (key) ctx.rec(key, s, { tries }); b.classList.add('ok'); fin(true); onDone && onDone(true, false, tries); }
    else { beep(0); tries++; b.classList.add('no'); b.disabled = true; $('.fbw', el).innerHTML = `<div class="fb no">ليست هذه. ${q.hint || 'فكّري مرة أخرى وجرّبي إجابة ثانية.'}</div>`; }
  });
  return el;
}

/* ---------- المحرر ---------- */
function ide(host, code, { files, onRun, label = '▶ شغّلي' } = {}) {
  const el = h(`<div><div class="ide"><div class="tb"><span>🐍 main.py</span><span class="sp"></span><button class="rst" title="إعادة الكود الأصلي">↺ الأصل</button><button class="run">${label}</button></div>
  <div class="edwrap"><div class="lnum"></div><textarea class="code" spellcheck="false" autocapitalize="off" autocomplete="off"></textarea></div><div class="out"></div><div class="tkhost"></div></div>
  ${files ? '<div class="files"></div><div class="filev" hidden></div>' : ''}<div class="hw"></div></div>`);
  host.appendChild(el);
  const ta = $('textarea', el), ln = $('.lnum', el), out = $('.out', el), tk = $('.tkhost', el);
  const nums = () => { ln.textContent = ta.value.split('\n').map((_, i) => i + 1).join('\n'); ta.rows = Math.max(4, ta.value.split('\n').length + 1); };
  ta.value = code; nums(); ta.oninput = nums;
  ta.onkeydown = e => {
    if (e.key === 'Tab') { e.preventDefault(); const s = ta.selectionStart; ta.setRangeText('    ', s, ta.selectionEnd, 'end'); nums(); }
    if (e.key === 'Enter') { const s = ta.selectionStart, line = ta.value.slice(ta.value.lastIndexOf('\n', s - 1) + 1, s); let ind = line.match(/^ */)[0]; if (/:\s*$/.test(line)) ind += '    '; e.preventDefault(); ta.setRangeText('\n' + ind, s, ta.selectionEnd, 'end'); nums(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); $('.run', el).click(); }
  };
  out.innerHTML = '<span class="sys">اضغطي «شغّلي» لتنفيذ الكود (أو Ctrl+Enter)</span>';
  const paintFiles = () => {
    if (!files) return; const fv = $('.filev', el);
    $('.files', el).innerHTML = '<span class="mute" style="font-size:13px">📁 ملفاتي:</span>' + PY.files().map(([n]) => `<button data-n="${esc(n)}">📄 ${esc(n)}</button>`).join('') + '<button data-r="1" title="استعادة ملفات الكتاب الأصلية">↺ استعادة</button>';
    $$('.files button', el).forEach(b => b.onclick = () => { if (b.dataset.r) { if (confirm('استعادة ملفات الكتاب الأصلية وحذف ملفاتكِ الجديدة؟')) { PY.resetFiles(); paintFiles(); fv.hidden = true; } return; } const f = PY.files().find(x => x[0] === b.dataset.n); fv.hidden = false; fv.textContent = f ? (f[1] || '(الملف فارغ)') : ''; });
  };
  paintFiles();
  $('.rst', el).onclick = () => { ta.value = code; nums(); };
  $('.run', el).onclick = async () => {
    const b = $('.run', el); b.disabled = true; b.textContent = '⏳';
    const r = await PY.run(ta.value, out, tk, m => { if (m) out.innerHTML = `<span class="sys">${m}</span>`; });
    b.disabled = false; b.textContent = label;
    $('.hw', el).innerHTML = r.ok ? '' : r.hint ? say(`<b>تلميح كودة:</b> ${esc(r.hint)}`, 'think') : '';
    paintFiles(); if (files && $('.filev', el) && !$('.filev', el).hidden) $('.filev', el).hidden = true;
    onRun && onRun(r, ta.value);
  };
  return { el, ta, set: v => { ta.value = v; nums(); } };
}

/* ---------- الأنشطة ---------- */
const R = {};
R.story = ctx => storyAct(ctx);
R.tools = ctx => toolsAct(ctx);
R.turtlepad = ctx => turtlePad(ctx);
R.robopad = ctx => roboPad(ctx);
R.ifplay = ctx => ifPlay(ctx);
R.book = ctx => bookAct(ctx);
R.fshapes = ctx => fShapes(ctx); R.fplay = ctx => fPlay(ctx); R.fhunt = ctx => fHunt(ctx); R.ffix = ctx => fFix(ctx);

R.comic = ({ a, body, rec, got }) => {
  body.innerHTML = `<div class="comic">${a.panels.map((p, i) => `<div class="panel ${p.w === 'b' ? 'flip' : ''} ${p.blank ? 'blank' : ''}" style="background:${['#FFF8E1', '#F3ECF6', '#E9F5EE', '#FFF0E0', '#EAF2FA', '#FBEFF3'][i % 6]}"><span class="pn">${ar(i + 1)}</span>${p.fx ? `<span class="fx">${esc(p.fx)}</span>` : ''}<div class="who">${char(p.w, p.m)}</div><div class="say"><b style="color:var(--plum)">${cname(p.w)}:</b> ${rich(p.s)}${p.code ? `<pre class="mono">${esc(p.code)}</pre>` : ''}${p.blank ? '<div id="blank" style="margin-top:6px;font-weight:700">… ؟</div>' : ''}</div></div>`).join('')}</div><div id="cq"></div>`;
  if (a.q) mcq($('#cq', body), a.q, { key: 'q', ctx: { rec, got }, onDone: () => { const k = a.q.o[a.q.a]; const b = $('#blank'); if (b) b.textContent = '«' + k + '»'; } });
};

R.run = ({ a, body, rec, got }) => {
  a.items.forEach((it, k) => {
    const sec = h(`<div style="margin:0 0 22px"><h3 style="margin:0 0 6px;font-size:17px">${ar(k + 1)}. ${esc(it.h)} <span class="mute" style="font-size:12px;font-weight:400">ص${it.p}</span></h3><div class="pr"></div><div class="ed"></div>${it.note ? `<div class="fb info">💡 ${esc(it.note)}</div>` : ''}</div>`);
    body.appendChild(sec);
    let ed;
    const mk = () => { ed = ide($('.ed', sec), it.code, { files: a.files, onRun: (r) => { if (rec('r' + k, 2)) toast('+٢ ⭐ جرّبتِ الكود'); } }); };
    if (it.predict && !got('p' + k)) {
      const lock = h(`<div class="fb info">🔒 توقّعي أولًا، ثم يُفتح المحرر لتتحققي من توقعكِ.</div>`); $('.ed', sec).appendChild(lock);
      mcq($('.pr', sec), { ...it.predict, q: '🔮 ' + it.predict.q, code: it.code }, { key: 'p' + k, ctx: { rec, got }, pts: 3, retry: 0, mono: 1, onDone: () => { lock.remove(); mk(); } });
    } else { if (it.predict) mcq($('.pr', sec), { ...it.predict, q: '🔮 ' + it.predict.q }, { key: 'p' + k, ctx: { rec, got }, mono: 1 }); mk(); }
  });
};

const GEST = {
  g: ['<svg viewBox="0 0 40 40"><circle cx="20" cy="8" r="5" fill="#2E9E5B"/><path d="M20 14v14M20 28l-6 9M20 28l6 9M20 18l-9-9M20 18l9-9" stroke="#2E9E5B" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>', 'ارفعي يديكِ: نكمل'],
  y: ['<svg viewBox="0 0 40 40"><circle cx="20" cy="9" r="6" fill="#E3A800"/><path d="M20 15v13M20 28l-6 9M20 28l6 9M20 19l-8 6 6 -12" stroke="#E3A800" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>', 'يد على الذقن: أتوقف وأفكر'],
  r: ['<svg viewBox="0 0 40 40"><circle cx="20" cy="8" r="5" fill="#D64545"/><path d="M20 14v14M20 28l-6 9M20 28l6 9M10 14l20 10M30 14L10 24" stroke="#D64545" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>', 'ذراعان متقاطعتان: توقفي!'],
};
R.traffic = ({ a, body, rec, got }) => {
  const zone = (n, en, ar_, legend, inner) => `<div class="zone"><h3><span class="lights" style="gap:3px"><i style="width:12px;height:12px;border-radius:50%;background:var(--g);display:inline-block"></i><i style="width:12px;height:12px;border-radius:50%;background:#F2C200;display:inline-block"></i><i style="width:12px;height:12px;border-radius:50%;background:var(--r);display:inline-block"></i></span>المحطة ${ar(n)}: ${ar_} <span class="en">${en}</span></h3><div class="legend">${legend}</div>${inner}</div>`;
  const L3 = (g, y, r) => `<span><i style="background:var(--g)"></i>${g}</span><span><i style="background:#F2C200"></i>${y}</span><span><i style="background:var(--r)"></i>${r}</span>`;
  const lights = k => `<div class="lights" data-k="${k}"><button class="lt g" data-c="g">🟢</button><button class="lt y" data-c="y">🟡</button><button class="lt r" data-c="r">🔴</button></div>`;
  body.innerHTML = `<div class="road">
  ${zone(1, 'COLOR SHOW', 'اكشفي صحة الفكرة', L3('صحيحة', 'صحيحة جزئيًا / ناقصة', 'غير صحيحة'), a.show.map((x, i) => `<div class="tl-item" id="s${i}"><div>${rich(x.s)}<div class="fbw"></div></div>${lights('s' + i)}</div>`).join(''))}
  ${zone(2, 'OPINION LIGHT', 'عبّري عن رأيكِ', L3('أوافق', 'غير متأكدة', 'لا أوافق'), a.opinion.map((x, i) => `<div class="tl-item" id="o${i}"><div>${rich(x.s)}<input class="in" style="margin-top:6px" placeholder="رأيي لأن… / الدليل…" maxlength="200"><div class="fbw"></div></div>${lights('o' + i)}</div>`).join(''))}
  ${zone(3, 'MOVE WITH THE LIGHT', 'استجيبي بالحركة', `<span>اختاري الحركة التي ستؤدينها في الفصل:</span>`, a.move.map((x, i) => `<div class="tl-item" id="m${i}" style="grid-template-columns:1fr"><div>${rich(x.s)}</div><div class="gest">${['g', 'y', 'r'].map(c => `<button data-c="${c}">${GEST[c][0]}${GEST[c][1]}</button>`).join('')}</div><div class="fbw"></div></div>`).join(''))}</div>`;
  a.show.forEach((x, i) => {
    const row = $('#s' + i, body), tries = { n: 0 };
    const fin = () => { $$('.lt', row).forEach(b => { b.disabled = true; if (b.dataset.c === x.a) b.classList.add('on', 'right'); }); $('.fbw', row).innerHTML = `<div class="fb ${x.a === 'g' ? 'ok' : 'info'}">✍ ${rich(x.fix)}</div>`; };
    if (got('s' + i)) return fin();
    $$('.lt', row).forEach(b => b.onclick = () => { if (b.dataset.c === x.a) { beep(1); rec('s' + i, tries.n ? 5 : 10, { tries: tries.n }); fin(); } else { beep(0); tries.n++; b.disabled = true; b.classList.add('on'); $('.fbw', row).innerHTML = '<div class="fb no">ليس هذا اللون. اقرئي العبارة مرة أخرى بدقة.</div>'; } });
  });
  a.opinion.forEach((x, i) => {
    const row = $('#o' + i, body), inp = $('input', row); let col = null; const g = got('o' + i);
    if (g) { inp.value = g.d?.why || ''; inp.disabled = true; $$('.lt', row).forEach(b => { b.disabled = true; if (b.dataset.c === g.d?.c) b.classList.add('on'); }); $('.fbw', row).innerHTML = '<div class="fb ok">✔ سُجّل رأيكِ</div>'; return; }
    const tryRec = () => { if (!col) return; if (inp.value.trim().split(/\s+/).length < 3) { $('.fbw', row).innerHTML = '<div class="fb info">اكتبي سببكِ في ٣ كلمات على الأقل ثم اضغطي Enter.</div>'; return; } rec('o' + i, 5, { c: col, why: inp.value.trim() }); beep(1); inp.disabled = true; $$('.lt', row).forEach(b => b.disabled = true); $('.fbw', row).innerHTML = '<div class="fb ok">✔ سُجّل رأيكِ. لا توجد إجابة واحدة صحيحة هنا؛ المهم الدليل.</div>'; };
    $$('.lt', row).forEach(b => b.onclick = () => { col = b.dataset.c; $$('.lt', row).forEach(x => x.classList.toggle('on', x === b)); tryRec(); });
    inp.onkeydown = e => { if (e.key === 'Enter') tryRec(); }; inp.onblur = tryRec;
  });
  a.move.forEach((x, i) => {
    const row = $('#m' + i, body), tries = { n: 0 };
    const fin = () => { $$('.gest button', row).forEach(b => { b.disabled = true; if (b.dataset.c === x.a) b.classList.add('ok'); }); $('.fbw', row).innerHTML = `<div class="fb ok">${rich(x.why)}</div>`; };
    if (got('m' + i)) return fin();
    $$('.gest button', row).forEach(b => b.onclick = () => { if (b.dataset.c === x.a) { beep(1); rec('m' + i, tries.n ? 5 : 10, { tries: tries.n }); fin(); } else { beep(0); tries.n++; b.classList.add('no'); b.disabled = true; } });
  });
};

R.tpr = ({ a, body, rec, got }) => {
  const TH = { up: ['👍', 'أوافق / صحيحة'], side: ['👉', 'غير متأكدة / أحتاج دليلًا'], down: ['👎', 'لا أوافق / خطأ'] };
  if (a.thumbs) {
    body.appendChild(h(`<h3 style="margin:4px 0">👍 مقياس الإبهام <span class="mode">THUMB METER</span></h3>`));
    a.thumbs.forEach((x, i) => {
      const row = h(`<div class="q"><div class="qt">${rich(x.s)}</div><div class="gest">${Object.entries(TH).map(([k, v]) => `<button data-c="${k}"><span style="font-size:24px">${v[0]}</span>${v[1]}</button>`).join('')}</div><div class="fbw"></div></div>`);
      body.appendChild(row); const tries = { n: 0 };
      const fin = () => { $$('button', row).forEach(b => { b.disabled = true; if (b.dataset.c === x.a) b.classList.add('ok'); }); $('.fbw', row).innerHTML = `<div class="fb info">${rich(x.why)}</div>`; };
      if (got('t' + i)) return fin();
      $$('button', row).forEach(b => b.onclick = () => { if (b.dataset.c === x.a) { beep(1); rec('t' + i, tries.n ? 5 : 10, { tries: tries.n }); fin(); } else { beep(0); tries.n++; b.classList.add('no'); b.disabled = true; $('.fbw', row).innerHTML = '<div class="fb no">فكّري مرة أخرى… ما الدليل من الدرس؟</div>'; } });
    });
  }
  if (a.conf) {
    body.appendChild(h(`<h3 style="margin:16px 0 4px">✋ إجابتي + مدى ثقتي <span class="mode">CONFIDENCE SIGNAL</span></h3>`));
    body.appendChild(h(`<p class="mute" style="margin:0 0 6px;font-size:14px">اختاري الإجابة، ثم ثقتكِ: ١ خمّنت • ٢ عندي فكرة • ٣ شبه متأكدة • ٤ متأكدة • ٥ أستطيع شرحها لغيري.</p>`));
    a.conf.forEach((x, i) => {
      const row = h(`<div class="q"><div class="qt">${esc(x.q)}</div>${codeHTML(x.code)}<div class="opts">${x.o.map((o, j) => `<button class="opt mono" data-i="${j}">${esc(o)}</button>`).join('')}</div><div class="conf" style="margin-top:8px" hidden>${[1, 2, 3, 4, 5].map(n => `<button data-n="${n}">${ar(n)}</button>`).join('')}</div><div class="fbw"></div></div>`);
      body.appendChild(row); let pick = null;
      const show = (p, n) => { const ok = p === x.a; $$('.opt', row).forEach(b => { b.disabled = true; if (+b.dataset.i === x.a) b.classList.add('ok'); else if (+b.dataset.i === p) b.classList.add('no'); }); $$('.conf button', row).forEach(b => { b.disabled = true; b.classList.toggle('on', +b.dataset.n === n); }); $('.conf', row).hidden = false;
        const msg = ok && n >= 4 ? 'إجابة صحيحة وثقة عالية: ممتاز! 💪' : ok ? 'إجابتكِ صحيحة، ثقي بنفسكِ أكثر 🌱' : n >= 4 ? 'كنتِ واثقة لكن الإجابة غير صحيحة؛ راجعي هذا الجزء جيدًا 🔍' : 'جيد أنكِ عرفتِ أنكِ غير متأكدة؛ راجعي المثال وجرّبيه في المعمل.';
        $('.fbw', row).innerHTML = `<div class="fb ${ok ? 'ok' : 'no'}">${msg}</div>`; };
      const g = got('c' + i); if (g) return show(g.d.p, g.d.n);
      $$('.opt', row).forEach(b => b.onclick = () => { pick = +b.dataset.i; $$('.opt', row).forEach(x => x.classList.toggle('sel', x === b)); $('.conf', row).hidden = false; });
      $$('.conf button', row).forEach(b => b.onclick = () => { if (pick == null) return; const n = +b.dataset.n; rec('c' + i, pick === x.a ? 10 : 0, { p: pick, n }); beep(pick === x.a); show(pick, n); });
    });
  }
};

// ترتيب الأسطر (BUILD IT) — بالنقر
function orderTask(host, lines, onOk) {
  const el = h(`<div class="order"><p class="mute" style="font-size:14px;margin:0">اضغطي على الأسطر بالترتيب الصحيح:</p><ol class="pool"></ol><p style="margin:8px 0 2px;font-weight:700">برنامجكِ:</p><ol class="built" style="min-height:40px;border:2px dashed var(--line);border-radius:12px;padding:6px"></ol><div class="row" style="margin-top:6px"><button class="btn ghost chk" style="padding:6px 16px">تحققي</button><button class="btn ghost clr" style="padding:6px 16px">مسح</button></div><div class="fbw"></div></div>`);
  host.appendChild(el); let built = [];
  const pool = shuffle(lines.map((l, i) => i));
  const paint = () => {
    $('.pool', el).innerHTML = pool.filter(i => !built.includes(i)).map(i => `<li class="pick" data-i="${i}"><span class="mono" style="white-space:pre">${esc(lines[i])}</span></li>`).join('');
    $('.built', el).innerHTML = built.map(i => `<li data-i="${i}"><span class="mono" style="white-space:pre">${esc(lines[i])}</span></li>`).join('');
    $$('.pool li', el).forEach(li => li.onclick = () => { built.push(+li.dataset.i); paint(); });
    $$('.built li', el).forEach(li => li.onclick = () => { built = built.filter(x => x !== +li.dataset.i); paint(); });
  };
  paint(); let tries = 0;
  $('.clr', el).onclick = () => { built = []; paint(); };
  $('.chk', el).onclick = () => {
    if (built.length < lines.length) return $('.fbw', el).innerHTML = '<div class="fb info">أكملي ترتيب كل الأسطر أولًا.</div>';
    if (built.every((v, i) => lines[v] === lines[i])) { beep(1); $('.fbw', el).innerHTML = '<div class="fb ok">✔ ترتيب صحيح!</div>'; $$('button', el).forEach(b => b.disabled = true); onOk(tries); }
    else { beep(0); tries++; const bad = built.findIndex((v, i) => lines[v] !== lines[i]); $('.fbw', el).innerHTML = `<div class="fb no">السطر رقم ${ar(bad + 1)} ليس في مكانه. فكّري: ماذا يجب أن يحدث أولًا؟</div>`; }
  };
  return el;
}
function matchTask(host, pairs, onOk, mono) {
  const el = h(`<div class="match"><div class="col l"></div><div class="col r"></div></div>`); host.appendChild(el);
  const fb = h('<div class="fbw"></div>'); host.appendChild(fb);
  const L = shuffle(pairs.map((_, i) => i)), Rr = shuffle(pairs.map((_, i) => i));
  $('.l', el).innerHTML = L.map(i => `<button data-i="${i}" class="${mono === 'l' ? 'mono' : ''}">${mono === 'l' ? esc(pairs[i][0]) : rich(pairs[i][0])}</button>`).join('');
  $('.r', el).innerHTML = Rr.map(i => `<button data-i="${i}" class="${mono === 'r' ? 'mono' : ''}">${mono === 'r' ? esc(pairs[i][1]) : rich(pairs[i][1])}</button>`).join('');
  let sel = null, wrong = 0, ok = 0;
  $$('.l button', el).forEach(b => b.onclick = () => { if (b.classList.contains('ok')) return; sel = b; $$('.l button', el).forEach(x => x.classList.toggle('sel', x === b)); });
  $$('.r button', el).forEach(b => b.onclick = () => {
    if (!sel || b.classList.contains('ok')) return;
    if (sel.dataset.i === b.dataset.i) { beep(1); sel.classList.remove('sel'); sel.classList.add('ok'); b.classList.add('ok'); sel = null; ok++; if (ok === pairs.length) { fb.innerHTML = '<div class="fb ok">✔ طابقتِ الكل!</div>'; onOk(wrong); } }
    else { beep(0); wrong++; b.classList.add('no'); setTimeout(() => b.classList.remove('no'), 500); }
  });
  return el;
}
function doneMatch(host, pairs) { host.innerHTML = `<div class="match"><div class="col">${pairs.map(p => `<button class="ok mono">${esc(p[0])}</button>`).join('')}</div><div class="col">${pairs.map(p => `<button class="ok">${rich(p[1])}</button>`).join('')}</div></div>`; }

R.match = ({ a, body, rec, got }) => {
  if (got('all')) return doneMatch(body, a.pairs);
  matchTask(body, a.pairs, w => rec('all', Math.max(0, a.pairs.length * 5 - w * 2), { wrong: w }), a.mono);
};

R.quiz = ({ a, body, rec, got }) => {
  a.items.forEach((q, i) => mcq(body, { ...q, q: `${ar(i + 1)}. ${q.q}` }, { key: 'q' + i, ctx: { rec, got }, mono: q.code ? 1 : 0, noShuffle: q.o.length === 2 }));
};

/* المهمة السرية */
function envSVG(c, open) { return `<svg viewBox="0 0 160 110"><rect x="4" y="18" width="152" height="88" rx="10" fill="${c}" stroke="#2B2030" stroke-width="3"/>${open ? `<path d="M4 22 L80 2 L156 22" fill="${c}" stroke="#2B2030" stroke-width="3"/>` : `<path d="M6 22 L80 70 L154 22" fill="none" stroke="#2B2030" stroke-width="3"/>`}<rect x="40" y="76" width="80" height="20" rx="4" fill="#fff" opacity=".85"/><text x="80" y="91" text-anchor="middle" font-family="Lalezar" font-size="14" fill="#D64545">TOP SECRET</text></svg>`; }
R.mission = ({ a, body, rec, got }) => {
  const COLS = ['#7FB3E6', '#FFD86B', '#FFB070', '#8FD6A0', '#F59A9A'];
  const paint = () => {
    const done = a.missions.map((m, i) => !!got('m' + i)), n = done.filter(Boolean).length;
    body.innerHTML = `<div class="fb info" style="white-space:pre-line">🕵️‍♀️ ${esc(a.story)}</div>
    <div class="progress" style="margin:12px 0"><i style="width:${n / a.missions.length * 100}%"></i></div>
    <div class="envs">${a.missions.map((m, i) => `<button class="env ${done[i] ? 'done' : ''}" data-i="${i}">${done[i] ? `<span class="reward">${m.r}</span>` : ''}${envSVG(COLS[i], done[i])}<div class="lbl">المهمة ${ar(i + 1)}: ${m.ar}<small>${m.type}</small></div></button>`).join('')}</div>
    <h3 style="text-align:center;margin:8px 0 0">🔐 الرمز السري</h3><div class="codebar">${a.code.split('').map((ch, i) => `<span class="${done[i] ? 'f' : ''}">${done[i] ? ch : '?'}</span>`).join('')}</div>
    <div class="lock"><svg viewBox="0 0 64 64"><rect x="10" y="28" width="44" height="32" rx="6" fill="${n === a.missions.length ? '#2E9E5B' : '#534057'}"/><path d="${n === a.missions.length ? 'M20 28V18a12 12 0 0 1 23-5' : 'M20 28V18a12 12 0 0 1 24 0v10'}" stroke="#534057" stroke-width="6" fill="none"/></svg><div style="flex:1"><b>المهمة النهائية FINAL MISSION</b><div class="mute" style="font-size:14px">${n === a.missions.length ? 'اكتبي الرمز السري لفتح الظرف النهائي:' : 'أكملي المهمات الخمس أولًا. كل حرف من مهمة!'}</div>
    ${n === a.missions.length ? `<div class="row" style="margin-top:6px"><input class="in mono" id="code" style="max-width:180px;letter-spacing:6px;text-transform:uppercase" maxlength="${a.code.length}" value="${got('final') ? a.code : ''}"><button class="btn plum" id="open">افتحي</button></div>` : ''}</div></div><div id="final"></div>`;
    $$('.env', body).forEach(b => b.onclick = () => openM(+b.dataset.i));
    const op = $('#open', body);
    if (op) { op.onclick = () => { if ($('#code', body).value.trim().toUpperCase() === a.code) { beep(1); showFinal(); } else { beep(0); toast('الرمز غير صحيح 🔒 رتّبي الحروف حسب أرقام المهمات'); } }; if (got('final')) showFinal(); }
  };
  const showFinal = () => {
    const f = $('#final', body); if (f.dataset.on) return; f.dataset.on = 1;
    f.innerHTML = `<div class="card" style="margin-top:14px;background:var(--org2)"><span class="stamp">FINAL MISSION</span><p style="white-space:pre-line">${esc(a.final.story)}</p><div id="fq"></div></div>`;
    mcq($('#fq', f), a.final, { key: 'final', ctx: { rec, got }, pts: 20, retry: 10, onDone: (ok, old) => { if (!old) { confetti(); toast('🎉 أنجزتِ المهمة السرية!'); } } });
  };
  const openM = i => {
    const m = a.missions[i]; const md = h(`<div class="modal"><div class="card"><div class="row" style="justify-content:space-between"><span class="mode">${m.type}</span><button class="btn ghost" style="padding:4px 12px">✕</button></div><h2 class="h2" style="margin-top:8px">المهمة ${ar(i + 1)}: ${m.ar}</h2><div id="mb"></div></div></div>`);
    document.body.appendChild(md); const close = () => { md.remove(); paint(); }; $('.btn', md).onclick = close; md.onclick = e => { if (e.target === md) close(); };
    const mb = $('#mb', md), win = (s, tr) => { if (rec('m' + i, s, { tries: tr || 0 })) { toast(`🔓 حصلتِ على الحرف ${m.r}`); } mb.appendChild(h(`<div class="fb ok" style="text-align:center;font-size:18px">الحرف السري: <b class="mono" style="font-size:28px">${m.r}</b> <button class="btn" style="margin-right:10px">رجوع للوحة</button></div>`)); $('.fb.ok:last-child .btn', mb).onclick = close; };
    if (got('m' + i)) { mb.innerHTML = `<div class="fb ok">أنجزتِ هذه المهمة، والحرف هو <b class="mono">${m.r}</b>.</div>`; return; }
    if (m.kind === 'order') { mb.appendChild(h(`<p>${rich(m.q)}</p>`)); orderTask(mb, m.lines, t => win(t ? 5 : 10, t)); }
    else if (m.kind === 'match') { mb.appendChild(h(`<p>${rich(m.q)}</p>`)); matchTask(mb, m.pairs, w => win(w > 1 ? 5 : 10, w), 'l'); }
    else mcq(mb, m, { onDone: (ok, old, tr) => win(tr ? 5 : 10, tr), mono: m.mono });
  };
  paint();
};

/* لغز البصمات */
function fpSVG(seed) {
  let p = ''; const cx = 100, cy = 110;
  for (let k = 0; k < 13; k++) { const rx = 12 + k * 6.2, ry = 16 + k * 7.4; const gap = (seed * 37 + k * 53) % 360; const a1 = (gap) * Math.PI / 180, a2 = (gap + 28 + (k % 3) * 10) * Math.PI / 180;
    const x1 = cx + rx * Math.cos(a2), y1 = cy + ry * Math.sin(a2), x2 = cx + rx * Math.cos(a1 + 2 * Math.PI), y2 = cy + ry * Math.sin(a1 + 2 * Math.PI);
    p += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${rx} ${ry} 0 1 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="#111" stroke-width="3.2" stroke-linecap="round"/>`; }
  return `<svg viewBox="0 0 200 220"><defs><clipPath id="fpc${seed}"><ellipse cx="100" cy="110" rx="88" ry="104"/></clipPath></defs><ellipse cx="100" cy="110" rx="90" ry="106" fill="#fff" stroke="#111" stroke-width="2"/><g clip-path="url(#fpc${seed})" transform="rotate(${seed * 9 - 18} 100 110)">${p}</g></svg>`;
}
R.prints = ({ a, body, rec, got }) => {
  const POS = [[50, 28], [28, 58], [70, 66]];
  const total = a.prints.flat().length;
  const paint = () => {
    const solved = a.prints.flat().filter((_, k) => got('p' + k)).length;
    let k = 0;
    body.innerHTML = `<div class="case"><div class="scene"><span class="pin" style="top:8px;right:12px"></span><span class="pin" style="top:8px;left:12px"></span><b style="font-family:Lalezar;font-size:20px">🔎 ${esc(a.scene.title)}</b><div>${a.scene.clues.map((c, i) => `<span class="clue mono" style="--rot:${(i % 2 ? 1 : -1) * (1 + i % 3)}deg">${esc(c)}</span>`).join('')}</div></div>
    <div class="progress"><i style="width:${solved / total * 100}%"></i></div><div class="mute" style="font-size:13px">حللتِ ${ar(solved)} من ${ar(total)} سؤالًا. اقتربي من البصمة واضغطي على النقاط المخفية فيها.</div>
    <div class="prints">${a.prints.map((pr, j) => `<div class="fp"><div style="position:relative">${fpSVG(j + 1)}<div class="dots">${pr.map((q, i) => { const kk = k++; const g = got('p' + kk); return `<button class="hd ${g ? (g.s >= 5 ? 'ok' : 'no') : ''}" style="left:${POS[i][0]}%;top:${POS[i][1]}%" data-k="${kk}" data-j="${j}" data-i="${i}" title="سؤال مخفي">${g ? '✓' : '؟'}</button>`; }).join('')}</div></div><div class="cap">البصمة ${ar(j + 1)}</div></div>`).join('')}</div>
    <div class="lock"><svg viewBox="0 0 64 64"><rect x="8" y="14" width="48" height="40" rx="6" fill="#C9A86A"/><rect x="8" y="14" width="48" height="10" fill="#A8874E"/><circle cx="32" cy="38" r="7" fill="${solved === total ? '#2E9E5B' : '#534057'}"/></svg><div style="flex:1"><b style="font-family:Lalezar;font-size:20px">فتح القضية</b><div class="mute" style="font-size:14px">${solved === total ? 'جمعتِ كل الأدلة! افتحي القضية:' : 'حلّي أسئلة البصمات الخمس لتفتحي القضية.'}</div></div>${solved === total ? '<button class="btn plum" id="oc">افتحي</button>' : ''}</div><div id="fc"></div></div>`;
    $$('.hd', body).forEach(b => b.onclick = () => {
      const kk = +b.dataset.k, q = a.prints[+b.dataset.j][+b.dataset.i]; if (got('p' + kk)) return;
      const md = h(`<div class="modal"><div class="card"><div class="row" style="justify-content:space-between"><b>البصمة ${ar(+b.dataset.j + 1)} · سؤال ${ar(+b.dataset.i + 1)}</b><button class="btn ghost" style="padding:4px 12px">✕</button></div><div id="qb"></div></div></div>`);
      document.body.appendChild(md); const close = () => { md.remove(); paint(); }; $('.btn', md).onclick = close; md.onclick = e => { if (e.target === md) close(); };
      mcq($('#qb', md), q, { key: 'p' + kk, ctx: { rec, got }, pts: 5, retry: 2, noShuffle: q.o.length === 2, onDone: () => setTimeout(close, 1400) });
    });
    const oc = $('#oc', body); if (oc) { oc.onclick = () => { $('#fc', body).innerHTML = '<div class="card" style="margin-top:12px;background:var(--org2)"><span class="stamp">FINAL CASE</span><div id="fq"></div></div>'; mcq($('#fq', body), a.final, { key: 'final', ctx: { rec, got }, pts: 20, retry: 10, onDone: (ok, old) => { if (!old) { confetti(); toast('🎉 حُلّت القضية!'); } } }); oc.remove(); }; if (got('final')) oc.click(); }
  };
  paint();
};

/* تحدي البرمجة */
R.code = ({ a, body, rec, got }) => {
  body.innerHTML = `<div class="fb info" style="font-size:15px">${a.task}</div><div id="ed" style="margin-top:10px"></div><div class="row" style="margin-top:10px"><button class="btn g" id="chk">✔ تحققي من حلّي</button><button class="btn ghost" id="hint">💡 تلميح</button><button class="btn ghost" id="sol">👀 الحل</button></div><div id="res"></div>`;
  const prev = got('done');
  const ed = ide($('#ed', body), (prev && prev.d?.code) || a.starter, { files: a.files });
  let last = null; const orun = $('.run', ed.el).onclick;
  $('.run', ed.el).onclick = async () => { await orun(); };
  $('#hint', body).onclick = () => { $('#res', body).innerHTML = say(`<b>تلميح:</b><pre class="mono" style="background:var(--code);color:var(--codeink);border-radius:10px;padding:6px 10px">${esc(a.hint)}</pre>`, 'wink', 'b'); };
  $('#sol', body).onclick = () => { if (!confirm('إذا شاهدتِ الحل ستحصلين على نصف النقاط فقط. متأكدة؟')) return; ed.set(a.sol); S.p[CUR.L] ; P(LESSONS[CUR.L].id, CUR.ai).sol = 1; save(); };
  $('#chk', body).onclick = async () => {
    const b = $('#chk', body); b.disabled = true; b.textContent = '⏳ أتحقق…';
    const out = $('.out', ed.el), tk = $('.tkhost', ed.el);
    const live = a.checks.some(c => c.live) && tk.children.length;
    let r;
    if (live) r = { ok: true, out: out.textContent }; else r = await PY.run(ed.ta.value, out, tk);
    b.disabled = false; b.textContent = '✔ تحققي من حلّي';
    if (!r.ok) { $('#res', body).innerHTML = say(`<b>البرنامج فيه خطأ، صحّحيه أولًا.</b><br>${esc(r.hint || '')}`, 'think'); return; }
    const res = a.checks.map(c => {
      if (c.py) return PY.check(c.py);
      if (c.out) return new RegExp(c.out).test(r.out);
      if (c.lines) return r.out.split('\n').filter(x => x.trim()).length >= c.lines;
      return true;
    });
    const n = res.filter(Boolean).length, mx = maxOf(a);
    $('#res', body).innerHTML = `<div class="q">${a.checks.map((c, i) => `<div style="color:${res[i] ? 'var(--g)' : 'var(--r)'}">${res[i] ? '✔' : '✘'} ${esc(c.msg)}</div>`).join('')}</div>`;
    if (n === a.checks.length) {
      const sol = P(LESSONS[CUR.L].id, CUR.ai).sol; const s = sol ? Math.round(mx / 2) : mx;
      if (rec('done', s, { code: ed.ta.value.slice(0, 4000) })) { confetti(); toast(`🎉 +${ar(s)} ⭐ حلّ صحيح!`); }
      $('#res', body).appendChild(h(say('<b>رائع!</b> حلّكِ صحيح ونفّذ كل المطلوب. 🌟', 'wow')));
    } else $('#res', body).appendChild(h(say(`أنجزتِ ${ar(n)} من ${ar(a.checks.length)}. راجعي البنود الحمراء.`, 'think')));
  };
  if (prev) $('#res', body).innerHTML = say('أنجزتِ هذا التحدي من قبل ✔ يمكنكِ التعديل والتجربة بحرية.', 'happy');
};

/* المستكشفات */
R.explore = (ctx) => (ctx.a.w === 'coords' ? exCoords : exGrid)(ctx);
function exCoords({ a, body, rec, got }) {
  const W = 400, H = 300;
  body.innerHTML = `<div class="row" style="align-items:flex-start;gap:18px"><div class="coord"><canvas width="${W}" height="${H}"></canvas></div><div style="flex:1;min-width:200px"><div class="q"><div class="qt" id="task"></div><div class="mono" id="pos" style="font-size:18px">(x, y)</div><div class="fbw" id="fb"></div></div>${say('تذكري: <b>x</b> تكبر نحو اليمين، و<b>y</b> تكبر نحو الأسفل. والنقطة (0,0) في الزاوية اليسرى العليا.', 'wink', 'b')}</div></div>`;
  const c = $('canvas', body), x = c.getContext('2d');
  const draw = (hit) => {
    x.fillStyle = '#008080'; x.fillRect(0, 0, W, H); x.strokeStyle = 'rgba(255,255,255,.25)'; x.lineWidth = 1; x.font = '10px Rubik'; x.fillStyle = 'rgba(255,255,255,.8)';
    for (let i = 0; i <= W; i += 50) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, H); x.stroke(); if (i) x.fillText(i, i + 2, 10); }
    for (let j = 0; j <= H; j += 50) { x.beginPath(); x.moveTo(0, j); x.lineTo(W, j); x.stroke(); if (j) x.fillText(j, 2, j - 2); }
    x.fillStyle = '#ECD571'; x.font = 'bold 11px Rubik'; x.fillText('(0,0)', 3, 12);
    a.targets.forEach((t, i) => { if (got('t' + i)) { x.fillStyle = '#2E9E5B'; x.beginPath(); x.arc(t[0], t[1], 7, 0, 7); x.fill(); } });
    if (hit) { x.strokeStyle = '#ECD571'; x.lineWidth = 2; x.beginPath(); x.arc(hit[0], hit[1], 10, 0, 7); x.stroke(); }
  };
  const cur = () => a.targets.findIndex((t, i) => !got('t' + i));
  const task = () => { const i = cur(); $('#task', body).innerHTML = i < 0 ? '✔ أنجزتِ كل النقاط!' : `اضغطي على النقطة <span class="mono">(${a.targets[i][0]}, ${a.targets[i][1]})</span> <span class="mute">(${ar(i + 1)} من ${ar(a.targets.length)})</span>`; };
  const pos = e => { const r = c.getBoundingClientRect(); return [Math.round((e.clientX - r.left) * W / r.width), Math.round((e.clientY - r.top) * H / r.height)]; };
  let tries = 0;
  c.onmousemove = e => { const [X, Y] = pos(e); $('#pos', body).textContent = `x=${X}, y=${Y}`; };
  c.onclick = e => { const i = cur(); if (i < 0) return; const [X, Y] = pos(e); const t = a.targets[i]; const d = Math.hypot(X - t[0], Y - t[1]);
    $('#pos', body).textContent = `x=${X}, y=${Y}`;
    if (d <= 22) { beep(1); rec('t' + i, tries ? 2 : 5, { tries }); tries = 0; $('#fb', body).innerHTML = '<div class="fb ok">✔ إصابة دقيقة!</div>'; draw(); task(); }
    else { beep(0); tries++; $('#fb', body).innerHTML = `<div class="fb no">ضغطتِ عند (${X}, ${Y}). ${Math.abs(Y - t[1]) > 22 ? (Y > t[1] ? 'اصعدي للأعلى (y أصغر).' : 'انزلي للأسفل (y أكبر).') : (X > t[0] ? 'اتجهي يسارًا (x أصغر).' : 'اتجهي يمينًا (x أكبر).')}</div>`; draw([X, Y]); } };
  draw(); task();
}
function exGrid({ a, body, rec, got }) {
  const D = a.data, lit = v => typeof v === 'string' ? `'${v}'` : v;
  body.innerHTML = `<pre class="mono codeblk">list=${esc(JSON.stringify(D).replace(/"/g, "'"))}</pre><div class="row" style="align-items:flex-start;gap:20px"><div class="nl">${D.map((r, i) => `<div class="r"><span class="ri">[${i}]</span>${r.map((v, j) => `<button class="c" data-i="${i}" data-j="${j}" title="list[${i}][${j}]">${esc(lit(v))}</button>`).join('')}</div>`).join('')}</div><div style="flex:1;min-width:200px"><div class="q"><div class="qt" id="task"></div><div class="fbw" id="fb"></div></div>${say('الرقم الأول يحدد <b>الصف</b> (القائمة الداخلية)، والثاني يحدد <b>العنصر</b> داخلها.', 'happy', 'b')}</div></div>`;
  const cur = () => a.targets.findIndex((t, i) => !got('t' + i));
  const task = () => { const i = cur(); $('#task', body).innerHTML = i < 0 ? '✔ أنجزتِ كل المهام!' : `اضغطي على <span class="mono">list[${a.targets[i][0]}][${a.targets[i][1]}]</span> <span class="mute">(${ar(i + 1)} من ${ar(a.targets.length)})</span>`; };
  let tries = 0;
  $$('.c', body).forEach(b => b.onclick = () => { const i = cur(); if (i < 0) return; const t = a.targets[i];
    $$('.c', body).forEach(x => x.classList.remove('hit', 'bad'));
    if (+b.dataset.i === t[0] && +b.dataset.j === t[1]) { beep(1); b.classList.add('hit'); rec('t' + i, tries ? 2 : 5, { tries }); tries = 0; $('#fb', body).innerHTML = `<div class="fb ok">✔ list[${t[0]}][${t[1]}] = ${esc(String(lit(D[t[0]][t[1]])))}</div>`; task(); }
    else { beep(0); tries++; b.classList.add('bad'); $('#fb', body).innerHTML = `<div class="fb no">هذا list[${b.dataset.i}][${b.dataset.j}]. ${+b.dataset.i !== t[0] ? 'غيّري الصف أولًا.' : 'الصف صحيح، غيّري موقع العنصر.'}</div>`; } });
  task();
}

/* بطاقة الإتقان */
R.master = ({ L, body }) => {
  const st = lessonStat(L), ok = st.pct >= MASTER;
  const rows = L.acts.map((a, i) => ({ a, i, mx: maxOf(a), sc: Math.min(scoreOf(L.id, i), maxOf(a)) })).filter(x => x.mx);
  const self = (S.self ||= {})[L.id] ||= {};
  body.innerHTML = `<div class="row" style="gap:18px;align-items:center"><div style="width:110px">${koda(ok ? 'wow' : 'think')}</div><div style="flex:1"><h2 class="h1" style="font-size:28px">${ok ? 'مبروك! أنتِ «متقنة» لهذه المحطة 🎉' : 'لم تكتمل محطتكِ بعد'}</h2><div class="progress"><i style="width:${st.pct * 100}%"></i></div><p class="mute">نسبة الإتقان: <b>${ar(Math.round(st.pct * 100))}٪</b> (المطلوب ${ar(80)}٪) · النقاط ${ar(st.s)} من ${ar(st.m)}</p></div></div>
  <table class="skills" style="margin-top:12px"><tr><th>النشاط</th><th>نقاطي</th><th></th></tr>${rows.map(x => `<tr><td>${TYPE[x.a.t][0]}: ${esc(x.a.title || '')}</td><td>${ar(x.sc)} / ${ar(x.mx)}</td><td>${x.sc >= x.mx * .6 ? '✔' : `<button class="btn ghost" style="padding:2px 12px;font-size:13px" onclick="go('lesson',${CUR.L},${x.i})">أكملي</button>`}</td></tr>`).join('')}</table>
  <h3 style="margin-top:18px">جدول المهارات (من الكتاب ص٢١٦): قيّمي نفسكِ بصدق</h3><table class="skills">${L.skills.map((s, i) => `<tr><td>${rich(s)}</td><td><div class="conf">${['أتقنت', 'لم أتقن بعد'].map((t, j) => `<button data-i="${i}" data-v="${j}" class="${self[i] === j ? 'on' : ''}">${t}</button>`).join('')}</div></td></tr>`).join('')}</table>
  ${ok ? '' : say('نصيحة: ابدئي بالأنشطة التي لم تكتمل في الجدول أعلاه؛ أكثرها نقاطًا «تحدي البرمجة» و«المهمة السرية».', 'happy', 'b')}`;
  $$('.conf button', body).forEach(b => b.onclick = () => { self[b.dataset.i] = +b.dataset.v; save(); $$(`.conf button[data-i="${b.dataset.i}"]`, body).forEach(x => x.classList.toggle('on', x === b)); });
  if (ok && !(S.cele ||= {})[L.id]) { S.cele[L.id] = 1; save(); confetti(); }
};

/* ---------- الشهادة ---------- */
function vCert() {
  const u = S.user; const core = LESSONS.filter(L => !L.exam && !L.project && !L.extra);
  if (!core.every(L => lessonStat(L).pct >= MASTER)) return go('map');
  const d = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-arab', { day: 'numeric', month: 'numeric', year: 'numeric' }).format(new Date());
  main().innerHTML = `<div class="cert"><div style="width:120px;margin:auto">${koda('wow')}</div><div class="mute">المتوسطة الحادية والعشرون · المهارات الرقمية</div><h1 class="h1" style="font-size:36px">شهادة إتقان</h1><p>تشهد المعلمة أ. ابتسام الشهري بأن الطالبة</p><div class="nm">${esc(u.name)}</div><p>من فصل ${esc(u.cls)} أتقنت ${CFG.unit} في المعمل الافتراضي</p>
  <table class="skills" style="max-width:520px;margin:auto">${LESSONS.map(L => `<tr><td>${esc(L.title)}</td><td>${ar(Math.round(lessonStat(L).pct * 100))}٪</td></tr>`).join('')}</table><p style="margin-top:12px">مجموع النقاط: <b>${ar(totalXP())}</b> · المستوى: <b>${level(totalXP())[0]}</b></p><p class="mute">التاريخ: ${d}هـ</p></div>
  <div class="row noprint" style="justify-content:center;margin-top:14px"><button class="btn plum" onclick="print()">🖨 طباعة / حفظ PDF</button><button class="btn ghost" onclick="go('map')">رجوع</button></div>`;
  confetti();
}

/* ---------- لوحة التحدي على السبورة (للمعلمة) ---------- */
let JB = null;
function vBoard() {
  try { JB = JB || JSON.parse(localStorage.getItem(CFG.lab + '-board') || 'null'); } catch (e) {}
  JB = JB || { teams: ['الفريق ١', 'الفريق ٢', 'الفريق ٣', 'الفريق ٤'].map(n => ({ n, s: 0 })), used: {}, turn: 0 };
  const sv = () => { try { localStorage.setItem(CFG.lab + '-board', JSON.stringify(JB)); } catch (e) {} };
  const ROLES = ['المختارة', 'القارئة', 'قائدة التفكير', 'صائدة الأدلة', 'المتحدثة النهائية'];
  const roundN = Object.keys(JB.used).length;
  main().innerHTML = `<div class="row" style="justify-content:space-between"><h1 class="h1">لوحة التحدي 🎯</h1><div class="row"><button class="btn ghost" id="fs">⛶ ملء الشاشة</button><button class="btn ghost" id="rs">↺ لعبة جديدة</button></div></div>
  <p class="mute" style="margin-top:0">١٠٠ تذكّر · ٢٠٠ فهم · ٣٠٠ تطبيق · ٤٠٠ تحليل · ٥٠٠ تحدٍّ وحل مشكلة. الأدوار تتبدل كل جولة: <b>${ROLES.map((r, i) => r).join('، ')}</b>.</p>
  <div class="jboard">${JEOP.cats.map(c => `<div class="jcat">${esc(c)}</div>`).join('')}${[0, 1, 2, 3, 4].map(r => JEOP.cats.map((_, c) => { const k = c + '-' + r, it = JEOP.q[c][r]; return `<button class="jt ${JB.used[k] ? 'used' : ''}" data-c="${c}" data-r="${r}">${JB.used[k] ? '✓' : ar((r + 1) * 100)}<span class="sp">${it.sp === 'all' ? 'ALL PLAY' : it.sp === 'double' ? 'DOUBLE' : it.sp === 'risk' ? 'RISK IT' : ''}</span></button>`; }).join('')).join('')}</div>
  <div class="teams">${JB.teams.map((t, i) => `<div class="team ${JB.turn === i ? 'on' : ''}"><input value="${esc(t.n)}" data-i="${i}"><div class="s">${ar(t.s)}</div><div class="pm"><button data-i="${i}" data-d="-100">−</button><button data-i="${i}" data-d="100">+</button></div></div>`).join('')}</div>
  <div class="row" style="margin-top:14px;justify-content:center"><button class="btn plum" id="fin">🏁 التحدي النهائي</button><button class="btn ghost" id="cnt"><bdi dir="ltr">3…2…1 SHOW!</bdi></button></div>
  <div class="card" style="margin-top:16px"><b>أدوار الجولة ${ar(roundN + 1)}:</b> ${ROLES.map((r, i) => `${r}: العضوة رقم ${ar(((i + roundN) % 5) + 1)}`).join(' · ')}</div>`;
  $$('.team input').forEach(i => i.onchange = () => { JB.teams[i.dataset.i].n = i.value; sv(); });
  $$('.pm button').forEach(b => b.onclick = () => { JB.teams[b.dataset.i].s += +b.dataset.d; sv(); vBoard(); });
  $('#rs').onclick = () => { if (confirm('بدء لعبة جديدة ومسح النقاط؟')) { JB = null; localStorage.removeItem(CFG.lab + '-board'); vBoard(); } };
  $('#fs').onclick = () => document.documentElement.requestFullscreen?.();
  $('#cnt').onclick = () => countdown();
  $$('.jt').forEach(b => b.onclick = () => { if (b.classList.contains('used')) return; tile(+b.dataset.c, +b.dataset.r); });
  $('#fin').onclick = () => { const md = h(`<div class="modal"><div class="card"><span class="mode">FINAL CHALLENGE</span><h2 class="h2" style="margin-top:8px">التحدي النهائي</h2><p>كل فريق يقرر سرًا عدد النقاط التي يجازف بها، ثم يحل:</p><div class="fb info" style="font-size:17px">${esc(JEOP.final.q)}</div><div class="row" style="margin-top:10px"><button class="btn" id="sa">إظهار الإجابة</button><button class="btn ghost" id="cl">إغلاق</button></div><div id="ans"></div></div></div>`); document.body.appendChild(md); $('#cl', md).onclick = () => md.remove(); $('#sa', md).onclick = () => $('#ans', md).innerHTML = `<div class="fb ok" style="margin-top:8px">${esc(JEOP.final.a)}</div>`; };
  function tile(c, r) {
    const it = JEOP.q[c][r], pts = (r + 1) * 100 * (it.sp === 'double' ? 2 : 1);
    const md = h(`<div class="modal"><div class="card"><div class="row" style="justify-content:space-between"><span><span class="mode">${it.m}</span> ${it.sp ? `<span class="mode" style="background:var(--org)">${it.sp === 'all' ? 'ALL PLAY: كل الفرق تجيب' : it.sp === 'double' ? 'DOUBLE POINTS ×٢' : 'RISK IT: سهل بنصف النقاط أو التحدي كاملًا'}</span>` : ''}</span><b>${esc(JEOP.cats[c])} · ${ar(pts)}</b></div>
    <p class="mute" style="font-size:14px">${rich(MODES[it.m])}</p><pre class="mono codeblk" style="font-size:18px;white-space:pre-wrap;direction:${/[a-z(=\[]/.test(it.q) && !/[؀-ۿ]{6}/.test(it.q.split('\n')[0]) ? 'ltr' : 'rtl'};text-align:start;font-family:${/[؀-ۿ]/.test(it.q) ? 'Rubik' : ''}">${esc(it.q)}</pre>
    <div class="row"><button class="btn ghost" id="t30">⏱ ٣٠ ثانية</button><button class="btn" id="sa">إظهار الإجابة</button></div><div id="ans"></div>
    <div class="row" style="margin-top:12px">${JB.teams.map((t, i) => `<button class="btn ghost aw" data-i="${i}" style="padding:6px 12px">+${ar(pts)} ${esc(t.n)}</button>`).join('')}<button class="btn plum" id="done">إنهاء</button></div></div></div>`);
    document.body.appendChild(md);
    $('#sa', md).onclick = () => $('#ans', md).innerHTML = `<div class="fb ok" style="margin-top:8px;font-size:18px">✔ ${esc(it.a)}</div>`;
    $('#t30', md).onclick = () => countdown(30);
    $$('.aw', md).forEach(b => b.onclick = () => { JB.teams[b.dataset.i].s += pts; b.disabled = true; sv(); });
    $('#done', md).onclick = () => { JB.used[c + '-' + r] = 1; JB.turn = (JB.turn + 1) % JB.teams.length; sv(); md.remove(); vBoard(); };
  }
}
function countdown(sec) {
  const md = h(`<div class="modal" style="z-index:70"><div class="card" style="text-align:center"><div class="count" id="cn"></div></div></div>`); document.body.appendChild(md);
  let n = sec || 3; const t = () => { $('#cn', md).textContent = n > 0 ? ar(n) : (sec ? '⏰' : 'SHOW!'); beep(n <= 0); if (n-- <= 0) { clearInterval(iv); setTimeout(() => md.remove(), 900); } };
  const iv = setInterval(t, 1000); t(); md.onclick = () => { clearInterval(iv); md.remove(); };
}

/* ---------- البدء ---------- */
try { const th = localStorage.getItem('pylab-theme'); if (th) document.documentElement.dataset.theme = th; } catch (e) {}
if (S.user && !S.user.sid) S.user = null; // دخول قديم باسم مكتوب: تعيد الاختيار من القائمة
if (S.user && !TEACHER) sync(true);
go(TEACHER ? (location.hash === '#students' ? 'students' : 'teach') : S.user ? 'map' : 'login');

/* ---------- صفحة «الطالبات» للمعلمة ---------- */
let TL = null;
async function vStudents() {
  let tok = null; try { tok = sessionStorage.getItem('ttok'); } catch (e) {}
  if (!tok) {
    main().innerHTML = `<div class="card" style="max-width:420px;margin:40px auto;text-align:center"><div style="width:110px;margin:auto">${koda('think')}</div><h1 class="h1">الطالبات</h1><p class="mute">أدخلي رقمكِ السري (نفس رقم صفحة المتاجر)</p><input class="in" id="pin" type="password" inputmode="numeric" style="text-align:center;font-size:22px"><div style="margin-top:12px"><button class="btn plum" id="go">دخول</button></div><p id="pm" class="mute"></p></div>`;
    const goin = async () => { $('#pm').textContent = '…'; try { const r = await rpc('api_t_login', { p_pin: $('#pin').value }); if (r.error) return $('#pm').textContent = r.error; try { sessionStorage.setItem('ttok', r.token); } catch (e) {} vStudents(); } catch (e) { $('#pm').textContent = 'تعذّر الاتصال'; } };
    $('#go').onclick = goin; $('#pin').onkeydown = e => { if (e.key === 'Enter') goin(); }; $('#pin').focus(); return;
  }
  main().innerHTML = '<p class="mute">جارٍ التحميل…</p>';
  let rows;
  try { rows = await rpc('api_t_lab', { p_token: tok, p_lab: LAB, p_slug: SLUG }); }
  catch (e) { try { sessionStorage.removeItem('ttok'); } catch (x) {} return vStudents(); }
  TROWS = rows; TDATA = null;
  const classes = [...new Set(rows.map(r => r.class))];
  TL = TL && classes.includes(TL) ? TL : 'all';
  const core = LESSONS.filter(L => !L.exam && !L.project && !L.extra);
  const fmt = s => s ? new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-arab', { day: 'numeric', month: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(s)) : '';
  const cell = p => { const v = Math.round((p || 0) * 100); return `<td style="text-align:center;background:${v >= 80 ? 'var(--g2)' : v > 0 ? 'var(--yel2)' : 'transparent'};color:${v >= 80 ? 'var(--g)' : 'inherit'};font-weight:${v >= 80 ? 700 : 400}">${v ? ar(v) + '٪' : '–'}</td>`; };
  const paint = () => {
    const list = rows.filter(r => TL === 'all' || r.class === TL);
    const inn = list.filter(r => r.last_at), mast = list.filter(r => r.pct && core.every(L => (r.pct[L.id] || 0) >= MASTER));
    $('#tbl').innerHTML = `<div class="teams" style="margin:0 0 14px"><div class="team"><div class="mute">دخلن المعمل</div><div class="s">${ar(inn.length)} / ${ar(list.length)}</div></div><div class="team"><div class="mute">لم يدخلن</div><div class="s">${ar(list.length - inn.length)}</div></div><div class="team"><div class="mute">أتقنّ الوحدة</div><div class="s">${ar(mast.length)}</div></div><div class="team"><div class="mute">متوسط النقاط</div><div class="s">${ar(inn.length ? Math.round(inn.reduce((x, r) => x + r.score, 0) / inn.length) : 0)}</div></div></div>
    <div style="overflow-x:auto"><table class="skills" style="min-width:900px"><tr><th>الطالبة</th><th>الفصل</th><th>آخر دخول</th><th>مرات</th><th>النقاط</th>${LESSONS.map(L => `<th style="text-align:center;font-size:12px">${lname(L)}</th>`).join('')}</tr>
    ${list.map(r => `<tr style="${r.last_at ? '' : 'opacity:.55'}"><td>${r.last_at ? `<a href="#" onclick="showStu(${r.id});return false" style="color:var(--plum);font-weight:700">${esc(r.name)}</a>` : esc(r.name)}</td><td>${esc(r.class)}</td><td style="font-size:13px">${r.last_at ? fmt(r.last_at) : '<span class="badge wait">لم تدخل</span>'}</td><td>${ar(r.visits || 0)}</td><td><b>${ar(r.score || 0)}</b></td>${LESSONS.map(L => cell(r.pct && r.pct[L.id])).join('')}</tr>`).join('')}</table></div>`;
  };
  main().innerHTML = `<div class="row" style="justify-content:space-between"><h1 class="h1">الطالبات في المعمل 👩‍🎓</h1><div class="row"><select class="in" id="cf" style="width:auto"><option value="all">كل الفصول</option>${classes.map(c => `<option>${esc(c)}</option>`).join('')}</select><button class="btn plum" onclick="hardQ()">📊 أصعب الأسئلة</button><button class="btn ghost" id="rf">↻ تحديث</button><button class="btn ghost" id="ex">⬇ Excel</button></div></div><p class="mute" style="margin-top:0">اضغطي اسم الطالبة لرؤية إجاباتها: آراؤها، وثقتها، والكود، وأخطاؤها. م١…م٦ = نسبة الإتقان (الأخضر = متقنة ٨٠٪ فأكثر).</p><div id="tbl"></div>`;
  $('#cf').value = TL; $('#cf').onchange = e => { TL = e.target.value; paint(); };
  $('#rf').onclick = () => vStudents();
  $('#ex').onclick = () => {
    const head = ['الطالبة', 'الفصل', 'آخر دخول', 'مرات الدخول', 'النقاط', ...LESSONS.map(L => L.title)];
    const list = rows.filter(r => TL === 'all' || r.class === TL);
    const csv = [head, ...list.map(r => [r.name, r.class, r.last_at ? fmt(r.last_at) : 'لم تدخل', r.visits || 0, r.score || 0, ...LESSONS.map(L => Math.round(((r.pct || {})[L.id] || 0) * 100) + '%')])].map(a => a.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv' })); a.download = 'طالبات-معمل-بايثون.csv'; a.click();
  };
  paint();
}
