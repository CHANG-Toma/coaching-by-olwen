import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const steps = [
  {
    step: "01",
    title: "Premier échange gratuit",
    description:
      "Consultation de 30 minutes pour faire le point sur vos objectifs, contraintes et attentes — sans engagement.",
  },
  {
    step: "02",
    title: "Programme sur mesure",
    description:
      "Conception d'un plan d'entraînement personnalisé, adapté à votre niveau, votre emploi du temps et votre mode de vie.",
  },
  {
    step: "03",
    title: "Suivi & ajustements",
    description:
      "Bilans réguliers, corrections techniques et ajustements pour maintenir une progression saine et constante.",
  },
  {
    step: "04",
    title: "Autonomie durable",
    description:
      "Des habitudes solides et une meilleure connaissance de votre corps — pour continuer à progresser sur le long terme.",
  },
];

export default function Process() {
  return (
    <section id="methode" className="section-alt border-y border-stone-200 py-24 dark:border-stone-800">
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Ma méthode de coaching"
            title="Quatre étapes pour progresser en confiance"
            subtitle="Une méthode structurée et humaine — pas de raccourci, mais un chemin clair vers des résultats durables."
          />
        </RevealOnScroll>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <RevealOnScroll key={item.step} delay={index * 80}>
              <div className="card-hover group relative h-full p-6">
                <span className="text-4xl font-extrabold text-stone-200 transition-colors group-hover:text-royal-100 dark:text-stone-800 dark:group-hover:text-royal-900">
                  {item.step}
                </span>
                <div className="accent-bar mt-4 transition-all group-hover:w-16" />
                <h3 className="mt-4 font-bold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
