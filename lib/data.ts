import { createClient } from "./supabase/server";

export type Service = {
  id: string;
  emoji: string;
  title: string;
  description: string;
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
