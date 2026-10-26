import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";
import SignOutButton from "./SignOutButton";

const navLinks = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/contenu", label: "Contenu" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/avis", label: "Avis" },
  { href: "/admin/liens", label: "Liens d'avis" },
];

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user ? (await supabase.rpc("is_admin")).data === true : false;

  // Login page / unauthorized users render without the admin chrome.
  if (!isAdmin) return <>{children}</>;

  return (
    <div className="min-h-screen bg-mainColor">
      <header className="bg-darkColor text-clearColor">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap gap-4 font-calSans">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-mainColor duration-150">
                {l.label}
              </Link>
            ))}
          </nav>
          <SignOutButton />
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
