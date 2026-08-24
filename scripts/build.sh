#!/usr/bin/env bash
# muse-agents build: validate definitions (--check) or print roster.
set -euo pipefail
cd "$(dirname "$0")/.."

python3 - "${1:-roster}" <<'PYEOF'
import os, re, sys, glob

mode = sys.argv[1]
errors = []
names = {}
core_names = set()
pack_agents = {}
handoff_refs = []

NAME_RE = re.compile(r'^[a-z][a-z0-9-]+$')
SECTIONS = ["## Role", "## Pre-flight", "## Workflow", "## Output Contract", "## Handoffs"]

def parse_front(text):
    if not text.startswith("---\n"):
        return None, text
    end = text.find("\n---\n", 4)
    if end == -1:
        return None, text
    return text[4:end + 1], text[end + 5:]

def get_str(fm, key):
    m = re.search(rf'^{key}: *(.+)$', fm, re.M)
    return m.group(1).strip() if m else None

def get_list(fm, key):
    m = re.search(rf'^{key}:\n((?:  - .*\n)+)', fm, re.M)
    return [l.strip()[2:] for l in m.group(1).strip().split("\n")] if m else None

def get_never(fm):
    m = re.search(r'^boundaries:\n  never:\n((?:    - .*\n)+)', fm, re.M)
    if not m:
        return None
    return [l.strip()[2:] for l in m.group(1).strip().split("\n")]

files = sorted(glob.glob("agents/*/*.md")) + sorted(glob.glob("packs/*/*.md"))
for f in files:
    parts = f.split(os.sep)
    division_dir = parts[-2]
    fm, body = parse_front(open(f).read())
    if fm is None:
        errors.append(f"{f}: missing/unterminated frontmatter"); continue

    name = get_str(fm, "name")
    if not name or not NAME_RE.match(name or ""):
        errors.append(f"{f}: bad/missing name"); continue
    if name != os.path.splitext(parts[-1])[0]:
        errors.append(f"{f}: name != filename")
    if name in names:
        errors.append(f"{f}: duplicate name '{name}'")
    names[name] = f

    if get_str(fm, "division") != division_dir:
        errors.append(f"{f}: division mismatch with directory '{division_dir}'")
    mission = get_str(fm, "mission")
    if not mission or len(mission) > 120:
        errors.append(f"{f}: mission missing or >120 chars")
    if get_list(fm, "skills") is None:
        errors.append(f"{f}: skills list missing")
    never = get_never(fm)
    if never is None:
        errors.append(f"{f}: boundaries.never list missing")
    elif not 2 <= len(never) <= 5:
        errors.append(f"{f}: boundaries.never must have 2-5 items")
    if get_str(fm, "escalates_to") != "muse":
        errors.append(f"{f}: escalates_to must be 'muse'")

    in_pack = parts[0] == "packs"
    opt = get_str(fm, "optional")
    if in_pack and opt != "true":
        errors.append(f"{f}: pack agent needs optional: true")
    if not in_pack and opt != "false":
        errors.append(f"{f}: core agent needs optional: false")

    pos = [body.find(s + "\n") for s in SECTIONS]
    if any(p == -1 for p in pos):
        missing = [s for s, p in zip(SECTIONS, pos) if p == -1]
        errors.append(f"{f}: missing sections {missing}")
    else:
        if pos != sorted(pos):
            errors.append(f"{f}: sections out of order")
    body_lines = len(body.strip().splitlines())
    if body_lines > 60:
        errors.append(f"{f}: body {body_lines} lines > 60")

    hands = get_list(fm, "handoffs")
    if hands is None:
        errors.append(f"{f}: handoffs list missing")
    else:
        handoff_refs.append((f, division_dir, hands))

    if in_pack:
        pack_agents.setdefault(division_dir, set()).add(name)
    else:
        core_names.add(name)

for f, div, hands in handoff_refs:
    allowed = core_names | pack_agents.get(div, set())
    for h in hands:
        if h not in allowed:
            errors.append(f"{f}: handoff '{h}' does not resolve")

if mode == "--check":
    if errors:
        print(f"FAIL ({len(errors)} errors):")
        for e in errors:
            print("  -", e)
        sys.exit(1)
    n = sum(len(v) for v in pack_agents.values())
    print(f"OK: {len(core_names)} core + {n} pack agents valid across {len(pack_agents)} packs")
else:
    print("CORE:", ", ".join(sorted(core_names)))
    for p in sorted(pack_agents):
        print(f"PACK {p}:", ", ".join(sorted(pack_agents[p])))
PYEOF
