// «تمارين الكتاب: لنطبق معًا» — كل تدريب برقمه وصفحته، يُحل تفاعليًا ويُصحَّح فورًا ويصل للمعلمة
'use strict';
const SHAPES = { oval: ['بيضاوي', 'البداية / النهاية'], para: ['متوازي أضلاع', 'إدخال / إخراج'], rect: ['مستطيل', 'عملية'], dia: ['معيّن', 'قرار'] };
function shapeSVG(k, text, w = 230) {
  const h = 54, t = esc(text);
  const body = k === 'oval' ? `<ellipse cx="${w / 2}" cy="27" rx="${w / 2 - 4}" ry="23" fill="#ECD571"/>` : k === 'para' ? `<path d="M22 4h${w - 26}l-18 46H4z" fill="#B9DDF5"/>` : k === 'dia' ? `<path d="M${w / 2} 2L${w - 4} 27L${w / 2} 52L4 27z" fill="#FFCB7D"/>` : `<rect x="4" y="4" width="${w - 8}" height="46" rx="3" fill="#C9EBD3"/>`;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" class="fs">${body.replace('/>', ' stroke="#534057" stroke-width="2.5"/>')}<foreignObject x="18" y="6" width="${w - 36}" height="42"><div xmlns="http://www.w3.org/1999/xhtml" class="fst">${t}</div></foreignObject></svg>`;
}
const normA = s => String(s).trim().replace(/\s+/g, '').replace(/[“”«»]/g, '"').replace(/'/g, '"').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).toLowerCase();
function bookAct({ a, body, rec, got }) {
  a.items.forEach((it, i) => {
    const k = 'b' + i, card = h(`<div class="bk"><div class="bkh"><span class="bkn">${esc(it.n)}</span><span class="mute" style="font-size:13px">الكتاب ص${esc(it.p)}</span><span class="sp"></span><span class="bks" id="bs${i}"></span></div><div class="bkq">${rich(it.q)}</div>${it.code ? codeHTML(it.code) : ''}<div class="bkb"></div></div>`);
    body.appendChild(card);
    const bb = $('.bkb', card), done = (s, d) => { if (rec(k, s, d)) toast(`✔ ${it.n}: +${ar(s)} ⭐`); mark(); }, mark = () => { const g = got(k); $('#bs' + i, card).innerHTML = g ? `<span class="badge">✔ ${ar(g.s)} / ١٠</span>` : '<span class="badge wait">لم يُحل</span>'; };
    mark(); const g = got(k);
    if (it.kind === 'choice') it.qs.forEach((q, j) => mcq(bb, q, { key: k + '_' + j, ctx: { rec: (kk, s, d) => { const r = rec(kk, 0, d); if (it.qs.every((_, jj) => got(k + '_' + jj))) { const t = it.qs.reduce((x, _, jj) => x + (got(k + '_' + jj).d?.tries || 0), 0); done(Math.max(4, 10 - t * 3), { tries: t }); } return r; }, got }, mono: q.mono }));
    else if (it.kind === 'order') { if (g) bb.innerHTML = `<ol class="bkdone">${it.lines.map(l => `<li>${rich(l)}</li>`).join('')}</ol>`; else orderTask(bb, it.lines, t => done(t ? 6 : 10, { tries: t })); }
    else if (it.kind === 'match') { if (g) doneMatch(bb, it.pairs); else matchTask(bb, it.pairs, w => done(Math.max(4, 10 - w * 2), { wrong: w }), it.mono); }
    else if (it.kind === 'fill') fillItem(bb, it, g, done);
    else if (it.kind === 'flow') flowItem(bb, it, g, done);
    else if (it.kind === 'write') writeItem(bb, it, g, done);
    else if (it.kind === 'code') codeItem(bb, it, g, done);
  });
}
function fillItem(bb, it, g, done) {
  bb.innerHTML = `<div class="bkfill">${it.blanks.map((b, j) => `<label class="bkf">${/[\u0600-\u06FF]/.test(b.l) ? `<span>${rich(b.l)}</span>` : `<span dir="ltr" class="mono" style="text-align:left;font-weight:700">${esc(b.l)}</span>`}<input class="in ${b.mono !== false ? 'mono' : ''}" data-j="${j}" value="${esc(g?.d?.v?.[j] ?? '')}" ${g ? 'disabled' : ''} autocomplete="off" spellcheck="false"></label>`).join('')}</div>${g ? '' : '<button class="btn g chk" style="margin-top:8px">✔ تحققي</button>'}<div class="fbw"></div>`;
  if (g) { $$('input', bb).forEach(x => x.classList.add('okf')); return; }
  let tries = 0;
  $('.chk', bb).onclick = () => {
    const v = $$('input', bb).map(x => x.value); let bad = 0;
    $$('input', bb).forEach((x, j) => { const ok = it.blanks[j].a.some(ans => normA(ans) === normA(x.value)); x.classList.toggle('okf', ok); x.classList.toggle('nof', !ok); if (!ok) bad++; });
    if (!bad) { beep(1); $$('input', bb).forEach(x => x.disabled = true); $('.chk', bb).remove(); $('.fbw', bb).innerHTML = `<div class="fb ok">✔ إجابات صحيحة!${it.why ? ' ' + rich(it.why) : ''}</div>`; done(Math.max(4, 10 - tries * 2), { tries, v }); }
    else { beep(0); tries++; $('.fbw', bb).innerHTML = `<div class="fb no">${ar(bad)} من الإجابات تحتاج مراجعة (باللون الأحمر).${tries >= 2 && it.hint ? ' تلميح: ' + rich(it.hint) : ''}</div>`; }
  };
}
// المخطط الانسيابي: رتّبي الخطوات واختاري شكل كل خطوة، فيُرسم المخطط أمامك
function flowItem(bb, it, g, done) {
  const N = it.steps.length;
  let order = g ? it.steps.map((_, j) => j) : shuffle(it.steps.map((_, j) => j)), shp = g ? it.steps.map(s => s.s) : it.steps.map(() => '');
  const paint = () => {
    bb.innerHTML = `<div class="bkflow"><div class="bkfl">${order.map((si, pos) => `<div class="bkst"><span class="bkpos">${ar(pos + 1)}</span><span style="flex:1">${rich(it.steps[si].t)}</span>${g ? '' : `<select class="in" data-si="${si}" style="width:auto;padding:4px 6px"><option value="">الشكل؟</option>${Object.entries(SHAPES).map(([k, v]) => `<option value="${k}" ${shp[si] === k ? 'selected' : ''}>${v[0]} (${v[1]})</option>`).join('')}</select><button class="btn ghost up" data-p="${pos}" style="padding:2px 10px" ${pos ? '' : 'disabled'}>▲</button><button class="btn ghost dn" data-p="${pos}" style="padding:2px 10px" ${pos < N - 1 ? '' : 'disabled'}>▼</button>`}</div>`).join('')}</div>
    <div class="bkdraw">${order.map((si, pos) => `${pos ? '<div class="bkarrow">↓</div>' : ''}${shp[si] ? shapeSVG(shp[si], it.steps[si].t) : `<div class="bkph">${rich(it.steps[si].t)}<br><small>اختاري الشكل</small></div>`}`).join('')}</div></div>
    ${g ? '<div class="fb ok">✔ مخطط صحيح!</div>' : '<button class="btn g chk" style="margin-top:8px">✔ تحققي من المخطط</button><div class="fbw"></div>'}`;
    if (g) return;
    $$('select', bb).forEach(s => s.onchange = () => { shp[+s.dataset.si] = s.value; paint(); });
    $$('.up', bb).forEach(b => b.onclick = () => { const p = +b.dataset.p; [order[p - 1], order[p]] = [order[p], order[p - 1]]; paint(); });
    $$('.dn', bb).forEach(b => b.onclick = () => { const p = +b.dataset.p; [order[p + 1], order[p]] = [order[p], order[p + 1]]; paint(); });
    $('.chk', bb).onclick = () => {
      const badO = order.findIndex((si, p) => si !== p), badS = it.steps.findIndex((s, j) => shp[j] !== s.s);
      if (badO < 0 && badS < 0) { beep(1); g = { d: {} }; done(Math.max(4, 10 - tries * 2), { tries }); paint(); return; }
      beep(0); tries++;
      $('.fbw', bb).innerHTML = `<div class="fb no">${badO >= 0 ? `الخطوة رقم ${ar(badO + 1)} ليست في مكانها. ` : ''}${badS >= 0 ? `شكل «${esc(it.steps[badS].t)}» غير مناسب: تذكّري ${SHAPES[it.steps[badS].s][0]} لـ${SHAPES[it.steps[badS].s][1]}.` : ''}</div>`;
    };
  };
  let tries = 0; paint();
}
function writeItem(bb, it, g, done) {
  bb.innerHTML = `<textarea class="in" rows="${it.rows || 5}" placeholder="${esc(it.ph || 'اكتبي إجابتكِ هنا، كل خطوة في سطر')}" ${g ? 'disabled' : ''}>${esc(g?.d?.text || '')}</textarea>${g ? '<div class="fb ok">✔ وصلت إجابتكِ للمعلمة</div>' : '<button class="btn g chk" style="margin-top:8px">✉ أرسلي إجابتي</button><div class="fbw"></div>'}${it.model ? `<details style="margin-top:6px"><summary class="mute">نموذج إجابة (بعد الإرسال)</summary><div class="fb info">${rich(it.model)}</div></details>` : ''}`;
  if (g) return; const det = $('details', bb); if (det) det.hidden = true;
  $('.chk', bb).onclick = () => {
    const tx = $('textarea', bb).value.trim(), lines = tx.split('\n').filter(l => l.trim()).length;
    if (lines < (it.min || 3)) return $('.fbw', bb).innerHTML = `<div class="fb info">اكتبي ${ar(it.min || 3)} خطوات على الأقل، كل خطوة في سطر.</div>`;
    beep(1); done(10, { text: tx.slice(0, 2000) }); $('textarea', bb).disabled = true; $('.chk', bb).remove(); $('.fbw', bb).innerHTML = '<div class="fb ok">✔ وصلت إجابتكِ للمعلمة</div>'; if (det) det.hidden = false;
  };
}
function codeItem(bb, it, g, done) {
  const ed = ide(bb, g?.d?.code || it.starter || '', { files: it.files });
  const row = h('<div class="row" style="margin-top:8px"><button class="btn g chk">✔ تحققي من حلّي</button>' + (it.hint ? '<button class="btn ghost hn">💡 تلميح</button>' : '') + '</div>'); bb.appendChild(row);
  const res = h('<div></div>'); bb.appendChild(res); let tries = 0;
  if (g) res.innerHTML = '<div class="fb ok">✔ حللتِ هذا التدريب من قبل. يمكنكِ التجربة بحرية.</div>';
  const hn = $('.hn', row); if (hn) hn.onclick = () => res.innerHTML = say(`<b>تلميح:</b><pre class="mono" style="background:var(--code);color:var(--codeink);border-radius:10px;padding:6px 10px;white-space:pre-wrap">${esc(it.hint)}</pre>`, 'wink', 'b');
  $('.chk', row).onclick = async () => {
    const b = $('.chk', row); b.disabled = true; b.textContent = '⏳';
    const out = $('.out', ed.el), tk = $('.tkhost', ed.el); const r = await PY.run(ed.ta.value, out, tk);
    if ((it.checks || []).some(c => c.py && c.py.includes('turtle'))) await new Promise(z => setTimeout(z, 300));
    b.disabled = false; b.textContent = '✔ تحققي من حلّي';
    if (!r.ok) { tries++; res.innerHTML = say(`<b>البرنامج فيه خطأ، صحّحيه أولًا.</b><br>${esc(r.hint || '')}`, 'think'); return; }
    const ok = it.checks.map(c => c.py ? PY.check(c.py) : c.out ? new RegExp(c.out).test(r.out) : c.lines ? r.out.split('\n').filter(x => x.trim()).length >= c.lines : true);
    res.innerHTML = `<div class="q">${it.checks.map((c, j) => `<div style="color:${ok[j] ? 'var(--g)' : 'var(--r)'}">${ok[j] ? '✔' : '✘'} ${esc(c.msg)}</div>`).join('')}</div>`;
    if (ok.every(Boolean)) { beep(1); done(Math.max(5, 10 - tries * 2), { tries, code: ed.ta.value.slice(0, 3000) }); res.appendChild(h(say('<b>رائع!</b> حلّكِ صحيح. 🌟', 'wow'))); }
    else { tries++; beep(0); }
  };
}
