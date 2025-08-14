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
        emailjs.sendForm("service_brillez", "template_001", formElement, "secret-key")
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
        <div className="flex flex-col justify-center items-center h-screen bg-yellowMain">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            //onSubmit={handleSubmit}
            className="space-y-8 lg:w-1/3 w-5/6 z-20"
          >
            <input type="hidden" name="company" value="brillez" />
            <input type="hidden" name="emailCompany" value="brillez@gmail.com" />
            <div className="flex items-center justify-between lg:flex-row flex-col-reverse">
              <h3 className="text-darkColor text-4xl font-zillaSlabBold leading-none">
                une envie de briller ?
              </h3>
            </div>
            <div>
              <label
                htmlFor="fullName"
                className="block text-lg font-medium text-darkColor font-zillaSlabRegular text-2xl tracking-wide"
              >
                nom complet
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl pl-4 py-2 bg-transparent bg-dots-darkColor font-zillaSlabBold text-xl"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-darkColor font-zillaSlabRegular text-2xl tracking-wide"
              >
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl pl-4 py-2 bg-transparent bg-dots-darkColor font-zillaSlabBold text-xl"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-lg font-medium text-darkColor font-zillaSlabRegular text-2xl tracking-wide"
              >
                objet
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-2xl pl-4 py-2 bg-transparent bg-dots-darkColor font-zillaSlabBold text-xl"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-darkColor font-zillaSlabRegular text-2xl tracking-wide"
              >
                message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-2xl pl-4 py-2 bg-transparent bg-dots-darkColor font-zillaSlabBold text-xl"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-darkColor rounded-2xl py-3 text-xl font-zillaSlabBold text-yellowMain hover:bg-yellowMain duration-100 cursor-pointer hover:border border-darkColor hover:text-darkColor"
            >
              envoyer
            </button>
          </form>

          <div className="lg:w-1/3 w-5/6 z-30">
            <img
              src="/IMG_0228.webp"
              alt=""
              className="shadow-[25px_15px_0_0_#002E6D] z-30"
            />
          </div>

          <img
            src="/top-octopus.webp"
            alt=""
            className="absolute opacity-5 z-0 scale-150 top-20 lg:top-44 left-0 overflow-x-hidden"
          />
        </div>
      )}
    </>
  );
};

export default ReservationForm;
