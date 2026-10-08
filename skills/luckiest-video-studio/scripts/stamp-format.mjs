// Output formats and the stamp that turns one scene HTML into a copy sized for one of them.
// HyperFrames reads the canvas from the root data-width/data-height, so a stamped copy renders at that size.
export const FORMATS = { landscape: [1920, 1080], vertical: [1080, 1920], square: [1080, 1080] };
const RESOLUTION = { landscape: "landscape", vertical: "portrait", square: "square" };
// Safe area as [top, bottom, left, right] fractions, from luckiest-video-studio-composition/references/grids-and-ratios.md.
// Vertical is the strictest of TikTok, Reels, and Shorts combined.
export const SAFE = { landscape: [0.05, 0.05, 0.05, 0.05], vertical: [0.15, 0.35, 0.11, 0.18], square: [0.07, 0.07, 0.07, 0.07] };

// Set or replace one attribute inside an opening tag string.
const setAttr = (tag, name, value) => {
  const re = new RegExp(`\\s${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, "i");
  return re.test(tag) ? tag.replace(re, ` ${name}="${value}"`) : tag.replace(/\s*\/?>$/, (end) => ` ${name}="${value}"${end}`);
};

export function stampFormat(html, name) {
  const [w, h] = FORMATS[name];
  const [t, b, l, r] = SAFE[name];
  const px = (f, side) => `${Math.round(f * side)}px`;
  const vars = `<style>:root{--w:${w}px;--h:${h}px;--u:${Math.min(w, h) / 100}px;` +
    `--safe-t:${px(t, h)};--safe-b:${px(b, h)};--safe-l:${px(l, w)};--safe-r:${px(r, w)}}</style>`;
  let out = html.replace(/<div\b[^>]*\bdata-composition-id\b[^>]*>/i, (tag) =>
    setAttr(setAttr(setAttr(tag, "data-width", w), "data-height", h), "data-format", name));
  out = out.replace(/<html\b[^>]*>/i, (tag) => setAttr(setAttr(tag, "data-resolution", RESOLUTION[name]), "data-format", name));
  // Injected last in <head> so it wins over the author's master-size :root defaults.
  return /<\/head>/i.test(out) ? out.replace(/<\/head>/i, `${vars}</head>`) : vars + out;
}
