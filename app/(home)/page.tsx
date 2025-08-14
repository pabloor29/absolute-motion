import IntroBrillez from "@/components/IntroBrillez";
import Footer from "../../components/Footer";
import HeroBanner from "../../components/HeroBanner";
import Navbar from "../../components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import HistoryBrillez from "@/components/HistoryBrillez";

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-clearColor">
      <Navbar />
      <HeroBanner />
      <IntroBrillez />
      <HistoryBrillez />
      <Footer />
      <Analytics />
    </main>
  );
}
