"use client";
import { Variants, motion } from "framer-motion";
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

function CustomHeroBannerImage(props: any) {
  return (
    <div className="h-96 relative">
      <div className="w-full h-full z-40 absolute"></div>
      <img
        src={props.img}
        alt=""
        className="h-full w-full object-cover absolute z-30"
      />

      <div className="relative z-40 h-full flex flex-col items-center justify-center leading-none">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          className="text-5xl lg:text-9xl text-clearColor font-calSans z-40"
        >
          {props.title}
        </motion.h1>
      </div>
    </div>
  );
}

export default CustomHeroBannerImage;
