"use client"

import Link from "next/link"

export default function HeroMinimal() {
  return (
    <section className="relative min-h-[85vh] flex items-center gradient-primary pt-20 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
          <span className="text-green-300">✓</span>
          <span className="text-white text-sm font-medium">Consultation gratuite • Sans engagement</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
          Transformez Votre Corps
          <br />
          <span className="text-white/90">Et Votre Esprit</span>
        </h1>
        
        <p className="text-xl text-white/90 mb-10 font-body max-w-2xl mx-auto">
          Coaching personnalisé pour atteindre vos objectifs. Consultation gratuite.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="#contact"
            className="group px-8 py-4 bg-white text-primary-violet rounded-full font-bold text-lg hover:scale-105 hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Commencer maintenant
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="#how-it-works"
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
          >
            Comment ça marche ?
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">500+</div>
            <div className="text-white/80 text-xs">Clients</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">10+</div>
            <div className="text-white/80 text-xs">Ans</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="text-2xl font-bold text-white mb-1">95%</div>
            <div className="text-white/80 text-xs">Réussite</div>
          </div>
        </div>
      </div>
    </section>
  )
}
