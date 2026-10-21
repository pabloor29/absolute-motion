import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Absolute Motion : éditeur, responsable de la publication, hébergeur et propriété intellectuelle.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

function MentionsLegales() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Mentions légales." img="/img/bg/bg-tree.webp" />

      <div className="bg-mainColor flex flex-col justify-center items-center py-20">
        <article className="bg-darkColor text-clearColor rounded-xl w-3/4 md:w-2/3 lg:w-1/2 p-6 md:p-10 font-rajdhaniRegular text-base md:text-lg space-y-8">
          <p className="opacity-70 text-sm">Dernière mise à jour : 21 octobre 2026</p>

          <section>
            <h2 className="font-calSans text-2xl mb-2">1. Éditeur du site</h2>
            <p>
              Le site <strong>Absolute Motion</strong> est édité par :
              <br />
              Nom / raison sociale : [À COMPLÉTER]
              <br />
              Statut juridique : [À COMPLÉTER — ex. entreprise individuelle]
              <br />
              Adresse : [À COMPLÉTER], Fribourg, Suisse
              <br />
              Numéro IDE (le cas échéant) : [À COMPLÉTER]
              <br />
              E-mail :{" "}
              <a className="underline" href="mailto:absolute.motion@icloud.com">
                absolute.motion@icloud.com
              </a>
              <br />
              Téléphone : [À COMPLÉTER]
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">2. Responsable de la publication</h2>
            <p>Arnaud [À COMPLÉTER — nom complet], en qualité d'exploitant d'Absolute Motion.</p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">3. Hébergement</h2>
            <p>
              Le site est hébergé par :
              <br />
              Vercel Inc.
              <br />
              440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
              <br />
              Site web :{" "}
              <a className="underline" href="https://vercel.com" rel="noopener noreferrer" target="_blank">
                vercel.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">4. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes,
              structure) sont, sauf mention contraire, la propriété exclusive d'Absolute Motion ou
              de leurs ayants droit respectifs. Toute reproduction, représentation, modification ou
              diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">5. Responsabilité</h2>
            <p>
              Absolute Motion s'efforce d'assurer l'exactitude des informations diffusées sur le
              site mais ne saurait être tenu responsable d'éventuelles erreurs, omissions ou de
              l'indisponibilité du service. Les informations relatives au coaching ne remplacent
              pas un avis médical : consultez un professionnel de santé avant toute reprise
              d'activité physique.
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">6. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est détaillé dans notre{" "}
              <a className="underline" href="/politique-de-confidentialite">
                politique de confidentialité
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">7. Crédits</h2>
            <p>
              Conception et développement du site :{" "}
              <a
                className="underline"
                href="https://portfolio-pablo-teal.vercel.app/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Pablo Ortega
              </a>
              .
            </p>
          </section>
        </article>
      </div>

      <Footer />
    </>
  );
}

export default MentionsLegales;
