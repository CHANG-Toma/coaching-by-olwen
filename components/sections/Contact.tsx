"use client";

import { FormEvent, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const reassurances = [
  { label: "Consultation gratuite", detail: "30 min, sans engagement" },
  { label: "Présentiel", detail: "Ouest parisien" },
  { label: "Coaching en ligne", detail: "Partout en France" },
  { label: "Tarifs sur mesure", detail: "Devis adapté à vos besoins" },
  { label: "Réponse rapide", detail: "Sous 24 heures ouvrées" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="py-24">
      <div className="section-container">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white dark:border-stone-800 dark:from-stone-900 dark:to-stone-950">
          <div className="grid lg:grid-cols-5">
            <div className="border-b border-stone-200 p-8 dark:border-stone-800 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-10">
              <RevealOnScroll>
                <SectionHeader
                  eyebrow="Contact & réservation"
                  title="Parlons de votre projet sportif"
                  subtitle="Premier échange gratuit et sans engagement. Je prends le temps de comprendre vos objectifs et de voir si mon accompagnement correspond à vos attentes."
                  align="left"
                />

                <div className="mt-8 space-y-4">
                  {reassurances.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4 dark:border-stone-700 dark:bg-stone-900"
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
                        <p className="text-xs text-stone-500">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            <div className="p-8 lg:col-span-3 lg:p-10">
              <RevealOnScroll delay={100}>
                {submitted ? (
                  <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-royal-100 dark:bg-royal-900/40">
                      <svg className="h-8 w-8 text-royal-700 dark:text-royal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-stone-900 dark:text-stone-100">
                      Demande envoyée !
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-stone-500 dark:text-stone-400">
                      Je vous recontacterai très prochainement. (Formulaire visuel — pas d&apos;envoi réel pour le moment.)
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Remplissez le formulaire ci-dessous — je vous recontacte pour planifier votre consultation gratuite de 30 minutes.
                    </p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                          Nom complet
                        </label>
                        <input id="name" name="name" type="text" required placeholder="Votre nom" className="input-field" autoComplete="name" />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                          Email
                        </label>
                        <input id="email" name="email" type="email" required placeholder="votre@email.com" className="input-field" autoComplete="email" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="goal" className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                        Votre objectif principal
                      </label>
                      <select id="goal" name="goal" required className="input-field">
                        <option value="">Sélectionnez...</option>
                        <option value="forme">Retrouver la forme</option>
                        <option value="technique">Améliorer ma technique</option>
                        <option value="performance">Performance sportive</option>
                        <option value="distance">Programme à distance</option>
                        <option value="evenement">Événement ou séminaire</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
                        Message (optionnel)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Décrivez votre situation, vos contraintes ou vos questions..."
                        className="input-field resize-none"
                      />
                    </div>
                    <button type="submit" className="btn-primary btn-primary-lg w-full">
                      Réserver ma consultation gratuite
                    </button>
                    <p className="text-center text-xs text-stone-400">
                      Sans engagement · Annulation libre · Réponse sous 24 h
                    </p>
                  </form>
                )}
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
