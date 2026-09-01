# Reality State Machine

> **Rule**: An item only moves from PROPOSED to PROD_VERIFIED when verified with deterministic evidence.

```
[PROPOSED] → [APPROVED] → [LOCAL_DEV] → [LOCAL_VERIFIED] → [STAGING_DEPLOYED] → [STAGING_VERIFIED] → [PROD_DEPLOYED] → [PROD_VERIFIED]
```

## Current Workstream States

| Item / Feature | State | Owner | Verification Evidence |
|---|---|---|---|
| **Project Framework & Spec** | `PROD_VERIFIED` | Muse | `spec/agent-format.md`, `build.sh --check` pass |
| **21 Core Agent Personas** | `PROD_VERIFIED` | Sol/Jasper/Crew/Nexus | 21 core agents across 8 divisions verified |
| **Gauntlet Multi-Agent Loop** | `PROD_VERIFIED` | Nexus/Sol | `packs/gauntlet/` manifest + 4 agents pass |
| **Governed Secretary Pack** | `PROD_VERIFIED` | Crew | `packs/secretary/` manifest + 4 agents pass |
| **Multi-Harness Adapters** | `PROD_VERIFIED` | Sol | OpenCode, Codex, Claude Code renderers pass |
| **Automated Test Suite** | `PROD_VERIFIED` | Nexus | 24 bun tests passing across unit test suites |

