import { test } from "node:test";
import assert from "node:assert/strict";
import { buildRequests } from "./assemble-concat.mjs";

const sb = {
  format: { width: 1920, height: 1080, fps: 30 },
  scenes: [{ id: "hook", duration: 2.5 }, { id: "demo", kind: "demo", duration: 4 }, { id: "outro", duration: 3 }],
  music: { file: "music.mp3" },
};

test("clips land in storyboard order at cumulative starts, music on its own track", () => {
  const { path, duration, reqs } = buildRequests(sb, "/run", "/run/out.mp4");
  assert.equal(path, "/run/concat");
  assert.equal(duration, 9.5);
  assert.deepEqual(reqs.slice(0, 2).map((r) => r.method), ["version", "project.create"]);
  assert.deepEqual(reqs[1].video, { width: 1920, height: 1080, rateNum: 30000, rateDen: 1000 });
  assert.deepEqual(reqs.filter((r) => r.method === "media.import").map((r) => r.file),
    ["/run/clips/01-hook.mp4", "/run/clips/02-demo.mp4", "/run/clips/03-outro.mp4", "/run/music.mp3"]);
  const { commands } = reqs.find((r) => r.method === "edit.apply").command;
  assert.deepEqual(commands.map((c) => [c.mediaId.$media, c.trackId, c.start]),
    [["01-hook", "T1", 0], ["02-demo", "T1", 2.5], ["03-outro", "T1", 6.5], ["music", "T4", 0]]);
  assert.deepEqual(reqs.slice(-2).map((r) => r.method), ["project.save", "export.run"]);
});

test("a music track longer than the video is trimmed to it", () => {
  const { reqs } = buildRequests(sb, "/run", null, 10);
  const batch = reqs.find((r) => r.command?.op === "batch");
  assert.equal(batch.key, "musicClip");
  const trim = reqs.find((r) => r.command?.op === "trimClip").command;
  assert.deepEqual(trim, { op: "trimClip", clipId: { $media: "musicClip" }, edge: "end", delta: -0.5 });
  assert.ok(!buildRequests(sb, "/run", null, 9).reqs.some((r) => r.command?.op === "trimClip"));
});

test("no export request without --export", () => {
  assert.ok(!buildRequests(sb, "/run").reqs.some((r) => r.method === "export.run"));
});
