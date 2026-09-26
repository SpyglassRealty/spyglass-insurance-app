// Single source of truth for business facts used across the site
// (footer, schema.org JSON-LD, sitemap, llms.txt, metadata).
export const SITE_URL = "https://spyglassinsurance.com";

export const BUSINESS = {
  legalName: "Spyglass Insurance Agency, LLC",
  name: "Spyglass Insurance Agency",
  phoneDisplay: "(512) 598-9701",
  phoneE164: "+15125989701",
  email: "insurance@spyglassinsurance.com",
  street: "8501 N Mopac Expy STE 110",
  city: "Austin",
  region: "TX",
  postalCode: "78759",
  country: "US",
  licenseLine:
    "Texas Department of Insurance General Lines Agency License #3532029 · NPN 22307568",
  tdiLicense: "3532029",
  npn: "22307568",
  sisterBrandUrl: "https://www.spyglassrealty.com/",
};

// Default social share image (1200x630, generated from the existing logo).
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Spyglass Insurance Agency — independent Texas insurance agency in Austin",
};

// Next.js merges metadata shallowly, so a page that sets openGraph/twitter
// must repeat the image. Use this helper for page-level metadata.
export function pageMetadata({ title, description, path, type = "website", image, extraOpenGraph }) {
  const images = [image || OG_IMAGE];
  const socialTitle = `${title} | Spyglass Insurance Agency`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: "Spyglass Insurance Agency",
      locale: "en_US",
      url: path,
      title: socialTitle,
      description,
      images,
      ...(extraOpenGraph || {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: images.map((i) => (typeof i === "string" ? i : i.url)),
    },
  };
}
