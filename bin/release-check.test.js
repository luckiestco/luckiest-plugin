// Run: node --test packages/luckiest-plugin/bin/release-check.test.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { releaseCheck, shipped, VERSION_RE } = require('./release-check.js');

const npmLatest = (version) => async () => ({ status: 200, ok: true, json: async () => ({ version }) });
const v = (npm, plugin = '0.1.50', market = plugin) => ({ npm, plugin, market });
const SKILL = 'packages/luckiest-plugin/skills/plan/SKILL.md';

test('only shipped plugin files count', () => {
  assert.ok(shipped(SKILL));
  assert.ok(shipped('packages/luckiest-plugin/bin/install.js'));
  assert.ok(!shipped('packages/luckiest-plugin/bin/install.test.js'));
  assert.ok(!shipped('packages/luckiest-plugin/bin/check-version.js'));
  assert.ok(!shipped('packages/luckiest-skills/luckiest-plan/SKILL.md'));
  assert.ok(!shipped('server/server.js'));
});

test('no shipped change passes without asking npm', async () => {
  const r = await releaseCheck({ changed: ['server/x.js', 'packages/luckiest-plugin/bin/x.test.js'], versions: v('1.0.50'), fetchImpl: () => { throw new Error('should not fetch'); } });
  assert.ok(r.ok);
});

test('shipped change without a bump fails, with a bump passes', async () => {
  const stale = await releaseCheck({ changed: [SKILL], versions: v('1.0.50'), fetchImpl: npmLatest('1.0.50') });
  assert.strictEqual(stale.ok, false);
  assert.match(stale.message, /npm run bump/);
  assert.ok((await releaseCheck({ changed: [SKILL], versions: v('1.0.51'), fetchImpl: npmLatest('1.0.50') })).ok);
  // Numeric compare, not string: 1.0.10 is ahead of 1.0.9.
  assert.ok((await releaseCheck({ changed: [SKILL], versions: v('1.0.10'), fetchImpl: npmLatest('1.0.9') })).ok);
  assert.strictEqual((await releaseCheck({ changed: [SKILL], versions: v('1.0.9'), fetchImpl: npmLatest('1.0.10') })).ok, false);
});

test('plugin and marketplace versions must agree', async () => {
  const r = await releaseCheck({ changed: [SKILL], versions: v('1.0.51', '0.1.50', '0.1.49'), fetchImpl: npmLatest('1.0.50') });
  assert.strictEqual(r.ok, false);
  assert.match(r.message, /disagree/);
});

test('npm down warns and passes', async () => {
  const r = await releaseCheck({ changed: [SKILL], versions: v('1.0.50'), fetchImpl: async () => { throw new Error('offline'); } });
  assert.ok(r.ok);
  assert.match(r.message, /Could not check npm \(offline\)/);
});

test('reads the version from each real release file, including the nested marketplace one', () => {
  for (const f of ['package.json', '.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']) {
    const m = fs.readFileSync(path.join(__dirname, '..', f), 'utf8').match(VERSION_RE);
    assert.ok(m && /^\d+\.\d+\.\d+$/.test(m[1]), f);
  }
});
