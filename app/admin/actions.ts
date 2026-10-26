"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";

// Revalidate every public surface a piece of content can appear on.
function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/avis");
  revalidatePath("/mentions-legales");
  revalidatePath("/politique-de-confidentialite");
}

// ---------- Content ----------
export async function updateContent(formData: FormData) {
  const supabase = createClient();
  // Dedupe by key, last value wins. Toggle checkboxes emit a hidden "false"
  // before the checkbox's "true"; collapsing duplicates here both honors the
  // checkbox state and avoids a duplicate-key upsert (Postgres ON CONFLICT).
  const map = new Map<string, string>();
  Array.from(formData.entries())
    .filter(([key]) => key.startsWith("content__"))
    .forEach(([key, value]) => map.set(key.slice("content__".length), String(value)));
  const now = new Date().toISOString();
  const rows = Array.from(map, ([key, value]) => ({ key, value, updated_at: now }));
  if (rows.length) {
    await supabase.from("content").upsert(rows, { onConflict: "key" });
  }
  revalidatePath("/admin/contenu");
  revalidatePublic();
}

// ---------- Services ----------
export async function saveService(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") || "");
  const payload = {
    emoji: String(formData.get("emoji") || ""),
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    position: Number(formData.get("position") || 0),
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };
  if (!payload.title) return;
  if (id) {
    await supabase.from("services").update(payload).eq("id", id);
  } else {
    await supabase.from("services").insert(payload);
  }
  revalidatePath("/admin/services");
  revalidatePublic();
}

export async function deleteService(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") || "");
  if (id) await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
  revalidatePublic();
}

// ---------- Reviews ----------
export async function setReviewStatus(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (id && ["pending", "approved", "rejected"].includes(status)) {
    await supabase.from("reviews").update({ status }).eq("id", id);
  }
  revalidatePath("/admin/avis");
  revalidatePublic();
}

export async function deleteReview(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") || "");
  if (id) await supabase.from("reviews").delete().eq("id", id);
  revalidatePath("/admin/avis");
  revalidatePublic();
}

// ---------- Review tokens ----------
export async function createReviewToken(formData: FormData) {
  const supabase = createClient();
  const label = String(formData.get("label") || "").trim();
  const token = randomUUID().replace(/-/g, "");
  // Default validity: 30 days.
  const expires_at = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await supabase.from("review_tokens").insert({ token, label, expires_at });
  revalidatePath("/admin/liens");
}

export async function deleteReviewToken(formData: FormData) {
  const supabase = createClient();
  const id = String(formData.get("id") || "");
  if (id) await supabase.from("review_tokens").delete().eq("id", id);
  revalidatePath("/admin/liens");
}
