#!/usr/bin/env node
// Build a self-contained review page for a shot set. One card per shot with a
// Keep / Reshoot pick and a notes box, plus notes for the whole set. Notes save
// in the browser as you type; "Export notes" downloads review-notes.json, which
// the skill reads back (or "Copy notes" to paste them into chat).
//
// Usage:
//   node build_review.mjs <shots-dir> [--output review.html] [--title "Brand shots"]

import { readdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, join, relative, basename, extname } from "node:path";
import { argv, exit } from "node:process";

const args = argv.slice(2);
if (args.length === 0 || args.includes("--help")) {
  console.log('Usage: node build_review.mjs <shots-dir> [--output review.html] [--title "Brand shots"]');
  exit(args.length === 0 ? 1 : 0);
}
const opts = { dir: null, output: null, title: "Shot review" };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--output" || a === "-o") opts.output = args[++i];
  else if (a === "--title") opts.title = args[++i];
  else if (!opts.dir) opts.dir = a;
}

const dir = resolve(opts.dir);
const outPath = resolve(opts.output ?? join(dirname(dir), "review.html"));
const outDir = dirname(outPath);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// Same rule as contact_sheet.py: images sorted by name, minus the contact sheet
// and the raw A/B variants (NN-name-a.png), so raw/ shows only the picks.
const shots = readdirSync(dir)
  .filter((f) => /\.(png|jpe?g|webp)$/i.test(f) && !f.startsWith("contact-sheet") && !/-[a-z]\.\w+$/.test(f))
  .sort();
if (!shots.length) { console.error(`no images in ${dir}`); exit(1); }

const cards = shots.map((f) => {
  const src = encodeURI(relative(outDir, join(dir, f)));
  const name = esc(basename(f, extname(f)));
  return `<article class="card" data-file="${esc(f)}">
  <a href="${src}" target="_blank"><img src="${src}" alt="${name}" loading="lazy"></a>
  <div class="row"><b>${name}</b>
    <span class="pick"><label><input type="radio" name="v-${esc(f)}" value="keep"> Keep</label>
    <label><input type="radio" name="v-${esc(f)}" value="reshoot"> Reshoot</label></span></div>
  <textarea placeholder="Notes on this shot"></textarea>
</article>`;
}).join("\n");

// Key notes by page path so two runs never share notes (file:// pages share one origin).
const storeKey = `brandkit-review:${outPath}`;

const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(opts.title)}</title>
<style>
  :root{--bg:#0d1117;--panel:#161b22;--line:#30363d;--green:#3fb950;--red:#f85149;--text:#e6edf3;--dim:#8b949e}
  *{box-sizing:border-box} body{margin:0;background:var(--bg);color:var(--text);font:14px/1.5 -apple-system,Inter,Segoe UI,sans-serif;padding:24px 16px}
  h1{font-size:18px;margin:0 0 4px} .sub{color:var(--dim);margin-bottom:16px}
  .bar{position:sticky;top:0;z-index:1;display:flex;gap:10px;align-items:center;flex-wrap:wrap;background:var(--bg);padding:10px 0;border-bottom:1px solid var(--line);margin-bottom:18px}
  .bar .count{color:var(--dim);margin-right:auto} .saved{color:var(--green);font-size:12px}
  button{background:#21262d;color:var(--text);border:1px solid var(--line);border-radius:6px;padding:6px 12px;cursor:pointer;font:inherit} button:hover{border-color:var(--green)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:8px}
  .card.keep{border-color:var(--green)} .card.reshoot{border-color:var(--red)}
  .card img{width:100%;aspect-ratio:1;object-fit:contain;background:#000;border-radius:6px;display:block}
  .row{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap} .pick{display:flex;gap:12px;color:var(--dim)}
  textarea{width:100%;min-height:64px;resize:vertical;background:#0d1117;color:var(--text);border:1px solid var(--line);border-radius:6px;padding:8px;font:inherit}
  .set textarea{min-height:90px} .set{margin-bottom:22px}
</style></head><body>
<h1>${esc(opts.title)}</h1>
<div class="sub">${shots.length} shots from ${esc(basename(dir))}/ · click a shot to open it full size</div>
<div class="bar"><span class="count" id="count"></span><span class="saved" id="saved"></span>
  <button id="copy">Copy notes</button><button id="export">Export notes</button></div>
<section class="set"><b>Notes on the whole set</b><textarea id="setnote" placeholder="Light, palette, rhythm, anything that applies to every shot"></textarea></section>
<div class="grid">
${cards}
</div>
<script>
  const KEY = ${JSON.stringify(storeKey)};
  const cards = [...document.querySelectorAll('.card')];
  const setNote = document.getElementById('setnote');
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY)) || {}; } catch {}

  function collect() {
    return {
      page: ${JSON.stringify(basename(outPath))},
      updated: new Date().toISOString(),
      set_note: setNote.value.trim(),
      shots: cards.map(c => ({
        file: c.dataset.file,
        verdict: c.querySelector('input:checked')?.value || null,
        note: c.querySelector('textarea').value.trim(),
      })),
    };
  }
  function refresh() {
    const d = collect();
    cards.forEach((c, i) => c.className = 'card ' + (d.shots[i].verdict || ''));
    const done = d.shots.filter(s => s.verdict).length;
    document.getElementById('count').textContent = done + ' of ' + d.shots.length + ' picked · ' +
      d.shots.filter(s => s.verdict === 'reshoot').length + ' to reshoot';
    return d;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(refresh())); document.getElementById('saved').textContent = 'Saved'; }
    catch { document.getElementById('saved').textContent = 'Not saved in this browser. Export before closing.'; }
  }

  setNote.value = saved.set_note || '';
  for (const c of cards) {
    const s = (saved.shots || []).find(s => s.file === c.dataset.file) || {};
    c.querySelector('textarea').value = s.note || '';
    if (s.verdict) c.querySelector('input[value="' + s.verdict + '"]').checked = true;
  }
  refresh();
  document.addEventListener('input', save);

  document.getElementById('export').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(collect(), null, 2)], { type: 'application/json' }));
    a.download = 'review-notes.json';
    a.click();
  };
  document.getElementById('copy').onclick = async () => {
    const t = JSON.stringify(collect(), null, 2);
    try { await navigator.clipboard.writeText(t); document.getElementById('saved').textContent = 'Copied'; }
    catch { prompt('Copy your notes:', t); }
  };
</script>
</body></html>`;

writeFileSync(outPath, html);
console.log(JSON.stringify({ review: outPath, shots: shots.length }, null, 2));
