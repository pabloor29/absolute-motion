import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import ImageCarousel from "@/components/ImageCarousel";
import IntroAbsoluteMotion from "@/components/IntroAbsoluteMotion";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import { getApprovedReviews, getContent } from "@/lib/data";
import { Analytics } from "@vercel/analytics/react";

export default async function Home() {
  const [content, reviews] = await Promise.all([
    getContent(),
    getApprovedReviews(6),
  ]);

  return (
    <main className="flex flex-col items-center bg-clearColor">
      <Navbar />
      <HeroBanner subtitle={content.hero_subtitle} location={content.hero_location} />
      <ImageCarousel />
      <IntroAbsoluteMotion
        whoTitle={content.home_who_title}
        whoText={content.home_who_text}
        missionTitle={content.home_mission_title}
        missionText={content.home_mission_text}
      />
      <ReviewsSection title={content.reviews_title} reviews={reviews} showAllLink />
      <Footer />
      <Analytics />
    </main>
  );
}
