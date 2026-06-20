import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import profilePhoto from "@/src/img/olwen-portrait.jpeg";

const credentials = [
  "Coach sportif certifiée",
  "Coaching 100 % personnalisé",
  "Coach professionnelle depuis 2026",
  "Sportive depuis l'enfance",
  "Présentiel Ouest parisien & coaching en ligne",
];

const values = [
  {
    title: "Écoute et personnalisation",
    description:
      "Vos contraintes, votre rythme et vos objectifs guident chaque programme. Rien n'est générique : tout part de votre réalité.",
  },
  {
    title: "Exigence bienveillante",
    description:
      "Je vous accompagne avec rigueur technique, sans jamais brusquer votre corps. La régularité et la qualité priment sur la précipitation.",
  },
  {
    title: "Performance durable",
    description:
      "Mon objectif : des progrès durables, ancrés dans le respect de votre santé — pour performer aujourd'hui et préserver votre corps demain.",
  },
];

export default function About() {
  return (
    <section id="apropos" className="section-alt py-24">
      <div className="section-container">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="À propos de votre coach sportif"
            title="Je pratique ce que j'enseigne"
            subtitle="Sportive depuis l'enfance et coach professionnelle depuis 2026, j'allie expertise technique et relation de confiance pour vous proposer un accompagnement réellement sur mesure."
          />
        </RevealOnScroll>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll delay={100}>
            <div className="relative pb-6 sm:pb-0">
              <div className="relative aspect-[4/5] max-w-sm overflow-hidden rounded-2xl border border-stone-200 shadow-lg dark:border-stone-700">
                <Image
                  src={profilePhoto}
                  alt="Olwen, coach sportif certifiée, en séance de coaching individualisé"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
              <div className="relative mt-4 max-w-sm rounded-xl border border-stone-200 bg-white p-4 shadow-lg dark:border-stone-700 dark:bg-stone-900 sm:absolute sm:-bottom-4 sm:-right-4 sm:mt-0 sm:max-w-[220px]">
                <p className="text-sm font-medium leading-snug text-stone-700 dark:text-stone-300">
                  « Mon rôle : vous guider avec clarté et bienveillance, pour
                  progresser en sécurité et construire une relation durable avec
                  le sport. »
                </p>
                <p className="mt-2 text-xs font-semibold text-bordeaux-600 dark:text-bordeaux-400">
                  — Olwen
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <div>
            <RevealOnScroll delay={150}>
              <ul className="mb-8 grid grid-cols-2 gap-3">
                {credentials.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400"
                  >
                    <svg className="h-4 w-4 flex-shrink-0 text-bordeaux-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <div className="space-y-4">
              {values.map((value, i) => (
                <RevealOnScroll key={value.title} delay={200 + i * 80}>
                  <div className="card-hover p-5">
                    <h3 className="font-semibold text-stone-900 dark:text-stone-100">
                      {value.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                      {value.description}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={450}>
              <Link href="#contact" className="btn-primary mt-8 inline-flex">
                Échanger sur vos objectifs
              </Link>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
