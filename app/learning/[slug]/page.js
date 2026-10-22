import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, formatDate } from "../../lib/articles";
import { getAllArticles, getArticleBySlug } from "../../lib/content";
import { cardImageProps, unsplash, unsplashSrcSet } from "../../lib/images";
import { pageMetadata } from "../../lib/site";
import { articleSchema, breadcrumbSchema, faqPageSchema } from "../../lib/schema";
import JsonLd from "../../components/JsonLd";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

// Hardcoded slugs prerender at build; CMS slugs render on first request and then ISR.
export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article" };
  return pageMetadata({
    title: article.metaTitle || article.title,
    description: article.dek,
    path: `/learning/${article.slug}`,
    type: "article",
    image: { url: article.img, width: 1600, alt: "" },
  });
}

export default async function LearningArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const others = (await getAllArticles()).filter((a) => a.slug !== article.slug).slice(0, 6);

  return (
    <div className="si-page">
      <JsonLd
        data={[
          articleSchema(article),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Learning center", path: "/learning" },
            { name: article.title, path: `/learning/${article.slug}` },
          ]),
          ...(article.faqs?.length ? [faqPageSchema(article.faqs)] : []),
        ]}
      />
      <SiteHeader />
      <main>
        <div className="si-article-hero">
          <img
            src={unsplash(article.img, 1600)}
            srcSet={unsplashSrcSet(article.img, [828, 1280, 1600])}
            sizes="100vw"
            alt=""
            className="si-article-hero-img"
            fetchpriority="high"
          />
          <div className="si-article-hero-scrim" aria-hidden="true" />
          <div className="si-wrap si-article-hero-copy">
            <Link href="/learning" className="si-link-acc" style={{ marginTop: 0 }}>
              ← Learning center
            </Link>
            <div className="si-eyebrow" style={{ marginTop: 18 }}>
              {article.tag}
            </div>
            <h1 className="si-h2" style={{ maxWidth: 900 }}>
              {article.title}
            </h1>
            <p className="si-lead" style={{ maxWidth: 720, color: "var(--txt)" }}>
              {article.dek}
            </p>
            <p className="si-body" style={{ marginTop: 12 }}>
              By {article.author} · Published{" "}
              <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time> ·{" "}
              {article.readMinutes} min read · Educational only — not a policy or quote
            </p>
          </div>
        </div>

        <article className="si-section" style={{ paddingTop: 64 }}>
          <div className="si-wrap si-article-prose">
            {article.answer ? (
              <section className="si-article-block">
                <p className="si-article-answer">
                  <strong>{article.answer}</strong>
                </p>
              </section>
            ) : null}
            {article.bodyHtml ? (
              <section
                className="si-article-block si-article-cms"
                dangerouslySetInnerHTML={{ __html: article.bodyHtml }}
              />
            ) : null}
            {(article.sections || []).map((sec) => (
              <section key={sec.h} className="si-article-block">
                <h2>{sec.h}</h2>
                {sec.p.map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </section>
            ))}

            {article.faqs?.length ? (
              <section className="si-article-block">
                <h2>Frequently asked questions</h2>
                {article.faqs.map((f) => (
                  <div key={f.q}>
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </section>
            ) : null}

            {article.related?.length ? (
              <section className="si-article-block">
                <h2>Related guides</h2>
                <ul>
                  {article.related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/learning/${r.slug}`} className="si-link-acc">
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {article.sources?.length ? (
              <section className="si-article-block">
                <h2>Sources</h2>
                <ul>
                  {article.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p>
                  <em>
                    Educational information only, current as of the publish date. Not legal advice and
                    not a guarantee of coverage, eligibility or rates; all policies are subject to
                    underwriting and the terms of the policy.
                  </em>
                </p>
              </section>
            ) : null}

            {article.source === "cms" && !article.sources?.length ? (
              <section className="si-article-block">
                <p>
                  <em>
                    Educational information only, current as of the publish date. Not legal advice and
                    not a guarantee of coverage, eligibility or rates; all policies are subject to
                    underwriting and the terms of the policy.
                  </em>
                </p>
              </section>
            ) : null}

            <div className="si-article-cta">
              <h2>Ready to talk through your situation?</h2>
              <p>
                Spyglass Insurance Agency is independent — we compare available options and explain
                tradeoffs in plain English.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
                <Link href="/#quote" className="si-btn si-btn-pill si-btn-primary">
                  Get my quote
                </Link>
                <a href="tel:+15125989701" className="si-btn si-btn-pill si-btn-outline">
                  Call (512) 598-9701
                </a>
              </div>
            </div>

            {others.length > 0 ? (
              <div style={{ marginTop: 64 }}>
                <div className="si-eyebrow">Keep reading</div>
                <div className="si-learn-grid" style={{ marginTop: 24 }}>
                  {others.map((a) => (
                    <Link key={a.slug} href={`/learning/${a.slug}`} className="si-article">
                      <img className="si-article-img" alt="" {...cardImageProps(a.img)} />
                      <div className="si-article-body">
                        <div className="si-article-tag">{a.tag}</div>
                        <h3 className="si-article-title">{a.title}</h3>
                        <p className="si-article-dek">{a.dek}</p>
                        <div className="si-article-more">
                          Read article <span aria-hidden="true">→</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
