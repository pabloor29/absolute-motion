import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import ChangePasswordForm from "./ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const supabase = createClient();

  const [{ count: pending }, { count: services }, { count: approved }] = await Promise.all([
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }).eq("status", "approved"),
  ]);

  const cards = [
    { label: "Avis en attente", value: pending ?? 0, href: "/admin/avis", highlight: (pending ?? 0) > 0 },
    { label: "Avis publiés", value: approved ?? 0, href: "/admin/avis", highlight: false },
    { label: "Services", value: services ?? 0, href: "/admin/services", highlight: false },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-calSans text-3xl text-darkColor">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`rounded-2xl p-6 flex flex-col gap-2 duration-150 hover:scale-[1.02] ${
              c.highlight ? "bg-darkColor text-clearColor ring-2 ring-yellow-400" : "bg-darkColor text-clearColor"
            }`}
          >
            <span className="font-rajdhaniRegular text-sm opacity-80">{c.label}</span>
            <span className="font-calSans text-4xl">{c.value}</span>
          </Link>
        ))}
      </div>
      <div className="bg-clearColor rounded-2xl p-6 font-rajdhaniRegular text-darkColor">
        <p className="mb-2">Depuis cet espace vous pouvez :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link href="/admin/contenu" className="underline">Modifier les textes et titres</Link> du site.</li>
          <li><Link href="/admin/services" className="underline">Gérer les services</Link> (ajouter / modifier / supprimer).</li>
          <li><Link href="/admin/avis" className="underline">Modérer les avis clients</Link> (valider / rejeter / supprimer).</li>
          <li><Link href="/admin/liens" className="underline">Générer un lien d'avis</Link> à envoyer à un client.</li>
        </ul>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
