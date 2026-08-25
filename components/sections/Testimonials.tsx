import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const commitments = [
  {
    title: "Un cadre bienveillant",
    description:
      "Pas de jugement, pas de comparaison. Vous avancez à votre rythme, dans un environnement où l'écoute et le respect priment.",
  },
  {
    title: "Une technique exigeante",
    description:
      "Chaque geste compte. Je veille à la qualité de votre exécution pour que vos progrès soient solides, sûrs et durables.",
  },
  {
    title: "Un suivi réel, même à distance",
    description:
      "Programme personnalisé, corrections régulières et disponibilité entre les séances — vous n'êtes jamais laissé(e) seul(e) avec votre entraînement.",
  },
  {
    title: "Des résultats pensés pour durer",
    description:
      "Mon ambition : vous aider à construire une relation saine avec le sport, pour performer aujourd'hui et préserver votre corps demain.",
  },
];

export default function Testimonials() {
  return (
    <section id="engagement" className="section-alt py-24">
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Mon engagement"
            title="Ce que vous pouvez attendre de mon accompagnement"
            subtitle="Un coaching sportif centré sur vous — pas sur des promesses creuses, mais sur une méthode claire, humaine et exigeante."
          />
        </RevealOnScroll>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {commitments.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 80}>
              <article className="card-hover h-full p-6">
                <h3 className="font-bold text-stone-900 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.description}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={350}>
          <div className="mt-10 text-center">
            <Link href="#contact" className="btn-primary btn-primary-lg">
              Démarrer votre accompagnement
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
