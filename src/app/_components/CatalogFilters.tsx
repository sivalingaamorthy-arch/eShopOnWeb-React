import type { CatalogLookupDto } from "@/types/catalog";
import styles from "./CatalogFilters.module.css";

interface CatalogFiltersProps {
  brands: CatalogLookupDto[];
  types: CatalogLookupDto[];
  selectedBrandId?: number;
  selectedTypeId?: number;
}

/**
 * Plain GET form, no client JS - mirrors eshoponweb-siva:
 * src/Web/Pages/Index.cshtml's filter form exactly (full page navigation
 * on submit, per docs/02_TO_BE_React_Catalog_LLD.md Section 8). Submitting
 * this form intentionally does not carry pageIndex along, resetting to
 * page 1 on any filter change - same as the source app.
 */
export function CatalogFilters({ brands, types, selectedBrandId, selectedTypeId }: CatalogFiltersProps) {
  return (
    <section className={styles.filters}>
      <form method="GET" action="/" className={styles.form}>
        <label className={styles.label} data-title="brand">
          <select
            name="catalogBrandId"
            defaultValue={selectedBrandId ?? ""}
            className={styles.select}
            aria-label="Filter by brand"
          >
            <option value="">All</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label} data-title="type">
          <select
            name="catalogTypeId"
            defaultValue={selectedTypeId ?? ""}
            className={styles.select}
            aria-label="Filter by type"
          >
            <option value="">All</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className={styles.submit} aria-label="Apply filters">
          <img src="/images/arrow-right.svg" alt="" />
        </button>
      </form>
    </section>
  );
}
