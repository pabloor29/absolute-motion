import ContactForm from "@/components/ContactForm";
import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Contact — Réservez votre séance de coaching",
  description:
    "Contactez Arnaud d'Absolute Motion à Fribourg pour établir votre plan d'entraînement sur mesure et réserver votre première séance de coaching personnel ou en petit groupe.",
  keywords: [
    "contact coach sportif Fribourg",
    "réserver séance personal trainer",
    "coaching Fribourg Suisse",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Absolute Motion",
    description:
      "Contactez Absolute Motion à Fribourg pour votre coaching sur mesure.",
    url: "/contact",
  },
};

function ReservationPage() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Contact." img="/img/bg/bg-endurance.webp" />
      <ContactForm />
      <Footer />
    </>
  );
}

export default ReservationPage;
