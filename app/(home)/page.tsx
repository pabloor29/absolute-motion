import IntroBrillez from "@/components/IntroBrillez";
import Footer from "../../components/Footer";
import HeroBanner from "../../components/HeroBanner";
import Navbar from "../../components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import IntroBrillezProjects from "@/components/IntroProjects";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <HeroBanner />
      <IntroBrillez />
      <IntroBrillezProjects />
      {/* <Footer /> */}
      <Analytics />
    </main>
  );
}
