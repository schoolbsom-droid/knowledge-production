// مؤقت: شريط تجربة الألوان، يُحذف بعد اعتماد اللوحة
(() => {
  const base = {bg: '#F8F7F4', paper: '#FFFFFF', hdtx: '#FFFFFF', nowtx: '#FFFFFF'};
  const P = {
    'محايدة': {ink: '#211B24', ink2: '#4a434d', mut: '#77707a', line: '#E7E5E6', soft: '#F3F1F2', mauve: '#B8A9B5', label: '#7d6a7a',
      c1: '#B8A9B5', c2: '#C2BFBB', c3: '#211B24', hd: '#211B24', hdmut: '#E7E5E6', feat: '#B8A9B5', feattx: '#211B24', now: '#211B24'},
    'كحلي وذهبي': {bg: '#F7F5F0', ink: '#1B2A41', ink2: '#3a4a60', mut: '#6b7686', line: '#E4E1D8', soft: '#F1EEE6', mauve: '#C9A45C', label: '#9a7a3a',
      c1: '#C9A45C', c2: '#8FA3B8', c3: '#1B2A41', hd: '#1B2A41', hdmut: '#D8DEE6', feat: '#1B2A41', feattx: '#F7F5F0', now: '#C9A45C', nowtx: '#1B2A41'},
    'زيتي': {bg: '#F6F6F1', ink: '#2F3A2C', ink2: '#4b5647', mut: '#737b6e', line: '#E3E4DA', soft: '#EEEFE6', mauve: '#A4AC86', label: '#6b7350',
      c1: '#A4AC86', c2: '#D4C7A1', c3: '#4A5D3F', hd: '#4A5D3F', hdmut: '#E3E7D6', feat: '#D4C7A1', feattx: '#2F3A2C', now: '#4A5D3F'},
    'تركواز': {bg: '#F4F8F8', ink: '#163A3F', ink2: '#33575c', mut: '#62807f', line: '#DCE8E8', soft: '#EAF3F2', mauve: '#5FB3AE', label: '#2f7d78',
      c1: '#5FB3AE', c2: '#F2B880', c3: '#1F5F63', hd: '#1F5F63', hdmut: '#D3ECEA', feat: '#E6F4F2', feattx: '#163A3F', now: '#1F5F63'},
    'وردي هادئ': {bg: '#FBF6F5', ink: '#3E2A30', ink2: '#5d4950', mut: '#8a7378', line: '#F0E2E2', soft: '#F8EDEC', mauve: '#D9A5A9', label: '#a0646b',
      c1: '#D9A5A9', c2: '#E9CDB4', c3: '#8E5A63', hd: '#8E5A63', hdmut: '#F6E3E4', feat: '#F3DCDD', feattx: '#3E2A30', now: '#8E5A63'},
    'ترابية': {bg: '#F6F1EB', paper: '#FFFCF8', ink: '#492718', ink2: '#7A4E47', mut: '#8a5f42', line: '#DBCEC3', soft: '#F3EADF', mauve: '#DBA367', label: '#936645',
      c1: '#DBA367', c2: '#C7B89C', c3: '#582119', hd: '#492718', hdmut: '#DBCEC3', feat: '#582119', feattx: '#FFFCF8', now: '#DBA367', nowtx: '#492718'},
    'خضراء': {bg: '#FAFAFA', ink: '#1f3d22', ink2: '#35573a', mut: '#5f6f61', line: '#E6E6E7', soft: '#EEF6EC', mauve: '#59A541', label: '#2f7d33',
      c1: '#59A541', c2: '#A9D39B', c3: '#2f7d33', hd: '#2f7d33', hdmut: '#EAF5E8', feat: '#EEF6EC', feattx: '#1f3d22', now: '#59A541'},
    'فاتحة': {bg: '#FFFFFF', ink: '#26303B', ink2: '#47525e', mut: '#78828c', line: '#E8EBEE', soft: '#F4F6F8', mauve: '#7C8CF0', label: '#5563c9',
      c1: '#7C8CF0', c2: '#F4B6C2', c3: '#5ECFB1', hd: '#F4F6F8', hdtx: '#26303B', hdmut: '#5b6570', feat: '#7C8CF0', feattx: '#FFFFFF', now: '#7C8CF0'},
  };
  const apply = k => {
    const v = {...base, ...P[k]};
    for (const n in v) document.documentElement.style.setProperty('--' + n, v[n]);
    bar.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.k === k));
    try { localStorage.setItem('pal', k); } catch (e) {}
  };
  const bar = document.createElement('div');
  bar.className = 'pals';
  bar.innerHTML = '<span>اختاري الألوان:</span>' + Object.keys(P).map(k =>
    `<button data-k="${k}"><i style="background:${P[k].hd}"></i><i style="background:${P[k].mauve}"></i><i style="background:${P[k].feat}"></i>${k}</button>`).join('');
  bar.onclick = e => { const b = e.target.closest('button'); if (b) apply(b.dataset.k); };
  document.body.prepend(bar);
  let k = 'محايدة';
  try { k = localStorage.getItem('pal') || k; } catch (e) {}
  apply(P[k] ? k : 'محايدة');
})();
