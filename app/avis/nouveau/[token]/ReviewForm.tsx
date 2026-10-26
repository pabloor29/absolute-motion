"use client";

import StarRating from "@/components/StarRating";
import { createClient } from "@/lib/supabase/client";
import React, { useState } from "react";

const ERRORS: Record<string, string> = {
  invalid: "Ce lien n'est pas valide.",
  used: "Un avis a déjà été déposé avec ce lien.",
  expired: "Ce lien a expiré.",
  bad_rating: "Merci de sélectionner une note entre 1 et 5 étoiles.",
  name_required: "Merci d'indiquer votre nom.",
};

export default function ReviewForm({ token }: { token: string }) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (rating < 1) {
      setError(ERRORS.bad_rating);
      return;
    }
    if (!name.trim()) {
      setError(ERRORS.name_required);
      return;
    }
    setStatus("sending");
    const supabase = createClient();
    const { data, error: rpcError } = await supabase.rpc("submit_review", {
      p_token: token,
      p_author_name: name,
      p_rating: rating,
      p_title: title,
      p_body: body,
    });
    if (rpcError || !data?.ok) {
      setStatus("error");
      setError(ERRORS[data?.error as string] ?? "Une erreur est survenue. Merci de réessayer.");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="bg-darkColor rounded-2xl p-8 w-full max-w-md text-center flex flex-col gap-3">
        <h1 className="font-calSans text-2xl text-clearColor">Merci ! 🙏</h1>
        <p className="font-rajdhaniRegular text-clearColor/80">
          Votre avis a bien été envoyé. Il sera publié après validation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-darkColor rounded-2xl p-8 w-full max-w-md flex flex-col gap-4">
      <h1 className="font-calSans text-2xl text-clearColor text-center">Laisser un avis</h1>

      <div className="flex flex-col items-center gap-2">
        <span className="font-rajdhaniRegular text-sm text-clearColor/70">Votre note</span>
        <StarRating value={rating} onChange={setRating} size={32} />
      </div>

      <input
        placeholder="Votre nom *"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="rounded-lg px-3 py-2 font-rajdhaniRegular outline-none"
      />
      <input
        placeholder="Titre (optionnel)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-lg px-3 py-2 font-rajdhaniRegular outline-none"
      />
      <textarea
        placeholder="Votre avis (optionnel)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={5}
        className="rounded-lg px-3 py-2 font-rajdhaniRegular outline-none"
      />

      {error && <p className="text-red-400 text-sm font-rajdhaniRegular">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-clearColor text-darkColor rounded-lg py-2 font-calSans hover:bg-mainColor duration-150 disabled:opacity-60"
      >
        {status === "sending" ? "Envoi…" : "Envoyer mon avis"}
      </button>
    </form>
  );
}
