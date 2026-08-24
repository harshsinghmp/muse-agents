# muse-agents

Harness-independent AI agent framework for running a web agency:
**bizdev → marketing → SEO → design → dev → ops → quality gate.**

Thin personas live here; domain knowledge lives in
[muse-skills](https://github.com/harshsinghmp/muse-skills).

## Structure

```
agents/<division>/*.md   # 17 core agents, 7 divisions
packs/<name>/*.md        # 11 optional packs (20 agents)
spec/agent-format.md     # canonical definition schema
adapters/opencode/       # renderer -> OpenCode subagents
scripts/build.sh         # validator (--check) + roster printer
scripts/install.sh       # render + install into OpenCode
docs/research/           # aidevops mining notes
```

## Validate

```bash
scripts/build.sh --check    # schema, sections, handoff resolution
scripts/build.sh            # print roster
```

## Install (OpenCode)

```bash
scripts/install.sh --core                 # 17 core agents
scripts/install.sh --packs video,audit    # selected packs
scripts/install.sh --all                  # everything (~37 agents)
scripts/install.sh --core --target DIR    # custom harness dir
```

Rendered files land in `~/.config/opencode/agents/` by default.
Adapters for other harnesses follow the same pattern under `adapters/`.

## Dispatch contract

Route by trigger words in each agent's Role section. Code work defaults to
`backend-arch` triage. Every deliverable passes `nexus-reviewer` before
client-facing release. Full rules: [AGENTS.md](AGENTS.md).
