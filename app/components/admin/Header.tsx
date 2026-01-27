"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { data: session } = useSession()
  const pathname = usePathname()

  const getPageTitle = () => {
    if (pathname?.includes("/statistiques")) return "Statistiques"
    if (pathname?.includes("/clients")) return "Clients"
    if (pathname?.includes("/planning")) return "Planning"
    return "Dashboard"
  }

  return (
    <header className="bg-white shadow-sm border-b border-secondary-light sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Menu button pour mobile */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-secondary-dark hover:bg-secondary-light transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Titre de la page - sera dynamique selon la route */}
        <div className="flex-1 lg:ml-0 ml-4">
          <h1 className="text-xl font-heading font-bold text-secondary-dark">
            {getPageTitle()}
          </h1>
        </div>

        {/* User info */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-secondary-dark font-body">
              {session?.user?.name || "Admin"}
            </span>
            <span className="text-xs text-secondary-dark/60 font-body">
              {session?.user?.email}
            </span>
          </div>
          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {(session?.user?.name || "A")[0].toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
