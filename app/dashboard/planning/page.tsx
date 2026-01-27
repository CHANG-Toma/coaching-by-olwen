"use client"

import { useState } from "react"

export default function PlanningPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-dark mb-2">
            Planning
          </h1>
          <p className="text-secondary-dark/70 font-body">
            Gérez vos rendez-vous et votre calendrier
          </p>
        </div>
        <button className="px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body">
          + Nouveau rendez-vous
        </button>
      </div>

      {/* Vue calendrier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-secondary-dark">
              Calendrier
            </h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-secondary-light transition-colors">
                <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary-light transition-colors">
                <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="h-96 flex items-center justify-center border-2 border-dashed border-secondary-light rounded-lg">
            <p className="text-secondary-dark/60 font-body">Calendrier à intégrer</p>
          </div>
        </div>

        {/* Liste des rendez-vous */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
            Rendez-vous du jour
          </h2>
          <div className="space-y-3">
            <div className="p-4 border-2 border-secondary-light rounded-lg">
              <p className="text-sm text-secondary-dark/60 font-body text-center">
                Aucun rendez-vous prévu aujourd'hui
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-secondary-light">
            <h3 className="text-lg font-heading font-bold text-secondary-dark mb-4">
              Prochains rendez-vous
            </h3>
            <div className="space-y-3">
              <div className="p-4 border-2 border-secondary-light rounded-lg">
                <p className="text-sm text-secondary-dark/60 font-body text-center">
                  Aucun rendez-vous à venir
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
