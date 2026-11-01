"""Run: python3 -m unittest scripts/test_triage.py (from the skill directory)."""
import io
import json
import os
import subprocess
import sys
import tempfile
import unittest
from unittest import mock

sys.path.insert(0, os.path.dirname(__file__))
import triage  # noqa: E402


def ans(intent="refund", conf=0.9, frustration=2.5, urgent=0.1, refund=0.9, churn=0.1):
    return {"intent": {"choice": intent, "answer_confidence": conf},
            "frustration": {"score": frustration}, "is_urgent": {"noul": urgent},
            "refund_requested": {"noul": refund}, "churn_risk": {"noul": churn}}


def done(rows, code=0):
    return subprocess.CompletedProcess([], code, "\n".join(json.dumps({"answers": a}) for a in rows), "")


class Tagging(unittest.TestCase):
    def test_tag_and_unsure(self):
        self.assertEqual(triage.tag(ans()), {"intent": "refund", "frustration": 2.5,
                                            "urgent": False, "refund": True, "churn_risk": False})
        self.assertIsNone(triage.tag(ans(conf=0.2)))
        self.assertIsNone(triage.tag({"intent": {}}))

    def test_summary(self):
        msgs = ["give my money back now", "how do I export?", "switching to a rival", "???"]
        rows = [ans(), ans("information", frustration=0.2, refund=0.1),
                ans("cancellation", frustration=2.0, refund=0.1, churn=0.9), ans(conf=0.1)]
        s = triage.summarize(msgs, rows)
        self.assertEqual((s["messages"], s["tagged"], s["unsure"]), (4, 3, 1))
        self.assertEqual(s["intent"]["refund"], 1)
        self.assertEqual((s["refund_pct"], s["churn_risk_pct"]), (33, 33))
        self.assertEqual([f["row"] for f in s["flagged"]], [3, 1])  # leaving + angry outranks refund
        self.assertEqual(s["flagged"][0]["text"], "switching to a rival")


class Fallback(unittest.TestCase):
    def call(self, run=None, side_effect=None, exe="/bin/laya", env="1"):
        with mock.patch.dict(os.environ, {"LUCKIEST_LAYA": env}), \
             mock.patch.object(triage, "laya_bin", return_value=exe), \
             mock.patch.object(triage.subprocess, "run", return_value=run, side_effect=side_effect) as m:
            try:
                return triage.laya_answers(["a", "b"]), m
            except triage.Unavailable as e:
                return e, m

    def test_one_call_when_on(self):
        out, m = self.call(done([ans(), ans()]))
        self.assertEqual(len(out), 2)
        self.assertEqual(m.call_count, 1)

    def test_unavailable_cases(self):
        cases = [
            dict(env="0"),  # not preferred: Laya never runs
            dict(exe=None),  # not installed
            dict(side_effect=subprocess.TimeoutExpired("laya", 60)),
            dict(run=done([], code=1)),
            dict(run=subprocess.CompletedProcess([], 0, "not json", "")),
            dict(run=done([ans()])),  # wrong row count
        ]
        for kw in cases:
            out, m = self.call(**kw)
            self.assertIsInstance(out, triage.Unavailable, kw)
        out, m = self.call(env="0")
        m.assert_not_called()

    def test_off_by_default(self):
        with mock.patch.dict(os.environ, {"LUCKIEST_LAYA": ""}), \
             mock.patch.object(triage, "CONFIG_PATH", "/nonexistent/config.json"):
            self.assertFalse(triage.laya_preferred())

    def test_main_exits_2_and_says_why(self):
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as f:
            f.write("refund please\n\nthis is broken\n")
        err = io.StringIO()
        with mock.patch.dict(os.environ, {"LUCKIEST_LAYA": "0"}), mock.patch("sys.stderr", err):
            self.assertEqual(triage.main([f.name]), 2)
        self.assertIn("Tag messages by hand", err.getvalue())
        os.unlink(f.name)


class Input(unittest.TestCase):
    def test_csv_column_and_blank_lines(self):
        with tempfile.NamedTemporaryFile("w", suffix=".csv", delete=False, newline="") as f:
            f.write('id,body\n1,"line one\nstill one"\n2,\n3,second\n')
        self.assertEqual(triage.read_messages(f.name, "body"), ["line one still one", "second"])
        with self.assertRaises(SystemExit):
            triage.read_messages(f.name, "missing")
        os.unlink(f.name)


if __name__ == "__main__":
    unittest.main()
