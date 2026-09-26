import Link from "next/link";
import { SiteFooter, SiteHeader } from "./SiteChrome";
import { BUSINESS } from "../lib/site";
import JsonLd from "./JsonLd";

// Layout for coverage pages. Content is general/educational only:
// no rate, savings or "cheapest" claims (28 TAC §21.108 / §21.112).
export default function ServicePage({ eyebrow, title, lead, sections, faqs, schema }) {
  return (
    <div className="si-page">
      {schema ? <JsonLd data={schema} /> : null}
      <SiteHeader />
      <main>
        <section className="si-section" style={{ paddingTop: 72, paddingBottom: 24 }}>
          <div className="si-wrap si-article-prose">
            <div className="si-eyebrow">{eyebrow}</div>
            <h1 className="si-h2">{title}</h1>
            <p className="si-lead" style={{ color: "var(--txt)" }}>
              {lead}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <Link href="/#quote" className="si-btn si-btn-pill si-btn-primary">
                Get my quote
              </Link>
              <a href={`tel:${BUSINESS.phoneE164}`} className="si-btn si-btn-pill si-btn-outline">
                Call {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <article className="si-section" style={{ paddingTop: 40 }}>
          <div className="si-wrap si-article-prose si-legal">
            {sections.map((sec) => (
              <section key={sec.h} className="si-article-block">
                <h2>{sec.h}</h2>
                {sec.p?.map((para) => (
                  <p key={para.slice(0, 48)}>{para}</p>
                ))}
                {sec.list ? (
                  <ul>
                    {sec.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {faqs?.length ? (
              <section className="si-article-block" id="faq">
                <h2>Frequently asked questions</h2>
                {faqs.map((f) => (
                  <div key={f.q} style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 19, margin: "0 0 8px" }}>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </section>
            ) : null}

            <div className="si-article-cta">
              <h2>Talk it through with a licensed advisor.</h2>
              <p>
                We&apos;re an independent Austin agency. We compare available options from multiple
                carriers and explain the tradeoffs in plain English.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
                <Link href="/#quote" className="si-btn si-btn-pill si-btn-primary">
                  Get my quote
                </Link>
                <Link href="/learning" className="si-btn si-btn-pill si-btn-outline">
                  Learning center
                </Link>
              </div>
            </div>

            <p className="si-cov-disclaimer" style={{ marginTop: 32 }}>
              General educational information, not policy language or a quote. Coverage,
              availability and terms vary by carrier and are subject to eligibility and
              underwriting.
            </p>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
