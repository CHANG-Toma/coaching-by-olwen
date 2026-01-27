"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-dark text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CO</span>
              </div>
              <span className="font-heading font-bold text-lg">Coaching By Olwen</span>
            </div>
            <p className="text-white/70 text-sm font-body">
              Accompagnement personnalisé pour votre transformation
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold mb-4 text-sm heading-uppercase">Navigation</h3>
            <ul className="space-y-2 font-body text-sm">
              <li>
                <Link href="#about" className="text-white/70 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-white/70 hover:text-white transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/70 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-white/70 hover:text-white transition-colors">
                  Témoignages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-sm heading-uppercase">Contact</h3>
            <ul className="space-y-2 font-body text-sm text-white/70">
              <li>
                <a href="mailto:contact@coachingbyolwen.fr" className="hover:text-white transition-colors">
                  contact@coachingbyolwen.fr
                </a>
              </li>
              <li>
                <a href="tel:+336XXXXXXXX" className="hover:text-white transition-colors">
                  +33 6 XX XX XX XX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 text-sm font-body">
            &copy; {currentYear} Coaching By Olwen. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
