"use client"

export default function StatistiquesPage() {
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

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
            Évolution des clients
          </h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-secondary-light rounded-lg">
            <p className="text-secondary-dark/60 font-body">Graphique à intégrer</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
            Revenus mensuels
          </h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-secondary-light rounded-lg">
            <p className="text-secondary-dark/60 font-body">Graphique à intégrer</p>
          </div>
        </div>
      </div>

      {/* Tableau de statistiques */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
          Vue d'ensemble
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border-2 border-secondary-light rounded-lg">
            <p className="text-sm text-secondary-dark/60 font-body mb-2">Taux de conversion</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">0%</p>
          </div>
          <div className="p-4 border-2 border-secondary-light rounded-lg">
            <p className="text-sm text-secondary-dark/60 font-body mb-2">Taux de rétention</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">0%</p>
          </div>
          <div className="p-4 border-2 border-secondary-light rounded-lg">
            <p className="text-sm text-secondary-dark/60 font-body mb-2">Satisfaction client</p>
            <p className="text-2xl font-heading font-bold text-secondary-dark">0/5</p>
          </div>
        </div>
      </div>
    </div>
  )
}
