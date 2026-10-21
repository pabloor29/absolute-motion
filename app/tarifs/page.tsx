import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import FormuleCard from "@/components/FormuleCard";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tarifs — Formules de coaching personnalisables",
  description:
    "Des formules de coaching 100% personnalisables de 70.- à 150.- CHF, adaptées à vos objectifs, votre niveau et votre volume d'entraînement. Contactez Absolute Motion à Fribourg.",
  keywords: [
    "tarifs coach sportif Fribourg",
    "prix personal trainer Suisse",
    "formule coaching personnalisable",
  ],
  alternates: { canonical: "/tarifs" },
  openGraph: {
    title: "Tarifs — Absolute Motion",
    description:
      "Formules de coaching personnalisables de 70.- à 150.- CHF à Fribourg.",
    url: "/tarifs",
  },
};

function Tarifs() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Tarifs." img="/img/bg/bg-force.webp" />
      
      <div className="bg-mainColor flex flex-col justify-center items-center w-screen py-20 gap-10">

        <div className="flex flex-col md:flex-row justify-center items-center w-full">
          <FormuleCard
            name="formule personnalisable"
            price="de 70.- à 150.- CHF"
            description="Une formule personnalisable en fonction de vos besoins."
            items={[
              "Méthode de coaching", 
              "Volume d'entrainement", 
              "Services aditionnels"
            ]}
          />
        </div>

        <div className="w-3/4 flex flex-col justify-center items-center">
          <article className="text-center font-rajdhaniRegular text-clearColor text-xl">
            Les formules sont 100% personnalisables en fonction des services proposés, du volume d'entrainement, du niveau souhaité...
            <br />
            Pour établir un plan optimal et choisir une formule adaptée, contactez-moi !
          </article>

          <div className="bg-darkColor rounded-2xl py-3 px-6 text-xl font-calSans text-clearColor hover:bg-mainColor duration-100 cursor-pointer hover:border-2 border-darkColor hover:text-darkColor text-center mt-5 w-min whitespace-nowrap">
            <a href="/contact">contactez moi !</a>
          </div> 
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Tarifs;