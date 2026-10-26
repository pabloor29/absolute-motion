import CustomHeroBannerImage from '@/components/CustomHeroBannerImage'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import ServiceCard from '@/components/ServiceCard'
import { getContent, getServices } from '@/lib/data'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Services — Coaching personnel, petit groupe & nutrition',
  description:
    "Coaching personnel, coaching en petit groupe, conseil nutritionnel, préparation mentale, remise en forme et maintien en forme seniors à Fribourg avec Absolute Motion.",
  keywords: [
    'coaching personnel Fribourg',
    'coaching petit groupe',
    'conseil nutritionnel',
    'préparation mentale sportive',
    'remise en forme',
    'maintien en forme seniors',
  ],
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services — Absolute Motion',
    description:
      "Coaching personnel, petit groupe, nutrition, préparation mentale et remise en forme à Fribourg.",
    url: '/services',
  },
}

async function Services() {
  const [content, services] = await Promise.all([getContent(), getServices()])

  return (
    <>
      <Navbar />
      <CustomHeroBannerImage title="Services." img="/img/bg/bg-equilibre.webp" />

      <div className="bg-mainColor py-20 flex flex-col justify-center items-center">

        <div className="bg-darkColor rounded-xl w-3/4 md:w-1/2 mb-20">
          <p className='font-rajdhaniRegular text-clearColor p-4 whitespace-pre-line'>
            {content.services_intro}
          </p>
        </div>

        <div className="w-3/4 md:w-1/2">
          {services.map((service) => (
            <div key={service.id} className="mb-3 w-full">
              <ServiceCard
                emoji={service.emoji}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Services