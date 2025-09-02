"use client";

import { ArrowBigRightDash } from "lucide-react";

function HistoryBrillez() {

  return (
    <section className="w-full z-10">

      {/* Polygon shape */}
      <div
        className="bottom-0 left-0 h-[100px] md:h-[200px] w-full bg-yellowMain" 
        style={{
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />

      {/* History - chronologicaly */}
      <div className="bg-yellowMain flex flex-row justify-center items-center pt-20">

        {/* Informations */}
        <div className="w-3/4 md:w-1/2">

          <div className="mb-20">
            <div className="">
              <div className="flex flex-row items-center mb-4">
                <ArrowBigRightDash />
                <h4 className="font-bold italic text-xl">
                  2000 - ORIGINAL SHOPPER
                </h4>
              </div>
              <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
                <img
                  src="/img/history/ORIGINAL-SHOPPER.jpg" // remplace par ton image
                  alt="HUB CLUB"
                  className="w-64 h-64 object-cover rounded-lg shadow-lg mb-8 md:mb-0 md:mr-12"
                />
                <div className="text-justify">
                  <p>
                    HUB CLUB Carcassonne fondé en 2016 par Fariol Gérome, était un établissement de nuit.
                  </p>
                  <p className="text-sm">
                    Identité visuelle by Christopher D.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="">
              <div className="flex flex-row items-center mb-4">
                <ArrowBigRightDash />
                <h4 className="font-zillaSlabBold text-2xl">
                  2016 HUB CLUB
                </h4>
              </div>
              <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
                <img
                  src="/img/history/HUB-CLUB.jpg" // remplace par ton image
                  alt="HUB CLUB"
                  className="w-64 h-64 object-cover rounded-lg shadow-lg mb-8 md:mb-0 md:mr-12"
                />
                <div className="">
                  <p>
                    HUB CLUB Carcassonne fondé en 2016 par Fariol Gérome, était un établissement de nuit.
                  </p>
                  <p className="text-sm">
                    Identité visuelle by Christopher D.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>

    </section>
  );
}

export default HistoryBrillez;
