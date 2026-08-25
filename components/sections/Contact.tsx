"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CalendlyEmbed from "@/components/ui/CalendlyEmbed";

const reassurances = [
  { label: "Consultation gratuite", detail: "30 min, sans engagement" },
  { label: "Présentiel", detail: "Ouest parisien" },
  { label: "Coaching en ligne", detail: "Partout en France" },
  { label: "Tarifs sur mesure", detail: "Devis adapté à vos besoins" },
  { label: "Réservation instantanée", detail: "Créneau confirmé en ligne" },
];

const bookingSteps = [
  "Choisissez un créneau",
  "Confirmez vos coordonnées",
  "Recevez la confirmation par email",
];

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 py-24">
      <div className="section-container">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white dark:border-stone-800 dark:from-stone-900 dark:to-stone-950">
          <div className="grid lg:grid-cols-5">
            <div className="border-b border-stone-200 p-6 dark:border-stone-800 sm:p-8 lg:sticky lg:top-28 lg:col-span-2 lg:self-start lg:border-b-0 lg:border-r lg:p-10">
              <RevealOnScroll>
                <SectionHeader
                  eyebrow="Contact & réservation"
                  title="Parlons de votre projet sportif"
                  subtitle="Premier échange gratuit et sans engagement. Je prends le temps de comprendre vos objectifs et de voir si mon accompagnement correspond à vos attentes."
                  align="left"
                />

                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
                  {reassurances.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-3.5 dark:border-stone-700 dark:bg-stone-900 sm:p-4"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-royal-100 dark:bg-royal-900/50">
                        <svg className="h-3 w-3 text-royal-700 dark:text-royal-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {item.label}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            <div className="p-6 sm:p-8 lg:col-span-3 lg:p-10">
              <RevealOnScroll delay={100}>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 sm:text-xl">
                    Réservez votre consultation gratuite
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    30 minutes pour faire connaissance, poser vos questions et voir si nous sommes faits pour travailler ensemble.
                  </p>

                  <ol
                    className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3"
                    aria-label="Étapes de réservation"
                  >
                    {bookingSteps.map((step, index) => (
                      <li
                        key={step}
                        className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300"
                      >
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royal-600 to-bordeaux-600 text-[10px] font-bold text-white">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <CalendlyEmbed />
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
