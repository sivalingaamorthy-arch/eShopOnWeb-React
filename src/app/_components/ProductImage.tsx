"use client";

import { useState } from "react";
import styles from "./ProductCard.module.css";

const FALLBACK_SRC = "/images/products/eCatalog-item-default.png";

interface ProductImageProps {
  src: string;
  alt: string;
}

/**
 * Isolated as its own small Client Component (the only interactive part
 * of ProductCard) so the rest of the card stays a Server Component - see
 * Copilot.md's component-design guidance to keep client boundaries small.
 *
 * AS-IS has no fallback for an empty/broken pictureUri (a gap noted in
 * docs/02_TO_BE_React_Catalog_LLD.md Section 11's behavior parity
 * checklist) - this is the minimal necessary addition to avoid a broken
 * <img> in that case, not scope creep.
 */
export function ProductImage({ src, alt }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_SRC);

  return (
    <img
      className={styles.image}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(FALLBACK_SRC)}
    />
  );
}
