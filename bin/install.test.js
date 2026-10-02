// Run: node --test packages/luckiest-plugin/bin/install.test.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { placeSkills } = require('./install.js');

function tree(root, files) {
  for (const [rel, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), body);
  }
}

test('bundle zip: every skill folder lands at the top level, replacing the old nested install', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'place-'));
  const x = path.join(tmp, 'x');
  const root = path.join(tmp, 'skills');
  tree(x, { 'studio/SKILL.md': 'v2', 'studio-script/SKILL.md': 's', 'notes/README.md': 'no skill' });
  tree(root, { 'studio/SKILL.md': 'v1', 'studio/studio/SKILL.md': 'nested leftover' });

  assert.deepStrictEqual(placeSkills(x, root, 'studio').sort(), ['studio', 'studio-script']);
  assert.strictEqual(fs.readFileSync(path.join(root, 'studio/SKILL.md'), 'utf8'), 'v2');
  assert.ok(fs.existsSync(path.join(root, 'studio-script/SKILL.md')));
  assert.ok(!fs.existsSync(path.join(root, 'studio/studio')), 'nested leftover removed');
  assert.ok(!fs.existsSync(path.join(root, 'notes')), 'folders without SKILL.md are skipped');
});

test('legacy zip with SKILL.md at the root installs under the listing name', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'place-'));
  const x = path.join(tmp, 'x');
  const root = path.join(tmp, 'skills');
  fs.mkdirSync(root);
  tree(x, { 'SKILL.md': 'flat', 'references/a.md': 'a' });

  assert.deepStrictEqual(placeSkills(x, root, 'legacy'), ['legacy']);
  assert.ok(fs.existsSync(path.join(root, 'legacy/references/a.md')));
});
