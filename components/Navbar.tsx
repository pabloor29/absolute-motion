"use client";

import React from "react";
import { AlignJustify, Utensils } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { Variants, motion } from "framer-motion";

const links = [
  {
    label: "accueil",
    href: "/",
  },
  {
    label: "services",
    href: "/services",
  },
  {
    label: "tarifs",
    href: "/tarifs",
  },
  {
    label: "contact",
    href: "/contact",
  },
];

const Variants: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "linear",
      duration: 1,
      delay: 0.5,
    },
  },
};

function Navbar() {
  return (
    <nav className="w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "50%" }}
        variants={Variants}
        className="fixed w-full h-24 backdrop-blur justify-between items-center text-white px-8 z-50 hidden lg:flex bg-mainColor/50"
      >
        <a href="/" className="">
          <img 
            className="h-20"
            src="/img/logo/logo.webp"
            alt="logo absolute motion"
          />
        </a>
        <div>
          <li className="flex justify-center space-x-12">
            {links.map((link) => (
              <a
                href={link.href}
                className="leading-none text-darkColor hover:text-clearColor font-calSans text-2xl"
              >
                {link.label}
              </a>
            ))}
          </li>
        </div>
      </motion.div>

      <div className="lg:hidden fixed top-6 z-50 flex justify-between w-full px-6">
        <Sheet key="left">
          <SheetTrigger className="overflow-hidden flex justify-center items-center w-10 h-10 rounded-full shadow bg-darkColor/50">
            <img src="/img/menu-2-line.png" alt="hamburger menu icon" />
          </SheetTrigger>
          <SheetContent className="bg-mainColor">
            <SheetHeader>
              <SheetDescription className="flex flex-col">
                {links.map((items) => (
                  <a
                    key={items.label}
                    href={items.href}
                    className="overflow-hidden h-20 w-4/5 flex items-center text-darkColo hover:bg-clearColor duration-300 px-5 py-3 cursor-pointer"
                  >
                    <h3 className="font-calSans text-3xl tracking-wide">
                      {items.label}
                    </h3>
                  </a>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar;
