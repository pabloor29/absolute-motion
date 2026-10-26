"use client";

import React, { useEffect, useState } from "react";

// Fond conservé : les images qui défilent en arrière-plan.
const bgTheme = [
  "/img/bg/bg-equilibre.webp",
  "/img/bg/bg-force.webp",
  "/img/bg/bg-endurance.webp",
];

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
    <section className="relative w-full h-screen overflow-hidden">
      {/* Fond : images qui défilent */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={bgTheme[currentBgIndex]}
        alt=""
        aria-hidden="true"
      />
      {/* Voile sombre pour la lisibilité du texte */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-darkColor/90 via-darkColor/70 to-darkColor/40"
        aria-hidden="true"
      />

      {/* Contenu (comme l'exemple) */}
      <div className="relative z-10 h-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <p className="font-rajdhaniRegular text-sm font-bold uppercase tracking-widest text-[#6b7cff] mb-4">
            Personal Trainer · Fribourg, Suisse 🇨🇭
          </p>
          <h1 className="font-leagueSpartan font-bold text-6xl md:text-8xl text-clearColor uppercase leading-none">
            Arnaud
          </h1>
          <p className="font-rajdhaniRegular uppercase tracking-widest text-clearColor/50 text-xl md:text-2xl mt-2 mb-7">
            Coach &amp; Personal Trainer
          </p>
          <p className="font-rajdhaniRegular text-clearColor/70 text-lg max-w-xl leading-relaxed mb-7">
            De l'équipe de France junior de rugby à XIII au cockpit d'un
            hélicoptère, puis au coaching sportif —{" "}
            <strong className="text-clearColor font-normal">
              trois vies, un même fil conducteur : le dépassement de soi.
            </strong>{" "}
            Aujourd'hui je mets ce parcours au service de votre progression.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {chips.map((c) => (
              <span
                key={c.label}
                className={`font-rajdhaniRegular text-sm rounded-full px-3 py-1 border ${
                  c.accent
                    ? "border-[#5b6bff]/50 text-[#7c89ff]"
                    : "border-clearColor/15 text-clearColor/65"
                }`}
              >
                {c.label}
              </span>
            ))}
          </div>
          <a
            href="/contact"
            className="self-start bg-mainColor text-clearColor rounded-xl py-3 px-6 font-calSans text-lg hover:opacity-90 duration-150"
          >
            Réserver un bilan →
          </a>
        </div>

        {/* Photo d'Arnaud */}
        <div className="hidden md:flex items-end justify-end">
          <img
            src="/img/intro/profile-coach.webp"
            alt="Arnaud — Personal Trainer à Fribourg"
            className="w-[300px] h-[440px] object-cover object-top rounded-t-2xl border border-clearColor/10 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
