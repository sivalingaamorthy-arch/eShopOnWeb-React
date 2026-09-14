import type { CatalogItemDto } from "@/types/catalog";
import { ProductImage } from "./ProductImage";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  item: CatalogItemDto;
}

/**
 * Mirrors eshoponweb-siva:src/Web/Pages/Shared/_product.cshtml. The "Add
 * to Basket" button is presentational only - wiring it to a real basket
 * is explicitly out of scope here (docs/02_TO_BE_React_Catalog_LLD.md
 * Section 10), so it's rendered disabled with an explanatory title rather
 * than silently doing nothing on click.
 */
export function ProductCard({ item }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <ProductImage src={item.pictureUri} alt={item.name} />
      <button
        type="button"
        className={styles.button}
        disabled
        title="Basket is not implemented in this POC yet"
      >
        [ ADD TO BASKET ]
      </button>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.price}>{item.price.toFixed(2)}</div>
    </div>
  );
}
