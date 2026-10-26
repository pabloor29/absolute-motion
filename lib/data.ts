import { createClient } from "./supabase/server";

export type Service = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  position: number;
  published: boolean;
};

export type Offer = {
  id: string;
  category: "presentiel" | "distance";
  icon: string;
  name: string;
  duration: string;
  price: string;
  price_unit: string;
  tagline: string;
  // Stored as newline-separated text. One feature per line.
  features: string;
  // Stored as newline-separated text. One "libellé | valeur" pair per line.
  extras: string;
  highlighted: boolean;
  badge: string;
  note: string;
  position: number;
  published: boolean;
};

export type HybridRow = {
  id: string;
  label: string;
  monthly: string;
  session_price: string;
  saving: string;
  highlighted: boolean;
  position: number;
  published: boolean;
};

export type Review = {
  id: string;
  author_name: string;
  rating: number;
  title: string;
  body: string;
  review_date: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

// Fallback copy — keeps the site rendering if the DB is unreachable or a key
// was removed. Mirrors the seeded values.
export const CONTENT_DEFAULTS: Record<string, string> = {
  hero_subtitle: "PERSONAL TRAINER",
  hero_location: "📍 Fribourg, Suisse 🇨🇭",
  home_who_title: "〽️ Qui suis-je ?",
  home_who_text:
    "Je suis Arnaud, Personal Trainer passionné par le sport et ses valeurs. Grâce à mon expérience et une approche personnalisée, je vous accompagne vers vos objectifs. Que ce soit pour vous remettre en forme, pour gagner en Force, améliorer votre Endurance, je vous accompagne vers votre Équilibre!",
  home_mission_title: "🌟 Ma mission",
  home_mission_text:
    "Avec AbsoluteMotion, je m'engage à vos côtés dans chaque étape de votre parcours. Je vous guide avec des programmes d'entraînement sur mesure, adaptés à vos besoins et à votre rythme, pour vous mener vers une version plus forte et plus équilibrée de vous-même.",
  services_intro:
    "Que vous souhaitiez améliorer vos performances sportives, retrouver la forme, ou simplement prendre soin de votre santé, je vous propose un accompagnement adapté à vos besoins et à votre rythme.\n\nGrâce à une approche personnalisée alliant coaching sportif, nutrition et bien-être, vous bénéficiez d'un suivi complet pour atteindre vos objectifs en toute confiance.\n\nDécouvrez ci-dessous l'ensemble des services proposés : du coaching individuel ou en groupe, à la remise en forme, en passant par la rééducation et le maintien en forme pour les seniors.",
  reviews_title: "Ils m'ont fait confiance",
  offers_intro:
    "Reprenez le contrôle de votre forme et dépassez-vous. Que vous souhaitiez reculer les effets du temps, vous remettre en forme ou améliorer vos performances en course à pied, trail ou triathlon, je vous accompagne avec une méthode basée sur l'équilibre, la personnalisation et un suivi adapté à chaque étape.",

  // Legal pages — editable identity of the operator. Shared across
  // /mentions-legales and /politique-de-confidentialite.
  legal_company_name: "",
  legal_legal_status: "",
  legal_address: "Fribourg, Suisse",
  legal_ide: "",
  legal_email: "absolute.motion@icloud.com",
  legal_phone: "",
  legal_publisher_name: "Arnaud",
  privacy_retention: "24 mois",
};

// Fallback offers — keep the page rendering if the DB is unreachable. Mirrors
// the seeded rows. Not used when the table is simply empty (admin removed all).
export const DEFAULT_OFFERS: Offer[] = [
  {
    id: "default-individuelle",
    category: "presentiel",
    icon: "🏋️",
    name: "Séance individuelle",
    duration: "60 minutes",
    price: "100.-",
    price_unit: "CHF / séance",
    tagline:
      "Un accompagnement complet et entièrement personnalisé pour travailler spécifiquement sur vos objectifs de forme physique. Programme adapté à chaque séance selon votre progression.",
    features: "",
    extras:
      "Forfait 5 séances (−10%) | 450.-\nForfait 10 séances (−20%) | 800.-",
    highlighted: false,
    badge: "",
    note: "",
    position: 1,
    published: true,
  },
  {
    id: "default-duo",
    category: "presentiel",
    icon: "👫",
    name: "Séance duo",
    duration: "70 minutes",
    price: "150.-",
    price_unit: "CHF / séance",
    tagline:
      "Entraînez-vous avec un·e ami·e ou un·e proche de niveau similaire. Vous bénéficiez du même suivi personnalisé qu'une séance individuelle, avec la motivation d'un binôme.",
    features: "",
    extras:
      "Forfait 5 séances (−10%) | 675.-\nForfait 10 séances (−20%) | 1200.-",
    highlighted: false,
    badge: "",
    note: "",
    position: 2,
    published: true,
  },
  {
    id: "default-smallgroup",
    category: "presentiel",
    icon: "👥",
    name: "Small group",
    duration: "70 minutes · max 5 personnes",
    price: "50.-",
    price_unit: "CHF / personne",
    tagline:
      "L'énergie du groupe sans sacrifier la personnalisation. Chaque participant bénéficie d'un programme adapté à son niveau. Idéal entre collègues, amis ou famille.",
    features: "",
    extras:
      "Groupe de 3 à 5 | 150–250 CHF\nForfaits sur demande | Contactez-moi",
    highlighted: false,
    badge: "",
    note: "",
    position: 3,
    published: true,
  },
  {
    id: "default-essentiel",
    category: "distance",
    icon: "",
    name: "Essentiel",
    duration: "",
    price: "70.-",
    price_unit: "CHF / mois",
    tagline: "L'essentiel du suivi, sans contrainte.",
    features:
      "Programme hebdomadaire | Adapté à votre emploi du temps avec feedback personnalisé\nPlateforme intervals.icu | Suivi de vos données d'entraînement en temps réel\n1 entretien visio mensuel | Bilan, ajustements, questions\nRéponse sous 48h | En jours ouvrables\nSans engagement | Résiliable à tout moment",
    extras: "Paiement trimestriel | 200.- / trimestre",
    highlighted: false,
    badge: "",
    note: "",
    position: 1,
    published: true,
  },
  {
    id: "default-complet",
    category: "distance",
    icon: "",
    name: "Complet",
    duration: "",
    price: "150.-",
    price_unit: "CHF / mois",
    tagline: "Suivi intégral, disponibilité maximale.",
    features:
      "Programme entièrement adapté | Hebdomadaire, réajusté en continu selon vos retours\nintervals.icu + Telegram + visio à la demande | Communication multi-canal sans limite\nPréparation mentale | Visualisation, gestion du stress et de la performance\nConseils nutritionnels | Adaptation alimentaire à vos objectifs et compétitions\nAppli Renfo incluse | Séances de renforcement musculaire complémentaires\nRéponse sous 6h | En heures et jours ouvrables\nSans engagement | Résiliable à tout moment",
    extras: "Paiement trimestriel | 400.- / trimestre",
    highlighted: true,
    badge: "⭐ Formule recommandée",
    note: "",
    position: 2,
    published: true,
  },
];

// Fallback hybrid rows — keep the table rendering if the DB is unreachable.
export const DEFAULT_HYBRID_ROWS: HybridRow[] = [
  { id: "default-h1", label: "Sans abonnement", monthly: "—", session_price: "100 CHF", saving: "—", highlighted: false, position: 1, published: true },
  { id: "default-h2", label: "Forfait 10 séances", monthly: "—", session_price: "80 CHF", saving: "−20 CHF", highlighted: false, position: 2, published: true },
  { id: "default-h3", label: "Essentiel", monthly: "70 CHF / mois", session_price: "70 CHF", saving: "−30 CHF", highlighted: false, position: 3, published: true },
  { id: "default-h4", label: "Complet", monthly: "150 CHF / mois", session_price: "50 CHF", saving: "−50 CHF 🔥", highlighted: true, position: 4, published: true },
];

export type ContentMap = Record<string, string>;

// A legal field is visible unless its companion `<key>_on` flag is "false".
export function isEnabled(content: ContentMap, key: string): boolean {
  return content[`${key}_on`] !== "false";
}

// Returns the trimmed value when the field is enabled and non-empty, else null
// so the caller can drop the line entirely.
export function legalField(content: ContentMap, key: string): string | null {
  if (!isEnabled(content, key)) return null;
  const v = (content[key] ?? "").trim();
  return v.length ? v : null;
}

// Public reads run as the anon role (no session) → RLS exposes only
// published services and approved reviews.
export async function getContent(): Promise<ContentMap> {
  const supabase = createClient();
  const { data } = await supabase.from("content").select("key, value");
  const map: ContentMap = { ...CONTENT_DEFAULTS };
  for (const row of data ?? []) map[row.key] = row.value;
  return map;
}

export async function getServices(): Promise<Service[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("position", { ascending: true });
  return (data as Service[]) ?? [];
}

export async function getOffers(): Promise<Offer[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("offers")
    .select("*")
    .order("position", { ascending: true });
  // null (DB unreachable) → fall back to defaults; [] (empty table) stays empty.
  return (data as Offer[] | null) ?? DEFAULT_OFFERS;
}

export async function getHybridRows(): Promise<HybridRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("hybrid_rows")
    .select("*")
    .order("position", { ascending: true });
  // null (DB unreachable) → fall back to defaults; [] (empty table) stays empty.
  return (data as HybridRow[] | null) ?? DEFAULT_HYBRID_ROWS;
}

export async function getApprovedReviews(limit?: number): Promise<Review[]> {
  const supabase = createClient();
  let query = supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("review_date", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return (data as Review[]) ?? [];
}
