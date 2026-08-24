# OpenCode Adapter

Renders canonical definitions (`agents/`, `packs/`) into OpenCode subagent format:

- frontmatter → `name` / `description` (= mission) / `mode: subagent`
- body passed through unchanged

## Render

```bash
node adapters/opencode/render.mjs --core              # core only -> dist/opencode/
node adapters/opencode/render.mjs --packs video,audit # selected packs
node adapters/opencode/render.mjs --all               # everything
```

## Install into OpenCode

```bash
cp dist/opencode/*.md ~/.config/opencode/agents/
```

Or use repo-root `scripts/install.sh --core|--packs ...|--all`, which renders + copies in one step.
