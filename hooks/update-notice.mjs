#!/usr/bin/env node
// SessionStart hook: at most once every 7 days, compare this plugin's version to
// the published one and, only when behind, show one line in chat. Silent when
// current, when checked recently, or on any failure. Sends nothing: one GET of a
// public file.
// ponytail: marketplace installs only (registered via hooks.json). npx installs
// already self-update daily through `npx luckiest-co@latest --sync-only`, so the
// installer does not register this.

import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MANIFEST_URL =
  process.env.LUCKIEST_PLUGIN_MANIFEST_URL ||
  "https://raw.githubusercontent.com/luckiestco/luckiest-plugin/main/.claude-plugin/plugin.json";
const STAMP = join(homedir(), ".luckiest", "last-update-check");

const root = process.env.CLAUDE_PLUGIN_ROOT || join(dirname(fileURLToPath(import.meta.url)), "..");

// Numeric major.minor.patch only, same rule as check_updates' cmpSemver.
export const newer = (a, b) => {
  const pa = String(a).split(".").map((n) => parseInt(n, 10) || 0);
  const pb = String(b).split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < 3; i++) if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0);
  return false;
};

async function main() {
  try {
    if (Date.now() - statSync(STAMP).mtimeMs < WEEK_MS) return;
  } catch {
    /* no stamp yet */
  }
  const installed = JSON.parse(readFileSync(join(root, ".claude-plugin", "plugin.json"), "utf8")).version;
  const res = await fetch(MANIFEST_URL, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) return;
  const latest = (await res.json()).version;
  mkdirSync(dirname(STAMP), { recursive: true });
  writeFileSync(STAMP, String(Date.now()));
  if (!installed || !latest || !newer(latest, installed)) return;
  const msg = `Luckiest ${latest} is available (you have ${installed}). Update the luckiest plugin from /plugin to get it.`;
  process.stdout.write(
    JSON.stringify({
      systemMessage: msg,
      hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: msg },
    }),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main().catch(() => {});
  process.exit(0);
}
