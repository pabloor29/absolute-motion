"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Mode = "login" | "forgot";

export default function AdminLogin() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }
    // Being signed in is not enough — the account must be an absolute_motion admin.
    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (isAdmin !== true) {
      await supabase.auth.signOut();
      setError("Ce compte n'est pas autorisé à accéder à l'administration.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  async function onForgot(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setInfo("");
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset`,
    });
    setLoading(false);
    if (error) {
      setError("Impossible d'envoyer l'email. Vérifiez l'adresse.");
      return;
    }
    setInfo("Si un compte existe pour cette adresse, un email de réinitialisation vient d'être envoyé.");
  }

  return (
    <main className="min-h-screen bg-mainColor flex flex-col justify-center items-center px-4">
      <form
        onSubmit={mode === "login" ? onLogin : onForgot}
        className="bg-darkColor rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="font-calSans text-2xl text-clearColor text-center">
          {mode === "login" ? "Espace admin" : "Mot de passe oublié"}
        </h1>

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg px-3 py-2 font-rajdhaniRegular outline-none"
        />

        {mode === "login" && (
          <input
            type="password"
            required
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg px-3 py-2 font-rajdhaniRegular outline-none"
          />
        )}

        {error && <p className="text-red-400 text-sm font-rajdhaniRegular">{error}</p>}
        {info && <p className="text-green-400 text-sm font-rajdhaniRegular">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-clearColor text-darkColor rounded-lg py-2 font-calSans hover:bg-mainColor duration-150 disabled:opacity-60"
        >
          {loading
            ? "…"
            : mode === "login"
            ? "Se connecter"
            : "Envoyer le lien de réinitialisation"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "forgot" : "login");
            setError("");
            setInfo("");
          }}
          className="text-clearColor/70 text-sm font-rajdhaniRegular hover:text-clearColor duration-150"
        >
          {mode === "login" ? "Mot de passe oublié ?" : "← Retour à la connexion"}
        </button>
      </form>
    </main>
  );
}
