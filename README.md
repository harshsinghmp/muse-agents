<div align="center">

# muse-agents

Harness-independent AI agent definitions for running a web agency — 21 core agents across 8 divisions, plus 13 opt-in packs (49 total agents).

![GitHub Repo stars](https://img.shields.io/github/stars/harshsinghmp/muse-agents?style=for-the-badge)
![License](https://img.shields.io/github/license/harshsinghmp/muse-agents?style=for-the-badge)
![GitHub tag](https://img.shields.io/github/tag/harshsinghmp/muse-agents?style=for-the-badge)

</div>

## What is this?

muse-agents is a portable roster of agency AI agents: business development, marketing, SEO, design, development, operations, quality gate, and evidence fact-checking. Each agent is a thin persona — trigger words, pre-flight checks, workflow, output contract, handoffs — while domain knowledge lives separately in [muse-skills](https://github.com/harshsinghmp/muse-skills). Definitions are harness-neutral Markdown rendered into your tool of choice (OpenCode, Codex TOML, and Claude Code adapters included).

### Key Architectures & Packs

- **Gauntlet Multi-Agent Loop (`packs/gauntlet/`)**: Bounded iterative improvement engine (Judge freezes contract -> Builder writes minimal diff -> Critic fresh review with `review.json` -> Judge evaluates plateau -> Integrator merges single largest fix).
- **Governed Secretary & Staff Work (`agents/ops/secretary.md` & `packs/secretary/`)**: Evidence-grounded staff-work synthesizer enforcing mandatory `Dissent, Uncertainties & Omissions` sections, primary citation matrices, and SHA-256 action approval tokens.
- **Source & Claim Fact-Checker (`agents/research/fact-checker.md`)**: Adversarial citation and evidence auditor tagging claims with `[RAW]`, `[FETCH]`, `[SEARCH]`, and `[INFER]`.
- **Torvalds Code Reviewer (`agents/dev/code-reviewer.md`)**: Enforces binary correctness, data-structure elegance, zero regressions, and minimal complexity patches.

## Quick Start

```bash
# clone
git clone git@github.com:harshsinghmp/muse-agents.git
cd muse-agents

# validate the roster (no dependencies beyond bash + python3 / bun)
scripts/build.sh --check

# install into OpenCode (~/.config/opencode/agents/)
scripts/install.sh --core                         # opencode (default), 21 core agents
scripts/install.sh --harness codex --all          # codex TOML agents (49 total)
scripts/install.sh --packs gauntlet,secretary     # selected packs
```

Dispatch by trigger words listed in each agent's Role section. Code work defaults to `backend-arch` triage. Every deliverable passes `nexus-reviewer` before client-facing release.

Other harnesses (Claude Code renderer, Codex TOML, Hermes ingestion): [adapters/README.md](adapters/README.md).

## Project Structure

```
muse-agents/
├── adapters/
│   ├── claude-code/
│   ├── codex/
│   └── opencode/
├── agents/
│   ├── bizdev/
│   ├── design/
│   ├── dev/
│   ├── gate/
│   ├── marketing/
│   ├── ops/
│   ├── research/
│   └── seo/
├── packs/
│   ├── audit/
│   ├── ecommerce/
│   ├── gauntlet/
│   ├── hosting-ops/
│   ├── legal/
│   ├── mobile/
│   ├── outreach/
│   ├── pr/
│   ├── product/
│   ├── research/
│   ├── secretary/
│   ├── video/
│   └── wordpress/
├── scripts/
├── spec/
├── tests/
├── AGENTS.md
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
