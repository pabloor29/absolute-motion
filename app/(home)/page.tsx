import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import ImageCarousel from "@/components/ImageCarousel";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import { getApprovedReviews, getContent } from "@/lib/data";
import { Analytics } from "@vercel/analytics/react";

const STATS = [
  { num: "8", label: "saisons de Rugby à XIII — équipe de France junior & universitaire" },
  { num: "29", label: "ans pilote hélicoptère" },
  { num: "45", label: "ans de pratiques sportives diverses" },
  { num: "2024", label: "diplôme de Personal Trainer" },
];

const SIDE_CARDS = [
  {
    icon: "📍",
    title: "PT · Séances autour de Fribourg",
    text: "En plein air, en salle ou à domicile",
  },
  {
    icon: "🌐",
    title: "Coaching à distance",
    text: "Programmes structurés partout en Suisse",
  },
  // Désactivé temporairement
  // {
  //   icon: "🏥",
  //   title: "Publics fragilisés",
  //   text: "Seniors, rééducation et profils spécifiques",
  // },
];

const MISSION = [
  {
    icon: "🎯",
    title: "Sur-mesure total",
    text: "Chaque programme est conçu en fonction de vos objectifs, de vos contraintes et de votre quotidien. Qu'il s'agisse de reprendre le sport en douceur, de préparer un triathlon ou de retrouver de l'énergie, le plan s'adapte à vous.",
  },
  {
    icon: "📈",
    title: "Progression mesurable",
    text: "Bilans réguliers et ajustements constants. Je structure chaque cycle pour que vous puissiez voir et ressentir vos progrès, étape après étape, sans précipitation.",
  },
  {
    icon: "🧠",
    title: "Corps et mental indissociables",
    text: "L'exigence du rugby et la gestion des risques en vol m'ont enseigné qu'un corps fort a besoin d'un mental solide. J'intègre cette synergie mentale et physique dans chacun de mes accompagnements.",
  },
  {
    icon: "🤝",
    title: "Présent à chaque étape",
    text: "Disponible entre les séances pour guider, encourager et ajuster le tir. Vous n'êtes jamais seul face à vos défis.",
  },
];

const CERTS = [
  {
    emoji: "✅",
    title: "Certifié Qualitop",
    sub: "Remboursement caisses maladie (complémentaires)",
  },
  {
    emoji: "🇨🇭",
    title: "Membre Swiss Active",
    sub: "Fédération suisse du fitness",
  },
  {
    emoji: "🇪🇺",
    title: "Membre EREPS",
    sub: "European Register of Exercise Professionals",
  },
];

const SPORTS = [
  { icon: "🏊🚴🏃", label: "Triathlon" },
  { icon: "⛰️", label: "Trail running" },
  { icon: "💪", label: "Renfo · Musculation" },
  { icon: "🪂", label: "Hike & Fly" },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-rajdhaniRegular text-sm font-bold uppercase tracking-widest text-mainColor mb-2">
      {children}
    </p>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-leagueSpartan font-bold text-3xl md:text-4xl text-darkColor uppercase leading-none mb-7">
      {children}
    </h2>
  );
}

export default async function Home() {
  const [content, reviews] = await Promise.all([
    getContent(),
    getApprovedReviews(6),
  ]);

  return (
    <main className="flex flex-col bg-clearColor">
      <Navbar />
      <HeroBanner />
      <ImageCarousel />

      {/* ── Bandeau chiffres ── */}
      <section className="bg-gradient-to-br from-darkColor to-mainColor py-8 px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        <img
          src="/img/intro/profile-coach.webp"
          alt="Arnaud — coach Absolute Motion"
          className="w-36 h-36 md:w-44 md:h-44 object-cover object-top rounded-full border-4 border-clearColor/20 shrink-0"
        />
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center text-clearColor max-w-[200px]">
              <div className="font-leagueSpartan font-bold text-4xl md:text-5xl leading-none">
                {s.num}
              </div>
              <div className="font-rajdhaniRegular text-xs uppercase tracking-wide opacity-80 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Corps ── */}
      <div className="max-w-5xl w-full mx-auto px-6 py-16">

        {/* Intro narrative */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3">
            <Eyebrow>Qui suis-je</Eyebrow>
            <Title>Rugby, hélicoptère, et coaching. Le même ADN.</Title>
            <p className="font-rajdhaniRegular text-darkColor text-lg leading-relaxed">
              Je suis Arnaud. Rugby international, cockpit d'hélicoptère, Personal
              Training : trois univers en apparence distincts, unis par les mêmes
              impératifs : rigueur, précision et maîtrise. Ce parcours façonne
              aujourd'hui mon regard de coach.{" "}
              <strong className="text-mainColor">AbsoluteMotion</strong>, c'est ce
              parcours mis au service de votre accompagnement. La même acuité
              qu'en vol pour analyser votre condition physique. La même exigence
              que sur un terrain pour structurer vos efforts. Le même engagement
              pour être là à chaque étape. Pas de protocoles standardisés :
              uniquement du sur-mesure, taillé pour vous.
            </p>
          </div>
          <div className="md:col-span-2 flex flex-col gap-3">
            {SIDE_CARDS.map((c) => (
              <div
                key={c.title}
                className="bg-white border border-darkColor/10 rounded-xl p-4 flex items-start gap-3"
              >
                <span className="text-xl shrink-0">{c.icon}</span>
                <div>
                  <strong className="font-calSans text-darkColor block text-sm mb-0.5">
                    {c.title}
                  </strong>
                  <span className="font-rajdhaniRegular text-sm text-darkColor/70">
                    {c.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Citation */}
        <div className="relative overflow-hidden bg-darkColor rounded-2xl p-8 md:p-10 mt-8">
          <p className="font-calSans text-xl md:text-2xl text-clearColor leading-snug max-w-3xl">
            «&nbsp;La rigueur et la précision ne sont pas de simples concepts :
            ce sont des expériences forgées sur le terrain et en cockpit.{" "}
            <span className="text-[#5b6bff]">
              C'est ce regard expert que je mets aujourd'hui au service de votre
              transformation.
            </span>
            &nbsp;»
          </p>
        </div>

        <hr className="border-darkColor/10 my-12" />

        {/* Mission */}
        <Eyebrow>Ma mission</Eyebrow>
        <Title>Ce que j'apporte à chaque athlète.</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MISSION.map((m) => (
            <div
              key={m.title}
              className="bg-white border border-darkColor/10 rounded-2xl p-5 flex items-start gap-4"
            >
              <span className="text-3xl shrink-0">{m.icon}</span>
              <div>
                <h3 className="font-calSans text-darkColor text-lg mb-1">
                  {m.title}
                </h3>
                <p className="font-rajdhaniRegular text-darkColor/70 leading-snug">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-darkColor/10 my-12" />

        {/* Certifications */}
        <Eyebrow>Certifications &amp; accréditations</Eyebrow>
        <Title>Une expertise reconnue.</Title>
        <div className="flex flex-wrap gap-3">
          {CERTS.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-darkColor/10 rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <span className="text-xl">{c.emoji}</span>
              <div>
                <span className="font-calSans text-darkColor text-sm block">
                  {c.title}
                </span>
                <span className="font-rajdhaniRegular text-xs text-darkColor/50">
                  {c.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-darkColor/10 my-12" />

        {/* Sports pratiqués */}
        <Eyebrow>Pratique personnelle</Eyebrow>
        <Title>Les sports que je pratique.</Title>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SPORTS.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-darkColor/10 rounded-xl px-4 py-3 flex items-center gap-2 font-rajdhaniRegular text-darkColor"
            >
              <span className="text-xl">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Témoignages (avis réels) ── */}
      <ReviewsSection title={content.reviews_title} reviews={reviews} showAllLink />

      {/* ── CTA ── */}
      <section className="bg-darkColor px-6 py-16 text-center">
        <h2 className="font-leagueSpartan font-bold text-3xl md:text-5xl text-clearColor uppercase leading-none mb-4">
          Travaillons ensemble.
        </h2>
        <p className="font-rajdhaniRegular text-clearColor/50 text-lg max-w-xl mx-auto mb-7">
          Bilan de forme offert de 30 min — sans engagement, par téléphone ou
          visio. On fait le point sur vos objectifs et je vous propose la formule
          adaptée.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="/contact"
            className="bg-gradient-to-br from-darkColor to-mainColor text-clearColor rounded-xl py-3 px-7 font-calSans text-lg hover:opacity-90 duration-150"
          >
            Bilan gratuit →
          </a>
          <a
            href="/services"
            className="border border-clearColor/20 text-clearColor/80 rounded-xl py-3 px-7 font-calSans text-lg hover:border-clearColor/50 duration-150"
          >
            Mes services
          </a>
        </div>
      </section>

      <Footer />
      <Analytics />
    </main>
  );
}
