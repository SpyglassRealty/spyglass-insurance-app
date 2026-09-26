import "./globals.css";
import { Archivo } from "next/font/google";
import { OG_IMAGE, SITE_URL } from "./lib/site";
import { agencySchema } from "./lib/schema";
import JsonLd from "./components/JsonLd";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-archivo",
});

const DEFAULT_DESCRIPTION =
  "Independent Texas insurance agency in Austin. We shop multiple carriers, explain the fine print in plain English, and stay with you long after the policy is bound.";

// Canonicals are set per page (alternates.canonical) and resolve against
// metadataBase, so every page points at the apex host.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Spyglass Insurance Agency",
    template: "%s | Spyglass Insurance Agency",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Spyglass Insurance Agency",
  openGraph: {
    type: "website",
    siteName: "Spyglass Insurance Agency",
    locale: "en_US",
    title: "Spyglass Insurance Agency",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spyglass Insurance Agency",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className={archivo.className}>
        <JsonLd data={agencySchema()} />
        {children}
      </body>
    </html>
  );
}
