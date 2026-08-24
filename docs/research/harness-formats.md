# Harness Format Research — 2026-08-24

Ground-truth inspection of the Principal's 11 agent tools (binaries + config
dirs on this machine). Feeds the adapter matrix in `adapters/README.md`.

## File-roster harnesses (renderer adapters)

| Harness | Evidence | Format |
|---|---|---|
| OpenCode | `~/.config/opencode/agents/*.md` | YAML frontmatter: `name`, `description`, `mode: subagent`; body = prompt |
| Codex CLI 0.149.1 | `~/.codex/agents/*.toml` | TOML: `name` (Title Case string), `description`, `developer_instructions` (single escaped string) |
| Claude Code | documented format | `~/.claude/agents/*.md`, frontmatter `name`/`description` (+optional tools/model). Renderer-only here — machine enforces zero-claude R1 |

## Ingestion-based

- **Hermes Agent** (`hermes` on PATH, rich CLI): no native per-agent roster.
  Ships `hermes import-agent {claude-code,codex}` which maps instructions,
  skills, permissions from those setups. Strategy: feed it our codex or
  claude-code dist output. Own identity lives in `~/.hermes/SOUL.md`.

## No file roster (integration docs only)

- **Oh-My-Pi / Pi** (`omp v18.0.4`): `~/.omp/agent/config.yml` has no roster;
  personas via skills (`~/.omp/skills/`) + AGENTS.md. Pi same shape
  (`~/.pi/agent/{extensions,skills}`).
- **Crush v0.89.0**: `~/.config/crush/crush.json` contains only `mcpServers`.
- **Orca**: GUI orchestrator; spawns codex/claude in worktrees; global
  `AGENTS.md` + agent-hooks — our CLIs are the agents.
- **Paseo**: daemon with runtime providers/models/profiles (MCP-managed).
- **Multica**: Electron app dir only (Cache/Cookies) — nothing file-based found.
- **Antigravity**: VSCode-fork IDE profile dirs; workspace rules files, no
  global agent roster.

## Consequences

1. Three renderers cover five tools (opencode, codex, claude-code → hermes).
2. Remaining six get integration documentation, not code — no invented formats
   where none exist.
3. Adapter contract: identical scope flags, output to `dist/<harness>/`,
   README per adapter, install targets never wiped wholesale.
