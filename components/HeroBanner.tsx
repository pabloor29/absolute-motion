"use client";

import React, { useEffect, useRef, useState } from "react";

const words = [
  "Équilibre",
  "Force",
  "Endurance",
];

function HeroBanner() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((index) => (index + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const positionsRef = useRef<{ x: number; y: number; time: number }[]>([]);

  // Paramètres
  const maxTrailDuration = 1000; // ms
  const maxCircleRadius = 30; // rayon max du cercle
  const minCircleRadius = 10; // rayon min dans la traînée
  const pointRadius = 2; // rayon des petits points
  const pointSpacing = 8; // espacement entre points (centre à centre)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = Date.now();

      positionsRef.current.push({ x, y, time: now });

      // Nettoyage
      positionsRef.current = positionsRef.current.filter(
        (pos) => now - pos.time < maxTrailDuration
      );
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Dessine un cercle rempli de points régulièrement espacés
    const drawFilledDottedCircle = (
      ctx: CanvasRenderingContext2D,
      centerX: number,
      centerY: number,
      radius: number,
      spacing: number,
      pointRadius: number,
      alpha: number
    ) => {
      ctx.fillStyle = `rgba(0,0,0,${alpha.toFixed(2)})`;

      // On calcule les bornes du carré englobant le cercle
      const startX = centerX - radius;
      const endX = centerX + radius;
      const startY = centerY - radius;
      const endY = centerY + radius;

      for (
        let x = startX;
        x <= endX;
        x += spacing
      ) {
        for (
          let y = startY;
          y <= endY;
          y += spacing
        ) {
          // Vérifie que le point est dans le cercle
          const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          if (dist <= radius) {
            ctx.beginPath();
            ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();

      positionsRef.current.forEach((pos) => {
        const age = now - pos.time;
        const progress = age / maxTrailDuration;
        if (progress > 1) return;

        const alpha = 1 - progress;
        const radius =
          maxCircleRadius * (1 - progress) + minCircleRadius * progress;

        drawFilledDottedCircle(
          ctx,
          pos.x,
          pos.y,
          radius,
          pointSpacing,
          pointRadius,
          alpha
        );
      });

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="w-full z-10">
      <div className="h-screen bg-yellowMain">
        <canvas
          ref={canvasRef}
          className="absolute pointer-events-none"
          style={{ zIndex: 40 }}
        />
        <div className="relative z-10 flex flex-col justify-center items-center h-full">
          <h1 className="text-4xl md:text-6xl font-zillaSlabBold">
            {words[currentWordIndex]}
          </h1>
          <h2 className="text-xl md:text-3xl font-zillaSlabRegular">
            "Tout le monde rêve de briller un jour"
          </h2>
          <div className="z-50 mt-10 bg-darkColor rounded-2xl py-3 px-6 text-xl font-zillaSlabBold text-yellowMain hover:bg-yellowMain duration-100 cursor-pointer hover:border border-darkColor hover:text-darkColor text-center">
            <a href="/contact">un projet en tête ? contactez nous !</a>
          </div>
        </div>
      </div>

      <div
        className="bottom-0 left-0 h-[100px] md:h-[200px] w-full bg-yellowMain" 
        style={{
          clipPath: "polygon(100% 0, 0 0, 0 100%)",
        }}
      />
    </div>
  );
}

export default HeroBanner;
