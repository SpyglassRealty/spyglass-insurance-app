import ServicePage from "../components/ServicePage";
import { pageMetadata } from "../lib/site";
import { faqPageSchema, breadcrumbSchema } from "../lib/schema";

const TITLE = "Homeowners Insurance in Austin, Texas";
const DESCRIPTION =
  "What Texas homeowners insurance typically covers, the fine print to read closely, and how an independent Austin agency compares options from multiple carriers.";

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/homeowners-insurance" });

const SECTIONS = [
  {
    h: "What a homeowners policy typically covers",
    p: [
      "Homeowners insurance is designed to help pay to repair or rebuild your home and replace your belongings after a covered loss, and to protect you if someone is hurt on your property or you accidentally damage someone else's property. Exact coverage depends on the policy form and carrier.",
    ],
    list: [
      "Dwelling — the structure of your home",
      "Other structures — detached garages, fences, sheds",
      "Personal property — furniture, clothing, electronics and other belongings",
      "Loss of use — additional living expenses if a covered loss makes the home unlivable",
      "Personal liability — claims for injuries or property damage you're legally responsible for",
      "Medical payments to others — certain minor injuries to guests, regardless of fault",
    ],
  },
  {
    h: "Texas fine print worth reading closely",
    p: [
      "Wind and hail deductibles are often a percentage of your dwelling coverage rather than a flat dollar amount, so the amount you'd pay out of pocket after a hailstorm can be larger than your standard deductible.",
      "Some policies pay roof claims on a depreciated or scheduled basis depending on the roof's age or material, and some limit cosmetic damage. Water backup from drains or sewers is often excluded unless you add an endorsement.",
      "Flood is generally excluded from homeowners policies. If rising water is a concern, flood coverage is purchased separately.",
    ],
  },
  {
    h: "Replacement cost vs. actual cash value",
    p: [
      "Replacement cost coverage is designed to pay what it costs to repair or replace damaged property with similar materials, while actual cash value subtracts depreciation. Your dwelling limit should reflect the estimated cost to rebuild — not the purchase price or market value, which include land.",
    ],
  },
  {
    h: "How we help",
    p: [
      "As an independent agency, we compare available options across multiple carriers — coverage, deductibles, endorsements and price together — and walk you through the differences before you choose. We also re-review coverage at renewal.",
      "Buying a home? Start quotes early. Your lender will need proof of coverage before closing, and starting during your option period leaves time to address roof, claims-history or eligibility questions.",
    ],
  },
];

const FAQS = [
  {
    q: "Is homeowners insurance required in Texas?",
    a: "Texas law does not require homeowners insurance, but mortgage lenders almost always require it as a condition of the loan, typically with the lender listed as mortgagee.",
  },
  {
    q: "Does homeowners insurance cover flood damage?",
    a: "Generally no. Standard homeowners policies exclude flood. Flood coverage is available separately through the National Flood Insurance Program or private flood insurers.",
  },
  {
    q: "What information do I need for a quote?",
    a: "The property address, year built, approximate square footage, roof age and material if known, any recent updates, prior claims, and your target effective or closing date.",
  },
  {
    q: "How much dwelling coverage do I need?",
    a: "Dwelling coverage should reflect the estimated cost to rebuild the home, which can differ from the purchase price. A licensed advisor can walk you through a replacement cost estimate.",
  },
];

export default function HomeownersInsurancePage() {
  return (
    <ServicePage
      eyebrow="Homeowners insurance"
      title={TITLE}
      lead="Your home is the biggest thing you own. Here's what a Texas homeowners policy typically covers, what to read closely, and how we help you compare options."
      sections={SECTIONS}
      faqs={FAQS}
      schema={[
        faqPageSchema(FAQS),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Homeowners insurance", path: "/homeowners-insurance" },
        ]),
      ]}
    />
  );
}
