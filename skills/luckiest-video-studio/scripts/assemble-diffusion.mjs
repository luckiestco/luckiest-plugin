#!/usr/bin/env node
// Write a Diffusion Studio project for a rendered run: line-draw logo scenes become native, editable
// Diffusion scenes; every other scene plays its rendered clip (demo scenes play the raw footage, trimmed).
// Usage: node assemble-diffusion.mjs <run-dir> [--open] [--export [out.mp4]]
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const runDir = resolve(args.find((a) => !a.startsWith("--") && !/\.(mp4|mov|webm)$/i.test(a)) ?? ".");
const wantOpen = args.includes("--open") || args.includes("--export");
const exportOut = args.includes("--export") ? resolve(args.find((a) => /\.(mp4|mov|webm)$/i.test(a)) ?? join(runDir, "final-diffusion.mp4")) : null;
const skillDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const cli = process.env.DIFFUSION_CLI ?? "/Applications/Diffusion Studio.app/Contents/Resources/cli/bin/dapi";
const fail = (m) => { console.error(`error: ${m}`); process.exit(1); };

const sb = JSON.parse(readFileSync(join(runDir, "storyboard.json"), "utf8"));
const brand = existsSync(join(runDir, "brand.json")) ? JSON.parse(readFileSync(join(runDir, "brand.json"), "utf8")) : {};
const { width: W, height: H, fps } = sb.format;
const proj = join(runDir, "diffusion");
mkdirSync(join(proj, "logos"), { recursive: true });
mkdirSync(join(proj, "assets"), { recursive: true });
copyFileSync(join(skillDir, "templates", "diffusion", "line-draw.tsx"), join(proj, "line-draw.tsx"));

// Media is linked into assets/ and named by library path, as Diffusion's editor guide asks.
const link = (rel) => {
  const src = join(runDir, rel);
  if (!existsSync(src)) fail(`missing ${rel}`);
  const dst = join(proj, "assets", rel);
  mkdirSync(dirname(dst), { recursive: true });
  rmSync(dst, { force: true });
  symlinkSync(src, dst);
  return rel;
};

// Minimal SVG reader: path data, its fill (attribute or class), and whether it sits under a clipPath.
// ponytail: handles flat Illustrator-style exports; nested transforms are not applied, flatten those first.
function readLogo(file) {
  const svg = readFileSync(file, "utf8");
  const classFill = Object.fromEntries([...svg.matchAll(/\.([\w-]+)\s*\{[^}]*?fill:\s*(#[0-9a-fA-F]{3,8}|[a-z]+)/g)].map((m) => [m[1], m[2]]));
  const clipClasses = new Set([...svg.matchAll(/\.([\w-]+)\s*\{[^}]*?clip-path:/g)].map((m) => m[1]));
  const clipRect = svg.match(/<clipPath[\s\S]*?<rect[^>]*?x="([-\d.]+)"[^>]*?y="([-\d.]+)"[^>]*?width="([\d.]+)"[^>]*?height="([\d.]+)"/);
  const paths = [];
  const stack = [];
  for (const m of svg.matchAll(/<(\/?)(g|path|clipPath|defs)\b([^>]*?)(\/?)>/g)) {
    const [, close, tag, attrs, self] = m;
    const cls = (attrs.match(/class="([^"]+)"/) ?? [])[1]?.split(/\s+/) ?? [];
    if (tag === "g" || tag === "clipPath" || tag === "defs") {
      if (close) stack.pop();
      else if (!self) stack.push({ tag, clip: /clip-path=/.test(attrs) || cls.some((c) => clipClasses.has(c)) });
      continue;
    }
    if (close || stack.some((s) => s.tag === "defs" || s.tag === "clipPath")) continue;
    const d = (attrs.match(/\sd="([^"]+)"/) ?? [])[1];
    if (!d) continue;
    const fill = (attrs.match(/fill="([^"]+)"/) ?? [])[1] ?? cls.map((c) => classFill[c]).find(Boolean) ?? "#000000";
    if (fill === "none") continue;
    paths.push({ d, fill, clip: stack.some((s) => s.clip) });
  }
  if (!paths.length) fail(`${file}: no filled paths found`);
  return { paths, clip: clipRect ? clipRect.slice(1, 5).map(Number) : null };
}

const camel = (id) => id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const inspect = [];
const imports = [];
const nodes = [];
let t = 0;
for (const [i, s] of sb.scenes.entries()) {
  const name = `${String(i + 1).padStart(2, "0")}-${s.id}.mp4`;
  const start = +t.toFixed(3);
  const end = +(t + s.duration).toFixed(3);
  const svgRel = (s.assets ?? []).find((a) => a.toLowerCase().endsWith(".svg"));
  if (s.kind === "logo" && s.recipe === "line-draw" && svgRel) {
    const art = readLogo(join(runDir, svgRel));
    const v = camel(s.id);
    writeFileSync(join(proj, "logos", `${s.id}.ts`), `import type { LogoArt } from "../line-draw";\n\nconst art: LogoArt = ${JSON.stringify(art)};\nexport default art;\n`);
    imports.push(`import ${v}Art from "./logos/${s.id}";`);
    inspect.push(
      `/** @inspect text path="${s.id}/Caption" */\nconst ${v}Caption = ${JSON.stringify(s.variables?.caption ?? "")};`,
      `/** @inspect number path="${s.id}/Draw seconds" min=0.5 max=4 step=0.1 */\nconst ${v}DrawSeconds = ${s.variables?.drawSeconds ?? 1.9};`,
      `/** @inspect number path="${s.id}/Logo size" min=200 max=${Math.min(W, H)} step=10 */\nconst ${v}LogoSize = ${s.variables?.logoSize ?? Math.round(Math.min(W, H) * 0.52)};`,
    );
    nodes.push(`        <LineDrawLogo id="${s.id}" art={${v}Art} start={${start}} duration={${s.duration}} width={${W}} height={${H}} caption={${v}Caption} ink={ink} font={font} drawSeconds={${v}DrawSeconds} logoSize={${v}LogoSize} />`);
  } else if (s.kind === "demo") {
    const src = link(s.source);
    nodes.push(`        <video id="${s.id}" src="${src}" width={${W}} height={${H}} objectFit="contain" start={${start}} sourceIn={${s.sourceStart ?? 0}} end={${end}} />`);
  } else {
    const src = link(join("clips", name));
    nodes.push(`        <video id="${s.id}" src="${src}" width={${W}} height={${H}} start={${start}} end={${end}} />`);
  }
  t = end;
}
if (sb.music?.file) {
  const src = link(sb.music.file);
  const db = (20 * Math.log10(sb.music.volume ?? 0.35)).toFixed(1);
  nodes.push(`        <audio id="music" src="${src}" start={0} end={${+t.toFixed(3)}} volume={${db}} />`);
}

const tsx = `/* ${sb.title}: generated by luckiest-video-studio from storyboard.json. Edit here or in the inspector. */
${imports.length ? `import { LineDrawLogo } from "./line-draw";\n${imports.join("\n")}\n` : ""}
/** @inspect color path="Brand/Paper" */
const paper = ${JSON.stringify(brand.paper ?? "#FFFFFF")};
/** @inspect color path="Brand/Ink" */
const ink = ${JSON.stringify(brand.ink ?? "#0A0A0A")};
/** @inspect font path="Brand/Caption font" */
const font = ${JSON.stringify(brand.text ?? "Inter")};

${inspect.join("\n")}

export default function Video() {
  return (
    <stage>
      <scene id="main" name=${JSON.stringify(sb.title)} width={${W}} height={${H}} fill={paper} active>
        <sequence id="spine">
${nodes.join("\n")}
        </sequence>
      </scene>
    </stage>
  );
}
`;
writeFileSync(join(proj, "index.tsx"), tsx);
console.log(`wrote ${join(proj, "index.tsx")} (${sb.scenes.length} scenes, ${t.toFixed(2)}s, ${imports.length} native logo scene(s))`);

if (!wantOpen) process.exit(0);
if (!existsSync(cli)) fail(`Diffusion Studio CLI not found at ${cli}; install the app or set DIFFUSION_CLI`);
const dapi = (...a) => {
  const r = spawnSync(cli, a, { encoding: "utf8" });
  if (r.status !== 0) fail(`dapi ${a[0]}: ${(r.stderr || r.stdout).trim()}`);
  return r.stdout.trim();
};
dapi("open", proj);

// Export settings live in the project's package.json, merged after open so Diffusion's own fields stay.
const pkgPath = join(proj, "package.json");
const pkg = existsSync(pkgPath) ? JSON.parse(readFileSync(pkgPath, "utf8")) : {};
pkg.diffusion = { ...(pkg.diffusion ?? {}), export: { ...(pkg.diffusion?.export ?? {}), main: {
  format: "mp4",
  video: { enabled: true, codec: "avc", bitrate: 12000000, fps, resolution: Math.min(W, H) },
  audio: { enabled: true, codec: "aac", sampleRate: 48000, bitrate: 192000 },
} } };
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

// Opening compiles in the background; wait until the scene exists before checking it.
let check = null;
for (let i = 0; i < 30 && !check; i++) {
  const r = spawnSync(cli, ["check", "main"], { encoding: "utf8" });
  if (r.status === 0) check = JSON.parse(r.stdout);
  else spawnSync("sleep", ["1"]);
}
if (!check) fail(`scene "main" never compiled; run: ${basename(cli)} logs`);
const errors = check.issues.filter((x) => x.severity === "error");
console.log(`check: ${check.stats.nodes} nodes, ${check.issues.length} issue(s)${errors.length ? `, ${errors.length} error(s)` : ""}`);
for (const x of check.issues) console.log(`  ${x.severity} ${x.node}: ${x.message}`);
if (errors.length) process.exit(1);
if (exportOut) {
  const res = JSON.parse(dapi("export", "main", exportOut));
  console.log(`exported ${res.path} (${res.width}x${res.height}, ${res.duration}s)`);
}
