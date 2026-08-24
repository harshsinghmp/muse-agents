# Codex Adapter

Renders canonical definitions into Codex CLI TOML agents (`~/.codex/agents/*.toml`):
`name` (Title Case), `description` (= mission), `developer_instructions` (= mission + full body).

## Render

```bash
node adapters/codex/render.mjs --core
node adapters/codex/render.mjs --packs video,audit
node adapters/codex/render.mjs --all
```

Output: `dist/codex/*.toml`.

## Install

```bash
cp dist/codex/*.toml ~/.codex/agents/
# or via installer:
scripts/install.sh --harness codex --core
```

## Bonus: Hermes ingestion

Hermes Agent imports the Codex setup directly:

```bash
hermes import-agent codex
```
