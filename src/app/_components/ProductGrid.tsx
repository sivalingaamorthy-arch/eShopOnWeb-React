import type { CatalogItemDto } from "@/types/catalog";
import { ProductCard } from "./ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  items: CatalogItemDto[];
}

/**
 * Mirrors eshoponweb-siva:src/Web/Pages/Index.cshtml's esh-catalog-items
 * grid, including the empty-state text (AS-IS LLD Section 13, Edge Case 1
 * - the "NO RESULTS" message is shown even for an unmatched filter, not
 * just literal search, matching the source app's own behavior).
 */
export function ProductGrid({ items }: ProductGridProps) {
  if (items.length === 0) {
    return <p className={styles.empty}>THERE ARE NO RESULTS THAT MATCH YOUR SEARCH</p>;
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <ProductCard item={item} />
        </div>
      ))}
    </div>
  );
}
