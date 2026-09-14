import { NextResponse } from "next/server";
import { catalogTypes } from "@/mocks/catalogSeedData";
import type { ListCatalogTypesResponse } from "@/types/catalog";

/** Stands in for PublicApi's CatalogTypeListEndpoint. */
export async function GET() {
  const response: ListCatalogTypesResponse = {
    correlationId: crypto.randomUUID(),
    catalogTypes,
  };
  return NextResponse.json(response);
}
