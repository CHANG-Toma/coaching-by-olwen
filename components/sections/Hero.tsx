import Link from "next/link";

import Image from "next/image";

import Marquee from "@/components/ui/Marquee";

import profilePhoto from "@/src/img/olwen-hero.jpeg";



const trustPills = [

  "Coaching sportif personnalisé",

  "Santé & longévité",

  "Consultation gratuite",

];



const highlights = [

  {

    title: "Coaching individualisé",

    subtitle: "Séances sur mesure en Ouest parisien",

  },

  {

    title: "Programmes à distance",

    subtitle: "Entraînement guidé partout en France",

  },

  {

    title: "Événements sportifs",

    subtitle: "Bootcamps et séminaires sur mesure",

  },

];



export default function Hero() {

  return (

    <>

      <section id="accueil" className="relative overflow-hidden pt-28 lg:pt-32">

        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-royal-50 blur-3xl dark:bg-royal-900/30" />

        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-bordeaux-50 blur-3xl dark:bg-bordeaux-900/20" />



        <div className="section-container relative pb-12 lg:pb-16">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

            <div className="animate-fade-up order-2 lg:order-1">

              <div className="mb-5 flex flex-wrap gap-2">

                {trustPills.map((pill) => (

                  <span

                    key={pill}

                    className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"

                  >

                    <svg className="h-3 w-3 text-bordeaux-600" fill="currentColor" viewBox="0 0 20 20">

                      <path

                        fillRule="evenodd"

                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"

                        clipRule="evenodd"

                      />

                    </svg>

                    {pill}

                  </span>

                ))}

              </div>



              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.25rem] dark:text-stone-50">

                Coaching sportif personnalisé :{" "}

                <span className="text-royal-800 dark:text-royal-300">

                  performance durable et respect du corps

                </span>

              </h1>



              <p className="mt-5 max-w-lg text-lg leading-relaxed text-stone-500 dark:text-stone-400">

                Je place la santé et la longévité au cœur de chaque programme.

                En présentiel dans l&apos;Ouest parisien ou en ligne partout en

                France, je vous accompagne avec exigence technique et

                bienveillance — pour progresser en sécurité, sur la durée.

              </p>



              <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                <Link href="#contact" className="btn-primary btn-primary-lg">

                  Réserver ma consultation gratuite

                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />

                  </svg>

                </Link>

                <Link href="#services" className="btn-outline">

                  Découvrir mes offres

                </Link>

              </div>



              <div className="mt-8 flex items-center gap-4 rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-800 dark:bg-stone-900/60">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-100 dark:bg-royal-900/40">

                  <svg className="h-5 w-5 text-royal-700 dark:text-royal-300" fill="currentColor" viewBox="0 0 20 20">

                    <path

                      fillRule="evenodd"

                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"

                      clipRule="evenodd"

                    />

                  </svg>

                </div>

                <div>

                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">

                    Un accompagnement 100 % adapté à vous

                  </p>

                  <p className="text-xs text-stone-500">

                    Excellence technique · Qualité du geste · Tarifs sur mesure

                  </p>

                </div>

              </div>

            </div>



            <div
              className="relative order-1 mx-auto max-w-md animate-fade-up lg:order-2 lg:ml-auto"
              style={{ animationDelay: "150ms" }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-stone-200 shadow-xl shadow-stone-900/10 dark:border-stone-700 dark:shadow-black/30">
                <Image
                  src={profilePhoto}
                  alt="Olwen, coach sportif certifiée — coaching personnalisé en Ouest parisien et en ligne"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/50 to-transparent p-6 pt-20">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    Votre coach
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">Olwen</p>
                  <p className="mt-1 text-sm text-white/75">
                    Certifiée · Coaching individuel · Présentiel &amp; en ligne
                  </p>
                </div>
              </div>

              <div className="absolute -right-2 -top-3 hidden rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-md dark:border-stone-700 dark:bg-stone-900 sm:block">
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                  Profil
                </p>
                <p className="text-sm font-bold text-royal-800 dark:text-royal-300">
                  Coach professionnelle depuis 2026
                </p>
                <p className="text-xs text-stone-500">
                  Sportive depuis l&apos;enfance
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-md dark:border-stone-700 dark:bg-stone-900 sm:px-5 sm:py-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-bordeaux-100 dark:bg-bordeaux-900/40">
                    <svg className="h-4 w-4 text-bordeaux-700 dark:text-bordeaux-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100">Tarifs sur mesure</p>
                    <p className="text-xs text-stone-500">Devis personnalisé, sans engagement</p>
                  </div>
                </div>
              </div>
            </div>

          </div>



          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 dark:border-stone-700 dark:bg-stone-700 sm:grid-cols-3">

            {highlights.map((item) => (

              <div

                key={item.title}

                className="bg-white px-6 py-6 text-center dark:bg-stone-900"

              >

                <p className="text-xl font-bold text-stone-900 dark:text-stone-50">

                  {item.title}

                </p>

                <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">

                  {item.subtitle}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>



      <Marquee />

    </>

  );

}


