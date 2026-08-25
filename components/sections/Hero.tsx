import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import profilePhoto from "@/src/img/olwen-hero.jpeg";

export default function Hero() {
  return (
    <>
      <section id="accueil" className="relative overflow-hidden pt-28 lg:pt-32">
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-royal-50 blur-3xl dark:bg-royal-900/30" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-bordeaux-50 blur-3xl dark:bg-bordeaux-900/20" />

        <div className="section-container relative pb-12 lg:pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="animate-fade-up order-2 lg:order-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-bordeaux-600 dark:text-bordeaux-400">
                Coaching by Olwen
              </p>

              <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-stone-900 sm:text-5xl lg:text-[3.25rem] dark:text-stone-50">
                Coaching sportif{" "}
                <span className="text-royal-800 dark:text-royal-300">
                  personnalisé
                </span>
              </h1>

              <p className="mt-5 max-w-md text-lg leading-relaxed text-stone-500 dark:text-stone-400">
                Présentiel en Ouest parisien ou en ligne — consultation gratuite,
                sans engagement.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#contact" className="btn-primary btn-primary-lg">
                  Réserver ma consultation gratuite
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="#services" className="btn-outline">
                  Découvrir mes offres
                </Link>
              </div>
            </div>

            <div
              className="relative order-1 mx-auto w-full max-w-md animate-fade-up lg:order-2 lg:ml-auto"
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent p-6 pt-24">
                  <p className="text-2xl font-bold text-white">Olwen</p>
                  <p className="mt-1 text-sm text-white/75">
                    Coach certifiée · Présentiel &amp; en ligne
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />
    </>
  );
}
