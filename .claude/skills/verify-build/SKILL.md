---
name: verify-build
description: Verify the Next.js app still lints and builds cleanly. Use this before treating any code change in this repo as finished, and whenever asked to "check the build", "make sure it still works", or similar.
---

# Verify Build

This repo's standing rule (see `CLAUDE.md`) is that the app must stay in a working, buildable state after every set of changes. Use this skill to check that before calling a task done.

## Steps

1. Run `npm run lint` from the repo root. Fix any errors before proceeding — don't silence them with disabled rules unless the rule itself is wrong for this codebase.
2. Run `npm run build` from the repo root. A failing build means the task is not done, regardless of what else was accomplished.
3. If either fails, fix the root cause in the changed files. Don't revert to a previous working version to "pass" the check unless the user asked for a revert.
4. Report the result plainly: lint clean/not, build clean/not, and if not, what's still broken and why.

## Notes

- `.claude/hooks/session-start.sh` already runs `npm install` at session start, so dependencies should be present — if a command fails with a missing-module error, run `npm install` again rather than assuming the check itself is broken.
- This mirrors exactly what `.github/workflows/ci.yml` runs on every push/PR — if this skill passes locally, CI should pass too.
