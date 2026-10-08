#!/usr/bin/env node

// prepublishOnly guard: stop `npm publish` before it fails late (or after web
// auth) on a version that is already on the registry.

const yellow = '\x1b[33m';
const red = '\x1b[31m';
const reset = '\x1b[0m';

const BUMP_FILES = [
  'package.json',
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
  'CHANGELOG.md',
];

/** Returns { ok, message }. ok is false only when the version is already published. */
async function checkVersion({ name, version, fetchImpl = fetch }) {
  let versions;
  try {
    const res = await fetchImpl(`https://registry.npmjs.org/${name}`);
    if (res.status === 404) return { ok: true, message: `${name} is not on npm yet.` };
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    versions = (await res.json()).versions || {};
  } catch (err) {
    // ponytail: fail open, npm publish itself still rejects a duplicate version.
    return { ok: true, message: `${yellow}Could not check npm (${err.message}). Publishing anyway.${reset}` };
  }
  if (versions[version]) {
    return {
      ok: false,
      message: `${red}${name}@${version} is already published.${reset} Run "npm run bump" (it updates ${BUMP_FILES.join(', ')}), then publish again.`,
    };
  }
  return { ok: true, message: `${name}@${version} is not published yet.` };
}

if (require.main === module) {
  const { name, version } = require('../package.json');
  checkVersion({ name, version }).then(({ ok, message }) => {
    console.log(`  ${message}`);
    if (!ok) process.exit(1);
  });
}

module.exports = { checkVersion };
