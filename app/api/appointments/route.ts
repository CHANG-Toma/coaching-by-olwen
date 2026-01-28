import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// Récupérer tous les rendez-vous (avec filtres)
export async function GET(request: Request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    // Construire les filtres
    const where: any = {}

    // Si l'utilisateur est CLIENT, il ne peut voir que ses propres rendez-vous
    if (session.user?.role === "CLIENT") {
      where.userId = session.user.id
    } else if (userId) {
      // Les admins peuvent filtrer par utilisateur
      where.userId = userId
    }

    if (startDate || endDate) {
      where.startTime = {}
      if (startDate) {
        where.startTime.gte = new Date(startDate)
      }
      if (endDate) {
        where.startTime.lte = new Date(endDate)
      }
    }

    if (status) {
      where.status = status
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    })

    return NextResponse.json({ appointments })
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// Créer un nouveau rendez-vous
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    const { startTime, endTime, notes, userId: targetUserId, status } = body

    if (!startTime || !endTime) {
      return NextResponse.json({ error: "Date de début et de fin requises" }, { status: 400 })
    }

    const start = new Date(startTime)
    const end = new Date(endTime)

    // Vérifications
    if (start >= end) {
      return NextResponse.json({ error: "La date de fin doit être après la date de début" }, { status: 400 })
    }

    // Vérifier que le rendez-vous n'est pas dans le passé
    // Permettre les rendez-vous le jour même tant que l'heure n'est pas passée
    const now = new Date()
    
    // Logs de débogage
    console.log("=== DEBUG VALIDATION DATE ===")
    console.log("startTime reçu (ISO):", startTime)
    console.log("start parsé:", start.toISOString())
    console.log("start local:", start.toLocaleString("fr-FR"))
    console.log("now:", now.toISOString())
    console.log("now local:", now.toLocaleString("fr-FR"))
    
    // Extraire la date calendaire directement depuis la chaîne ISO (format: YYYY-MM-DDTHH:mm:ss.sssZ)
    // Cela évite les problèmes de conversion de fuseau horaire
    const startDateStr = startTime.split("T")[0] // "YYYY-MM-DD"
    const [startYear, startMonth, startDay] = startDateStr.split("-").map(Number)
    
    // Extraire la date calendaire actuelle (en UTC pour être cohérent)
    const nowDateStr = now.toISOString().split("T")[0]
    const [nowYear, nowMonth, nowDay] = nowDateStr.split("-").map(Number)
    
    console.log("start date calendaire (depuis ISO):", `${startDay}/${startMonth}/${startYear}`)
    console.log("now date calendaire (depuis ISO):", `${nowDay}/${nowMonth}/${nowYear}`)
    
    // Comparer les dates calendaires
    const isPastDay = startYear < nowYear || 
                     (startYear === nowYear && startMonth < nowMonth) ||
                     (startYear === nowYear && startMonth === nowMonth && startDay < nowDay)
    
    const isToday = startYear === nowYear && startMonth === nowMonth && startDay === nowDay
    const isFutureDay = !isPastDay && !isToday
    
    console.log("isPastDay:", isPastDay)
    console.log("isToday:", isToday)
    console.log("isFutureDay:", isFutureDay)
    
    // Si c'est un jour passé, rejeter
    if (isPastDay) {
      console.log("❌ ERREUR: Jour passé détecté")
      return NextResponse.json(
        { error: "Impossible de créer un rendez-vous dans le passé" },
        { status: 400 }
      )
    }
    
    // Si c'est le jour même, vérifier que l'heure est dans au moins 30 minutes
    if (isToday) {
      const startTimeInMs = start.getTime()
      const nowTimeInMs = now.getTime()
      const thirtyMinutesInMs = 30 * 60 * 1000
      const timeDiff = startTimeInMs - (nowTimeInMs + thirtyMinutesInMs)
      
      console.log("startTimeInMs:", startTimeInMs)
      console.log("nowTimeInMs:", nowTimeInMs)
      console.log("nowTimeInMs + 30min:", nowTimeInMs + thirtyMinutesInMs)
      console.log("timeDiff (ms):", timeDiff)
      console.log("timeDiff (minutes):", Math.round(timeDiff / 60000))
      
      if (startTimeInMs < nowTimeInMs + thirtyMinutesInMs) {
        console.log("❌ ERREUR: Moins de 30 minutes")
        return NextResponse.json(
          { error: "Impossible de créer un rendez-vous dans moins de 30 minutes" },
          { status: 400 }
        )
      }
    }
    
    // Si c'est un jour futur, accepter sans vérification d'heure
    if (isFutureDay) {
      console.log("✅ Jour futur - Validation OK (pas de vérification d'heure)")
    } else {
      console.log("✅ Validation OK")
    }
    console.log("===================")

    // Déterminer l'utilisateur cible
    let appointmentUserId: string
    if (session.user?.role === "ADMIN" && targetUserId) {
      appointmentUserId = targetUserId
    } else {
      appointmentUserId = session.user?.id as string
    }

    // Vérifier les conflits de créneaux
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        userId: appointmentUserId,
        status: {
          not: "CANCELLED",
        },
        OR: [
          {
            startTime: { lte: start },
            endTime: { gt: start },
          },
          {
            startTime: { lt: end },
            endTime: { gte: end },
          },
          {
            startTime: { gte: start },
            endTime: { lte: end },
          },
        ],
      },
    })

    if (conflictingAppointment) {
      return NextResponse.json(
        { error: "Un rendez-vous existe déjà sur ce créneau" },
        { status: 409 }
      )
    }

    // Vérifier les conflits pour l'admin (ne peut pas avoir deux rendez-vous en même temps)
    if (session.user?.role === "ADMIN") {
      const adminConflict = await prisma.appointment.findFirst({
        where: {
          status: {
            not: "CANCELLED",
          },
          OR: [
            {
              startTime: { lte: start },
              endTime: { gt: start },
            },
            {
              startTime: { lt: end },
              endTime: { gte: end },
            },
            {
              startTime: { gte: start },
              endTime: { lte: end },
            },
          ],
        },
      })

      if (adminConflict) {
        return NextResponse.json(
          { error: "Vous avez déjà un rendez-vous sur ce créneau" },
          { status: 409 }
        )
      }
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: appointmentUserId,
        startTime: start,
        endTime: end,
        notes: notes || null,
        status: status || "PENDING",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error: any) {
    console.error("Erreur lors de la création du rendez-vous:", error)
    
    // Gestion des erreurs spécifiques Prisma
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Un conflit existe déjà pour ce créneau" },
        { status: 409 }
      )
    }
    
    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      )
    }

    // Erreur si le modèle n'existe pas encore
    if (error.message?.includes("model") || error.message?.includes("Appointment")) {
      return NextResponse.json(
        { 
          error: "Le modèle Appointment n'existe pas encore dans la base de données. Veuillez exécuter 'npm run db:push' pour créer la table.",
          details: error.message 
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        error: "Une erreur est survenue lors de la création du rendez-vous",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      },
      { status: 500 }
    )
  }
}
