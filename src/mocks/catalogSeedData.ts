import type { CatalogItemDto, CatalogLookupDto } from "@/types/catalog";

/**
 * Transcribed directly from eshoponweb-siva:
 * src/Infrastructure/Data/CatalogContextSeed.cs - the same demo data the
 * real backend seeds into CatalogBrands/CatalogTypes/CatalogItems, so this
 * mock exercises the real contract shapes with real (not invented) sample
 * content. Ids follow that file's insertion order (1-based).
 *
 * This is a stand-in for the real eshoponweb-siva PublicApi - see
 * CLAUDE.md and docs/02_TO_BE_React_Catalog_LLD.md. Once
 * NEXT_PUBLIC_API_BASE_URL points at a real backend, this file and
 * src/app/api/** stop being used (see src/lib/getApiBaseUrl.ts).
 */

const PLACEHOLDER = "http://catalogbaseurltobereplaced";

export const catalogBrands: CatalogLookupDto[] = [
  { id: 1, name: "Azure" },
  { id: 2, name: ".NET" },
  { id: 3, name: "Visual Studio" },
  { id: 4, name: "SQL Server" },
  { id: 5, name: "Other" },
];

export const catalogTypes: CatalogLookupDto[] = [
  { id: 1, name: "Mug" },
  { id: 2, name: "T-Shirt" },
  { id: 3, name: "Sheet" },
  { id: 4, name: "USB Memory Stick" },
];

export const catalogItems: CatalogItemDto[] = [
  { id: 1, catalogTypeId: 2, catalogBrandId: 2, name: ".NET Bot Black Sweatshirt", description: ".NET Bot Black Sweatshirt", price: 19.5, pictureUri: `${PLACEHOLDER}/images/products/1.png` },
  { id: 2, catalogTypeId: 1, catalogBrandId: 2, name: ".NET Black & White Mug", description: ".NET Black & White Mug", price: 8.5, pictureUri: `${PLACEHOLDER}/images/products/2.png` },
  { id: 3, catalogTypeId: 2, catalogBrandId: 5, name: "Prism White T-Shirt", description: "Prism White T-Shirt", price: 12, pictureUri: `${PLACEHOLDER}/images/products/3.png` },
  { id: 4, catalogTypeId: 2, catalogBrandId: 2, name: ".NET Foundation Sweatshirt", description: ".NET Foundation Sweatshirt", price: 12, pictureUri: `${PLACEHOLDER}/images/products/4.png` },
  { id: 5, catalogTypeId: 3, catalogBrandId: 5, name: "Roslyn Red Sheet", description: "Roslyn Red Sheet", price: 8.5, pictureUri: `${PLACEHOLDER}/images/products/5.png` },
  { id: 6, catalogTypeId: 2, catalogBrandId: 2, name: ".NET Blue Sweatshirt", description: ".NET Blue Sweatshirt", price: 12, pictureUri: `${PLACEHOLDER}/images/products/6.png` },
  { id: 7, catalogTypeId: 2, catalogBrandId: 5, name: "Roslyn Red T-Shirt", description: "Roslyn Red T-Shirt", price: 12, pictureUri: `${PLACEHOLDER}/images/products/7.png` },
  { id: 8, catalogTypeId: 2, catalogBrandId: 5, name: "Kudu Purple Sweatshirt", description: "Kudu Purple Sweatshirt", price: 8.5, pictureUri: `${PLACEHOLDER}/images/products/8.png` },
  { id: 9, catalogTypeId: 1, catalogBrandId: 5, name: "Cup<T> White Mug", description: "Cup<T> White Mug", price: 12, pictureUri: `${PLACEHOLDER}/images/products/9.png` },
  { id: 10, catalogTypeId: 3, catalogBrandId: 2, name: ".NET Foundation Sheet", description: ".NET Foundation Sheet", price: 12, pictureUri: `${PLACEHOLDER}/images/products/10.png` },
  { id: 11, catalogTypeId: 3, catalogBrandId: 2, name: "Cup<T> Sheet", description: "Cup<T> Sheet", price: 8.5, pictureUri: `${PLACEHOLDER}/images/products/11.png` },
  { id: 12, catalogTypeId: 2, catalogBrandId: 5, name: "Prism White TShirt", description: "Prism White TShirt", price: 12, pictureUri: `${PLACEHOLDER}/images/products/12.png` },
];
