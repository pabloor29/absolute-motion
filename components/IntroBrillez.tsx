"use client";

import React, { useState, useEffect } from "react";

function IntroBrillez() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // facteur pour ralentir le défilement (entre 0 et 1)
  const parallaxFactor = 0.2;

  return (
    <section
      className="relative px-8 flex flex-col md:flex-row items-center max-w-6xl mx-auto z-5"
      style={{
        transform: `translateY(${offsetY * parallaxFactor - 150}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <img
        src="/img/photo-intro.jpg" // remplace par ton image
        alt="Présentation Brillez"
        className="w-64 h-64 object-cover rounded-lg shadow-lg mb-8 md:mb-0 md:mr-12"
      />
      <div className="pb-10 md:pb-0">
        <h2 className="text-4xl font-zillaSlabBold mb-4 text-gray-800">
            Découvrez Brillez
        </h2>
        <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
          Brillez est votre agence de communication dédiée à faire rayonner
          votre marque à travers des stratégies créatives et innovantes. Nous
          transformons vos idées en expériences captivantes qui connectent
          votre audience et renforcent votre impact.
        </p>
      </div>
    </section>
  );
}

export default IntroBrillez;
