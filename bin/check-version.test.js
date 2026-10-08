// Run: node --test packages/luckiest-plugin/bin/check-version.test.js
const test = require('node:test');
const assert = require('node:assert');
const { checkVersion } = require('./check-version.js');

const registry = (status, body) => async () => ({ status, ok: status === 200, json: async () => body });

test('already published version blocks the publish', async () => {
  const r = await checkVersion({ name: 'x', version: '1.0.0', fetchImpl: registry(200, { versions: { '1.0.0': {} } }) });
  assert.strictEqual(r.ok, false);
  assert.match(r.message, /already published/);
});

test('unpublished version, or a package not on npm yet, passes', async () => {
  assert.ok((await checkVersion({ name: 'x', version: '1.0.1', fetchImpl: registry(200, { versions: { '1.0.0': {} } }) })).ok);
  assert.ok((await checkVersion({ name: 'x', version: '1.0.0', fetchImpl: registry(404, {}) })).ok);
});

test('unreachable registry warns and passes', async () => {
  const r = await checkVersion({ name: 'x', version: '1.0.0', fetchImpl: async () => { throw new Error('offline'); } });
  assert.ok(r.ok);
  assert.match(r.message, /Could not check npm \(offline\)/);
});
