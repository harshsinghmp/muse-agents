#!/usr/bin/env bash
# muse-agents installer: render + copy into OpenCode agents dir.
# Usage: install.sh --core | --packs a,b | --all [--target DIR]
set -euo pipefail
cd "$(dirname "$0")/.."

TARGET="${HOME}/.config/opencode/agents"
MODE="--core"
PACKS=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --core|--all) MODE="$1"; shift ;;
    --packs) MODE="$1"; PACKS="${2:?--packs needs list}"; shift 2 ;;
    --target) TARGET="$2"; shift 2 ;;
    *) echo "unknown flag: $1" >&2; exit 1 ;;
  esac
done

scripts/build.sh --check

if [[ "$MODE" == "--packs" ]]; then
  node adapters/opencode/render.mjs --packs "$PACKS"
else
  node adapters/opencode/render.mjs "$MODE"
fi

mkdir -p "$TARGET"
cp dist/opencode/*.md "$TARGET/"
echo "installed $(ls dist/opencode/*.md | wc -l) agents -> $TARGET"
