"use client";

import React, { useEffect, useRef, useState } from "react";

const words = [
  "ÉQUILIBRE",
  "FORCE",
  "ENDURANCE",
];

function HeroBanner() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((index) => (index + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full z-10">
      <div className="h-screen bg-mainColor">
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <article>
            <p className="font-calSans text-xl md:text-2xl text-center text-darkColor">
              Personal trainer | Small groups trainer
            </p>
          </article>
          <h1 className="text-4xl md:text-6xl font-rajdhaniRegular text-darkColor my-8">
            {words[currentWordIndex]}
          </h1>
          <div className="z-50 bg-darkColor rounded-2xl py-3 px-6 text-xl font-calSans text-clearColor hover:bg-mainColor duration-100 cursor-pointer hover:border-2 border-darkColor hover:text-darkColor text-center">
            <a href="/contact">Besoin d'un coach ? contactez moi !</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
