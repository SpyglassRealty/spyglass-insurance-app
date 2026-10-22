// Pure helpers for CMS-sourced articles (no Next imports, so `node --test` can load them).
// CMS = the spyglassrealty.com blog editor; posts with Market = "Insurance" are served
// read-only by GET https://www.spyglassrealty.com/api/blog/insurance.

const TOPIC_LABELS = {
  buying: "Homebuying",
  selling: "Selling",
  mortgage: "Mortgage",
  "market-updates": "Market updates",
  relocation: "Relocation",
  lifestyle: "Homeowners",
  luxury: "Luxury homes",
  "farm-and-ranch": "Farm and ranch",
  neighborhoods: "Neighborhoods",
  development: "New construction",
};

const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80";

// ISO timestamp -> "YYYY-MM-DD" (the shape formatDate() and schema expect).
export function toDay(iso) {
  if (typeof iso !== "string" || !iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

// Defense in depth: content comes from signed-in Spyglass staff, but never let a pasted
// <script>, inline handler, or javascript: URL run on the insurance site.
export function sanitizeHtml(html) {
  if (typeof html !== "string") return "";
  return html
    .replace(/<\s*(script|iframe|object|embed|style)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|iframe|object|embed|style)\b[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["']?)\s*javascript:[^"'\s>]*\2/gi, '$1="#"');
}

export function readMinutesFromHtml(html) {
  const words = String(html || "")
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

// Map one feed item to the shape app/learning/[slug] renders (same keys as articles.js,
// plus bodyHtml). Returns null when the item is unusable.
export function normalizeCmsArticle(item) {
  if (!item || typeof item.slug !== "string" || !item.slug || typeof item.title !== "string") return null;
  const bodyHtml = sanitizeHtml(item.bodyHtml);
  return {
    slug: item.slug,
    title: item.title,
    metaTitle: item.metaTitle || item.title,
    dek: item.description || "",
    img: item.heroImage || DEFAULT_IMG,
    tag: TOPIC_LABELS[item.topic] || "Insurance",
    author: item.author || "Spyglass Insurance Agency",
    datePublished: toDay(item.publishedAt),
    dateModified: toDay(item.updatedAt) || toDay(item.publishedAt),
    readMinutes: readMinutesFromHtml(item.bodyHtml),
    sections: [],
    bodyHtml,
    faqs: Array.isArray(item.faqs) ? item.faqs.filter((f) => f && f.q && f.a) : [],
    source: "cms",
  };
}

// CMS wins on a slug collision, so a hardcoded article imported into the CMS can then be
// edited there. Order: newest first by datePublished.
export function mergeArticles(cms, fallback) {
  const seen = new Set(cms.map((a) => a.slug));
  return [...cms, ...fallback.filter((a) => !seen.has(a.slug))].sort((a, b) =>
    String(b.datePublished).localeCompare(String(a.datePublished)),
  );
}
