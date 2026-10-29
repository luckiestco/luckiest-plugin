#!/usr/bin/env node
// Reports shared components that are missing, or missing props, on web, iOS, or
// Android. Usage: node kit-parity.mjs kit.json   (paths in kit.json are relative to cwd)
// Exit 0 = in sync, 1 = gaps, 2 = bad input.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const EXT = { web: [".tsx", ".ts"], ios: [".swift"], android: [".kt"] };
const SKIP_DIRS = new Set(["node_modules", "build", "dist", ".git", ".gradle", ".next", "Pods"]);
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Where a component is declared on each platform. MS/Ms prefix is optional.
const declPattern = (platform, name) => {
  const n = `(?:MS)?${escape(name)}`;
  if (platform === "ios") return new RegExp(`\\bstruct\\s+${n}\\b`, "i");
  if (platform === "android") return new RegExp(`\\bfun\\s+${n}\\s*\\(`, "i");
  return new RegExp(`\\bexport\\s+(?:const|function)\\s+${n}\\b`, "i");
};
const ANY_DECL = /\n\s*(?:struct\s|(?:@Composable\s+)?fun\s|export\s+(?:const|function|interface)\s)/;

function listFiles(dir, exts, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry) || entry.startsWith(".next")) continue;
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) listFiles(path, exts, out);
    else if (exts.some((e) => path.endsWith(e))) out.push(path);
  }
  return out;
}

// The declaration text: from the match to the next top-level declaration.
// ponytail: regex window, not a parser; nested declarations inside a body cut it short.
function findDecl(files, platform, name) {
  const pattern = declPattern(platform, name);
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const match = pattern.exec(text);
    if (!match) continue;
    const rest = text.slice(match.index + match[0].length);
    const end = rest.search(ANY_DECL);
    let block = match[0] + (end === -1 ? rest : rest.slice(0, end));
    if (platform === "web") {
      const props = new RegExp(`interface\\s+(?:MS)?${escape(name)}Props\\b[^{]*\\{[^}]*\\}`, "i").exec(text);
      if (props) block += props[0];
    }
    return { file, block };
  }
  return null;
}

export function checkKit(kit, cwd = process.cwd()) {
  const gaps = [];
  const files = {};
  for (const [platform, root] of Object.entries(kit.roots)) {
    if (!EXT[platform]) throw new Error(`unknown platform "${platform}" (use web, ios, android)`);
    files[platform] = listFiles(resolve(cwd, root), EXT[platform]);
  }
  for (const component of kit.components) {
    for (const platform of Object.keys(kit.roots)) {
      if (component.skip?.includes(platform)) continue;
      const found = findDecl(files[platform], platform, component.name);
      if (!found) {
        gaps.push(`${platform}: ${component.name} missing`);
        continue;
      }
      for (const prop of component.props ?? []) {
        const propName = typeof prop === "string" ? prop : prop[platform] ?? prop.name;
        if (!new RegExp(`\\b${escape(propName)}\\b`).test(found.block)) {
          gaps.push(`${platform}: ${component.name} lacks prop "${propName}" (${found.file})`);
        }
      }
    }
  }
  return gaps;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error("usage: node kit-parity.mjs <kit.json>");
    process.exit(2);
  }
  let gaps;
  try {
    gaps = checkKit(JSON.parse(readFileSync(specPath, "utf8")));
  } catch (error) {
    console.error(`kit-parity: ${error.message}`);
    process.exit(2);
  }
  for (const gap of gaps) console.log(gap);
  console.log(gaps.length ? `${gaps.length} gap(s)` : "kit in sync");
  process.exit(gaps.length ? 1 : 0);
}
