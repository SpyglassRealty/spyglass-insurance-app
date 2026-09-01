import { getSortedPosts } from '../../lib/posts';

export const metadata = {
  title: 'Insurance Learning Center | Spyglass Insurance Agency',
  description:
    'Articles to help Texas homeowners, renters, investors, and professionals understand how insurance fits into major life and real estate decisions.',
  openGraph: {
    title: 'Insurance Learning Center | Spyglass Insurance Agency',
    description:
      'Articles to help Texas homeowners, renters, investors, and professionals understand how insurance fits into major life and real estate decisions.',
    type: 'website',
  },
};

function formatCategory(category) {
  if (!category) return '';
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function LearningIndexPage() {
  const posts = getSortedPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky bg-spy-charcoal text-white">
        <div
          className="max-w-6xl mx-auto px-4"
          style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}
        >
          <a href="/" className="flex items-center gap-2 font-bold" style={{ letterSpacing: '0.08em' }}>
            <img
              src="/spyglass-insurance-assets/logo-white.svg"
              alt="Spyglass Insurance Agency logo"
              className="h-11"
            />
          </a>
          <nav className="flex items-center gap-4 text-sm" aria-label="Main navigation">
            <a href="/#coverage" className="text-white/90">
              Coverage
            </a>
            <a href="/#why" className="text-white/90">
              Why Us
            </a>
            <a href="/learning" className="text-white/90">
              Learning Center
            </a>
            <a href="/#quote" className="text-white/90">
              Contact
            </a>
            <a href="/#quote" className="btn-primary text-sm" style={{ minHeight: 40 }}>
              Get My Quote
            </a>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, background: '#f9fafb' }}>
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-sm text-spy-orange font-semibold mb-3" style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Spyglass Insurance Agency
            </p>
            <h1 className="text-3xl font-bold mb-3" style={{ color: '#1a1a1a', letterSpacing: '-0.03em' }}>
              Insurance Learning Center
            </h1>
            <p className="text-spy-muted mb-8" style={{ maxWidth: '42rem', lineHeight: 1.7 }}>
              Articles to help Texas homeowners, renters, investors, and professionals understand how insurance
              fits into major life and real estate decisions.
            </p>

            <div className="coverage-grid">
              {posts.map((post) => (
                <article key={post.slug} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {post.image ? (
                    <img
                      src={post.image}
                      alt=""
                      style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                    />
                  ) : null}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span
                      className="text-sm font-semibold"
                      style={{
                        display: 'inline-block',
                        alignSelf: 'flex-start',
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        color: '#ef4923',
                        fontSize: '0.75rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        padding: '0.25rem 0.6rem',
                        borderRadius: 9999,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {formatCategory(post.category)}
                    </span>
                    <h2 className="font-bold mb-2 text-lg" style={{ color: '#2d2d2d' }}>
                      {post.title}
                    </h2>
                    <p className="text-sm text-spy-muted mb-3" style={{ lineHeight: 1.6, flex: 1 }}>
                      {post.description}
                    </p>
                    <p className="text-sm text-spy-muted mb-3">{post.readTime}</p>
                    <a href={`/learning/${post.slug}`} className="text-sm text-spy-orange font-semibold">
                      Read article
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-spy-charcoal text-white/85 py-16 px-4">
        <div
          className="max-w-6xl mx-auto"
          style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '2fr 1fr 1fr 1fr' }}
        >
          <div>
            <img
              src="/spyglass-insurance-assets/logo-white.svg"
              alt="Spyglass Insurance Agency, LLC logo"
              className="h-11 mb-3"
            />
            <p>
              8501 N Mopac Exp, Ste 110
              <br />
              Austin, TX 78759
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <a href="tel:5125989701">(512) 598-9701</a>
            </p>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Coverage</h3>
            <ul className="text-sm" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>Homeowners</li>
              <li>Auto</li>
              <li>Umbrella</li>
              <li>Landlord</li>
              <li>Flood</li>
              <li>Renters</li>
              <li>Commercial</li>
              <li>Professional Liability &amp; E&amp;O</li>
            </ul>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Company</h3>
            <ul className="text-sm" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <a href="https://www.spyglassrealty.com/">Spyglass Realty</a>
              </li>
              <li>
                <a href="/team-login">Team Login</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-spy-orange font-bold mb-3">Contact &amp; Legal</h3>
            <ul className="text-sm" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <a href="mailto:insurance@spyglassinsurance.com">insurance@spyglassinsurance.com</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-use">Terms of Use</a>
              </li>
              <li>
                <a href="/accessibility">Accessibility</a>
              </li>
              <li>
                <a href="/insurance-disclosures">Insurance Disclosures</a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="max-w-6xl mx-auto"
          style={{
            marginTop: '2rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <span>© 2026 Spyglass Insurance Agency, LLC. All rights reserved.</span>
          <span>
            Texas agency license number: [To be added once issued] · No coverage or savings are guaranteed; all
            policies are subject to underwriting and eligibility.
          </span>
        </div>
      </footer>
    </div>
  );
}
