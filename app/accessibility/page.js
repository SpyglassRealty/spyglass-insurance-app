/*
 * DRAFT — NEEDS REVIEW BY RYAN RODENBECK OR COUNSEL BEFORE RELIANCE.
 * Conservative accessibility statement. Makes no claim of full WCAG conformance.
 */
import LegalPage from "../components/LegalPage";
import { BUSINESS, pageMetadata } from "../lib/site";

export const metadata = pageMetadata({
  title: "Accessibility",
  description: `${BUSINESS.name} accessibility statement and how to request assistance.`,
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" updated="September 2026">
      <section className="si-article-block">
        <p>
          {BUSINESS.legalName} wants everyone to be able to use this website. We aim to follow
          recognized guidelines such as the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
          and continue to review and improve the site.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Need help or found a problem?</h2>
        <p>
          If you have trouble using any part of this site, or need information in a different
          format, please contact us and we will work with you to provide the information or service
          you need.
        </p>
        <ul>
          <li>
            Phone: <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
          </li>
          <li>
            Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </li>
          <li>
            Mail: {BUSINESS.street}, {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}
          </li>
        </ul>
        <p>Please describe the page and the issue so we can address it.</p>
      </section>
    </LegalPage>
  );
}
