#!/bin/bash
set -euo pipefail

# Installs npm dependencies so Claude Code (web) sessions can immediately
# run `npm run lint` / `npm run build` to verify the app still works.
# Synchronous on purpose: see CLAUDE.md "Working in this repo" section.

cd "$CLAUDE_PROJECT_DIR"

if [ -f package-lock.json ]; then
  npm install
fi
