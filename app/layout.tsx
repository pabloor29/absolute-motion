import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "absolute motion",
  description: "Personal Trainer",
  icons: "/img/logo/LOGO-brillez.png",
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
        <meta name="keywords" content="Personal Trainer, Trainer, SmallGroup Trainer, SmallGroup, Équilibre, Force, Endurance " />
        <meta name="description" content="Personal Trainer" />
        <meta property="og:title" content="absolute motion" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="https://www.absolute-motion.fr/" />
        <meta charSet="utf-8"></meta>
        <link rel="icon" href="/img/logo/logo-rbg.png"></link>
      </Head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
