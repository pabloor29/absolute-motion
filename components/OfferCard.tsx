import { Check } from "lucide-react";
import React from "react";

export type OfferExtra = { label: string; value: string };

type OfferCardProps = {
  /** Emoji / icône affiché en haut de carte */
  icon?: string;
  name: string;
  /** Durée d'une séance, ex. "60 min" */
  duration?: string;
  /** Prix principal mis en avant, ex. "100.-" */
  price: string;
  /** Unité du prix, ex. "CHF / séance" */
  priceUnit?: string;
  /** Accroche / description sous le titre */
  tagline?: string;
  /** Chaque entrée peut être "Titre | description" (titre en gras + sous-texte) */
  features?: string[];
  /** Lignes additionnelles (forfaits, paiement trimestriel...) */
  extras?: OfferExtra[];
  /** Met la carte en avant (bordure accent) */
  highlighted?: boolean;
  /** Badge affiché en haut de la carte mise en avant */
  badge?: string;
  /** Note en bas de carte (astérisque, conditions...) */
  note?: string;
};

export default function OfferCard({
  icon,
  name,
  duration,
  price,
  priceUnit,
  tagline,
  features = [],
  extras = [],
  highlighted = false,
  badge,
  note,
}: OfferCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-6 bg-darkColor text-clearColor w-full ${
        highlighted ? "ring-2 ring-mainColor shadow-xl md:scale-[1.03]" : ""
      }`}
    >
      {highlighted && badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mainColor text-clearColor font-calSans text-sm px-4 py-1 rounded-full whitespace-nowrap">
          {badge}
        </span>
      )}

      <div className="text-center">
        {icon && <div className="text-4xl mb-2">{icon}</div>}
        <h3 className="font-calSans text-2xl">{name}</h3>
        {duration && (
          <p className="font-rajdhaniRegular text-sm uppercase tracking-wide text-clearColor/60 mt-1">
            ⏱ {duration}
          </p>
        )}
        {tagline && (
          <p className="font-rajdhaniRegular text-base text-clearColor/80 mt-3">
            {tagline}
          </p>
        )}
      </div>

      <div className="text-center mt-4 mb-5">
        <span className="font-calSans text-4xl text-clearColor">{price}</span>
        {priceUnit && (
          <span className="font-rajdhaniRegular text-base text-clearColor/70 ml-2">
            {priceUnit}
          </span>
        )}
      </div>

      {features.length > 0 && (
        <ul className="flex flex-col gap-3 font-rajdhaniRegular mb-4">
          {features.map((feature, i) => {
            const [title, ...rest] = feature.split("|");
            const desc = rest.join("|").trim();
            return (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-5 h-5 shrink-0 mt-1 text-mainColor" />
                <span className="text-lg leading-snug">
                  <span className="font-calSans text-base">{title.trim()}</span>
                  {desc && (
                    <span className="block text-base text-clearColor/70">
                      {desc}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {extras.length > 0 && (
        <div className="mt-auto pt-4 border-t border-clearColor/20 flex flex-col gap-2">
          {extras.map((extra, i) => (
            <div
              key={i}
              className="flex justify-between items-baseline font-rajdhaniRegular text-base gap-3"
            >
              <span className="text-clearColor/70">{extra.label}</span>
              <span className="font-calSans text-clearColor whitespace-nowrap">
                {extra.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {note && (
        <p className="font-rajdhaniRegular text-sm text-clearColor/60 mt-4">
          {note}
        </p>
      )}
    </div>
  );
}
