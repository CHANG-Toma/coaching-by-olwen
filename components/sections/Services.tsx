"use client";

import Link from "next/link";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const services = [
  {
    title: "Coaching 100 % individualisé",
    tagline: "L'excellence technique avant tout",
    points: [
      "Séances sur mesure selon votre corps et vos objectifs",
      "Qualité du geste et sécurité avant tout",
      "Progression durable, sans brusquer",
    ],
    location: "Présentiel — Ouest parisien",
    popular: true,
  },
  {
    title: "Programmes à distance",
    tagline: "L'autonomie, le suivi en plus",
    points: [
      "Programmation personnalisée où que vous soyez",
      "Corrections vidéo et conseils réguliers",
      "Autonomie guidée, jamais seul(e)",
    ],
    location: "En ligne — partout en France",
    popular: false,
  },
  {
    title: "Événements & séminaires",
    tagline: "Le sport comme vecteur de partage",
    points: [
      "Bootcamps, journées et week-ends sur mesure",
      "Pour proches, équipes ou collaborateurs",
      "Dynamique collective, rythme accessible",
    ],
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
            eyebrow="Mes offres"
            title="Trois formats, une même exigence"
            subtitle="Présentiel en Ouest parisien, à distance partout en France, ou événementiel sur mesure."
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

                <ul className="mt-5 flex-1 space-y-2.5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-snug text-stone-600 dark:text-stone-400"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-bordeaux-600 dark:text-bordeaux-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>

                {service.location && (
                  <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-royal-800 dark:text-royal-300">
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
          <p className="mt-10 text-center text-sm text-stone-500 dark:text-stone-400">
            Tarifs sur mesure — devis adapté à vos objectifs et au format choisi.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
