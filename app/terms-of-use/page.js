/*
 * DRAFT — NEEDS REVIEW BY RYAN RODENBECK OR COUNSEL BEFORE RELIANCE.
 * Plain, conservative placeholder terms. Not reviewed by an attorney.
 */
import LegalPage from "../components/LegalPage";
import { BUSINESS } from "../lib/site";

export const metadata = {
  title: "Terms of Use",
  description: `Terms that apply to use of the ${BUSINESS.name} website.`,
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <LegalPage title="Terms of Use" updated="September 2026">
      <section className="si-article-block">
        <p>
          By using spyglassinsurance.com, you agree to these terms. If you do not agree, please do
          not use the site.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Educational information only</h2>
        <p>
          Content on this site is general and educational. It is not legal, tax or financial advice,
          and it is not an offer, quote or binder of insurance. Coverage descriptions are summaries,
          not policy language; the actual policy controls.
        </p>
      </section>
      <section className="si-article-block">
        <h2>No coverage until bound</h2>
        <p>
          Submitting a form or speaking with us does not create coverage. Coverage begins only when
          a policy is bound or issued by an insurance carrier. All coverage is subject to carrier
          eligibility, underwriting and approval, and pricing and availability can change.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Accurate information</h2>
        <p>
          Please provide accurate and complete information. Quotes and coverage decisions depend on
          the information you give us and the carriers.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Acceptable use</h2>
        <p>
          Do not misuse the site, including by submitting false information, attempting to disrupt
          or gain unauthorized access to the site, or using automated tools to collect content.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Intellectual property</h2>
        <p>
          The Spyglass name, logos and site content belong to {BUSINESS.legalName} or its affiliates
          or licensors and may not be used without permission.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Links to other sites</h2>
        <p>We are not responsible for the content or practices of websites we link to.</p>
      </section>
      <section className="si-article-block">
        <h2>Disclaimer and limitation of liability</h2>
        <p>
          The site is provided &quot;as is.&quot; To the extent permitted by law, we disclaim
          warranties about the site and are not liable for damages arising from its use.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Governing law and changes</h2>
        <p>
          These terms are governed by the laws of the State of Texas. We may update these terms from
          time to time; the date above shows the latest version.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Contact</h2>
        <p>
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> ·{" "}
          <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
        </p>
      </section>
    </LegalPage>
  );
}
