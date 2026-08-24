# Architecture & Runtime Topology

## 1. Stack Specifications
- **Framework**: generic (Latest release)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS / Modern CSS tokens
- **Runtime**: Node.js / Bun

## 2. Data Flow & Structure
- Client requests routed through standard framework endpoints.
- Isolated state management with deterministic unidirectional flow.

## 3. Key Directory Layout
```
├── docs/             # Canonical project brain (10 authoritative sources)
├── src/ (or app/)    # Application source code
├── scripts/          # Automation & verification scripts
├── tests/            # E2E & visual probe test suite
├── STATE.md          # 8-Stage Reality Machine
├── SUMMARY.md        # Rolling change ledger
├── llms.txt          # Standard LLM discovery index
└── llms-full.txt     # Complete bundled documentation
```
