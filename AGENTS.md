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
| dev | frontend-dev, backend-arch, cms-developer, code-reviewer |
| ops | hosting-manager, client-delivery, secretary, chief-of-staff |
| gate | nexus-reviewer |
| research | fact-checker |

Optional packs: `packs/` — gauntlet, secretary, pr, legal, product, research, ecommerce, wordpress,
outreach, audit, hosting-ops, video, mobile. Install selectively; unused packs cost nothing.

## Agency Council Alignment

The agent roster maps directly onto the 4-division Agency Council:

- **Nexus (The Quality Gate)**: Runs `nexus-reviewer` and the Gauntlet `critic` & `judge` loops.
- **Sol (Product Architect & Automator)**: Drives `frontend-dev`, `backend-arch`, `cms-developer`, `code-reviewer`, and Gauntlet `builder` & `integrator`.
- **Jasper (Growth & Creative)**: Operates `ui-designer`, `brand-guardian`, `ux-auditor`, `content-strategist`, `campaign-planner`, `email-strategist`, `seo-specialist`, `geo-citation-strategist`, and `fact-checker`.
- **Crew (Delivery & Operations)**: Manages `hosting-manager`, `client-delivery`, `secretary`, `chief-of-staff`, and the Governed Secretary pack (`general-secretary`, `communications`, `operations`, `research-lead`).

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
scripts/install.sh --core                 # 21 core agents
scripts/install.sh --packs gauntlet,secretary,audit  # selected packs
scripts/install.sh --all                  # everything (49 agents)
```

Adapters render definitions into the target harness (`adapters/<harness>/`). See adapter READMEs.




# Git Workflow

Follow this Git workflow strictly.

## Branches

- `master` → Production. **Never commit directly to** `master`**.**
- `dev` → Staging/integration branch.
- `feature/*` → Created from `dev` for individual features/tasks.
- `release/*` → Created from `dev` when changes are ready for production; merge into `master`, then back into `dev`.
- `hotfix/*` → Created from `master` for urgent production fixes; merge into both `master` and `dev`.

## Rules

- Feature branches must be created from `dev`.
- Use descriptive branch names.
- Every merge into `dev` or `master` requires a Pull Request and code review.
- Do not rewrite or force-push `master` or `dev` history.
- Prefer `rebase` within feature branches when integrating changes and keeping history linear.
- For production bugs, use `hotfix/*` rather than merging unfinished work from `dev`.
- Prefer a new revert commit over rewriting shared history.

## Commit Message Standard

- **Subject (≤50 chars)**: Capitalized imperative Conventional Commit (e.g., `Agent: Added New - Code Reviewer`, never `Added code-reviewer` or `Fix stuff`).
- **Body (≤72 chars/line)**: Focus on *why* and non-obvious rationale instead of restating the diff; avoid pronouns (`I`, `we`) and meta-phrasing (`This commit/PR`).
- **Issue References**: Link issues at the bottom (e.g., `Closes #123`, `Resolves #456`).

## Scope of Work &amp; Sprint Lifecycle

All development moves across 4 deterministic lifecycle phases:

```
[ 📋 Requested ] ──► [ 📅 Planned ] ──► [ ⚡ In Progress ] ──► [ ✅ Done ]
 (Issues / PRs)     (Sprint Backlog)    (Active PR / Milestone)  (Shipped to Main)
```

1. **📋 Requested**: Community proposals, PR suggestions, and ecosystem requests pending sprint triage.
2. **📅 Planned**: Scoped SOW items selected for the upcoming sprint.
3. **⚡ In Progress**:
  - Feature branch created from `dev` (`feat/*`).
  - Dedicated GitHub milestone created and draft PR opened against `dev`.
  - Item moved to `In Progress` on the README roadmap board.
4. **✅ Done**:
  - Tests and static typing pass cleanly (`bun test`, `tsc --noEmit`).
  - PR merged into `dev`, fast-forwarded to `main`, and milestone closed.
  - Item moved to `Done` on the README roadmap board.

## Releases &amp; Semantic Versioning (`vX.Y.Z`)

All releases and git tags must follow strict `vX.Y.Z` semantic versioning:

- `X` **(Major)**: Breaking architectural changes, core schema shifts, or protocol overhauls (`vX.0.0`).
- `Y` **(Feature)**: Substantive new agent capabilities, MCP tools, or CLI subcommands (`vX.Y.0`).
- `Z` **(Minor / Hotfix / Critical Fix)**: Bug fixes, security patches, performance, and urgent hotfixes (`vX.Y.Z`).

### Invariants:

- Sync `package.json` `"version"` with the `vX.Y.Z` tag in the release commit.
- Stage on `release/vX.Y.Z` from `dev` → merge to `master` → back-merge to `dev`.
- CI publishes on `v*` tag push (`git tag -a vX.Y.Z -m "release: vX.Y.Z"`). Never `npm publish` manually.

