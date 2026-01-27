"use client"

import Link from "next/link"

export default function Services() {
  const services = [
    {
      icon: "🏋️",
      title: "Coaching Personnel",
      description: "Séances individuelles adaptées à vos objectifs et votre niveau. Programme sur mesure avec suivi régulier.",
      highlight: "Le plus populaire",
    },
    {
      icon: "📱",
      title: "Coaching en Ligne",
      description: "Accompagnement à distance avec vidéos, plans d'entraînement et suivi via application dédiée.",
      highlight: "Flexible",
    },
    {
      icon: "🍎",
      title: "Nutrition",
      description: "Conseils nutritionnels personnalisés pour optimiser vos performances et votre récupération.",
      highlight: "Essentiel",
    },
    {
      icon: "🎯",
      title: "Préparation Mentale",
      description: "Techniques de motivation, gestion du stress et développement de la confiance en soi.",
      highlight: "Complémentaire",
    },
    {
      icon: "👥",
      title: "Coaching de Groupe",
      description: "Séances collectives dynamiques pour progresser ensemble dans une ambiance motivante.",
      highlight: "Économique",
    },
    {
      icon: "📊",
      title: "Bilan & Suivi",
      description: "Évaluations régulières de vos progrès avec ajustements du programme selon vos résultats.",
      highlight: "Inclus",
    },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-violet/10 text-primary-violet rounded-full font-semibold mb-4">
            MES SERVICES
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary-dark mb-4 heading-uppercase">
            Des Solutions Adaptées
          </h2>
          <p className="text-xl text-secondary-dark/70 max-w-2xl mx-auto font-body">
            Des solutions adaptées à tous vos besoins pour transformer votre corps et votre esprit
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-card p-8 border-2 border-secondary-light hover:border-primary-violet/30 hover:shadow-xl transition-all duration-300 hover-lift relative"
            >
              {service.highlight && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary-violet to-primary-rose text-white text-xs font-bold rounded-full">
                  {service.highlight}
                </span>
              )}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-secondary-dark mb-3 group-hover:text-primary-violet transition-colors">
                {service.title}
              </h3>
              <p className="text-secondary-dark/70 font-body mb-4 leading-relaxed">
                {service.description}
              </p>
              <Link
                href="#contact"
                className="text-primary-violet font-semibold text-sm hover:underline inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                En savoir plus
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-secondary-light to-white rounded-card border-2 border-primary-violet/20 shadow-lg">
            <h3 className="font-heading text-2xl font-bold text-secondary-dark mb-4">
              Besoin d'un Programme Personnalisé ?
            </h3>
            <p className="text-secondary-dark/70 mb-6 font-body">
              Contactez-moi pour discuter de vos objectifs et créer un plan sur mesure
            </p>
            <Link
              href="#contact"
              className="inline-block px-8 py-3 gradient-primary text-white rounded-full font-bold hover:scale-105 hover:shadow-lg transition-all"
            >
              Discutons de Vos Objectifs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
