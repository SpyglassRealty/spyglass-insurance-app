import { ARTICLES } from "./lib/articles";
import { SITE_URL } from "./lib/site";

// Static marketing + legal pages. Add new routes here when they are created.
const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "monthly" },
  { path: "/learning", priority: 0.7, changeFrequency: "weekly" },
  { path: "/insurance-disclosures", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms-of-use", priority: 0.2, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();
  const pages = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
  const articles = ARTICLES.map((a) => ({
    url: `${SITE_URL}/learning/${a.slug}`,
    lastModified: new Date(a.dateModified || a.datePublished || now),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...pages, ...articles];
}
