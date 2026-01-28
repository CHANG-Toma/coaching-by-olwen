"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"

type Totals = {
  totalUsers: number
  totalClients: number
  totalAdmins: number
  newUsersLast30Days: number
  totalAppointments: number
  confirmedAppointments: number
  pendingAppointments: number
  cancelledAppointments: number
  completedAppointments: number
  upcomingAppointments: number
  appointmentsLast30Days: number
}

type Appointment = {
  id: string
  startTime: string
  endTime: string
  status: string
  notes: string | null
  user: {
    name: string | null
    email: string
  }
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<Totals | null>(null)
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les statistiques
        const statsRes = await fetch("/api/admin/statistics", {
          method: "GET",
          cache: "no-store",
        })
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData.totals)
        }

        // Charger les rendez-vous à venir
        const now = new Date()
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        const appointmentsRes = await fetch(
          `/api/appointments?startDate=${now.toISOString()}&endDate=${endOfMonth.toISOString()}`,
          {
            method: "GET",
            cache: "no-store",
          }
        )
        if (appointmentsRes.ok) {
          const appointmentsData = await appointmentsRes.json()
          // L'API retourne { appointments: [...] }
          const appointments = appointmentsData.appointments || appointmentsData
          // Filtrer les rendez-vous annulés et trier par date, puis prendre les 5 prochains
          const sorted = appointments
            .filter((a: Appointment) => a.status !== "CANCELLED")
            .sort((a: Appointment, b: Appointment) => 
              new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
            )
            .slice(0, 5)
          setUpcomingAppointments(sorted)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-secondary-dark mb-2">
          Tableau de bord
        </h1>
        <p className="text-secondary-dark/70 font-body">
          Bienvenue, {session?.user?.name || "Olwen"}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-secondary-dark/70 font-body">
                  Total Clients
                </h3>
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-heading font-bold text-secondary-dark">
                {loading ? "..." : stats?.totalClients || 0}
              </p>
              <p className="text-sm text-secondary-dark/60 mt-1 font-body">
                Clients actifs
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-secondary-dark/70 font-body">
                  Rendez-vous
                </h3>
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
              </div>
              <p className="text-3xl font-heading font-bold text-secondary-dark">
                {loading ? "..." : stats?.appointmentsLast30Days || 0}
              </p>
              <p className="text-sm text-secondary-dark/60 mt-1 font-body">
                Ce mois-ci
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-secondary-dark/70 font-body">
                  Devis en attente
                </h3>
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-heading font-bold text-secondary-dark">0</p>
              <p className="text-sm text-secondary-dark/60 mt-1 font-body">
                À traiter
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-secondary-dark/70 font-body">
                  Revenus
                </h3>
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-heading font-bold text-secondary-dark">0€</p>
              <p className="text-sm text-secondary-dark/60 mt-1 font-body">
                Ce mois-ci
              </p>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gestion des Clients */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-heading font-bold text-secondary-dark mb-4">
                Gestion des Clients
              </h2>
              <div className="space-y-3">
                <Link
                  href="/dashboard/clients"
                  className="flex items-center justify-between p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors"
                >
                  <div>
                    <p className="font-semibold text-secondary-dark font-body">
                      Liste des clients
                    </p>
                    <p className="text-sm text-secondary-dark/60 font-body">
                      Voir et gérer tous vos clients
                    </p>
                  </div>
                  <div className="px-4 py-2 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body">
                    Voir
                  </div>
                </Link>
                <Link
                  href="/dashboard/clients?add=true"
                  className="flex items-center justify-between p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors"
                >
                  <div>
                    <p className="font-semibold text-secondary-dark font-body">
                      Nouveau client
                    </p>
                    <p className="text-sm text-secondary-dark/60 font-body">
                      Ajouter un client manuellement
                    </p>
                  </div>
                  <div className="px-4 py-2 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body">
                    Ajouter
                  </div>
                </Link>
              </div>
            </div>

            {/* Gestion des Devis/Factures */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-heading font-bold text-secondary-dark mb-4">
                Devis & Factures
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border-2 border-secondary-light rounded-lg opacity-60">
                  <div>
                    <p className="font-semibold text-secondary-dark font-body">
                      Créer un devis
                    </p>
                    <p className="text-sm text-secondary-dark/60 font-body">
                      Bientôt disponible
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-semibold font-body cursor-not-allowed">
                    Créer
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border-2 border-secondary-light rounded-lg opacity-60">
                  <div>
                    <p className="font-semibold text-secondary-dark font-body">
                      Voir les factures
                    </p>
                    <p className="text-sm text-secondary-dark/60 font-body">
                      Bientôt disponible
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-semibold font-body cursor-not-allowed">
                    Voir
                  </div>
                </div>
              </div>
            </div>
          </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rendez-vous à venir */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-bold text-secondary-dark">
              Rendez-vous à venir
            </h2>
            <Link
              href="/dashboard/planning"
              className="text-sm text-primary-violet hover:underline font-body"
            >
              Voir tout
            </Link>
          </div>
          <div className="space-y-3">
            {loading ? (
              <div className="p-4 border-2 border-secondary-light rounded-lg">
                <p className="text-sm text-secondary-dark/60 font-body">Chargement...</p>
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="p-4 border-2 border-secondary-light rounded-lg">
                <p className="text-sm text-secondary-dark/60 font-body">Aucun rendez-vous prévu</p>
              </div>
            ) : (
              upcomingAppointments.map((appointment) => {
                const date = new Date(appointment.startTime)
                const formattedDate = date.toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                const formattedTime = date.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                return (
                  <Link
                    key={appointment.id}
                    href="/dashboard/planning"
                    className="block p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-secondary-dark font-body">
                          {appointment.user.name || appointment.user.email}
                        </p>
                        <p className="text-sm text-secondary-dark/60 font-body">
                          {formattedDate} à {formattedTime}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium font-body ${
                          appointment.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {appointment.status === "CONFIRMED"
                          ? "Confirmé"
                          : appointment.status === "PENDING"
                          ? "En attente"
                          : appointment.status}
                      </span>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/dashboard/clients"
              className="p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors text-center"
            >
              <svg className="w-8 h-8 mx-auto mb-2 text-primary-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-sm font-medium text-secondary-dark font-body">Clients</p>
            </a>
            <a
              href="/dashboard/planning"
              className="p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors text-center"
            >
              <svg className="w-8 h-8 mx-auto mb-2 text-primary-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium text-secondary-dark font-body">Planning</p>
            </a>
            <a
              href="/dashboard/statistiques"
              className="p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors text-center"
            >
              <svg className="w-8 h-8 mx-auto mb-2 text-primary-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm font-medium text-secondary-dark font-body">Stats</p>
            </a>
            <div className="p-4 border-2 border-secondary-light rounded-lg opacity-60 text-center cursor-not-allowed">
              <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-secondary-dark/60 font-body">Devis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
