import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import gallery02 from "@/src/img/olwen-gallery-02.jpeg";
import gallery04 from "@/src/img/olwen-gallery-04.jpeg";
import gallery08 from "@/src/img/olwen-gallery-08.jpeg";

const moments = [
  {
    image: gallery02,
    alt: "Olwen corrige la posture d'une cliente sur rameur lors d'une séance de coaching sportif",
    title: "Correction technique en direct",
    text: "J'ajuste la posture et l'intensité en temps réel pour garantir un geste sûr et efficace.",
  },
  {
    image: gallery04,
    alt: "Olwen encadre un mini groupe lors d'une séance de coaching sportif en petit comité",
    title: "Coaching en petit groupe",
    text: "Une dynamique motivante avec un suivi attentif porté sur chaque participante.",
  },
  {
    image: gallery08,
    alt: "Olwen guide une cliente pendant un exercice cardio en séance de coaching personnalisé",
    title: "Progression encadrée",
    text: "Un accompagnement positif et structuré pour avancer étape par étape, en confiance.",
  },
];

export default function CoachingMoments() {
  return (
    <section className="py-24">
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Coaching en action"
            title="L'exigence technique, sur le terrain"
            subtitle="Des séances réelles qui illustrent mon approche : correction du geste, encadrement attentif et progression dans le respect de chaque corps."
          />
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {moments.map((moment, index) => (
            <RevealOnScroll key={moment.title} delay={index * 80}>
              <article className="card-hover overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={moment.image}
                    alt={moment.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                    {moment.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
                    {moment.text}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
