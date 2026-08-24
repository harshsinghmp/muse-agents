# muse-agents - Claude & Agent Operational Guidelines

## Quick Commands
- **Dev Server**: `npm run dev` / `bun dev`
- **Typecheck**: `npm run typecheck` / `bun run typecheck`
- **Build**: `npm run build` / `bun run build`
- **Nexus Full Verification**: `bash scripts/nexus_verify.sh`
- **Update LLM Docs**: `bun scripts/generate_llms_txt.ts`

## Code & Quality Invariants
- Follow the 8-Stage Reality Machine in `STATE.md`.
- All durable decisions must be recorded in `docs/05_DECISION_LOG.md`.
- All git commits must be meaningful with `Why:`, `What:`, and `Verification:` sections.
- Check `docs/03_ESCALATION_RULES.md` before implementing complex custom automation.
