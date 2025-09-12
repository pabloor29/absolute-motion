"use client";
import { BadgeCheck } from "lucide-react";
import React, { useState , useEffect , useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";
import emailjs from "@emailjs/browser";


registerLocale("fr", fr);
setDefaultLocale("fr");

const ReservationForm = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [succeeded, setSucceeded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const formRef = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
        console.error("Le formulaire n'est pas disponible !");
        return;
    }

    const formElement = formRef.current;

    Promise.all([
        emailjs.sendForm("service_absolute_motion", "template_001", formElement, "secret-key")
    ])
    .then(() => {
        formRef.current?.reset();
        setSucceeded(true);
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi des emails :", error);
    });
  };

  return (
    <>
      {succeeded ? (
        <div className="flex flex-col lg:flex-row w-full h-screen justify-center items-center lg:space-x-3 text-darkColor">
          <BadgeCheck />
          <p className="text-xl italic text-center">
            Votre message à bien été envoyé !
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen bg-mainColor">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            //onSubmit={handleSubmit}
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
            <input type="hidden" name="company" value="absolute motion" />
            <input type="hidden" name="emailCompany" value="absolute.motion@icloud.com" />
            <div>
              <label
                htmlFor="fullName"
                className="block md:text-lg font-medium text-clearColor font-calSans text-2xl tracking-wide ml-2"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl pl-4 py-2 bg-clearColor text-darkColor font-rajdhaniRegular text-xl"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block md:text-lg font-medium text-clearColor font-calSans text-2xl tracking-wide ml-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl pl-4 py-2 bg-clearColor text-darkColor font-rajdhaniRegular text-xl"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block md:text-lg font-medium text-clearColor font-calSans text-2xl tracking-wide ml-2"
              >
                Objet
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-xl pl-4 py-2 bg-clearColor text-darkColor font-rajdhaniRegular text-xl"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block md:text-lg font-medium text-clearColor font-calSans text-2xl tracking-wide ml-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl pl-4 py-2 bg-clearColor text-darkColor font-rajdhaniRegular text-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-darkColor rounded-xl py-3 text-xl font-calSans text-clearColor hover:bg-mainColor duration-100 cursor-pointer hover:border-2 border-darkColor hover:text-darkColor"
            >
              Envoyer
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ReservationForm;
