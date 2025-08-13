"use client";

import { Variants, motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const textVariants: Variants = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};

function HeroBanner() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-yellowMain">
      <Image
        src="/img/logo/LOGO-brillez.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <h1 className="font-zillaSlabBold text-6xl">
        brillez
      </h1>
    </div>
  );
}

export default HeroBanner;
