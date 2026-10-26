import CustomHeroBannerImage from "@/components/CustomHeroBannerImage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getContent, legalField } from "@/lib/data";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité d'Absolute Motion : données collectées via le formulaire de contact et la mesure d'audience, finalités, durées de conservation et vos droits (nLPD / RGPD).",
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: true, follow: true },
};

async function PolitiqueConfidentialite() {
  const content = await getContent();
  const email = (content.legal_email || "absolute.motion@icloud.com").trim();

  const controllerLines = [
    { label: "Nom / raison sociale", value: legalField(content, "legal_company_name") },
    { label: "Adresse", value: legalField(content, "legal_address") },
    { label: "E-mail", value: legalField(content, "legal_email"), mail: true },
  ].filter((l) => l.value);

  const retention = legalField(content, "privacy_retention");

  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Confidentialité." img="/img/bg/bg-equilibre.webp" />

      <div className="bg-mainColor flex flex-col justify-center items-center py-20">
        <article className="bg-darkColor text-clearColor rounded-xl w-3/4 md:w-2/3 lg:w-1/2 p-6 md:p-10 font-rajdhaniRegular text-base md:text-lg space-y-8">
          <p className="opacity-70 text-sm">Dernière mise à jour : 21 octobre 2026</p>

          <section>
            <p>
              La présente politique explique quelles données personnelles sont collectées sur le
              site Absolute Motion, pourquoi, et quels sont vos droits. Elle est établie dans le
              respect de la loi fédérale suisse sur la protection des données (nLPD) et, le cas
              échéant, du Règlement général sur la protection des données (RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">1. Responsable du traitement</h2>
            <p>
              {controllerLines.map((l, i) => (
                <React.Fragment key={l.label}>
                  {i > 0 && <br />}
                  {l.label} :{" "}
                  {l.mail ? (
                    <a className="underline" href={`mailto:${l.value}`}>
                      {l.value}
                    </a>
                  ) : (
                    l.value
                  )}
                </React.Fragment>
              ))}
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">2. Données collectées</h2>
            <p>
              <strong>Formulaire de contact :</strong> lorsque vous nous écrivez via le formulaire,
              nous collectons les données que vous fournissez (nom, adresse e-mail, et contenu de
              votre message). L'envoi est assuré par le service EmailJS.
              <br />
              <br />
              <strong>Mesure d'audience :</strong> le site utilise Vercel Analytics et Vercel Speed
              Insights pour mesurer la fréquentation et les performances. Ces outils collectent des
              données d'usage agrégées et respectueuses de la vie privée (sans cookie publicitaire
              et sans suivi inter-sites).
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">3. Finalités</h2>
            <p>
              Vos données sont utilisées pour : répondre à vos demandes de contact et établir un
              suivi de coaching ; améliorer le site et comprendre son audience ; assurer la
              sécurité et le bon fonctionnement du service.
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">4. Base légale</h2>
            <p>
              Les traitements reposent sur votre consentement (envoi du formulaire) et sur l'intérêt
              légitime d'Absolute Motion à assurer le fonctionnement et l'amélioration du site.
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">5. Destinataires et sous-traitants</h2>
            <p>
              Vos données ne sont jamais vendues. Elles peuvent être traitées par nos prestataires
              techniques strictement nécessaires au service :
              <br />
              • <strong>EmailJS</strong> — acheminement des messages du formulaire de contact.
              <br />
              • <strong>Vercel</strong> — hébergement et mesure d'audience.
              <br />
              Ces prestataires peuvent héberger des données en dehors de la Suisse ; des garanties
              appropriées encadrent ces transferts.
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">6. Durée de conservation</h2>
            <p>
              Les messages reçus via le formulaire sont conservés le temps nécessaire au traitement
              de votre demande puis à des fins de suivi relationnel
              {retention ? ` : ${retention}` : ""}. Les données de mesure d'audience sont conservées
              de manière agrégée.
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">7. Vos droits</h2>
            <p>
              Vous disposez d'un droit d'accès, de rectification, de suppression, de limitation et
              d'opposition sur vos données, ainsi que d'un droit à la portabilité. Pour exercer ces
              droits, écrivez à{" "}
              <a className="underline" href={`mailto:${email}`}>
                {email}
              </a>
              . Vous pouvez également saisir l'autorité compétente (en Suisse, le Préposé fédéral à
              la protection des données et à la transparence — PFPDT).
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">8. Cookies</h2>
            <p>
              Le site n'utilise pas de cookies publicitaires ni de traceurs tiers à des fins
              marketing. Seuls des outils de mesure d'audience respectueux de la vie privée sont
              employés.
            </p>
          </section>

          <section>
            <h2 className="font-calSans text-2xl mb-2">9. Contact</h2>
            <p>
              Pour toute question relative à cette politique, contactez-nous à{" "}
              <a className="underline" href={`mailto:${email}`}>
                {email}
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

export default PolitiqueConfidentialite;
