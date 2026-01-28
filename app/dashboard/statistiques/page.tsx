"use client"

import { useEffect, useState } from "react"

type Totals = {
  totalUsers: number
  totalClients: number
  totalAdmins: number
  newUsersLast30Days: number
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
}

type StatsResponse = {
  totals: Totals
  monthlyClients: MonthlyClient[]
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

  const { totals, monthlyClients, metrics } = stats

  const formatMonth = (m: MonthlyClient) =>
    `${m.month.toString().padStart(2, "0")}/${m.year.toString().slice(-2)}`

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

      {/* Résumé global */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
            Évolution des clients (6 derniers mois)
          </h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-secondary-light rounded-lg">
            <div className="w-full max-w-md">
              <div className="grid grid-cols-6 gap-2 text-center text-xs font-body text-secondary-dark/70 mb-3">
                {monthlyClients.map((m) => (
                  <div key={`${m.year}-${m.month}`}>
                    <div className="font-semibold">{m.count}</div>
                    <div>{formatMonth(m)}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-secondary-dark/50 font-body text-center">
                Intégrez plus tard un vrai graphique (ex: Recharts) en utilisant ces données.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
            Revenus mensuels
          </h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-secondary-light rounded-lg">
            <p className="text-secondary-dark/60 font-body text-center px-4">
              Aucune donnée de revenus n&apos;est encore définie dans la base. 
              Vous pourrez connecter ici vos modèles de paiements/facturation quand ils existeront.
            </p>
          </div>
        </div>
      </div>

      {/* Tableau de statistiques */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
          Vue d&apos;ensemble
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
