// Article source of truth for /learning: CMS posts (spyglassrealty.com editor, Market =
// "Insurance") merged over the hardcoded ARTICLES fallback in ./articles.js. If the CMS
// feed is down or unset, the site renders exactly the hardcoded set.
import { ARTICLES } from "./articles";
import { mergeArticles, normalizeCmsArticle } from "./cms-normalize.mjs";

export const CMS_TAG = "cms-articles";
export const CMS_REVALIDATE_SECONDS = 300;

const FEED_URL =
  process.env.INSURANCE_CMS_FEED_URL || "https://www.spyglassrealty.com/api/blog/insurance";

function cmsEnabled() {
  return process.env.INSURANCE_CMS_DISABLED !== "1";
}

async function getJson(url) {
  const res = await fetch(url, {
    next: { revalidate: CMS_REVALIDATE_SECONDS, tags: [CMS_TAG] },
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`CMS feed ${res.status}`);
  return res.json();
}

export async function getCmsArticleList() {
  if (!cmsEnabled()) return [];
  try {
    const data = await getJson(FEED_URL);
    const list = Array.isArray(data?.articles) ? data.articles : [];
    return list.map(normalizeCmsArticle).filter(Boolean);
  } catch (err) {
    console.error("[content] CMS article list unavailable, using hardcoded articles:", err?.message || err);
    return [];
  }
}

export async function getAllArticles() {
  return mergeArticles(await getCmsArticleList(), ARTICLES);
}

export async function getArticleBySlug(slug) {
  if (cmsEnabled() && /^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    try {
      const data = await getJson(`${FEED_URL}?slug=${encodeURIComponent(slug)}`);
      const a = data?.article ? normalizeCmsArticle(data.article) : null;
      if (a) return a;
    } catch (err) {
      console.error(`[content] CMS article "${slug}" unavailable, trying hardcoded:`, err?.message || err);
    }
  }
  return ARTICLES.find((a) => a.slug === slug) || null;
}
