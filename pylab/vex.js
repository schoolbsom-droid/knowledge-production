// روبوت الواقع الافتراضي داخل المعمل (أوامر بايثون في فيكس كود في آر): بايثون يرسل الأوامر، والمتصفح يحرّك الروبوت ويرسم
'use strict';
const PYVEX = (() => {
  const W = 460, F = 2000, SC = W / F;
  const tx = X => W / 2 + X * SC, ty = Y => W / 2 - Y * SC;
  function make() {
    let cv, x, ov, ox, wrap, host, q = [], st, raf = null, cur = null, t0 = 0, fast = 1, pg = 'grid', marks = [];
    function field() {
      x.fillStyle = '#fff'; x.fillRect(0, 0, W, W);
      const step = pg === 'grid' ? 200 : 100;
      x.lineWidth = 1; x.strokeStyle = pg === 'grid' ? '#C9C9C9' : '#ECECEC';
      for (let m = -1000; m <= 1000; m += step) { x.beginPath(); x.moveTo(tx(m), 0); x.lineTo(tx(m), W); x.moveTo(0, ty(m)); x.lineTo(W, ty(m)); x.stroke(); }
      x.strokeStyle = '#534057'; x.lineWidth = 4; x.strokeRect(2, 2, W - 4, W - 4);
      marks.forEach(m => { x.font = '22px sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(m.t || '⭐', tx(m.x), ty(m.y)); });
    }
    function sprite() {
      if (!ox) return;
      ox.clearRect(0, 0, W, W); if (!st) return;
      ox.save(); ox.translate(tx(st.x), ty(st.y)); ox.rotate(st.h * Math.PI / 180);
      ox.fillStyle = '#222'; [[-17, -13], [11, -13], [-17, 5], [11, 5]].forEach(([a, b]) => { ox.beginPath(); ox.roundRect(a, b, 6, 10, 2); ox.fill(); });
      ox.fillStyle = '#4A4F57'; ox.strokeStyle = '#1E2024'; ox.lineWidth = 1.5; ox.beginPath(); ox.roundRect(-12, -15, 24, 30, 5); ox.fill(); ox.stroke();
      ox.fillStyle = '#F28C28'; ox.beginPath(); ox.roundRect(-12, -19, 24, 7, 3); ox.fill(); ox.stroke();
      ox.fillStyle = '#F28C28'; ox.beginPath(); ox.moveTo(0, -11); ox.lineTo(5, -3); ox.lineTo(-5, -3); ox.closePath(); ox.fill();
      ox.beginPath(); ox.arc(0, 4, 4.5, 0, 7); ox.fillStyle = st.pen ? st.c : '#fff'; ox.fill(); ox.stroke();
      ox.restore();
    }
    function mount(h, playground, opt = {}) {
      pg = playground === 'art' ? 'art' : 'grid'; marks = opt.marks || []; host = h;
      wrap = document.createElement('div'); wrap.className = 'vxwrap'; wrap.style.cssText = 'position:relative;line-height:0;direction:ltr;max-width:100%';
      cv = document.createElement('canvas'); cv.width = W; cv.height = W; cv.style.cssText = 'display:block;max-width:100%;height:auto;background:#fff';
      ov = document.createElement('canvas'); ov.width = W; ov.height = W; ov.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none';
      x = cv.getContext('2d'); ox = ov.getContext('2d');
      const bt = document.createElement('button'); bt.type = 'button'; bt.textContent = '⏩ تسريع'; bt.title = 'تسريع الحركة';
      bt.style.cssText = 'position:absolute;left:6px;top:6px;font:12px Rubik,Tahoma,sans-serif;line-height:1.4;padding:2px 8px;border-radius:999px;border:1px solid #534057;background:#fff;color:#534057;cursor:pointer;opacity:.9';
      bt.onclick = () => { fast = fast === 1 ? 6 : 1; bt.textContent = fast === 1 ? '⏩ تسريع' : '🐢 عادي'; };
      const lb = document.createElement('span'); lb.textContent = pg === 'grid' ? 'شبكة خريطة · Grid Map' : 'الفن قماش · Art Canvas';
      lb.style.cssText = 'position:absolute;right:6px;top:6px;font:11px Rubik,Tahoma,sans-serif;line-height:1.4;padding:2px 8px;border-radius:999px;background:rgba(83,64,87,.85);color:#fff';
      wrap.append(cv, ov, bt, lb); if (h) h.appendChild(wrap);
      q = []; cur = null; cancelAnimationFrame(raf); raf = null; fast = 1;
      st = pg === 'grid' ? { x: -900, y: -900, h: 0, pen: false, c: '#111' } : { x: 0, y: 0, h: 0, pen: false, c: '#111' };
      Object.assign(st, opt.start || {});
      field(); sprite(); return wrap;
    }
    function op(o) { q.push(o); if (!raf) raf = requestAnimationFrame(tick); }
    function tick(ts) {
      raf = null;
      for (let guard = 0; guard < 600; guard++) {
        if (!cur) { cur = q.shift(); if (!cur) { sprite(); return; } t0 = ts; }
        const o = cur, v = Math.max(.2, (o.v || 50) / 50) * fast;
        if (o.k === 'line') {
          const len = Math.hypot(o.x2 - o.x1, o.y2 - o.y1) * SC, dur = Math.max(16, len * 7 / v), p = Math.min(1, (ts - t0) / dur);
          const ex = o.x1 + (o.x2 - o.x1) * p, ey = o.y1 + (o.y2 - o.y1) * p;
          if (o.pen) { x.save(); x.strokeStyle = o.c; x.lineWidth = o.w || 2; x.lineCap = 'round'; x.beginPath(); x.moveTo(tx(o.x1), ty(o.y1)); x.lineTo(tx(ex), ty(ey)); x.stroke(); x.restore(); }
          st.x = ex; st.y = ey; st.h = o.h; st.pen = !!o.pen; st.c = o.c;
          if (p < 1) { sprite(); raf = requestAnimationFrame(tick); return; }
          cur = null; continue;
        }
        if (o.k === 'turn') { const dur = Math.max(16, Math.abs(o.h1 - o.h0) * 2.2 / v), p = Math.min(1, (ts - t0) / dur); st.h = o.h0 + (o.h1 - o.h0) * p; if (p < 1) { sprite(); raf = requestAnimationFrame(tick); return; } cur = null; continue; }
        if (o.k === 'wait') { if (ts - t0 < Math.min(o.ms, 450) / fast) { sprite(); raf = requestAnimationFrame(tick); return; } cur = null; continue; }
        if (o.k === 'state') Object.assign(st, o.s);
        if (o.k === 'clear') field();
        cur = null;
      }
      sprite(); raf = requestAnimationFrame(tick);
    }
    return { mount, op, field, busy: () => !!(cur || q.length), W };
  }
  const main = make();
  let on = false;
  function screen(playground) {
    let h = null;
    if (window.PYTK) { window.PYTK.win(); window.PYTK.title('VEXcode VR · ملعب الروبوت'); h = window.PYTK.cur; }
    main.mount(h, playground); on = true;
  }
  function monitor(rows) {
    rows = typeof rows.toJs === 'function' ? rows.toJs() : rows;
    if (!rows.length || !window.PYTK) return;
    if (!on || !window.PYTK.cur) { window.PYTK.win(); window.PYTK.title('وحدة تحكم المراقبة · Monitor'); }
    const h = window.PYTK.cur; if (!h) return;
    const d = document.createElement('div'); d.style.cssText = 'direction:rtl;font:13px Rubik,Tahoma,sans-serif;line-height:1.6;min-width:230px;background:#fff';
    const e = s => String(s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
    d.innerHTML = '<div style="background:#F28C28;color:#fff;text-align:center;padding:2px 8px">📟 المراقبة: قيم المتغيرات في نهاية التشغيل</div><table style="width:100%;border-collapse:collapse;direction:ltr">' + rows.map(r => `<tr><td style="border:1px solid #ddd;padding:2px 10px;font-family:JetBrains Mono,monospace;color:#333">${e(r[0])}</td><td style="border:1px solid #ddd;padding:2px 10px;font-family:JetBrains Mono,monospace;font-weight:700;color:#333">${e(r[1])}</td></tr>`).join('') + '</table>';
    h.appendChild(d);
  }
  return { screen, monitor, make, reset: () => { on = false; }, op: o => main.op(typeof o.toJs === 'function' ? o.toJs({ dict_converter: Object.fromEntries }) : o) };
})();
window.PYVEX = PYVEX;
// تُستورد أوامر الروبوت تلقائيًا قبل كود الطالبة (كما في فيكس كود في آر: لا حاجة إلى import)
window.LAB_PRELUDE = 'from vex import *\nfrom vex import _lab_finish';

window.VEX_PY = String.raw`
import js, math, re, builtins
from pyodide.ffi import to_js
_J = js.window.PYVEX
_J.reset()
_log = []
_buf = []
def _o(**k): return to_js(k, dict_converter=js.Object.fromEntries)
class _C:
    def __init__(self, n, v=None): self.n = n; self.v = v
    def __repr__(self): return self.n
FORWARD = _C('FORWARD'); REVERSE = _C('REVERSE'); LEFT = _C('LEFT'); RIGHT = _C('RIGHT')
MM = _C('MM'); INCHES = _C('INCHES'); DEGREES = _C('DEGREES'); PERCENT = _C('PERCENT'); SECONDS = _C('SECONDS'); MSEC = _C('MSEC')
UP = _C('UP'); DOWN = _C('DOWN'); X = _C('X'); Y = _C('Y')
BLACK = _C('BLACK', '#111111'); RED = _C('RED', '#E53935'); GREEN = _C('GREEN', '#2E9E3F'); BLUE = _C('BLUE', '#1E63D6')
ORANGE = _C('ORANGE', '#F28C28'); PURPLE = _C('PURPLE', '#8E44AD'); YELLOW = _C('YELLOW', '#E0B400'); CYAN = _C('CYAN', '#00A6B8'); NONE = _C('NONE', None)
EXTRA_THIN = _C('EXTRA_THIN', 1.2); THIN = _C('THIN', 2); MEDIUM = _C('MEDIUM', 3.6); WIDE = _C('WIDE', 5.5); EXTRA_WIDE = _C('EXTRA_WIDE', 8)

def _playground():
    import __main__
    code = getattr(__main__, '_lab_code', '') or ''
    m = re.search(r'#[^\n]*(?:playground|الملعب)[^\n]*', code, re.I)
    if m:
        t = m.group(0).lower()
        if 'art' in t or 'قماش' in t: return 'art'
        if 'grid' in t or 'شبكة' in t or 'خريطة' in t: return 'grid'
    return 'art' if 'pen.' in code else 'grid'

class _Robot:
    def __init__(self):
        self.pg = _playground(); self.on = False
        self.x, self.y = (-900.0, -900.0) if self.pg == 'grid' else (0.0, 0.0)
        self.x0, self.y0 = self.x, self.y
        self.h = 0.0; self.pen = False; self.c = BLACK; self.w = THIN; self.v = 50.0; self.tv = 50.0
    def scr(self):
        if not self.on: _J.screen(self.pg); self.on = True
    def send(self, **k): self.scr(); _J.op(_o(**k))
    def move(self, d):
        r = math.radians(self.h); dx, dy = math.sin(r), math.cos(r); t = abs(d); s = 1 if d >= 0 else -1; hit = False
        for p, dv in ((self.x, dx * s), (self.y, dy * s)):
            if dv > 1e-9: lim = (980 - p) / dv
            elif dv < -1e-9: lim = (-980 - p) / dv
            else: continue
            if lim < t: t = max(0.0, lim); hit = True
        nx, ny = self.x + dx * s * t, self.y + dy * s * t
        self.send(k='line', x1=self.x, y1=self.y, x2=nx, y2=ny, pen=self.pen and self.c.v is not None, c=self.c.v or '#111111', w=self.w.v, h=self.h, v=self.v)
        _log.append(('drive', d, self.pen, self.c.n))
        if self.pen and self.c.v is not None and t > 0: _log.append(('line', round(self.x, 1), round(self.y, 1), round(nx, 1), round(ny, 1), self.c.n, self.w.n))
        if hit: _log.append(('wall',))
        self.x, self.y = nx, ny
    def turn(self, a):
        h0 = self.h; self.h = self.h + a
        self.send(k='turn', h0=h0, h1=self.h, v=self.tv); _log.append(('turn', a))
_R = _Robot()

def _num(v, what):
    if isinstance(v, bool) or not isinstance(v, (int, float)): raise TypeError(what + ' يجب أن تكون رقمًا')
    return float(v)
class _Drivetrain:
    def drive_for(self, direction, distance, units=MM, *a, **k):
        if direction not in (FORWARD, REVERSE): raise ValueError('اتجاه الحركة يكون FORWARD أو REVERSE')
        d = _num(distance, 'المسافة') * (25.4 if units is INCHES else 1)
        _R.move(d if direction is FORWARD else -d)
    def turn_for(self, direction, angle, units=DEGREES, *a, **k):
        if direction not in (LEFT, RIGHT): raise ValueError('اتجاه الانعطاف يكون RIGHT أو LEFT')
        a = _num(angle, 'الزاوية'); _R.turn(a if direction is RIGHT else -a)
    def turn_to_heading(self, angle, units=DEGREES, *a, **k):
        d = (_num(angle, 'الزاوية') - _R.h) % 360
        if d > 180: d -= 360
        _R.turn(d)
    def turn_to_rotation(self, angle, units=DEGREES, *a, **k): _R.turn(_num(angle, 'الزاوية') - _R.h)
    def set_heading(self, angle, units=DEGREES): _R.h = _num(angle, 'الزاوية'); _R.send(k='state', s=_o(h=_R.h))
    set_rotation = set_heading
    def set_drive_velocity(self, v, units=PERCENT): _R.v = max(1.0, min(100.0, _num(v, 'السرعة'))); _log.append(('vel', _R.v))
    def set_turn_velocity(self, v, units=PERCENT): _R.tv = max(1.0, min(100.0, _num(v, 'السرعة')))
    def heading(self, units=DEGREES): return _R.h % 360
    def rotation(self, units=DEGREES): return _R.h
    def velocity(self, units=PERCENT): return _R.v
    def drive(self, direction=FORWARD): raise ValueError('في المعمل استخدمي drive_for وحددي المسافة')
    def turn(self, direction=RIGHT): raise ValueError('في المعمل استخدمي turn_for وحددي الزاوية')
    def stop(self): pass
    def is_done(self): return True
    def is_moving(self): return False
drivetrain = _Drivetrain()

class _Pen:
    def move(self, d):
        if d not in (UP, DOWN): raise ValueError('القلم يتحرك UP أو DOWN')
        _R.pen = d is DOWN; _log.append(('pen', d.n)); _R.send(k='state', s=_o(pen=_R.pen, c=_R.c.v or '#111111'))
    def set_pen_color(self, c):
        if not isinstance(c, _C) or (c.v is not None and not isinstance(c.v, str)): raise ValueError('لون القلم: BLACK أو RED أو GREEN أو BLUE')
        _R.c = c; _log.append(('color', c.n)); _R.send(k='state', s=_o(pen=_R.pen, c=c.v or '#111111'))
    def set_pen_width(self, w):
        if not isinstance(w, _C) or not isinstance(w.v, (int, float)): raise ValueError('عرض القلم: EXTRA_THIN أو THIN أو MEDIUM أو WIDE أو EXTRA_WIDE')
        _R.w = w; _log.append(('width', w.n))
    def fill(self, *a): pass
pen = _Pen()

class _Location:
    def position(self, axis, units=MM): return round(_R.x if axis is X else _R.y, 1)
location = _Location()

def _flush():
    if _buf:
        builtins.print(''.join(_buf)); _buf.clear()
class _Brain:
    def print(self, *a, **k):
        t = ' '.join(str(v) for v in a); _buf.append(t); _log.append(('print', t))
    def new_line(self):
        if _buf: _flush()
        else: builtins.print('')
    def clear(self): _buf.clear()
    def timer_time(self, units=SECONDS): return 0
    def timer_reset(self): pass
    def set_print_color(self, *a): pass
brain = _Brain()
brain.screen = brain

def wait(t=0, units=SECONDS):
    s = _num(t, 'زمن الانتظار') / (1000 if units is MSEC else 1); _log.append(('wait', s))
    if _R.on: _R.send(k='wait', ms=s * 1000)
def vr_thread(fn): fn()
def stop_project(): _flush(); raise SystemExit
def monitor_variable(*a): pass
def monitor_sensor(*a): pass

def _lab_finish(ns):
    _flush()
    rows = []
    for k, v in ns.items():
        if k.startswith('_') or type(v) not in (int, float, bool, str): continue
        if isinstance(v, float): v = round(v, 4)
        rows.append([k, repr(v) if isinstance(v, str) else str(v)])
    if rows: _J.monitor(to_js(rows[:10]))

# أدوات التحقق من حل الطالبة
def _lines(): return [e for e in _log if e[0] == 'line']
def _drives(): return [e[1] for e in _log if e[0] == 'drive']
def _turns(): return [e[1] for e in _log if e[0] == 'turn']
def _n(kind): return sum(1 for e in _log if e[0] == kind)
def _seglen(e): return math.hypot(e[3] - e[1], e[4] - e[2])
def _len(): return sum(_seglen(e) for e in _lines())
def _colors(): return set(e[5] for e in _lines())
def _at(x, y, tol=40): return abs(_R.x - x) <= tol and abs(_R.y - y) <= tol
def _home(tol=40): return _at(_R.x0, _R.y0, tol)
def _printed(): return [e[1] for e in _log if e[0] == 'print']
def _span():
    L = _lines()
    if not L: return (0, 0)
    xs = [v for e in L for v in (e[1], e[3])]; ys = [v for e in L for v in (e[2], e[4])]
    return (round(max(xs) - min(xs)), round(max(ys) - min(ys)))

__all__ = ['FORWARD', 'REVERSE', 'LEFT', 'RIGHT', 'MM', 'INCHES', 'DEGREES', 'PERCENT', 'SECONDS', 'MSEC', 'UP', 'DOWN', 'X', 'Y', 'BLACK', 'RED', 'GREEN', 'BLUE', 'ORANGE', 'PURPLE', 'YELLOW', 'CYAN', 'NONE',
           'EXTRA_THIN', 'THIN', 'MEDIUM', 'WIDE', 'EXTRA_WIDE', 'drivetrain', 'pen', 'location', 'brain', 'wait', 'vr_thread', 'stop_project', 'monitor_variable', 'monitor_sensor']
`;

/* ورشة الروبوت: كل زر لبنة من فيكس كود في آر، يتحرك الروبوت ويُكتب أمر بايثون المقابل */
function roboPad({ a, body, rec, got }) {
  const START = { x: -900, y: -900, h: 0 }, STAR = { x: -300, y: -500 };
  const CAT = { d: '#3D7BD9', p: '#7A5BC7', c: '#F2A33A' };
  const MIS = [
    { g: 'حرّكي الروبوت إلى الأمام 200 mm (مربعًا واحدًا).', ok: s => s.log.some(e => e.k === 'fd' && e.d > 0) },
    { g: 'انعطفي يمينًا 90 درجة، ثم تحركي إلى الأمام.', ok: s => { const L = s.log, n = L.length; return n >= 2 && L[n - 1].k === 'fd' && L[n - 1].d > 0 && L[n - 2].k === 'turn' && L[n - 2].a === 90; } },
    { g: 'أنزلي القلم بالأمر pen.move(DOWN) ثم ارسمي خطًا.', ok: s => s.log.some(e => e.k === 'fd' && e.pen) },
    { g: 'ارسمي مربعًا طول ضلعه 200: أربعة أضلاع وبينها انعطاف 90، حتى تعودي إلى نقطة بداية الرسم.', ok: s => closed(s, 4) },
    { g: 'غيّري لون القلم، ثم ارسمي خطًا بلون غير الأسود.', ok: s => s.log.some(e => e.k === 'fd' && e.pen && e.c !== '#111111') },
    { g: 'خطوة متعرجة واحدة (one step zigzag) والقلم أسفل: أمام، يمين، أمام، يسار.', ok: s => { const L = s.log.slice(-4); return L.length === 4 && L[0].k === 'fd' && L[0].pen && L[0].d > 0 && L[1].k === 'turn' && L[1].a === 90 && L[2].k === 'fd' && L[2].pen && L[2].d > 0 && L[3].k === 'turn' && L[3].a === -90; } },
    { g: 'أوصلي الروبوت إلى مربع النجمة ⭐ على الشبكة.', ok: s => Math.abs(s.x - STAR.x) < 60 && Math.abs(s.y - STAR.y) < 60 },
  ];
  function closed(s, n) {
    const L = s.log; let fds = 0, i = L.length - 1;
    for (; i >= 0 && fds < n; i--) { const e = L[i]; if (e.k === 'fd') { if (!e.pen || e.d <= 0) return false; fds++; } else if (e.k === 'turn') { if (Math.abs(e.a) !== 90) return false; } else return false; }
    if (fds < n) return false; const first = L[i + 1]; return Math.hypot(first.x0 - s.x, first.y0 - s.y) < 2;
  }
  const B = [
    ['d', 'تحرك إلى الأمام 200 mm', 'drivetrain.drive_for(FORWARD, 200, MM)', () => fd(200)],
    ['d', 'تحرك إلى الخلف 200 mm', 'drivetrain.drive_for(REVERSE, 200, MM)', () => fd(-200)],
    ['d', 'إنعطف يمين لمدة 90 درجة', 'drivetrain.turn_for(RIGHT, 90, DEGREES)', () => turn(90)],
    ['d', 'إنعطف يسار لمدة 90 درجة', 'drivetrain.turn_for(LEFT, 90, DEGREES)', () => turn(-90)],
    ['d', 'إنعطف يمين لمدة 45 درجة', 'drivetrain.turn_for(RIGHT, 45, DEGREES)', () => turn(45)],
    ['d', 'اضبط سرعة القيادة إلى 100 %', 'drivetrain.set_drive_velocity(100, PERCENT)', () => { T.v = 100; }],
    ['d', 'اضبط سرعة القيادة إلى 20 %', 'drivetrain.set_drive_velocity(20, PERCENT)', () => { T.v = 20; }],
    ['p', 'نقل القلم أسفل', 'pen.move(DOWN)', () => { T.pen = true; state(); }],
    ['p', 'نقل القلم أعلى', 'pen.move(UP)', () => { T.pen = false; state(); }],
    ['p', 'اضبط القلم على اللون أحمر', 'pen.set_pen_color(RED)', () => { T.c = '#E53935'; state(); }],
    ['p', 'اضبط القلم على اللون أخضر', 'pen.set_pen_color(GREEN)', () => { T.c = '#2E9E3F'; state(); }],
    ['p', 'اضبط القلم على اللون أزرق', 'pen.set_pen_color(BLUE)', () => { T.c = '#1E63D6'; state(); }],
    ['p', 'اضبط القلم على اللون أسود', 'pen.set_pen_color(BLACK)', () => { T.c = '#111111'; state(); }],
  ];
  let T, V = PYVEX.make();
  body.innerHTML = `<div class="tmis" id="tm"></div><div class="row" style="align-items:flex-start;gap:14px"><div id="fld" style="border:2px solid var(--plum);border-radius:8px;overflow:hidden;max-width:100%;width:420px"></div>
  <div style="flex:1;min-width:240px"><div class="mute" style="font-size:13px;margin-bottom:6px">🧱 اللبنات: اضغطي اللبنة فينفّذها الروبوت ويظهر أمر بايثون المقابل.</div><div id="bl" style="display:flex;flex-direction:column;gap:6px;align-items:stretch">${B.map((b, i) => `<button class="vblk" data-i="${i}" style="background:${CAT[b[0]]};color:#fff;border:0;border-radius:10px;padding:7px 12px;font:600 14px Rubik,Tahoma,sans-serif;text-align:start;cursor:pointer;box-shadow:0 2px 0 rgba(0,0,0,.25)">${esc(b[1])}</button>`).join('')}<button class="btn ghost" id="rs">↺ إعادة تعيين المشهد</button></div></div></div>
  <div class="stcode" style="margin-top:10px"><div class="tb">🐍 عارض الكود (Code Viewer): ما كتبتِه باللبنات بلغة بايثون</div><div id="lg" class="out" style="border:0;min-height:60px"></div></div>`;
  const reset = () => { T = { ...START, pen: false, c: '#111111', v: 50, log: [], code: [] }; const f = $('#fld', body); f.innerHTML = ''; V.mount(f, 'grid', { marks: [STAR] }); };
  const state = () => V.op({ k: 'state', s: { pen: T.pen, c: T.c } });
  function fd(d) {
    const r = T.h * Math.PI / 180; let nx = T.x + d * Math.sin(r), ny = T.y + d * Math.cos(r);
    if (Math.abs(nx) > 981 || Math.abs(ny) > 981) { toast('🧱 جدار! لا يستطيع الروبوت الخروج من الملعب.'); T.code.pop(); return false; }
    V.op({ k: 'line', x1: T.x, y1: T.y, x2: nx, y2: ny, pen: T.pen, c: T.c, w: 3.6, h: T.h, v: T.v });
    T.log.push({ k: 'fd', d, pen: T.pen, c: T.c, x0: T.x, y0: T.y }); T.x = nx; T.y = ny;
  }
  function turn(a) { V.op({ k: 'turn', h0: T.h, h1: T.h + a, v: 60 }); T.h += a; T.log.push({ k: 'turn', a }); }
  const paint = () => {
    const k = MIS.findIndex((_, i) => !got('m' + i));
    $('#tm', body).innerHTML = k < 0 ? '<b>🏆 أنجزتِ كل مهمات الروبوت! برمجيه بحرية.</b>' : `<b>المهمة ${ar(k + 1)} من ${ar(MIS.length)}:</b> ${rich(MIS[k].g)}`;
    $('#lg', body).innerHTML = T.code.length ? T.code.map((l, i) => `<div><span style="opacity:.5">${String(i + 1).padStart(2)}  </span>${esc(l)}</div>`).join('') : '<span class="sys">لم تضغطي أي لبنة بعد.</span>';
  };
  $$('.vblk', body).forEach(b => b.onclick = () => {
    const c = B[+b.dataset.i]; T.code.push(c[2]); c[3](); beep(1);
    const k = MIS.findIndex((_, i) => !got('m' + i));
    if (k >= 0 && MIS[k].ok(T)) { rec('m' + k, 5, { tries: 0 }); toast('✔ مهمة منجزة +٥ ⭐'); if (MIS.every((_, i) => got('m' + i))) confetti(); }
    paint();
  });
  $('#rs', body).onclick = () => { reset(); paint(); };
  a.missions = MIS.map(m => ({ goal: m.g }));
  reset(); paint();
}
