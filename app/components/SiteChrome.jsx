import Link from "next/link";
import { BUSINESS } from "../lib/site";

const FOOTER_COVERAGE = [
  { label: "Homeowners", href: "/homeowners-insurance" },
  { label: "Auto", href: "/#coverage" },
  { label: "Umbrella", href: "/#coverage" },
  { label: "Landlord", href: "/#coverage" },
  { label: "Flood", href: "/flood-insurance" },
  { label: "Renters", href: "/#coverage" },
];

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
            loading="lazy"
          />
          <div className="agency">Agency</div>
          <address>
            {BUSINESS.street}
            <br />
            {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}
            <br />
            <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
          </address>
        </div>
        <div>
          <h4>Coverage</h4>
          <ul>
            {FOOTER_COVERAGE.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li>
              <a href={BUSINESS.sisterBrandUrl} target="_blank" rel="noreferrer">
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
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            <li>
              <Link href="/#quote">Get a quote</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/terms-of-use">Terms of use</Link>
            </li>
            <li>
              <Link href="/accessibility">Accessibility</Link>
            </li>
            <li>
              <Link href="/insurance-disclosures">Insurance disclosures</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="si-footer-legal">
        © {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.{" "}
        {BUSINESS.licenseLine}. Educational content only — not a binder of coverage. No coverage or
        savings are guaranteed; all policies are subject to underwriting and eligibility.
      </div>
    </footer>
  );
}
