"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/app/contexts/ToastContext"

interface User {
  id: string
  name: string | null
  email: string | null
  role: "CLIENT" | "ADMIN"
  createdAt: string
}

export default function ClientsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { showSuccess, showError, showWarning } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/users")
      if (!response.ok) {
        throw new Error("Erreur lors du chargement des utilisateurs")
      }
      const data = await response.json()
      setUsers(data.users || [])
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const updateRole = async (userId: string, newRole: "CLIENT" | "ADMIN") => {
    try {
      setUpdating(userId)
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors de la mise à jour")
      }

      // Mettre à jour la liste des utilisateurs
      await fetchUsers()

      // Si l'utilisateur modifie son propre rôle, proposer de se déconnecter pour rafraîchir la session
      if (session?.user?.id === userId) {
        const confirmMessage = 
          newRole === "ADMIN" 
            ? "Votre rôle a été changé en ADMIN. Vous devez vous reconnecter pour accéder au dashboard admin. Voulez-vous vous déconnecter maintenant ?"
            : "Votre rôle a été changé en CLIENT. Vous devez vous reconnecter. Voulez-vous vous déconnecter maintenant ?"
        
        if (window.confirm(confirmMessage)) {
          showWarning("Déconnexion en cours...")
          await signOut({ callbackUrl: "/auth/signin" })
          return
        }
      } else {
        // Pour les autres utilisateurs, afficher un message de succès
        showSuccess("Rôle de l'utilisateur mis à jour avec succès. L'utilisateur devra se déconnecter et se reconnecter pour que les changements prennent effet.")
      }
    } catch (err: any) {
      showError(err.message || "Une erreur est survenue")
    } finally {
      setUpdating(null)
    }
  }

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase()
    return (
      user.name?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search)
    )
  })

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-secondary-dark mb-2">
            Gestion des Utilisateurs
          </h1>
          <p className="text-secondary-dark/70 font-body">
            Gérez tous les utilisateurs et leurs rôles
          </p>
        </div>
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
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
            />
          </div>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-violet mx-auto mb-4"></div>
            <p className="text-secondary-dark/60 font-body">Chargement...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600 font-body">{error}</p>
            <button
              onClick={fetchUsers}
              className="mt-4 px-4 py-2 gradient-primary text-white rounded-lg font-body"
            >
              Réessayer
            </button>
          </div>
        ) : (
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
                    Rôle
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-dark font-body">
                    Date d'inscription
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-dark font-body">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-light">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-secondary-dark/60 font-body">
                      Aucun utilisateur trouvé
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-secondary-light/20 cursor-pointer"
                      onClick={() => router.push(`/dashboard/clients/${user.id}`)}
                    >
                      <td className="px-6 py-4 font-body">
                        {user.name || "Non renseigné"}
                      </td>
                      <td className="px-6 py-4 font-body">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-body ${
                            user.role === "ADMIN"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-secondary-dark/60 font-body">
                        {new Date(user.createdAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              updateRole(user.id, e.target.value as "CLIENT" | "ADMIN")
                            }
                            disabled={updating === user.id}
                            className="px-3 py-1 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="CLIENT">CLIENT</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
