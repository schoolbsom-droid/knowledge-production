// «عشر مراحل كود»: مراحل تتعلم فيها الطالبة كتابة الكود بنفسها (تركيب، فراغات، تصنيف، مؤشر، أخطاء، كتابة، مقارنة، مخطط↔كود، تحدٍّ)
'use strict';
function ifPlay({ a, body, rec, got }) {
  const ST = a.stages, solo = a.only != null; let cur = a.only ?? 0;
  const done = j => got('k' + j);
  const stars = j => { const g = done(j); return g ? (g.d?.stars || 3) : 0; };
  const fst = n => `<span class="fst">${'★'.repeat(n)}<i>${'★'.repeat(3 - n)}</i></span>`;
  body.innerHTML = `${solo ? '' : `<div class="flv"><b>🗺️ خريطة المراحل: كل مرحلة مهارة في كتابة الكود</b><span class="chip" id="ftot"></span></div><div class="fex"></div>`}<div id="ix"></div>`;
  const paintTiles = () => {
    const box = $('.fex', body); if (!box) return; let tot = 0;
    box.innerHTML = ST.map((s, j) => { const st = stars(j); tot += st;
      return `<button data-i="${j}" class="${j === cur ? 'on ' : ''}${done(j) ? 'done' : ''}"><span>${s.icon}</span><b>${ar(j + 1)}</b><small>${esc(s.title)}</small><em>${s.i} ${esc(s.n)}</em>${fst(st)}</button>`; }).join('');
    $$('button', box).forEach(b => b.onclick = () => { open(+b.dataset.i); $('#ix', body).scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    $('#ftot', body).innerHTML = `★ ${ar(tot)} / ${ar(ST.length * 3)}`;
  };
  const codeHTML = (lines, cls = '') => `<div class="icode ${cls}">${lines.map((l, k) => `<div class="ln" data-l="${k}">${esc(l) || ' '}</div>`).join('')}</div>`;

  const open = i => {
    cur = i; paintTiles(); const s = ST[i], host = $('#ix', body);
    host.innerHTML = `<div class="fxh"><span class="ficon">${s.icon}</span><div><b>المرحلة ${ar(i + 1)}: ${esc(s.title)}</b>${s.src ? ` <span class="badge wait">${esc(s.src)}</span>` : ''}</div></div>
    <div class="fms" id="ims"><span class="fmsi">${s.i}</span><div class="fmst"><b>مهارة المرحلة: ${esc(s.n)}</b><div id="imt">${s.task}</div></div><span id="istar"></span></div>
    <div id="iw" style="margin-top:10px"></div><div id="if"></div>`;
    const W = $('#iw', host), F = $('#if', host);
    let tries = 0, won = !!done(i);
    const miss = m => { tries++; beep(0); F.innerHTML = `<div class="fb no">${m}</div>`; };
    const note = m => { F.innerHTML = `<div class="fb info">${m}</div>`; };
    const paintStar = () => { $('#istar', host).innerHTML = fst(won ? (stars(i) || (tries === 0 ? 3 : tries <= 2 ? 2 : 1)) : 0); $('#ims', host).classList.toggle('won', won); };
    const win = msg => {
      F.innerHTML = `<div class="fb ok">✔ ${msg || 'أحسنتِ!'}</div>`;
      if (won) return; won = true; const st = tries === 0 ? 3 : tries <= 2 ? 2 : 1; beep(1);
      if (rec('k' + i, [0, 5, 7, 10][st], { tries, stars: st })) toast(`${'★'.repeat(st)} أتممتِ مرحلة «${s.title}»`);
      $('#imt', host).innerHTML = `<b style="color:var(--g)">✔ أتممتِ مهمة المرحلة!</b>${!solo && i < ST.length - 1 ? ' <span class="mute">انتقلي إلى المرحلة التالية من الخريطة.</span>' : ''}`;
      paintStar(); paintTiles();
      if (!solo && ST.every((_, j) => done(j))) { confetti(); toast('🏆 لقبكِ الآن: كاتبة الشروط الماهرة'); }
    };
    const rounds = (list, one) => { let r = 0; const nx = () => { if (r >= list.length) return; const box = h(`<div class="iround"></div>`); W.innerHTML = list.length > 1 ? `<div class="mute" style="font-size:13px;margin-bottom:4px">الجولة ${ar(r + 1)} من ${ar(list.length)}</div>` : ''; W.appendChild(box); one(list[r], box, () => { r++; if (r >= list.length) return true; setTimeout(nx, 900); return false; }); }; nx(); };

    /* ١) ركّبي الجملة */
    if (s.k === 'build') rounds(s.rounds, (R, box, next) => {
      let k = 0, txt = '';
      const all = shuffle([...R.pieces.map((p, j) => ({ l: p[0], r: p[1], j })), ...(R.decoys || []).map(d => ({ l: d, j: -1 }))]);
      box.innerHTML = `${R.goal ? `<div class="fb info">${rich(R.goal)}</div>` : ''}<pre class="ibuild"><span class="bt"></span><span class="cur">▌</span></pre><div class="ipcs">${all.map((p, j) => `<button class="ipc" data-j="${j}">${esc(p.l)}</button>`).join('')}</div><div class="row" style="justify-content:center"><button class="btn ghost" id="bu">↺ ابدئي من جديد</button></div>`;
      const paint = () => { $('.bt', box).textContent = txt; };
      $$('.ipc', box).forEach(b => b.onclick = () => {
        const p = all[+b.dataset.j], want = R.pieces[k];
        if (p.j >= 0 && p.l === want[0]) { txt += want[1]; k++; b.disabled = true; beep(1); F.innerHTML = ''; paint();
          if (k >= R.pieces.length) { $('.cur', box).remove(); if (next()) win(R.why || 'ركّبتِ الجملة بشكل صحيح.'); else note('✔ صحيح! الجولة التالية…'); } }
        else { b.classList.add('shake'); setTimeout(() => b.classList.remove('shake'), 400); miss(R.hint || 'ليست هذه القطعة الآن. ما الذي يأتي بعد ما كتبتِه؟'); }
      });
      $('#bu', box).onclick = () => { k = 0; txt = ''; $$('.ipc', box).forEach(b => b.disabled = false); paint(); };
    });

    /* ٢) أكملي الفراغ */
    else if (s.k === 'fill') rounds(s.rounds, (R, box, next) => {
      let n = 0; const html = esc(R.code).replace(/___/g, () => { const b = R.blanks[n], j = n++; return `<select data-b="${j}"><option value="">؟</option>${b.o.map((o, q) => `<option value="${q}">${esc(o === '    ' ? '⇥ مسافة بادئة' : o)}</option>`).join('')}</select>`; });
      box.innerHTML = `${R.goal ? `<div class="fb info">${rich(R.goal)}</div>` : ''}<div class="icode">${html.split('\n').map(l => `<div class="ln">${l || ' '}</div>`).join('')}</div><div class="row" style="justify-content:center;margin-top:8px"><button class="btn g" id="fk">✔ تحققي</button></div>`;
      $('#fk', box).onclick = () => { let bad = 0; $$('select', box).forEach(sel => { const ok = +sel.value === R.blanks[+sel.dataset.b].a && sel.value !== ''; sel.classList.toggle('ok', ok); sel.classList.toggle('no', !ok); if (!ok) bad++; });
        if (bad) return miss(`${ar(bad)} من الفراغات تحتاج مراجعة (باللون الأحمر). ${R.hint || ''}`);
        beep(1); $$('select', box).forEach(x => x.disabled = true); $('#fk', box).remove(); if (next()) win(R.why); else note('✔ صحيح! ' + (R.why || '') + ' الجولة التالية…'); };
    });

    /* ٣) أي نوع؟ */
    else if (s.k === 'sort') {
      const T3 = [['if', 'if'], ['ifelse', 'if...else'], ['elif', 'if...elif...else']]; let left = s.items.length;
      W.innerHTML = `<div class="isort">${s.items.map((it, j) => `<div class="it" id="so${j}"><div>${ar(j + 1)}. ${rich(it.s)}</div><div class="bt">${T3.map(([v, l]) => `<button class="ipc" data-v="${v}">${l}</button>`).join('')}</div><div class="fbw"></div></div>`).join('')}</div>`;
      s.items.forEach((it, j) => $$(`#so${j} .ipc`, W).forEach(b => b.onclick = () => {
        if (b.dataset.v === it.a) { beep(1); $$(`#so${j} .ipc`, W).forEach(x => { x.disabled = true; if (x === b) x.classList.add('right'); }); $(`#so${j} .fbw`, W).innerHTML = `<div class="fb ok">✔ ${rich(it.why)}</div>`; if (--left === 0) win('ميّزتِ بين الأنواع الثلاثة: خيار واحد ← if، خياران ← if...else، أكثر من خيارين ← elif.'); }
        else { b.disabled = true; miss(`ليست ${b.textContent}. عُدّي الاحتمالات في الموقف: كم طريقًا مختلفًا فيه؟`); }
      }));
    }

    /* ٤) حرّكي المؤشر */
    else if (s.k === 'slider') {
      let t = 0, v = s.start;
      W.innerHTML = `<div class="fb info" id="stg"></div><div class="isl"><b class="mono" dir="ltr">${esc(s.v)} =</b><input type="range" min="${s.min}" max="${s.max}" step="${s.step || 1}" value="${v}"><b class="mono" id="sv" style="min-width:3ch;text-align:center;font-size:20px">${v}</b></div><div id="sc"></div><div class="iscr" id="so"></div><div class="row" style="justify-content:center;margin-top:8px"><button class="btn g" id="spin">📌 ثبّتي هذه القيمة</button></div>`;
      const paint = () => { const r = s.sim(v); $('#sc', W).innerHTML = codeHTML([`${s.v} = ${v}`, ...s.code]); $$('#sc .ln', W).forEach((d, k) => d.classList.toggle('on', k === 0 || r.on.includes(k - 1))); $('#so', W).textContent = r.out.join('\n') || '(لا شيء يُطبع)'; $('#sv', W).textContent = v; };
      const goal = () => { $('#stg', W).innerHTML = t < s.targets.length ? `<b>الهدف ${ar(t + 1)} من ${ar(s.targets.length)}:</b> ${rich(s.targets[t].t)}` : '✔ أنجزتِ كل الأهداف!'; };
      $('input', W).oninput = e => { v = +e.target.value; paint(); };
      $('#spin', W).onclick = () => { if (t >= s.targets.length) return; const r = s.sim(v); if (s.targets[t].ok(r.out, v)) { beep(1); t++; goal(); F.innerHTML = ''; if (t >= s.targets.length) win(s.why); } else miss('ليست هذه القيمة. راقبي الأسطر المضيئة: أي شرط تحقق؟'); };
      paint(); goal();
    }

    /* ٥) اصطادي الخطأ في الكود */
    else if (s.k === 'bug') rounds(s.rounds, (R, box, next) => {
      box.innerHTML = `<div class="fb info">${rich(R.goal || 'في هذا الكود خطأ واحد. اضغطي على السطر الخطأ.')}</div>${codeHTML(R.lines, 'clk')}`;
      $$('.ln', box).forEach(d => d.onclick = () => { if ($('.icode', box).classList.contains('done')) return; const k = +d.dataset.l;
        if (k === R.bad) { beep(1); d.classList.add('fixd'); d.textContent = R.fix; $('.icode', box).classList.add('done'); $('.icode', box).classList.remove('clk'); if (next()) win(R.why); else note('✔ ' + R.why + ' الجولة التالية…'); }
        else { d.classList.add('bad'); setTimeout(() => d.classList.remove('bad'), 600); miss(R.hint || 'هذا السطر سليم. ابحثي عن النقطتين، والمسافة البادئة، و = و ==.'); } });
    });

    /* ٦ و ١٠) من الكلام إلى الكود / تحدّي الزعيمة */
    else if (s.k === 'write') {
      W.innerHTML = `<div id="ied"></div><div class="row" style="margin-top:8px"><button class="btn g" id="wk">✔ تحققي من كودي</button>${s.hint ? '<button class="btn ghost" id="wh">💡 تلميح</button>' : ''}</div><div id="wr"></div>`;
      const prev = done(i); const ed = ide($('#ied', W), (prev && prev.d?.code) || s.starter || '');
      if ($('#wh', W)) $('#wh', W).onclick = () => { $('#wr', W).innerHTML = say(`<b>تلميح:</b><pre class="mono" style="background:var(--code);color:var(--codeink);border-radius:10px;padding:6px 10px;white-space:pre-wrap">${esc(s.hint)}</pre>`, 'wink', 'b'); };
      $('#wk', W).onclick = async () => {
        const b = $('#wk', W); b.disabled = true; b.textContent = '⏳'; const r = await PY.run(ed.ta.value, $('.out', ed.el), $('.tkhost', ed.el)); b.disabled = false; b.textContent = '✔ تحققي من كودي';
        if (!r.ok) return miss('البرنامج فيه خطأ، صحّحيه أولًا. ' + esc(r.hint || ''));
        const ok = s.checks.map(c => PY.check(c.py)); $('#wr', W).innerHTML = `<div class="q">${s.checks.map((c, j) => `<div style="color:${ok[j] ? 'var(--g)' : 'var(--r)'}">${ok[j] ? '✔' : '✘'} ${esc(c.msg)}</div>`).join('')}</div>`;
        if (ok.every(Boolean)) { if (!won) rec('c' + i, 0, { code: ed.ta.value.slice(0, 3000) }); win(s.why || 'كودكِ صحيح ويعمل مع كل القيم!'); } else miss(`أنجزتِ ${ar(ok.filter(Boolean).length)} من ${ar(ok.length)}. جرّبي برنامجكِ بقيم مختلفة.`);
      };
    }

    /* ٧) قارني */
    else if (s.k === 'compare') {
      let left = s.questions.length;
      W.innerHTML = `<div class="isl"><b>${esc(s.label)}</b> <input class="in mono" id="cv" type="number" value="${s.start}" style="width:110px;display:inline-block;padding:4px 8px"><button class="btn plum" id="cr">▶ شغّلي الأكواد</button></div><div class="icmp">${s.variants.map((x, j) => `<div><b>${esc(x.name)}</b>${codeHTML(x.code.split('\n'))}<div class="iscr" id="co${j}">…</div></div>`).join('')}</div><div id="cq" style="margin-top:10px"></div>`;
      const runAll = () => { const v = +$('#cv', W).value; s.variants.forEach((x, j) => { $('#co' + j, W).textContent = x.sim(v).join('\n') || '(لا شيء يُطبع)'; }); };
      $('#cr', W).onclick = runAll; runAll();
      $('#cq', W).innerHTML = s.questions.map((q, j) => `<div class="q" id="cqq${j}"><div class="qt">${rich(q.q)}</div><div class="opts">${q.o.map((o, k) => `<button class="opt" data-k="${k}">${rich(o)}</button>`).join('')}</div><div class="fbw"></div></div>`).join('');
      s.questions.forEach((q, j) => $$(`#cqq${j} .opt`, W).forEach(b => b.onclick = () => {
        if (+b.dataset.k === q.a) { beep(1); b.classList.add('ok'); $$(`#cqq${j} .opt`, W).forEach(x => x.disabled = true); $(`#cqq${j} .fbw`, W).innerHTML = q.why ? `<div class="fb ok">${rich(q.why)}</div>` : ''; if (--left === 0) win(s.why); }
        else { b.classList.add('no'); b.disabled = true; miss('جرّبي القيمة في الأعلى وشغّلي الأكواد، ثم انظري إلى الشاشات.'); }
      }));
    }

    /* ٨) المخطط ← الكود */
    else if (s.k === 'chart2code') rounds(s.rounds, (R, box, next) => {
      const G = chartGeo(R.flow);
      box.innerHTML = `<div class="fb info">${rich(R.goal || 'أي كود يطابق هذا المخطط؟')}</div><div class="fxc" style="text-align:center">${chartSVG(R.flow, G)}</div>${shuffle(R.o.map((c, k) => ({ c, k }))).map(x => `<button class="iopt" data-k="${x.k}">${esc(x.c)}</button>`).join('')}`;
      $$('.iopt', box).forEach(b => b.onclick = () => { if (+b.dataset.k === 0) { beep(1); b.classList.add('ok'); $$('.iopt', box).forEach(x => x.disabled = true); if (next()) win(R.why); else note('✔ ' + R.why + ' الجولة التالية…'); } else { b.classList.add('no'); b.disabled = true; miss(R.hint || 'قارني كل معيّن بجملة if أو elif، وكل طريق «لا» بـ else.'); } });
    });

    /* ٩) الكود ← المخطط */
    else if (s.k === 'code2chart') {
      const ex = s.flow, G = chartGeo(ex), want = new Set(flowWalk(ex, { ...(s.inputs || {}) })), picks = new Set();
      W.innerHTML = `<div class="icmp" style="align-items:start"><div>${codeHTML(s.code.split('\n'))}<div class="fb info" style="margin-top:6px">${rich(s.given)}</div></div><div class="fxc" style="text-align:center">${chartSVG(ex, G)}</div></div><div class="row" style="justify-content:center;margin-top:8px"><span id="cpc">اخترتِ 0 أشكال</span><button class="btn g" id="cck">✔ تحقّقي</button></div>`;
      const svg = $('.fchart', W); svg.classList.add('clk');
      $$('.fn', svg).forEach(g => g.onclick = () => { if (won) return; const id = g.dataset.id; picks.has(id) ? picks.delete(id) : picks.add(id); g.classList.toggle('pick', picks.has(id)); $('#cpc', W).textContent = `اخترتِ ${picks.size} أشكال`; });
      $('#cck', W).onclick = () => { const extra = [...picks].filter(x => !want.has(x)).length, lack = [...want].filter(x => !picks.has(x)).length;
        if (!extra && !lack) { $$('.fn', svg).forEach(g => g.classList.toggle('seen', want.has(g.dataset.id))); return win(s.why); }
        miss(`${extra ? `اخترتِ ${ar(extra)} من الأشكال لا يمرّ عليها التنفيذ. ` : ''}${lack ? `نسيتِ ${ar(lack)} من الأشكال. ` : ''}نفّذي الكود سطرًا سطرًا بالقيمة المعطاة.`); };
    }
    paintStar();
    if (won && s.k !== 'write') $('#imt', host).innerHTML = `<b style="color:var(--g)">✔ أتممتِ هذه المرحلة.</b> يمكنكِ إعادتها للتدريب.`;
  };
  open(solo ? cur : Math.max(0, ST.findIndex((_, j) => !done(j))));
}
