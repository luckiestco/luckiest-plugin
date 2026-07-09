#!/usr/bin/env node

// Forked from PAUL Framework's installer (bin/install.js), MIT licensed.
// Rebranded for Luckiest, extended with a connection-key prompt and
// owned-skill sync from luckiest.co. See ../LICENSE-THIRD-PARTY.md.

const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const { execFileSync } = require('child_process');

// Colors
const cyan = '\x1b[36m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

// Get version from package.json
const pkg = require('../package.json');

const banner = `
${cyan}  ██╗     ██╗   ██╗ ██████╗██╗  ██╗██╗███████╗███████╗████████╗
  ██║     ██║   ██║██╔════╝██║ ██╔╝██║██╔════╝██╔════╝╚══██╔══╝
  ██║     ██║   ██║██║     █████╔╝ ██║█████╗  ███████╗   ██║
  ██║     ██║   ██║██║     ██╔═██╗ ██║██╔══╝  ╚════██║   ██║
  ███████╗╚██████╔╝╚██████╗██║  ██╗██║███████╗███████║   ██║
  ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝   ╚═╝${reset}

  Luckiest ${dim}v${pkg.version}${reset}
  Plan, go, finish. Your luckiest.co skills and tribe, inside Claude.
`;

// Parse args
const args = process.argv.slice(2);
const hasGlobal = args.includes('--global') || args.includes('-g');
const hasLocal = args.includes('--local') || args.includes('-l');
const syncOnly = args.includes('--sync-only');

// Parse --config-dir argument
function parseConfigDirArg() {
  const configDirIndex = args.findIndex(arg => arg === '--config-dir' || arg === '-c');
  if (configDirIndex !== -1) {
    const nextArg = args[configDirIndex + 1];
    if (!nextArg || nextArg.startsWith('-')) {
      console.error(`  ${yellow}--config-dir requires a path argument${reset}`);
      process.exit(1);
    }
    return nextArg;
  }
  const configDirArg = args.find(arg => arg.startsWith('--config-dir=') || arg.startsWith('-c='));
  if (configDirArg) {
    return configDirArg.split('=')[1];
  }
  return null;
}
const explicitConfigDir = parseConfigDirArg();
const hasHelp = args.includes('--help') || args.includes('-h');

console.log(banner);

// Show help if requested
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx luckiest-co [options]

  ${yellow}Options:${reset}
    ${cyan}-g, --global${reset}              Install globally (to Claude config directory)
    ${cyan}-l, --local${reset}               Install locally (to ./.claude in current directory)
    ${cyan}-c, --config-dir <path>${reset}   Specify custom Claude config directory
    ${cyan}--sync-only${reset}               Skip install, only sync owned skills from luckiest.co
    ${cyan}-h, --help${reset}                Show this help message

  ${yellow}Examples:${reset}
    ${dim}# Install to default ~/.claude directory${reset}
    npx luckiest-co --global

    ${dim}# Install to current project only${reset}
    npx luckiest-co --local

    ${dim}# Re-sync owned skills only (used by /luckiest skills)${reset}
    npx luckiest-co --sync-only

  ${yellow}What gets installed:${reset}
    commands/luckiest/   - Slash commands (/luckiest:plan, /luckiest:go, etc.)
    references/          - Vocabulary and chart-renderer references
    templates/            - Brief templates
    .claude-plugin/       - Plugin manifest

  Owned skills purchased on luckiest.co are synced to ${dim}~/.claude/skills/<name>/${reset}.
`);
  process.exit(0);
}

/**
 * Expand ~ to home directory
 */
function expandTilde(filePath) {
  if (filePath && filePath.startsWith('~/')) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
}

/**
 * Recursively copy directory, replacing paths in .md files
 */
function copyWithPathReplacement(srcDir, destDir, pathPrefix) {
  fs.mkdirSync(destDir, { recursive: true });

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyWithPathReplacement(srcPath, destPath, pathPrefix);
    } else if (entry.name.endsWith('.md')) {
      // Replace ~/.claude/ with the appropriate prefix in markdown files
      let content = fs.readFileSync(srcPath, 'utf8');
      content = content.replace(/~\/\.claude\//g, pathPrefix);
      fs.writeFileSync(destPath, content);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * ~/.luckiest/key helpers. The key is NEVER echoed to stdout/logs and is
 * only ever written to this one file, at mode 0600.
 */
function keyFilePath() {
  return path.join(os.homedir(), '.luckiest', 'key');
}

function readSavedKey() {
  try {
    const raw = fs.readFileSync(keyFilePath(), 'utf8').trim();
    return raw.length ? raw : null;
  } catch {
    return null;
  }
}

function saveKey(key) {
  const dir = path.join(os.homedir(), '.luckiest');
  fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
  const file = keyFilePath();
  fs.writeFileSync(file, `${key}\n`, { mode: 0o600 });
  try {
    fs.chmodSync(file, 0o600);
  } catch {
    // best effort on platforms without chmod semantics
  }
}

/**
 * Prompt for the connection key. Input is not masked (no new dependency
 * for that), but the value is never printed back and never logged.
 */
function promptKey() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(
      `  Paste your luckiest.co connection key (starts with lk_mcp_), or press Enter to skip: `,
      (answer) => {
        rl.close();
        resolve(answer.trim());
      }
    );
  });
}

function apiBaseUrl() {
  return (process.env.LUCKIEST_API_URL || 'https://api.luckiest.co').replace(/\/$/, '');
}

function hasUnzip() {
  try {
    execFileSync('unzip', ['-v'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Sync owned skills from luckiest.co into ~/.claude/skills/<name>/.
 * Never logs the key or the Authorization header.
 */
async function syncSkills() {
  const key = readSavedKey();
  if (!key) {
    console.log(`  ${dim}No luckiest.co connection key saved yet. Run ${cyan}npx luckiest-co${dim} and paste one to sync your owned skills.${reset}`);
    return;
  }

  const base = apiBaseUrl();
  console.log(`  Syncing owned skills from ${cyan}${base}${reset}...\n`);

  let skills;
  try {
    const res = await fetch(`${base}/api/skills/owned`, {
      headers: { Authorization: `Bearer ${key}` }
    });
    if (!res.ok) {
      console.log(`  ${yellow}Could not fetch owned skills (HTTP ${res.status}). Skipping sync.${reset}`);
      return;
    }
    const body = await res.json();
    skills = Array.isArray(body) ? body : body.skills;
  } catch (err) {
    console.log(`  ${yellow}Could not reach luckiest.co to sync skills: ${err.message}${reset}`);
    return;
  }

  if (!skills || skills.length === 0) {
    console.log(`  ${dim}No owned skills found for this key.${reset}`);
    return;
  }

  const skillsRoot = path.join(os.homedir(), '.claude', 'skills');
  fs.mkdirSync(skillsRoot, { recursive: true });
  const unzipAvailable = hasUnzip();

  const results = [];

  for (const skill of skills) {
    const { name, version, downloadUrl } = skill || {};
    if (!name || !downloadUrl) {
      console.log(`  ${yellow}Skipping a skill entry with missing name or downloadUrl.${reset}`);
      continue;
    }

    // Sanitize skill name to prevent path traversal attacks
    const safeName = path.basename(String(name || ''));
    if (!safeName || safeName === '.' || safeName === '..' || safeName !== name) {
      console.warn(`  ${yellow}Skipping skill with unsafe name: ${name}${reset}`);
      continue;
    }

    try {
      const zipRes = await fetch(downloadUrl);
      if (!zipRes.ok) {
        throw new Error(`download failed (HTTP ${zipRes.status})`);
      }
      const buf = Buffer.from(await zipRes.arrayBuffer());

      if (unzipAvailable) {
        const dest = path.join(skillsRoot, safeName);
        fs.mkdirSync(dest, { recursive: true });
        const tmpZip = path.join(os.tmpdir(), `luckiest-skill-${safeName}-${Date.now()}.zip`);
        fs.writeFileSync(tmpZip, buf);
        try {
          execFileSync('unzip', ['-q', '-o', tmpZip, '-d', dest]);
          results.push({ name, version: version || 'unknown', path: dest });
        } finally {
          fs.unlinkSync(tmpZip);
        }
      } else {
        const zipPath = path.join(skillsRoot, `${safeName}.zip`);
        fs.writeFileSync(zipPath, buf);
        results.push({ name, version: version || 'unknown', path: `${zipPath} (unzip manually, unzip not found on PATH)` });
      }
    } catch (err) {
      console.log(`  ${yellow}Warning: failed to install skill "${name}": ${err.message}${reset}`);
    }
  }

  if (results.length === 0) {
    console.log(`  ${yellow}No skills were installed.${reset}`);
    return;
  }

  console.log(`\n  ${green}Skill sync summary:${reset}`);
  const nameWidth = Math.max(4, ...results.map(r => r.name.length));
  const versionWidth = Math.max(7, ...results.map(r => r.version.length));
  console.log(`  ${'Name'.padEnd(nameWidth)}  ${'Version'.padEnd(versionWidth)}  Path`);
  for (const r of results) {
    console.log(`  ${r.name.padEnd(nameWidth)}  ${r.version.padEnd(versionWidth)}  ${r.path}`);
  }
  console.log('');
}

/**
 * Install to the specified directory
 */
function install(isGlobal) {
  const src = path.join(__dirname, '..');
  const configDir = expandTilde(explicitConfigDir) || expandTilde(process.env.CLAUDE_CONFIG_DIR);
  const defaultGlobalDir = configDir || path.join(os.homedir(), '.claude');
  const claudeDir = isGlobal
    ? defaultGlobalDir
    : path.join(process.cwd(), '.claude');

  const locationLabel = isGlobal
    ? claudeDir.replace(os.homedir(), '~')
    : claudeDir.replace(process.cwd(), '.');

  // Path prefix for file references
  const pathPrefix = isGlobal
    ? (configDir ? `${claudeDir}/` : '~/.claude/')
    : './.claude/';

  console.log(`  Installing to ${cyan}${locationLabel}${reset}\n`);

  // Copy commands/luckiest into commands/luckiest
  const commandsDir = path.join(claudeDir, 'commands');
  fs.mkdirSync(commandsDir, { recursive: true });

  const commandsSrc = path.join(src, 'commands', 'luckiest');
  const commandsDest = path.join(commandsDir, 'luckiest');
  if (fs.existsSync(commandsSrc)) {
    copyWithPathReplacement(commandsSrc, commandsDest, pathPrefix);
    console.log(`  ${green}✓${reset} Installed commands/luckiest`);
  }

  // Copy references/, templates/, .claude-plugin/ into the target root
  const topLevelDirs = ['references', 'templates', 'skills', '.claude-plugin'];
  for (const dir of topLevelDirs) {
    const dirSrc = path.join(src, dir);
    const dirDest = path.join(claudeDir, dir);
    if (fs.existsSync(dirSrc)) {
      copyWithPathReplacement(dirSrc, dirDest, pathPrefix);
      console.log(`  ${green}✓${reset} Installed ${dir}`);
    }
  }

  console.log(`
  ${green}Done!${reset} Launch Claude Code and run ${cyan}/luckiest:plan${reset}.
`);
}

/**
 * Prompt for install location
 */
function promptLocation() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const configDir = expandTilde(explicitConfigDir) || expandTilde(process.env.CLAUDE_CONFIG_DIR);
    const globalPath = configDir || path.join(os.homedir(), '.claude');
    const globalLabel = globalPath.replace(os.homedir(), '~');

    console.log(`  ${yellow}Where would you like to install?${reset}

  ${cyan}1${reset}) Global ${dim}(${globalLabel})${reset}, available in all projects
  ${cyan}2${reset}) Local  ${dim}(./.claude)${reset}, this project only
`);

    rl.question(`  Choice ${dim}[1]${reset}: `, (answer) => {
      rl.close();
      const choice = answer.trim() || '1';
      resolve(choice !== '2');
    });
  });
}

async function main() {
  if (syncOnly) {
    await syncSkills();
    return;
  }

  if (hasGlobal && hasLocal) {
    console.error(`  ${yellow}Cannot specify both --global and --local${reset}`);
    process.exit(1);
  }

  let isGlobal;
  if (explicitConfigDir && hasLocal) {
    console.error(`  ${yellow}Cannot use --config-dir with --local${reset}`);
    process.exit(1);
  } else if (hasGlobal) {
    isGlobal = true;
  } else if (hasLocal) {
    isGlobal = false;
  } else {
    isGlobal = await promptLocation();
  }

  install(isGlobal);

  const alreadyHasKey = !!readSavedKey();
  if (!alreadyHasKey) {
    const key = await promptKey();
    if (key) {
      if (!key.startsWith('lk_mcp_')) {
        console.log(`  ${yellow}That doesn't look like a luckiest.co key (expected lk_mcp_...), but saving it anyway.${reset}`);
      }
      saveKey(key);
      console.log(`  ${green}✓${reset} Key saved to ${dim}~/.luckiest/key${reset}\n`);
    } else {
      console.log(`  ${dim}Skipped. Run ${cyan}npx luckiest-co --sync-only${dim} later once you have a key.${reset}\n`);
    }
  }

  await syncSkills();
}

main().catch((err) => {
  console.error(`  ${red}Install failed: ${err.message}${reset}`);
  process.exit(1);
});
