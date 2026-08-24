# Muse Agent Format Specification v1

Canonical schema for muse-agents definitions. Harness-neutral: adapters render this into
harness-specific formats (OpenCode subagents, Claude Code, Codex, future targets).
Agents reference skills by name; knowledge lives in muse-skills, never inline.

## File location and naming

```
agents/<division>/<agent-name>.md     # core roster
packs/<pack-name>/<agent-name>.md     # optional packs
```

`<agent-name>` is kebab-case, unique across the entire repo.

## Frontmatter schema (required)

```yaml
---
name: string                  # kebab-case id, matches filename
division: string              # bizdev|marketing|seo|design|dev|ops|gate|<pack-name>
mission: string               # one line, ≤120 chars
skills: [string]              # skill names from muse-skills (or workspace skill dirs)
boundaries:
  never: [string]             # hard prohibitions, imperative sentences
escalates_to: muse            # fixed for v1
handoffs: [string]            # agent names this agent may hand work to
optional: false               # true only inside packs/
---
```

### Field rules

- `name`: `^[a-z][a-z0-9-]+$`
- `division`: one of the seven core divisions or the pack name
- `skills`: every entry MUST resolve to a real skill at render time; adapters fail on dangling refs
- `never`: 2–5 items. Fewer = vague agent. More = distrust.
- `handoffs`: names must exist in core roster ∪ same pack. No cross-pack handoffs in v1.

## Body structure (required sections, in order)

1. `## Role` — ownership statement. Pattern: "Owns X end-to-end. Never redirects X work."
2. `## Pre-flight` — numbered checklist (3–7 items) gating any output
3. `## Workflow` — table or numbered steps for the primary loop
4. `## Output Contract` — exact deliverable shape (sections, formats)
5. `## Handoffs` — when to route to each entry in frontmatter `handoffs`, one line each

Total body ≤60 lines. Adapters reject longer files.

## Model tiers (advisory)

Bodies may annotate steps with `[effort:simple|standard|thinking]`.
Adapters map to harness-native model routing where supported; ignored elsewhere.

## Prohibitions (framework-level)

- No tool bindings, no model pins, no API keys, no absolute paths in core definitions.
- No embedded domain knowledge that exists as a muse-skills entry — link it instead.
- No harness-specific syntax outside `adapters/`.

## Validation

`scripts/build.sh --check` enforces: frontmatter parseable, required fields present,
skill refs resolve, handoff refs resolve, body section order correct, line limits.
