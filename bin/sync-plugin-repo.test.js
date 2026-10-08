// Run: node --test packages/luckiest-plugin/bin/sync-plugin-repo.test.js
const test = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { syncPluginRepo } = require('./sync-plugin-repo.js');

function writeFiles(dir, files) {
  for (const [f, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
    fs.writeFileSync(path.join(dir, f), body);
  }
}

const manifest = (v) => JSON.stringify({ name: 'luckiest', version: v });

// A local git repo standing in for luckiestco/luckiest-plugin, so no network is touched.
function fixture({ remoteVersion }) {
  const src = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-src-'));
  writeFiles(src, {
    'package.json': JSON.stringify({ name: 'luckiest-co', version: '1.0.36' }),
    '.claude-plugin/plugin.json': manifest('0.1.35'),
    'README.md': 'new readme\n',
    'skills/new/SKILL.md': 'new skill\n',
  });
  const remote = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-remote-'));
  writeFiles(remote, {
    'package.json': JSON.stringify({ name: 'luckiest-co', version: '1.0.35' }),
    '.claude-plugin/plugin.json': manifest(remoteVersion),
    'README.md': 'old readme\n',
    'skills/stale/SKILL.md': 'removed skill\n',
  });
  const git = (...args) => execFileSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', ...args], { cwd: remote, stdio: 'ignore' });
  git('init', '-q');
  git('add', '-A');
  git('commit', '-qm', 'init');
  return { src, remote };
}

test('dry run mirrors the package: changed, added, and removed files, nothing pushed', () => {
  const { src, remote } = fixture({ remoteVersion: '0.1.34' });
  const r = syncPluginRepo({ src, remote, dryRun: true });
  assert.strictEqual(r.status, 'dry-run');
  const changes = r.changes.join('\n');
  assert.match(changes, /M \.claude-plugin\/plugin\.json/);
  assert.match(changes, /M README\.md/);
  assert.match(changes, /\?\? skills\/new\//);
  assert.match(changes, /D skills\/stale\/SKILL\.md/);
  assert.strictEqual(fs.readFileSync(path.join(r.dir, 'README.md'), 'utf8'), 'new readme\n');
  assert.strictEqual(execFileSync('git', ['branch', '--list'], { cwd: remote, encoding: 'utf8' }).match(/sync-/), null);
});

test('same plugin version is already synced and changes nothing', () => {
  const { src, remote } = fixture({ remoteVersion: '0.1.35' });
  const r = syncPluginRepo({ src, remote, dryRun: true });
  assert.strictEqual(r.status, 'synced');
  assert.strictEqual(fs.readFileSync(path.join(r.dir, 'README.md'), 'utf8'), 'old readme\n');
});
