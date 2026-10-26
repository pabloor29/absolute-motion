"use client";

import { createClient } from "@/lib/supabase/client";
import React, { useState } from "react";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setDone(false);
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
      setError("Échec de la mise à jour du mot de passe.");
      return;
    }
    setDone(true);
    setPassword("");
    setConfirm("");
  }

  return (
    <form onSubmit={onSubmit} className="bg-clearColor rounded-2xl p-6 flex flex-col gap-3 max-w-md">
      <h2 className="font-calSans text-lg text-darkColor">Changer mon mot de passe</h2>
      <input
        type="password"
        required
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none focus:border-darkColor"
      />
      <input
        type="password"
        required
        placeholder="Confirmer le mot de passe"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none focus:border-darkColor"
      />
      {error && <p className="text-red-600 text-sm font-rajdhaniRegular">{error}</p>}
      {done && <p className="text-green-700 text-sm font-rajdhaniRegular">Mot de passe mis à jour.</p>}
      <button
        type="submit"
        disabled={loading}
        className="self-start bg-darkColor text-clearColor rounded-lg px-5 py-2 font-calSans hover:opacity-90 duration-150 disabled:opacity-60"
      >
        {loading ? "…" : "Mettre à jour"}
      </button>
    </form>
  );
}
