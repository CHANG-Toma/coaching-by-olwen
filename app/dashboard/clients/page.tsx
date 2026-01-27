"use client"

import { useState } from "react"

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-dark mb-2">
            Gestion des Clients
          </h1>
          <p className="text-secondary-dark/70 font-body">
            Gérez tous vos clients et leurs informations
          </p>
        </div>
        <button className="px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body">
          + Nouveau client
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-dark/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
            />
          </div>
        </div>
      </div>

      {/* Liste des clients */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-light/30">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-dark font-body">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-dark font-body">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-dark font-body">
                  Téléphone
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-dark font-body">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-dark font-body">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-light">
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-secondary-dark/60 font-body">
                  Aucun client trouvé
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
