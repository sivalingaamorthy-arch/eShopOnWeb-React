const PLACEHOLDER = "http://catalogbaseurltobereplaced";

/**
 * Mirrors eshoponweb-siva:src/ApplicationCore/Services/UriComposer.cs -
 * the real backend stores PictureUri with this literal placeholder prefix
 * and rewrites it to the configured base URL at read time. Our mock data
 * (catalogSeedData.ts) stores the same placeholder for fidelity; this
 * composes it against this app's own origin so /images/products/*.png
 * (copied from eshoponweb-siva's wwwroot) resolves correctly.
 */
export function composePictureUri(pictureUri: string, baseUrl: string): string {
  return pictureUri.replace(PLACEHOLDER, baseUrl.replace(/\/$/, ""));
}
