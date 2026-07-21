#!/usr/bin/env node
// PostToolUse(Skill) hook: records one skill-usage telemetry row per Luckiest
// skill run, deterministically — no dependence on the model remembering to call
// report_usage, and no MCP tool required. Metadata only (slug + matched/success);
// never sends prompt text or tool output. Best-effort: any failure is swallowed
// so a tracking hiccup can never break the user's skill run.
// ponytail: fire-and-forget POST; if telemetry ever needs delivery guarantees,
// queue to disk and flush on SessionStart instead.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const API = (process.env.LUCKIEST_API_URL || "https://api.luckiest.co").replace(/\/$/, "");
// Env var wins; otherwise fall back to the key the installer saves to
// ~/.luckiest/key, so usage is attributed without any settings.json env block.
const KEY = process.env.LUCKIEST_SKILL_KEY || (() => {
  try {
    return readFileSync(join(homedir(), ".luckiest", "key"), "utf8").trim();
  } catch {
    return "";
  }
})();

// The plugin's own version, read once from its manifest. Every Luckiest skill
// ships inside this one plugin and bumps with it, so reporting this per run lets
// the server see which plugin version each member is actually on. Best-effort:
// if the manifest can't be read, we just omit the field.
const PLUGIN_VERSION = (() => {
  try {
    const root = process.env.CLAUDE_PLUGIN_ROOT;
    if (!root) return null;
    const manifest = JSON.parse(readFileSync(join(root, ".claude-plugin", "plugin.json"), "utf8"));
    return manifest?.version || null;
  } catch {
    return null;
  }
})();

const ok = () => { process.stdout.write('{"continue":true,"suppressOutput":true}'); process.exit(0); };

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", async () => {
  try {
    const evt = JSON.parse(raw || "{}");
    // Skill tool input: { skill: "luckiest:luckiest-aso" | "luckiest:charms" | ... }
    const skill = String(evt?.tool_input?.skill || "");
    // Identify our plugin's skills two ways, so tracking survives whether the host
    // passes the namespaced form or a bare name. Foreign skills (superpowers,
    // vercel, gsd, …) match neither and are ignored so we don't post their runs.
    //   "luckiest:<slug>" — namespaced plugin skill (charms, plan, luckiest-aso, …)
    //   "luckiest-<slug>" — bare marketing/coder skill name
    let slug;
    if (skill.startsWith("luckiest:")) slug = skill.slice("luckiest:".length);
    else if (skill.startsWith("luckiest-")) slug = skill;
    else return ok();
    // server resolves slug -> listing id

    const headers = { "content-type": "application/json" };
    if (KEY) headers.authorization = `Bearer ${KEY}`; // sets reporter_hash; optional

    // 3s cap: telemetry must never stall the session.
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3000);
    await fetch(`${API}/api/skills/telemetry`, {
      method: "POST",
      headers,
      body: JSON.stringify({ listing_id: slug, matched: true, success: true, skill_version: PLUGIN_VERSION }),
      signal: ctrl.signal,
    }).catch(() => {});
    clearTimeout(timer);
  } catch {
    /* best-effort — never fail the tool */
  }
  ok();
});
