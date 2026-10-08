#!/usr/bin/env bash
# check-freeze.sh — PreToolUse(Edit|Write) hook for luckiest-coder-guard.
# Reads JSON from stdin, checks whether file_path is within the freeze boundary.
# Emits {"permissionDecision":"deny","message":"..."} to block, or {} to allow.
# No boundary file set → allows everything (this is "careful" mode).
set -euo pipefail

INPUT=$(cat)

STATE_DIR="${CLAUDE_PLUGIN_DATA:-$HOME/.luckiest}"
FREEZE_FILE="$STATE_DIR/freeze-dir.txt"

if [ ! -f "$FREEZE_FILE" ]; then echo '{}'; exit 0; fi

FREEZE_DIR=$(tr -d '[:space:]' < "$FREEZE_FILE")
if [ -z "$FREEZE_DIR" ]; then echo '{}'; exit 0; fi

FILE_PATH=$(printf '%s' "$INPUT" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//;s/"$//' || true)
if [ -z "$FILE_PATH" ]; then
  FILE_PATH=$(printf '%s' "$INPUT" | python3 -c 'import sys,json; print(json.loads(sys.stdin.read()).get("tool_input",{}).get("file_path",""))' 2>/dev/null || true)
fi
if [ -z "$FILE_PATH" ]; then echo '{}'; exit 0; fi

case "$FILE_PATH" in
  /*) ;;
  *) FILE_PATH="$(pwd)/$FILE_PATH" ;;
esac
FILE_PATH=$(printf '%s' "$FILE_PATH" | sed 's|/\+|/|g;s|/$||')

# Resolve symlinks and .. (POSIX-portable, works on macOS).
_resolve_path() {
  local _dir _base
  _dir="$(dirname "$1")"
  _base="$(basename "$1")"
  _dir="$(cd "$_dir" 2>/dev/null && pwd -P || printf '%s' "$_dir")"
  printf '%s/%s' "$_dir" "$_base"
}
FILE_PATH=$(_resolve_path "$FILE_PATH")
FREEZE_DIR=$(_resolve_path "$FREEZE_DIR")

case "$FILE_PATH" in
  "${FREEZE_DIR}/"*|"${FREEZE_DIR}")
    echo '{}'
    ;;
  *)
    printf '{"permissionDecision":"deny","message":"[guard] Blocked: %s is outside the freeze boundary (%s). Only edits within the frozen directory are allowed. Run the unfreeze step to clear it."}\n' "$FILE_PATH" "$FREEZE_DIR"
    ;;
esac
