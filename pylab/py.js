// محرك بايثون الحقيقي داخل المتصفح (Pyodide) + محاكاة tkinter و pygame + ملفات الكتاب
'use strict';
const PY = (() => {
  let py = null, loading = null, sink = null, tkHost = null;

  // ملفات الكتاب الجاهزة (الدرس السادس)
  const FILES = {
    'file.txt': "Welcome to Python!\nProgramming is great!\nLet's start programming...",
    'cities.txt': 'Riyadh\nJeddah\nAbha\nDammam\n',
    'Riyadh.txt': 'In the ever-growing and flourishing city of\nRiyadh, you will discover the birthplace of\nthe Kingdom of Saudi Arabia, along with its\nhistorical treasures hidden in the old palaces\nthat witnessed the founding of the kingdom. It\nis a destination for tourists from all over the\nglobe who wish to discover a world of shopping,\nentertainment and business. Everyone is happy in\nthe city of Riyadh where the biggest cultural\nevents are always celebrated.',
    'grades.txt': '85\n90\n93\n87\n98',
    'math.txt': '19\n17\n20', 'science.txt': '18\n19\n16', 'social.txt': '19\n18\n19',
  };

  // ---------- tkinter (محاكاة على لوحة HTML) ----------
  const TK = {
    wins: [], cur: null,
    win() {
      if (!tkHost) return 0;
      const w = document.createElement('div'); w.className = 'tkwin';
      w.innerHTML = '<div class="tt"><i></i><i style="background:#eb3"></i><i style="background:#5b5"></i><span>tk</span></div>';
      tkHost.appendChild(w); this.cur = w; this.wins.push(w); return this.wins.length;
    },
    title(t) { if (this.cur) this.cur.querySelector('.tt span').textContent = t; },
    geometry(w, h) { if (this.cur) { this.cur.style.minWidth = Math.min(w, 900) + 'px'; this.cur.dataset.h = h; } },
    canvas(bg, w, h) {
      if (!this.cur) this.win();
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const x = c.getContext('2d'); x.fillStyle = bg || 'white'; x.fillRect(0, 0, w, h);
      c._ctx = x; c._packed = false; this.cur._pending = c; return c;
    },
    pack(c) { if (c && !c._packed && this.cur) { this.cur.appendChild(c); c._packed = true; } },
    color(v, d) { return (v == null || v === '') ? d : String(v); },
    line(c, pts, o) {
      const x = c._ctx; if (pts.length < 4) return; x.save(); x.beginPath();
      x.lineWidth = o.width || 1; x.strokeStyle = this.color(o.fill, 'black');
      if (o.dash) x.setLineDash([o.dash, o.dash]); x.moveTo(pts[0], pts[1]);
      for (let i = 2; i < pts.length; i += 2) x.lineTo(pts[i], pts[i + 1]);
      x.stroke(); x.restore();
    },
    rect(c, p, o) {
      const x = c._ctx; x.save(); const [a, b, d, e] = p;
      if (o.fill) { x.fillStyle = o.fill; x.fillRect(a, b, d - a, e - b); }
      const w = o.width == null ? 1 : o.width; if (w > 0) { x.lineWidth = w; x.strokeStyle = this.color(o.outline, 'black'); x.strokeRect(a, b, d - a, e - b); }
      x.restore();
    },
    oval(c, p, o) {
      const x = c._ctx; x.save(); const [a, b, d, e] = p; x.beginPath();
      x.ellipse((a + d) / 2, (b + e) / 2, Math.abs(d - a) / 2, Math.abs(e - b) / 2, 0, 0, Math.PI * 2);
      if (o.fill) { x.fillStyle = o.fill; x.fill(); }
      const w = o.width == null ? 1 : o.width; if (w > 0) { x.lineWidth = w; x.strokeStyle = this.color(o.outline, 'black'); x.stroke(); }
      x.restore();
    },
    poly(c, p, o) {
      const x = c._ctx; if (p.length < 6) return; x.save(); x.beginPath(); x.moveTo(p[0], p[1]);
      for (let i = 2; i < p.length; i += 2) x.lineTo(p[i], p[i + 1]); x.closePath();
      x.fillStyle = this.color(o.fill, 'black'); x.fill();
      if (o.outline) { x.lineWidth = o.width || 1; x.strokeStyle = o.outline; x.stroke(); } x.restore();
    },
    text(c, X, Y, o) {
      const x = c._ctx; x.save(); x.fillStyle = this.color(o.fill, 'black');
      x.font = (o.size || 14) + 'px Rubik, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(String(o.text ?? ''), X, Y); x.restore();
    },
    bind(c, ev, fn) {
      const map = { '<Button-1>': 'click', '<Double-Button-1>': 'dblclick', '<Enter>': 'mouseenter', '<Leave>': 'mouseleave', '<Motion>': 'mousemove' };
      const pos = e => { const r = c.getBoundingClientRect(); return [Math.round((e.clientX - r.left) * c.width / r.width), Math.round((e.clientY - r.top) * c.height / r.height)]; };
      if (map[ev]) c.addEventListener(map[ev], e => { const [X, Y] = pos(e); call(() => fn(X, Y, '')); });
      else if (ev === '<Key>' || ev === '<Return>' || /^<?[a-zA-Z]>?$/.test(ev)) {
        c.tabIndex = 0;
        c.addEventListener('keydown', e => {
          if (ev === '<Return>' && e.key !== 'Enter') return;
          const k = ev.replace(/[<>]/g, ''); if (k.length === 1 && e.key !== k) return;
          call(() => fn(0, 0, e.key));
        });
      }
    },
    clear(c) { c._ctx.clearRect(0, 0, c.width, c.height); },
  };
  function call(f) { try { f(); } catch (e) { out(String(e.message || e).split('\n').slice(-2).join('\n'), 'err'); } }

  const TK_PY = String.raw`
import js
from pyodide.ffi import create_proxy, to_js
_shapes = []
def _o(**k): return to_js(k, dict_converter=js.Object.fromEntries)
def _a(p): return to_js(p)
_T = js.window.PYTK
def _flat(a):
    r = []
    for v in a:
        if isinstance(v, (list, tuple)): r.extend(_flat(v))
        else: r.append(v)
    return r
END='end'; LEFT='left'; RIGHT='right'; TOP='top'; BOTTOM='bottom'; BOTH='both'; X='x'; Y='y'; CENTER='center'; NW='nw'
class Event:
    def __init__(self, x, y, k): self.x=int(x); self.y=int(y); self.char=str(k); self.keysym=str(k)
class Tk:
    def __init__(self, *a, **k): _T.win()
    def title(self, t=''): _T.title(str(t))
    def geometry(self, g='300x300'):
        try:
            w, h = str(g).split('+')[0].split('x'); _T.geometry(int(w), int(h))
        except Exception: pass
    def mainloop(self): pass
    def bind(self, ev, fn): pass
    def destroy(self): pass
    def resizable(self, *a): pass
    def configure(self, **k): pass
    config = configure
class Canvas:
    def __init__(self, master=None, bg='white', width=300, height=200, **k):
        self.c = _T.canvas(str(k.get('background', bg)), int(width), int(height)); self.width=width; self.height=height
    def pack(self, *a, **k): _T.pack(self.c)
    grid = pack; place = pack
    def _add(self, kind, pts, o):
        _shapes.append((kind, pts, o)); return len(_shapes)
    def create_line(self, *a, width=1, fill='black', dash=None, **k):
        p = [float(v) for v in _flat(a)]
        d = dash if isinstance(dash, (int, float)) else (dash[0] if dash else 0)
        _T.line(self.c, _a(p), _o(width=width, fill=str(fill), dash=d or 0))
        return self._add('line', p, dict(width=width, fill=fill, dash=dash))
    def create_rectangle(self, *a, width=1, outline='black', fill='', **k):
        p = [float(v) for v in _flat(a)]
        _T.rect(self.c, _a(p), _o(width=width, outline=str(outline), fill=str(fill)))
        return self._add('rectangle', p, dict(width=width, outline=outline, fill=fill))
    def create_oval(self, *a, width=1, outline='black', fill='', **k):
        p = [float(v) for v in _flat(a)]
        _T.oval(self.c, _a(p), _o(width=width, outline=str(outline), fill=str(fill)))
        return self._add('oval', p, dict(width=width, outline=outline, fill=fill))
    def create_polygon(self, *a, fill='black', outline='', width=1, **k):
        p = [float(v) for v in _flat(a)]
        _T.poly(self.c, _a(p), _o(width=width, outline=str(outline), fill=str(fill)))
        return self._add('polygon', p, dict(width=width, outline=outline, fill=fill))
    def create_text(self, x, y, text='', fill='black', font=None, **k):
        size = 14
        if isinstance(font, (tuple, list)) and len(font) > 1: size = int(font[1])
        _T.text(self.c, float(x), float(y), _o(text=str(text), fill=str(fill), size=size))
        return self._add('text', [x, y], dict(text=text, fill=fill))
    def bind(self, ev, fn):
        def h(x, y, k): fn(Event(x, y, k))
        _T.bind(self.c, ev, create_proxy(h))
    def focus_set(self): pass
    def delete(self, *a): _T.clear(self.c)
    def configure(self, **k): pass
    config = configure
class _W:
    def __init__(self, master=None, text='', **k): self.text=text
    def pack(self, *a, **k): pass
    grid = pack; place = pack
    def configure(self, **k): pass
    config = configure
Label = Button = Frame = Entry = _W
`;

  const PG_PY = String.raw`
import js, tkinter as _tk
class Rect:
    def __init__(self, x, y, w, h): self.x, self.y, self.w, self.h = x, y, w, h
class _Surf:
    def __init__(self, w, h):
        _tk._T.win(); _tk._T.title('pygame window'); self.cv = _tk.Canvas(bg='black', width=w, height=h); self.cv.pack()
    def fill(self, col): self.cv.create_rectangle(0, 0, self.cv.width, self.cv.height, width=0, fill=_c(col))
    def blit(self, img, pos): print('ملاحظة: الصور لا تُحمَّل في المعمل، جرّبيها في PyCharm')
def _c(col):
    if isinstance(col, (tuple, list)): return 'rgb(%d,%d,%d)' % tuple(col[:3])
    return str(col)
class _Display:
    def set_mode(self, size, *a): return _Surf(int(size[0]), int(size[1]))
    def update(self, *a): pass
    flip = update
    def set_caption(self, t): _tk._T.title(str(t))
class _Draw:
    def rect(self, s, col, r, width=0):
        if isinstance(r, (tuple, list)): r = Rect(*r)
        if width: s.cv.create_rectangle(r.x, r.y, r.x + r.w, r.y + r.h, width=width, outline=_c(col))
        else: s.cv.create_rectangle(r.x, r.y, r.x + r.w, r.y + r.h, width=0, fill=_c(col))
    def lines(self, s, col, closed, pts, width=1):
        p = list(pts) + ([pts[0]] if closed else [])
        s.cv.create_line(*[v for pt in p for v in pt], width=width, fill=_c(col))
    def line(self, s, col, a, b, width=1): s.cv.create_line(a[0], a[1], b[0], b[1], width=width, fill=_c(col))
    def circle(self, s, col, c, r, width=0):
        if width: s.cv.create_oval(c[0]-r, c[1]-r, c[0]+r, c[1]+r, width=width, outline=_c(col))
        else: s.cv.create_oval(c[0]-r, c[1]-r, c[0]+r, c[1]+r, width=0, fill=_c(col))
class _Img:
    def load(self, f):
        raise FileNotFoundError('الصورة ' + str(f) + ' غير موجودة في المعمل؛ جرّبي هذا الجزء في PyCharm')
display = _Display(); draw = _Draw(); image = _Img()
def init(): return (6, 0)
def quit(): pass
`;

  const BOOT_PY = String.raw`
import sys, io, traceback, builtins, time, js
sys.path.insert(0, '/labmods')
time.sleep = lambda s=0: None
def _lab_input(p=''):
    v = js.window.prompt(str(p) or 'أدخلي قيمة:')
    v = '' if v is None else str(v)
    js.window.PYECHO(str(p), v)
    return v
builtins.input = _lab_input
_lab_ns = {}
class _Limit(Exception): pass
def _lab_exec(code):
    global _lab_ns
    import tkinter
    tkinter._shapes.clear()
    sys.modules.pop('turtle', None)
    sys.modules.pop('vex', None)
    _lab_ns = {'__name__': '__main__'}
    pre = getattr(js.window, 'LAB_PRELUDE', None)
    if pre: exec(str(pre), _lab_ns)
    n = [0]
    def tr(frame, ev, arg):
        if frame.f_code.co_filename == '<الكود>':
            n[0] += 1
            if n[0] > 300000: raise _Limit('توقف البرنامج: يبدو أن هناك تكرارًا لا ينتهي')
        return tr
    sys.settrace(tr)
    try:
        exec(compile(code, '<الكود>', 'exec'), _lab_ns)
        return ''
    except SystemExit:
        return ''
    except BaseException as e:
        tb = traceback.extract_tb(e.__traceback__)
        ln = ''
        for f in tb:
            if f.filename == '<الكود>': ln = f.lineno
        if isinstance(e, SyntaxError): ln = e.lineno
        msg = type(e).__name__ + ': ' + str(e)
        return (str(ln) if ln else '?') + '|' + type(e).__name__ + '|' + msg
    finally:
        sys.settrace(None)
        fin = _lab_ns.pop('_lab_finish', None)
        if fin:
            try: fin(_lab_ns)
            except BaseException: pass
def _lab_check(expr):
    ns = dict(_lab_ns); ns['_lab_code'] = _lab_code
    try: return bool(eval(expr, ns))
    except Exception: return False
`;

  function out(t, cls) {
    if (!sink) return;
    const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = t + (cls === 'sys' ? '\n' : '');
    sink.appendChild(s); sink.scrollTop = sink.scrollHeight;
  }
  window.PYTK = TK;
  window.PYECHO = (p, v) => out(p + v + '\n', 'in');

  function writeFiles(force) {
    for (const [n, t] of Object.entries(FILES)) {
      if (force || !py.FS.analyzePath('/home/pyodide/' + n).exists) py.FS.writeFile('/home/pyodide/' + n, t);
    }
  }

  async function load(onState) {
    if (py) return py;
    if (loading) return loading;
    loading = (async () => {
      onState && onState('جارٍ تشغيل بايثون… (أول مرة فقط، قد تستغرق نصف دقيقة)');
      if (!window.loadPyodide) await new Promise((ok, no) => {
        const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/pyodide/v0.28.3/full/pyodide.js';
        s.onload = ok; s.onerror = () => no(new Error('تعذّر تحميل بايثون، تأكدي من الاتصال بالإنترنت')); document.head.appendChild(s);
      });
      const p = await loadPyodide();
      p.setStdout({ batched: t => out(t + '\n') });
      p.setStderr({ batched: t => out(t + '\n', 'err') });
      p.FS.mkdirTree('/labmods');
      p.FS.writeFile('/labmods/tkinter.py', TK_PY);
      p.FS.writeFile('/labmods/pygame.py', PG_PY);
      if (window.TURTLE_PY) p.FS.writeFile('/labmods/turtle.py', TURTLE_PY);
      if (window.VEX_PY) p.FS.writeFile('/labmods/vex.py', VEX_PY);
      p.FS.chdir('/home/pyodide');
      py = p; writeFiles(true);
      p.runPython(BOOT_PY);
      onState && onState('');
      return p;
    })();
    try { return await loading; } catch (e) { loading = null; throw e; }
  }

  // يحوّل رسالة الخطأ إلى تلميح عربي مفهوم
  function explain(type, msg) {
    const m = msg || '';
    if (type === 'SyntaxError') {
      if (/never closed|was not closed|EOF/.test(m)) return 'يوجد قوس أو علامة تنصيص فُتحت ولم تُغلق.';
      if (/expected ':'/.test(m)) return 'نسيتِ النقطتين « : » في نهاية سطر for أو if أو while أو def.';
      if (/invalid character/.test(m)) return 'يوجد حرف غير مقبول، ربما فاصلة أو علامة تنصيص عربية «،» أو «”». اكتبي الرموز بلوحة المفاتيح الإنجليزية.';
      return 'خطأ في طريقة كتابة الأمر (الصياغة). راجعي الأقواس والفواصل وعلامات التنصيص.';
    }
    if (type === 'IndentationError') return 'مشكلة في المسافة البادئة: الأسطر داخل for أو if تُزاح بأربع مسافات، والأسطر خارجها لا تُزاح.';
    if (type === 'NameError') { const n = (m.match(/'(.+?)'/) || [])[1]; return `بايثون لا تعرف الاسم «${n || ''}». هل كتبتِه بنفس الحروف الكبيرة والصغيرة؟ هل عرّفتِه قبل استخدامه؟`; }
    if (type === 'IndexError') return 'رقم الفهرس خارج القائمة. تذكري: الفهرسة تبدأ من 0، وآخر عنصر فهرسه len-1 أو -1.';
    if (type === 'KeyError') return 'المفتاح غير موجود في القاموس. استخدمي get() إن لم تكوني متأكدة من وجوده.';
    if (type === 'TypeError' && /tuple.*assignment/.test(m)) return 'الصف tuple غير قابل للتعديل 🔒 لا يمكن تغيير عناصره بعد إنشائه.';
    if (type === 'TypeError' && /not supported between|unsupported operand|can only concatenate/.test(m)) return 'تحاولين الجمع أو المقارنة بين نوعين مختلفين (نص ورقم). استخدمي int() أو str() للتحويل.';
    if (type === 'TypeError') return 'نوع البيانات غير مناسب لهذا الأمر. راجعي ما تمرّرينه بين القوسين.';
    if (type === 'ValueError') return 'القيمة غير مناسبة، مثل تحويل نص لا يحتوي رقمًا إلى int، أو حذف عنصر غير موجود بـ remove().';
    if (type === 'FileNotFoundError') return 'الملف غير موجود. افتحيه بالوضع "w" أو "a" لإنشائه، أو تأكدي من اسم الملف.';
    if (type === 'AttributeError') return 'هذه الدالة أو الخاصية غير موجودة لهذا النوع. راجعي اسمها بعد النقطة.';
    if (type === 'ZeroDivisionError') return 'لا يمكن القسمة على صفر.';
    if (type === '_Limit') return 'البرنامج لم يتوقف. في حلقة while تأكدي أن الشرط يتغير، مثل قراءة السطر التالي داخل الحلقة.';
    if (type === 'ModuleNotFoundError') return 'هذه المكتبة غير متوفرة في المعمل.';
    return '';
  }

  async function run(code, outEl, tkEl, onState) {
    sink = outEl; tkHost = tkEl; outEl.innerHTML = ''; if (tkEl) tkEl.innerHTML = ''; TK.cur = null;
    let p;
    try { p = await load(onState); } catch (e) { out(e.message, 'err'); return { ok: false, err: e.message, out: '' }; }
    outEl.innerHTML = '';
    p.globals.set('_lab_code', code);
    const r = p.runPython('_lab_exec(_lab_code)');
    const text = outEl.textContent;
    if (r) {
      const [ln, type, ...rest] = r.split('|'); const msg = rest.join('|');
      out((ln !== '?' ? `السطر ${ln}: ` : '') + msg, 'err');
      return { ok: false, type, msg, line: ln, hint: explain(type, msg), out: text };
    }
    if (!text.trim() && !(tkEl && tkEl.children.length)) out('(تم التشغيل بلا مخرجات)', 'sys');
    return { ok: true, out: text };
  }
  function check(expr) { return py ? py.runPython('_lab_check(' + JSON.stringify(expr) + ')') : false; }
  function files() {
    if (!py) return Object.keys(FILES).map(n => [n, FILES[n]]);
    return py.FS.readdir('/home/pyodide').filter(n => !n.startsWith('.')).filter(n => py.FS.isFile(py.FS.stat('/home/pyodide/' + n).mode)).map(n => [n, py.FS.readFile('/home/pyodide/' + n, { encoding: 'utf8' })]);
  }
  function resetFiles() { if (py) { for (const [n] of files()) py.FS.unlink('/home/pyodide/' + n); writeFiles(true); } }
  return { load, run, check, files, resetFiles, ready: () => !!py };
})();
