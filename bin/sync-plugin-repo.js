#!/usr/bin/env node

// Plugin repo sync: mirrors this package into the public marketplace repo
// (luckiestco/luckiest-plugin) and opens a PR there. Run after the release is
// bumped and published. --dry-run stops before anything is pushed.

const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

const REPO = process.env.LUCKIEST_PLUGIN_REPO || 'luckiestco/luckiest-plugin';

const sh = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trimEnd();
const versionOf = (dir, file) => JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')).version;

/** Returns { status: 'synced' | 'dry-run' | 'pr', dir, changes, url }. */
function syncPluginRepo({ src = path.join(__dirname, '..'), remote = `https://github.com/${REPO}.git`, dryRun = false } = {}) {
  const plugin = versionOf(src, '.claude-plugin/plugin.json');
  const npm = versionOf(src, 'package.json');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'luckiest-plugin-sync-'));
  sh('git', ['clone', '--depth', '1', remote, dir]);

  if (versionOf(dir, '.claude-plugin/plugin.json') === plugin) return { status: 'synced', dir, changes: [] };

  // --checksum: a same-size edit with a matching mtime is otherwise skipped (a version bump is same-size).
  sh('rsync', ['-a', '--checksum', '--delete', '--exclude', '.git', '--exclude', '.DS_Store', '--exclude', '__pycache__', `${src}/`, `${dir}/`]);
  const changes = sh('git', ['status', '--porcelain'], dir).split('\n').filter(Boolean);
  if (dryRun) return { status: 'dry-run', dir, changes };

  const branch = `sync-${plugin}`;
  const title = `Sync plugin ${plugin} (npm luckiest-co ${npm})`;
  sh('git', ['switch', '-c', branch], dir);
  sh('git', ['add', '-A'], dir);
  sh('git', ['commit', '-m', title], dir);
  sh('git', ['push', '-u', 'origin', branch], dir);
  const url = sh('gh', ['pr', 'create', '--repo', REPO, '--head', branch, '--title', title, '--body', `Mirrors packages/luckiest-plugin at plugin ${plugin}.`], dir);
  return { status: 'pr', dir, changes, url };
}

if (require.main === module) {
  try {
    const { status, dir, changes, url } = syncPluginRepo({ dryRun: process.argv.includes('--dry-run') });
    if (status === 'synced') console.log(`  ${green}${REPO} already has this plugin version.${reset}`);
    if (status === 'dry-run') console.log(`  ${yellow}Dry run, nothing pushed.${reset} ${changes.length} changed files in ${dir}:\n${changes.map((c) => `    ${c}`).join('\n')}`);
    if (status === 'pr') console.log(`  ${green}Opened ${url}${reset}`);
  } catch (err) {
    console.error(`  ${(err.stderr || err.message).toString().trim()}`);
    process.exit(1);
  }
}

module.exports = { syncPluginRepo };
