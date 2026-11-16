// نموذج السلحفاة turtle داخل المعمل: بايثون يرسل الأوامر، والمتصفح يرسمها متحركة
'use strict';
const PYTURT = (() => {
  let cv, x, ov, ox, W = 500, H = 440, q = [], st, raf = null, speed = 1;
  const tx = X => W / 2 + X, ty = Y => H / 2 - Y;
  function screen(host, title) {
    const w = PYTK.win(); PYTK.title(title || 'Python Turtle Graphics');
    const wrap = document.createElement('div'); wrap.style.cssText = 'position:relative;line-height:0';
    cv = document.createElement('canvas'); cv.width = W; cv.height = H; ov = document.createElement('canvas'); ov.width = W; ov.height = H;
    ov.style.cssText = 'position:absolute;inset:0;pointer-events:none';
    x = cv.getContext('2d'); ox = ov.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
    wrap.append(cv, ov); PYTK.cur.appendChild(wrap);
    q = []; st = { x: 0, y: 0, h: 0, shape: 'classic', size: 1, color: 'black', vis: true }; cancelAnimationFrame(raf); raf = null; sprite();
  }
  function sprite() {
    ox.clearRect(0, 0, W, H); if (!st.vis) return;
    ox.save(); ox.translate(tx(st.x), ty(st.y)); ox.rotate(-st.h * Math.PI / 180); const s = st.size;
    ox.fillStyle = st.color; ox.strokeStyle = '#222'; ox.lineWidth = 1;
    if (st.shape === 'turtle') {
      ox.fillStyle = '#5BAA5B'; [[-6, -9], [-6, 9], [7, -8], [7, 8]].forEach(([a, b]) => { ox.beginPath(); ox.ellipse(a * s, b * s, 4 * s, 3 * s, 0, 0, 7); ox.fill(); });
      ox.beginPath(); ox.ellipse(13 * s, 0, 5 * s, 4 * s, 0, 0, 7); ox.fill();
      ox.fillStyle = st.color; ox.beginPath(); ox.ellipse(0, 0, 11 * s, 9 * s, 0, 0, 7); ox.fill(); ox.stroke();
      ox.strokeStyle = 'rgba(0,0,0,.35)'; ox.beginPath(); ox.moveTo(-6 * s, 0); ox.lineTo(6 * s, 0); ox.moveTo(0, -6 * s); ox.lineTo(0, 6 * s); ox.stroke();
    } else if (st.shape === 'circle') { ox.beginPath(); ox.arc(0, 0, 8 * s, 0, 7); ox.fill(); ox.stroke(); }
    else if (st.shape === 'square') { ox.fillRect(-8 * s, -8 * s, 16 * s, 16 * s); ox.strokeRect(-8 * s, -8 * s, 16 * s, 16 * s); }
    else if (st.shape === 'triangle') { ox.beginPath(); ox.moveTo(10 * s, 0); ox.lineTo(-7 * s, 9 * s); ox.lineTo(-7 * s, -9 * s); ox.closePath(); ox.fill(); ox.stroke(); }
    else { ox.beginPath(); ox.moveTo(9 * s, 0); ox.lineTo(-7 * s, 6 * s); ox.lineTo(-3 * s, 0); ox.lineTo(-7 * s, -6 * s); ox.closePath(); ox.fill(); ox.stroke(); }
    ox.restore();
  }
  function op(o) { q.push(o); if (!raf) raf = requestAnimationFrame(tick); }
  let cur = null, t0 = 0;
  function tick(ts) {
    raf = null;
    for (let guard = 0; guard < 400; guard++) {
      if (!cur) { cur = q.shift(); if (!cur) { sprite(); return; } t0 = ts; }
      const o = cur;
      if (o.k === 'line') {
        const len = Math.hypot(o.x2 - o.x1, o.y2 - o.y1), dur = Math.max(16, len * 3.2 / speed), p = Math.min(1, (ts - t0) / dur);
        const ex = o.x1 + (o.x2 - o.x1) * p, ey = o.y1 + (o.y2 - o.y1) * p;
        if (o.pen) { x.save(); x.strokeStyle = o.c; x.lineWidth = Math.max(1.6, o.w); x.lineCap = 'round'; x.beginPath(); x.moveTo(tx(o.x1), ty(o.y1)); x.lineTo(tx(ex), ty(ey)); x.stroke(); x.restore(); }
        o.px = ex; o.py = ey; st.x = ex; st.y = ey; st.h = o.h;
        if (p < 1) { sprite(); raf = requestAnimationFrame(tick); return; }
        cur = null; continue;
      }
      if (o.k === 'turn') { const dur = 120 / speed, p = Math.min(1, (ts - t0) / dur); st.h = o.h0 + (o.h1 - o.h0) * p; if (p < 1) { sprite(); raf = requestAnimationFrame(tick); return; } cur = null; continue; }
      if (o.k === 'fill') { x.save(); x.fillStyle = o.c; x.beginPath(); o.p.forEach(([a, b], i) => i ? x.lineTo(tx(a), ty(b)) : x.moveTo(tx(a), ty(b))); x.closePath(); x.fill(); x.restore(); }
      if (o.k === 'text') { x.save(); x.fillStyle = o.c; x.font = `${o.s}px Rubik, Tahoma, sans-serif`; x.textAlign = o.a === 'center' ? 'center' : o.a === 'right' ? 'right' : 'left'; x.direction = 'rtl'; x.fillText(o.t, tx(o.x), ty(o.y)); x.restore(); }
      if (o.k === 'state') Object.assign(st, o.s);
      if (o.k === 'clear') { x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); }
      if (o.k === 'bg') { x.fillStyle = o.c; x.fillRect(0, 0, W, H); }
      cur = null;
    }
    sprite(); raf = requestAnimationFrame(tick);
  }
  return { screen, op: o => op(typeof o.toJs === 'function' ? o.toJs({ dict_converter: Object.fromEntries }) : o), speed: v => speed = v, W: () => W, H: () => H };
})();
window.PYTURT = PYTURT;

window.TURTLE_PY = String.raw`
import js, math
from pyodide.ffi import to_js
_J = js.window.PYTURT
_log = []
_screen = [False]
def _o(**k): return to_js(k, dict_converter=js.Object.fromEntries)
def _scr():
    if not _screen[0]:
        _J.screen(None, 'Python Turtle Graphics'); _screen[0] = True
def _send(**k):
    _scr(); _J.op(_o(**k))
def _col(c):
    if isinstance(c, (tuple, list)):
        if all(isinstance(v, float) and v <= 1 for v in c[:3]): c = [int(v * 255) for v in c[:3]]
        return 'rgb(%d,%d,%d)' % tuple(c[:3])
    return str(c)
class Turtle:
    def __init__(self, *a, **k):
        _scr(); self._x = 0.0; self._y = 0.0; self._h = 0.0; self._pen = True; self._pc = 'black'; self._fc = 'black'
        self._w = 1; self._shape = 'classic'; self._size = 1; self._vis = True; self._fill = None
        self._state()
    def _state(self): _send(k='state', s=_o(x=self._x, y=self._y, h=self._h, shape=self._shape, size=self._size, color=self._fc, vis=self._vis))
    def _go(self, nx, ny):
        _send(k='line', x1=self._x, y1=self._y, x2=nx, y2=ny, pen=self._pen, c=self._pc, w=self._w, h=self._h)
        if self._pen: _log.append(('line', round(self._x, 1), round(self._y, 1), round(nx, 1), round(ny, 1), self._pc))
        self._x, self._y = nx, ny
        if self._fill is not None: self._fill.append((nx, ny))
    def forward(self, d):
        r = math.radians(self._h); self._go(self._x + d * math.cos(r), self._y + d * math.sin(r))
    fd = forward
    def backward(self, d): self.forward(-d)
    bk = back = backward
    def _turn(self, a):
        h0 = self._h; self._h = (self._h + a); _send(k='turn', h0=h0, h1=self._h); _log.append(('turn', a))
    def left(self, a): self._turn(a)
    lt = left
    def right(self, a): self._turn(-a)
    rt = right
    def setheading(self, a): self._turn(a - self._h)
    seth = setheading
    def goto(self, x, y=None):
        if y is None: x, y = x
        self._go(float(x), float(y))
    setpos = setposition = goto
    def setx(self, x): self.goto(x, self._y)
    def sety(self, y): self.goto(self._x, y)
    def home(self): self.goto(0, 0); self.setheading(0)
    def penup(self): self._pen = False
    pu = up = penup
    def pendown(self): self._pen = True
    pd = down = pendown
    def isdown(self): return self._pen
    def pensize(self, w=None):
        if w is None: return self._w
        self._w = w
    width = pensize
    def pencolor(self, *c):
        if not c: return self._pc
        self._pc = _col(c[0] if len(c) == 1 else c)
    def fillcolor(self, *c):
        if not c: return self._fc
        self._fc = _col(c[0] if len(c) == 1 else c); self._state()
    def color(self, *c):
        if not c: return (self._pc, self._fc)
        if len(c) == 2: self._pc, self._fc = _col(c[0]), _col(c[1])
        elif len(c) == 3: self._pc = self._fc = _col(c)
        else: self._pc = self._fc = _col(c[0])
        self._state()
    def begin_fill(self): self._fill = [(self._x, self._y)]
    def end_fill(self):
        if self._fill and len(self._fill) > 2:
            _send(k='fill', p=to_js([list(p) for p in self._fill]), c=self._fc); _log.append(('fill', self._fc))
        self._fill = None
    def circle(self, r, extent=360, steps=None):
        n = steps or max(12, int(abs(r) * abs(extent) / 360 / 3) + 12)
        a = extent / n; step = 2 * abs(r) * math.sin(math.radians(abs(a) / 2))
        sgn = 1 if r >= 0 else -1
        self._h += a / 2 * sgn
        for i in range(n):
            rr = math.radians(self._h); self._go(self._x + step * math.cos(rr), self._y + step * math.sin(rr)); self._h += a * sgn
        self._h -= a / 2 * sgn
        _send(k='state', s=_o(h=self._h)); _log.append(('circle', r, extent))
    def dot(self, size=5, *c):
        col = _col(c[0]) if c else self._pc
        pts = [[self._x + size / 2 * math.cos(t / 10 * math.pi), self._y + size / 2 * math.sin(t / 10 * math.pi)] for t in range(20)]
        _send(k='fill', p=to_js(pts), c=col); _log.append(('dot', size))
    def write(self, arg, move=False, align='left', font=('Arial', 8, 'normal')):
        size = 14
        for f in (font if isinstance(font, (tuple, list)) else []):
            if isinstance(f, (int, float)): size = int(f) + 6
        _send(k='text', x=self._x, y=self._y, t=str(arg), c=self._pc, a=align, s=size); _log.append(('write', str(arg)))
    def shape(self, s=None):
        if s is None: return self._shape
        self._shape = str(s); self._state()
    def shapesize(self, a=None, b=None, outline=None):
        if a is None: return (self._size, self._size, 1)
        self._size = float(a); self._state()
    turtlesize = shapesize
    def hideturtle(self): self._vis = False; self._state()
    ht = hideturtle
    def showturtle(self): self._vis = True; self._state()
    st = showturtle
    def isvisible(self): return self._vis
    def speed(self, s=None):
        if s is not None: _J.speed(1 if s == 0 else max(0.4, min(4, s / 3)))
    def position(self): return (round(self._x, 2), round(self._y, 2))
    pos = position
    def xcor(self): return round(self._x, 2)
    def ycor(self): return round(self._y, 2)
    def heading(self): return self._h % 360
    def reset(self): _send(k='clear'); self.__init__()
    def clear(self): _send(k='clear')
    def stamp(self): pass
Pen = RawTurtle = Turtle
class _Screen:
    def bgcolor(self, c=None):
        if c: _send(k='bg', c=_col(c))
    def title(self, t): js.window.PYTK.title(str(t))
    def setup(self, *a, **k): pass
    def exitonclick(self): pass
    def mainloop(self): pass
    def tracer(self, *a): pass
    def update(self): pass
    def screensize(self, *a, **k): pass
def Screen(): return _Screen()
_dt = [None]
def _d():
    if _dt[0] is None: _dt[0] = Turtle()
    return _dt[0]
for _n in ['forward','fd','backward','bk','back','left','lt','right','rt','setheading','seth','goto','setpos','setposition','setx','sety','home','penup','pu','up','pendown','pd','down','pensize','width','pencolor','fillcolor','color','begin_fill','end_fill','circle','dot','write','shape','shapesize','hideturtle','ht','showturtle','st','speed','position','pos','xcor','ycor','heading','reset','clear']:
    globals()[_n] = (lambda n: lambda *a, **k: getattr(_d(), n)(*a, **k))(_n)
def bgcolor(c): Screen().bgcolor(c)
def done(): pass
mainloop = exitonclick = done
def title(t): Screen().title(t)
`;
