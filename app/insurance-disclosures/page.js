/*
 * DRAFT — NEEDS REVIEW BY RYAN RODENBECK OR COUNSEL BEFORE RELIANCE.
 * License numbers below were supplied by the agency owner; confirm against TDI records.
 */
import LegalPage from "../components/LegalPage";
import { BUSINESS, pageMetadata } from "../lib/site";

export const metadata = pageMetadata({
  title: "Insurance Disclosures",
  description: `Licensing and insurance disclosures for ${BUSINESS.legalName}.`,
  path: "/insurance-disclosures",
});

export default function InsuranceDisclosuresPage() {
  return (
    <LegalPage title="Insurance Disclosures" updated="September 2026">
      <section className="si-article-block">
        <h2>Licensing</h2>
        <p>
          {BUSINESS.legalName} is licensed by the Texas Department of Insurance as a General Lines
          agency. License #{BUSINESS.tdiLicense} · National Producer Number (NPN) {BUSINESS.npn}.
        </p>
        <p>
          Office: {BUSINESS.street}, {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}
        </p>
      </section>
      <section className="si-article-block">
        <h2>Independent agency and compensation</h2>
        <p>
          We are an independent insurance agency. We may place coverage with a number of insurance
          carriers, and we are typically compensated by the carrier through commissions, which may
          vary by carrier and product. You may ask us about compensation at any time.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Coverage and quotes</h2>
        <p>
          Information on this website is general and educational and does not change the terms of
          any policy. Quotes are estimates based on the information provided and are not a guarantee
          of coverage or price. Coverage is not in effect until bound or issued by a carrier, and
          all policies are subject to eligibility, underwriting and the policy&apos;s terms,
          conditions and exclusions. Not every carrier or product is available for every property
          or person.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Affiliated business</h2>
        <p>
          Spyglass Insurance Agency is affiliated with Spyglass Realty. You are not required to use
          Spyglass Insurance Agency to buy or sell a home with Spyglass Realty, and you are free to
          choose any insurance agent or carrier.
        </p>
      </section>
      <section className="si-article-block">
        <h2>Texas Department of Insurance</h2>
        <p>
          For information about insurance, or to verify a license or file a complaint, you can
          contact the Texas Department of Insurance at 1-800-252-3439 or visit{" "}
          <a href="https://www.tdi.texas.gov" target="_blank" rel="noreferrer">
            www.tdi.texas.gov
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
