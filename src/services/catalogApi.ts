import { getApiBaseUrl } from "@/lib/getApiBaseUrl";
import type {
  CatalogQueryParams,
  ListCatalogBrandsResponse,
  ListCatalogTypesResponse,
  ListPagedCatalogItemResponse,
} from "@/types/catalog";

/**
 * Typed client for the eshoponweb-siva PublicApi catalog endpoints
 * (docs/02_TO_BE_React_Catalog_LLD.md Section 6/7). Talks to
 * NEXT_PUBLIC_API_BASE_URL when set, or this app's own mock endpoints
 * under src/app/api/ otherwise (see src/lib/getApiBaseUrl.ts) - callers
 * don't need to know which.
 */

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Catalog API request to ${url} failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function listCatalogItems(
  params: CatalogQueryParams
): Promise<ListPagedCatalogItemResponse> {
  const baseUrl = await getApiBaseUrl();
  const query = new URLSearchParams({
    pageSize: String(params.pageSize),
    pageIndex: String(params.pageIndex),
  });
  if (params.catalogBrandId !== undefined) {
    query.set("catalogBrandId", String(params.catalogBrandId));
  }
  if (params.catalogTypeId !== undefined) {
    query.set("catalogTypeId", String(params.catalogTypeId));
  }

  return fetchJson<ListPagedCatalogItemResponse>(`${baseUrl}catalog-items?${query.toString()}`);
}

export async function getCatalogBrands(): Promise<ListCatalogBrandsResponse> {
  const baseUrl = await getApiBaseUrl();
  return fetchJson<ListCatalogBrandsResponse>(`${baseUrl}catalog-brands`);
}

export async function getCatalogTypes(): Promise<ListCatalogTypesResponse> {
  const baseUrl = await getApiBaseUrl();
  return fetchJson<ListCatalogTypesResponse>(`${baseUrl}catalog-types`);
}
