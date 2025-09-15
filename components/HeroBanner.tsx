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
      <div className="h-screen w-full bg-mainColor flex flex-col justify-center items-center">
        <div className="absolute">
          <img
            className="w-screen h-screen object-cover overflow-hidden"
            src={bgTheme[currentBgIndex]}
            alt="Theme background" 
          />
        </div>
        <div className="z-10 ">
          <h1 className="text-6xl md:text-8xl font-leagueSpartan font-bold text-clearColor my-8 text-center">
            {words[currentWordIndex]}
          </h1>
        </div>
        <div className="absolute flex flex-col justify-center items-end h-full w-min translate-y-36 md:translate-y-44">
          <article className="bg-clearColor/30 p-2 rounded-xl w-min whitespace-nowrap">
            <p className="font-calSans text-3xl md:text-4xl lg:text-5xl text-center text-darkColor">
              PERSONAL TRAINER
            </p>
            <p className="font-rajdhaniRegular text-center text-xl md:text-2xl lg:text-2xl">
              📍 Fribourg, Suisse 🇨🇭
            </p>
          </article>
          <div className="py-2 flex flex-row justify-end items-end mt-2 w-2/3 md:w-1/2">
            <div className="bg-mainColor/70 rounded-xl p-2 flex flex-row justify-center items-center gap-2">
              <BadgeCheck size={18} color="white" />
              <p className="font-rajdhaniRegular text-clearColor font-bold text-center text-xl md:text-xl">
                Certifié
              </p>
              <img
                className="object-cover overflow-hidden w-1/2 md:w-1/3"
                src="/img/logo/qualitop-logo-2.jpg"
                alt="Theme background" 
              />
            </div>
          </div>
          {/* <div className="z-50 bg-darkColor rounded-2xl py-3 px-6 text-xl font-calSans text-clearColor hover:bg-mainColor duration-100 cursor-pointer hover:border-2 border-darkColor hover:text-darkColor text-center">
            <a href="/contact">Besoin d'un coach ? contactez moi !</a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
