import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-yellowMain flex flex-col justify-center items-center">
      <div className="flex flex-col lg:flex-row w-5/6 lg:justify-between justify-center items-center p-4 space-y-12 lg:space-y-0">
        <div className="lg:w-1/3 w-full text-darkColor flex flex-col items-center justify-center">
          <h1 className="font-zillaSlabBold text-3xl">
            brillez
          </h1>
          <h2 className="font-zillaSlabRegular text-xl text-center">
            "Tout le monde rêve de briller un jour"
          </h2>
        </div>

        <div className="lg:w-1/3 w-full text-darkColor flex flex-col items-center justify-center">
          <Link
            href={"/"}
            className="font-zillaSlabRegular hover:font-zillaSlabBold hover:ml-6 text-xl"
          >
            accueil
          </Link>
          <Link
            href={"/projets"}
            className="font-zillaSlabRegular hover:font-zillaSlabBold hover:ml-6 text-xl"
          >
            projets
          </Link>
          <Link
            href={"/services"}
            className="font-zillaSlabRegular hover:font-zillaSlabBold hover:ml-6 text-xl"
          >
            services
          </Link>
          <Link
            href={"/contact"}
            className="font-zillaSlabRegular hover:font-zillaSlabBold hover:ml-6 text-xl"
          >
            contact
          </Link>
        </div>

        <div className="lg:w-1/3 w-full text-darkColor flex flex-col items-center justify-center">
          <h4 className="font-zillaSlabBold text-3xl mb-3">contact</h4>
          <ul className="flex flex-row items-center justify-center gap-10">
            <li className="">
              <a href="mailto:brillez@gmail.com"><Mail /></a>
            </li>
            <li className="">
              <a href="tel:+33"><Phone /></a>
            </li>
            <li className="">
              <a href="https://www.instagram.com/brillezandco/?hl=fr"><Instagram /></a>
            </li>
            <li className="">
              <a href="https://www.facebook.com/brillezandco/?ref=_xav_ig_profile_page_web#"><Facebook /></a>
            </li>
          </ul>
        </div>

      </div>

      <a
        href="https://portfolio-pablo-teal.vercel.app/"
        className="text-yellowMain hover:underline py-2 text-xs w-full bg-darkColor flex justify-center items-center"
      >
        © This is a PABLO ORTEGA creation - 2025
      </a>
    </footer>
  );
}

export default Footer;
