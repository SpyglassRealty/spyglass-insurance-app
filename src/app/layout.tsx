import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spyglass Insurance",
  description: "Property & casualty, professional liability, renters, and supplemental coverage — Austin, TX",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
