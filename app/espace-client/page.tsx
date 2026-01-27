"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

export default function EspaceClientPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }
    
    if (status === "authenticated" && session?.user?.role === "ADMIN") {
      router.push("/dashboard")
      return
    }
  }, [status, session, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-violet mx-auto mb-4"></div>
          <p className="text-secondary-dark font-body">Chargement...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || !session) {
    return null
  }

  // Si admin, rediriger (déjà géré dans useEffect mais au cas où)
  if (session.user?.role === "ADMIN") {
    return null
  }

  // Afficher la page pour les clients ou si le rôle n'est pas encore défini
  // (pour compatibilité avec les anciens utilisateurs)

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-secondary-dark mb-2">
              Mon Espace Client
            </h1>
            <p className="text-secondary-dark/70 font-body">
              Bienvenue, {session.user?.name || session.user?.email}
            </p>
          </div>

          {/* Quick Actions - Actions rapides en haut */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link
              href="/calendrier"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary-violet group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-secondary-dark">Prendre RDV</h3>
                  <p className="text-sm text-secondary-dark/60 font-body">Réserver maintenant</p>
                </div>
              </div>
            </Link>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-secondary-light">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-light rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-secondary-dark">Mes RDV</h3>
                  <p className="text-sm text-secondary-dark/60 font-body">0 à venir</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-secondary-light">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-light rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-secondary-dark">Documents</h3>
                  <p className="text-sm text-secondary-dark/60 font-body">Devis & factures</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne principale */}
            <div className="lg:col-span-2 space-y-6">
              {/* Prochain rendez-vous */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
                  Prochain rendez-vous
                </h2>
                <div className="p-6 border-2 border-dashed border-secondary-light rounded-lg text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-secondary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-secondary-dark/60 font-body mb-3">Aucun rendez-vous prévu</p>
                  <Link
                    href="/calendrier"
                    className="inline-block px-6 py-2 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body"
                  >
                    Réserver maintenant
                  </Link>
                </div>
              </div>

              {/* Mes programmes */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
                  Mes Programmes
                </h2>
                <div className="space-y-3">
                  <div className="p-4 border-2 border-secondary-light rounded-lg">
                    <p className="text-sm text-secondary-dark/60 font-body text-center">
                      Aucun programme actif
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profil rapide */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {(session.user?.name || session.user?.email || "U")[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-secondary-dark">
                      {session.user?.name || "Utilisateur"}
                    </h3>
                    <p className="text-sm text-secondary-dark/60 font-body">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors font-body text-sm font-medium">
                  Modifier mon profil
                </button>
              </div>

              {/* Liens rapides */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-heading font-bold text-secondary-dark mb-4">
                  Accès rapide
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/calendrier"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-light transition-colors"
                  >
                    <svg className="w-5 h-5 text-primary-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-body text-secondary-dark">Calendrier</span>
                  </Link>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-light transition-colors cursor-pointer">
                    <svg className="w-5 h-5 text-primary-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-body text-secondary-dark">Documents</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary-light transition-colors cursor-pointer">
                    <svg className="w-5 h-5 text-primary-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="font-body text-secondary-dark">Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
