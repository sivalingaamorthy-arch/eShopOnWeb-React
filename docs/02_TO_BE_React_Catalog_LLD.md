# TO-BE Low-Level Design: React Catalog Screen
### eShopOnWeb React Modernization POC

---

## 1. Purpose

This is the target-state design for the catalog screen referenced by `to_be_react_instruction.md` (repo root) as the source of truth for what to build. It translates the verified AS-IS behavior into a Next.js implementation plan, aiming for **behavioral and visual parity** with the current Razor Pages screen — this is a like-for-like rebuild on a new stack, not a redesign.

## 2. Authoritative Inputs

1. **AS-IS behavior & API contract**: `eshoponweb-siva` repo, `docs/as_is_lld/as_is_lld_catalog.md` — every data shape, business rule, and edge case referenced below traces back to that document's section numbers.
2. **Visual reference**: a screenshot provided directly in chat by the user, described in full in Section 3 below (not committed as a binary asset in this repo — see Section 11, Limitation 1). Confirmed to match the current production catalog page's actual markup/CSS (see Section 3's cross-check against source SCSS).
3. **Engineering conventions**: `Copilot.md`, `to_be_react_instruction.md` (repo root).

## 3. Screen Reference (as provided)

Layout, top to bottom:

1. **Global header** (full width, white background): logo mark `[e] eSHOP OnWeb` (left), user identity `demouser@microsoft.com ▾` and a basket icon with an item-count badge (`0`) (right).
2. **Hero banner** (`260px` tall — confirmed against `catalog.component.scss` `$banner-height`): full-bleed lifestyle photo, with overlaid text "ALL **T-SHIRTS** ON SALE" / "THIS WEEKEND" (lighter weight/opacity on the third line).
3. **Filter bar** (teal band, `65px` tall — confirmed `$color-brand: #00A69C`, `$filter-height`): a `BRAND` dropdown (label above value, e.g. "All"), a `TYPE` dropdown, and a green submit arrow button (`$color-secondary: #83D01B`).
4. **Pagination bar**: `Previous` (left, muted when disabled) — `Showing {N} of {Total} products - Page {current} - {totalPages}` (center) — `Next` (right). Text format confirmed to match `_pagination.cshtml` exactly: `Showing @ItemsPerPage of @TotalItems products - Page @(ActualPage+1) - @TotalPages`.
5. **Product grid**, 3 columns on desktop (confirmed `.esh-catalog-item { width: 33% }`, 50% ≤1024px, 100% ≤768px per `$media-screen-m`/`$media-screen-s`). Each card: square-ish product image, green `[ ADD TO BASKET ]` button (`$color-secondary`), product name in uppercase (`.esh-catalog-name`), price as `$ N.NN` in bold (`.esh-catalog-price`, `font-weight: 900`).
6. Pagination bar repeats at the bottom of the grid (confirmed: `Index.cshtml` renders the `_pagination` partial both above and below the item list).

**Cross-check against source**: every element above matches an existing CSS class and template already documented in the AS-IS LLD (`esh-catalog-hero`, `esh-catalog-filters`, `esh-catalog-filter`, `esh-catalog-send`, `esh-catalog-item`, `esh-catalog-button`, `esh-catalog-name`, `esh-catalog-price`, `esh-pager*`) — i.e., **this screenshot is the current production page**, not a new design. Colors/sizes cited above are read directly from `eshoponweb-siva:src/Web/wwwroot/css/_variables.scss` and `catalog/catalog.component.scss`, not estimated from the image.

**What the screenshot shows that is out of this LLD's scope**: the global header (logo, user identity, basket badge) belongs to the shared page layout / basket / identity modules, not the catalog screen itself. See Section 9.

## 4. Route & Rendering Strategy

- **Route**: `app/page.tsx` (root `/`) — matches the AS-IS route exactly (the catalog listing *is* the home page, not `/catalog`).
- **Rendering**: a Next.js **Server Component**, reading filter/page state from `searchParams` and fetching `PublicApi` **server-side**, at request time.
  - This is the closest behavioral match to the current architecture: today, every filter change or page click is a full server round-trip that re-renders HTML from scratch (Section 12 of the AS-IS LLD — there is zero client-side state to replicate). A Server Component reading `searchParams` reproduces that exact model on the new stack, rather than introducing client-side state management that doesn't exist in the source system.
  - **Practical consequence, worth stating explicitly**: server-to-server fetches from Next.js's Node runtime are not subject to browser CORS at all — `PublicApi`'s CORS allow-list (AS-IS LLD Section 11, locked to a single configured origin) only matters if a *client* component ever fetches this API directly from the browser. This design avoids that constraint entirely for the initial listing render, which sidesteps what the AS-IS LLD flagged as the most likely first integration blocker.
- **Build-safety requirement**: the route **must** declare `export const dynamic = 'force-dynamic'` (or equivalent per-fetch `cache: 'no-store'`). Without it, `next build` will attempt to statically pre-render this page by calling `PublicApi` at build time — which will fail in any environment (like CI, or a fresh dev sandbox) where the backend isn't reachable, breaking the repo's standing "must stay buildable" rule. This is a hard requirement, not a style preference.

## 5. Component Breakdown

| Component | File | Maps to (AS-IS) | Responsibility |
|---|---|---|---|
| `CatalogPage` | `src/app/page.tsx` | `IndexModel.OnGet` | Reads `searchParams`, calls the API client, composes the page |
| `CatalogFilters` | `src/app/_components/CatalogFilters.tsx` | `Index.cshtml` filter `<form>` | Brand/Type `<select>`s + submit; plain `<form method="GET">` posting back to `/`, mirroring the AS-IS pattern exactly rather than introducing client-side filter state |
| `ProductGrid` | `src/app/_components/ProductGrid.tsx` | `esh-catalog-items` wrapper | Lays out `ProductCard`s in the 3/2/1-column responsive grid |
| `ProductCard` | `src/app/_components/ProductCard.tsx` | `_product.cshtml` | Image, name, price, "Add to Basket" button (button is presentational only here — no basket module exists yet in this repo, see Section 9) |
| `Pagination` | `src/app/_components/Pagination.tsx` | `_pagination.cshtml` | Previous/Next `Link`s + the exact "Showing X of Y products - Page N - M" text; rendered twice per page, above and below the grid |
| `catalogApi` | `src/lib/api/catalog.ts` | — (new, contract-derived) | Typed fetch functions against `PublicApi` |
| API types | `src/lib/api/types.ts` | AS-IS LLD §10/§11 | TypeScript mirrors of `CatalogItemDto`, brand/type DTOs, list response |

## 6. Data Contracts (TypeScript, derived from AS-IS LLD §10–11 — not invented)

```typescript
// src/lib/api/types.ts

export interface CatalogItemDto {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUri: string;
  catalogTypeId: number;
  catalogBrandId: number;
}

export interface CatalogLookupDto {
  id: number;
  name: string; // NOTE: API maps CatalogBrand.Brand / CatalogType.Type -> "name" (AS-IS LLD §10)
}

export interface ListPagedCatalogItemResponse {
  correlationId: string;
  catalogItems: CatalogItemDto[];
  pageCount: number;
}

export interface CatalogQueryParams {
  pageSize: number;   // MUST always be passed explicitly - omitting it returns the
                       // entire unpaged catalog (AS-IS LLD §9.2 / §6 take==0 special case)
  pageIndex: number;   // 0-based, matches AS-IS
  catalogBrandId?: number;
  catalogTypeId?: number;
}
```

**Field-casing caveat carried over from the AS-IS LLD (Section 18/22, Limitation 1)**: the exact JSON casing of the brand/type list response wrapper and the global error envelope was not confirmed against a live call in that document. Before wiring `catalogApi`, confirm against `PublicApi`'s `/swagger/v1/swagger.json` or a real response — do not assume `camelCase` silently propagates the same way for every field.

## 7. Filter & Pagination URL Design

- Filters and page are carried entirely in the URL's query string: `/?catalogBrandId=2&catalogTypeId=&pageIndex=1`.
- `CatalogFilters` is a plain HTML `<form method="GET" action="/">` — no client JS required for filtering to work, matching the AS-IS's server-round-trip model.
- `Pagination`'s Previous/Next are `<Link href="/?...">`. Match AS-IS's **visual-only** disabled state at the boundary (`is-disabled` → `opacity: .5; pointer-events: none`, per `pager.scss`) rather than removing the link outright — this is a deliberate behavior-parity choice: the current app doesn't guard against an out-of-range `pageIndex`, it just renders an empty grid (AS-IS LLD §13, Edge Case 5); replicate that permissiveness rather than "fixing" it here, since correcting it is a product decision outside this POC's scope (`to_be_react_instruction.md`: preserve existing behavior unless the LLD says otherwise).
- Page size is a constant (`ITEMS_PER_PAGE = 10`), mirrored from `Web/Constants.cs`, not sourced from config — same as AS-IS.

## 8. Styling

- CSS Modules, one per component (`ProductCard.module.css`, etc.) — the closest idiomatic Next.js equivalent to the AS-IS's component-scoped SCSS (`catalog.component.scss`), and consistent with the scaffold's existing choice not to add Tailwind or another styling framework (`Copilot.md` §11: don't introduce a new styling technology without cause).
- Design tokens to port verbatim from `eshoponweb-siva:src/Web/wwwroot/css/_variables.scss` (not re-derived from the screenshot, since the source values are exact):

| Token | Value | Use |
|---|---|---|
| `--color-brand` | `#00A69C` | Filter bar background |
| `--color-secondary` | `#83D01B` | Add-to-basket button, filter submit button |
| `--color-secondary-darker` | `#83D01B` darkened 20% | Button hover state |
| Banner height | `260px` | Hero section |
| Filter bar height | `65px` | Filter section |
| Grid columns | 3 / 2 / 1 | ≥1024px / 768–1024px / <768px |
| Button height | `3rem`, width `80%` of card | Add-to-basket |
| Price font | `28px`, weight `900`, `$`-prefixed | `.esh-catalog-price` equivalent |
| Name text | uppercase, `1rem`, weight `300` | `.esh-catalog-name` equivalent |

Exact hero image asset, font family, and header/nav styling were not part of this screen's own SCSS file and are out of scope here (Section 9).

## 9. Explicitly Out of Scope for This LLD

- **Global header** (logo, `demouser@microsoft.com` identity menu, basket badge/count) — belongs to a shared layout + the basket/identity modules, neither of which has an AS-IS LLD yet. Building the catalog page in isolation means either (a) rendering it with no header for now, or (b) a static placeholder header purely for visual context with no real auth/basket wiring. **Decision needed from the user** — not assumed here.
- **"Add to Basket" functionality** — the button is rendered per the visual reference, but wiring it to a real basket (AS-IS `Web/Pages/Basket/*`, out of this LLD's traced scope) is separate work with its own LLD.
- Any feature not present in the AS-IS system: search, product detail pages, stock/availability display (AS-IS LLD §19/§22) remain absent here too, per the instruction file's "do not invent functionality" rule.

## 10. Behavior Parity Checklist

| AS-IS behavior (LLD §) | React equivalent |
|---|---|
| Filters AND together, either optional (§9.1) | Same predicate, expressed as optional query params passed to `catalogApi.list()` |
| 0-based `pageIndex`, `ceil(total/pageSize)` for total pages (§9.2) | Same arithmetic, computed from `ListPagedCatalogItemResponse.pageCount` (API already returns `pageCount` computed server-side — no need to recompute client-side) |
| `pageSize` omission → unpaged (§9.2) | `CatalogQueryParams.pageSize` is a required field in the TS type specifically to prevent this by construction |
| No search, no stock/availability, no sort (§19) | Not built |
| Image URL already absolute via `IUriComposer` (§7) | `pictureUri` from the DTO used as-is in `<img src>`, no client-side URL composition needed |
| Empty `pictureUri` possible (§19.3) | `ProductCard` needs a fallback `<img>` `onError`/placeholder — AS-IS has none, so this is a minimal necessary addition, not scope creep, since `<img src="">` behaves differently across browsers than the Razor output did implicitly |
| Bare 404 vs JSON error envelope for get-by-id (§14) | N/A to the listing screen — relevant only if a detail view is added later |
| 1s artificial delay on `GET /api/catalog-items` (§6/§16) | Since this is now a server-side fetch during SSR, the delay adds to server response time rather than a client-side loading spinner; no special handling required beyond normal request timeouts, but worth setting user expectations that the page will take >1s to respond |

## 11. Limitations & Open Decisions

1. The reference screenshot was provided inline in chat, not as a file/URL this session could fetch (network egress policy blocks `user-images.githubusercontent.com`) — it is described in full in Section 3 but not committed as a binary asset to this repo. If pixel-exact fidelity matters later, the image should be added under e.g. `docs/reference/`.
2. Global header/nav design (Section 9) is an open decision, not resolved by this LLD.
3. Exact JSON field casing for brand/type list responses and the error envelope (Section 6) should be confirmed against a live `PublicApi` instance or its Swagger doc before implementation, not assumed.
4. This document describes design intent only — no component code has been written yet. Implementation is a separate, follow-up change, and per this repo's standing rule, must land in commits that each keep `npm run build`/`npm run lint` passing (Section 4's `force-dynamic` requirement exists specifically to protect that in this route's case).

## 12. Traceability

- AS-IS source of truth: `eshoponweb-siva:docs/as_is_lld/as_is_lld_catalog.md`
- Styling source of truth: `eshoponweb-siva:src/Web/wwwroot/css/_variables.scss`, `src/Web/wwwroot/css/catalog/catalog.component.scss`, `src/Web/wwwroot/css/shared/components/pager/pager.scss`
- Process rules: `to_be_react_instruction.md`, `Copilot.md` (this repo's root)
- Build/working-state requirement: `CLAUDE.md`, `.claude/skills/verify-build/` (this repo)
