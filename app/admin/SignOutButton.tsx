"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handle() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="font-rajdhaniRegular text-sm bg-clearColor/20 hover:bg-clearColor/30 rounded-lg px-3 py-1 duration-150 disabled:opacity-60"
    >
      {loading ? "…" : "Déconnexion"}
    </button>
  );
}
