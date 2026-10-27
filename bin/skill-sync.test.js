// Run: node --test packages/luckiest-plugin/bin/skill-sync.test.js
// Plugin skills are hand copies of packages/luckiest-skills/luckiest-<name>/. A fix
// that lands only in the source never reaches plugin or npm users, so each copy
// must match its source byte for byte, except SKILL.md line 2 (the short name).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.join(__dirname, '..');
const sources = path.join(root, '..', 'luckiest-skills');

// ponytail: #182 copied these over with their long names; drop each once its short name is restored.
const LONG_NAME = ['video-studio', 'video-studio-art-director', 'video-studio-director'];

function files(dir, rel = '') {
  return fs.readdirSync(path.join(dir, rel), { withFileTypes: true }).flatMap((e) => {
    const p = path.join(rel, e.name);
    if (e.name === '__pycache__' || e.name.endsWith('.pyc')) return [];
    return e.isDirectory() ? files(dir, p) : [p];
  });
}

// Relative paths that are missing, extra, or different in the copy, whose
// SKILL.md line 2 should read `name: <name>`.
function staleFiles(src, copy, name) {
  const a = files(src);
  const b = files(copy);
  const out = b.filter((f) => !a.includes(f));
  for (const f of a) {
    if (!b.includes(f)) { out.push(f); continue; }
    let want = fs.readFileSync(path.join(src, f));
    if (f === 'SKILL.md') {
      const lines = want.toString('utf8').split('\n');
      if (lines[1].startsWith('name: ')) lines[1] = `name: ${name}`;
      want = Buffer.from(lines.join('\n'), 'utf8');
    }
    if (!want.equals(fs.readFileSync(path.join(copy, f)))) out.push(f);
  }
  return out.sort();
}

test('every plugin skill with a source matches it', () => {
  const stale = [];
  for (const name of fs.readdirSync(path.join(root, 'skills'))) {
    const src = path.join(sources, `luckiest-${name}`);
    if (!fs.existsSync(src)) continue;
    const bad = staleFiles(src, path.join(root, 'skills', name), LONG_NAME.includes(name) ? `luckiest-${name}` : name);
    if (bad.length) stale.push(`  ${name}: ${bad.join(', ')}\n` +
      `    rsync -ac --delete --exclude __pycache__ packages/luckiest-skills/luckiest-${name}/ packages/luckiest-plugin/skills/${name}/`);
  }
  assert.strictEqual(stale.length, 0,
    `Plugin skills out of sync with their sources:\n${stale.join('\n')}\n` +
    'Then restore line 2 of each SKILL.md to the short "name: <name>", then run npm run bump in packages/luckiest-plugin.');
});

test('the check flags a changed, a missing, and an extra file but not the short name', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'skill-sync-'));
  const src = path.join(tmp, 'luckiest-x');
  const copy = path.join(tmp, 'x');
  for (const d of [src, copy, path.join(copy, '__pycache__')]) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(src, 'SKILL.md'), '---\nname: luckiest-x\n---\n');
  fs.writeFileSync(path.join(copy, 'SKILL.md'), '---\nname: x\n---\n');
  fs.writeFileSync(path.join(src, 'a.md'), 'new');
  fs.writeFileSync(path.join(copy, 'a.md'), 'old');
  fs.writeFileSync(path.join(src, 'b.md'), 'only in source');
  fs.writeFileSync(path.join(copy, 'c.md'), 'only in copy');
  fs.writeFileSync(path.join(copy, '__pycache__', 'm.pyc'), 'ignored');
  try {
    assert.deepStrictEqual(staleFiles(src, copy, 'x'), ['a.md', 'b.md', 'c.md']);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
