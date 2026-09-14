import Link from "next/link";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageIndex: number; // 0-based
  totalPages: number;
  itemsShown: number;
  totalItems: number;
  catalogBrandId?: number;
  catalogTypeId?: number;
}

function buildHref(pageIndex: number, catalogBrandId?: number, catalogTypeId?: number) {
  const params = new URLSearchParams();
  if (catalogBrandId !== undefined) params.set("catalogBrandId", String(catalogBrandId));
  if (catalogTypeId !== undefined) params.set("catalogTypeId", String(catalogTypeId));
  params.set("pageId", String(pageIndex));
  return `/?${params.toString()}`;
}

/**
 * Mirrors eshoponweb-siva:src/Web/Pages/Shared/_pagination.cshtml,
 * including its exact "Showing X of Y products - Page N - M" text and its
 * visual-only (not functional) disabled state at the page boundary -
 * see docs/02_TO_BE_React_Catalog_LLD.md Section 8 for why that
 * permissiveness is intentionally preserved rather than "fixed" here.
 */
export function Pagination({
  pageIndex,
  totalPages,
  itemsShown,
  totalItems,
  catalogBrandId,
  catalogTypeId,
}: PaginationProps) {
  const isFirstPage = pageIndex === 0;
  const isLastPage = totalPages === 0 || pageIndex >= totalPages - 1;

  return (
    <nav className={styles.wrapper} aria-label="Catalog pagination">
      <Link
        href={buildHref(pageIndex - 1, catalogBrandId, catalogTypeId)}
        className={styles.item}
        aria-disabled={isFirstPage}
      >
        Previous
      </Link>
      <span className={styles.status}>
        Showing {itemsShown} of {totalItems} products - Page {pageIndex + 1} - {totalPages}
      </span>
      <Link
        href={buildHref(pageIndex + 1, catalogBrandId, catalogTypeId)}
        className={styles.item}
        aria-disabled={isLastPage}
      >
        Next
      </Link>
    </nav>
  );
}
