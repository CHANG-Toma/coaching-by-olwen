"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, getSession } from "next-auth/react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      setLoading(false)
      return
    }

    try {
      // Créer le compte
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Une erreur est survenue")
        setLoading(false)
        return
      }

      // Connecter automatiquement l'utilisateur après l'inscription
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Compte créé mais erreur de connexion. Veuillez vous connecter.")
        setLoading(false)
        router.push("/auth/signin")
      } else {
        // Récupérer la session pour obtenir le rôle
        const session = await getSession()
        if (session?.user?.role === "ADMIN") {
          router.push("/dashboard")
        } else {
          router.push("/espace-client")
        }
        router.refresh()
      }
    } catch (err) {
      setError("Une erreur est survenue lors de l'inscription")
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
            Créer un Compte
          </h1>
          <p className="text-center text-secondary-dark/70 mb-6 font-body">
            Commencez votre transformation dès aujourd'hui
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-2 border-secondary-light px-4 py-3 focus:border-primary-violet focus:outline-none focus:ring-2 focus:ring-primary-violet/20 transition-all font-body"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full rounded-lg border-2 border-secondary-light px-4 py-3 focus:border-primary-violet focus:outline-none focus:ring-2 focus:ring-primary-violet/20 transition-all font-body"
                placeholder="Au moins 6 caractères"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-lg border-2 border-secondary-light px-4 py-3 focus:border-primary-violet focus:outline-none focus:ring-2 focus:ring-primary-violet/20 transition-all font-body"
                placeholder="Répétez votre mot de passe"
              />
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
              {loading ? "Création du compte..." : "Créer mon compte"}
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

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-secondary-dark/70 font-body">
              Déjà un compte ?{" "}
              <Link href="/auth/signin" className="text-primary-violet font-semibold hover:underline">
                Se connecter
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
