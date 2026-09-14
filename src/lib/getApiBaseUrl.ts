import { getOrigin } from "./getOrigin";

/**
 * Resolves the base URL catalogApi.ts fetches against.
 *
 * - If NEXT_PUBLIC_API_BASE_URL is set (see .env.example), it points at a
 *   real eshoponweb-siva PublicApi instance and is used as-is.
 * - Otherwise, this falls back to this app's own origin + "/api/" - the
 *   dummy route handlers under src/app/api/ that stand in for PublicApi
 *   until a real backend is wired up (see CLAUDE.md).
 *
 * Reading headers() makes any caller of this function a Request-time API
 * consumer, which is what forces this route to render dynamically instead
 * of being statically pre-rendered at build time (see
 * docs/02_TO_BE_React_Catalog_LLD.md Section 5's force-dynamic requirement -
 * this has the same effect, belt-and-suspenders).
 */
export async function getApiBaseUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (configured) {
    return configured;
  }

  const origin = await getOrigin();
  return `${origin}/api/`;
}
