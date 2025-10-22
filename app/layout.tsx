import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CertificateModal from "./components/CertificateModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMA - Société M'saken Aluminium | Fenêtres, Portes et Vérandas en Aluminium",
  description: "Votre partenaire de confiance pour des solutions d'aluminium haut de gamme à M'saken. Spécialiste en fenêtres, portes, vérandas et menuiserie aluminium. Qualité et expertise depuis des années.",
  keywords: ["aluminium", "fenêtres aluminium", "portes aluminium", "vérandas", "M'saken", "Sousse", "Tunisie", "menuiserie aluminium", "SMA"],
  authors: [{ name: "SMA - Société M'saken Aluminium" }],
  openGraph: {
    title: "SMA - Société M'saken Aluminium",
    description: "Votre partenaire de confiance pour des solutions d'aluminium haut de gamme.",
    type: "website",
    locale: "fr_TN",
    siteName: "SMA Aluminium",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "SMA - Société M'saken Aluminium Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMA - Société M'saken Aluminium",
    description: "Votre partenaire de confiance pour des solutions d'aluminium haut de gamme.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CertificateModal />
        {children}
      </body>
    </html>
  );
}
