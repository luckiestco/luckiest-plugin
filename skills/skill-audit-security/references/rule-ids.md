# SkillSpector rule IDs

Summary of the categories SkillSpector reports (Apache-2.0, NVIDIA). Use it to read reports and to rank `top_rules`. The CLI holds the actual detection logic; this file does not copy it.

| Category | IDs | Watch for |
|---|---|---|
| Prompt injection | P1-P5, P9 | overriding earlier rules, hidden or padded text, instructions to send data out |
| Anti-refusal | AR1-AR3 | telling the agent to obey every request, drop warnings, or ignore its guidelines |
| Data exfiltration | E1-E4 | external sends, env harvesting, directory sweeps, context leakage |
| Privilege escalation | PE1-PE3 | excess permissions, sudo, credential reads |
| Supply chain | SC1-SC10 | unpinned deps, piping downloads into a shell, encoded payloads, CVEs, typosquats, bytecode, swapped package sources |
| Excessive agency | EA1-EA5 | unrestricted tools, no human in the loop, scope creep, provider/model switching |
| Output handling | OH1-OH3 | model output used unsanitized or unbounded |
| System prompt leakage | P6-P8 | exposing the agent's internal instructions |
| Memory poisoning | MP1-MP3 | persistent context injection, memory tampering |
| Tool misuse | TM1-TM3 | forced or shell-mode tool flags, disabled TLS, unsafe defaults |
| Rogue agent | RA1-RA2 | self-modification, cron or startup persistence |
| Trigger abuse | TR1-TR3 | broad, shadowing, or keyword-bait triggers |
| Behavioral AST | AST1-AST9 | dynamic code execution, dynamic imports, subprocess and shell calls |
| Taint tracking | TT1-TT5 | source-to-sink flows, credential to network, input to exec |
| YARA | YR1-YR4 | malware, webshell, cryptominer, hack tool signatures |
| MCP least privilege / tool poisoning | MCP rules | over-scoped MCP tools, poisoned tool descriptions, rug-pull changes |

| Artifact evidence | AE1-AE6, SC8, SC9 | references the scanner could not inspect, shipped bytecode, concealed executables |

Severity order for `top_rules`: CRITICAL, HIGH, MEDIUM, LOW, then higher confidence first.

Trigger abuse (TR1-TR3) overlaps the audit's own trigger-accuracy check. When both flag a skill, report it once, under the security verdict.
