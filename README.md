# eShopOnWeb React

React (Next.js) frontend for the eShopOnWeb catalog modernization POC. This app is the target-state UI that will replace the Razor Pages catalog screen in [`eshoponweb-siva`](https://github.com/sivalingaamorthy-arch/eshoponweb-siva); it talks only to that repo's `PublicApi` over HTTP, never to its internal C# code.

## Getting started

```bash
npm install
cp .env.example .env.local   # then set NEXT_PUBLIC_API_BASE_URL for your environment
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Note**: `PublicApi`'s CORS policy only allows one configured origin (`baseUrls:webBase` in the API's `appsettings.json`). If API calls fail with a CORS error, that's almost always the cause — add this app's origin there, not a change on this side.

## Scripts

- `npm run dev` — start the dev server
- `npm run lint` — ESLint
- `npm run build` — production build (this must pass at all times — see `CLAUDE.md`)
- `npm run start` — run the production build

## Documentation map

- `CLAUDE.md` — how Claude Code should work in this repo, and where the authoritative source-of-truth docs live
- `Copilot.md` — generic React/TypeScript engineering guidelines (applies regardless of which AI tool is used)
- `to_be_react_instruction.md` — scope and process rules for the catalog POC specifically
- AS-IS system behavior and the full `PublicApi` contract: `docs/as_is_lld/as_is_lld_catalog.md` in [`eshoponweb-siva`](https://github.com/sivalingaamorthy-arch/eshoponweb-siva)

## CI

`.github/workflows/ci.yml` runs lint + build on every push/PR to `main`. A red build blocks merge by design.
