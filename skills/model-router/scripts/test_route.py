"""Run: python3 -m unittest scripts/test_route.py (from the skill directory)."""
import os
import sys
import json
import subprocess
import tempfile
import unittest
from unittest import mock

os.environ["LUCKIEST_MODEL_ROUTER"] = "rules"  # keep the user's own preference out of tests
sys.path.insert(0, os.path.dirname(__file__))
import route  # noqa: E402


def tier(title, prefer="balanced"):
    return route.route_task(title, None, prefer)["tier"]


class RouteTask(unittest.TestCase):
    def test_types(self):
        self.assertEqual(tier("research how auth tokens refresh"), "light")
        self.assertEqual(tier("design the billing schema migration"), "heavy")
        self.assertEqual(tier("debug the flaky checkout test"), "heavy")
        self.assertEqual(tier("add a pricing FAQ section"), "standard")
        self.assertEqual(tier("draft the launch email"), "standard")
        self.assertEqual(tier("rename the settings label"), "light")

    def test_unsure_is_standard_not_light(self):
        r = route.route_task("polish the thing")
        self.assertEqual(r["tier"], "standard")
        self.assertTrue(r["reason"].startswith("unsure"))

    def test_upshift_and_prefer(self):
        self.assertEqual(tier("refactor the helpers across the codebase"), "heavy")
        self.assertEqual(tier("fix this\n```js\nx\n```"), "heavy")
        self.assertEqual(tier("add a pricing FAQ section", "cheap"), "standard")  # tool-work floor
        self.assertEqual(tier("draft the launch email", "cheap"), "light")
        self.assertEqual(tier("add a pricing FAQ section", "quality"), "heavy")
        self.assertEqual(tier("design the schema", "quality"), "heavy")  # capped

    def test_batch_pin_and_warnings(self):
        tasks = [
            {"title": "design the billing schema"},
            {"title": "add the billing API route", "depends_on": [0]},
            {"title": "find existing invoice helpers", "depends_on": [5]},
        ]
        out, warnings = route.route_batch(tasks)
        self.assertEqual([t["tier"] for t in out], ["heavy", "heavy", "light"])
        self.assertEqual(len(warnings), 1)

    def test_anthropic_ids_match_server(self):
        # must match server/mcp/modelHint.js MODELS.anthropic
        self.assertEqual(route.PROVIDER_MODELS["anthropic"],
                         {"light": "claude-haiku-5-5", "standard": "claude-sonnet-5-5", "heavy": "claude-opus-5-5"})


def laya_ans(score, conf=0.9, tools=0.1, sensitive=0.1):
    return {"difficulty": {"score": score, "answer_confidence": conf},
            "needs_tools": {"noul": tools}, "is_sensitive": {"noul": sensitive}}


class Laya(unittest.TestCase):
    def test_mapping(self):
        self.assertEqual(route.laya_tier(laya_ans(2.8))[0], "heavy")
        self.assertEqual(route.laya_tier(laya_ans(1.6, sensitive=0.9))[0], "heavy")
        self.assertEqual(route.laya_tier(laya_ans(1.6))[0], "standard")
        self.assertEqual(route.laya_tier(laya_ans(0.6, tools=0.9))[0], "standard")
        self.assertEqual(route.laya_tier(laya_ans(0.6))[0], "light")
        self.assertIsNone(route.laya_tier(laya_ans(2.8, conf=0.2)))  # unsure: rules decide

    def test_laya_decides_only_when_rules_unsure(self):
        r = route.route_task("polish the thing", laya=laya_ans(2.8))
        self.assertEqual(r["tier"], "heavy")
        self.assertTrue(r["reason"].startswith("laya:"))

    def test_laya_nudges_one_step_when_confident(self):
        r = route.route_task("rename the settings label", laya=laya_ans(2.8))
        self.assertEqual(r["tier"], "standard")  # light -> standard, never two steps
        self.assertIn("laya:", r["reason"])
        r = route.route_task("draft the launch email", laya=laya_ans(0.4))
        self.assertEqual(r["tier"], "light")
        # under the nudge confidence, the rules' pick stands
        r = route.route_task("draft the launch email", laya=laya_ans(2.8, conf=0.5))
        self.assertEqual((r["tier"], r["reason"]), ("standard", "content task"))

    def test_laya_keeps_floor(self):
        # implement work never drops to light, even when Laya calls it easy
        self.assertEqual(route.route_task("add a pricing FAQ", laya=laya_ans(0.3))["tier"], "standard")
        # low confidence falls back to the rules
        r = route.route_task("design the billing schema", laya=laya_ans(0.3, conf=0.1))
        self.assertEqual(r["reason"], "design task")

    def run_batch(self, run=None, side_effect=None, exe="/bin/laya"):
        with mock.patch.dict(os.environ, {"LUCKIEST_MODEL_ROUTER": "laya"}), \
             mock.patch.object(route, "laya_bin", return_value=exe), \
             mock.patch.object(route.subprocess, "run", return_value=run, side_effect=side_effect) as m:
            out, warnings = route.route_batch([{"title": "draft the email"}, {"title": "add the route"}])
        return out, warnings, m

    def test_batch_one_laya_call(self):
        stdout = "\n".join(json.dumps({"answers": a}) for a in (laya_ans(0.4), laya_ans(2.9)))
        out, warnings, m = self.run_batch(subprocess.CompletedProcess([], 0, stdout, ""))
        self.assertEqual(m.call_count, 1)
        self.assertEqual([t["tier"] for t in out], ["light", "heavy"])
        self.assertEqual(warnings, [])

    def test_batch_fallbacks(self):
        cases = [
            dict(exe=None),  # not installed
            dict(side_effect=subprocess.TimeoutExpired("laya", 30)),
            dict(run=subprocess.CompletedProcess([], 1, "", "boom")),
            dict(run=subprocess.CompletedProcess([], 0, "not json", "")),
        ]
        for kw in cases:
            out, warnings, _ = self.run_batch(**kw)
            self.assertEqual([t["reason"] for t in out], ["content task", "implement task"], kw)
            self.assertEqual(len(warnings), 1, kw)

    def test_shared_switch(self):
        with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
            f.write('{"laya": true}')
        with mock.patch.object(route, "CONFIG_PATH", f.name):
            with mock.patch.dict(os.environ, {"LUCKIEST_MODEL_ROUTER": "", "LUCKIEST_LAYA": ""}):
                self.assertTrue(route.laya_preferred())  # shared config key
            with mock.patch.dict(os.environ, {"LUCKIEST_MODEL_ROUTER": "rules"}):
                self.assertFalse(route.laya_preferred())  # routing-only off switch wins
        os.unlink(f.name)
        with mock.patch.dict(os.environ, {"LUCKIEST_MODEL_ROUTER": "", "LUCKIEST_LAYA": "1"}):
            self.assertTrue(route.laya_preferred())

    def test_off_by_default(self):
        with mock.patch.dict(os.environ, {"LUCKIEST_MODEL_ROUTER": "", "LUCKIEST_LAYA": ""}), \
             mock.patch.object(route, "CONFIG_PATH", "/nonexistent/config.json"), \
             mock.patch.object(route.subprocess, "run") as m:
            self.assertFalse(route.laya_preferred())
            route.route_batch([{"title": "add the route"}])
        m.assert_not_called()


if __name__ == "__main__":
    unittest.main()
