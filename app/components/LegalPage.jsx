import { SiteFooter, SiteHeader } from "./SiteChrome";

// Shared plain layout for legal / policy pages.
export default function LegalPage({ title, updated, children }) {
  return (
    <div className="si-page">
      <SiteHeader />
      <main className="si-section" style={{ paddingTop: 72 }}>
        <div className="si-wrap si-article-prose si-legal">
          <div className="si-eyebrow">Legal</div>
          <h1 className="si-h2">{title}</h1>
          {updated ? <p className="si-body">Last updated: {updated}</p> : null}
          <div style={{ marginTop: 40 }}>{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
