import { createClient } from "@/lib/supabase/server";
import { createReviewToken, deleteReviewToken } from "../actions";
import CopyLink from "./CopyLink";

export const dynamic = "force-dynamic";

type Token = {
  id: string;
  token: string;
  label: string;
  used: boolean;
  used_at: string | null;
  expires_at: string | null;
  created_at: string;
};

function statusOf(t: Token) {
  if (t.used) return { label: "Utilisé", style: "bg-gray-200 text-gray-600" };
  if (t.expires_at && new Date(t.expires_at) < new Date())
    return { label: "Expiré", style: "bg-red-100 text-red-700" };
  return { label: "Actif", style: "bg-green-100 text-green-800" };
}

export default async function AdminLiens() {
  const supabase = createClient();
  const { data } = await supabase
    .from("review_tokens")
    .select("*")
    .order("created_at", { ascending: false });
  const tokens = (data as Token[]) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-calSans text-3xl text-darkColor">Liens d'avis</h1>
      <p className="font-rajdhaniRegular text-darkColor/70 max-w-2xl">
        Générez un lien unique et envoyez-le à un client. Il pourra laisser un avis une seule fois ;
        l'avis apparaîtra ici en attente de votre validation. Chaque lien expire après 30 jours.
      </p>

      <form action={createReviewToken} className="bg-clearColor rounded-2xl p-5 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 flex-1 min-w-[200px]">
          <span className="font-rajdhaniRegular text-xs text-darkColor/70">
            Nom du client (optionnel, pour vous y retrouver)
          </span>
          <input name="label" placeholder="Ex : Jean Dupont" className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none" />
        </label>
        <button className="bg-darkColor text-clearColor rounded-lg px-5 py-2 font-calSans hover:opacity-90 duration-150">
          Générer un lien
        </button>
      </form>

      <div className="flex flex-col gap-3">
        {tokens.length === 0 && (
          <p className="font-rajdhaniRegular text-darkColor/60">Aucun lien généré pour l'instant.</p>
        )}
        {tokens.map((t) => {
          const s = statusOf(t);
          return (
            <div key={t.id} className="bg-clearColor rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="font-calSans text-darkColor">{t.label || "Sans nom"}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-rajdhaniRegular ${s.style}`}>{s.label}</span>
                </div>
                <span className="font-rajdhaniRegular text-xs text-darkColor/50">
                  Créé le {new Date(t.created_at).toLocaleDateString("fr-CH")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {!t.used && <CopyLink token={t.token} />}
                <form action={deleteReviewToken}>
                  <input type="hidden" name="id" value={t.id} />
                  <button className="font-rajdhaniRegular text-sm text-red-600 px-2 hover:underline">Supprimer</button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
