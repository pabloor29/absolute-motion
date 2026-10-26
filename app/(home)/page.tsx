import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import ImageCarousel from "@/components/ImageCarousel";
import Navbar from "@/components/Navbar";
import ReviewsSection from "@/components/ReviewsSection";
import { getApprovedReviews, getContent } from "@/lib/data";
import { Analytics } from "@vercel/analytics/react";

const STATS = [
  { num: "2", label: "saisons en équipe de France junior XIII" },
  { num: "29", label: "ans pilote — armée & secours héliporté" },
  { num: "45", label: "ans de pratique sportive" },
  { num: "2024", label: "Personal Trainer diplômé" },
];

const SIDE_CARDS = [
  {
    icon: "📍",
    title: "Basé à Fribourg",
    text: "Séances en plein air, en salle ou à domicile autour de Fribourg",
  },
  {
    icon: "🌐",
    title: "Coaching à distance",
    text: "Programmes structurés pour trail, cyclisme et triathlon, partout en Suisse",
  },
  {
    icon: "🏥",
    title: "Publics fragilisés",
    text: "Expérience avec les seniors, personnes en rééducation et publics spéciaux",
  },
];

const MISSION = [
  {
    icon: "🎯",
    title: "Des objectifs qui vous ressemblent",
    text: "Pas de programme standard copié-collé. Chaque plan est construit autour de vos envies, de vos contraintes et de votre niveau de départ — qu'il s'agisse de reprendre le sport, de perdre du poids ou de préparer un triathlon.",
  },
  {
    icon: "📈",
    title: "Une progression mesurable",
    text: "Je structure chaque cycle d'entraînement pour que vous voyiez — et ressentiez — l'évolution. Bilans réguliers, ajustements continus, célébration des progrès, même les petits.",
  },
  {
    icon: "🧠",
    title: "Corps et mental, ensemble",
    text: "La performance physique passe aussi par la tête. J'intègre des outils de préparation mentale — visualisation, gestion du stress, ancrage — pour vous aider à tenir dans la durée.",
  },
  {
    icon: "🤝",
    title: "À vos côtés à chaque étape",
    text: "Présent à chaque séance, disponible entre les entraînements. Avec AbsoluteMotion, vous n'êtes jamais seul face à vos objectifs — j'adapte, j'encourage, je recadre si besoin.",
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
      <section className="bg-mainColor py-8 px-6 flex flex-wrap justify-center gap-x-12 gap-y-6">
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
      </section>

      {/* ── Corps ── */}
      <div className="max-w-5xl w-full mx-auto px-6 py-16">

        {/* Intro narrative */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3">
            <Eyebrow>Qui suis-je</Eyebrow>
            <Title>Rugby, hélicoptère, et coaching — le même ADN.</Title>
            <p className="font-rajdhaniRegular text-darkColor text-lg leading-relaxed">
              Je suis Arnaud — rugbyman en équipe de France junior à XIII, pilote
              d'hélicoptère pendant une grande partie de ma vie professionnelle,
              et aujourd'hui Personal Trainer certifié Qualitop à{" "}
              <strong className="text-mainColor">Fribourg</strong>. Trois
              chapitres très différents, mais un même apprentissage : la
              performance se construit dans la durée, avec de la méthode, de
              l'engagement et une tête bien faite autant qu'un corps bien
              entraîné.
            </p>
            <p className="font-rajdhaniRegular text-darkColor text-lg leading-relaxed mt-4">
              À 53 ans, je pratique toujours — triathlon, trail, renforcement
              musculaire, hike&amp;fly. Ce que je vous propose,{" "}
              <strong className="text-mainColor">je le vis moi-même</strong>.
              J'ai créé <strong className="text-mainColor">AbsoluteMotion</strong>{" "}
              pour mettre toutes ces expériences au service d'un coaching vraiment
              personnalisé : pas de programme standard, pas de formule générique
              — juste ce qui fonctionne, pour vous, maintenant.
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

        <hr className="border-darkColor/10 my-12" />

        {/* Mission */}
        <Eyebrow>Ma mission</Eyebrow>
        <Title>Vous guider vers votre meilleur équilibre.</Title>
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

        {/* Philosophie */}
        <div className="relative overflow-hidden bg-darkColor rounded-2xl p-8 md:p-10 mt-8">
          <p className="font-calSans text-xl md:text-2xl text-clearColor leading-snug max-w-3xl">
            «&nbsp;Le sport m'a tout appris — la rigueur sur un terrain de rugby,
            la précision dans un cockpit, la résilience sur un trail.{" "}
            <span className="text-[#5b6bff]">
              Ce regard forge un coach différent.
            </span>
            &nbsp;»
          </p>
          <p className="font-rajdhaniRegular text-clearColor/50 max-w-2xl mt-4 leading-relaxed">
            Ma méthode repose sur trois piliers : personnalisation,
            progressivité, et plaisir. Dans le cockpit comme sur le terrain, j'ai
            appris que la performance durable passe par la tête autant que par le
            corps. Je vous apporte cette même exigence — adaptée à votre rythme, à
            vos objectifs, à votre vie.
          </p>
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
        <p className="font-rajdhaniRegular text-darkColor/70 max-w-2xl mb-6">
          Du rugby de haut niveau au pilotage d'hélicoptère, j'ai appris que la
          discipline, la gestion du stress et la lecture du terrain sont aussi
          importantes que la condition physique. C'est cette vision globale que
          j'apporte à chaque séance.
        </p>
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
            href="/services"
            className="bg-mainColor text-clearColor rounded-xl py-3 px-7 font-calSans text-lg hover:opacity-90 duration-150"
          >
            Voir les services
          </a>
        </div>
      </section>

      <Footer />
      <Analytics />
    </main>
  );
}
