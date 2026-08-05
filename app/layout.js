import './globals.css';

export const metadata = {
  title: 'Spyglass Insurance Agency',
  description:
    'Independent insurance advisors helping Texas homeowners, renters, professionals, and businesses find the right coverage from multiple trusted carriers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-[#171717]">{children}</body>
    </html>
  );
}
