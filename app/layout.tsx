import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import {
  SITE_URL,
  SITE_NAME,
  SITE_KEYWORDS,
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
} from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Absolute Motion | Personal Trainer & Small Group Trainer à Fribourg",
    template: "%s | Absolute Motion",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Arnaud — Absolute Motion" }],
  creator: "Absolute Motion",
  publisher: "Absolute Motion",
  applicationName: SITE_NAME,
  category: "fitness",
  icons: {
    icon: "/img/logo/logo.webp",
    shortcut: "/img/logo/logo.webp",
    apple: "/img/logo/logo.webp",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Absolute Motion | Personal Trainer à Fribourg",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Absolute Motion — coaching sportif à Fribourg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Absolute Motion | Personal Trainer à Fribourg",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Structured data (JSON-LD) — boosts rich results without touching visible content.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "HealthAndBeautyBusiness", "SportsActivityLocation"],
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}${OG_IMAGE}`,
      logo: `${SITE_URL}/img/logo/logo.webp`,
      email: "absolute.motion@icloud.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Fribourg",
        addressCountry: "CH",
      },
      areaServed: "Fribourg, Suisse",
      sameAs: ["https://www.instagram.com/absolutemotionx/"],
      founder: {
        "@type": "Person",
        name: "Arnaud",
        jobTitle: "Personal Trainer & Small Group Trainer",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fr-CH",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
