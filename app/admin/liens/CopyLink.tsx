"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyLink({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/avis/nouveau/${token}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-2 font-rajdhaniRegular text-sm bg-darkColor text-clearColor rounded-lg px-3 py-1 hover:opacity-90 duration-150"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Copié !" : "Copier le lien"}
    </button>
  );
}
