import { ITEMS_PER_PAGE } from "@/constants/catalog";
import { getCatalogBrands, getCatalogTypes, listCatalogItems } from "@/services/catalogApi";
import { Hero } from "./_components/Hero";
import { CatalogFilters } from "./_components/CatalogFilters";
import { Pagination } from "./_components/Pagination";
import { ProductGrid } from "./_components/ProductGrid";
import styles from "./page.module.css";

// Required so this route fetches PublicApi (or the mock endpoints under
// src/app/api/) at request time rather than build time - see
// docs/02_TO_BE_React_Catalog_LLD.md Section 5.
export const dynamic = "force-dynamic";

interface CatalogPageProps {
  searchParams: Promise<{
    pageId?: string;
    catalogBrandId?: string;
    catalogTypeId?: string;
  }>;
}

/**
 * Mirrors eshoponweb-siva:src/Web/Pages/Index.cshtml (IndexModel.OnGet) -
 * the catalog listing IS the home page, route "/", not "/catalog".
 * See docs/02_TO_BE_React_Catalog_LLD.md for the full design this
 * implements.
 */
export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;

  const pageIndex = params.pageId ? Number(params.pageId) : 0;
  const catalogBrandId = params.catalogBrandId ? Number(params.catalogBrandId) : undefined;
  const catalogTypeId = params.catalogTypeId ? Number(params.catalogTypeId) : undefined;

  const [itemsResponse, brandsResponse, typesResponse] = await Promise.all([
    listCatalogItems({ pageSize: ITEMS_PER_PAGE, pageIndex, catalogBrandId, catalogTypeId }),
    getCatalogBrands(),
    getCatalogTypes(),
  ]);

  const { catalogItems, pageCount, totalItems } = itemsResponse;

  return (
    <>
      <Hero />
      <CatalogFilters
        brands={brandsResponse.catalogBrands}
        types={typesResponse.catalogTypes}
        selectedBrandId={catalogBrandId}
        selectedTypeId={catalogTypeId}
      />
      <div className={styles.container}>
        {catalogItems.length > 0 && (
          <Pagination
            pageIndex={pageIndex}
            totalPages={pageCount}
            itemsShown={catalogItems.length}
            totalItems={totalItems}
            catalogBrandId={catalogBrandId}
            catalogTypeId={catalogTypeId}
          />
        )}
        <ProductGrid items={catalogItems} />
        {catalogItems.length > 0 && (
          <Pagination
            pageIndex={pageIndex}
            totalPages={pageCount}
            itemsShown={catalogItems.length}
            totalItems={totalItems}
            catalogBrandId={catalogBrandId}
            catalogTypeId={catalogTypeId}
          />
        )}
      </div>
    </>
  );
}
