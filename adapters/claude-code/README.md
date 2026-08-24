# Claude Code Adapter

Renders canonical definitions into Claude Code subagent files (`~/.claude/agents/*.md`):
frontmatter becomes `name` / `description`; body passes through unchanged.

## Render (safe anywhere)

```bash
node adapters/claude-code/render.mjs --core
node adapters/claude-code/render.mjs --all
```

Output: `dist/claude-code/*.md`.

## Install — explicit target only

This repo enforces a zero-claude policy on the author's machine (R1: no writes to
`~/.claude`). The renderer never installs by default. On a machine where Claude Code
is wanted:

```bash
cp dist/claude-code/*.md ~/.claude/agents/
# or via installer with an explicit override:
scripts/install.sh --harness claude-code --target ~/.claude/agents --core
```

## Bonus: Hermes ingestion

Hermes Agent imports this format directly:

```bash
hermes import-agent codex    # after installing the codex dist
hermes import-agent claude-code
```
