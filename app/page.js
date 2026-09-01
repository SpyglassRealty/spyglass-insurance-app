export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky bg-spy-charcoal text-white">
        <div className="max-w-6xl mx-auto px-4" style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <a href="/" className="flex items-center gap-2 font-bold" style={{ letterSpacing: '0.08em' }}>
            <img
              src="/spyglass-insurance-assets/logo-white.svg"
              alt="Spyglass Insurance Agency logo"
              className="h-11"
            />
          </a>
          <nav className="flex items-center gap-4 text-sm" aria-label="Main navigation">
            <a href="#coverage" className="text-white/90">Coverage</a>
            <a href="#why" className="text-white/90">Why Us</a>
            <a href="#learning" className="text-white/90">Learning Center</a>
            <a href="#quote" className="text-white/90">Contact</a>
            <a href="#quote" className="btn-primary text-sm" style={{ minHeight: 40 }}>Get My Quote</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-bg" style={{ color: '#fff', minHeight: '78vh', display: 'grid', alignItems: 'center' }}>
        <div className="max-w-3xl mx-auto px-4" style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center' }}>
          <p className="mb-4" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Home 
            <span aria-hidden="true"> • </span>
            Auto 
            <span aria-hidden="true"> • </span>
            Umbrella 
            <span aria-hidden="true"> • </span>
            Landlord 
            <span aria-hidden="true"> • </span>
            Flood 
            <span aria-hidden="true"> • </span>
            Commercial
          </p>
          <h1 className="text-3xl font-bold mb-6" style={{ letterSpacing: '-0.04em' }}>
            Insurance That Works as Hard as You Do.
          </h1>
          <p className="mb-6 text-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Independent insurance advisors helping Texas homeowners, renters, professionals, and businesses
            find the right coverage from multiple trusted carriers.
          </p>
          <div className="flex" style={{ justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="#quote" className="btn-primary text-lg" style={{ padding: '0.75rem 1.75rem' }}>
              Get My Quote
            </a>
            <a href="#coverage" className="btn-secondary text-lg" style={{ padding: '0.75rem 1.75rem' }}>
              Explore Coverage
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="trust-strip" aria-label="Why Spyglass Insurance Agency">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold text-center mb-6">Why Spyglass Insurance Agency?</h2>
          <div className="trust-strip-items text-sm text-center">
            {[
              'Independent Insurance Agency',
              'Multiple Insurance Companies',
              'Local Austin Advisors',
              'Backed by Spyglass Realty',
              'Personalized Coverage',
            ].map((item) => (
              <div key={item} className="card" style={{ padding: '1rem' }}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built by Spyglass Realty */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4" style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-3">Built by the Team Behind Spyglass Realty</h2>
            <p className="text-spy-muted">
              Spyglass Insurance Agency was created by the team behind Spyglass Realty, one of Austin&apos;s leading
              independent real estate brokerages. We are bringing the same commitment to service, honesty,
              responsiveness, and expertise to the insurance industry.
            </p>
          </div>
          <div>
            <a
              href="https://www.spyglassrealty.com/"
              className="btn-primary"
              target="_blank"
              rel="noreferrer"
            >
              Learn About Spyglass Realty
            </a>
          </div>
        </div>
      </section>

      {/* Carrier section (logos wired later) */}
      <section className="py-16 bg-spy-surface">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-3">More Options. Better Coverage.</h2>
          <p className="text-center text-spy-muted mb-8 max-w-3xl mx-auto">
            As an independent agency, we can compare coverage and pricing from multiple insurance companies
            instead of offering only one carrier&apos;s products.
          </p>
          <div
            className="grid"
            style={{ gap: '1.25rem', justifyItems: 'center', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}
            aria-label="Carrier logos (displayed only when appointed)"
          >
            {/* Logos intentionally omitted until appointments are in place */}
          </div>
          <p className="text-center text-spy-muted mt-6 text-sm">
            Carrier availability and eligibility vary by location, property, coverage needs, and underwriting
            guidelines.
          </p>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-3">Trusted by Central Texas Homeowners</h2>
          <p className="text-center text-spy-muted max-w-3xl mx-auto mb-8">
            The Spyglass family of companies has helped thousands of Central Texans navigate major decisions
            involving their homes. We are bringing that same client-first approach to insurance.
          </p>
          <div className="grid" style={{ gap: '1.5rem', gridTemplateColumns: 'minmax(0,2fr) minmax(0,3fr)' }}>
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-bold mb-2">The Spyglass family advantage</h3>
              <p className="text-spy-muted text-sm">
                Spyglass Realty has built its reputation on honest advice, clear communication, and taking care of
                clients long after closing. Spyglass Insurance Agency continues that standard by helping homeowners,
                renters, and small businesses make confident decisions about their coverage.
              </p>
            </div>
            <div className="grid" style={{ gap: '1rem' }}>
              <article className="card" style={{ padding: '1.25rem' }}>
                <p className="text-sm mb-2">
                  “Spyglass Realty guided us through buying and selling in Austin with clear, straightforward
                  advice. We always felt like they had our best interests at heart.”
                </p>
                <p className="text-xs text-spy-muted">Review of Spyglass Realty</p>
              </article>
              <article className="card" style={{ padding: '1.25rem' }}>
                <h3 className="font-bold mb-1 text-sm">Future Insurance Reviews</h3>
                <p className="text-xs text-spy-muted">
                  Once Spyglass Insurance Agency has verified client reviews, they will be displayed here from
                  sources like Google and other review platforms.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Reasons to work with us */}
      <section id="why" className="bg-spy-surface py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Reasons to Work with Us</h2>
          <div className="grid" style={{ gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <article className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-bold mb-2">Local Austin Advisors</h3>
              <p className="text-sm text-spy-muted">
                Work with a real person who understands Central Texas homes, risks, and insurance needs.
              </p>
            </article>
            <article className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-bold mb-2">Multiple Carrier Options</h3>
              <p className="text-sm text-spy-muted">
                We compare available coverage from multiple insurance companies to help you make an informed
                decision.
              </p>
            </article>
            <article className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-bold mb-2">Annual Policy Reviews</h3>
              <p className="text-sm text-spy-muted">
                As your needs change, we can review your policies and help identify coverage gaps or opportunities
                to improve your protection.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Spyglass Standard */}
      <section className="bg-spy-dark text-white py-14">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Built on the Spyglass Standard</h2>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Founded by the team behind Spyglass Realty, we have brought the same commitment to service, honesty,
            responsiveness, and expertise into the insurance business.
          </p>
          <a
            href="https://www.spyglassrealty.com/"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Visit Spyglass Realty
          </a>
        </div>
      </section>

      {/* Independent agency explainer */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid" style={{ gap: '1.5rem', gridTemplateColumns: 'minmax(0,2fr) minmax(0,3fr)' }}>
          <div>
            <h2 className="text-2xl font-bold mb-3">Why Choose an Independent Insurance Agency?</h2>
            <p className="text-spy-muted mb-3">
              A captive insurance agent generally offers products from one insurance company. As an independent
              agency, Spyglass Insurance Agency can compare available options from multiple carriers. That gives you
              more flexibility when evaluating coverage, price, deductibles, and policy features.
            </p>
          </div>
          <div className="grid" style={{ gap: '0.75rem' }}>
            <div className="card" style={{ padding: '1rem' }}>
              <p className="text-sm font-semibold">More carrier options</p>
            </div>
            <div className="card" style={{ padding: '1rem' }}>
              <p className="text-sm font-semibold">Personalized coverage recommendations</p>
            </div>
            <div className="card" style={{ padding: '1rem' }}>
              <p className="text-sm font-semibold">A local advisor who can help as your needs change</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage product cards */}
      <section id="coverage" className="py-16 bg-spy-surface">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-2">Coverage Options</h2>
          <p className="text-center text-spy-muted mb-10 max-w-3xl mx-auto">
            We help Texas homeowners, renters, professionals, and small businesses evaluate coverage options in
            plain language.
          </p>
          <div className="coverage-grid">
            {[
              {
                title: 'Homeowners Insurance',
                body:
                  'Protection for your home, belongings, personal liability, and additional living expenses after a covered loss.',
              },
              {
                title: 'Auto Insurance',
                body:
                  'Coverage for your vehicles, liability, property damage, medical costs, and other risks on the road.',
              },
              {
                title: 'Umbrella Insurance',
                body:
                  'Additional personal liability protection above the limits of qualifying home and auto policies.',
              },
              {
                title: 'Landlord Insurance',
                body:
                  'Coverage designed for rental properties, investment homes, and the liability risks that come with being a landlord.',
              },
              {
                title: 'Flood Insurance',
                body:
                  'Separate coverage for certain types of flood damage that are generally not covered by a standard homeowners policy.',
              },
              {
                title: 'Renters Insurance',
                body:
                  'Affordable protection for personal belongings, liability, and certain additional living expenses.',
              },
              {
                title: 'Commercial Insurance',
                body:
                  'Coverage options for small businesses, real estate professionals, landlords, consultants, and service companies.',
              },
              {
                title: 'Professional Liability and E&O',
                body:
                  'Protection for certain claims involving professional mistakes, negligence, or failure to provide promised services.',
              },
            ].map((card) => (
              <article key={card.title} className="card" style={{ padding: '1.5rem' }}>
                <h3 className="font-bold mb-2 text-lg">{card.title}</h3>
                <p className="text-sm text-spy-muted mb-3">{card.body}</p>
                <a href="#quote" className="text-sm text-spy-orange font-semibold">
                  Explore Coverage
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Getting Covered Is Simple</h2>
          <div className="how-it-works-grid">
            {[1, 2, 3, 4].map((step) => (
              <article key={step} className="card" style={{ padding: '1.5rem' }}>
                <div
                  className="rounded-full mb-3"
                  style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', background: 'var(--spyglass-surface, #f3f4f6)' }}
                >
                  <span className="font-semibold text-sm">{step}</span>
                </div>
                {step === 1 && (
                  <>
                    <h3 className="font-bold mb-2">Tell Us What You Need</h3>
                    <p className="text-sm text-spy-muted">Complete the short quote request form.</p>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h3 className="font-bold mb-2">We Compare Available Options</h3>
                    <p className="text-sm text-spy-muted">
                      Our advisor reviews coverage opportunities from available carriers.
                    </p>
                  </>
                )}
                {step === 3 && (
                  <>
                    <h3 className="font-bold mb-2">Review Your Recommendations</h3>
                    <p className="text-sm text-spy-muted">
                      We explain coverage, deductibles, limits, and pricing in plain English.
                    </p>
                  </>
                )}
                {step === 4 && (
                  <>
                    <h3 className="font-bold mb-2">Choose Your Coverage</h3>
                    <p className="text-sm text-spy-muted">
                      Select the option that fits your needs, and we help coordinate the remaining paperwork.
                    </p>
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Learn center preview */}
      <section id="learning" className="py-16 bg-spy-surface">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-3">Insurance Learning Center</h2>
          <p className="text-center text-spy-muted max-w-3xl mx-auto mb-8">
            Articles to help Texas homeowners, renters, investors, and professionals understand how insurance fits
            into major life and real estate decisions.
          </p>
          <div className="coverage-grid">
            <article className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-bold mb-2 text-lg">What Every Texas Homebuyer Should Know About Homeowners Insurance</h3>
              <p className="text-sm text-spy-muted mb-3">
                When to request quotes, what information you&apos;ll need, and how coverage interacts with your
                contract and closing.
              </p>
              <a href="/learning/texas-homebuyer-homeowners-insurance" className="text-sm text-spy-orange font-semibold">
                Read article
              </a>
            </article>
            <article className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-bold mb-2 text-lg">Why Texas Homeowners Insurance Rates Change</h3>
              <p className="text-sm text-spy-muted mb-3">
                Understand the market forces, weather patterns, and property details that can affect your premium.
              </p>
              <a href="/learning/why-texas-homeowners-rates-change" className="text-sm text-spy-orange font-semibold">
                Read article
              </a>
            </article>
            <article className="card" style={{ padding: '1.5rem' }}>
              <h3 className="font-bold mb-2 text-lg">Do You Need Flood Insurance in Central Texas?</h3>
              <p className="text-sm text-spy-muted mb-3">
                Flood maps, local risk, and why some homeowners outside high-risk zones still choose coverage.
              </p>
              <a href="/learning/flood-insurance-central-texas" className="text-sm text-spy-orange font-semibold">
                Read article
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Meet your advisor placeholder */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-3">Meet Your Insurance Advisor</h2>
          <p className="text-center text-spy-muted max-w-3xl mx-auto mb-8">
            Spyglass Insurance Agency will be led by a licensed insurance advisor dedicated to helping Central
            Texas clients navigate their coverage options. This section will feature your advisor&apos;s photo,
            background, and contact information once they join the team.
          </p>
          <div className="max-w-3xl mx-auto card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <p className="text-sm text-spy-muted">
              Future content: professional headshot, name, Texas license information, short biography, direct
              phone and email, and a &quot;Schedule a Call&quot; button.
            </p>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid" style={{ gap: '2rem', gridTemplateColumns: 'minmax(0,3fr) minmax(0,2fr)' }}>
          <div className="max-w-xl mx-auto card shadow-md" style={{ padding: '2rem' }}>
            <h2 className="text-2xl font-bold text-center mb-2">Get Your Insurance Quote</h2>
            <p className="text-center text-spy-muted text-sm mb-6">
              Tell us a little about what you need, and a licensed insurance advisor will contact you to discuss
              your options.
            </p>
            <form className="space-y-3">
              <div className="grid" style={{ gap: '0.75rem', gridTemplateColumns: 'repeat(2, minmax(0,1fr))' }}>
                <label className="text-sm font-semibold">
                  First name *
                  <input
                    name="firstName"
                    required
                    className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                  />
                </label>
                <label className="text-sm font-semibold">
                  Last name *
                  <input
                    name="lastName"
                    required
                    className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                  />
                </label>
              </div>
              <label className="text-sm font-semibold">
                Email *
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                />
              </label>
              <label className="text-sm font-semibold">
                Mobile phone *
                <input
                  type="tel"
                  name="mobile"
                  required
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                />
              </label>
              <label className="text-sm font-semibold">
                Type of insurance needed *
                <select
                  name="insuranceType"
                  required
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                >
                  <option value="">Select one</option>
                  <option>Homeowners</option>
                  <option>Auto</option>
                  <option>Umbrella</option>
                  <option>Landlord</option>
                  <option>Flood</option>
                  <option>Renters</option>
                  <option>Condo</option>
                  <option>Commercial</option>
                  <option>Professional Liability / E&O</option>
                  <option>Multiple / not sure</option>
                </select>
              </label>
              <label className="text-sm font-semibold">
                Current ZIP code or city *
                <input
                  name="location"
                  required
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                />
              </label>
              <label className="text-sm font-semibold">
                Are you currently buying a home?
                <select
                  name="buyingHome"
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                >
                  <option value="">Select one</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </label>
              <label className="text-sm font-semibold">
                Property address (if applicable)
                <input
                  name="propertyAddress"
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                />
              </label>
              <label className="text-sm font-semibold">
                Expected closing date (if applicable)
                <input
                  type="date"
                  name="closingDate"
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                />
              </label>
              <label className="text-sm font-semibold">
                Are you working with a Spyglass Realty agent?
                <select
                  name="spyglassAgent"
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                >
                  <option value="">Select one</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </label>
              <label className="text-sm font-semibold">
                Agent&apos;s name (if applicable)
                <input
                  name="agentName"
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                />
              </label>
              <fieldset className="text-sm font-semibold">
                <legend className="mb-1">Preferred contact method</legend>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <label className="text-sm">
                    <input type="radio" name="contactMethod" value="phone" /> Phone call
                  </label>
                  <label className="text-sm">
                    <input type="radio" name="contactMethod" value="text" /> Text message
                  </label>
                  <label className="text-sm">
                    <input type="radio" name="contactMethod" value="email" /> Email
                  </label>
                </div>
              </fieldset>
              <label className="text-sm font-semibold">
                Additional details
                <textarea
                  name="details"
                  className="mt-1 w-full border border-spy-border rounded-spy px-3 py-2 font-normal"
                  rows={4}
                />
              </label>
              <button type="submit" className="btn-primary w-full">
                Request My Quote
              </button>
              <p className="text-xs text-spy-muted" style={{ marginTop: '0.75rem' }}>
                By submitting this form, you agree that Spyglass Insurance Agency may contact you at the phone
                number and email address provided, including by call or text message, for information related to
                insurance products and services. Message and data rates may apply. You may opt out of
                communications at any time.
              </p>
            </form>
          </div>

          <div className="max-w-xl mx-auto">
            <h3 className="font-bold mb-2 text-lg">How we follow up</h3>
            <p className="text-sm text-spy-muted mb-3">
              A licensed insurance advisor reviews your information, checks available carrier options, and follows
              up to discuss coverage recommendations in plain language.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-spy-charcoal text-white/85 py-16 px-4">
        <div className="max-w-6xl mx-auto" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
          <div>
            <img
              src="/spyglass-insurance-assets/logo-white.svg"
              alt="Spyglass Insurance Agency, LLC logo"
              className="h-11 mb-3"
            />
            <p>8501 N Mopac Exp, Ste 110<br />Austin, TX 78759</p>
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
          style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.15)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}
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
