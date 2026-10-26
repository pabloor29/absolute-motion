"use client";
import { BadgeCheck, MapPin, Send } from "lucide-react";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Zone",
    value: "Fribourg & région, Suisse",
    href: "https://www.google.com/maps/place/Fribourg,+Suisse",
  },
];

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setFailed(false);

    emailjs
      .sendForm(
        "service_absolute_motion",
        "template_001",
        formRef.current,
        "VzCUw7Umfv7hVyLId"
      )
      .then(() => {
        formRef.current?.reset();
        setSucceeded(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi :", error);
        setFailed(true);
      })
      .finally(() => setSending(false));
  };

  const fieldClass =
    "w-full rounded-xl border border-darkColor/15 px-4 py-3 bg-clearColor/40 text-darkColor font-rajdhaniRegular text-lg outline-none focus:bg-white focus:border-mainColor duration-150";
  const labelClass =
    "block font-rajdhaniRegular text-sm font-semibold uppercase tracking-wide text-darkColor/60 mb-1.5 ml-1";

  return (
    <section className="bg-clearColor px-6 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {succeeded ? (
          <div className="bg-darkColor rounded-2xl p-10 md:p-16 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-mainColor/20 flex items-center justify-center mb-5">
              <BadgeCheck className="w-8 h-8 text-clearColor" />
            </div>
            <h2 className="font-leagueSpartan font-bold text-3xl md:text-4xl text-clearColor uppercase mb-3">
              Message envoyé !
            </h2>
            <p className="font-rajdhaniRegular text-clearColor/70 text-lg max-w-md mb-7">
              Merci — je reviens vers vous au plus vite pour faire le point sur
              vos objectifs.
            </p>
            <button
              onClick={() => setSucceeded(false)}
              className="bg-mainColor text-clearColor rounded-xl py-3 px-7 font-calSans text-lg hover:opacity-90 duration-150"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch">
            {/* Panneau infos */}
            <div className="md:col-span-2 bg-darkColor rounded-2xl p-8 text-clearColor flex flex-col">
              <p className="font-rajdhaniRegular text-sm font-bold uppercase tracking-widest text-[#6b7cff] mb-3">
                Contact
              </p>
              <h2 className="font-leagueSpartan font-bold text-3xl md:text-4xl text-clearColor uppercase leading-none mb-4">
                Parlons de vos objectifs.
              </h2>
              <p className="font-rajdhaniRegular text-clearColor/60 leading-relaxed mb-8">
                Une question, un projet ou envie d'un bilan de forme offert de
                30 min ? Écrivez-moi, je réponds rapidement.
              </p>

              <div className="flex flex-col gap-4 mt-auto">
                {CONTACT_DETAILS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <a
                      key={d.label}
                      href={d.href}
                      className="flex items-center gap-3 group"
                    >
                      <span className="w-10 h-10 rounded-xl bg-clearColor/10 flex items-center justify-center shrink-0 group-hover:bg-mainColor duration-150">
                        <Icon className="w-5 h-5 text-clearColor" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-rajdhaniRegular text-xs uppercase tracking-wide text-clearColor/50">
                          {d.label}
                        </span>
                        <span className="font-rajdhaniRegular text-clearColor group-hover:text-[#7c89ff] duration-150">
                          {d.value}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Formulaire */}
            <div className="md:col-span-3 bg-white border border-darkColor/10 rounded-2xl p-6 md:p-8 shadow-sm">
              <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5">
                <input type="hidden" name="company" value="absolute motion" />
                <input
                  type="hidden"
                  name="emailCompany"
                  value="absolute.motion@icloud.com"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={fieldClass}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClass}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    Objet
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                {failed && (
                  <p className="font-rajdhaniRegular text-red-600 text-sm">
                    L'envoi a échoué. Réessayez ou écrivez-moi directement par
                    e-mail.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-mainColor rounded-xl py-3.5 text-lg font-calSans text-clearColor hover:opacity-90 duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {sending ? "Envoi…" : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReservationForm;
