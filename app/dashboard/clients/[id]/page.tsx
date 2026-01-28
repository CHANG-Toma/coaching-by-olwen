"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/app/contexts/ToastContext"

type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: "CLIENT" | "ADMIN"
  createdAt: Date
  updatedAt: Date
}

type Appointment = {
  id: string
  startTime: string
  endTime: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  notes: string | null
  user: {
    id: string
    name: string | null
    email: string | null
  }
}

type UserDetailsResponse = {
  user: User
  appointments: Appointment[]
  quotes: any[]
  invoices: any[]
  payments: any[]
}

type Tab = "info" | "appointments" | "quotes" | "invoices" | "payments"

export default function ClientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { showSuccess, showError } = useToast()
  const userId = params.id as string
  const [activeTab, setActiveTab] = useState<Tab>("info")
  const [data, setData] = useState<UserDetailsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "CLIENT" as "CLIENT" | "ADMIN",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchUserDetails()
  }, [userId])

  const fetchUserDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/admin/users/${userId}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors du chargement")
      }
      const userData = (await response.json()) as UserDetailsResponse
      setData(userData)
      setFormData({
        name: userData.user.name || "",
        email: userData.user.email || "",
        role: userData.user.role,
      })
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la sauvegarde")
      }

      await fetchUserDetails()
      setEditing(false)
      showSuccess("Informations mises à jour avec succès")
    } catch (err: any) {
      showError(err.message || "Une erreur est survenue")
    } finally {
      setSaving(false)
    }
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "info", label: "Informations" },
    { id: "appointments", label: "Rendez-vous" },
    { id: "quotes", label: "Devis" },
    { id: "invoices", label: "Factures" },
    { id: "payments", label: "Paiements" },
  ]

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-violet mx-auto mb-4"></div>
          <p className="text-secondary-dark/60 font-body">Chargement...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="font-body mb-4">Erreur : {error || "Données non disponibles"}</p>
        <div className="flex gap-2">
          <button
            onClick={fetchUserDetails}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-body"
          >
            Réessayer
          </button>
          <Link
            href="/dashboard/clients"
            className="px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-body"
          >
            Retour à la liste
          </Link>
        </div>
      </div>
    )
  }

  const { user, appointments, quotes, invoices, payments } = data

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/clients"
            className="text-primary-violet hover:text-primary-violet/80 font-body mb-2 inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la liste
          </Link>
          <h1 className="text-3xl font-heading font-bold text-secondary-dark">
            {user.name || user.email || "Utilisateur"}
          </h1>
          <p className="text-secondary-dark/70 font-body mt-1">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg mb-6">
        <div className="border-b border-secondary-light">
          <div className="flex space-x-1 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium font-body transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-primary-violet text-primary-violet"
                    : "border-transparent text-secondary-dark/60 hover:text-secondary-dark hover:border-secondary-light"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "info" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-heading font-bold text-secondary-dark">
                  Informations personnelles
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 gradient-primary text-white rounded-lg hover:scale-105 transition-transform font-body"
                  >
                    Modifier
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 gradient-primary text-white rounded-lg hover:scale-105 transition-transform font-body disabled:opacity-50"
                    >
                      {saving ? "Enregistrement..." : "Enregistrer"}
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false)
                        setFormData({
                          name: user.name || "",
                          email: user.email || "",
                          role: user.role,
                        })
                      }}
                      className="px-4 py-2 border-2 border-secondary-light rounded-lg hover:bg-secondary-light transition-colors font-body"
                    >
                      Annuler
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                    Nom
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-secondary-light/30 rounded-lg font-body">
                      {user.name || "Non renseigné"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                    Email
                  </label>
                  {editing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-secondary-light/30 rounded-lg font-body">
                      {user.email || "Non renseigné"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                    Rôle
                  </label>
                  {editing ? (
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value as "CLIENT" | "ADMIN" })
                      }
                      className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                    >
                      <option value="CLIENT">CLIENT</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold font-body ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                    Date d'inscription
                  </label>
                  <p className="px-4 py-2 bg-secondary-light/30 rounded-lg font-body">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {user.emailVerified && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                      Email vérifié le
                    </label>
                    <p className="px-4 py-2 bg-secondary-light/30 rounded-lg font-body">
                      {new Date(user.emailVerified).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div>
              <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
                Rendez-vous ({appointments.length})
              </h2>
              {appointments.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-secondary-light rounded-lg">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-secondary-dark/60 font-body mb-2">
                    Aucun rendez-vous pour ce client
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((apt) => {
                    const start = new Date(apt.startTime)
                    const end = new Date(apt.endTime)
                    return (
                      <div
                        key={apt.id}
                        className="p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-heading font-bold text-secondary-dark">
                                {start.toLocaleDateString("fr-FR", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold font-body ${
                                  apt.status === "CONFIRMED"
                                    ? "bg-green-100 text-green-800"
                                    : apt.status === "PENDING"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : apt.status === "CANCELLED"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {apt.status === "CONFIRMED"
                                  ? "Confirmé"
                                  : apt.status === "PENDING"
                                  ? "En attente"
                                  : apt.status === "CANCELLED"
                                  ? "Annulé"
                                  : "Terminé"}
                              </span>
                            </div>
                            <p className="text-sm text-secondary-dark/60 font-body mb-2">
                              {start.toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              -{" "}
                              {end.toLocaleTimeString("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            {apt.notes && (
                              <p className="text-sm text-secondary-dark/80 font-body bg-secondary-light/30 p-2 rounded-lg mt-2">
                                {apt.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "quotes" && (
            <div>
              <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
                Devis ({quotes.length})
              </h2>
              {quotes.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-secondary-light rounded-lg">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-secondary-dark/60 font-body mb-2">
                    Aucun devis pour cet utilisateur
                  </p>
                  <p className="text-sm text-secondary-dark/40 font-body">
                    Les devis apparaîtront ici une fois le modèle Quote créé dans Prisma
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.map((quote) => (
                    <div key={quote.id} className="p-4 border-2 border-secondary-light rounded-lg">
                      {/* Contenu du devis */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "invoices" && (
            <div>
              <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
                Factures ({invoices.length})
              </h2>
              {invoices.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-secondary-light rounded-lg">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-secondary-dark/60 font-body mb-2">
                    Aucune facture pour cet utilisateur
                  </p>
                  <p className="text-sm text-secondary-dark/40 font-body">
                    Les factures apparaîtront ici une fois le modèle Invoice créé dans Prisma
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="p-4 border-2 border-secondary-light rounded-lg">
                      {/* Contenu de la facture */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
                Paiements ({payments.length})
              </h2>
              {payments.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-secondary-light rounded-lg">
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
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-secondary-dark/60 font-body mb-2">
                    Aucun paiement pour cet utilisateur
                  </p>
                  <p className="text-sm text-secondary-dark/40 font-body">
                    Les paiements apparaîtront ici une fois le modèle Payment créé dans Prisma
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="p-4 border-2 border-secondary-light rounded-lg">
                      {/* Contenu du paiement */}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
