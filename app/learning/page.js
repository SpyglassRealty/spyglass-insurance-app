import Link from "next/link";
import { ARTICLES } from "../lib/articles";
import { pageMetadata } from "../lib/site";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata = pageMetadata({
  title: "Learning Center",
  description:
    "Plain-English guides for Texas homeowners, buyers, and property owners on insurance, premiums, and flood coverage.",
  path: "/learning",
});

export default function LearningIndexPage() {
  return (
    <div className="si-page">
      <SiteHeader />
      <main className="si-section" style={{ paddingTop: 72 }}>
        <div className="si-wrap">
          <div className="si-eyebrow">Learning center</div>
          <h1 className="si-h2" style={{ maxWidth: 820 }}>
            Know before you sign.
          </h1>
          <p className="si-lead" style={{ maxWidth: 640 }}>
            Short guides for Texas homeowners, buyers, and investors — written to help you ask better
            questions before you bind coverage.
          </p>

          <div className="si-learn-grid" style={{ marginTop: 48 }}>
            {ARTICLES.map((a) => (
              <Link key={a.slug} href={`/learning/${a.slug}`} className="si-article">
                <img className="si-article-img" src={a.img} alt="" />
                <div className="si-article-body">
                  <div className="si-article-tag">{a.tag}</div>
                  <h2 className="si-article-title">{a.title}</h2>
                  <p className="si-article-dek">{a.dek}</p>
                  <div className="si-article-more">
                    Read article <span aria-hidden="true">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 56 }}>
            <Link href="/#quote" className="si-btn si-btn-pill si-btn-primary">
              Get my quote
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
