import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "../../lib/articles";
import { pageMetadata } from "../../lib/site";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const article = getArticle(params.slug);
  if (!article) return { title: "Article" };
  return pageMetadata({
    title: article.title,
    description: article.dek,
    path: `/learning/${article.slug}`,
    type: "article",
    image: { url: article.img, width: 1600, alt: "" },
  });
}

export default function LearningArticlePage({ params }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  const others = ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <div className="si-page">
      <SiteHeader />
      <main>
        <div className="si-article-hero">
          <img src={article.img} alt="" className="si-article-hero-img" />
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
              {article.readMinutes} min read · Educational only — not a policy or quote
            </p>
          </div>
        </div>

        <article className="si-section" style={{ paddingTop: 64 }}>
          <div className="si-wrap si-article-prose">
            {article.sections.map((sec) => (
              <section key={sec.h} className="si-article-block">
                <h2>{sec.h}</h2>
                {sec.p.map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
              </section>
            ))}

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
                      <img className="si-article-img" src={a.img} alt="" />
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
