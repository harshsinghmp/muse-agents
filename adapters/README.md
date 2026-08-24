# Harness Adapters

One canonical source (`agents/` + `packs/`), many renderers. Adapters transform
definitions into each harness's native agent format. Harness-specific syntax
lives only here — never in core definitions.

## Adapter matrix (researched 2026-08-24)

| Harness | Native format | Status | Install target |
|---|---|---|---|
| OpenCode | `agents/*.md` frontmatter name/description/mode | ✅ adapter | `~/.config/opencode/agents/` |
| Codex CLI | `~/.codex/agents/*.toml` (name, description, developer_instructions) | ✅ adapter | `~/.codex/agents/` |
| Claude Code | `~/.claude/agents/*.md` (name/description) | ✅ renderer only | explicit `--target`; never auto-installs (R1) |
| Hermes Agent | no native roster — ingests via `hermes import-agent codex\|claude-code` | 📄 doc | via import |
| Oh-My-Pi / Pi | skills + extensions; AGENTS.md instructions; no md roster | 📄 doc | skills path |
| Crush | `crush.json` = MCP servers + sessions only | 📄 doc | n/a |
| Orca | GUI orchestrator spawning codex/claude worktrees | 📄 doc | spawns those CLIs |
| Paseo | daemon: providers/profiles runtime config | 📄 doc | runtime |
| Multica | GUI app, no file roster found | 📄 doc | n/a |
| Antigravity | VSCode-fork IDE; workspace rules files | 📄 doc | n/a |

## Usage

```bash
scripts/install.sh --harness opencode --core          # default harness
scripts/install.sh --harness codex --all
scripts/install.sh --harness claude-code --target ~/.claude/agents --core   # override required
```

Or render without installing:

```bash
node adapters/<harness>/render.mjs --core|--packs a,b|--all
```

Rendered output always lands in `dist/<harness>/`.

## Adding an adapter

1. Copy `adapters/opencode/render.mjs`, adjust the frontmatter mapping.
2. Keep scope flags identical (`--core|--packs x,y|--all`).
3. Write a README documenting target path + install command.
4. If the harness has no file roster, document integration here instead.
