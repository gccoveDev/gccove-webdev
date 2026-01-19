import "./globals.css";
import { Inter } from "next/font/google"; // Import the font loader

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "COVE • CREW | Professional Web Development",
  description: "Custom websites, mobile apps, and branding. Infrastructure experts available for hire.",
  openGraph: {
    title: "COVE • CREW | Professional Web Development",
    description: "Custom websites, mobile apps, and branding. Infrastructure experts available for hire.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
