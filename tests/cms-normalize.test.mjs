import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeArticles, normalizeCmsArticle, sanitizeHtml, toDay } from "../app/lib/cms-normalize.mjs";

const item = {
  slug: "texas-fair-plan-basics",
  title: "Texas FAIR Plan basics",
  metaTitle: "FAIR Plan basics",
  description: "What it is.",
  heroImage: "https://example.com/hero.jpg",
  publishedAt: "2026-10-20T15:00:00.000Z",
  updatedAt: "2026-10-21T15:00:00.000Z",
  author: "Trisha",
  topic: "buying",
  bodyHtml: "<h2>Intro</h2><p>Hello</p>",
  faqs: [{ q: "Q?", a: "A." }, { q: "", a: "x" }],
};

test("normalizes a feed item to the template shape", () => {
  const a = normalizeCmsArticle(item);
  assert.equal(a.slug, item.slug);
  assert.equal(a.dek, "What it is.");
  assert.equal(a.img, item.heroImage);
  assert.equal(a.datePublished, "2026-10-20");
  assert.equal(a.dateModified, "2026-10-21");
  assert.equal(a.tag, "Homebuying");
  assert.equal(a.author, "Trisha");
  assert.deepEqual(a.faqs, [{ q: "Q?", a: "A." }]);
  assert.deepEqual(a.sections, []);
  assert.equal(a.source, "cms");
});

test("rejects unusable items", () => {
  assert.equal(normalizeCmsArticle(null), null);
  assert.equal(normalizeCmsArticle({ title: "x" }), null);
});

test("sanitizeHtml strips scripts, handlers and javascript: links", () => {
  const out = sanitizeHtml('<p onclick="x()">a</p><script>alert(1)</script><a href="javascript:alert(1)">b</a><iframe src="x"></iframe>');
  assert.ok(!/script|onclick|javascript:|iframe/i.test(out), out);
  assert.ok(out.includes("<p>a</p>"));
});

test("CMS wins slug collisions; hardcoded fallback kept otherwise", () => {
  const cms = [{ slug: "a", datePublished: "2026-10-01", source: "cms" }];
  const fb = [
    { slug: "a", datePublished: "2026-08-06" },
    { slug: "b", datePublished: "2026-08-06" },
  ];
  const m = mergeArticles(cms, fb);
  assert.deepEqual(m.map((x) => x.slug), ["a", "b"]);
  assert.equal(m[0].source, "cms");
  assert.deepEqual(mergeArticles([], fb).map((x) => x.slug), ["a", "b"]);
});

test("toDay", () => {
  assert.equal(toDay("bad"), "");
  assert.equal(toDay(undefined), "");
});
