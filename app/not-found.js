import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

// Custom 404. Replaces Next's built-in page, which injected its own <title>
// on top of the layout title (the page showed two titles).
export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="si-page">
      <SiteHeader />
      <main className="si-section" style={{ paddingTop: 96, minHeight: "50vh" }}>
        <div className="si-wrap">
          <div className="si-eyebrow">404</div>
          <h1 className="si-h2">We couldn&apos;t find that page.</h1>
          <p className="si-lead">It may have moved. Try the home page or our learning center.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <Link href="/" className="si-btn si-btn-pill si-btn-primary">
              Home
            </Link>
            <Link href="/learning" className="si-btn si-btn-pill si-btn-outline">
              Learning center
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
