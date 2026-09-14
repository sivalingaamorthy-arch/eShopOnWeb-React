import styles from "./Hero.module.css";

/**
 * Mirrors eshoponweb-siva:src/Web/Pages/Index.cshtml's esh-catalog-hero
 * section. The "ALL T-SHIRTS ON SALE THIS WEEKEND" copy is a static image
 * asset in the source app too (main_banner_text.svg), not live text -
 * reused as-is here for visual parity, with alt text added since the
 * source <img> has none (Copilot.md Section 12 accessibility guidance).
 */
export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <img
          className={styles.title}
          src="/images/main_banner_text.svg"
          alt="All T-Shirts on sale this weekend"
        />
      </div>
    </section>
  );
}
