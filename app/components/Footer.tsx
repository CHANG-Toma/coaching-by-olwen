"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-dark text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">CO</span>
              </div>
              <span className="font-heading font-bold text-xl">Coaching By Olwen</span>
            </div>
            <p className="text-white/80 mb-6 font-body max-w-md leading-relaxed">
              Votre partenaire pour une transformation physique et mentale réussie. 
              Accompagnement personnalisé et professionnel depuis 2014.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {[
                { name: "Facebook", icon: "📘" },
                { name: "Instagram", icon: "📷" },
                { name: "LinkedIn", icon: "💼" },
                { name: "YouTube", icon: "▶️" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold mb-6 heading-uppercase text-sm">Navigation</h3>
            <ul className="space-y-3 font-body">
              <li>
                <Link href="#about" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  À propos
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Services
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Témoignages
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Contact
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-2 group">
                  Connexion
                  <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold mb-6 heading-uppercase text-sm">Contact</h3>
            <ul className="space-y-3 font-body">
              <li className="flex items-start gap-3">
                <span className="text-white/70 mt-1">✉</span>
                <a href="mailto:contact@coachingbyolwen.fr" className="text-white/70 hover:text-white transition-colors">
                  contact@coachingbyolwen.fr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/70 mt-1">📞</span>
                <a href="tel:+336XXXXXXXX" className="text-white/70 hover:text-white transition-colors">
                  +33 6 XX XX XX XX
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-white/70 mt-1">📍</span>
                <span className="text-white/70">
                  Disponible en ligne et en présentiel
                </span>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Certifié Professionnel</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Paiement Sécurisé</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 font-body text-sm">
              &copy; {currentYear} Coaching By Olwen. Tous droits réservés.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="#" className="text-white/60 hover:text-white transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
