# Project Change Ledger (SUMMARY.md)

## [2026-09-01] - v1.1.0 Governed Agent Packs & Multi-Agent Gauntlet
- **Author**: Muse (Chief Agency Orchestrator)
- **Changes**:
  - Implemented Gauntlet Multi-Agent loop pack (`packs/gauntlet/`) with `pack.json`, `builder.md`, `critic.md`, `integrator.md`, `judge.md`.
  - Implemented Governed Secretary pack (`packs/secretary/`) with `pack.json`, `general-secretary.md`, `communications.md`, `operations.md`, `research-lead.md`.
  - Added core agents: `agents/ops/secretary.md`, `agents/ops/chief-of-staff.md`, `agents/research/fact-checker.md`, `agents/dev/code-reviewer.md`.
  - Updated Agency Council mapping (Sol, Jasper, Crew, Nexus).
  - Added comprehensive Bun unit tests in `tests/unit/` enforcing spec compliance, frontmatter schemas, body section order, line limits, and adapter rendering.
  - Updated framework contract `AGENTS.md`, `spec/agent-format.md`, `README.md`, `docs/`, and dynamic `llms.txt`.

## [2026-08-24] - Project OS Initialization
- **Author**: Muse (Chief Agency Orchestrator)
- **Changes**:
  - Initialized 10 Canonical Docs in `docs/`.
  - Created `.agentrules`, `AGENTS.md`.
  - Configured 8-Stage Reality Machine (`STATE.md`).
  - Added dynamic `llms.txt` and `llms-full.txt` generator.
  - Initialized Nexus verification script (`scripts/nexus_verify.sh`).

