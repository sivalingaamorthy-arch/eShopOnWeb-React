# eShopOnWeb React

React (Next.js) frontend for the eShopOnWeb catalog modernization POC. This app is the target-state UI that will replace the Razor Pages catalog screen in [`eshoponweb-siva`](https://github.com/sivalingaamorthy-arch/eshoponweb-siva); it talks only to that repo's `PublicApi` over HTTP, never to its internal C# code.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - the catalog page works immediately, no backend required. By default the app calls its own built-in mock API (`src/app/api/*`), seeded with the real demo catalog data from `eshoponweb-siva`'s `CatalogContextSeed.cs` (same products, brands, types, images).

To point at a real `PublicApi` instance instead, set `NEXT_PUBLIC_API_BASE_URL` (see `.env.example`):

```bash
cp .env.example .env.local   # then uncomment and set NEXT_PUBLIC_API_BASE_URL
```

**Note**: `PublicApi`'s CORS policy only allows one configured origin (`baseUrls:webBase` in the API's `appsettings.json`). If API calls fail with a CORS error after switching to a real backend, that's almost always the cause — add this app's origin there. The built-in mock API is same-origin and unaffected by this.

## Scripts

- `npm run dev` — start the dev server
- `npm run lint` — ESLint
- `npm run build` — production build (this must pass at all times — see `CLAUDE.md`)
- `npm run start` — run the production build

## Documentation map

- `CLAUDE.md` — how Claude Code should work in this repo, and where the authoritative source-of-truth docs live
- `Copilot.md` — generic React/TypeScript engineering guidelines (applies regardless of which AI tool is used)
- `to_be_react_instruction.md` — scope and process rules for the catalog POC specifically
- `docs/02_TO_BE_React_Catalog_LLD.md` — the catalog screen's design, in this repo
- AS-IS system behavior and the full `PublicApi` contract: `docs/as_is_lld/as_is_lld_catalog.md` in [`eshoponweb-siva`](https://github.com/sivalingaamorthy-arch/eshoponweb-siva)

## Mock backend

`src/app/api/*` implements the same contract as `PublicApi`'s catalog endpoints, backed by `src/mocks/catalogSeedData.ts` (transcribed from the real `CatalogContextSeed.cs`). This exists so the app is genuinely runnable without the .NET backend; swap it out by setting `NEXT_PUBLIC_API_BASE_URL`, no other code changes needed (see `src/lib/getApiBaseUrl.ts`). It also replicates the real API's documented ~1s artificial delay on the list endpoint and its `pageSize=0` → unpaged quirk, so behavior here matches what the real backend will actually do.

## CI

`.github/workflows/ci.yml` runs lint + build on every push/PR to `main`. A red build blocks merge by design.
