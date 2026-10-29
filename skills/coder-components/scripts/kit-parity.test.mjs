import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkKit } from "./kit-parity.mjs";

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), "kit-parity-"));
  for (const sub of ["web", "ios", "android"]) mkdirSync(join(dir, sub));
  writeFileSync(join(dir, "ios", "Kit.swift"),
    "struct MSCard: View {\n  var title: String? = nil\n  var body: some View { Text(\"\") }\n}\n" +
    "struct MSWideButton: View {\n  let label: String\n  let action: () -> Void\n}\n");
  writeFileSync(join(dir, "android", "Controls.kt"),
    "@Composable\nfun MsCard(title: String? = null) {}\n@Composable\nfun MsWideButton(label: String, onClick: () -> Unit) {}\n");
  writeFileSync(join(dir, "web", "Card.tsx"),
    "interface CardProps { heading: string }\nexport const Card = (props: CardProps) => null;\n");
  return dir;
}

const roots = { web: "web", ios: "ios", android: "android" };

test("reports missing components and props, honors aliases and skip", () => {
  const gaps = checkKit({
    roots,
    components: [
      { name: "Card", props: ["title"] },
      { name: "WideButton", props: ["label", { name: "action", android: "onClick" }], skip: [] },
      { name: "Eyebrow", props: ["text"], skip: ["web", "android"] },
    ],
  }, fixture());
  assert.deepEqual(gaps.map((gap) => gap.replace(/ \(.*\)$/, "")), [
    'web: Card lacks prop "title"',
    "web: WideButton missing",
    "ios: Eyebrow missing",
  ]);
});

test("in sync kit has no gaps", () => {
  const gaps = checkKit({
    roots: { ios: "ios", android: "android" },
    components: [{ name: "Card", props: ["title"] }],
  }, fixture());
  assert.deepEqual(gaps, []);
});
