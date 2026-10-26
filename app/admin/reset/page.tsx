"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Phase = "checking" | "ready" | "invalid" | "done";

export default function ResetPassword() {
  const [phase, setPhase] = useState<Phase>("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // The recovery link drops a session (via ?code / #access_token). The browser
  // client picks it up automatically; we just wait for it to land.
  useEffect(() => {
    const supabase = createClient();

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) setPhase("ready");
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setPhase("ready");
      else setTimeout(() => setPhase((p) => (p === "checking" ? "invalid" : p)), 2500);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Le mot de passe doit faire au moins 8 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError("Impossible de mettre à jour le mot de passe. Le lien a peut-être expiré.");
      return;
    }
    setPhase("done");
  }

  return (
    <main className="min-h-screen bg-mainColor flex flex-col justify-center items-center px-4">
      <div className="bg-darkColor rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">
        <h1 className="font-calSans text-2xl text-clearColor text-center">Nouveau mot de passe</h1>

        {phase === "checking" && (
          <p className="font-rajdhaniRegular text-clearColor/70 text-center">Vérification du lien…</p>
        )}

        {phase === "invalid" && (
          <>
            <p className="font-rajdhaniRegular text-clearColor/80 text-center">
              Ce lien de réinitialisation est invalide ou a expiré.
            </p>
            <Link href="/admin/login" className="text-clearColor underline text-center font-rajdhaniRegular">
              Demander un nouveau lien
            </Link>
          </>
        )}

        {phase === "ready" && (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              required
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg px-3 py-2 font-rajdhaniRegular outline-none"
            />
            <input
              type="password"
              required
              placeholder="Confirmer le mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="rounded-lg px-3 py-2 font-rajdhaniRegular outline-none"
            />
            {error && <p className="text-red-400 text-sm font-rajdhaniRegular">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-clearColor text-darkColor rounded-lg py-2 font-calSans hover:bg-mainColor duration-150 disabled:opacity-60"
            >
              {loading ? "…" : "Enregistrer le mot de passe"}
            </button>
          </form>
        )}

        {phase === "done" && (
          <>
            <p className="font-rajdhaniRegular text-green-400 text-center">
              Mot de passe mis à jour.
            </p>
            <Link href="/admin" className="text-clearColor underline text-center font-rajdhaniRegular">
              Accéder à l'administration
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
