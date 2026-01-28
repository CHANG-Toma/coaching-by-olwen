"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { useToast } from "@/app/contexts/ToastContext"

type Appointment = {
  id: string
  startTime: string
  endTime: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  notes: string | null
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

export default function CalendrierPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { showSuccess, showError } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [showDateModal, setShowDateModal] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchAppointments()
    }
  }, [session, currentDate])

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
    // Jours vides au début
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const isDateBooked = (date: Date, time: string) => {
    // Extraire les composants de date locale pour éviter les problèmes de fuseau horaire
    const dateYear = date.getFullYear()
    const dateMonth = date.getMonth()
    const dateDay = date.getDate()
    const [hours, minutes] = time.split(":").map(Number)
    
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
        dateYear === aptYear &&
        dateMonth === aptMonth &&
        dateDay === aptDay &&
        hours === aptHours &&
        minutes === aptMinutes
      )
    })
  }

  const isDatePast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < today
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return appointments.filter(
      (apt) =>
        new Date(apt.startTime).toISOString().split("T")[0] === dateStr &&
        apt.status !== "CANCELLED"
    )
  }

  const handleDateSelect = (date: Date | null) => {
    if (date && !isDatePast(date)) {
      setSelectedDate(date)
      setSelectedTime(null)
      setShowBookingForm(false)
      setShowDateModal(true)
    }
  }

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setShowAppointmentModal(true)
  }

  const isTimePast = (date: Date, time: string) => {
    const today = new Date()
    const [hours, minutes] = time.split(":").map(Number)
    const appointmentTime = new Date(date)
    appointmentTime.setHours(hours, minutes, 0, 0)
    
    // Si c'est le jour même, vérifier que l'heure n'est pas passée (avec une marge de 30 minutes)
    if (date.toDateString() === today.toDateString()) {
      const thirtyMinutesFromNow = new Date(today.getTime() + 30 * 60 * 1000)
      return appointmentTime < thirtyMinutesFromNow
    }
    return false
  }

  const handleTimeSelect = (time: string) => {
    if (selectedDate && !isDateBooked(selectedDate, time) && !isTimePast(selectedDate, time)) {
      setSelectedTime(time)
    }
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      showError("Veuillez sélectionner une date et une heure")
      return
    }

    try {
      setBooking(true)
      const [hours, minutes] = selectedTime.split(":").map(Number)
      
      // Créer la date en utilisant Date.UTC pour éviter les problèmes de conversion de fuseau horaire
      // Cela garantit que la date calendaire reste la même après conversion ISO
      const year = selectedDate.getFullYear()
      const month = selectedDate.getMonth()
      const day = selectedDate.getDate()
      
      // Créer les dates en UTC pour préserver la date calendaire exacte
      const startTime = new Date(Date.UTC(year, month, day, hours, minutes, 0, 0))
      const endTime = new Date(Date.UTC(year, month, day, hours + 1, minutes, 0, 0))

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.details 
          ? `${errorData.error}\n${errorData.details}` 
          : errorData.error || "Erreur lors de la réservation"
        throw new Error(errorMessage)
      }

      showSuccess("Rendez-vous réservé avec succès !")
      setSelectedTime(null)
      setShowBookingForm(false)
      await fetchAppointments()
    } catch (err: any) {
      showError(err.message || "Erreur lors de la réservation")
      console.error("Erreur détaillée:", err)
    } finally {
      setBooking(false)
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

  if (!session || session.user?.role !== "CLIENT") {
    return null
  }

  const days = getDaysInMonth()
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

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-secondary-dark mb-2">
              Prendre un Rendez-vous
            </h1>
            <p className="text-secondary-dark/70 font-body">
              Sélectionnez une date et une heure pour votre consultation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

                  const isSelected = selectedDate?.toDateString() === date.toDateString()
                  const isPast = isDatePast(date)
                  const hasAppointment = appointments.some(
                    (apt) =>
                      new Date(apt.startTime).toDateString() === date.toDateString() &&
                      apt.status !== "CANCELLED"
                  )

                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      disabled={isPast}
                      className={`aspect-square rounded-lg font-body transition-all ${
                        isSelected
                          ? "bg-primary-violet text-white shadow-lg scale-105"
                          : isPast
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : hasAppointment
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-secondary-light/30 text-secondary-dark hover:bg-secondary-light"
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center h-full">
                        <span className="text-sm font-medium">{date.getDate()}</span>
                        {hasAppointment && !isPast && (
                          <span className="text-xs mt-1">●</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

            </div>

            {/* Mes rendez-vous */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-heading font-bold text-secondary-dark mb-4">
                Mes Rendez-vous
              </h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-violet mx-auto mb-4"></div>
                  <p className="text-secondary-dark/60 font-body text-sm">Chargement...</p>
                </div>
              ) : appointments.filter((apt) => apt.status !== "CANCELLED").length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-secondary-dark/60 font-body">Aucun rendez-vous prévu</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {appointments
                    .filter((apt) => apt.status !== "CANCELLED")
                    .map((apt) => {
                      const start = new Date(apt.startTime)
                      const end = new Date(apt.endTime)
                      return (
                        <div
                          key={apt.id}
                          className="p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-heading font-bold text-secondary-dark">
                                {start.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
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
                          </div>
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modal des rendez-vous du jour */}
      {showDateModal && selectedDate && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDateModal(false)
              setSelectedDate(null)
              setShowBookingForm(false)
              setSelectedTime(null)
            }
          }}
        >
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold text-secondary-dark">
                Rendez-vous du {selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
              </h2>
              <button
                onClick={() => {
                  setShowDateModal(false)
                  setSelectedDate(null)
                  setShowBookingForm(false)
                  setSelectedTime(null)
                }}
                className="p-2 hover:bg-secondary-light rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Liste des rendez-vous du jour */}
            {getAppointmentsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3 mb-4">
                {getAppointmentsForDate(selectedDate).map((apt) => {
                  const start = new Date(apt.startTime)
                  const end = new Date(apt.endTime)
                  return (
                    <div
                      key={apt.id}
                      onClick={() => {
                        setShowDateModal(false)
                        handleAppointmentClick(apt)
                      }}
                      className="p-4 border-2 border-secondary-light rounded-lg hover:border-primary-violet transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-heading font-bold text-secondary-dark">
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
            ) : (
              !showBookingForm && (
                <p className="text-secondary-dark/60 font-body text-center py-4 mb-4">
                  Aucun rendez-vous ce jour
                </p>
              )
            )}

            {/* Formulaire de réservation */}
            {showBookingForm ? (
              <div className="mt-4 p-4 bg-secondary-light/20 rounded-lg">
                <h4 className="text-md font-heading font-bold text-secondary-dark mb-4">
                  Sélectionnez une heure
                </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {TIME_SLOTS.map((time) => {
                      const isBooked = isDateBooked(selectedDate, time)
                      const isPast = isTimePast(selectedDate, time)
                      const isSelected = selectedTime === time
                      const isDisabled = isBooked || isPast

                      return (
                        <button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          disabled={isDisabled}
                          className={`px-4 py-2 rounded-lg font-body transition-all ${
                            isSelected
                              ? "bg-primary-violet text-white shadow-lg"
                              : isDisabled
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                              : "bg-white text-secondary-dark hover:bg-secondary-light border-2 border-secondary-light"
                          }`}
                          title={isPast ? "Cette heure est déjà passée" : isBooked ? "Créneau déjà réservé" : ""}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>

                {selectedTime && (
                  <button
                    onClick={handleBooking}
                    disabled={booking}
                    className="mt-4 w-full px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body disabled:opacity-50"
                  >
                    {booking ? "Réservation en cours..." : "Réserver ce créneau"}
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:scale-105 transition-transform font-body"
              >
                + Nouveau rendez-vous
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal de détails du rendez-vous */}
      {showAppointmentModal && selectedAppointment && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAppointmentModal(false)
              setSelectedAppointment(null)
            }
          }}
        >
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold text-secondary-dark">
                Détails du rendez-vous
              </h2>
              <button
                onClick={() => {
                  setShowAppointmentModal(false)
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
                <p className="text-sm text-secondary-dark/60 font-body mb-1">Date</p>
                <p className="font-body text-secondary-dark">
                  {new Date(selectedAppointment.startTime).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-secondary-dark/60 font-body mb-1">Heure</p>
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
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold font-body ${
                    selectedAppointment.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800"
                      : selectedAppointment.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {selectedAppointment.status === "CONFIRMED"
                    ? "Confirmé"
                    : selectedAppointment.status === "PENDING"
                    ? "En attente"
                    : "Terminé"}
                </span>
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
                  onClick={() => {
                    setShowAppointmentModal(false)
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
    </>
  )
}
