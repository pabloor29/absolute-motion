import CustomHeroBannerImage from '@/components/CustomHeroBannerImage'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ServiceCard from '@/components/ServiceCard'
import React from 'react'

function Services() {
  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Mes services" img="/img/bg/bg-coach.webp" />

      <div className="bg-mainColor py-20 flex flex-col justify-center items-center">

        <div className="bg-darkColor rounded-xl w-3/4 md:w-1/2 mb-20">
          <p className='font-rajdhaniRegular text-clearColor p-4'>
            Que vous souhaitiez améliorer vos performances sportives, retrouver la forme, ou simplement prendre soin de votre santé, je vous propose un accompagnement adapté à vos besoins et à votre rythme.
            <br />
            <br />
            Grâce à une approche personnalisée alliant coaching sportif, nutrition et bien-être, vous bénéficiez d’un suivi complet pour atteindre vos objectifs en toute confiance.
            <br />
            <br />
            Découvrez ci-dessous l’ensemble des services proposés : du coaching individuel ou en groupe, à la remise en forme, en passant par la rééducation et le maintien en forme pour les seniors.
          </p>
        </div>

        <div className="w-3/4 md:w-1/2">
          <div className="">
            <ServiceCard
              emoji="🍎"
              title="Conseil nutritionnel"
              description="Un suivi alimentaire adapté à vos objectifs : perte de poids, équilibre de vie, prise de masse."
            />
          </div>
        </div>

        <div className="w-1/2 h-0 md:h-1 bg-darkColor my-10 rounded-full"></div>

        <div className="w-3/4 md:w-1/2">
          <div className="mb-3">
            <ServiceCard
              emoji="🏋️"
              title="Coaching personnel"
              description="Un accompagnement totalement personnalisé, adapté à votre rythme et à vos objectifs personnels. Idéal si vous voulez un suivi précis et une progression rapide."
            />
          </div>
          <div className="mb-3">
            <ServiceCard
              emoji="⚽️"
              title="Coaching en petit groupe"
              description="Des séances motivantes à plusieurs, pour progresser ensemble tout en bénéficiant d’un encadrement professionnel. Parfait pour garder la motivation et partager l’effort."
            />
          </div>
        </div>

        <div className="w-1/2 h-0 md:h-1 bg-darkColor my-10 rounded-full"></div>

        <div className="w-3/4 md:w-1/2">
          <div className="mb-3">
            <ServiceCard
              emoji="🤸"
              title="Multi-sports"
              description="Du fitness au running, en passant par la musculation et les sports de plein air."
            />
          </div>
        </div>

        <div className="w-1/2 h-0 md:h-1 bg-darkColor my-10 rounded-full"></div>

        <div className="w-3/4 md:w-1/2">
          <div className="mb-3">
            <ServiceCard
              emoji="🩺"
              title="Rééducation"
              description="Un accompagnement progressif après blessure ou opération, en lien avec vos professionnels de santé."
            />
          </div>
          <div className="mb-3">
            <ServiceCard
              emoji="🔄"
              title="Remise en forme"
              description="Reprendre une activité physique de manière douce et efficace."
            />
          </div>
          <div className="mb-3">
            <ServiceCard
              emoji="👵"
              title="Maintien en forme"
              description="Des exercices adaptés pour conserver mobilité, équilibre et tonus au quotidien."
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Services