"use client";

import { useCallback, useEffect, useState } from "react";
import { SiteFooter } from "./components/SiteChrome";

const COVERAGES = [
  {
    title: "Homeowners",
    summary: "Your home, belongings, liability and living expenses.",
    detail:
      "Covers the dwelling, other structures, personal property, personal liability, and additional living expenses after a covered loss. In Texas, wind/hail and roof deductibles deserve a close read — we walk through them line by line.",
  },
  {
    title: "Auto",
    summary: "Vehicles, liability, property damage and medical costs.",
    detail:
      "Liability, collision, comprehensive, uninsured/underinsured motorist and medical payments. Bundling with home often changes the math — we compare both ways.",
  },
  {
    title: "Umbrella",
    summary: "Extra liability above your home and auto limits.",
    detail:
      "Sits on top of qualifying home and auto policies and extends personal liability protection well past their limits. Often surprisingly inexpensive relative to the coverage it adds.",
  },
  {
    title: "Landlord",
    summary: "Rental and investment property protection.",
    detail:
      "Built for non-owner-occupied property: dwelling coverage, liability, and loss of rental income. A standard homeowners policy generally will not cover a rented-out home.",
  },
  {
    title: "Flood",
    summary: "Separate coverage standard policies exclude.",
    detail:
      "Flood damage is generally excluded from homeowners policies. Central Texas flash flooding does not respect flood-zone lines, which is why plenty of low-risk-zone owners carry it anyway.",
  },
  {
    title: "Renters",
    summary: "Belongings and liability, without owning.",
    detail:
      "Protects personal property, personal liability, and certain additional living expenses. Typically one of the lowest-cost policies you can buy.",
  },
  {
    title: "Commercial",
    summary: "Small business, service and real estate operations.",
    detail:
      "General liability, property, business owners policies and related coverage for small businesses, landlords, consultants and service companies.",
  },
  {
    title: "Professional liability / E&O",
    summary: "Claims about your professional work.",
    detail:
      "Protection for certain claims involving professional mistakes, negligence, or failure to deliver promised services — common for real estate, consulting and licensed professionals.",
  },
];

const CAPTIVE = [
  "Quotes from one insurance company",
  "Options limited to that carrier's products",
  "Renewal increases mean you shop alone",
  "Coverage shaped by one product line",
];

const INDIE = [
  "Compares available options across multiple carriers",
  "Coverage, price, deductibles and features weighed together",
  "We re-shop at renewal, not you",
  "Recommendations built around your property",
];

const STEPS = [
  { n: "01", title: "Tell us what you need", body: "Five fields. Under a minute." },
  {
    n: "02",
    title: "We compare options",
    body: "Your advisor reviews coverage from available carriers.",
  },
  {
    n: "03",
    title: "Review in plain English",
    body: "Coverage, deductibles, limits and pricing — explained, not recited.",
  },
  {
    n: "04",
    title: "Choose your coverage",
    body: "Pick what fits. We coordinate the paperwork.",
  },
];

const ARTICLES = [
  {
    tag: "Homebuying",
    title: "What every Texas homebuyer should know about insurance",
    dek: "When to request quotes, what you'll need, and how coverage interacts with your contract and closing.",
    href: "/learning/texas-homebuyer-homeowners-insurance",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Premiums",
    title: "Why Texas homeowners rates change",
    dek: "The market forces, weather patterns and property details that move your premium.",
    href: "/learning/why-texas-homeowners-rates-change",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    tag: "Flood",
    title: "Do you need flood insurance in Central Texas?",
    dek: "Flood maps, local risk, and why owners outside high-risk zones still buy it.",
    href: "/learning/flood-insurance-central-texas",
    img: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=1200&q=80",
  },
];

const COVERAGE_OPTIONS = [
  "Homeowners",
  "Auto",
  "Umbrella",
  "Landlord",
  "Flood",
  "Renters",
  "Condo",
  "Commercial",
  "Professional liability / E&O",
  "Multiple / not sure",
];

const MARQUEE = [
  "Homeowners",
  "Auto",
  "Umbrella",
  "Landlord",
  "Flood",
  "Renters",
  "Condo",
  "Commercial",
  "Professional liability",
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80";
const ARCH_IMG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80";

const emptyHero = {
  name: "",
  email: "",
  phone: "",
  zip: "",
  interest: "",
};

const emptyQuote = {
  name: "",
  phone: "",
  email: "",
  location: "",
  interest: "",
  message: "",
};

function QuoteSuccess() {
  return (
    <div className="si-success">
      <div className="si-success-check" aria-hidden="true">
        ✓
      </div>
      <h3>Request received.</h3>
      <p>A licensed Spyglass advisor will reach out shortly to talk through your options.</p>
    </div>
  );
}

async function submitLead(payload) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please call (512) 598-9701.");
  }
  return data;
}

export default function HomeClient() {
  const [openCoverage, setOpenCoverage] = useState(null);
  const [quoteSent, setQuoteSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroForm, setHeroForm] = useState(emptyHero);
  const [quoteForm, setQuoteForm] = useState(emptyQuote);
  const [sending, setSending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return undefined;

    const revealNow = (el) => {
      el.classList.remove("will-reveal");
      el.classList.add("is-in");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(revealNow);
      return undefined;
    }

    // Hide only after mount, and only nodes below the fold
    nodes.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        revealNow(el);
      } else {
        el.classList.add("will-reveal");
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.01 }
    );

    nodes.forEach((el) => {
      if (el.classList.contains("will-reveal")) io.observe(el);
    });

    // Safety: force-reveal anything still hidden after 2.5s
    const safety = window.setTimeout(() => {
      nodes.forEach(revealNow);
    }, 2500);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  const onHeroSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setSending("hero");
      try {
        await submitLead({
          name: heroForm.name,
          email: heroForm.email,
          phone: heroForm.phone,
          location: heroForm.zip,
          interest: heroForm.interest,
          source: "hero_form",
        });
        setQuoteSent(true);
      } catch (err) {
        setError(err.message || "Submit failed");
      } finally {
        setSending(null);
      }
    },
    [heroForm]
  );

  const onQuoteSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(null);
      setSending("quote");
      try {
        await submitLead({
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          location: quoteForm.location,
          interest: quoteForm.interest,
          message: quoteForm.message,
          source: "quote_form",
        });
        setQuoteSent(true);
      } catch (err) {
        setError(err.message || "Submit failed");
      } finally {
        setSending(null);
      }
    },
    [quoteForm]
  );

  const marqueeItems = (
    <div className="si-marquee-group">
      {MARQUEE.map((item, i) => (
        <span key={`${item}-${i}`} style={{ display: "contents" }}>
          <span>{item}</span>
          <span className="si-marquee-diamond" aria-hidden="true">
            ◆
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="si-page">
      <header className="si-header">
        <div className="si-header-inner">
          <a href="#top" className="si-logo-lockup" aria-label="Spyglass Insurance Agency">
            <img
              src="/spyglass-insurance-assets/logo-white.svg"
              alt="Spyglass Insurance"
              height={54}
              className="si-logo-mark"
            />
            <span className="si-logo-agency">Agency</span>
          </a>

          <nav className={`si-nav${menuOpen ? " open" : ""}`} aria-label="Main">
            <a href="#coverage" onClick={() => setMenuOpen(false)}>
              Coverage
            </a>
            <a href="#why" onClick={() => setMenuOpen(false)}>
              Why independent
            </a>
            <a href="#spyglass" onClick={() => setMenuOpen(false)}>
              Our standard
            </a>
            <a href="/learning" onClick={() => setMenuOpen(false)}>
              Blog
            </a>
          </nav>

          <div className="si-header-right">
            <a href="tel:+15125989701" className="si-header-phone">
              (512) 598-9701
            </a>
            <a href="#quote" className="si-btn si-btn-nav">
              Get my quote
            </a>
            <button
              type="button"
              className="si-menu-btn"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="si-hero">
        <div className="si-hero-bg" aria-hidden="true">
          <img src={HERO_IMG} alt="" />
        </div>
        <div className="si-hero-scrim" aria-hidden="true" />
        <div className="si-hero-grid">
          <div>
            <div className="si-chip">
              <span className="si-chip-badge">Independent</span>
              Many carriers. One advisor.
            </div>
            <h1 className="si-h1">
              Your home is the
              <br />
              biggest thing you own.
              <br />
              <span style={{ color: "var(--acc)" }}>Insure it like it.</span>
            </h1>
            <p className="si-hero-lead">
              Spyglass Insurance Agency is an independent Texas agency. We shop multiple carriers,
              explain the fine print in plain English, and stay with you long after the policy is
              bound.
            </p>
            <div className="si-hero-ctas">
              <a href="#quote" className="si-btn si-btn-pill si-btn-primary">
                Get my quote
              </a>
              <a href="#coverage" className="si-btn si-btn-pill si-btn-outline">
                Explore coverage
              </a>
            </div>
          </div>

          <div className="si-form-panel">
            {quoteSent ? (
              <QuoteSuccess />
            ) : (
              <form onSubmit={onHeroSubmit}>
                <div className="si-form-title">Start with five fields.</div>
                <div className="si-form-sub">
                  A licensed advisor takes it from there — we&apos;ll ask the rest on the call.
                </div>
                <div className="si-form-grid">
                  <div className="si-field">
                    <label htmlFor="hero-name" className="sr-only">
                      Full name
                    </label>
                    <input
                      id="hero-name"
                      className="si-input"
                      placeholder="Full name"
                      required
                      autoComplete="name"
                      value={heroForm.name}
                      onChange={(e) => setHeroForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="si-field">
                    <label htmlFor="hero-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="hero-email"
                      className="si-input"
                      type="email"
                      placeholder="Email"
                      required
                      autoComplete="email"
                      value={heroForm.email}
                      onChange={(e) => setHeroForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div className="si-form-row-2">
                    <div className="si-field">
                      <label htmlFor="hero-phone" className="sr-only">
                        Mobile phone
                      </label>
                      <input
                        id="hero-phone"
                        className="si-input"
                        type="tel"
                        placeholder="Mobile phone"
                        required
                        autoComplete="tel"
                        value={heroForm.phone}
                        onChange={(e) => setHeroForm((f) => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                    <div className="si-field">
                      <label htmlFor="hero-zip" className="sr-only">
                        ZIP
                      </label>
                      <input
                        id="hero-zip"
                        className="si-input"
                        placeholder="ZIP"
                        required
                        autoComplete="postal-code"
                        value={heroForm.zip}
                        onChange={(e) => setHeroForm((f) => ({ ...f, zip: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="si-field">
                    <label htmlFor="hero-interest" className="sr-only">
                      Coverage needed
                    </label>
                    <select
                      id="hero-interest"
                      className="si-input"
                      required
                      value={heroForm.interest}
                      onChange={(e) => setHeroForm((f) => ({ ...f, interest: e.target.value }))}
                    >
                      <option value="">What do you need covered?</option>
                      {COVERAGE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="si-btn-submit" disabled={sending === "hero"}>
                    {sending === "hero" ? "Sending…" : "Request my quote"}
                  </button>
                </div>
                {error && sending !== "quote" ? <p className="si-form-error">{error}</p> : null}
                <div className="si-form-note">
                  No obligation. Coverage and pricing are subject to carrier eligibility and
                  underwriting.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="si-marquee" aria-hidden="true">
        <div className="si-marquee-track">
          {marqueeItems}
          {marqueeItems}
        </div>
      </div>

      {/* Why independent */}
      <section id="why" className="si-section" style={{ background: "var(--bg)" }}>
        <div className="si-wrap">
          <div className="si-why-grid">
            <div data-reveal>
              <div className="si-eyebrow">Independent vs. captive</div>
              <h2 className="si-h2">The difference is who we work for.</h2>
              <p className="si-lead">
                A captive agent generally sells one company&apos;s products. We&apos;re independent —
                we compare available options across multiple carriers on coverage, price, deductibles
                and policy features, then recommend what actually fits.
              </p>
              <a href="#quote" className="si-link-acc">
                Compare my options <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="si-compare" data-reveal>
              <div className="si-compare-card">
                <div className="si-compare-label">Captive agent</div>
                <div className="si-compare-rule" />
                {CAPTIVE.map((row) => (
                  <div key={row} className="si-compare-row">
                    <span className="si-compare-mark" aria-hidden="true">
                      —
                    </span>
                    <span>{row}</span>
                  </div>
                ))}
              </div>
              <div className="si-compare-card indie">
                <div className="si-compare-label">Spyglass · independent</div>
                <div className="si-compare-rule" />
                {INDIE.map((row) => (
                  <div key={row} className="si-compare-row">
                    <span className="si-compare-mark" aria-hidden="true">
                      ✓
                    </span>
                    <span>{row}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section id="coverage" className="si-section si-section-alt">
        <div className="si-wrap">
          <div className="si-coverage-head" data-reveal>
            <div>
              <div className="si-eyebrow">Coverage</div>
              <h2 className="si-h2">Eight ways we protect Texans.</h2>
            </div>
            <p>Tap any coverage to see what it actually does — and what it doesn&apos;t.</p>
          </div>

          <div className="si-coverage-grid">
            {COVERAGES.map((c, i) => {
              const open = openCoverage === i;
              const detailId = `cov-detail-${i}`;
              return (
                <button
                  key={c.title}
                  type="button"
                  className={`si-cov-card${open ? " open" : ""}`}
                  aria-expanded={open}
                  aria-controls={detailId}
                  onClick={() => setOpenCoverage(open ? null : i)}
                >
                  <div className="si-cov-top">
                    <h3 className="si-cov-title">{c.title}</h3>
                    <span className="si-cov-toggle" aria-hidden="true">
                      {open ? "−" : "+"}
                    </span>
                  </div>
                  <p className="si-cov-sum">{c.summary}</p>
                  {open ? (
                    <p id={detailId} className="si-cov-detail">
                      {c.detail}
                    </p>
                  ) : (
                    <span id={detailId} className="sr-only">
                      {c.detail}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="si-cov-disclaimer">
            Descriptions are general summaries, not policy language. Carrier availability,
            eligibility and terms vary by location, property, coverage needs and underwriting
            guidelines.
          </p>
        </div>
      </section>

      {/* Spyglass standard */}
      <section id="spyglass" className="si-section" style={{ background: "var(--bg)" }}>
        <div className="si-wrap">
          <div className="si-std-grid">
            <div className="si-arch-wrap" data-reveal>
              <div className="si-arch-frame">
                <img src={ARCH_IMG} alt="Austin home exterior" />
              </div>
              <div className="si-backed-card">
                <div className="tiny">BACKED BY</div>
                <img
                  src="/spyglass-insurance-assets/spyglass-logo-white.png"
                  alt="Spyglass Realty"
                />
                <p>One of Austin&apos;s leading independent brokerages.</p>
              </div>
            </div>

            <div data-reveal>
              <div className="si-eyebrow">The Spyglass standard</div>
              <h2 className="si-h2">
                Built by the team that has guided thousands of Austin closings.
              </h2>
              <p className="si-lead">
                Spyglass Insurance Agency was created by the people behind Spyglass Realty — one of
                Austin&apos;s leading independent brokerages. Same standard: honest advice, clear
                communication, and a phone that gets answered long after closing.
              </p>
              <blockquote className="si-quote-block">
                <p>
                  “Spyglass Realty guided us through buying and selling in Austin with clear,
                  straightforward advice. We always felt like they had our best interests at heart.”
                </p>
                <cite>Spyglass Realty client review</cite>
              </blockquote>
              <div className="si-mini-grid">
                <div className="si-mini-card">
                  <strong>Local advisors</strong>
                  <span>Central Texas homes and risks</span>
                </div>
                <div className="si-mini-card">
                  <strong>Annual reviews</strong>
                  <span>We re-check for gaps yearly</span>
                </div>
                <div className="si-mini-card">
                  <strong>Plain English</strong>
                  <span>No jargon, no surprises</span>
                </div>
              </div>
              <a
                href="https://www.spyglassrealty.com/"
                className="si-link-acc"
                target="_blank"
                rel="noreferrer"
              >
                Visit Spyglass Realty <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="si-section si-section-alt">
        <div className="si-wrap">
          <div style={{ maxWidth: 640 }} data-reveal>
            <div className="si-eyebrow">How it works</div>
            <h2 className="si-h2">Four steps. No runaround.</h2>
          </div>
          <div className="si-steps">
            {STEPS.map((s) => (
              <div key={s.n} className="si-step">
                <div className="si-step-num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning */}
      <section id="learning" className="si-section" style={{ background: "var(--bg)" }}>
        <div className="si-wrap">
          <div className="si-learn-head" data-reveal>
            <div>
              <div className="si-eyebrow">Learning center</div>
              <h2 className="si-h2">Know before you sign.</h2>
            </div>
            <a href="/learning" className="si-link-acc" style={{ marginTop: 0 }}>
              All articles <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="si-learn-grid">
            {ARTICLES.map((a) => (
              <a key={a.href} href={a.href} className="si-article">
                <img className="si-article-img" src={a.img} alt="" />
                <div className="si-article-body">
                  <div className="si-article-tag">{a.tag}</div>
                  <h3 className="si-article-title">{a.title}</h3>
                  <p className="si-article-dek">{a.dek}</p>
                  <div className="si-article-more">
                    Read article <span aria-hidden="true">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section
        id="quote"
        className="si-section"
        style={{ background: "var(--bg2)", borderTop: "1px solid var(--line)" }}
      >
        <div className="si-wrap-quote">
          <div className="si-quote-grid">
            <div data-reveal>
              <div className="si-eyebrow">Get covered</div>
              <h2 className="si-h2-quote">Five fields now. The rest on the call.</h2>
              <p className="si-lead">
                A licensed advisor reviews your information, checks available carrier options, and
                follows up to walk through recommendations in plain language.
              </p>
              <div className="si-contact-block">
                <div>
                  <div className="lbl">Call</div>
                  <a href="tel:+15125989701" className="val-phone">
                    (512) 598-9701
                  </a>
                </div>
                <div>
                  <div className="lbl">Email</div>
                  <a href="mailto:insurance@spyglassinsurance.com" className="val">
                    insurance@spyglassinsurance.com
                  </a>
                </div>
                <div>
                  <div className="lbl">Office</div>
                  <span className="val">8501 N Mopac Expy STE 110, Austin, TX 78759</span>
                </div>
              </div>
            </div>

            <div className="si-form-panel si-form-panel-lg">
              {quoteSent ? (
                <QuoteSuccess />
              ) : (
                <form onSubmit={onQuoteSubmit}>
                  <div className="si-form-grid">
                    <div className="si-form-row-half">
                      <div className="si-field">
                        <label htmlFor="q-name">Full name *</label>
                        <input
                          id="q-name"
                          className="si-input"
                          required
                          autoComplete="name"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm((f) => ({ ...f, name: e.target.value }))}
                        />
                      </div>
                      <div className="si-field">
                        <label htmlFor="q-phone">Mobile phone *</label>
                        <input
                          id="q-phone"
                          className="si-input"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={quoteForm.phone}
                          onChange={(e) => setQuoteForm((f) => ({ ...f, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="si-form-row-email">
                      <div className="si-field">
                        <label htmlFor="q-email">Email *</label>
                        <input
                          id="q-email"
                          className="si-input"
                          type="email"
                          required
                          autoComplete="email"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm((f) => ({ ...f, email: e.target.value }))}
                        />
                      </div>
                      <div className="si-field">
                        <label htmlFor="q-loc">ZIP or city *</label>
                        <input
                          id="q-loc"
                          className="si-input"
                          required
                          value={quoteForm.location}
                          onChange={(e) =>
                            setQuoteForm((f) => ({ ...f, location: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                    <div className="si-field">
                      <label htmlFor="q-interest">Type of insurance needed *</label>
                      <select
                        id="q-interest"
                        className="si-input"
                        required
                        value={quoteForm.interest}
                        onChange={(e) => setQuoteForm((f) => ({ ...f, interest: e.target.value }))}
                      >
                        <option value="">Select one</option>
                        {COVERAGE_OPTIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="si-field">
                      <label htmlFor="q-msg">Anything we should know?</label>
                      <textarea
                        id="q-msg"
                        className="si-input"
                        rows={3}
                        value={quoteForm.message}
                        onChange={(e) => setQuoteForm((f) => ({ ...f, message: e.target.value }))}
                      />
                    </div>
                    <button
                      type="submit"
                      className="si-btn-submit"
                      style={{ padding: 18, fontSize: 16 }}
                      disabled={sending === "quote"}
                    >
                      {sending === "quote" ? "Sending…" : "Request my quote"}
                    </button>
                  </div>
                  {error && sending !== "hero" ? <p className="si-form-error">{error}</p> : null}
                  <p className="si-form-note">
                    By submitting this form, you agree that Spyglass Insurance Agency may contact you
                    at the phone number and email address provided, including by call or text
                    message, for information related to insurance products and services. Message and
                    data rates may apply. You may opt out at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
