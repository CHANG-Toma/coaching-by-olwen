"use client"

import Link from "next/link"
import { useState } from "react"

export default function ServicesMinimal() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      title: "Coaching Personnel",
      description: "Séances individuelles adaptées à vos besoins",
      icon: "💪",
      features: ["Programme sur mesure", "Suivi régulier"],
    },
    {
      title: "Coaching en Ligne",
      description: "Accompagnement à distance, flexible",
      icon: "📱",
      features: ["Flexibilité totale", "Support 7j/7"],
    },
    {
      title: "Nutrition",
      description: "Conseils alimentaires personnalisés",
      icon: "🍎",
      features: ["Plan alimentaire", "Recettes adaptées"],
    },
  ]

  return (
    <section id="services" className="py-20 bg-secondary-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-dark mb-4">
            Mes Services
          </h2>
          <p className="text-secondary-dark/70 font-body max-w-xl mx-auto">
            Des solutions adaptées à tous vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                hoveredIndex === index
                  ? 'border-primary-violet shadow-xl scale-105'
                  : 'border-transparent hover:border-primary-violet/30 hover:shadow-lg'
              }`}
            >
              <div className="text-4xl mb-4 transform transition-transform" style={{
                transform: hoveredIndex === index ? 'scale(1.1) rotate(5deg)' : 'scale(1)'
              }}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary-dark mb-2 font-heading">
                {service.title}
              </h3>
              <p className="text-secondary-dark/70 font-body mb-4">
                {service.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-secondary-dark/70">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className="inline-flex items-center gap-1 text-primary-violet font-semibold hover:gap-2 transition-all text-sm group"
              >
                En savoir plus
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
