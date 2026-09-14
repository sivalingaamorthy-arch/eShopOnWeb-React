import { NextResponse } from "next/server";
import { catalogItems } from "@/mocks/catalogSeedData";
import { composePictureUri } from "@/mocks/composePictureUri";
import { getOrigin } from "@/lib/getOrigin";

/**
 * Stands in for eshoponweb-siva:src/PublicApi/CatalogItemEndpoints/
 * CatalogItemGetByIdEndpoint.cs - bare 404 (no JSON body) when not found,
 * matching the documented AS-IS behavior (AS-IS LLD Section 14).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = catalogItems.find((catalogItem) => catalogItem.id === Number(id));

  if (!item) {
    return new NextResponse(null, { status: 404 });
  }

  const origin = await getOrigin();
  return NextResponse.json({
    correlationId: crypto.randomUUID(),
    catalogItem: { ...item, pictureUri: composePictureUri(item.pictureUri, origin) },
  });
}
