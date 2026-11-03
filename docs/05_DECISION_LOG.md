# Architectural Decision Records (ADR)

## Format
Every major architectural decision is recorded using this schema:

### [ADR-001] Project OS Initialization
- **Date**: 2026-08-24
- **Status**: APPROVED
- **Context**: Initialized the project with the LifeOS Agency Council operating system.
- **Decision**: Adopted the 10 Canonical Docs, 8-Stage Reality Machine, Meaningful Git Commit Protocol, and Nexus verification harness.
- **Consequences**: Deterministic state tracking, anti-hallucination guardrails, and zero secret leakage.

### [ADR-002] Governed Agent Packs & Gauntlet Loop
- **Date**: 2026-09-01
- **Status**: APPROVED
- **Context**: Agency workflows required bounded iterative refinement loops and evidence-grounded staff operations.
- **Decision**: Introduced Gauntlet multi-agent pack (`packs/gauntlet/` with builder, critic, integrator, judge) and Governed Secretary pack (`packs/secretary/`), backed by automated Bun unit test verification.
- **Consequences**: Self-grading prevented by protocol; plateau-detection limits infinite loops; staff work requires dissent sections and approval tokens.
