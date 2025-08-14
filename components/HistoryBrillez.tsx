"use client";

function HistoryBrillez() {

  return (
    <section className="w-full z-10">

      <div
        className="bottom-0 left-0 h-[100px] md:h-[200px] w-full bg-yellowMain" 
        style={{
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />

      <div className="bg-yellowMain">
        <h2 className="text-4xl font-zillaSlabBold mb-4 text-gray-800">
          Nos projets
        </h2>
        <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
          Brillez est votre agence de communication dédiée à faire rayonner
          votre marque à travers des stratégies créatives et innovantes. Nous
          transformons vos idées en expériences captivantes qui connectent
          votre audience et renforcent votre impact.
        </p>
      </div>

    </section>
  );
}

export default HistoryBrillez;
