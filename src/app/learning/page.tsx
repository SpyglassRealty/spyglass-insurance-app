import type { Metadata } from "next";
import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Insurance Learning Center | Spyglass Insurance Agency",
  description:
    "Articles to help Texas homeowners, renters, investors, and professionals understand how insurance fits into major life and real estate decisions.",
  openGraph: {
    title: "Insurance Learning Center | Spyglass Insurance Agency",
    description:
      "Articles to help Texas homeowners, renters, investors, and professionals understand how insurance fits into major life and real estate decisions.",
    type: "website",
  },
};

function formatCategory(category: string) {
  if (!category) return "";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function LearningIndexPage() {
  const posts = getSortedPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-spy-charcoal text-white">
        <div className="max-w-6xl mx-auto px-4 h-[72px] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-wide">
            <img
              src="/spyglass-insurance-assets/logo-white.svg"
              alt="Spyglass Insurance Agency logo"
              className="h-11 w-auto"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm" aria-label="Main navigation">
            <a href="/#coverage" className="hover:text-white text-white/90">
              Coverage
            </a>
            <a href="/#why" className="hover:text-white text-white/90">
              Why Us
            </a>
            <Link href="/learning" className="hover:text-white text-white/90">
              Learning Center
            </Link>
            <a href="/#quote" className="hover:text-white text-white/90">
              Contact
            </a>
            <a href="/#quote" className="btn-primary text-sm min-h-10">
              Get My Quote
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-spy-surface">
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-sm text-spy-orange font-semibold mb-3 uppercase tracking-wider">
              Spyglass Insurance Agency
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-spy-dark">
              Insurance Learning Center
            </h1>
            <p className="text-spy-muted mb-8 max-w-2xl leading-relaxed">
              Articles to help Texas homeowners, renters, investors, and professionals understand how insurance
              fits into major life and real estate decisions.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {posts.map((post) => (
                <article key={post.slug} className="card overflow-hidden flex flex-col">
                  {post.image ? (
                    <img src={post.image} alt="" className="w-full h-44 object-cover" />
                  ) : null}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="self-start text-xs font-semibold uppercase tracking-wide text-spy-orange bg-spy-surface border border-spy-border rounded-full px-2.5 py-1 mb-3">
                      {formatCategory(post.category)}
                    </span>
                    <h2 className="text-lg font-bold mb-2 text-spy-charcoal">{post.title}</h2>
                    <p className="text-sm text-spy-muted mb-3 leading-relaxed flex-1">{post.description}</p>
                    <p className="text-sm text-spy-muted mb-3">{post.readTime}</p>
                    <Link href={`/learning/${post.slug}`} className="text-sm text-spy-orange font-semibold">
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-spy-charcoal text-white/85 py-12 px-4 text-sm">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <img src="/spyglass-insurance-assets/logo-white.svg" alt="Spyglass Insurance" className="h-12 mb-3" />
            <p>
              8501 N Mopac Exp, Ste 110
              <br />
              Austin, TX 78759
            </p>
            <p className="mt-2">
              <a href="tel:5125989701">(512) 598-9701</a>
            </p>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Coverage</h3>
            <ul className="space-y-1">
              <li>Property &amp; Casualty</li>
              <li>Professional Liability</li>
              <li>Renters</li>
              <li>Supplemental</li>
            </ul>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Company</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/crm">Agent CRM</Link>
              </li>
              <li>
                <a href="https://www.spyglassrealty.com/">Spyglass Realty</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Contact</h3>
            <ul className="space-y-1">
              <li>
                <a href="/#quote">Free consultation</a>
              </li>
              <li>
                <a href="mailto:insurance@spyglassrealty.com">insurance@spyglassrealty.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-white/10 text-white/50 text-xs flex flex-wrap justify-between gap-2">
          <span>© 2026 Spyglass Insurance</span>
          <span>Licensing disclosures required before launch</span>
        </div>
      </footer>
    </div>
  );
}
