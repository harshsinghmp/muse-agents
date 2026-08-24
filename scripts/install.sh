#!/usr/bin/env bash
# muse-agents installer: validate, render, copy into a harness agents dir.
# Usage: install.sh [--harness opencode|codex|claude-code] --core | --packs a,b | --all [--target DIR]
set -euo pipefail
cd "$(dirname "$0")/.."

HARNESS="opencode"
TARGET=""
MODE="--core"
PACKS=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --core|--all) MODE="$1"; shift ;;
    --packs) MODE="$1"; PACKS="${2:?--packs needs list}"; shift 2 ;;
    --harness) HARNESS="${2:?--harness needs name}"; shift 2 ;;
    --target) TARGET="${2:?--target needs dir}"; shift 2 ;;
    *) echo "unknown flag: $1" >&2; exit 1 ;;
  esac
done

case "$HARNESS" in
  opencode)    DEFAULT_TARGET="${HOME}/.config/opencode/agents"; EXT="md" ;;
  codex)       DEFAULT_TARGET="${HOME}/.codex/agents";           EXT="toml" ;;
  claude-code)
    # Zero-claude policy (R1): never default to ~/.claude.
    if [[ -z "$TARGET" ]]; then
      echo "claude-code harness requires explicit --target (refusing ~/.claude default)" >&2
      exit 1
    fi
    DEFAULT_TARGET="$TARGET"; EXT="md" ;;
  *) echo "unknown harness: $HARNESS" >&2; exit 1 ;;
esac

scripts/build.sh --check

# Fresh render scope only — never touch the target's other files.
rm -rf "dist/$HARNESS"

if [[ "$MODE" == "--packs" ]]; then
  node "adapters/${HARNESS}/render.mjs" --packs "$PACKS"
else
  node "adapters/${HARNESS}/render.mjs" "$MODE"
fi

mkdir -p "$DEFAULT_TARGET"
cp dist/"$HARNESS"/*."$EXT" "$DEFAULT_TARGET/"
echo "installed $(ls dist/$HARNESS/*.$EXT | wc -l) agents -> $DEFAULT_TARGET"
