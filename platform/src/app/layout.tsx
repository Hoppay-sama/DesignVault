import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DesignVault — 30+ Design Aesthetics. Copy the prompt. Ship the page.",
  description:
    "A curated design inspiration platform with 30+ distinct aesthetics, full design intelligence, and ready-to-use AI prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
