import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import OfferCard, { OfferExtra } from '@/components/OfferCard'
import ReviewsSection from '@/components/ReviewsSection'
import {
  getApprovedReviews,
  getHybridRows,
  getOffers,
  type HybridRow,
  type Offer,
} from '@/lib/data'
import { SITE_URL } from '@/lib/seo'
import type { Metadata } from 'next'
import React from 'react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Services & Offres — Coaching, personal training et tarifs',
  description:
    "Tous les accompagnements Absolute Motion à Fribourg : personal training en individuel, duo ou small group, coaching à distance Essentiel & Complet, et la formule hybride Connect&Train à tarif préférentiel. De 50.- à 150.- CHF.",
  keywords: [
    'personal trainer Fribourg',
    'coaching petit groupe',
    'coaching à distance course à pied trail triathlon',
    'préparation mentale sportive',
    'conseil nutritionnel',
    'tarifs personal trainer Suisse',
    'formule hybride Connect&Train',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services & Offres — Absolute Motion',
    description:
      'Personal training, coaching à distance et formule hybride à Fribourg. De 50.- à 150.- CHF.',
    url: '/services',
  },
}

// "Titre | desc" lines → string[] (OfferCard sait rendre le "|")
function parseLines(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

// "Libellé | valeur" (one per line) → [{ label, value }]
function parseExtras(text: string): OfferExtra[] {
  return parseLines(text).map((line) => {
    const [label, ...rest] = line.split('|')
    return { label: label.trim(), value: rest.join('|').trim() }
  })
}

function Section({
  eyebrow,
  title,
  desc,
  id,
  children,
}: {
  eyebrow: string
  title: string
  desc?: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="w-full max-w-5xl mx-auto px-6 py-14 scroll-mt-28">
      <p className="font-rajdhaniRegular text-sm font-bold uppercase tracking-widest text-mainColor mb-2">
        {eyebrow}
      </p>
      <h2 className="font-leagueSpartan font-bold text-4xl md:text-5xl text-darkColor uppercase leading-none mb-3">
        {title}
      </h2>
      {desc && (
        <p className="font-rajdhaniRegular text-darkColor/70 text-lg max-w-3xl mb-10">
          {desc}
        </p>
      )}
      {children}
    </section>
  )
}

function hybridRowEl(r: HybridRow, last: boolean) {
  const isPlan = r.monthly.trim() !== '' && r.monthly.trim() !== '—'
  const savingShown = r.saving.trim() !== '' && r.saving.trim() !== '—'
  return (
    <tr
      key={r.id}
      className={`${r.highlighted ? 'bg-mainColor/10' : 'bg-white'} ${
        last ? '' : 'border-b border-darkColor/10'
      }`}
    >
      <td className="py-3 px-4">
        {isPlan ? (
          <span
            className={`rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${
              r.highlighted
                ? 'bg-mainColor text-clearColor'
                : 'bg-mainColor/15 text-mainColor'
            }`}
          >
            {r.label}
          </span>
        ) : (
          <span className="font-medium">{r.label}</span>
        )}
      </td>
      <td
        className={`py-3 px-4 text-center ${
          r.monthly.trim() === '—' ? 'text-darkColor/60' : ''
        }`}
      >
        {r.monthly}
      </td>
      <td className="py-3 px-4 text-center font-calSans text-mainColor">
        {r.session_price}
      </td>
      <td className="py-3 px-4 text-center">
        {savingShown ? (
          <span
            className={`rounded px-2 py-0.5 text-sm font-bold ${
              r.highlighted
                ? 'bg-green-200 text-green-800'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {r.saving}
          </span>
        ) : (
          <span className="text-darkColor/60">{r.saving || '—'}</span>
        )}
      </td>
    </tr>
  )
}

function card(o: Offer) {
  return (
    <OfferCard
      key={o.id}
      icon={o.icon || undefined}
      name={o.name}
      duration={o.duration || undefined}
      price={o.price}
      priceUnit={o.price_unit || undefined}
      tagline={o.tagline || undefined}
      features={parseLines(o.features)}
      extras={parseExtras(o.extras)}
      highlighted={o.highlighted}
      badge={o.badge || undefined}
      note={o.note || undefined}
    />
  )
}

async function Services() {
  const [offers, reviews, hybridRows] = await Promise.all([
    getOffers(),
    getApprovedReviews(6),
    getHybridRows(),
  ])
  const presentiel = offers.filter((o) => o.category === 'presentiel')
  const distance = offers.filter((o) => o.category === 'distance')

  // Données structurées : expose les offres à Google (rich results).
  const offersJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Personal training & coaching — Absolute Motion',
    serviceType: 'Personal training, coaching à distance et coaching hybride',
    areaServed: 'Fribourg, Suisse',
    provider: { '@id': `${SITE_URL}/#business` },
    offers: offers.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price.replace(/[^\d]/g, '') || undefined,
      priceCurrency: 'CHF',
    })),
  }

  return (
    <main className="bg-clearColor">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offersJsonLd) }}
      />

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-darkColor via-darkColor to-mainColor px-6 pt-32 md:pt-44 pb-20">
        <div className="max-w-5xl mx-auto">
          <p className="font-rajdhaniRegular text-sm font-bold uppercase tracking-widest text-clearColor/60 mb-4">
            Coaching &amp; Personal Training · Fribourg, Suisse 🇨🇭
          </p>
          <h1 className="font-leagueSpartan font-bold text-5xl md:text-7xl text-clearColor uppercase leading-none mb-5">
            Des services conçus pour vous.
          </h1>
          <p className="font-rajdhaniRegular text-clearColor/70 text-lg max-w-2xl mb-8">
            Coaching individuel en présentiel, suivi à distance ou formule
            hybride — chaque programme est pensé pour vos objectifs, votre
            emploi du temps et votre niveau. Basé à Fribourg, disponible partout.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#personal-training"
              className="border-2 border-clearColor/30 text-clearColor rounded-xl py-3 px-6 font-calSans text-lg hover:border-clearColor duration-150"
            >
              Personal Training
            </a>
            <a
              href="#coaching-distance"
              className="border-2 border-clearColor/30 text-clearColor rounded-xl py-3 px-6 font-calSans text-lg hover:border-clearColor duration-150"
            >
              Coaching à distance
            </a>
            <a
              href="#hybride"
              className="border-2 border-clearColor/30 text-clearColor rounded-xl py-3 px-6 font-calSans text-lg hover:border-clearColor duration-150"
            >
              Hybride
            </a>
          </div>
        </div>
      </section>

      {/* ── Personal Training ── */}
      {presentiel.length > 0 && (
        <Section
          id="personal-training"
          eyebrow="🏃 En présentiel · Fribourg"
          title="Personal Training"
          desc="Séances sur mesure en plein air, en salle ou chez vous. Chaque programme est adapté à votre condition physique, vos objectifs et votre rythme de vie — que vous repreniez le sport après un arrêt ou que vous prépariez une compétition."
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {presentiel.map(card)}
          </div>
          <div className="mt-8 bg-white border border-darkColor/10 border-l-4 border-l-mainColor rounded-r-xl p-4 font-rajdhaniRegular text-darkColor/80">
            <strong className="text-darkColor">📝 Note :</strong> les forfaits 5
            séances s'utilisent en 3 mois maximum, les forfaits 10 séances en 6
            mois. Des formules adaptées peuvent être composées sur demande.
          </div>
        </Section>
      )}

      <hr className="border-darkColor/10 max-w-5xl mx-auto" />

      {/* ── Coaching à distance ── */}
      {distance.length > 0 && (
        <Section
          id="coaching-distance"
          eyebrow="💻 En ligne · Partout en Suisse"
          title="Coaching à distance"
          desc="Suivi personnalisé structuré autour de la marche active, la course à pied, le trail, le cyclisme et le triathlon. Programme hebdomadaire ajusté en continu, préparation mentale et conseils nutritionnels."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {distance.map(card)}
          </div>
        </Section>
      )}

      <hr className="border-darkColor/10 max-w-5xl mx-auto" />

      {/* ── Hybride Connect&Train ── */}
      <Section
        id="hybride"
        eyebrow="🚀 Hybride · Le meilleur des deux"
        title="Connect&Train"
        desc="Combinez le suivi continu à distance avec des séances en présentiel à Fribourg à tarif préférentiel. Plus votre abonnement est complet, plus le prix de chaque séance individuelle baisse."
      >
        <div className="bg-gradient-to-br from-darkColor to-mainColor rounded-2xl p-8 mb-6">
          <h3 className="font-leagueSpartan font-bold text-2xl md:text-3xl text-clearColor uppercase leading-tight mb-3">
            🎯 Connectez-vous.
            <br />
            Dépassez vos limites.
          </h3>
          <p className="font-rajdhaniRegular text-clearColor/70 max-w-2xl mb-5">
            La formule hybride Connect&Train offre un suivi digital hebdomadaire
            renforcé par des séances de Personal Training à tarifs exclusifs
            réservés aux abonnés. Un système conçu pour maximiser votre
            progression — et vos économies.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              '📊 Programme hebdomadaire',
              '💰 Tarifs dégressifs',
              '🏃 Présentiel + distance',
              '📍 Fribourg',
            ].map((chip) => (
              <span
                key={chip}
                className="font-rajdhaniRegular text-sm text-clearColor/85 bg-clearColor/10 border border-clearColor/20 rounded-full px-3 py-1"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-darkColor/10">
          <table className="w-full border-collapse text-darkColor min-w-[520px]">
            <thead>
              <tr className="bg-white text-darkColor/50">
                <th className="text-left font-rajdhaniRegular text-xs uppercase tracking-wider py-3 px-4 border-b border-darkColor/10">
                  Formule
                </th>
                <th className="font-rajdhaniRegular text-xs uppercase tracking-wider py-3 px-4 border-b border-darkColor/10">
                  Abonnement mensuel
                </th>
                <th className="font-rajdhaniRegular text-xs uppercase tracking-wider py-3 px-4 border-b border-darkColor/10">
                  Séance individuelle (60 min)
                </th>
                <th className="font-rajdhaniRegular text-xs uppercase tracking-wider py-3 px-4 border-b border-darkColor/10">
                  Économie vs. standard
                </th>
              </tr>
            </thead>
            <tbody className="font-rajdhaniRegular">
              {hybridRows.map((r, i) =>
                hybridRowEl(r, i === hybridRows.length - 1)
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-white border border-darkColor/10 border-l-4 border-l-mainColor rounded-r-xl p-4 font-rajdhaniRegular text-darkColor/80">
          <strong className="text-darkColor">📌 Condition d'accès :</strong> les
          tarifs préférentiels hybrides sont réservés aux abonnés actifs (formule
          Essentiel ou Complet). En cas de suspension de l'abonnement, le tarif
          standard (100 CHF / séance) s'applique aux séances restantes.
        </div>
      </Section>

      {/* ── Témoignages ── */}
      <ReviewsSection title="Ce que disent mes clients" reviews={reviews} showAllLink />

      {/* ── CTA finale ── */}
      <section id="contact" className="bg-darkColor px-6 py-20 text-center">
        <h2 className="font-leagueSpartan font-bold text-4xl md:text-6xl text-clearColor uppercase leading-none mb-4">
          Prêt à commencer ?
        </h2>
        <p className="font-rajdhaniRegular text-clearColor/60 text-lg max-w-xl mx-auto mb-8">
          Bilan de forme offert de 30 min — sans engagement, par téléphone ou
          visio. On fait le point ensemble sur vos objectifs et la formule la
          plus adaptée.
        </p>
        <div className="flex justify-center">
          <a
            href="/contact"
            className="bg-gradient-to-br from-darkColor to-mainColor text-clearColor rounded-xl py-3 px-7 font-calSans text-lg hover:opacity-90 duration-150"
          >
            Me contacter →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Services
