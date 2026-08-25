import RevealOnScroll from "@/components/ui/RevealOnScroll";

const signals = [
  {
    title: "Excellence technique",
    description:
      "Qualité du mouvement et précision du geste au centre de chaque séance — jamais au détriment de votre santé.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Coaching 100 % personnalisé",
    description:
      "Programme d'entraînement construit autour de votre corps, de votre histoire et de votre rythme de vie.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Autonomie & suivi à distance",
    description:
      "Coaching en ligne avec corrections de posture, analyse vidéo et conseils réguliers — vous n'êtes jamais seul(e).",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Événements & partage",
    description:
      "Bootcamps et séminaires sportifs pour fédérer votre entourage ou vos équipes, à un rythme accessible à tous.",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function TrustBanner() {
  return (
    <section className="border-b border-stone-200 bg-white py-14 dark:border-stone-800 dark:bg-stone-950" aria-labelledby="trust-heading">
      <div className="section-container">
        <RevealOnScroll>
          <h2 id="trust-heading" className="text-center text-sm font-semibold uppercase tracking-widest text-stone-400">
            Une approche fondée sur la santé et la technique
          </h2>
        </RevealOnScroll>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((signal, i) => (
            <RevealOnScroll key={signal.title} delay={i * 80}>
              <div className="flex gap-4 rounded-xl border border-stone-100 p-5 transition-colors hover:border-royal-200 hover:bg-stone-50 dark:border-stone-800 dark:hover:border-royal-800 dark:hover:bg-stone-900/50">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-royal-50 text-royal-700 dark:bg-royal-900/40 dark:text-royal-300">
                  {signal.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                    {signal.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                    {signal.description}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
