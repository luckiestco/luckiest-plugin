"""Run: python3 -m unittest scripts/test_route.py (from the skill directory)."""
import os
import sys
import unittest

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


if __name__ == "__main__":
    unittest.main()
