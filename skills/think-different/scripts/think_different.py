#!/usr/bin/env python3
"""Sample and rank super-atom combinations for luckiest-think-different.

  sample  atoms.json  -> candidates.json   random distinct k-combos + source-overlap unavailability
  rank    scored.json -> ranked list       (1 - beta) z(coherence) + beta z(unavailability)

atoms.json: {"atoms": [{"id": "A1", "text": "...", "field": "biology", "sources": ["s1", "s2"]}]}
scored.json: candidates.json with "coherence" (1-10) and "typical" (1-10) added per candidate.
Stdlib only. Run `python3 think_different.py selftest` to check the math.
"""
import argparse
import collections
import itertools
import json
import random
import statistics
import sys


def struct_unavailability(atoms, pool=None):
    # Mean of three 0-1 parts, each graded so few sources do not saturate it:
    #   apart  - mean source-set Jaccard distance over atom pairs
    #   spread - share of distinct fields
    #   rare   - atoms from outside the pool's crowded fields, cited by fewer sources
    # ponytail: source co-occurrence stands in for the paper's trained author model; upgrade = full-model.md recipe
    pool = pool or atoms
    fields = collections.Counter(a.get("field", "") for a in pool)
    pairs = list(itertools.combinations(atoms, 2))
    apart = sum(1 - len(set(a["sources"]) & set(b["sources"])) / len(set(a["sources"]) | set(b["sources"]))
                for a, b in pairs) / len(pairs)
    spread = (len({a.get("field", "") for a in atoms}) - 1) / (len(atoms) - 1)
    rare = sum((1 - fields[a.get("field", "")] / len(pool)) / len(a["sources"]) for a in atoms) / len(atoms)
    return round((apart + spread + rare) / 3, 4)


def sample(atoms, k, n, seed=None):
    rng = random.Random(seed)
    if len(atoms) < k:
        raise ValueError(f"need at least {k} atoms, got {len(atoms)}")
    total = 1
    for i in range(k):
        total = total * (len(atoms) - i) // (i + 1)
    n = min(n, total)
    seen, out = set(), []
    while len(out) < n:
        combo = tuple(sorted(rng.sample(range(len(atoms)), k)))
        if combo in seen:
            continue
        seen.add(combo)
        picked = [atoms[i] for i in combo]
        out.append({"id": f"C{len(out) + 1}", "atoms": [a["id"] for a in picked],
                    "struct_unavailability": struct_unavailability(picked, atoms)})
    return out


def z(values):
    mean = statistics.fmean(values)
    sd = statistics.pstdev(values) or 1.0
    return [(v - mean) / sd for v in values]


def rank(cands, beta, top, floor):
    # z-normalize over the whole pool before the floor, as upstream does.
    zc = z([c["coherence"] for c in cands])
    unavail = [a + b for a, b in zip(z([c["struct_unavailability"] for c in cands]),
                                     z([10 - c["typical"] for c in cands]))]
    zu = z(unavail)
    for c, a, b in zip(cands, zc, zu):
        c["score"] = round((1 - beta) * a + beta * b, 4)
    kept = [c for c in cands if c["coherence"] >= floor]
    return sorted(kept, key=lambda c: c["score"], reverse=True)[:top]


def selftest():
    atoms = [{"id": f"A{i}", "field": f"f{i % 3}", "sources": [f"s{i // 2}"]} for i in range(8)]
    same = struct_unavailability(atoms[:2], atoms)  # same source, two fields
    apart = struct_unavailability([atoms[0], atoms[2], atoms[4]], atoms)  # all apart, three fields
    assert same < apart, (same, apart)
    merged = [dict(atoms[0], sources=["s0", "s1"]), atoms[2], atoms[4]]  # A0 now cited twice, shares s1 with A2
    assert struct_unavailability(merged, atoms) < apart  # graded, not saturated at the same value
    cands = sample(atoms, 3, 1000, seed=1)
    assert len(cands) == 56 and len({tuple(c["atoms"]) for c in cands}) == 56
    pool = [{"id": "x", "coherence": 9, "typical": 2, "struct_unavailability": 0.9},
            {"id": "y", "coherence": 9, "typical": 9, "struct_unavailability": 0.1},
            {"id": "z", "coherence": 2, "typical": 1, "struct_unavailability": 1.0}]
    out = rank(pool, 0.7, 5, 6)
    assert [c["id"] for c in out] == ["x", "y"], out  # incoherent z dropped, x beats y
    print("selftest ok")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("sample")
    s.add_argument("atoms")
    s.add_argument("--k", type=int, default=3)
    s.add_argument("--n", type=int, default=60)
    s.add_argument("--seed", type=int)
    r = sub.add_parser("rank")
    r.add_argument("scored")
    r.add_argument("--beta", type=float, default=0.7)
    r.add_argument("--top", type=int, default=5)
    r.add_argument("--floor", type=float, default=6, help="drop combos with coherence below this")
    sub.add_parser("selftest")
    a = p.parse_args()
    if a.cmd == "selftest":
        return selftest()
    if a.cmd == "sample":
        atoms = json.load(open(a.atoms))["atoms"]
        json.dump({"candidates": sample(atoms, a.k, a.n, a.seed)}, sys.stdout, indent=2)
    else:
        if not 0 <= a.beta <= 1:
            sys.exit("--beta must be between 0 and 1")
        cands = json.load(open(a.scored))["candidates"]
        json.dump({"ranked": rank(cands, a.beta, a.top, a.floor)}, sys.stdout, indent=2)
    print()


if __name__ == "__main__":
    main()
