// مكتبة أوبين بيكسل (openpyxl) داخل المعمل + ملف التغذية من الكتاب + عارض الجدول بعد كل تشغيل
'use strict';
window.OPENPYXL_PY = String.raw`
import copy, re
__version__ = '3.1-lab'
_AR = [
    ['مكونات', 'الماء جرام', 'الطاقة سعر حراري', 'البروتين جرام', 'الدهون جرام', 'الكربوهيدرات جرام', 'الكالسيوم (Ca) مليجرام', 'الفوسفور (P) مليجرام', 'الحديد (Fe) مليجرام', 'الصوديوم (Na) مليجرام', 'البوتاسيوم (K) مليجرام'],
    ['الحليب', 88.1, 61, 3.27, 3.25, 4.63, 123, 101, 0, 38, 150],
    ['البيض', 75.8, 143, 12.4, 8.65, 0.96, 48, 184, 1.67, 129, 132],
    ['الدجاج', 69.9, 149, 23.9, 5.23, 0, 12, 184, 0.94, 117, 239],
    ['برجر بالجبن', 48, 261, 11.9, 13.9, 23.9, 239, 201, 2.46, 508, 211],
    ['التفاح', 83.6, 65, 0.15, 0.16, 15.6, 6, 10, 0.02, 1, 104],
    ['الكعك', 8.85, 430, 5.79, 13.7, 69.6, 29, 111, 2.28, 314, 245],
    ['مثلجات بالشوكولاتة', 55.7, 216, 3.8, 11, 28.2, 109, 107, 0.93, 76, 249],
    ['حليب بالشوكولاتة', 1.5, 535, 7.65, 29.7, 59.4, 189, 208, 2.35, 79, 372],
    ['الخس', 94.7, 20, 1.24, 0.26, 3.24, 35, 30, 0.95, 0, 253],
    ['الموز', 74.9, 89, 1.09, 0.33, 22.8, 5, 22, 0.26, 1, 358],
]
_EN_NAMES = ['Ingredient', 'Milk', 'Egg', 'Chicken', 'Cheeseburger', 'Apple', 'Cake', 'Chocolate ice cream', 'Milk chocolate', 'Lettuce', 'Banana']
_EN_HEAD = ['Ingredient', 'Water g', 'Energy kCal', 'Protein g', 'Fat g', 'Carbohydrate g', 'Calcium (Ca) mg', 'Phosphorus (P) mg', 'Iron (Fe) mg', 'Sodium (Na) mg', 'Potassium (K) mg']

def _col_letter(n):
    s = ''
    while n:
        n, r = divmod(n - 1, 26); s = chr(65 + r) + s
    return s
def _col_index(s):
    n = 0
    for ch in s.upper(): n = n * 26 + ord(ch) - 64
    return n
def _split(coord):
    m = re.fullmatch(r'([A-Za-z]+)(\d+)', str(coord).strip())
    if not m: raise ValueError('موقع الخلية غير صحيح: ' + str(coord))
    return int(m.group(2)), _col_index(m.group(1))

class Cell:
    def __init__(self, ws, row, column): self.parent = ws; self.row = row; self.column = column
    @property
    def value(self): return self.parent._d.get((self.row, self.column))
    @value.setter
    def value(self, v):
        if v is None: self.parent._d.pop((self.row, self.column), None)
        else: self.parent._d[(self.row, self.column)] = v
    @property
    def coordinate(self): return _col_letter(self.column) + str(self.row)
    @property
    def column_letter(self): return _col_letter(self.column)
    def __repr__(self): return "<Cell '%s'.%s>" % (self.parent.title, self.coordinate)
Cell.__module__ = 'openpyxl.cell.cell'

class Worksheet:
    def __init__(self, title, data=None): self.title = title; self._d = dict(data or {})
    def __repr__(self): return '<Worksheet "%s">' % self.title
    @property
    def max_row(self): return max([r for r, c in self._d] or [1])
    @property
    def max_column(self): return max([c for r, c in self._d] or [1])
    @property
    def min_row(self): return min([r for r, c in self._d] or [1])
    @property
    def min_column(self): return min([c for r, c in self._d] or [1])
    def cell(self, row=None, column=None, value=None):
        if row is None or column is None: raise TypeError('cell() تحتاج row و column')
        if row < 1 or column < 1: raise ValueError('أرقام الصفوف والأعمدة تبدأ من 1')
        c = Cell(self, row, column)
        if value is not None: c.value = value
        return c
    def __getitem__(self, key):
        if isinstance(key, slice):
            r1, c1 = _split(key.start); r2, c2 = _split(key.stop)
            return tuple(tuple(Cell(self, r, c) for c in range(c1, c2 + 1)) for r in range(r1, r2 + 1))
        k = str(key)
        if ':' in k: a, b = k.split(':'); return self[slice(a, b)]
        if k.isalpha(): c = _col_index(k); return tuple(Cell(self, r, c) for r in range(1, self.max_row + 1))
        if k.isdigit(): r = int(k); return tuple(Cell(self, r, c) for c in range(1, self.max_column + 1))
        r, c = _split(k); return Cell(self, r, c)
    def __setitem__(self, key, v): r, c = _split(key); Cell(self, r, c).value = v
    def iter_rows(self, min_row=None, max_row=None, min_col=None, max_col=None, values_only=False):
        r1 = min_row or 1; r2 = max_row or self.max_row; c1 = min_col or 1; c2 = max_col or self.max_column
        for r in range(r1, r2 + 1):
            row = tuple(Cell(self, r, c) for c in range(c1, c2 + 1))
            yield tuple(x.value for x in row) if values_only else row
    def iter_cols(self, min_col=None, max_col=None, min_row=None, max_row=None, values_only=False):
        r1 = min_row or 1; r2 = max_row or self.max_row; c1 = min_col or 1; c2 = max_col or self.max_column
        for c in range(c1, c2 + 1):
            col = tuple(Cell(self, r, c) for r in range(r1, r2 + 1))
            yield tuple(x.value for x in col) if values_only else col
    @property
    def rows(self): return self.iter_rows()
    @property
    def columns(self): return self.iter_cols()
    @property
    def values(self): return self.iter_rows(values_only=True)
    def append(self, values):
        r = (self.max_row + 1) if self._d else 1
        for i, v in enumerate(values): self.cell(row=r, column=i + 1).value = v

class Workbook:
    def __init__(self): self._ws = [Worksheet('Sheet')]; self.active_index = 0
    @property
    def sheetnames(self): return [w.title for w in self._ws]
    @property
    def worksheets(self): return list(self._ws)
    @property
    def active(self): return self._ws[self.active_index]
    def __getitem__(self, name):
        for w in self._ws:
            if w.title == name: return w
        raise KeyError('Worksheet ' + str(name) + ' does not exist.')
    def __contains__(self, name): return name in self.sheetnames
    def create_sheet(self, title=None, index=None):
        w = Worksheet(title or 'Sheet%d' % len(self._ws))
        if index is None: self._ws.append(w)
        else: self._ws.insert(index, w)
        return w
    def remove(self, ws): self._ws.remove(ws)
    def save(self, filename):
        _STORE[str(filename)] = [(w.title, dict(w._d)) for w in self._ws]
    def close(self): pass

def _sheet(title, rows, head1):
    d = {}
    d[(1, 2)] = head1
    for i, row in enumerate(rows):
        for j, v in enumerate(row): d[(i + 2, j + 1)] = v
    return title, d
def _fresh():
    en = [list(r) for r in _AR]
    en[0] = list(_EN_HEAD)
    for i in range(1, len(en)): en[i][0] = _EN_NAMES[i]
    return {'nutrition.xlsx': [_sheet('english', en, '100 g'), _sheet('arabic', _AR, '100 جرام')]}
_STORE = _fresh()
def _reset(): _STORE.clear(); _STORE.update(_fresh())

def load_workbook(filename=None, *a, **k):
    if filename is None: filename = k.get('path')
    name = str(filename).replace('\\', '/').split('/')[-1]
    if name not in _STORE: raise FileNotFoundError("[Errno 2] No such file or directory: '%s'" % filename)
    wb = Workbook(); wb._ws = [Worksheet(t, copy.deepcopy(d)) for t, d in _STORE[name]]
    return wb

def _dump(name='nutrition.xlsx', title='arabic'):
    import json
    if name not in _STORE: return 'null'
    for t, d in _STORE[name]:
        if t == title:
            R = max([r for r, c in d] or [1]); C = max([c for r, c in d] or [1])
            return json.dumps({'R': R, 'C': C, 'cells': [[d.get((r, c)) for c in range(1, C + 1)] for r in range(1, R + 1)], 'sheets': [x[0] for x in _STORE[name]]}, ensure_ascii=False)
    return 'null'
`;

/* عارض ملف nutrition.xlsx بعد كل تشغيل يستخدم openpyxl */
(() => {
  let sheet = 'arabic';
  const fmt = v => v == null ? '' : typeof v === 'number' ? String(Math.round(v * 1000) / 1000) : String(v);
  function render(p, host) {
    const j = JSON.parse(p.runPython(`import openpyxl\nopenpyxl._dump('nutrition.xlsx', ${JSON.stringify(sheet)})`));
    let box = host.querySelector('.xlview');
    if (!box) { box = document.createElement('div'); box.className = 'tkwin xlview'; host.appendChild(box); }
    if (!j) { box.innerHTML = '<div class="tt"><i></i><i style="background:#eb3"></i><i style="background:#5b5"></i><span>nutrition.xlsx</span></div><p style="padding:8px;direction:rtl">لا توجد ورقة بهذا الاسم.</p>'; return; }
    const L = n => { let s = ''; while (n) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = Math.floor((n - 1) / 26); } return s; };
    box.innerHTML = `<div class="tt"><i></i><i style="background:#eb3"></i><i style="background:#5b5"></i><span>📊 nutrition.xlsx · ${sheet}</span></div>
    <div style="padding:6px;background:#fff;direction:rtl;font:12px Rubik,Tahoma,sans-serif;display:flex;gap:6px;align-items:center;flex-wrap:wrap">
      <span style="color:#555">ورقة العمل:</span>${j.sheets.map(s => `<button type="button" data-s="${s}" style="border:1px solid #1D6F42;border-radius:6px;padding:1px 10px;background:${s === sheet ? '#1D6F42' : '#fff'};color:${s === sheet ? '#fff' : '#1D6F42'};cursor:pointer">${s}</button>`).join('')}
      <span style="flex:1"></span><button type="button" class="xlrs" style="border:1px solid #999;border-radius:6px;padding:1px 10px;background:#fff;cursor:pointer">↺ استعادة الملف الأصلي</button></div>
    <div style="overflow:auto;max-width:100%;background:#fff"><table style="border-collapse:collapse;font:12px Rubik,Tahoma,sans-serif;direction:${sheet === 'english' ? 'ltr' : 'rtl'};min-width:100%">
    <tr><th style="background:#E6E6E6;border:1px solid #ccc;padding:2px 6px"></th>${Array.from({ length: j.C }, (_, c) => `<th style="background:#E6E6E6;border:1px solid #ccc;padding:2px 6px;font-weight:500">${L(c + 1)}</th>`).join('')}</tr>
    ${j.cells.map((row, r) => `<tr><th style="background:#E6E6E6;border:1px solid #ccc;padding:2px 6px;font-weight:500">${r + 1}</th>${row.map(v => `<td style="border:1px solid #ddd;padding:2px 6px;white-space:nowrap;text-align:${typeof v === 'number' ? 'right' : 'center'};${r < 2 ? 'background:#E2EFDA;font-weight:600;' : ''}direction:${typeof v === 'number' ? 'ltr' : 'rtl'}">${fmt(v).replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch])}</td>`).join('')}</tr>`).join('')}
    </table></div>`;
    box.querySelectorAll('button[data-s]').forEach(b => b.onclick = () => { sheet = b.dataset.s; render(p, host); });
    box.querySelector('.xlrs').onclick = () => { if (!confirm('استعادة ملف التغذية الأصلي كما في الكتاب؟')) return; p.runPython('import openpyxl\nopenpyxl._reset()'); render(p, host); };
  }
  window.LAB_AFTER_RUN = (p, code, host) => { if (host && /openpyxl/.test(code)) render(p, host); };
})();
