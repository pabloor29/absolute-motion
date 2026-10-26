import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-darkColor flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row w-5/6 lg:justify-between justify-center items-center p-4 space-y-12 lg:space-y-0">
        <div className="lg:w-1/3 w-full text-clearColor flex flex-col items-center justify-center">
          <h1 className="font-calSans text-3xl">
            absolute motion
          </h1>
          <h2 className="font-rajdhaniRegular text-xl text-center">
            Personal trainer | Small group trainer
          </h2>
        </div>

        <div className="lg:w-1/3 w-full text-clearColor flex flex-col items-center justify-center">
          <Link
            href={"/"}
            className="font-calSans hover:ml-6 text-xl"
          >
            accueil
          </Link>
          <Link
            href={"/services"}
            className="font-calSans hover:ml-6 text-xl"
          >
            services
          </Link>
          <Link
            href={"/contact"}
            className="font-calSans hover:ml-6 text-xl"
          >
            contact
          </Link>
        </div>

        <div className="lg:w-1/3 w-full text-clearColor flex flex-col items-center justify-center">
          <h4 className="font-calSans text-3xl mb-3">contact</h4>
          <a 
            className="font-rajdhaniRegular mb-2 text-xl hover:underline"
            href="https://www.google.fr/maps/place/Fribourg,+Suisse/@46.8032463,7.1392126,5115m/data=!3m2!1e3!4b1!4m6!3m5!1s0x478e6ecd8d5a7d2f:0xbbe5d1f6b937c32e!8m2!3d46.8064773!4d7.1619719!16zL20vMDE1dHJi?entry=ttu&g_ep=EgoyMDI1MDkwOS4wIKXMDSoASAFQAw%3D%3D"
          >
            📍 Fribourg, Suisse 🇨🇭
          </a>
          {/* <ul className="flex flex-row items-center justify-center gap-10">
            <li className="">
              <a href="mailto:absolute.motion@icloud.com"><Mail /></a>
            </li>
            <li className="">
              <a href="tel:+41782145057"><Phone /></a>
            </li>
            <li className="">
              <a href="https://www.instagram.com/absolutemotionx/"><Instagram /></a>
            </li>
          </ul> */}
          <a 
            href="/contact"
            className="bg-mainColor px-3 rounded-xl text-xl font-calSans text-clearColor hover:bg-mainColor duration-100 cursor-pointer hover:border-2 border-darkColor hover:text-darkColor"
          >
            Me contacter
          </a>
        </div>

      </div>

      <div className="py-8 w-full bg-darkColor flex items-center justify-center">
        <img
          className=""
          src="/img/logo/icon-white.webp"
          alt="logo absolute motion"
        />
      </div>

      <nav className="w-full bg-darkColor flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pb-6 text-clearColor">
        <Link
          href={"/mentions-legales"}
          className="font-rajdhaniRegular text-sm hover:underline"
        >
          Mentions légales
        </Link>
        <Link
          href={"/politique-de-confidentialite"}
          className="font-rajdhaniRegular text-sm hover:underline"
        >
          Politique de confidentialité
        </Link>
      </nav>

      <a
        href="https://portfolio-pablo-teal.vercel.app/"
        className="text-darkColor hover:underline py-2 text-xs w-full bg-mainColor flex justify-center items-center"
      >
        © This is a PABLO ORTEGA creation - 2025
      </a>
    </footer>
  );
}

export default Footer;
