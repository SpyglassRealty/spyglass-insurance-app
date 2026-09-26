/*
 * DRAFT — NEEDS REVIEW BY RYAN RODENBECK OR COUNSEL BEFORE RELIANCE.
 * Plain, conservative placeholder written to describe what this website
 * actually does today (form -> email/SMS notification). It has not been
 * reviewed by an attorney. Update if data practices, vendors or analytics change.
 */
import LegalPage from "../components/LegalPage";
import { BUSINESS, pageMetadata } from "../lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${BUSINESS.legalName} collects and uses information submitted through this website.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <section className="si-article-block">
        <p>
          This policy explains how {BUSINESS.legalName} (&quot;Spyglass Insurance,&quot;
          &quot;we,&quot; &quot;us&quot;) handles information collected through
          spyglassinsurance.com.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Information we collect</h2>
        <p>When you request a quote or contact us, we collect the information you choose to provide, such as:</p>
        <ul>
          <li>Name, email address and phone number</li>
          <li>ZIP code or city</li>
          <li>The type of insurance you are interested in and any message you include</li>
        </ul>
        <p>
          Like most websites, our hosting provider may also automatically log basic technical
          information (for example, IP address, browser type and pages requested) for security and
          operations.
        </p>
      </section>
      <section className="si-article-block">
        <h2>How we use it</h2>
        <ul>
          <li>To respond to your request and contact you about insurance products and services</li>
          <li>To prepare quotes and communicate with insurance carriers on your behalf, when you ask us to</li>
          <li>To operate, secure and improve this website</li>
          <li>To comply with legal and regulatory obligations</li>
        </ul>
      </section>
      <section className="si-article-block">
        <h2>Calls, texts and email</h2>
        <p>
          If you submit a form, you agree we may contact you by call, text message or email at the
          contact information you provide about insurance products and services. Message and data
          rates may apply. You can opt out of text messages at any time by replying STOP, or ask us
          to stop contacting you by emailing <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
        </p>
      </section>
      <section className="si-article-block">
        <h2>How information is shared</h2>
        <p>
          We do not sell your personal information. We share it only as needed to serve you, for
          example with insurance carriers when you ask us to obtain a quote, with service providers
          that help us run this website and deliver email and text messages, or when required by
          law. If you become a client, you may receive additional privacy notices from us or from
          the carriers that issue your policy.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Third-party content</h2>
        <p>
          Some images on this site are loaded from third-party image services, and this site links
          to other websites (including our sister company, Spyglass Realty). Those services have
          their own privacy practices.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Security and retention</h2>
        <p>
          We use reasonable measures to protect information, but no method of transmission or
          storage is completely secure. We keep information only as long as needed for the purposes
          above or as required by law.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Children</h2>
        <p>This website is not directed to children under 13, and we do not knowingly collect their information.</p>
      </section>
      <section className="si-article-block">
        <h2>Contact us</h2>
        <p>
          Questions or requests about your information: {BUSINESS.legalName}, {BUSINESS.street},{" "}
          {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode} ·{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> ·{" "}
          <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
        </p>
        <p>We may update this policy from time to time; the date above shows the latest version.</p>
      </section>
    </LegalPage>
  );
}
