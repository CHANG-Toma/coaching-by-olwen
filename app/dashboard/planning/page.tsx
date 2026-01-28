"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/app/contexts/ToastContext"

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

type User = {
  id: string
  name: string | null
  email: string | null
}

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
]

export default function PlanningPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { showSuccess, showError } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showDateModal, setShowDateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [clients, setClients] = useState<User[]>([])
  const [loadingClients, setLoadingClients] = useState(false)
  const [creating, setCreating] = useState(false)
  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    time: "",
    notes: "",
    status: "PENDING" as "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED",
  })

  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      router.push("/dashboard")
      return
    }
    fetchAppointments()
    fetchClients()
  }, [session, currentDate])

  const fetchClients = async () => {
    try {
      setLoadingClients(true)
      const response = await fetch("/api/admin/users")
      if (!response.ok) throw new Error("Erreur lors du chargement des clients")
      const data = await response.json()
      const clientUsers = (data.users || []).filter((user: any) => user.role === "CLIENT")
      setClients(clientUsers)
    } catch (err: any) {
      showError(err.message || "Erreur lors du chargement des clients")
    } finally {
      setLoadingClients(false)
    }
  }

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59)

      const response = await fetch(
        `/api/appointments?startDate=${startOfMonth.toISOString()}&endDate=${endOfMonth.toISOString()}`
      )
      if (!response.ok) throw new Error("Erreur lors du chargement")
      const data = await response.json()
      setAppointments(data.appointments || [])
    } catch (err: any) {
      showError(err.message || "Erreur lors du chargement des rendez-vous")
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getAppointmentsForDate = (date: Date) => {
    // Extraire les composants de date locale pour éviter les problèmes de fuseau horaire
    const dateYear = date.getFullYear()
    const dateMonth = date.getMonth()
    const dateDay = date.getDate()
    
    return appointments.filter((apt) => {
      if (apt.status === "CANCELLED") return false
      
      const aptDate = new Date(apt.startTime)
      const aptYear = aptDate.getFullYear()
      const aptMonth = aptDate.getMonth()
      const aptDay = aptDate.getDate()
      
      // Comparer les dates calendaires (jour/mois/année)
      return (
        dateYear === aptYear &&
        dateMonth === aptMonth &&
        dateDay === aptDay
      )
    })
  }

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la mise à jour")
      }

      showSuccess("Statut du rendez-vous mis à jour")
      await fetchAppointments()
      setShowModal(false)
      setSelectedAppointment(null)
    } catch (err: any) {
      showError(err.message || "Erreur lors de la mise à jour")
    }
  }

  const handleDelete = async (appointmentId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      return
    }

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erreur lors de la suppression")
      }

      showSuccess("Rendez-vous supprimé avec succès")
      await fetchAppointments()
      setShowModal(false)
      setSelectedAppointment(null)
    } catch (err: any) {
      showError(err.message || "Erreur lors de la suppression")
    }
  }

  // Fonction helper pour formater une date en YYYY-MM-DD sans conversion UTC
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const isTimePastForDate = (date: string, time: string) => {
    if (!date || !time) return false
    
    // Extraire les composants de date directement depuis la chaîne pour éviter les problèmes de fuseau horaire
    const [year, month, day] = date.split("-").map(Number)
    const [hours, minutes] = time.split(":").map(Number)
    
    // Créer la date/heure du rendez-vous en utilisant les composants locaux
    const appointmentTime = new Date(year, month - 1, day, hours, minutes, 0, 0)
    
    // Obtenir la date actuelle
    const today = new Date()
    
    // Comparer les dates calendaires (jour/mois/année) en utilisant les composants
    const appointmentYear = appointmentTime.getFullYear()
    const appointmentMonth = appointmentTime.getMonth()
    const appointmentDay = appointmentTime.getDate()
    
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth()
    const todayDay = today.getDate()
    
    // Si c'est le jour même, vérifier que l'heure n'est pas passée (avec une marge de 30 minutes)
    const isToday = appointmentYear === todayYear && 
                   appointmentMonth === todayMonth && 
                   appointmentDay === todayDay
    
    if (isToday) {
      const thirtyMinutesFromNow = new Date(today.getTime() + 30 * 60 * 1000)
      return appointmentTime < thirtyMinutesFromNow
    }
    
    // Si c'est un jour passé, retourner true (heure passée)
    const isPastDay = appointmentYear < todayYear || 
                     (appointmentYear === todayYear && appointmentMonth < todayMonth) ||
                     (appointmentYear === todayYear && appointmentMonth === todayMonth && appointmentDay < todayDay)
    
    return isPastDay
  }

  // Vérifier si un créneau horaire est déjà réservé pour une date donnée
  const isTimeSlotBooked = (date: string, time: string) => {
    if (!date || !time) return false
    
    // Extraire les composants de date directement depuis la chaîne
    const [year, month, day] = date.split("-").map(Number)
    const [hours, minutes] = time.split(":").map(Number)
    
    // Vérifier si un rendez-vous existe déjà pour cette date et cette heure
    return appointments.some((apt) => {
      if (apt.status === "CANCELLED") return false
      
      const aptDate = new Date(apt.startTime)
      const aptYear = aptDate.getFullYear()
      const aptMonth = aptDate.getMonth()
      const aptDay = aptDate.getDate()
      const aptHours = aptDate.getHours()
      const aptMinutes = aptDate.getMinutes()
      
      // Comparer la date calendaire et l'heure
      return (
        year === aptYear &&
        month - 1 === aptMonth &&
        day === aptDay &&
        hours === aptHours &&
        minutes === aptMinutes
      )
    })
  }

  const handleCreateAppointment = async () => {
    if (!formData.userId || !formData.date || !formData.time) {
      showError("Veuillez remplir tous les champs obligatoires")
      return
    }

    // Vérifier si l'heure est passée pour le jour même
    if (isTimePastForDate(formData.date, formData.time)) {
      showError("Impossible de créer un rendez-vous dans moins de 30 minutes")
      return
    }

    try {
      setCreating(true)
      const [hours, minutes] = formData.time.split(":").map(Number)
      
      // Créer la date en utilisant Date.UTC pour éviter les problèmes de conversion de fuseau horaire
      // Cela garantit que la date calendaire reste la même après conversion ISO
      const dateParts = formData.date.split("-")
      const year = parseInt(dateParts[0])
      const month = parseInt(dateParts[1]) - 1 // Les mois sont 0-indexés en JS
      const day = parseInt(dateParts[2])
      
      // Créer les dates en UTC pour préserver la date calendaire exacte
      const startTime = new Date(Date.UTC(year, month, day, hours, minutes, 0, 0))
      const endTime = new Date(Date.UTC(year, month, day, hours + 1, minutes, 0, 0))

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: formData.userId,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          notes: formData.notes || null,
          status: formData.status,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.details 
          ? `${errorData.error}\n${errorData.details}` 
          : errorData.error || "Erreur lors de la création"
        throw new Error(errorMessage)
      }

      showSuccess("Rendez-vous créé avec succès")
      setShowCreateModal(false)
      setFormData({
        userId: "",
        date: "",
        time: "",
        notes: "",
        status: "PENDING",
      })
      await fetchAppointments()
    } catch (err: any) {
      showError(err.message || "Erreur lors de la création")
      console.error("Erreur détaillée:", err)
    } finally {
      setCreating(false)
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
  const days = getDaysInMonth()

  const todayAppointments = appointments.filter((apt) => {
    const today = new Date()
    const aptDate = new Date(apt.startTime)
    return (
      aptDate.toDateString() === today.toDateString() &&
      apt.status !== "CANCELLED"
    )
  })

  const upcomingAppointments = appointments
    .filter((apt) => {
      const aptDate = new Date(apt.startTime)
      return aptDate >= new Date() && apt.status !== "CANCELLED"
    })
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5)

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
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body"
        >
          + Nouveau rendez-vous
        </button>
      </div>

      {/* Vue calendrier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Calendrier */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 rounded-lg hover:bg-secondary-light transition-colors"
            >
              <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-heading font-bold text-secondary-dark">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 rounded-lg hover:bg-secondary-light transition-colors"
            >
              <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* En-têtes des jours */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-semibold text-secondary-dark/60 font-body">
                {day}
              </div>
            ))}
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const dayAppointments = getAppointmentsForDate(date)
              const isToday = date.toDateString() === new Date().toDateString()
              const isSelected = selectedDate?.toDateString() === date.toDateString()

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => {
                    setSelectedDate(date)
                    setShowDateModal(true)
                  }}
                  className={`aspect-square rounded-lg font-body transition-all relative ${
                    isSelected
                      ? "bg-primary-violet text-white shadow-lg scale-105"
                      : isToday
                      ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                      : dayAppointments.length > 0
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-secondary-light/30 text-secondary-dark hover:bg-secondary-light"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span className="text-sm font-medium">{date.getDate()}</span>
                    {dayAppointments.length > 0 && (
                      <span className="text-xs mt-1 font-semibold">
                        {dayAppointments.length} RDV
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

        </div>

        {/* Liste des rendez-vous */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
            Rendez-vous du jour
          </h2>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-violet mx-auto mb-4"></div>
              <p className="text-secondary-dark/60 font-body text-sm">Chargement...</p>
            </div>
          ) : todayAppointments.length === 0 ? (
            <div className="p-4 border-2 border-secondary-light rounded-lg">
              <p className="text-sm text-secondary-dark/60 font-body text-center">
                Aucun rendez-vous prévu aujourd&apos;hui
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {todayAppointments.map((apt) => {
                const start = new Date(apt.startTime)
                const end = new Date(apt.endTime)
                return (
                  <div
                    key={apt.id}
                    onClick={() => {
                      setSelectedAppointment(apt)
                      setShowModal(true)
                    }}
                    className="p-3 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors cursor-pointer"
                  >
                    <p className="font-heading font-semibold text-secondary-dark text-sm">
                      {apt.user.name || apt.user.email}
                    </p>
                    <p className="text-xs text-secondary-dark/60 font-body">
                      {start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} -{" "}
                      {end.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-secondary-light">
            <h3 className="text-lg font-heading font-bold text-secondary-dark mb-4">
              Prochains rendez-vous
            </h3>
            {upcomingAppointments.length === 0 ? (
              <div className="p-4 border-2 border-secondary-light rounded-lg">
                <p className="text-sm text-secondary-dark/60 font-body text-center">
                  Aucun rendez-vous à venir
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {upcomingAppointments.map((apt) => {
                  const start = new Date(apt.startTime)
                  return (
                    <div
                      key={apt.id}
                      onClick={() => {
                        setSelectedAppointment(apt)
                        setShowModal(true)
                      }}
                      className="p-3 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors cursor-pointer"
                    >
                      <p className="font-heading font-semibold text-secondary-dark text-sm">
                        {apt.user.name || apt.user.email}
                      </p>
                      <p className="text-xs text-secondary-dark/60 font-body">
                        {start.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })} à{" "}
                        {start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal des rendez-vous du jour */}
      {showDateModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold text-secondary-dark">
                Rendez-vous du {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
              </h2>
              <button
                onClick={() => {
                  setShowDateModal(false)
                  setSelectedDate(null)
                }}
                className="p-2 hover:bg-secondary-light rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Liste des rendez-vous du jour */}
            {getAppointmentsForDate(selectedDate).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-secondary-dark/60 font-body mb-4">
                  Aucun rendez-vous ce jour
                </p>
                <button
                  onClick={() => {
                    setShowDateModal(false)
                    setFormData({
                      ...formData,
                      date: formatDateForInput(selectedDate),
                    })
                    setShowCreateModal(true)
                  }}
                  className="px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body"
                >
                  + Créer un rendez-vous
                </button>
              </div>
            ) : (
              <div className="space-y-3 mb-4">
                {getAppointmentsForDate(selectedDate).map((apt) => {
                  const start = new Date(apt.startTime)
                  const end = new Date(apt.endTime)
                  return (
                    <div
                      key={apt.id}
                      onClick={() => {
                        setShowDateModal(false)
                        setSelectedAppointment(apt)
                        setShowModal(true)
                      }}
                      className="p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-heading font-bold text-secondary-dark">
                            {apt.user.name || apt.user.email}
                          </p>
                          <p className="text-sm text-secondary-dark/60 font-body">
                            {start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} -{" "}
                            {end.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                          <span
                            className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold font-body ${
                              apt.status === "CONFIRMED"
                                ? "bg-green-100 text-green-800"
                                : apt.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {apt.status === "CONFIRMED"
                              ? "Confirmé"
                              : apt.status === "PENDING"
                              ? "En attente"
                              : "Terminé"}
                          </span>
                        </div>
                        <svg className="w-5 h-5 text-secondary-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {getAppointmentsForDate(selectedDate).length > 0 && (
              <button
                onClick={() => {
                  setShowDateModal(false)
                  setFormData({
                    ...formData,
                    date: formatDateForInput(selectedDate),
                  })
                  setShowCreateModal(true)
                }}
                className="w-full px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body"
              >
                + Nouveau rendez-vous
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal de détails */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold text-secondary-dark">
                Détails du rendez-vous
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedAppointment(null)
                }}
                className="p-2 hover:bg-secondary-light rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-secondary-dark/60 font-body mb-1">Client</p>
                <p className="font-heading font-bold text-secondary-dark">
                  {selectedAppointment.user.name || "Sans nom"}
                </p>
                <p className="text-sm text-secondary-dark/60 font-body">
                  {selectedAppointment.user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-secondary-dark/60 font-body mb-1">Date et heure</p>
                <p className="font-body text-secondary-dark">
                  {new Date(selectedAppointment.startTime).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="font-body text-secondary-dark">
                  {new Date(selectedAppointment.startTime).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(selectedAppointment.endTime).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-secondary-dark/60 font-body mb-1">Statut</p>
                <select
                  value={selectedAppointment.status}
                  onChange={(e) => handleStatusChange(selectedAppointment.id, e.target.value)}
                  className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                >
                  <option value="PENDING">En attente</option>
                  <option value="CONFIRMED">Confirmé</option>
                  <option value="COMPLETED">Terminé</option>
                  <option value="CANCELLED">Annulé</option>
                </select>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <p className="text-sm text-secondary-dark/60 font-body mb-1">Notes</p>
                  <p className="font-body text-secondary-dark bg-secondary-light/30 p-3 rounded-lg">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-secondary-light">
                <button
                  onClick={() => handleDelete(selectedAppointment.id)}
                  className="flex-1 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors font-body font-semibold"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedAppointment(null)
                  }}
                  className="flex-1 px-4 py-2 border-2 border-secondary-light rounded-lg hover:bg-secondary-light transition-colors font-body font-semibold"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de création */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold text-secondary-dark">
                Créer un rendez-vous
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setFormData({
                    userId: "",
                    date: "",
                    time: "",
                    notes: "",
                    status: "PENDING",
                  })
                }}
                className="p-2 hover:bg-secondary-light rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                  Client <span className="text-red-500">*</span>
                </label>
                {loadingClients ? (
                  <div className="px-4 py-2 border-2 border-secondary-light rounded-lg text-secondary-dark/60 font-body">
                    Chargement des clients...
                  </div>
                ) : (
                  <select
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name || client.email} {client.email && client.name ? `(${client.email})` : ""}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                  Heure <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                >
                  <option value="">Sélectionner une heure</option>
                  {TIME_SLOTS.map((time) => {
                    const isPast = formData.date ? isTimePastForDate(formData.date, time) : false
                    const isBooked = formData.date ? isTimeSlotBooked(formData.date, time) : false
                    const isDisabled = isPast || isBooked
                    return (
                      <option key={time} value={time} disabled={isDisabled}>
                        {time} {isPast ? "(passée)" : isBooked ? "(réservé)" : ""}
                      </option>
                    )
                  })}
                </select>
                {formData.date && formData.time && (
                  <>
                    {isTimePastForDate(formData.date, formData.time) && (
                      <p className="text-sm text-red-600 font-body mt-1">
                        Cette heure est déjà passée. Veuillez sélectionner une heure future.
                      </p>
                    )}
                    {isTimeSlotBooked(formData.date, formData.time) && (
                      <p className="text-sm text-orange-600 font-body mt-1">
                        Ce créneau est déjà réservé. Veuillez sélectionner une autre heure.
                      </p>
                    )}
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as typeof formData.status })
                  }
                  className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                >
                  <option value="PENDING">En attente</option>
                  <option value="CONFIRMED">Confirmé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-dark mb-2 font-body">
                  Notes (optionnel)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border-2 border-secondary-light rounded-lg focus:border-primary-violet focus:outline-none font-body"
                  placeholder="Ajoutez des notes sur ce rendez-vous..."
                />
              </div>

              <div className="flex gap-2 pt-4 border-t border-secondary-light">
                <button
                  onClick={handleCreateAppointment}
                  disabled={creating || !formData.userId || !formData.date || !formData.time}
                  className="flex-1 px-4 py-2 gradient-primary text-white rounded-lg hover:scale-105 transition-transform font-body font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {creating ? "Création..." : "Créer le rendez-vous"}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setFormData({
                      userId: "",
                      date: "",
                      time: "",
                      notes: "",
                      status: "PENDING",
                    })
                  }}
                  className="flex-1 px-4 py-2 border-2 border-secondary-light rounded-lg hover:bg-secondary-light transition-colors font-body font-semibold"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
