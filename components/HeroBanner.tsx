"use client";

import React, { useEffect, useRef, useState } from "react";

const words = [
  "ÉQUILIBRE",
  "FORCE",
  "ENDURANCE",
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
          <article className="bg-clearColor/30 p-2 rounded-xl">
            <p className="font-calSans text-2xl md:text-3xl text-center text-darkColor">
              Personal trainer
            </p>
            <p className="font-rajdhaniRegular text-center text-xl md:text-2xl bg-mainColor/50 rounded-xl p-2">
              📍 Fribourg, Suisse 🇨🇭
            </p>
          </article>
          <h1 className="text-5xl md:text-6xl font-rajdhaniRegular text-clearColor my-8">
            {words[currentWordIndex]}
          </h1>
          {/* <div className="z-50 bg-darkColor rounded-2xl py-3 px-6 text-xl font-calSans text-clearColor hover:bg-mainColor duration-100 cursor-pointer hover:border-2 border-darkColor hover:text-darkColor text-center">
            <a href="/contact">Besoin d'un coach ? contactez moi !</a>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
