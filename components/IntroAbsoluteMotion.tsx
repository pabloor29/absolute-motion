import React from 'react'

type IntroProps = {
  whoTitle?: string
  whoText?: string
  missionTitle?: string
  missionText?: string
}

function IntroAbsoluteMotion({
  whoTitle = '〽️ Qui suis-je ?',
  whoText = "Je suis Arnaud, Personal Trainer passionné par le sport et ses valeurs. Grâce à mon expérience et une approche personnalisée, je vous accompagne vers vos objectifs. Que ce soit pour vous remettre en forme, pour gagner en Force, améliorer votre Endurance, je vous accompagne vers votre Équilibre!",
  missionTitle = '🌟 Ma mission',
  missionText = "Avec AbsoluteMotion, je m'engage à vos côtés dans chaque étape de votre parcours. Je vous guide avec des programmes d'entraînement sur mesure, adaptés à vos besoins et à votre rythme, pour vous mener vers une version plus forte et plus équilibrée de vous-même.",
}: IntroProps) {
  return (
    <section className='bg-mainColor flex justify-center items-center py-10'>
        <div className="w-3/4 flex flex-col md:flex-row gap-8 md:gap-16 justify-center">
            <div className="bg-darkColor text-clearColor p-4 rounded-xl md:w-1/2">
                <div className="">
                    <h3 className='text-center font-calSans text-xl md:text-2xl mb-4'>
                        {whoTitle}
                    </h3>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="">
                        <p className='text-justify font-rajdhaniRegular text-base whitespace-pre-line'>
                            {whoText}
                        </p>
                    </div>
                    <div className="">
                        <img
                            className='grayscale rounded-xl'
                            src="/img/intro/profile-coach.webp"
                            alt="Arnaud, personal trainer Absolute Motion à Fribourg"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-darkColor text-clearColor p-4 rounded-xl md:w-1/4">
                <h3 className='text-center font-calSans text-xl md:text-2xl mb-4'>
                    {missionTitle}
                </h3>
                <p className='text-justify font-rajdhaniRegular text-base whitespace-pre-line'>
                    {missionText}
                </p>
            </div>
            {/* <div className="bg-darkColor text-clearColor p-4 rounded-xl md:w-1/4">
                <h3 className='text-center font-calSans text-xl md:text-2xl mb-4'>
                    🔗 Rejoignez-moi !
                </h3>
                <p className='text-justify font-rajdhaniRegular text-base'>
                    Suivez-moi pour des conseils d'entraînement, des astuces nutritionnelles, des défis motivants et des témoignages inspirants. Ensemble, nous allons repousser les limites et atteindre de nouveaux sommets.
                </p>
            </div> */}
        </div>
    </section>
  )
}

export default IntroAbsoluteMotion