#!/usr/bin/env python3
"""luckiest-aeo-grader scanner: fetch a URL and extract the machine signals AI answer
engines actually read. Stdlib only — no install step.

Usage:
  python scan.py https://example.com/page          # scan, print JSON
  python scan.py https://example.com/page --diff    # scan + compare to last
                                                     # saved scan of this URL,
                                                     # then save a new snapshot

Outputs a JSON blob to stdout. Pipe through `python -m json.tool` for humans.
Snapshots for --diff live in scripts/../snapshots/ keyed by URL.

# ponytail: regex/HTMLParser extraction, not a full DOM. Good enough for signal
# detection; swap in lxml only if a real site breaks the heuristics.
"""
import hashlib
import json
import os
import re
import ssl
import sys
import time
import urllib.request
import urllib.error
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

SNAP_DIR = os.path.join(os.path.dirname(__file__), "..", "snapshots")

UA = "Mozilla/5.0 (compatible; LuckiestAEO/1.0; +aeo-audit)"
# ponytail: public pages only, so skip cert verify rather than fight macOS
# Python's missing root store. Drop this if you ever fetch authed URLs.
SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE
AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-Web",
           "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended",
           "Bingbot", "Applebot-Extended", "CCBot", "Amazonbot", "meta-externalagent"]


def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=SSL_CTX) as r:
            body = r.read(3_000_000).decode("utf-8", "replace")
            return r.status, body, dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, "", {}
    except Exception as e:
        return None, f"ERROR: {e}", {}


class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.headings = []          # (level, text)
        self.metas = []             # dicts of attrs
        self.title = None
        self.jsonld = []            # raw json strings
        self.lang = None
        self.canonical = None
        self.counts = {"p": 0, "ul": 0, "ol": 0, "table": 0, "img": 0,
                       "img_alt": 0, "article": 0, "main": 0, "nav": 0,
                       "details": 0, "a": 0}
        self._h = None
        self._buf = []
        self._in_title = False
        self._in_jsonld = False
        self.text_chars = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("h1", "h2", "h3", "h4"):
            self._h = int(tag[1]); self._buf = []
        if tag == "title":
            self._in_title = True; self._buf = []
        if tag == "html" and a.get("lang"):
            self.lang = a["lang"]
        if tag == "meta":
            self.metas.append(a)
        if tag == "link" and a.get("rel", "").lower() == "canonical":
            self.canonical = a.get("href")
        if tag == "script" and a.get("type", "").lower() == "application/ld+json":
            self._in_jsonld = True; self._buf = []
        if tag in self.counts:
            self.counts[tag] += 1
        if tag == "img" and a.get("alt"):
            self.counts["img_alt"] += 1

    def handle_endtag(self, tag):
        if tag in ("h1", "h2", "h3", "h4") and self._h:
            txt = " ".join("".join(self._buf).split())
            if txt:
                self.headings.append((self._h, txt[:140]))
            self._h = None
        if tag == "title" and self._in_title:
            self.title = " ".join("".join(self._buf).split())
            self._in_title = False
        if tag == "script" and self._in_jsonld:
            self.jsonld.append("".join(self._buf).strip())
            self._in_jsonld = False

    def handle_data(self, data):
        if self._h or self._in_title or self._in_jsonld:
            self._buf.append(data)
        else:
            self.text_chars += len(data.strip())


def jsonld_types(blocks):
    types = []
    for b in blocks:
        try:
            obj = json.loads(b)
        except Exception:
            m = re.findall(r'"@type"\s*:\s*"([^"]+)"', b)
            types += m
            continue
        for node in (obj if isinstance(obj, list) else [obj]):
            graph = node.get("@graph", [node]) if isinstance(node, dict) else [node]
            for n in graph:
                if isinstance(n, dict) and "@type" in n:
                    t = n["@type"]
                    types += t if isinstance(t, list) else [t]
    return sorted(set(types))


def robots_ai(base):
    status, body, _ = fetch(urljoin(base, "/robots.txt"))
    if status != 200:
        return {"present": False, "ai_rules": {}, "sitemaps": []}
    rules, agent = {}, None
    sitemaps = []
    for line in body.splitlines():
        line = line.strip()
        low = line.lower()
        if low.startswith("user-agent:"):
            agent = line.split(":", 1)[1].strip()
        elif low.startswith("disallow:") and agent:
            path = line.split(":", 1)[1].strip()
            for bot in AI_BOTS:
                if agent == "*" or agent.lower() == bot.lower():
                    rules.setdefault(bot if agent != "*" else "*", []).append(path or "(none)")
        elif low.startswith("sitemap:"):
            sitemaps.append(line.split(":", 1)[1].strip())
    blocked = {a: p for a, p in rules.items() if any(x in ("/", "(none)/") or x == "/" for x in p)}
    return {"present": True, "ai_rules": rules, "blocked_root": blocked, "sitemaps": sitemaps}


# --- diff support -------------------------------------------------------------
# The signals worth tracking over time: machine-readable facts a fix would move.
def signals(out):
    r = out.get("robots", {})
    return {
        "http_status": out.get("http_status"),
        "has_meta_description": out.get("has_meta_description"),
        "open_graph_count": out.get("open_graph_count"),
        "jsonld_types": out.get("jsonld_types", []),
        "h1_count": out.get("h1_count"),
        "question_headings": len(out.get("question_headings", [])),
        "heading_count": len(out.get("headings", [])),
        "llms_txt_present": out.get("llms_txt_present"),
        "js_dependent_hint": out.get("js_dependent_hint"),
        "approx_text_chars": out.get("approx_text_chars"),
        "ai_bots_blocked_root": sorted((r.get("blocked_root") or {}).keys()),
        "sitemaps": len((r.get("sitemaps") or [])),
    }


def diff_signals(old, new):
    changes = {}
    for k, nv in new.items():
        ov = old.get(k)
        if ov != nv:
            changes[k] = {"was": ov, "now": nv}
    return changes


def snap_path(url):
    slug = hashlib.sha1(url.encode()).hexdigest()[:16]
    return os.path.join(SNAP_DIR, slug + ".json")


def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "usage: scan.py <url> [--diff]"})); return
    do_diff = "--diff" in sys.argv[2:]
    url = sys.argv[1]
    if not urlparse(url).scheme:
        url = "https://" + url
    base = "{0.scheme}://{0.netloc}".format(urlparse(url))

    status, body, headers = fetch(url)
    out = {"url": url, "http_status": status,
           "content_type": headers.get("Content-Type", "")}
    if status != 200 or not body:
        out["fetch_error"] = body[:200] if body else f"status {status}"
        print(json.dumps(out, indent=2)); return

    ex = Extract()
    try:
        ex.feed(body)
    except Exception as e:
        out["parse_warning"] = str(e)

    metas = {}
    for m in ex.metas:
        key = (m.get("name") or m.get("property") or m.get("itemprop") or "").lower()
        if key:
            metas[key] = m.get("content", "")

    # llms.txt is the emerging AI-crawler manifest; cheap to probe.
    llms_status, _, _ = fetch(urljoin(base, "/llms.txt"))

    out.update({
        "title": ex.title,
        "lang": ex.lang,
        "canonical": ex.canonical,
        "meta": {k: metas.get(k) for k in (
            "description", "robots", "og:title", "og:description", "og:type",
            "og:image", "twitter:card", "author", "article:published_time",
            "article:modified_time") if metas.get(k) is not None},
        "has_meta_description": bool(metas.get("description")),
        "open_graph_count": sum(1 for k in metas if k.startswith("og:")),
        "jsonld_present": bool(ex.jsonld),
        "jsonld_types": jsonld_types(ex.jsonld),
        "headings": ex.headings,
        "h1_count": sum(1 for lvl, _ in ex.headings if lvl == 1),
        "question_headings": [t for lvl, t in ex.headings if t.strip().endswith("?")],
        "element_counts": ex.counts,
        "approx_text_chars": ex.text_chars,
        "js_dependent_hint": ex.text_chars < 500,
        "llms_txt_present": llms_status == 200,
        "robots": robots_ai(base),
    })

    if do_diff:
        path = snap_path(url)
        cur = signals(out)
        prior = None
        if os.path.exists(path):
            try:
                with open(path) as f:
                    prior = json.load(f)
            except Exception:
                prior = None
        if prior is None:
            out["diff"] = {"baseline_saved": True,
                           "note": "no prior snapshot; saved this scan as baseline"}
        else:
            out["diff"] = {
                "since": prior.get("ts"),
                "changed": diff_signals(prior.get("signals", {}), cur),
            }
        os.makedirs(SNAP_DIR, exist_ok=True)
        with open(path, "w") as f:
            json.dump({"url": url, "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                       "signals": cur}, f, indent=2)

    print(json.dumps(out, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
