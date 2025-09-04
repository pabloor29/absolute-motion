import React from "react";

const imagesFormations = [
  "/img/logo/EduQua_Logo.png",
  "/img/logo/Logo_Qualitop.webp",
  "/img/logo/logo-ereps-sfondo-bianco.png",
  "/img/logo/PT_coaching_academy_logo_eduqua_black.png",
  "/img/logo/swiss-active-logo.png",
  "/img/logo/logo-SRC-removebg-preview.png",
  "/img/logo/logo-spetial-olympics.png"
];

export default function ImageCarousel() {
  return (
    <div className="w-full overflow-hidden py-4 bg-clearColor">
      <div className="flex w-max animate-scroll">
        {/* On duplique la liste pour obtenir un défilement continu */}
        {[...imagesFormations, ...imagesFormations].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`img-${i}`}
            className="h-12 md:h-20 w-auto mx-10 md:mx-20"
          />
        ))}
      </div>
    </div>
  );
}
