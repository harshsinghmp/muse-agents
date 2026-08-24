# Aidevops Mining Notes (Phase 1)

Source: github.com/marcusquinn/aidevops @ main (sparse checkout, MIT licensed).
Scope: role boundaries, routing logic, workflow patterns worth porting. No code deps copied.

## Frontmatter schema observed

```yaml
name, description, mode: subagent|agent
tools: {read/write/edit/bash/glob/grep/webfetch/browser: true}
subagents: [list of child agent names]
```

## Body section patterns

1. Role — one-paragraph ownership statement ("Own all X work — never redirect")
2. Quick Reference — tools/commands/subagent index
3. Pre-flight Questions / Validation — numbered gate before output
4. Workflows — tables mapping task type → scope/steps
5. Guardrails — scope whitelists, audit, rollback, judgment rules
6. Compliance/deliverability sections where regulated (email, legal)
7. Troubleshooting table

## Routing patterns (reference/agent-routing.md) — PORT TO FRAMEWORK CONTRACT

- **Routing order**: read task → code work = default agent → trigger-word match → capability check → fallback to default agent
- **Trigger-word table**: each primary agent has explicit trigger words
- **Domain boundary statements** (key example): "SEO owns search-demand evidence... Research owns wider market and competitor synthesis, Content owns topic production, PR owns current-story verification... Hand off the intent ledger; do not move adjacent-domain judgment into SEO."
- **Effort tiers**: `[effort:simple|standard|thinking]` prefix on every delegated prompt; lowest tier that reliably completes
- **Subagent discipline**:
  - Subagents only for independent advisory work; never delegate the active critical path
  - Max 2 children per batch, wait before next batch
  - Parent validates child results; fluent output ≠ success
  - Children never dispatch grandchildren
  - Final-only summaries: decision + evidence + uncertainty + next action
  - Disjoint file ownership for parallel units; overlap serialized
  - Persist unit evidence for retry/reuse after interruption

## Domain definitions mined (13 top agents)

| Agent | Ownership |
|-------|-----------|
| business | company orchestration: finance, invoicing, receipts, runners |
| marketing-sales | campaigns, paid ads, CRO, direct-response copy, CRM, proposals, outreach |
| seo | search intent, keyword research, GSC, GEO/SRO/AI-search readiness, site audit |
| content | all media production+distribution: blog/video/social/newsletter/podcast/image |
| pr | earned media, journalist research, media lists, newsjacking, coverage tracking |
| product | validation, onboarding, monetisation, growth, UI direction, analytics |
| research | market/competitor/technical analysis, external tool evaluation |
| legal | contracts, privacy/terms policies, GDPR compliance (+ "informational only" disclaimer rule) |
| build+ | code: features, bugs, refactors, CI, PRs (default agent) |
| automate | scheduling, dispatch, monitoring, pulse |
| vault | encrypted credentials ops (SKIP — rejected machinery) |
| health | wellness content (SKIP — not agency line) |

## Workflow patterns to port into AGENTS.md contract

- mission → milestones → validation gates (mission-orchestrator pattern)
- preflight/postflight checks around every dispatched task
- cross-review: second-model review of risky outputs
- brief routing with model tiers (simple/standard/thinking)
- public-launch-checklist as delivery gate
- branch workflows: feature/hotfix/bugfix/release/refactor/chore/experiment

## Marketing specifics worth keeping in persona bodies

- Pre-flight validation: real painful problem? benefits-before-features? provable claims? named personas? who says no?
- Email benchmarks: open 20-30%, click 2-5%, conv 1-3%, unsub <0.5%
- Sequence templates: Welcome D0/D2/D5/D7/D10; Nurture education→case→comparison→demo→follow-up
- Segmentation tag taxonomy: demographic/behavioral/lifecycle/interest/source prefixes
- Deliverability: SPF/DKIM/DMARC, warm domains, double opt-in, instant unsubscribe honor
- Lead handoff: lead-mql tag → sales qualify → lead-sql tag → exit nurture

## SEO specifics worth keeping

- Opportunity classes: Quick Wins (pos 4-20), Striking Distance (11-30), Low CTR, Cannibalization
- E-E-A-T scoring: 7 criteria (Authorship, Citation, Effort, Originality, Intent, Subjective Quality, Writing)
- GEO pipeline: intent evidence → baseline → fanout → GEO → SRO → hallucination defense → agent discovery
- Tool routing table GSC/DataForSEO/Serper/Ahrefs/Semrush by capability

## Legal disclaimer rule

All legal output carries "informational only, consult qualified professional" disclaimer; citations manually verified.

## Rejected (documented decision)

Pulse scheduler, credentials vault, GUI/packages, MCP servers, health/vault agents,
24-platform communications matrix, remotion video internals (packs reference skills instead).
