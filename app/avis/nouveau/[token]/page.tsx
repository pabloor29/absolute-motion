import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import Link from "next/link";
import ReviewForm from "./ReviewForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Laisser un avis",
  robots: { index: false, follow: false },
};

const REASONS: Record<string, string> = {
  invalid: "Ce lien n'est pas valide.",
  used: "Un avis a déjà été déposé avec ce lien.",
  expired: "Ce lien a expiré.",
};

export default async function NewReviewPage({ params }: { params: { token: string } }) {
  const supabase = createClient();
  const { data } = await supabase.rpc("review_token_status", { p_token: params.token });
  const valid = Boolean(data?.valid);

  return (
    <main className="min-h-screen bg-mainColor flex flex-col justify-center items-center px-4 py-10 gap-6">
      <Link href="/">
        <img className="h-16" src="/img/logo/logo.webp" alt="Absolute Motion" />
      </Link>

      {valid ? (
        <ReviewForm token={params.token} />
      ) : (
        <div className="bg-darkColor rounded-2xl p-8 w-full max-w-md text-center flex flex-col gap-3">
          <h1 className="font-calSans text-2xl text-clearColor">Lien indisponible</h1>
          <p className="font-rajdhaniRegular text-clearColor/80">
            {REASONS[data?.reason as string] ?? "Ce lien n'est pas valide."}
          </p>
          <Link href="/" className="font-rajdhaniRegular text-clearColor underline">
            Retour à l'accueil
          </Link>
        </div>
      )}
    </main>
  );
}
