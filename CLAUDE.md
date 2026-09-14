@AGENTS.md

# CLAUDE.md — eShopOnWeb React

This is the React (Next.js) frontend for the eShopOnWeb catalog modernization. It is a **separate repository by design** — the backend (`PublicApi`, ASP.NET Core) stays in `eshoponweb-siva` and is consumed here only over HTTP. Nothing in this repo should ever import, reference, or assume knowledge of the .NET solution's internal C# types — only its public JSON contract.

## Authoritative sources (read these before implementing a screen)

1. **AS-IS behavior / API contract**: `eshoponweb-siva` repo, `docs/as_is_lld/as_is_lld_catalog.md` — the verified, source-traced description of what the current system does and the exact `PublicApi` request/response shapes this app must integrate against. This is the current source of truth; an older file this repo's `to_be_react_instruction.md` refers to (`01_AS_IS_MVC_Catalog_LLD.md` at the eshoponweb-siva repo root) has been removed as superseded — treat the LLD path above as authoritative instead.
2. **Target React design**: `docs/02_TO_BE_React_Catalog_LLD.md` in *this* repo — the design doc `to_be_react_instruction.md` names as the source of truth for the catalog screen. Read it before writing catalog feature code; don't invent routing/component/state decisions it doesn't cover.
3. **Engineering conventions**: `Copilot.md` (generic React/TypeScript engineering guidelines) and `to_be_react_instruction.md` (POC-specific scope and process rules) at the repo root — these apply to Claude the same as they do to Copilot. Read them before writing feature code.

## Target architecture

`Copilot.md` §3 is the architecture authority for this repo (pages / components / services / data-access / types / hooks / constants / utilities, co-located until reuse is proven — see that file for the full rules). `docs/02_TO_BE_React_Catalog_LLD.md` §4 maps those categories onto the catalog screen's concrete folders; the same shape applies to any new screen added later:

```
src/
├── app/                 # "pages" — Next.js App Router route segments
│   └── <route>/_components/   # screen-local components, co-located
├── components/           # shared/cross-page components — only once 2+ screens need one
├── services/              # "services, data-access" — PublicApi client functions
├── types/                 # API/domain TypeScript types
├── hooks/                 # client-side state, only when a screen actually needs it
├── constants/              # e.g. ITEMS_PER_PAGE
└── lib/                    # small cross-cutting utilities, only when one is needed
```

Don't scaffold `components/`, `hooks/`, or `lib/` ahead of a concrete need — `Copilot.md` §1/§2 explicitly warns against unnecessary abstraction layers, and `components/` specifically is for *proven* reuse (a second consumer), not anticipated reuse. Start new screen-specific code under `app/<route>/_components/`, `app/<route>/` etc., and promote to the shared folders only when something outside that route actually needs it.

## Working in this repo — the app must stay buildable

**Every set of changes must leave `npm run build` (and `npm run lint`) passing.** This is not aspirational — it's enforced two ways:
- `.claude/hooks/session-start.sh` installs dependencies at the start of every Claude Code web session (via `.claude/settings.json`), so `npm run lint` / `npm run build` are always immediately runnable.
- `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, and `npm run build` on every push/PR to `main`.

Before treating any task as done: run `npm run lint` and `npm run build` locally and confirm both succeed. Don't leave the tree in a state where a fresh clone wouldn't build. If a change is large, land it as a sequence of smaller commits that are each independently buildable rather than one commit that temporarily breaks the app.

## Stack (as scaffolded)

- Next.js (App Router), TypeScript, ESLint — `create-next-app` defaults, no extra state-management or styling library added (per `Copilot.md` §7/§11: don't introduce one unless a real need shows up).
- `NEXT_PUBLIC_API_BASE_URL` (see `.env.example`) points at the `PublicApi` base URL. Remember: `PublicApi`'s CORS policy allows exactly one configured origin (`baseUrls:webBase` on the API side) — this app's dev/deploy origin must be added there or every request will be blocked regardless of this app's config being correct.

## Scope discipline

Per `to_be_react_instruction.md`: this POC is scoped to the **catalog** screen only. Don't build basket/checkout/identity/admin screens here unless separately scoped. Don't modify the `eshoponweb-siva` backend from this repo — if the documented API contract is insufficient for a screen, say so rather than assuming a new endpoint exists.
