"use client";

import { BadgeCheck } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const words = [
  "ÉQUILIBRE.",
  "FORCE.",
  "ENDURANCE.",
];

const bgTheme = [
  "/img/bg/bg-equilibre.webp",
  "/img/bg/bg-force.webp",
  "/img/bg/bg-endurance.webp",
];

function HeroBanner() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((index) => (index + 1) % words.length);
      setCurrentBgIndex((index) => (index + 1) % bgTheme.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full z-10">
      <div className="h-screen w-full bg-mainColor">
        <div className="absolute">
          <img
            className="w-screen h-screen object-cover overflow-hidden"
            src={bgTheme[currentBgIndex]}
            alt="Theme background" 
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <h1 className="text-6xl md:text-8xl font-leagueSpartan font-bold text-clearColor my-8 text-center">
            {words[currentWordIndex]}
          </h1>
          <article className="bg-clearColor/30 p-2 rounded-xl w-min whitespace-nowrap">
            <p className="font-calSans text-3xl md:text-4xl lg:text-5xl text-center text-darkColor">
              PERSONAL TRAINER
            </p>
            <p className="font-rajdhaniRegular text-center text-xl md:text-2xl lg:text-2xl">
              📍 Fribourg, Suisse 🇨🇭
            </p>
            <div className="py-2 flex flex-col justify-center items-center bg-mainColor/50 rounded-xl p-2 mt-4">
              <div className="flex flex-row justify-center items-center gap-2">
                <BadgeCheck />
                <p className="font-rajdhaniRegular text-center text-2xl md:text-3xl lg:text-4xl">
                  Certifié QUALITOP
                </p>
              </div>
              <img
                className="object-cover overflow-hidden w-3/4"
                src="/img/logo/Logo_Qualitop.webp"
                alt="Theme background" 
              />
            </div>
          </article>
          {/* <div className="z-50 bg-darkColor rounded-2xl py-3 px-6 text-xl font-calSans text-clearColor hover:bg-mainColor duration-100 cursor-pointer hover:border-2 border-darkColor hover:text-darkColor text-center">
            <a href="/contact">Besoin d'un coach ? contactez moi !</a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
