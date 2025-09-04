"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type ServiceCardProps = {
  emoji: string;
  title: string;
  description: string;
};

export default function ServiceCard({ emoji, title, description }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
        {isOpen ? (
            <div
                className="flex items-center justify-between p-2 bg-darkColor/70 rounded-t-2xl cursor-pointer md:w-min"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <h3 className="text-lg font-calSans text-clearColor whitespace-nowrap">{title}</h3>
                </div>
                <ChevronUp className="w-6 h-6 ml-5 text-clearColor" />
            </div>
        ) : (
            <div
                className="flex items-center justify-between p-2 bg-darkColor rounded-t-2xl cursor-pointer md:w-min"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <h3 className="text-lg font-calSans text-clearColor whitespace-nowrap">{title}</h3>
                </div>
                <ChevronDown className="w-6 h-6 ml-5 text-clearColor" />
            </div>
        )}

      {/* Panneau dépliant */}
      {isOpen && (
        <div className="w-full p-4 bg-darkColor/70 rounded-b-xl">
          <p className="text-clearColor font-rajdhaniRegular">{description}</p>
        </div>
      )}
    </div>
  );
}
