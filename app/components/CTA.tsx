"use client"

import Link from "next/link"

export default function CTA() {
  const benefits = [
    "✓ Consultation gratuite de 30 min",
    "✓ Programme personnalisé garanti",
    "✓ Résultats visibles en 30 jours",
    "✓ Support 7j/7",
  ]

  return (
    <section id="contact" className="py-24 gradient-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold mb-6">
            COMMENCEZ MAINTENANT
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 heading-uppercase leading-tight">
            Prêt à Commencer Votre
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent">
              Transformation ?
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/95 mb-4 font-body max-w-3xl mx-auto">
            Rejoignez des centaines de personnes qui ont déjà transformé leur vie grâce à mon accompagnement
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-card p-4 border border-white/20 text-center"
            >
              <p className="text-white text-sm font-medium">{benefit}</p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/auth/signin"
            className="group relative px-10 py-5 bg-white text-primary-violet rounded-full font-bold text-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Réserver une Séance Gratuite</span>
            <span className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white flex items-center justify-center">
              Réserver une Séance Gratuite
            </span>
          </Link>
          <Link
            href="#services"
            className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-primary-violet transition-all duration-300 hover:scale-105"
          >
            En Savoir Plus
          </Link>
        </div>

        {/* Trust elements */}
        <div className="text-center space-y-4">
          <p className="text-white/80 text-sm font-body">
            🔒 Paiement sécurisé • 💬 Réponse sous 24h • ✅ Satisfaction garantie
          </p>
          <div className="flex items-center justify-center gap-6 text-white/70 text-sm">
            <span>✓ Sans engagement</span>
            <span>•</span>
            <span>✓ Annulation gratuite</span>
            <span>•</span>
            <span>✓ Remboursement 30j</span>
          </div>
        </div>
      </div>
    </section>
  )
}
