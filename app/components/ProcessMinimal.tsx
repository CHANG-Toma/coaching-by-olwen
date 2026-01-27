"use client"

import Link from "next/link"

export default function ProcessMinimal() {
  const steps = [
    {
      number: "1",
      title: "Consultation gratuite",
      description: "30 minutes pour discuter de vos objectifs",
      icon: "💬",
    },
    {
      number: "2",
      title: "Programme personnalisé",
      description: "Un plan adapté à vos besoins",
      icon: "📋",
    },
    {
      number: "3",
      title: "Accompagnement",
      description: "Suivi régulier pour vos résultats",
      icon: "🤝",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary-dark mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-secondary-dark/70 font-body max-w-xl mx-auto">
            Un processus simple en 3 étapes pour votre transformation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-20 h-20 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="absolute text-3xl opacity-20">{step.icon}</span>
                <span className="relative z-10">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-dark mb-2 font-heading">
                {step.title}
              </h3>
              <p className="text-secondary-dark/70 font-body">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Connection line (desktop only) */}
        <div className="hidden md:block max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between">
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary-violet to-primary-rose"></div>
            <div className="w-2 h-2 rounded-full bg-primary-rose"></div>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-primary-rose to-primary-violet"></div>
            <div className="w-2 h-2 rounded-full bg-primary-violet"></div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary-violet to-primary-rose"></div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 gradient-primary text-white rounded-full font-bold hover:scale-105 hover:shadow-lg transition-all"
          >
            Commencer maintenant
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
