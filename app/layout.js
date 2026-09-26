import "./globals.css";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata = {
  title: "Spyglass Insurance Agency",
  description:
    "Independent Texas insurance agency. We shop multiple carriers, explain the fine print in plain English, and stay with you long after the policy is bound.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body className={archivo.className}>{children}</body>
    </html>
  );
}
