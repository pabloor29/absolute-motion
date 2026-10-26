import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import { getApprovedReviews, getContent } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avis clients",
  description:
    "Découvrez les avis des clients d'Absolute Motion, coaching sportif et personal trainer à Fribourg.",
  alternates: { canonical: "/avis" },
};

export default async function AvisPage() {
  const [content, reviews] = await Promise.all([
    getContent(),
    getApprovedReviews(),
  ]);

  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Avis." img="/img/bg/bg-equilibre.webp" />
      <ReviewsSection title={content.reviews_title} reviews={reviews} />
      <Footer />
    </>
  );
}
