#!/usr/bin/env node
// Rasterize brand SVGs into padded reference PNGs for image models.
// usage: node make_refs.mjs <out-dir> <file.svg>[:bg] ...   (bg = hex like #FFFFFF, omit for transparent)
// Each SVG is wrapped with 12% padding and rendered ~3000px wide by macOS `sips`.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const [out, ...items] = process.argv.slice(2);
if (!out || !items.length) { console.error("usage: make_refs.mjs <out-dir> <file.svg>[:#bg] ..."); process.exit(1); }
fs.mkdirSync(out, { recursive: true });
for (const item of items) {
  const [file, bg] = item.split(/:(?=#)/);
  const svg = fs.readFileSync(file, "utf8");
  const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
  if (!vb) { console.error(`no viewBox in ${file}`); process.exit(1); }
  const [x, y, w, h] = vb.trim().split(/[\s,]+/).map(Number);
  const p = Math.max(w, h) * 0.12, W = w + 2 * p, H = h + 2 * p, S = 3000 / W;
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const rect = bg ? `<rect x="${x - p}" y="${y - p}" width="${W}" height="${H}" fill="${bg}"/>` : "";
  const wrapped = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x - p} ${y - p} ${W} ${H}" width="${Math.round(W * S)}" height="${Math.round(H * S)}">${rect}${inner}</svg>`;
  const base = path.join(out, path.basename(file, ".svg") + (bg ? `-on-${bg.slice(1).toLowerCase()}` : ""));
  fs.writeFileSync(base + ".svg", wrapped);
  execFileSync("sips", ["-s", "format", "png", base + ".svg", "--out", base + ".png"], { stdio: "ignore" });
  console.log(base + ".png");
}
