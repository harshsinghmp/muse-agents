# Architecture & Runtime Topology

## 1. Stack Specifications
- **Format**: Harness-neutral YAML frontmatter Markdown definitions (`spec/agent-format.md`)
- **Language**: TypeScript / Bun / Node.js / Python3
- **Adapters**: OpenCode subagents, Codex TOML, Claude Code
- **Validation**: Python/Bun specification validator and automated test suite

## 2. Multi-Agent Topology & Gauntlet Loop
- **Gauntlet Loop**: Bounded iterative refinement pack (`packs/gauntlet/`)
  - `[User/Prompt] -> [Judge: Freeze Contract] -> [Builder: Write Diff] -> [Critic: Fresh Review with review.json] -> [Judge: Pass or Fix] -> (Fix -> [Integrator: Apply 1 Largest Fix] -> Critic | Pass -> [Complete])`
- **Governed Secretary**: Evidence-grounded staff-work synthesizer (`agents/ops/secretary.md` & `packs/secretary/`) with SHA-256 approval tokens and dissent mandates.
- **Quality Gate**: Adversarial quality verification via `nexus-reviewer`.

## 3. Directory Layout
```
muse-agents/
├── adapters/         # Target harness renderers (opencode, codex, claude-code)
├── agents/           # 21 core agent personas across 8 divisions
├── packs/            # 13 opt-in specialized packs (gauntlet, secretary, etc.)
├── scripts/          # build, install, llms generator, nexus verify
├── spec/             # Canonical agent and pack specifications
├── tests/            # Unit and probe test suites
├── AGENTS.md         # Framework contract and dispatch rules
├── README.md         # Documentation and quick start
├── STATE.md          # Reality state
├── SUMMARY.md        # Change ledger
├── llms.txt          # LLM discovery index
└── llms-full.txt     # Complete bundled documentation
```
