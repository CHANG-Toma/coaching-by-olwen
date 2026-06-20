"use client";

import Link from "next/link";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const services = [
  {
    title: "Coaching 100 % individualisé",
    tagline: "L'excellence technique avant tout",
    description:
      "Chaque corps est unique. Je conçois des séances sur mesure en tenant compte de votre histoire, de votre mode de vie et de vos antécédents. Ici, la performance ne se construit jamais au détriment de la santé : nous privilégions la qualité du mouvement et la précision technique. Progresser en toute sécurité, c'est apprendre à écouter son corps et à le préserver pour durer.",
    location: "Présentiel — Ouest parisien",
    popular: true,
  },
  {
    title: "Programmes à distance",
    tagline: "L'autonomie, le suivi en plus",
    description:
      "Vous souhaitez vous entraîner où vous voulez, tout en étant certain(e) de faire le bon geste ? Vous recevez une programmation personnalisée et un accompagnement continu. Je reste disponible à distance pour corriger vos postures, analyser vos vidéos et vous conseiller au quotidien. S'entraîner seul(e) ne signifie pas s'entraîner sans guide.",
    location: "En ligne — partout en France",
    popular: false,
  },
  {
    title: "Événements & séminaires",
    tagline: "Le sport comme vecteur de partage",
    description:
      "Vous souhaitez fédérer vos proches ou vos collaborateurs ? J'organise et j'anime des événements sportifs sur mesure : bootcamps, journées thématiques ou week-ends de reconnexion. Des moments intenses, dynamiques et accessibles, pensés pour bouger ensemble — dans le respect du rythme de chacun.",
    location: null,
    popular: false,
  },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="py-24" aria-labelledby="services-heading">
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Mes offres de coaching sportif"
            title="La santé et la longévité au cœur de la performance"
            subtitle="Excellence technique, qualité du geste et accompagnement durable — en séance individuelle dans l'Ouest parisien ou via un programme d'entraînement à distance, partout en France."
            titleId="services-heading"
          />
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealOnScroll key={service.title} delay={index * 80}>
              <article
                onMouseEnter={() => setActive(index)}
                className={`card-hover relative flex h-full flex-col overflow-hidden p-7 ${
                  active === index || service.popular
                    ? "border-royal-300 dark:border-royal-600"
                    : ""
                } ${service.popular ? "ring-2 ring-royal-100 dark:ring-royal-900/50" : ""}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 origin-left transition-transform duration-500 ${
                    active === index || service.popular ? "scale-x-100" : "scale-x-0"
                  } bg-gradient-to-r from-royal-600 to-bordeaux-600`}
                />

                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-bordeaux-600 dark:text-bordeaux-400">
                    {service.tagline}
                  </p>
                  {service.popular && (
                    <span className="shrink-0 rounded-full bg-bordeaux-700 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Offre signature
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-bold text-stone-900 dark:text-stone-100">
                  {service.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {service.description}
                </p>

                {service.location && (
                  <p className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-royal-800 dark:text-royal-300">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {service.location}
                  </p>
                )}

                <Link
                  href="#contact"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-lg border border-stone-200 py-2.5 text-sm font-semibold text-royal-800 transition-all hover:border-royal-300 hover:bg-royal-50 dark:border-stone-700 dark:text-royal-300 dark:hover:border-royal-600 dark:hover:bg-royal-900/30"
                >
                  Demander un devis personnalisé
                </Link>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={250}>
          <div className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 px-6 py-5 text-center dark:border-stone-800 dark:bg-stone-900/50">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Tarifs sur mesure
            </h3>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Chaque accompagnement est unique. Je vous propose un devis adapté à
              vos objectifs, à la fréquence souhaitée et au format choisi —
              présentiel, à distance ou événementiel.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
