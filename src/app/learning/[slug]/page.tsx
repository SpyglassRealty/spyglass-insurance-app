import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: "Article not found | Spyglass Insurance Agency" };
  }

  return {
    title: `${post.title} | Spyglass Insurance Agency`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

function formatCategory(category: string) {
  if (!category) return "";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatDate(date: string) {
  if (!date) return "";
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function LearningPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

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

      <main className="flex-1">
        {post.image ? (
          <div className="w-full max-h-[420px] overflow-hidden bg-spy-dark">
            <img src={post.image} alt="" className="w-full h-[420px] object-cover" />
          </div>
        ) : null}

        <article className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <Link href="/learning" className="text-sm text-spy-orange font-semibold">
              ← Learning Center
            </Link>
            <p className="inline-block text-xs font-semibold uppercase tracking-wide text-spy-orange bg-spy-surface border border-spy-border rounded-full px-2.5 py-1 mt-4 mb-3">
              {formatCategory(post.category)}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-spy-dark">{post.title}</h1>
            <p className="text-sm text-spy-muted mb-8">
              {formatDate(post.date)}
              {post.readTime ? ` · ${post.readTime}` : ""}
              {post.city ? ` · ${post.city}` : ""}
            </p>
            <div
              className="text-[15px] leading-7 text-[#374151] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-spy-charcoal [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-spy-charcoal [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:ml-5 [&_ol]:mb-4 [&_ol]:ml-5 [&_li]:mb-1.5 [&_a]:text-spy-orange [&_a]:font-semibold [&_strong]:text-spy-charcoal"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </article>

        <section className="py-16 bg-spy-surface">
          <div className="max-w-3xl mx-auto px-4 text-center">
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
