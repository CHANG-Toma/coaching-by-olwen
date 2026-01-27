"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"

export default function CalendrierPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-violet mx-auto mb-4"></div>
          <p className="text-secondary-dark">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== "CLIENT") {
    return null
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h1 className="text-4xl font-heading font-bold text-secondary-dark mb-4">
              Prendre un Rendez-vous
            </h1>
            <p className="text-secondary-dark/70 mb-8 font-body">
              Sélectionnez une date et une heure pour votre consultation
            </p>

            {/* Placeholder pour le calendrier */}
            <div className="border-2 border-dashed border-secondary-light rounded-2xl p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 text-secondary-light mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-secondary-dark/60 font-body">
                Calendrier de réservation à intégrer
              </p>
              <p className="text-sm text-secondary-dark/40 mt-2 font-body">
                Vous pouvez intégrer une bibliothèque comme react-calendar ou fullcalendar ici
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
