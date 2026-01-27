"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
              <span className="text-white font-bold text-xl">CO</span>
            </div>
            <span className="font-heading font-bold text-xl text-secondary-dark hidden sm:block">
              Coaching By Olwen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="#about" 
              className="text-secondary-dark hover:text-primary-violet transition-colors font-medium"
            >
              À propos
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-secondary-dark hover:text-primary-violet transition-colors font-medium"
            >
              Comment ça marche
            </Link>
            <Link 
              href="#services" 
              className="text-secondary-dark hover:text-primary-violet transition-colors font-medium"
            >
              Services
            </Link>
            <Link 
              href="#testimonials" 
              className="text-secondary-dark hover:text-primary-violet transition-colors font-medium"
            >
              Témoignages
            </Link>
            <Link 
              href="/auth/signin" 
              className="px-6 py-2 gradient-primary text-white rounded-full font-semibold hover:scale-105 transition-transform"
            >
              Se connecter
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-secondary-dark hover:bg-secondary-light transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}>
          <div className="space-y-4">
            <Link 
              href="#about" 
              onClick={() => setIsOpen(false)}
              className="block text-secondary-dark hover:text-primary-violet transition-colors font-medium py-2"
            >
              À propos
            </Link>
            <Link 
              href="#how-it-works" 
              onClick={() => setIsOpen(false)}
              className="block text-secondary-dark hover:text-primary-violet transition-colors font-medium py-2"
            >
              Comment ça marche
            </Link>
            <Link 
              href="#services" 
              onClick={() => setIsOpen(false)}
              className="block text-secondary-dark hover:text-primary-violet transition-colors font-medium py-2"
            >
              Services
            </Link>
            <Link 
              href="#testimonials" 
              onClick={() => setIsOpen(false)}
              className="block text-secondary-dark hover:text-primary-violet transition-colors font-medium py-2"
            >
              Témoignages
            </Link>
            <Link 
              href="/auth/signin" 
              onClick={() => setIsOpen(false)}
              className="block px-6 py-2 gradient-primary text-white rounded-full font-semibold text-center hover:shadow-lg transition-all"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
