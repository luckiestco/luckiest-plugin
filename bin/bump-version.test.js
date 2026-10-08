// Run: node --test packages/luckiest-plugin/bin/bump-version.test.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { bumpVersion } = require('./bump-version.js');

function fixture({ plugin = '0.1.34', market = '0.1.34', changelog = '## 0.1.34 — 2026-10-07 (npm luckiest-co 1.0.35)\nOld notes.\n' } = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bump-'));
  fs.mkdirSync(path.join(dir, '.claude-plugin'));
  fs.writeFileSync(path.join(dir, 'package.json'), '{\n  "name": "luckiest-co",\n  "version": "1.0.35"\n}\n');
  fs.writeFileSync(path.join(dir, '.claude-plugin/plugin.json'), `{\n  "name": "luckiest",\n  "version": "${plugin}"\n}\n`);
  fs.writeFileSync(path.join(dir, '.claude-plugin/marketplace.json'), `{\n  "plugins": [\n    { "name": "luckiest", "version": "${market}" }\n  ]\n}\n`);
  fs.writeFileSync(path.join(dir, 'CHANGELOG.md'), changelog);
  const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');
  return { dir, read };
}

test('bumps all three versions and adds a dated header on top', () => {
  const { dir, read } = fixture();
  assert.deepStrictEqual(bumpVersion({ dir, date: '2026-10-08' }), { npm: '1.0.36', plugin: '0.1.35' });
  assert.match(read('package.json'), /"version": "1\.0\.36"/);
  assert.match(read('.claude-plugin/plugin.json'), /"version": "0\.1\.35"/);
  assert.match(read('.claude-plugin/marketplace.json'), /"version": "0\.1\.35"/);
  assert.strictEqual(read('CHANGELOG.md'), '## 0.1.35 — 2026-10-08 (npm luckiest-co 1.0.36)\n\n## 0.1.34 — 2026-10-07 (npm luckiest-co 1.0.35)\nOld notes.\n');
});

test('an Unreleased section becomes the dated header, notes kept', () => {
  const { dir, read } = fixture({ changelog: '## Unreleased\n- New thing.\n\n## 0.1.34 — 2026-10-07 (npm luckiest-co 1.0.35)\n' });
  bumpVersion({ dir, date: '2026-10-08' });
  assert.strictEqual(read('CHANGELOG.md'), '## 0.1.35 — 2026-10-08 (npm luckiest-co 1.0.36)\n- New thing.\n\n## 0.1.34 — 2026-10-07 (npm luckiest-co 1.0.35)\n');
});

test('mismatched plugin versions throw and write nothing', () => {
  const { dir, read } = fixture({ market: '0.1.33' });
  const before = ['package.json', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', 'CHANGELOG.md'].map(read);
  assert.throws(() => bumpVersion({ dir, date: '2026-10-08' }), /disagree/);
  assert.deepStrictEqual(['package.json', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json', 'CHANGELOG.md'].map(read), before);
});
