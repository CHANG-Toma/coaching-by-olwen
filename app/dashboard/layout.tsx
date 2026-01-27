"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/app/components/admin/Sidebar"
import Header from "@/app/components/admin/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [roleVerified, setRoleVerified] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }
    
    // Ne pas rediriger immédiatement si la session est en cours de chargement
    if (status === "loading") {
      return
    }
    
    // Si la session est chargée mais le rôle n'est pas ADMIN, vérifier directement dans la DB
    if (status === "authenticated" && session?.user?.email) {
      // Vérifier le rôle directement depuis la DB pour éviter les problèmes de cache
      const checkRole = async () => {
        try {
          const roleResponse = await fetch("/api/auth/get-role-by-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
            cache: "no-store",
          })
          
          if (roleResponse.ok) {
            const roleData = await roleResponse.json()
            const role = roleData.role
            
            if (role !== "ADMIN") {
              window.location.href = "/espace-client"
            } else {
              // Le rôle est ADMIN, on peut afficher le dashboard
              setRoleVerified(true)
            }
          } else {
            // Si on ne peut pas vérifier le rôle, rediriger par sécurité
            if (session?.user?.role !== "ADMIN") {
              window.location.href = "/espace-client"
            }
          }
        } catch (err) {
          console.error("Erreur lors de la vérification du rôle:", err)
          // En cas d'erreur, vérifier la session
          if (session?.user?.role !== "ADMIN") {
            window.location.href = "/espace-client"
          }
        }
      }
      
      // Si la session a déjà le rôle ADMIN, on peut afficher directement
      if (session.user.role === "ADMIN") {
        setRoleVerified(true)
      } else {
        // Sinon, vérifier dans la DB
        checkRole()
      }
    }
  }, [status, session, router])

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

  // Ne pas afficher le contenu si pas de session
  if (!session) {
    return null
  }
  
  // Si le rôle dans la session n'est pas ADMIN et qu'on n'a pas encore vérifié dans la DB,
  // on affiche un loader pendant la vérification
  if ((!session.user?.role || session.user?.role !== "ADMIN") && !roleVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-violet mx-auto mb-4"></div>
          <p className="text-secondary-dark">Vérification des permissions...</p>
        </div>
      </div>
    )
  }
  
  // Si le rôle n'est pas ADMIN après vérification, ne rien afficher (redirection en cours)
  if (session.user?.role !== "ADMIN" && !roleVerified) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
