// «فيلم المحطة»: مقاطع قصيرة متحركة على طريقة ساعة البرمجة (مشاهد + شخصيات + كود يُكتب + رواية صوتية عربية + ترجمة)
'use strict';
const FILM = (() => {
  let voice = null;
  const pickVoice = () => { try { const v = speechSynthesis.getVoices(); voice = v.find(x => /^ar(-|_)SA/i.test(x.lang)) || v.find(x => /^ar/i.test(x.lang)) || null; } catch (e) { voice = null; } };
  try { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; } catch (e) {}
  const SH = { oval: ['البيضاوي', '#ECD571'], para: ['متوازي الأضلاع', '#9CCBF0'], rect: ['المستطيل', '#A9DDB8'], dia: ['المعيّن', '#FFB870'] };
  const shapeSVG = k => k === 'oval' ? '<ellipse cx="60" cy="30" rx="54" ry="24"/>' : k === 'para' ? '<path d="M22 6H114L98 54H6Z"/>' : k === 'dia' ? '<path d="M60 2L116 30L60 58L4 30Z"/>' : '<rect x="6" y="8" width="108" height="44" rx="5"/>';

  /* ---------- رسم كل مشهد ---------- */
  function scene(st, s, done) {
    const T = [], after = (ms, f) => T.push(setTimeout(f, ms));
    let animMs = 0;
    if (s.t === 'title') {
      st.innerHTML = `<div class="fm-title"><div class="fm-clap">🎬</div><h2>${esc(s.title)}</h2>${s.sub ? `<p>${esc(s.sub)}</p>` : ''}<div class="fm-cast">${(s.cast || ['k', 'b', 'q']).map(w => `<div class="fm-actor">${char(w, 'happy')}</div>`).join('')}</div></div>`;
      animMs = 2600;
    } else if (s.t === 'talk') {
      st.innerHTML = `<div class="fm-talk ${s.w === 'b' ? 'flip' : ''}"><div class="fm-who">${char(s.w, s.m || 'happy')}</div><div class="fm-bub"><b>${esc(cname(s.w))}:</b> <span class="fm-tw"></span></div></div>`;
      const tw = $('.fm-tw', st), txt = s.say; let i = 0; const iv = setInterval(() => { i += 2; tw.innerHTML = rich(txt.slice(0, i)); if (i >= txt.length) clearInterval(iv); }, 35); T.push({ iv });
      animMs = txt.length * 18 + 900;
    } else if (s.t === 'steps') {
      st.innerHTML = `<div class="fm-steps"><h3>${esc(s.title)}</h3><ol>${s.items.map(x => `<li>${rich(x)}</li>`).join('')}</ol></div>`;
      $$('li', st).forEach((li, k) => after(500 + k * 900, () => li.classList.add('in')));
      animMs = 600 + s.items.length * 900;
    } else if (s.t === 'shapes') {
      st.innerHTML = `<div class="fm-steps"><h3>${esc(s.title)}</h3><div class="fm-shapes">${s.items.map(([k, t]) => `<div class="fm-sh"><svg viewBox="0 0 120 60" fill="${SH[k][1]}" stroke="#534057" stroke-width="4">${shapeSVG(k)}</svg><b>${esc(SH[k][0])}</b><span>${esc(t)}</span></div>`).join('')}</div></div>`;
      $$('.fm-sh', st).forEach((d, k) => after(400 + k * 900, () => d.classList.add('in')));
      animMs = 500 + s.items.length * 900;
    } else if (s.t === 'code') {
      st.innerHTML = `<div class="fm-code"><div class="fm-ed"><div class="fm-tb"><i></i><i></i><i></i><span>main.py</span></div><pre class="fm-src"></pre></div><div class="fm-out"><div class="fm-tb"><span>المخرجات</span></div><pre class="fm-res"></pre></div></div>`;
      const src = $('.fm-src', st), res = $('.fm-res', st), code = s.code; let i = 0;
      const iv = setInterval(() => { i += 1; src.textContent = code.slice(0, i); if (i >= code.length) { clearInterval(iv); after(500, () => { if (s.out != null) { res.textContent = s.out; res.classList.add('in'); } }); } }, 45); T.push({ iv });
      animMs = code.length * 45 + 1600;
    } else if (s.t === 'boxes') {
      st.innerHTML = `<div class="fm-steps"><h3>${esc(s.title || 'مدينة الذاكرة')}</h3><div class="fm-line mono" dir="ltr"></div><div class="fm-boxes"></div></div>`;
      const box = $('.fm-boxes', st), line = $('.fm-line', st);
      s.states.forEach((S_, k) => after(300 + k * 1700, () => { line.textContent = S_.ln || ''; box.innerHTML = Object.entries(S_.v).map(([n, v]) => `<div class="fm-box${S_.hi === n ? ' hi' : ''}"><span class="v">${esc(String(v))}</span><span class="n">${esc(n)}</span></div>`).join(''); }));
      animMs = 600 + s.states.length * 1700;
    } else if (s.t === 'turtle') {
      st.innerHTML = `<div class="fm-turt"><pre class="fm-tsrc mono" dir="ltr">${s.moves.map((m, k) => `<span data-k="${k}">${esc(m[2] || '')}</span>`).join('\n')}</pre><canvas width="360" height="300"></canvas></div>`;
      const cv = $('canvas', st), x = cv.getContext('2d'); let px = 140, py = 210, h = 0, pen = true; const W = cv.width, H = cv.height;
      const sprite = () => { x.save(); x.translate(px, py); x.rotate(-h * Math.PI / 180); if (s.robot) { x.fillStyle = '#4A4F57'; x.fillRect(-12, -11, 24, 22); x.fillStyle = '#F28C28'; x.fillRect(10, -11, 6, 22); x.fillStyle = '#222'; x.fillRect(-10, -15, 8, 4); x.fillRect(-10, 11, 8, 4); x.fillRect(4, -15, 8, 4); x.fillRect(4, 11, 8, 4); } else { x.fillStyle = '#5BAA5B'; x.beginPath(); x.ellipse(0, 0, 11, 8, 0, 0, 7); x.fill(); x.beginPath(); x.arc(13, 0, 4, 0, 7); x.fill(); } x.restore(); };
      const segs = []; const redraw = () => { x.fillStyle = '#fff'; x.fillRect(0, 0, W, H); x.strokeStyle = s.color || '#2E7D32'; x.lineWidth = 4; x.lineCap = 'round'; segs.forEach(g => { x.beginPath(); x.moveTo(g[0], g[1]); x.lineTo(g[2], g[3]); x.stroke(); }); sprite(); };
      redraw(); let t = 400;
      s.moves.forEach((m, k) => {
        const [op, v] = m; const dur = op === 'fd' ? 700 : op === 'circle' ? 1400 : 350;
        after(t, () => {
          $$('.fm-tsrc span', st).forEach(sp => sp.classList.toggle('on', +sp.dataset.k === k));
          if (op === 'pu') pen = false; if (op === 'pd') pen = true;
          if (op === 'lt' || op === 'rt') { const h0 = h, h1 = h + (op === 'lt' ? v : -v); const t0 = performance.now(); (function fr(n) { const p = Math.min(1, (n - t0) / dur); h = h0 + (h1 - h0) * p; redraw(); if (p < 1) requestAnimationFrame(fr); })(t0); }
          if (op === 'fd') { const r = h * Math.PI / 180, x0 = px, y0 = py, x1 = px + v * Math.cos(r), y1 = py - v * Math.sin(r), t0 = performance.now(), g = [x0, y0, x0, y0]; if (pen) segs.push(g);
            (function fr(n) { const p = Math.min(1, (n - t0) / dur); px = x0 + (x1 - x0) * p; py = y0 + (y1 - y0) * p; g[2] = px; g[3] = py; redraw(); if (p < 1) requestAnimationFrame(fr); })(t0); }
          if (op === 'circle') { const n = 36, st_ = 2 * v * Math.sin(Math.PI / n); let k2 = 0; const step = () => { if (k2++ >= n) return; h += 360 / n / 2; const r = h * Math.PI / 180, nx = px + st_ * Math.cos(r), ny = py - st_ * Math.sin(r); if (pen) segs.push([px, py, nx, ny]); px = nx; py = ny; h += 360 / n / 2; redraw(); T.push(setTimeout(step, dur / n)); }; step(); }
        });
        t += dur + 150;
      });
      animMs = t + 600;
    } else if (s.t === 'end') {
      st.innerHTML = `<div class="fm-title"><div class="fm-clap">🚀</div><h2>${esc(s.title || 'جاهزة؟ لنبدأ!')}</h2>${s.sub ? `<p>${esc(s.sub)}</p>` : ''}<div class="fm-cast"><div class="fm-actor">${char('k', 'wow')}</div></div></div>`;
      animMs = 2200;
    }
    return { T, animMs };
  }

  /* ---------- المشغّل ---------- */
  function player(host, film, { onEnd, inline } = {}) {
    let i = 0, playing = true, cur = null, endT = null, speaking = false, sound = !!voice;
    host.innerHTML = `<div class="fm ${inline ? 'inline' : ''}" style="--fm1:${film.c1 || '#6C5CE7'};--fm2:${film.c2 || '#A29BFE'}"><div class="fm-stage"></div><div class="fm-cap"></div>
      <div class="fm-bar">${film.scenes.map(() => '<i><b></b></i>').join('')}</div>
      <div class="fm-ctl"><button class="fm-b" data-a="prev" title="السابق">⏮</button><button class="fm-b big" data-a="play" title="تشغيل/إيقاف">⏸</button><button class="fm-b" data-a="next" title="التالي">⏭</button><span class="sp"></span><button class="fm-b" data-a="snd" title="الصوت">${sound ? '🔊' : '🔇'}</button></div></div>`;
    const stg = $('.fm-stage', host), cap = $('.fm-cap', host), bars = $$('.fm-bar i', host), pb = $('[data-a="play"]', host);
    const clear = () => { if (cur) cur.T.forEach(t => t.iv ? clearInterval(t.iv) : clearTimeout(t)); clearTimeout(endT); try { speechSynthesis.cancel(); } catch (e) {} speaking = false; };
    const fill = () => bars.forEach((b, k) => { const f = $('b', b); f.style.transition = 'none'; f.style.width = k < i ? '100%' : '0%'; });
    const show = () => {
      if (!document.body.contains(host)) return clear();
      clear(); fill(); const s = film.scenes[i]; stg.classList.remove('in'); void stg.offsetWidth; stg.classList.add('in');
      cur = scene(stg, s, null); cap.innerHTML = s.say ? rich(s.say) : '';
      if (!playing) return;
      const textMs = 1800 + (s.say || '').length * 60, dur = Math.max(cur.animMs, textMs);
      const f = $('b', bars[i]); requestAnimationFrame(() => { f.style.transition = `width ${dur}ms linear`; f.style.width = '100%'; });
      let spokeDone = !(sound && voice && s.say), timeDone = false;
      const maybe = () => { if (spokeDone && timeDone) next(); };
      endT = setTimeout(() => { timeDone = true; maybe(); }, dur);
      if (!spokeDone) { try { const u = new SpeechSynthesisUtterance(s.say.replace(/[«»"]/g, '')); u.lang = voice.lang; u.voice = voice; u.rate = 1; u.onend = () => { spokeDone = true; maybe(); }; u.onerror = () => { spokeDone = true; maybe(); }; speaking = true; speechSynthesis.speak(u); } catch (e) { spokeDone = true; } }
    };
    const next = () => { if (i < film.scenes.length - 1) { i++; show(); } else finish(); };
    const finish = () => { clear(); playing = false; pb.textContent = '↺'; bars.forEach(b => { $('b', b).style.transition = 'none'; $('b', b).style.width = '100%'; }); if (onEnd) onEnd(); };
    $$('.fm-b', host).forEach(b => b.onclick = () => {
      const a = b.dataset.a;
      if (a === 'play') { if (pb.textContent === '↺') { i = 0; playing = true; pb.textContent = '⏸'; return show(); } playing = !playing; pb.textContent = playing ? '⏸' : '▶'; if (playing) show(); else clear(); }
      if (a === 'prev') { i = Math.max(0, i - 1); show(); }
      if (a === 'next') { if (i < film.scenes.length - 1) { i++; show(); } else finish(); }
      if (a === 'snd') { if (!voice) return toast('لا يوجد صوت عربي في هذا الجهاز، الترجمة تكفي 👀'); sound = !sound; b.textContent = sound ? '🔊' : '🔇'; if (!sound) { try { speechSynthesis.cancel(); } catch (e) {} } }
    });
    show();
    return { stop: clear };
  }

  /* ---------- نافذة الأفلام: فيلم المحطة + لقطات الدوال الجديدة ---------- */
  function open(L, idx) {
    const F = L.films || []; if (!F.length) return;
    const seen = k => S.cele?.['film_' + L.id + '_' + k];
    const md = h(`<div class="modal fm-modal"><div class="fm-box"><div class="row" style="justify-content:space-between;margin-bottom:6px;flex-wrap:nowrap"><b style="color:#fff">🎬 أفلام المحطة: ${esc(L.title)}</b><button class="btn ghost" id="fmx" style="padding:4px 12px;flex:none">✕ إغلاق</button></div>
      <div class="fm-list">${F.map((f, k) => `<button data-k="${k}">${f.icon || (k ? '⚡' : '🎬')} ${esc(f.title)}${seen(k) ? ' ✔' : ''}</button>`).join('')}</div>
      <div id="fmh"></div><div class="row" style="justify-content:center;margin-top:8px"><button class="btn" id="fmgo" hidden>ابدئي المحطة ←</button></div></div></div>`);
    document.body.appendChild(md); let p = null;
    const mark = () => { S.cele ||= {}; S.cele['film_' + L.id] = 1; save(); };
    const play = k => {
      if (p) p.stop(); $$('.fm-list button', md).forEach(b => b.classList.toggle('on', +b.dataset.k === k)); $('#fmgo', md).hidden = true;
      p = player($('#fmh', md), F[k], { onEnd: () => { S.cele ||= {}; S.cele['film_' + L.id + '_' + k] = 1; mark(); $('#fmgo', md).hidden = false; const b = $(`.fm-list button[data-k="${k}"]`, md); if (b && !/✔/.test(b.textContent)) b.textContent += ' ✔'; } });
    };
    $$('.fm-list button', md).forEach(b => b.onclick = () => play(+b.dataset.k));
    const close = () => { if (p) p.stop(); md.remove(); mark(); };
    $('#fmx', md).onclick = close; $('#fmgo', md).onclick = close;
    play(idx || 0);
  }
  function button(L) {
    if (!L.films || !L.films.length) return; const head = $('.lhead'); if (!head || $('.fm-open', head)) return;
    const b = h(`<button class="btn fm-open" title="أفلام المحطة">🎬 الأفلام <span class="fm-n">${ar(L.films.length)}</span></button>`); b.onclick = () => open(L, 0); head.appendChild(b);
  }
  // مشاهد جاهزة: فيلم المحطة، ولقطة الدالة الجديدة (دقيقة واحدة)
  const F = (title, sub, scenes, o = {}) => ({ title, icon: '🎬', ...o, scenes: [{ t: 'title', title, sub, say: title + '. ' + (sub || '') }, ...scenes, { t: 'end', title: o.end || 'جاهزة؟ لنبدأ المحطة!', say: o.endSay || 'هيا نبدأ المحطة!' }] });
  const clip = (name, say, code, out, tip, o = {}) => ({ title: name, icon: '⚡', c1: o.c1 || '#00A884', c2: o.c2 || '#7EE0C3', scenes: [
    { t: 'title', title: name, sub: o.sub || 'لقطة سريعة: دالة جديدة', cast: [o.w || 'b'], say: name },
    { t: 'talk', w: o.w || 'b', m: 'wink', say },
    { t: 'code', code, out, say: tip || 'شاهدي الكود يُكتب، ثم انظري إلى المخرجات.' },
    ...(o.more || []),
    { t: 'end', title: 'جرّبيها بنفسكِ!', sub: o.try || '', say: 'جرّبيها الآن في المعمل.' }] });
  return { player, open, button, F, clip };
})();

/* مكتبة الأفلام للمعلمة: كل أفلام المحطات للعرض على السبورة */
function vFilms() {
  const Ls = LESSONS.filter(L => L.films && L.films.length);
  main().innerHTML = `<div class="row" style="justify-content:space-between"><h1 class="h1">🎬 أفلام المحطات</h1><span class="mute">${ar(Ls.reduce((n, L) => n + L.films.length, 0))} فيلمًا</span></div>
  <div id="fvp"></div><div class="fvl">${Ls.map(L => `<div class="fvs"><b>${esc(lname(L))}: ${esc(L.title)}</b><div class="fm-list" style="flex-wrap:wrap">${L.films.map((f, k) => `<button data-l="${L.id}" data-k="${k}">${f.icon || '🎬'} ${esc(f.title)}</button>`).join('')}</div></div>`).join('')}</div>`;
  let p = null;
  $$('.fvl button').forEach(b => b.onclick = () => { $$('.fvl button').forEach(x => x.classList.toggle('on', x === b)); if (p) p.stop(); const L = LESSONS.find(x => x.id === b.dataset.l); p = FILM.player($('#fvp'), L.films[+b.dataset.k], { inline: true }); $('#fvp').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
}
