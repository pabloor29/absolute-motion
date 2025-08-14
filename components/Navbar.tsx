"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // 🔽 ref + bg pour le menu halftone
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [halftoneBg, setHalftoneBg] = useState<string>("");

  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // <768px => mobile
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ▶️ Génère un SVG avec ESPACEMENT VARIABLE (densité max en haut-droit)
  function generateHalftoneDataURL(w: number, h: number, opts?: {
    minSpacing?: number;  // espacement mini (haut-droit)
    maxSpacing?: number;  // espacement maxi (bas-gauche)
    maxDots?: number;     // sécurité pour limiter le nombre de cercles
  }) {
    const minS = opts?.minSpacing ?? 5;
    const maxS = opts?.maxSpacing ?? 20;
    const maxDots = opts?.maxDots ?? 14000;

    let y = 0;
    let dots = 0;
    const parts: string[] = [];
    parts.push(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'>`);

    // On ne remplit PAS le fond : uniquement des points noirs (fond = transparent)
    parts.push(`<g fill='darkColor'>`);

    while (y < h && dots < maxDots) {
      // espacement vertical : plus petit en haut, plus grand en bas
      const rowNorm = y / h; // 0 en haut -> 1 en bas
      const spacingY = minS + (maxS - minS) * rowNorm;

      let x = 0;
      while (x < w && dots < maxDots) {
        // espacement horizontal : plus petit à droite, plus grand à gauche
        const colNormFromRight = 1 - (x / w); // 1 à droite -> 0 à gauche
        const spacingX = minS + (maxS - minS) * (1 - colNormFromRight);

        // espacement effectif = moyenne des 2 (donne une vraie diagonale)
        const spacing = (spacingX + spacingY) / 1.2;

        // rayon : proportionnel à l'espacement local
        // (assez grand pour "presque remplir" en haut-droit, plus petit ailleurs)
        const r = Math.max(1, spacing * 0.42);

        parts.push(`<circle cx='${x.toFixed(2)}' cy='${y.toFixed(2)}' r='${r.toFixed(2)}' />`);
        dots++;

        x += spacing;
      }
      y += spacingY;
    }

    parts.push(`</g></svg>`);
    const svg = parts.join("");
    const url = `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
    return url;
  }

  // Regénère le fond quand la taille change ou quand on (dé)ouvre le menu
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;

    const build = () => {
      const rect = el.getBoundingClientRect();
      // marge pour éviter le flou sur grands écrans
      const w = Math.max(600, Math.ceil(rect.width));
      const h = Math.max(600, Math.ceil(rect.height));
      const url = generateHalftoneDataURL(w, h, {
        minSpacing: 0.1, // densité max (plus petit => plus dense)
        maxSpacing: 15, // densité min (plus grand => plus espacé)
        maxDots: 160000,
      });
      setHalftoneBg(url);
    };

    build();

    // ResizeObserver pour réagir aux changements de taille réels
    const ro = new ResizeObserver(build);
    ro.observe(el);

    // Écoute le resize fenêtre
    window.addEventListener("resize", build);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", build);
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "accueil", href: "/" },
    { name: "projets", href: "/projets" },
    { name: "services", href: "/services" },
    { name: "contact", href: "/contact" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        )}
      >
        <div className="">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center z-60 ml-10">
              <span className="font-zillaSlabBold text-2xl">brillez</span>
            </Link>

            {isMobile ? (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="mr-10 z-60 transition-all duration-300 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className={cn("w-10 h-10 rounded-full flex flex-col justify-center items-center",
                  isMenuOpen ? "rotate-45 bg-yellowMain" : "bg-darkColor gap-1",
                )}>
                  <span
                    className={cn(
                      "w-6 h-0.5 transition-all duration-500",
                      isMenuOpen ? "rotate-90 bg-darkColor translate-y-0.5" : "bg-yellowMain",
                    )}
                  />
                  <span
                    className={cn(
                      "w-6 h-0.5 transition-all duration-300",
                      isMenuOpen ? "opacity-0 scale-0 bg-darkColor" : "opacity-100 scale-100 bg-yellowMain",
                    )}
                  />
                  <span
                    className={cn(
                      "w-6 h-0.5 transition-all duration-500",
                      isMenuOpen ? "-rotate-180 bg-darkColor -translate-y-0.5" : "bg-yellowMain",
                    )}
                  />
                </div>
              </button>
            ):(
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="fixed right-8 top-1/2 -translate-y-1/2 z-60 transition-all duration-300 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <div className="w-[50px]">
                  <svg width="271" height="2348" viewBox="0 0 271 2348" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M270 0C270 113.5 261 79.5 228.5 150.5C147.306 327.878 166 309.5 119 453C98.6746 515.057 35.4999 776.5 8.49986 962.5C-2.00004 1060 1.49993 1078.5 1.5 1174.5H270V0Z" 
                      fill={cn(isMenuOpen ? "#fcf6a8" : "#111009",)}/>
                    <path 
                      d="M270.06 2347.5C270.06 2234 261.06 2268 228.56 2197C147.366 2019.62 166.06 2038 119.06 1894.5C98.7346 1832.44 35.5599 1571 8.55992 1385C-1.93998 1287.5 1.55999 1269 1.56006 1173H270.06V2347.5Z" 
                      fill={cn(isMenuOpen ? "#fcf6a8" : "#111009",)}/>
                  </svg>
                </div>
                <div className="relative w-6 h-6">
                  <span
                    className={cn(
                      "absolute block w-6 h-0.5 transition-all duration-500 ease-in-out",
                      isMenuOpen ? "rotate-45 top-3 bg-darkColor" : "top-2 bg-yellowMain",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block w-6 h-0.5 transition-all duration-300 top-3",
                      isMenuOpen ? "opacity-0 scale-0 bg-darkColor" : "opacity-100 scale-100 bg-yellowMain",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute block w-6 h-0.5 transition-all duration-500 ease-in-out",
                      isMenuOpen ? "-rotate-45 top-3 bg-darkColor" : "top-4 bg-yellowMain",
                    )}
                  />
                </div>
              </button>
            )}
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
        <div className="w-full h-full bg-yellowMain">
          <div
            ref={menuRef}
            className="relative h-full flex items-center justify-center bg-darkColor"
          >
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
                  <div className="h-full bg-dots-yellowMain">
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-2xl md:text-4xl font-light text-left duration-300 font-zillaSlabBold text-yellowMain hover:font-zillaSlabRegular hover:ml-4 hover:before:content-['•'] before:mr-2 bg-darkColor pr-60 hover:pr-0 hover:bg-transparent"
                    >
                      {item.name}
                    </Link>
                  </div>
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
      </div>
    </>
  );
}

export default Navbar;
