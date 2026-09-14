// Mirrors eshoponweb-siva:src/PublicApi/CatalogItemEndpoints/* and
// docs/02_TO_BE_React_Catalog_LLD.md Section 7. Field casing for the
// brand/type list responses and the error envelope was not confirmed
// against a live PublicApi instance (see that doc's Section 7 caveat) -
// this mock's own shapes (also defined here) are this project's working
// assumption, not a confirmed fact about the real backend.

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
  name: string; // API maps CatalogBrand.Brand / CatalogType.Type -> "name"
}

export interface ListPagedCatalogItemResponse {
  correlationId: string;
  catalogItems: CatalogItemDto[];
  pageCount: number;
  /**
   * MOCK-ONLY EXTENSION - eshoponweb-siva's real
   * CatalogItemListPagedEndpoint.ListPagedCatalogItemResponse.cs (verified
   * by reading that source file) has only CatalogItems and PageCount; it
   * does not return a total-item count. The Razor UI gets that number
   * from a separate CountAsync() call the PublicApi doesn't expose.
   * This mock adds totalItems so the "Showing X of Y products" text can
   * be exact without an extra unbounded request (see Section 9.2's
   * pageSize==0 danger). When wiring a real PublicApi, this field will be
   * absent - either add an equivalent field there, or change the display
   * text to not require an exact total.
   */
  totalItems: number;
}

export interface ListCatalogBrandsResponse {
  correlationId: string;
  catalogBrands: CatalogLookupDto[];
}

export interface ListCatalogTypesResponse {
  correlationId: string;
  catalogTypes: CatalogLookupDto[];
}

export interface CatalogQueryParams {
  /** MUST always be passed explicitly - omitting it returns the entire
   * unpaged catalog (AS-IS LLD Section 9.2 / Section 6 take==0 special case). */
  pageSize: number;
  /** 0-based, matches AS-IS. */
  pageIndex: number;
  catalogBrandId?: number;
  catalogTypeId?: number;
}
