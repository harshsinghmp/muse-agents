# Nexus Contract Probes & Test Criteria

## 1. Deterministic Probes
- **Build / Roster Probe**: `bun run build` (`bash scripts/build.sh --check`) must exit with code 0.
- **Unit Test Probe**: `bun test tests/unit` must return 0 failures across all unit test suites.
- **Agent Specification Probe**: All agents must satisfy schema, frontmatter, and section ordering in `spec/agent-format.md`.

## 2. Runtime & Harness Probes
- **OpenCode Adapter Probe**: `node adapters/opencode/render.mjs --core` generates valid subagent markdown definitions.
- **Codex Adapter Probe**: `node adapters/codex/render.mjs --all` generates valid TOML agent definitions.
- **Claude Code Adapter Probe**: `node adapters/claude-code/render.mjs --all` generates valid agent markdown files.
