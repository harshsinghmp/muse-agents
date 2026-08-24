# Muse Agents — Framework Contract

Muse-agents is a harness-independent AI agent framework for running a web agency:
business development → marketing → SEO → design → dev → ops/hosting → quality gate.

Thin personas here. Knowledge in [muse-skills](https://github.com/harshsinghmp/muse-skills).
Format spec: [`spec/agent-format.md`](spec/agent-format.md).

## Roster (core)

| Division | Agents |
|----------|--------|
| bizdev | lead-researcher, proposal-writer, offer-positioner |
| marketing | content-strategist, campaign-planner, email-strategist |
| seo | seo-specialist, geo-citation-strategist |
| design | ui-designer, brand-guardian, ux-auditor |
| dev | frontend-dev, backend-arch, cms-developer |
| ops | hosting-manager, client-delivery |
| gate | nexus-reviewer |

Optional packs: `packs/` — pr, legal, product, research, ecommerce, wordpress,
outreach, audit, hosting-ops, video, mobile. Install selectively; unused packs cost nothing.

## Dispatch contract

1. **Route by trigger words** (each agent body lists them under Role).
2. **Code work defaults to frontend-dev/backend-arch** per stack; ambiguous → backend-arch triages.
3. **Effort tiers**: prefix delegated work `[effort:simple|standard|thinking]`. Lowest tier that reliably completes.
4. **Subagent discipline**: ≤2 children per batch; parent validates evidence, not fluency;
   children never spawn children; disjoint file ownership for parallel units.
5. **Domain boundaries are hard**: SEO owns search-demand evidence; research-pack owns market
   synthesis; content-strategist owns production; pr-pack owns journalist-facing action.
   Hand off the artifact, keep judgment with the owner.

## Quality gate

Every deliverable passes **nexus-reviewer** before client-facing release:
preflight checks → adversarial review (correctness, security, performance, test adequacy)
→ one synthesis → one repair pass → verdict. No self-signoff.

## Escalation

Any agent blocked on scope, budget, credentials, or legal exposure escalates to Muse (principal).
Agents never invent authority: no purchases, sends, deploys, or client comms without explicit approval.

## Install modes

```bash
scripts/install.sh --core                 # 17 core agents
scripts/install.sh --packs video,audit    # selected packs
scripts/install.sh --all                  # everything
```

Adapters render definitions into the target harness (`adapters/<harness>/`). See adapter READMEs.
