import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import FormuleCard from "@/components/FormuleCard";
import Navbar from "@/components/Navbar";
import React from "react";

function Tarifs() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Tarifs" img="/img/bg/bg-force.webp" />
      
      <div className="bg-mainColor flex flex-col justify-center items-center w-screen py-20 gap-10">

        <div className="flex flex-col md:flex-row justify-center items-center w-full">
          <FormuleCard
            name="formule personalisable"
            price="de 70.- à 150.- CHF"
            description="Une formule personalisable en fonction de vos besoins."
            items={[
              "Méthode de coaching", 
              "Volume d'entrainement", 
              "Services aditionnels"
            ]}
          />
        </div>

        <div className="w-3/4 flex flex-col justify-center items-center">
          <article className="text-center font-rajdhaniRegular text-clearColor text-xl">
            Les formules sont 100% personalisables en fonctions des services proposés, du volume d'entrainement, du niveau souhaité...
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