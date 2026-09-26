import ServicePage from "../components/ServicePage";
import { pageMetadata } from "../lib/site";
import { faqPageSchema, breadcrumbSchema } from "../lib/schema";

const TITLE = "Flood Insurance in Austin and Central Texas";
const DESCRIPTION =
  "How flood insurance works in Texas: why homeowners policies generally exclude flood, NFIP vs. private flood options, waiting periods, and when lenders require coverage.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/flood-insurance" });

const SECTIONS = [
  {
    h: "Homeowners policies generally exclude flood",
    p: [
      "Damage from rising water — flash flooding, overflowing creeks, storm runoff — is generally not covered by a standard homeowners or renters policy. Flood insurance is a separate policy.",
      "Central Texas is prone to intense rainfall and flash flooding, and flooding can affect properties outside FEMA's high-risk flood zones.",
    ],
  },
  {
    h: "Where flood coverage comes from",
    list: [
      "National Flood Insurance Program (NFIP) — federally backed policies sold through licensed agents",
      "Private flood insurance — offered by private carriers, with terms, limits and eligibility that can differ from NFIP",
    ],
    p: [
      "Building coverage and contents coverage are usually chosen separately. Basements, detached structures and certain belongings have specific rules, so it's worth comparing forms rather than assuming all flood quotes are alike.",
    ],
  },
  {
    h: "Waiting periods",
    p: [
      "NFIP policies generally have a 30-day waiting period before coverage begins, with limited exceptions — for example, when coverage is purchased in connection with making, increasing or renewing a mortgage loan. Private policies set their own waiting periods. Buying before storm season matters.",
    ],
  },
  {
    h: "When lenders require it",
    p: [
      "If a home with a federally backed mortgage is in a FEMA Special Flood Hazard Area, the lender will generally require flood insurance. Outside those areas, coverage is usually optional.",
    ],
  },
  {
    h: "How we help",
    p: [
      "We help you understand whether flood coverage is required or optional for your property, compare available NFIP and private options, and explain the differences in plain English. If you're buying, ask about the flood zone and any elevation certificate early in your option period.",
    ],
  },
];

const FAQS = [
  {
    q: "Do I need flood insurance if I'm not in a high-risk flood zone?",
    a: "It's usually optional outside FEMA high-risk zones, but flooding can happen outside mapped areas, and homeowners policies generally exclude flood. Many owners choose to price coverage anyway.",
  },
  {
    q: "How long does it take for flood insurance to start?",
    a: "NFIP policies generally have a 30-day waiting period, with limited exceptions such as coverage tied to a new mortgage. Private flood policies may have different waiting periods.",
  },
  {
    q: "Does flood insurance cover my belongings?",
    a: "Only if you have contents coverage. Building and contents coverage are typically selected separately, and renters can buy contents-only coverage.",
  },
];

export default function FloodInsurancePage() {
  return (
    <ServicePage
      eyebrow="Flood insurance"
      title={TITLE}
      lead="Standard homeowners policies generally exclude flood. Here's how flood coverage works in Texas and how to decide whether it makes sense for your property."
      sections={SECTIONS}
      faqs={FAQS}
      schema={[
        faqPageSchema(FAQS),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Flood insurance", path: "/flood-insurance" },
        ]),
      ]}
    />
  );
}
