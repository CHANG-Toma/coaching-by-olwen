"use client"

import { signIn, getSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email ou mot de passe incorrect")
        setLoading(false)
        return
      }

      // Récupérer le rôle directement depuis la base de données en utilisant l'email
      // Cela évite les problèmes de timing avec la session
      let redirectPath = "/espace-client" // Par défaut pour les clients
      
      try {
        console.log("🔍 Récupération du rôle pour:", email)
        const roleResponse = await fetch("/api/auth/get-role-by-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          cache: "no-store",
        })
        
        console.log("📡 Status de la réponse:", roleResponse.status, roleResponse.ok)
        
        if (roleResponse.ok) {
          const roleData = await roleResponse.json()
          console.log("📦 Données reçues:", roleData)
          const role = roleData.role
          console.log("🎭 Rôle extrait:", role, "Type:", typeof role)
          
          // Déterminer le chemin de redirection selon le rôle
          if (role === "ADMIN") {
            redirectPath = "/dashboard"
            console.log("✅ Redirection vers /dashboard")
          } else {
            redirectPath = "/espace-client"
            console.log("ℹ️ Rôle non ADMIN, redirection vers /espace-client")
          }
        } else {
          const errorData = await roleResponse.json()
          console.error("❌ Erreur de la réponse:", errorData)
        }
      } catch (err) {
        console.error("❌ Erreur lors de la récupération du rôle:", err)
      }
      
      // Rediriger vers le chemin déterminé
      // Utiliser window.location.href pour forcer une navigation complète et recharger la session
      console.log("🚀 Navigation vers:", redirectPath)
      window.location.href = redirectPath
    } catch (err) {
      setError("Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center gradient-primary pt-16 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">CO</span>
            </div>
            <span className="font-heading font-bold text-xl text-white">
              Coaching By Olwen
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h1 className="mb-2 text-center text-3xl font-heading font-bold text-secondary-dark">
            Connexion
          </h1>
          <p className="text-center text-secondary-dark/70 mb-6 font-body">
            Connectez-vous à votre compte
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border-2 border-secondary-light px-4 py-3 focus:border-primary-violet focus:outline-none focus:ring-2 focus:ring-primary-violet/20 transition-all font-body"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border-2 border-secondary-light px-4 py-3 focus:border-primary-violet focus:outline-none focus:ring-2 focus:ring-primary-violet/20 transition-all font-body"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary-violet rounded" />
                <span className="text-secondary-dark/70 font-body">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-primary-violet hover:underline font-body">
                Mot de passe oublié ?
              </a>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600 font-body">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full gradient-primary px-6 py-3 font-bold text-white transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-light"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-secondary-dark/60 font-body">ou</span>
            </div>
          </div>

          {/* Register link */}
          <div className="text-center">
            <p className="text-secondary-dark/70 font-body">
              Pas encore de compte ?{" "}
              <Link href="/auth/register" className="text-primary-violet font-semibold hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-white/80 hover:text-white text-sm font-body transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
