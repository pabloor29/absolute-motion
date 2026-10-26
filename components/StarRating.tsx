"use client";

import { Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
};

// Interactive when `onChange` is provided, read-only otherwise.
export default function StarRating({ value, onChange, size = 20, className = "" }: Props) {
  const [hover, setHover] = useState(0);
  const readOnly = !onChange;
  const shown = hover || value;

  return (
    <div className={`flex items-center gap-1 ${className}`} role={readOnly ? "img" : undefined} aria-label={readOnly ? `${value} sur 5` : undefined}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= shown;
        return (
          <button
            key={n}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(n)}
            onMouseEnter={() => !readOnly && setHover(n)}
            onMouseLeave={() => !readOnly && setHover(0)}
            className={readOnly ? "cursor-default" : "cursor-pointer transition-transform hover:scale-110"}
            aria-label={readOnly ? undefined : `${n} étoile${n > 1 ? "s" : ""}`}
          >
            <Star
              size={size}
              className={filled ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-gray-300"}
            />
          </button>
        );
      })}
    </div>
  );
}
