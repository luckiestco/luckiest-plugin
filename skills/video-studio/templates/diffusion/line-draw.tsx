/* line-draw logo recipe, Diffusion Studio edition (luckiest-video-studio).
 * Every path of the mark traces in its own color on a canvas surface, then fills and holds.
 * Paths come from the logo SVG (see scripts/assemble-diffusion.mjs); `clip` paths are clipped to the
 * artwork's clipPath rect. Time is local to the component's `start`, so it can sit in a sequence. */
import { createEffect } from "solid-js";
import { useTicker, type SceneNode } from "@diffusionstudio/jsx";

export type LogoPath = { d: string; fill: string; clip: boolean };
export type LogoArt = { paths: LogoPath[]; clip: [number, number, number, number] | null };

type Props = {
  id: string;
  art: LogoArt;
  start: number;
  duration: number;
  width: number;
  height: number;
  caption: string;
  ink: string;
  font: string;
  drawSeconds: number;
  logoSize: number;
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Path lengths and the artwork's bounding box, measured once from a detached SVG.
function measure(paths: LogoPath[]) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("style", "position:absolute;left:-9999px;top:0");
  document.body.appendChild(svg);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const lengths = paths.map((p) => {
    const el = document.createElementNS(ns, "path");
    el.setAttribute("d", p.d);
    svg.appendChild(el);
    const b = el.getBBox();
    x0 = Math.min(x0, b.x); y0 = Math.min(y0, b.y);
    x1 = Math.max(x1, b.x + b.width); y1 = Math.max(y1, b.y + b.height);
    return el.getTotalLength();
  });
  svg.remove();
  return { lengths, box: { x: x0, y: y0, w: x1 - x0, h: y1 - y0 } };
}

export function LineDrawLogo(props: Props) {
  const { time } = useTicker();
  const { lengths, box } = measure(props.art.paths);
  const shapes = props.art.paths.map((p) => new Path2D(p.d));
  const local = () => time() - props.start;
  let surface: SceneNode | undefined;

  createEffect(() => {
    const canvas = surface?.element;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const t = local();
    const size = props.logoSize;
    const s = (size * 0.9) / Math.max(box.w, box.h);
    const k = s * (0.94 + 0.06 * easeOut(clamp(t / 3.2)));
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(size / 2, size / 2);
    ctx.scale(k, k);
    ctx.translate(-(box.x + box.w / 2), -(box.y + box.h / 2));
    shapes.forEach((shape, i) => {
      const p = props.art.paths[i];
      ctx.save();
      if (p.clip && props.art.clip) {
        const [cx, cy, cw, ch] = props.art.clip;
        ctx.beginPath();
        ctx.rect(cx, cy, cw, ch);
        ctx.clip();
      }
      const draw = easeOut(clamp((t - i * 0.12) / props.drawSeconds));
      const fill = easeOut(clamp((t - props.drawSeconds - i * 0.08) / 0.7));
      const line = 2.4 * (1 - clamp((t - props.drawSeconds - 0.3 - i * 0.08) / 0.5));
      ctx.globalAlpha = fill;
      ctx.fillStyle = p.fill;
      ctx.fill(shape);
      if (line > 0 && draw > 0) {
        ctx.globalAlpha = 1;
        ctx.setLineDash([lengths[i], lengths[i]]);
        ctx.lineDashOffset = lengths[i] * (1 - draw);
        ctx.lineWidth = line / k;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = p.fill;
        ctx.stroke(shape);
      }
      ctx.restore();
    });
  });

  const captionIn = () => easeOut(clamp((local() - props.drawSeconds - 1) / 0.6));
  const end = () => props.start + props.duration;
  return (
    <>
      <surface
        id={`${props.id}-mark`}
        x={(props.width - props.logoSize) / 2}
        y={(props.height - props.logoSize) / 2 - 40}
        width={props.logoSize}
        height={props.logoSize}
        start={props.start}
        end={end()}
        ref={surface}
      />
      <text
        id={`${props.id}-caption`}
        x={0}
        y={(props.height + props.logoSize) / 2 + 10}
        width={props.width}
        height={40}
        textAlign="center"
        textBaseline="middle"
        color={props.ink}
        fontFamily={props.font}
        fontSize={28}
        fontWeight={500}
        letterSpacing={9}
        opacity={captionIn()}
        start={props.start}
        end={end()}
      >
        {props.caption}
      </text>
    </>
  );
}
