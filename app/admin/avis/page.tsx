import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/lib/data";
import StarRating from "@/components/StarRating";
import { deleteReview, setReviewStatus } from "../actions";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<Review["status"], string> = {
  pending: "En attente",
  approved: "Publié",
  rejected: "Rejeté",
};
const STATUS_STYLE: Record<Review["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-gray-200 text-gray-600",
};

function StatusButton({ id, status, label }: { id: string; status: string; label: string }) {
  return (
    <form action={setReviewStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button className="font-rajdhaniRegular text-sm bg-darkColor text-clearColor rounded-lg px-3 py-1 hover:opacity-90 duration-150">
        {label}
      </button>
    </form>
  );
}

function ReviewCard({ r }: { r: Review }) {
  return (
    <div className="bg-clearColor rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <StarRating value={r.rating} />
            <span className={`rounded-full px-2 py-0.5 text-xs font-rajdhaniRegular ${STATUS_STYLE[r.status]}`}>
              {STATUS_LABEL[r.status]}
            </span>
          </div>
          <span className="font-calSans text-darkColor">
            {r.author_name}
            <span className="font-rajdhaniRegular text-darkColor/60 text-sm">
              {" "}· {new Date(r.review_date).toLocaleDateString("fr-CH")}
            </span>
          </span>
        </div>
      </div>
      {r.title && <p className="font-calSans text-darkColor">{r.title}</p>}
      {r.body && <p className="font-rajdhaniRegular text-darkColor/80 whitespace-pre-line">{r.body}</p>}
      <div className="flex gap-2 flex-wrap">
        {r.status !== "approved" && <StatusButton id={r.id} status="approved" label="Valider" />}
        {r.status !== "rejected" && <StatusButton id={r.id} status="rejected" label="Rejeter" />}
        {r.status !== "pending" && <StatusButton id={r.id} status="pending" label="Remettre en attente" />}
        <form action={deleteReview}>
          <input type="hidden" name="id" value={r.id} />
          <button className="font-rajdhaniRegular text-sm text-red-600 rounded-lg px-3 py-1 hover:underline">
            Supprimer
          </button>
        </form>
      </div>
    </div>
  );
}

export default async function AdminAvis() {
  const supabase = createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("status", { ascending: true }) // pending < rejected ... then sort below
    .order("created_at", { ascending: false });
  const reviews = (data as Review[]) ?? [];

  const pending = reviews.filter((r) => r.status === "pending");
  const others = reviews.filter((r) => r.status !== "pending");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-calSans text-3xl text-darkColor">Avis clients</h1>

      <section className="flex flex-col gap-3">
        <h2 className="font-calSans text-lg text-darkColor">
          En attente {pending.length > 0 && <span className="text-yellow-600">({pending.length})</span>}
        </h2>
        {pending.length === 0 ? (
          <p className="font-rajdhaniRegular text-darkColor/60">Aucun avis en attente.</p>
        ) : (
          pending.map((r) => <ReviewCard key={r.id} r={r} />)
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-calSans text-lg text-darkColor">Publiés / rejetés</h2>
        {others.length === 0 ? (
          <p className="font-rajdhaniRegular text-darkColor/60">Aucun avis pour l'instant.</p>
        ) : (
          others.map((r) => <ReviewCard key={r.id} r={r} />)
        )}
      </section>
    </div>
  );
}
