#!/usr/bin/env node

// Release bump: patch-bumps the npm version and the plugin version, then dates
// the CHANGELOG (turns "## Unreleased" into the release header, or adds one).

const fs = require('fs');
const path = require('path');

const green = '\x1b[32m';
const reset = '\x1b[0m';

const VERSION_RE = /("version":\s*")(\d+)\.(\d+)\.(\d+)(")/;

const patch = (v) => v.replace(/\d+$/, (n) => Number(n) + 1);

/** Bumps all four release files in dir. Returns { npm, plugin }. Writes nothing if the plugin versions disagree. */
function bumpVersion({ dir = path.join(__dirname, '..'), date = new Date().toLocaleDateString('en-CA') } = {}) {
  const files = {
    pkg: path.join(dir, 'package.json'),
    plugin: path.join(dir, '.claude-plugin/plugin.json'),
    market: path.join(dir, '.claude-plugin/marketplace.json'),
    changelog: path.join(dir, 'CHANGELOG.md'),
  };
  const text = Object.fromEntries(Object.entries(files).map(([k, f]) => [k, fs.readFileSync(f, 'utf8')]));
  const current = (k) => {
    const m = text[k].match(VERSION_RE);
    if (!m) throw new Error(`No version found in ${files[k]}`);
    return `${m[2]}.${m[3]}.${m[4]}`;
  };

  const oldPlugin = current('plugin');
  if (current('market') !== oldPlugin) {
    throw new Error(`plugin.json (${oldPlugin}) and marketplace.json (${current('market')}) disagree. Fix them by hand first.`);
  }
  const npm = patch(current('pkg'));
  const plugin = patch(oldPlugin);

  // ponytail: replaces the first "version" in each file, which is the right one in all three today.
  const write = (k, v) => fs.writeFileSync(files[k], text[k].replace(VERSION_RE, `$1${v}$5`));
  write('pkg', npm);
  write('plugin', plugin);
  write('market', plugin);
  // An "## Unreleased" section becomes the dated header, notes and all. Otherwise a fresh header goes on top.
  const header = `## ${plugin} — ${date} (npm luckiest-co ${npm})`;
  const unreleased = /^## Unreleased$/m;
  fs.writeFileSync(files.changelog, unreleased.test(text.changelog)
    ? text.changelog.replace(unreleased, header)
    : `${header}\n\n${text.changelog}`);
  return { npm, plugin };
}

if (require.main === module) {
  try {
    const { npm, plugin } = bumpVersion();
    console.log(`  ${green}Bumped to npm luckiest-co ${npm}, plugin ${plugin}.${reset} Check the notes under the new CHANGELOG.md header.`);
  } catch (err) {
    console.error(`  ${err.message}`);
    process.exit(1);
  }
}

module.exports = { bumpVersion };
