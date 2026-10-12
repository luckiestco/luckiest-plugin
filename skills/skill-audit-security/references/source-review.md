# Source review

Adapted from NVIDIA SkillSpector's skill-inspector (Apache-2.0). See ../ATTRIBUTION.md.

## The 10 questions

Answer each one with file:line evidence, or "none found".

1. **Purpose fit.** Does the code do only what the description promises? Anything extra is EA3 scope creep.
2. **Permission fit.** Do `allowed-tools`, MCP scopes, and requested access match what the skill actually does? `Bash(*)` for a copywriting skill is EA1.
3. **Sensitive access.** Does it read tokens, credentials, SSH keys, `.env`, home-directory config, other installed skills, or agent memory? (PE3, E2, E3)
4. **External transmission.** What leaves the machine, to which host, and is that host named in the docs? Unnamed hosts are E1/E4 real risks.
5. **Execution.** Shell or subprocess calls, dynamic code execution or imports, decoded payloads, downloaded code? (AST1-9, SC2, SC3, TT5)
6. **Persistence.** Cron jobs, LaunchAgents, shell profile hooks, Claude Code hooks, self-rewriting files, hidden state files? (RA1, RA2, MP1)
7. **Prompt risk.** Does it weaken safety rules, hide actions from the user, expose the agent's internal instructions, or steer future sessions? (P1-P9, AR1-3, MP1-3)
8. **Trigger risk.** Are triggers broad enough to hijack unrelated requests, or do they shadow built-in commands or other skills? (TR1-3)
9. **Supply chain.** Unpinned installs, always-latest package runs, downloads piped into a shell, typo-close package names, added package sources? (SC1-SC10)
10. **User control.** Does every destructive, paid, outward-facing, or credential-touching action ask first?

## Verdict rubric

- **APPROVE**: no unsuppressed HIGH or CRITICAL, no unexplained sensitive behavior, and the source matches the description.
- **CAUTION**: sensitive behavior exists, but it is documented, necessary, bounded, and the user controls it.
- **REJECT**: malicious or deceptive behavior, unexplained HIGH or CRITICAL, hidden prompt injection, credential theft, unknown exfiltration, obfuscated execution, unconsented persistence, or a clear mismatch between description and behavior.

## Score posture

The score sets the starting posture. The source review sets the verdict.

| Score | Default posture |
|---:|---|
| 0-20 | Usually APPROVE after a quick source read |
| 21-35 | APPROVE only when every finding is explained |
| 36-50 | CAUTION unless every concern is explained |
| 51-80 | REJECT unless the source is trusted and every sensitive behavior is needed |
| 81-100 | REJECT |

## Baseline entries

A false positive goes into the baseline, never into a rewrite meant to hide it. Each entry needs a reason a reviewer can check, for example:

```yaml
version: 2
rules:                          # globs, survive edits
  - id: "PE3"
    path: "luckiest-coder-guard/SKILL.md"
    message: "*never open*"
    reason: "Line is a prohibition, not an access"
fingerprints:                   # exact, written by `skillspector baseline`
  - hash: "sha256:..."
    rule_id: "RA2"
    file: "SKILL.md"
    reason: "Audit writes its own CSV to scratchpad on request"
```

Prefer `rules` with a narrow `path` and `message` over blanket `id` rules. A bare `id: "PE3"` would hide every future credential read.

Generate a starting baseline with `skillspector baseline <dir> -o <file> --no-llm`, then delete every entry that is a real risk and write a reason on every entry you keep. Never baseline a REJECT-class finding.
