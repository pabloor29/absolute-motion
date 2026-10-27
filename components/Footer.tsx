import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-darkColor flex flex-col justify-center items-center">
      <div className="pt-10 py-8 w-full bg-darkColor flex items-center justify-center">
        <img src="/img/logo/icon-white.webp" alt="logo absolute motion" />
      </div>

      {/* Liens vers les pages légales */}
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
        href="https://www.pabloortega.fr/"
        className="text-darkColor hover:underline py-2 text-xs w-full bg-mainColor flex justify-center items-center"
      >
        © This is a PABLO ORTEGA creation - 2025
      </a>
    </footer>
  );
}

export default Footer;
