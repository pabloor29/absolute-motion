import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "brillez",
  description: "Tout le monde rêve de briller un jour",
  icons: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <Head>
        <title>brillez</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="keywords" content="brillez, communication, photo, photgraphie, agence, com" />
        <meta name="description" content="Tout le monde rêve de briller un jour" />
        <meta property="og:title" content="brillez" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://www.brillez.com/" />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href=""></link>
      </Head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
