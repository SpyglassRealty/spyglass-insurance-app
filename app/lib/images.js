// Helpers for Unsplash-hosted images: request a right-sized, compressed
// rendition instead of the original large file.
export function unsplash(url, width, quality = 70) {
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith("unsplash.com")) return url;
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    u.searchParams.set("w", String(width));
    u.searchParams.set("q", String(quality));
    return u.toString();
  } catch {
    return url;
  }
}

export function unsplashSrcSet(url, widths, quality = 70) {
  return widths.map((w) => `${unsplash(url, w, quality)} ${w}w`).join(", ");
}

// Card thumbnails render at roughly 400px wide (up to ~800px on 2x screens).
export function cardImageProps(url) {
  return {
    src: unsplash(url, 800),
    srcSet: unsplashSrcSet(url, [480, 800]),
    sizes: "(max-width: 760px) 100vw, 400px",
    loading: "lazy",
    decoding: "async",
  };
}
