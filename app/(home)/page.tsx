import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import ImageCarousel from "@/components/ImageCarousel";
import IntroAbsoluteMotion from "@/components/IntroAbsoluteMotion";
import JoinMethod from "@/components/JoinMethod";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-clearColor">
      <Navbar />
      <HeroBanner />
      <ImageCarousel />
      <IntroAbsoluteMotion />
      {/* <JoinMethod /> */}
      <Footer />
      <Analytics />
    </main>
  );
}
