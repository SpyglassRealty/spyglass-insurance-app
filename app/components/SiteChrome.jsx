import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="si-header">
      <div className="si-header-inner">
        <Link href="/#top" className="si-logo-lockup" aria-label="Spyglass Insurance Agency">
          <img
            src="/spyglass-insurance-assets/logo-white.svg"
            alt="Spyglass Insurance"
            height={54}
            className="si-logo-mark"
          />
          <span className="si-logo-agency">Agency</span>
        </Link>
        <nav className="si-nav" aria-label="Main">
          <Link href="/#coverage">Coverage</Link>
          <Link href="/#why">Why independent</Link>
          <Link href="/#spyglass">Our standard</Link>
          <Link href="/learning">Blog</Link>
        </nav>
        <div className="si-header-right">
          <a href="tel:+15125989701" className="si-header-phone">
            (512) 598-9701
          </a>
          <Link href="/#quote" className="si-btn si-btn-nav">
            Get my quote
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="si-footer">
      <div className="si-footer-grid">
        <div className="si-footer-brand">
          <img
            src="/spyglass-insurance-assets/logo-white.svg"
            alt="Spyglass Insurance Agency, LLC"
          />
          <div className="agency">Agency</div>
          <address>
            8501 N Mopac Expy STE 110
            <br />
            Austin, TX 78759
            <br />
            <a href="tel:+15125989701">(512) 598-9701</a>
          </address>
        </div>
        <div>
          <h4>Coverage</h4>
          <ul>
            {["Homeowners", "Auto", "Umbrella", "Landlord", "Flood", "Renters"].map((item) => (
              <li key={item}>
                <Link href="/#coverage">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li>
              <a href="https://www.spyglassrealty.com/" target="_blank" rel="noreferrer">
                Spyglass Realty
              </a>
            </li>
            <li>
              <Link href="/learning">Blog</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact &amp; legal</h4>
          <ul>
            <li>
              <a href="mailto:insurance@spyglassinsurance.com">insurance@spyglassinsurance.com</a>
            </li>
            <li>
              <Link href="/#quote">Get a quote</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="si-footer-legal">
        © 2026 Spyglass Insurance Agency, LLC. All rights reserved. Educational content only — not a
        binder of coverage. Policies are subject to underwriting and eligibility.
      </div>
    </footer>
  );
}
