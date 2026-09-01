import { notFound } from 'next/navigation';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Article not found | Spyglass Insurance Agency' };
  }

  return {
    title: `${post.title} | Spyglass Insurance Agency`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

function formatCategory(category) {
  if (!category) return '';
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatDate(date) {
  if (!date) return '';
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function LearningPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

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

      <main style={{ flex: 1 }}>
        {post.image ? (
          <div style={{ width: '100%', maxHeight: 420, overflow: 'hidden', background: '#1a1a1a' }}>
            <img
              src={post.image}
              alt=""
              style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }}
            />
          </div>
        ) : null}

        <article className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <a href="/learning" className="text-sm text-spy-orange font-semibold">
              ← Learning Center
            </a>
            <p
              className="text-sm font-semibold"
              style={{
                display: 'inline-block',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                color: '#ef4923',
                fontSize: '0.75rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.6rem',
                borderRadius: 9999,
                margin: '1rem 0 0.75rem',
              }}
            >
              {formatCategory(post.category)}
            </p>
            <h1 className="text-3xl font-bold mb-3" style={{ color: '#1a1a1a', letterSpacing: '-0.03em' }}>
              {post.title}
            </h1>
            <p className="text-sm text-spy-muted mb-8">
              {formatDate(post.date)}
              {post.readTime ? ` · ${post.readTime}` : ''}
              {post.city ? ` · ${post.city}` : ''}
            </p>
            <style>{`
              .post-body h2 { font-size: 1.5rem; font-weight: 700; margin: 2rem 0 0.75rem; color: #2d2d2d; }
              .post-body h3 { font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 0.5rem; color: #2d2d2d; }
              .post-body p { margin-bottom: 1rem; line-height: 1.75; color: #374151; }
              .post-body ul, .post-body ol { margin: 0 0 1rem 1.25rem; line-height: 1.75; color: #374151; }
              .post-body li { margin-bottom: 0.35rem; }
              .post-body a { color: #ef4923; font-weight: 600; }
              .post-body strong { color: #2d2d2d; }
            `}</style>
            <div className="post-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </article>

        <section className="py-16 bg-spy-surface">
          <div className="max-w-3xl mx-auto px-4" style={{ textAlign: 'center' }}>
            <h2 className="text-2xl font-bold mb-3">Ready to talk through your coverage?</h2>
            <p className="text-spy-muted mb-6">
              A licensed insurance advisor can help you compare options for your Texas home, rental, or business.
            </p>
            <a href="/#quote" className="btn-primary">
              Get My Quote
            </a>
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
