"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-primary pt-16 overflow-hidden">
      {/* Animated decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Trust badges - Top */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20 hidden lg:flex items-center gap-6 animate-fade-in">
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
          <span className="text-white text-sm font-medium">✓ Certifié Professionnel</span>
        </div>
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
          <span className="text-white text-sm font-medium">✓ 10+ Ans d'Expérience</span>
        </div>
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
          <span className="text-white text-sm font-medium">✓ Garantie Satisfaction</span>
        </div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Badge */}
        <div className="inline-block mb-6 animate-fade-in">
          <span className="bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30 text-white text-sm font-semibold">
            🏆 Coach Certifié • Résultats Garantis
          </span>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 heading-uppercase leading-tight">
          Transformez Votre Corps
          <br />
          <span className="block mt-2 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
            Et Votre Esprit
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-3xl mx-auto font-body leading-relaxed">
          Accompagnement personnalisé pour atteindre vos objectifs sportifs et développer votre confiance en vous. 
          <span className="block mt-2 font-semibold">Résultats visibles dès les premières semaines.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link
            href="#contact"
            className="group px-8 py-4 bg-white text-primary-violet rounded-full font-bold text-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Commencer Maintenant</span>
            <span className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white flex items-center justify-center">
              Commencer Maintenant
            </span>
          </Link>
          <Link
            href="#services"
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary-violet transition-all duration-300 hover:scale-105"
          >
            Découvrir les Services
          </Link>
        </div>

        {/* Social proof */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-2 text-white/80 mb-4">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-sm font-bold">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="ml-4 font-medium">Rejoint par 500+ clients satisfaits</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { number: "500+", label: "Clients Satisfaits", icon: "👥" },
            { number: "10+", label: "Années d'Expérience", icon: "⭐" },
            { number: "95%", label: "Taux de Réussite", icon: "🎯" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-card p-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/90 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
