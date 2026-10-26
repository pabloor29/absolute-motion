import { getContent } from "@/lib/data";
import { updateContent } from "../actions";

export const dynamic = "force-dynamic";

type Field = { key: string; label: string; multiline?: boolean; toggleable?: boolean };

const SECTIONS: { title: string; description?: string; fields: Field[] }[] = [
  {
    title: "Section avis",
    fields: [{ key: "reviews_title", label: "Titre de la section" }],
  },
  {
    title: "Pages légales — informations",
    description:
      "Utilisées sur les mentions légales et la politique de confidentialité. Décochez « Afficher » pour masquer un champ sur le site.",
    fields: [
      { key: "legal_company_name", label: "Nom / raison sociale", toggleable: true },
      { key: "legal_legal_status", label: "Statut juridique", toggleable: true },
      { key: "legal_address", label: "Adresse", toggleable: true },
      { key: "legal_ide", label: "Numéro IDE", toggleable: true },
      { key: "legal_email", label: "E-mail" },
      { key: "legal_phone", label: "Téléphone", toggleable: true },
      { key: "legal_publisher_name", label: "Responsable de la publication" },
      { key: "privacy_retention", label: "Durée de conservation des messages", toggleable: true },
    ],
  },
];

export default async function AdminContenu() {
  const content = await getContent();

  return (
    <form action={updateContent} className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-calSans text-3xl text-darkColor">Contenu du site</h1>
        <button className="bg-darkColor text-clearColor rounded-lg px-5 py-2 font-calSans hover:opacity-90 duration-150">
          Enregistrer
        </button>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="bg-clearColor rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="font-calSans text-lg text-darkColor">{section.title}</h2>
          {section.description && (
            <p className="font-rajdhaniRegular text-sm text-darkColor/60 -mt-2">
              {section.description}
            </p>
          )}
          {section.fields.map((f) => (
            <label key={f.key} className="flex flex-col gap-1">
              <span className="font-rajdhaniRegular text-sm text-darkColor/70">{f.label}</span>
              {f.multiline ? (
                <textarea
                  name={`content__${f.key}`}
                  defaultValue={content[f.key] ?? ""}
                  rows={5}
                  className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none focus:border-darkColor"
                />
              ) : (
                <input
                  name={`content__${f.key}`}
                  defaultValue={content[f.key] ?? ""}
                  className="rounded-lg px-3 py-2 font-rajdhaniRegular border border-darkColor/20 outline-none focus:border-darkColor"
                />
              )}
              {f.toggleable && (
                <span className="flex items-center gap-2 font-rajdhaniRegular text-sm text-darkColor/70 mt-1">
                  {/* Hidden default keeps an "off" value in the payload when the box is unchecked. */}
                  <input type="hidden" name={`content__${f.key}_on`} value="false" />
                  <input
                    type="checkbox"
                    name={`content__${f.key}_on`}
                    value="true"
                    defaultChecked={content[`${f.key}_on`] !== "false"}
                    className="accent-darkColor"
                  />
                  Afficher sur le site
                </span>
              )}
            </label>
          ))}
        </div>
      ))}

      <button className="self-start bg-darkColor text-clearColor rounded-lg px-5 py-2 font-calSans hover:opacity-90 duration-150">
        Enregistrer
      </button>
    </form>
  );
}
