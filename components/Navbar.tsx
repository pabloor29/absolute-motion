"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const navItems = [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group z-60">
              <div className="relative">
                <div className="w-8 h-8 bg-foreground rounded-full transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full transition-all duration-300 group-hover:scale-125" />
              </div>
              <span className="font-zillaSlabBold text-lg tracking-tight">brillez</span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="fixed right-8 top-1/2 -translate-y-1/2 z-60 transition-all duration-300 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="w-[50px]">
                <svg width="271" height="2348" viewBox="0 0 271 2348" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M270 0C270 113.5 261 79.5 228.5 150.5C147.306 327.878 166 309.5 119 453C98.6746 515.057 35.4999 776.5 8.49986 962.5C-2.00004 1060 1.49993 1078.5 1.5 1174.5H270V0Z" 
                    fill={cn(isMenuOpen ? "white" : "black",)}/>
                  <path 
                    d="M270.06 2347.5C270.06 2234 261.06 2268 228.56 2197C147.366 2019.62 166.06 2038 119.06 1894.5C98.7346 1832.44 35.5599 1571 8.55992 1385C-1.93998 1287.5 1.55999 1269 1.56006 1173H270.06V2347.5Z" 
                    fill={cn(isMenuOpen ? "white" : "black",)}/>
                </svg>
              </div>
              <div className="relative w-6 h-6">
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 transition-all duration-500 ease-in-out",
                    isMenuOpen ? "rotate-45 top-3 bg-black" : "top-2 bg-yellowMain",
                  )}
                />
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 transition-all duration-300 top-3",
                    isMenuOpen ? "opacity-0 scale-0 bg-black" : "opacity-100 scale-100 bg-yellowMain",
                  )}
                />
                <span
                  className={cn(
                    "absolute block w-6 h-0.5 transition-all duration-500 ease-in-out",
                    isMenuOpen ? "-rotate-45 top-3 bg-black" : "top-4 bg-yellowMain",
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-40 transition-all duration-700 ease-in-out",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      >
        {/* Background overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-background transition-all duration-700",
            isMenuOpen ? "scale-100" : "scale-95",
          )}
        />

        {/* Menu content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center space-y-8">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className={cn(
                  "transform transition-all duration-700 ease-out",
                  isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                )}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-6xl md:text-8xl font-light tracking-tight text-foreground hover:text-foreground/60 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </div>
            ))}

            <div
              className={cn(
                "mt-16 flex justify-center space-x-4 transform transition-all duration-700",
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{
                transitionDelay: isMenuOpen ? "600ms" : "0ms",
              }}
            >
              <div className="w-3 h-3 bg-primary rounded-full" />
              <div className="w-3 h-3 bg-foreground/20 rounded-full" />
              <div className="w-3 h-3 bg-foreground/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
