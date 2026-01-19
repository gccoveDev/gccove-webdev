import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Define the Geist Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Your Custom Metadata (Keeps the Telegram Preview working)
export const metadata: Metadata = {
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Apply the Geist font variables to the body */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
