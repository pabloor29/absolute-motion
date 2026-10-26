import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/lib/data";
import { deleteService, saveService } from "../actions";

export const dynamic = "force-dynamic";

function ServiceForm({ service }: { service?: Service }) {
  const isNew = !service;
  return (
    <div className="bg-clearColor rounded-2xl p-5 flex flex-col gap-3">
      <form action={saveService} className="flex flex-col gap-3">
        {service && <input type="hidden" name="id" value={service.id} />}
        <div className="flex flex-wrap gap-3">
          <label className="flex flex-col gap-1 w-20">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Emoji</span>
            <input name="emoji" defaultValue={service?.emoji ?? ""} className="rounded-lg px-2 py-2 text-center border border-darkColor/20 outline-none" />
          </label>
          <label className="flex flex-col gap-1 flex-1 min-w-[180px]">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Titre</span>
            <input name="title" required defaultValue={service?.title ?? ""} className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none" />
          </label>
          <label className="flex flex-col gap-1 w-24">
            <span className="font-rajdhaniRegular text-xs text-darkColor/70">Position</span>
            <input name="position" type="number" defaultValue={service?.position ?? 0} className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none" />
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="font-rajdhaniRegular text-xs text-darkColor/70">Description</span>
          <textarea name="description" rows={3} defaultValue={service?.description ?? ""} className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none" />
        </label>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <label className="flex items-center gap-2 font-rajdhaniRegular text-sm text-darkColor">
            <input type="checkbox" name="published" defaultChecked={service?.published ?? true} />
            Publié (visible sur le site)
          </label>
          <button className="bg-darkColor text-clearColor rounded-lg px-4 py-2 font-calSans hover:opacity-90 duration-150">
            {isNew ? "Ajouter le service" : "Enregistrer"}
          </button>
        </div>
      </form>
      {service && (
        <form action={deleteService} className="self-end">
          <input type="hidden" name="id" value={service.id} />
          <button className="text-red-600 font-rajdhaniRegular text-sm hover:underline">Supprimer</button>
        </form>
      )}
    </div>
  );
}

export default async function AdminServices() {
  const supabase = createClient();
  const { data } = await supabase.from("services").select("*").order("position", { ascending: true });
  const services = (data as Service[]) ?? [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-calSans text-3xl text-darkColor">Services</h1>

      <div className="flex flex-col gap-4">
        {services.map((s) => (
          <ServiceForm key={s.id} service={s} />
        ))}
      </div>

      <h2 className="font-calSans text-xl text-darkColor mt-4">Ajouter un service</h2>
      <ServiceForm />
    </div>
  );
}
