import React from "react";

// Logos d'accréditation avec un texte alternatif réel (important pour
// l'accessibilité et Google Images — l'audit signalait des alt="img-0").
const imagesFormations = [
  { src: "/img/logo/EduQua_Logo.png", alt: "Certification EduQua" },
  { src: "/img/logo/Logo_Qualitop.webp", alt: "Certification Qualitop" },
  {
    src: "/img/logo/logo-ereps-sfondo-bianco.png",
    alt: "EREPS — European Register of Exercise Professionals",
  },
  {
    src: "/img/logo/PT_coaching_academy_logo_eduqua_black.png",
    alt: "PT Coaching Academy — certifié EduQua",
  },
  { src: "/img/logo/swiss-active-logo.png", alt: "Swiss Active" },
  { src: "/img/logo/logo-SRC-removebg-preview.png", alt: "Certification SRC" },
  { src: "/img/logo/logo-spetial-olympics.png", alt: "Special Olympics" },
];

export default function ImageCarousel() {
  return (
    <div className="w-full overflow-hidden py-4 bg-clearColor">
      <div className="flex w-max animate-scroll">
        {/* Jeu principal — lisible par les lecteurs d'écran et indexé */}
        {imagesFormations.map((logo, i) => (
          <img
            key={`logo-${i}`}
            src={logo.src}
            alt={logo.alt}
            className="h-12 md:h-20 w-auto mx-10 md:mx-20"
          />
        ))}
        {/* Copie dupliquée pour le défilement continu — masquée aux lecteurs
            d'écran et non indexée (aria-hidden) */}
        {imagesFormations.map((logo, i) => (
          <img
            key={`logo-copy-${i}`}
            src={logo.src}
            alt=""
            aria-hidden="true"
            className="h-12 md:h-20 w-auto mx-10 md:mx-20"
          />
        ))}
      </div>
    </div>
  );
}
