import { BUSINESS, SITE_URL } from "./site";

const AGENCY_ID = `${SITE_URL}/#agency`;

// Sitewide InsuranceAgency entity (rendered in the root layout).
export function agencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": AGENCY_ID,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/spyglass-insurance-assets/logo-dark.svg`,
    image: `${SITE_URL}/og-image.png`,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: { "@type": "State", name: "Texas" },
    identifier: [
      { "@type": "PropertyValue", propertyID: "TDI General Lines Agency License", value: BUSINESS.tdiLicense },
      { "@type": "PropertyValue", propertyID: "NPN", value: BUSINESS.npn },
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Texas General Lines Agency License",
      identifier: BUSINESS.tdiLicense,
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "Texas Department of Insurance",
        url: "https://www.tdi.texas.gov",
      },
    },
  };
}

export function articleSchema(article) {
  const url = `${SITE_URL}/learning/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.dek,
    image: [article.img],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: { "@type": "Organization", name: article.author || BUSINESS.name, url: SITE_URL },
    publisher: { "@id": AGENCY_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

// Only use where the same Q&A is visibly rendered on the page.
export function faqPageSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path === "/" ? "" : it.path}`,
    })),
  };
}
