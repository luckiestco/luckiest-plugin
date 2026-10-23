#!/usr/bin/env node

// PR check: a PR that changes what ships in luckiest-co must also bump it
// (`npm run bump`), because merging to main is what releases it
// (.github/workflows/release.yml). CI never commits a bump to main itself.

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PKG_DIR = 'packages/luckiest-plugin/';
const VERSION_RE = /"version":\s*"(\d+\.\d+\.\d+)"/;
// Files in the package dir that npm does not ship (see "files" in package.json).
const NOT_SHIPPED = [/^bin\/.*\.test\.js$/, /^bin\/check-version\.js$/, /^bin\/release-check\.js$/];

const shipped = (file) =>
  file.startsWith(PKG_DIR) && !NOT_SHIPPED.some((re) => re.test(file.slice(PKG_DIR.length)));

const newer = (a, b) => {
  const [x, y] = [a, b].map((v) => v.split('.').map(Number));
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i];
  return false;
};

/** Returns { ok, message }. Network trouble warns and passes, like check-version.js. */
async function releaseCheck({ changed, versions, name = 'luckiest-co', fetchImpl = fetch }) {
  const touched = changed.filter(shipped);
  if (!touched.length) return { ok: true, message: 'No shipped plugin files changed. No bump needed.' };
  if (versions.plugin !== versions.market) {
    return { ok: false, message: `plugin.json (${versions.plugin}) and marketplace.json (${versions.market}) disagree. Run "npm run bump" from a clean state, or fix them by hand.` };
  }
  let latest;
  try {
    const res = await fetchImpl(`https://registry.npmjs.org/${name}/latest`);
    if (res.status === 404) return { ok: true, message: `${name} is not on npm yet.` };
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    latest = (await res.json()).version;
  } catch (err) {
    // ponytail: fail open; the release workflow's check-version still refuses a duplicate.
    return { ok: true, message: `Could not check npm (${err.message}). Skipping the bump check.` };
  }
  if (!newer(versions.npm, latest)) {
    return {
      ok: false,
      message: `${touched.length} shipped file(s) changed but ${name} is still ${versions.npm} (npm has ${latest}). Merging releases this package, so run "cd ${PKG_DIR} && npm run bump" and add notes under the new CHANGELOG header.`,
    };
  }
  return { ok: true, message: `${name} ${versions.npm} is ahead of npm ${latest}. This PR releases on merge.` };
}

if (require.main === module) {
  const dir = path.join(__dirname, '..');
  // First "version" in the file, same rule as bump-version.js: marketplace.json
  // nests it under plugins[0].
  const version = (f) => (fs.readFileSync(path.join(dir, f), 'utf8').match(VERSION_RE) || [])[1];
  const base = process.argv[2] || 'origin/main';
  const changed = execFileSync('git', ['diff', '--name-only', `${base}...HEAD`], { encoding: 'utf8' }).split('\n').filter(Boolean);
  releaseCheck({
    changed,
    versions: { npm: version('package.json'), plugin: version('.claude-plugin/plugin.json'), market: version('.claude-plugin/marketplace.json') },
  }).then(({ ok, message }) => {
    console.log(`  ${message}`);
    if (!ok) process.exit(1);
  });
}

module.exports = { releaseCheck, shipped, VERSION_RE };
