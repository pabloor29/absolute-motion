"use client";

import React, { useEffect, useState } from "react";

// Fond conservé : les images qui défilent en arrière-plan.
const bgTheme = [
  "/img/bg/bg-equilibre.webp",
  "/img/bg/bg-force.webp",
  "/img/bg/bg-endurance.webp",
];

// Mots synchronisés avec chaque image de fond (même ordre que bgTheme).
const words = ["Équilibre", "Force", "Endurance"];

const chips = [
  { label: "Certifié Qualitop", accent: true },
  { label: "Membre EREPS", accent: false },
  { label: "Membre Swiss Active", accent: false },
  { label: "📍 Fribourg & région", accent: false },
];

function HeroBanner() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((index) => (index + 1) % bgTheme.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-darkColor">
      {/* Fond : images qui défilent — couvre tout l'écran sans déformation */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={bgTheme[currentBgIndex]}
        alt=""
        aria-hidden="true"
      />
      {/* Voile sombre pour la lisibilité du texte */}
      <div
        className="absolute inset-0 bg-darkColor/55"
        aria-hidden="true"
      />

      {/* Mot central qui défile avec les images */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pb-72 md:pb-0 pointer-events-none">
        <span
          key={currentBgIndex}
          className="hero-word font-leagueSpartan font-bold text-7xl md:text-[10rem] text-clearColor uppercase tracking-tight leading-none text-center drop-shadow-xl"
        >
          {words[currentBgIndex]}
        </span>
      </div>

      {/* Dégradé bas pour la lisibilité des infos */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-darkColor to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Infos en bas */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="max-w-5xl mx-auto px-6 pb-10 md:pb-14">
          <p className="font-rajdhaniRegular text-sm font-bold uppercase tracking-widest text-[#7c89ff] mb-2">
            Personal Trainer · Fribourg, Suisse 🇨🇭
          </p>
          <h1 className="font-leagueSpartan font-bold text-3xl md:text-4xl text-clearColor uppercase leading-none">
            Arnaud
          </h1>
          <p className="font-rajdhaniRegular uppercase tracking-widest text-clearColor/70 text-sm md:text-base mt-1.5 mb-4">
            Personal Trainer
          </p>
          <p className="font-rajdhaniRegular text-clearColor text-base max-w-lg leading-relaxed mb-5 font-bold">
            De l'équipe de France de Rugby à XIII au cockpit d'un hélicoptère, puis au coaching sportif, un fil conducteur :{" "}
            <strong className="text-clearColor font-bold">
              le dépassement de soi vers l'équilibre.
            </strong>
            <br/>
            Aujourd'hui, je mets ce parcours d'exigence au service de votre réussite.
          </p>
          <div className="flex flex-wrap items-center gap-3 font-extrabol">
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c.label}
                  className={`font-rajdhaniRegular text-sm rounded-full px-3 py-1 border ${
                    c.accent
                      ? "border-[#5b6bff]/50 text-[#7c89ff]"
                      : "border-clearColor/20 text-clearColor/75"
                  }`}
                >
                  {c.label}
                </span>
              ))}
            </div>
            <a
              href="/contact"
              className="bg-gradient-to-br from-darkColor to-mainColor text-clearColor rounded-xl py-2.5 px-5 font-calSans hover:opacity-90 duration-150"
            >
              Réserver un bilan →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
