import Footer from "../../components/Footer";
import HeroBanner from "../../components/HeroBanner";
import Navbar from "../../components/Navbar";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* <Navbar /> */}
      <HeroBanner />
      <Footer />
      <Analytics />
    </main>
  );
}
