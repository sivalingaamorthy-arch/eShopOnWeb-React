import { NextRequest, NextResponse } from "next/server";
import { catalogItems } from "@/mocks/catalogSeedData";
import { composePictureUri } from "@/mocks/composePictureUri";
import { getOrigin } from "@/lib/getOrigin";
import type { CatalogItemDto, ListPagedCatalogItemResponse } from "@/types/catalog";

/**
 * Stands in for eshoponweb-siva:src/PublicApi/CatalogItemEndpoints/
 * CatalogItemListPagedEndpoint.cs - same query params, same filter
 * (brand/type AND, optional), same pageSize==0 => unlimited special case,
 * same pageCount formula, and the same ~1s artificial delay the real
 * endpoint has (AS-IS LLD Section 6/16) so this app's loading behavior
 * matches what the real backend will actually do.
 */
export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const params = request.nextUrl.searchParams;
  const pageSize = Number(params.get("pageSize") ?? 0);
  const pageIndex = Number(params.get("pageIndex") ?? 0);
  const catalogBrandId = params.get("catalogBrandId") ? Number(params.get("catalogBrandId")) : undefined;
  const catalogTypeId = params.get("catalogTypeId") ? Number(params.get("catalogTypeId")) : undefined;

  const filtered = catalogItems.filter(
    (item) =>
      (catalogBrandId === undefined || item.catalogBrandId === catalogBrandId) &&
      (catalogTypeId === undefined || item.catalogTypeId === catalogTypeId)
  );

  const take = pageSize === 0 ? filtered.length : pageSize;
  const skip = pageIndex * pageSize;
  const page = filtered.slice(skip, skip + take);

  const origin = await getOrigin();
  const items: CatalogItemDto[] = page.map((item) => ({
    ...item,
    pictureUri: composePictureUri(item.pictureUri, origin),
  }));

  const pageCount =
    pageSize > 0 ? Math.ceil(filtered.length / pageSize) : filtered.length > 0 ? 1 : 0;

  const response: ListPagedCatalogItemResponse = {
    correlationId: crypto.randomUUID(),
    catalogItems: items,
    pageCount,
    totalItems: filtered.length,
  };

  return NextResponse.json(response);
}
