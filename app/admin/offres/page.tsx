import { createClient } from "@/lib/supabase/server";
import type { HybridRow, Offer } from "@/lib/data";
import {
  deleteHybridRow,
  deleteOffer,
  saveHybridRow,
  saveOffer,
} from "../actions";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<Offer["category"], string> = {
  presentiel: "Personal training (présentiel)",
  distance: "Coaching à distance",
};

// Champ éditable qui se fond dans la carte sombre (bordure pointillée discrète).
const field =
  "bg-transparent border border-dashed border-clearColor/25 rounded-md px-2 py-1 outline-none focus:border-mainColor focus:bg-clearColor/10 text-clearColor placeholder-clearColor/35 w-full";
const caption = "font-rajdhaniRegular text-[11px] uppercase tracking-wide text-clearColor/45";

function OfferForm({ offer }: { offer?: Offer }) {
  const isNew = !offer;
  const featureRows = Math.max(3, offer?.features?.split("\n").length ?? 0);
  const extraRows = Math.max(2, offer?.extras?.split("\n").length ?? 0);

  return (
    <div className="rounded-2xl overflow-hidden border border-darkColor/10 shadow-sm">
      <form action={saveOffer}>
        {offer && <input type="hidden" name="id" value={offer.id} />}

        {/* Réglages (non visibles sur la carte client) */}
        <div className="bg-clearColor flex flex-wrap items-end gap-4 p-3 border-b border-darkColor/10">
          <label className="flex flex-col gap-1 min-w-[190px]">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Catégorie</span>
            <select
              name="category"
              defaultValue={offer?.category ?? "presentiel"}
              className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none bg-white"
            >
              <option value="presentiel">Personal training (présentiel)</option>
              <option value="distance">Coaching à distance</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 w-24">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Position</span>
            <input
              name="position"
              type="number"
              defaultValue={offer?.position ?? 0}
              className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none"
            />
          </label>
          <label className="flex items-center gap-2 font-rajdhaniRegular text-sm text-darkColor py-2">
            <input type="checkbox" name="highlighted" defaultChecked={offer?.highlighted ?? false} />
            Mettre en avant
          </label>
          <label className="flex items-center gap-2 font-rajdhaniRegular text-sm text-darkColor py-2">
            <input type="checkbox" name="published" defaultChecked={offer?.published ?? true} />
            Publié
          </label>
        </div>

        {/* Aperçu éditable — identique à la carte côté client */}
        <div
          className={`relative bg-darkColor text-clearColor p-6 flex flex-col ${
            offer?.highlighted ? "ring-2 ring-inset ring-mainColor" : ""
          }`}
        >
          {/* Badge (pastille en haut, affichée sur le site si mise en avant) */}
          <input
            name="badge"
            defaultValue={offer?.badge ?? ""}
            placeholder="⭐ Badge (si mise en avant)"
            className={`${field} text-center font-calSans text-sm bg-mainColor/30 border-mainColor/40 w-auto mx-auto mb-3 px-4`}
          />

          <div className="text-center flex flex-col items-center gap-1">
            <input
              name="icon"
              defaultValue={offer?.icon ?? ""}
              placeholder="🏋️"
              className={`${field} text-center text-4xl w-20`}
            />
            <input
              name="name"
              required
              defaultValue={offer?.name ?? ""}
              placeholder="Nom de l'offre"
              className={`${field} text-center font-calSans text-2xl`}
            />
            <div className="flex items-center justify-center gap-1 w-full">
              <span className="text-clearColor/60 text-sm">⏱</span>
              <input
                name="duration"
                defaultValue={offer?.duration ?? ""}
                placeholder="durée (optionnel)"
                className={`${field} text-center text-sm uppercase tracking-wide text-clearColor/70 max-w-[240px]`}
              />
            </div>
            <textarea
              name="tagline"
              rows={2}
              defaultValue={offer?.tagline ?? ""}
              placeholder="Accroche / description sous le titre"
              className={`${field} text-center text-base text-clearColor/80 resize-y mt-2`}
            />
          </div>

          <div className="flex items-baseline justify-center gap-2 mt-4 mb-5">
            <input
              name="price"
              defaultValue={offer?.price ?? ""}
              placeholder="100.-"
              className={`${field} text-center font-calSans text-4xl w-32`}
            />
            <input
              name="price_unit"
              defaultValue={offer?.price_unit ?? ""}
              placeholder="CHF / séance"
              className={`${field} text-center text-base text-clearColor/70 w-40`}
            />
          </div>

          {/* Points inclus */}
          <div className="flex flex-col gap-1 mb-4">
            <span className={caption}>✓ Points inclus — 1 ligne = «&nbsp;Titre | description&nbsp;»</span>
            <textarea
              name="features"
              rows={featureRows}
              defaultValue={offer?.features ?? ""}
              placeholder={"Programme hebdomadaire | Adapté à votre emploi du temps\n1 entretien visio mensuel | Bilan, ajustements, questions"}
              className={`${field} font-rajdhaniRegular text-base resize-y`}
            />
          </div>

          {/* Forfaits / options */}
          <div className="flex flex-col gap-1 pt-4 border-t border-clearColor/20">
            <span className={caption}>Forfaits / options — 1 ligne = «&nbsp;libellé | valeur&nbsp;»</span>
            <textarea
              name="extras"
              rows={extraRows}
              defaultValue={offer?.extras ?? ""}
              placeholder={"Forfait 5 séances (−10%) | 450.-\nForfait 10 séances (−20%) | 800.-"}
              className={`${field} font-rajdhaniRegular text-base resize-y`}
            />
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1 mt-4">
            <span className={caption}>Note en bas de carte (optionnel)</span>
            <input
              name="note"
              defaultValue={offer?.note ?? ""}
              placeholder="ex. conditions particulières"
              className={`${field} text-center text-sm text-clearColor/70`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="bg-clearColor flex items-center justify-end p-3 border-t border-darkColor/10">
          <button className="bg-darkColor text-clearColor rounded-lg px-5 py-2 font-calSans hover:opacity-90 duration-150">
            {isNew ? "Ajouter l'offre" : "Enregistrer"}
          </button>
        </div>
      </form>

      {offer && (
        <form action={deleteOffer} className="bg-clearColor flex justify-end px-3 pb-3 -mt-1">
          <input type="hidden" name="id" value={offer.id} />
          <button className="text-red-600 font-rajdhaniRegular text-sm hover:underline">
            Supprimer cette offre
          </button>
        </form>
      )}
    </div>
  );
}

function HybridRowForm({ row }: { row?: HybridRow }) {
  const isNew = !row;
  const cell =
    "rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none focus:border-mainColor w-full";
  return (
    <div className="rounded-xl border border-darkColor/10 overflow-hidden shadow-sm">
      <form action={saveHybridRow} className="bg-white p-4 flex flex-col gap-3">
        {row && <input type="hidden" name="id" value={row.id} />}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <label className="flex flex-col gap-1">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Formule</span>
            <input name="label" required defaultValue={row?.label ?? ""} placeholder="Essentiel" className={cell} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Abonnement mensuel</span>
            <input name="monthly" defaultValue={row?.monthly ?? ""} placeholder="70 CHF / mois ou —" className={cell} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Prix séance (60 min)</span>
            <input name="session_price" defaultValue={row?.session_price ?? ""} placeholder="70 CHF" className={cell} />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Économie vs standard</span>
            <input name="saving" defaultValue={row?.saving ?? ""} placeholder="−30 CHF ou —" className={cell} />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex flex-col gap-1 w-24">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Position</span>
            <input name="position" type="number" defaultValue={row?.position ?? 0} className={cell} />
          </label>
          <label className="flex items-center gap-2 font-rajdhaniRegular text-sm text-darkColor pt-5">
            <input type="checkbox" name="highlighted" defaultChecked={row?.highlighted ?? false} />
            Ligne mise en avant
          </label>
          <label className="flex items-center gap-2 font-rajdhaniRegular text-sm text-darkColor pt-5">
            <input type="checkbox" name="published" defaultChecked={row?.published ?? true} />
            Publiée
          </label>
          <button className="ml-auto bg-darkColor text-clearColor rounded-lg px-5 py-2 font-calSans hover:opacity-90 duration-150">
            {isNew ? "Ajouter la ligne" : "Enregistrer"}
          </button>
        </div>
      </form>
      {row && (
        <form action={deleteHybridRow} className="bg-white flex justify-end px-4 pb-3 -mt-1">
          <input type="hidden" name="id" value={row.id} />
          <button className="text-red-600 font-rajdhaniRegular text-sm hover:underline">
            Supprimer cette ligne
          </button>
        </form>
      )}
    </div>
  );
}

export default async function AdminOffers() {
  const supabase = createClient();
  const [{ data: offersData }, { data: hybridData }] = await Promise.all([
    supabase
      .from("offers")
      .select("*")
      .order("category", { ascending: true })
      .order("position", { ascending: true }),
    supabase
      .from("hybrid_rows")
      .select("*")
      .order("position", { ascending: true }),
  ]);
  const offers = (offersData as Offer[]) ?? [];
  const hybridRows = (hybridData as HybridRow[]) ?? [];

  const groups: Offer["category"][] = ["presentiel", "distance"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-calSans text-3xl text-darkColor">Services &amp; offres</h1>
        <p className="font-rajdhaniRegular text-darkColor/70 mt-1">
          Chaque carte s'affiche comme sur la page « Services », mais tous les
          champs sont modifiables ici. Le tableau de la formule hybride, les
          témoignages et les conditions restent gérés dans le code.
        </p>
      </div>

      {groups.map((group) => (
        <div key={group} className="flex flex-col gap-4">
          <h2 className="font-calSans text-xl text-darkColor">{CATEGORY_LABELS[group]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {offers
              .filter((o) => o.category === group)
              .map((o) => (
                <OfferForm key={o.id} offer={o} />
              ))}
          </div>
        </div>
      ))}

      <h2 className="font-calSans text-xl text-darkColor mt-4">Ajouter une offre</h2>
      <div className="md:max-w-md">
        <OfferForm />
      </div>

      {/* Formule hybride — Connect&Train */}
      <div className="mt-6 pt-6 border-t border-darkColor/10 flex flex-col gap-4">
        <div>
          <h2 className="font-calSans text-xl text-darkColor">
            Formule hybride — Connect&amp;Train
          </h2>
          <p className="font-rajdhaniRegular text-darkColor/70 mt-1">
            Les lignes du tableau de tarifs dégressifs affiché sur la page
            « Services ». Une ligne par niveau d'abonnement.
          </p>
        </div>

        {hybridRows.map((r) => (
          <HybridRowForm key={r.id} row={r} />
        ))}

        <h3 className="font-calSans text-lg text-darkColor mt-2">Ajouter une ligne</h3>
        <HybridRowForm />
      </div>
    </div>
  );
}
