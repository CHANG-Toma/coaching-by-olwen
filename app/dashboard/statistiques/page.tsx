"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

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

type MonthlyClient = {
  month: number
  year: number
  count: number
}

type Metrics = {
  conversionRate: number
  retentionRate: number
  satisfaction: number
  confirmationRate: number
  cancellationRate: number
  averageAppointmentsPerClient: number
}

type StatsResponse = {
  totals: Totals
  monthlyClients: MonthlyClient[]
  monthlyAppointments: MonthlyClient[]
  metrics: Metrics
}

export default function StatistiquesPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("/api/admin/statistics", {
          method: "GET",
          cache: "no-store",
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Impossible de charger les statistiques")
        }

        const data = (await res.json()) as StatsResponse
        setStats(data)
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-secondary-dark/70 font-body">Chargement des statistiques...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-body">Erreur : {error}</p>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const { totals, monthlyClients, monthlyAppointments, metrics } = stats

  const formatMonth = (m: MonthlyClient) =>
    `${m.month.toString().padStart(2, "0")}/${m.year.toString().slice(-2)}`

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  // Préparer les données pour les graphiques
  const clientsChartData = monthlyClients.map((m) => ({
    mois: `${monthNames[m.month - 1]?.slice(0, 3) || ""} ${m.year.toString().slice(-2)}`,
    clients: m.count,
  }))

  const appointmentsChartData = monthlyAppointments.map((m) => ({
    mois: `${monthNames[m.month - 1]?.slice(0, 3) || ""} ${m.year.toString().slice(-2)}`,
    rendezvous: m.count,
  }))

  // Données pour le graphique en camembert des statuts
  const statusData = [
    { name: "Confirmés", value: totals.confirmedAppointments, color: "#10b981" },
    { name: "En attente", value: totals.pendingAppointments, color: "#f59e0b" },
    { name: "Terminés", value: totals.completedAppointments, color: "#3b82f6" },
    { name: "Annulés", value: totals.cancelledAppointments, color: "#ef4444" },
  ].filter((item) => item.value > 0)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-secondary-dark mb-2">
          Statistiques
        </h1>
        <p className="text-secondary-dark/70 font-body">
          Analysez les performances de votre activité
        </p>
      </div>

      {/* Résumé global - Utilisateurs */}
      <div className="mb-6">
        <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">Utilisateurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-secondary-light/60">
            <p className="text-sm text-secondary-dark/60 font-body mb-1">Utilisateurs au total</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">{totals.totalUsers}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-secondary-light/60">
            <p className="text-sm text-secondary-dark/60 font-body mb-1">Clients</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">{totals.totalClients}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-secondary-light/60">
            <p className="text-sm text-secondary-dark/60 font-body mb-1">Admins</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">{totals.totalAdmins}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-secondary-light/60">
            <p className="text-sm text-secondary-dark/60 font-body mb-1">Nouveaux sur 30 jours</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">
              {totals.newUsersLast30Days}
            </p>
          </div>
        </div>
      </div>

      {/* Graphiques - Rendez-vous */}
      <div className="mb-8">
        <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
          Graphiques - Rendez-vous
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
          {/* Répartition des statuts */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-heading font-bold text-secondary-dark mb-4">
              Répartition des statuts
            </h3>
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry: any) => {
                      const name = entry.name || ""
                      const percent = entry.percent || 0
                      return `${name}: ${(percent * 100).toFixed(0)}%`
                    }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontFamily: "inherit",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-secondary-dark/60 font-body">
                Aucune donnée disponible
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-heading font-bold text-secondary-dark mb-4">
            Évolution des nouveaux clients (6 derniers mois)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clientsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="mois"
                stroke="#6b7280"
                style={{ fontSize: "12px", fontFamily: "inherit" }}
              />
              <YAxis stroke="#6b7280" style={{ fontSize: "12px", fontFamily: "inherit" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  fontFamily: "inherit",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="clients"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Nouveaux clients"
                dot={{ fill: "#3b82f6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section Revenus - Prête pour l'avenir */}
      <div className="mb-8">
        <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
          Revenus
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-heading font-bold text-secondary-dark mb-4">
              Évolution des revenus mensuels
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-secondary-light rounded-lg">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-secondary-light"
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
                <p className="text-secondary-dark/60 font-body mb-2">
                  Aucune donnée de revenus disponible
                </p>
                <p className="text-sm text-secondary-dark/40 font-body">
                  Les revenus apparaîtront ici une fois le modèle de paiement/facturation créé
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-heading font-bold text-secondary-dark mb-4">
              Répartition des revenus par source
            </h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-secondary-light rounded-lg">
              <div className="text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-secondary-light"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p className="text-secondary-dark/60 font-body mb-2">
                  Aucune donnée de revenus disponible
                </p>
                <p className="text-sm text-secondary-dark/40 font-body">
                  Les revenus apparaîtront ici une fois le modèle de paiement/facturation créé
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Tableau de statistiques */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
          Autres métriques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border-2 border-secondary-light rounded-lg">
            <p className="text-sm text-secondary-dark/60 font-body mb-2">Taux de conversion</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">
              {metrics.conversionRate}%
            </p>
            <p className="text-xs text-secondary-dark/50 font-body mt-1">
              À affiner lorsque vous aurez des données de leads vs clients.
            </p>
          </div>
          <div className="p-4 border-2 border-secondary-light rounded-lg">
            <p className="text-sm text-secondary-dark/60 font-body mb-2">Taux de rétention</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">
              {metrics.retentionRate}%
            </p>
            <p className="text-xs text-secondary-dark/50 font-body mt-1">
              À calculer ensuite avec vos données de renouvellement.
            </p>
          </div>
          <div className="p-4 border-2 border-secondary-light rounded-lg">
            <p className="text-sm text-secondary-dark/60 font-body mb-2">Satisfaction client</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">
              {metrics.satisfaction}/5
            </p>
            <p className="text-xs text-secondary-dark/50 font-body mt-1">
              À connecter plus tard à vos enquêtes de satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
