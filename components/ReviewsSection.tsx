import Link from "next/link";
import type { Review } from "@/lib/data";
import StarRating from "./StarRating";

type Props = {
  title: string;
  reviews: Review[];
  showAllLink?: boolean;
};

// "Pablo Ortega" → "Pablo O." (prénom + initiale du nom)
function displayName(full: string): string {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return parts[0] ?? "";
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

export default function ReviewsSection({ title, reviews, showAllLink }: Props) {
  return (
    <section className="w-full bg-gradient-to-br from-darkColor to-mainColor py-16 flex flex-col items-center">
      <h2 className="font-calSans text-3xl md:text-4xl text-clearColor mb-10 text-center px-4">{title}</h2>

      {reviews.length === 0 ? (
        <p className="font-rajdhaniRegular text-clearColor/70 px-4 text-center">
          Soyez le premier à laisser un avis !
        </p>
      ) : (
        <div className="w-3/4 md:w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <article key={r.id} className="bg-clearColor/10 backdrop-blur-sm border border-clearColor/15 text-clearColor rounded-2xl p-6 flex flex-col gap-3">
              <StarRating value={r.rating} />
              {r.title && <h3 className="font-calSans text-lg">{r.title}</h3>}
              {r.body && <p className="font-rajdhaniRegular text-sm text-clearColor/90 whitespace-pre-line">{r.body}</p>}
              <div className="mt-auto pt-2 font-rajdhaniRegular text-sm text-clearColor/70">
                — {displayName(r.author_name)} · {new Date(r.review_date).toLocaleDateString("fr-CH")}
              </div>
            </article>
          ))}
        </div>
      )}

      {showAllLink && reviews.length > 0 && (
        <Link
          href="/avis"
          className="mt-10 bg-darkColor text-clearColor rounded-2xl py-3 px-6 font-calSans hover:bg-clearColor hover:text-darkColor border-2 border-darkColor duration-150"
        >
          Voir tous les avis
        </Link>
      )}
    </section>
  );
}
