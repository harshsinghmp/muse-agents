<div align="center">

# muse-agents

Harness-independent AI agent definitions for running a web agency — 17 core agents across 7 divisions, plus opt-in packs.

![GitHub Repo stars](https://img.shields.io/github/stars/harshsinghmp/muse-agents?style=for-the-badge)

</div>

## What is this?

muse-agents is a portable roster of agency AI agents: business development, marketing, SEO, design, development, operations, and a mandatory quality gate. Each agent is a thin persona — trigger words, pre-flight checks, workflow, output contract, handoffs — while domain knowledge lives separately in [muse-skills](https://github.com/harshsinghmp/muse-skills). Definitions are harness-neutral Markdown rendered into your tool of choice (OpenCode adapter included).

## Quick Start

```bash
# clone
git clone git@github.com:harshsinghmp/muse-agents.git
cd muse-agents

# validate the roster (no dependencies beyond bash + python3)
scripts/build.sh --check

# install into OpenCode (~/.config/opencode/agents/)
scripts/install.sh --core                # opencode (default), 17 core agents
scripts/install.sh --harness codex --all # codex TOML agents
scripts/install.sh --packs video,audit   # selected packs
```

Dispatch by trigger words listed in each agent's Role section. Code work defaults to `backend-arch` triage. Every deliverable passes `nexus-reviewer` before client-facing release.

Other harnesses (Claude Code renderer, Hermes ingestion, orchestrator-only tools): [adapters/README.md](adapters/README.md).

## Project Structure

```
muse-agents/
├── adapters/
│   └── opencode/
├── agents/
│   ├── bizdev/
│   ├── design/
│   ├── dev/
│   ├── gate/
│   ├── marketing/
│   ├── ops/
│   └── seo/
├── packs/
│   ├── audit/
│   ├── ecommerce/
│   ├── hosting-ops/
│   ├── legal/
│   ├── mobile/
│   ├── outreach/
│   ├── pr/
│   ├── product/
│   ├── research/
│   ├── video/
│   └── wordpress/
├── scripts/
├── spec/
├── tests/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── STATE.md
└── SUMMARY.md
```

## Documentation

| Resource | Description |
|----------|-------------|
| [AGENTS.md](AGENTS.md) | Framework contract: dispatch rules, subagent discipline, quality gate |
| [spec/agent-format.md](spec/agent-format.md) | Canonical schema every definition must satisfy |
| [adapters/opencode/README.md](adapters/opencode/README.md) | Renderer usage for OpenCode subagents |
| [docs/research/aidevops-mining.md](docs/research/aidevops-mining.md) | Pattern research behind the format |

## Contributing

New agents must satisfy `spec/agent-format.md` and pass `scripts/build.sh --check` before merge. Add core agents under `agents/<division>/`, optional specialists under `packs/<name>/`.

<a href="https://github.com/harshsinghmp/muse-agents/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=harshsinghmp/muse-agents" />
</a>

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

[![Star History Chart](https://api.star-history.com/svg?repos=harshsinghmp/muse-agents&type=Date)](https://star-history.com/#harshsinghmp/muse-agents&Date)

</div>
