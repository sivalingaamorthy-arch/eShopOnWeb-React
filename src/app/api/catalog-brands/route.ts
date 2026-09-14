import { NextResponse } from "next/server";
import { catalogBrands } from "@/mocks/catalogSeedData";
import type { ListCatalogBrandsResponse } from "@/types/catalog";

/** Stands in for PublicApi's CatalogBrandListEndpoint. */
export async function GET() {
  const response: ListCatalogBrandsResponse = {
    correlationId: crypto.randomUUID(),
    catalogBrands,
  };
  return NextResponse.json(response);
}
