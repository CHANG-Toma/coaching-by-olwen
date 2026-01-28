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

    // Vérifier que la date n'est pas dans le passé (avec une marge de 1 minute pour éviter les problèmes de timing)
    const now = new Date()
    now.setSeconds(0, 0) // Ignorer les secondes et millisecondes
    if (start < now) {
      return NextResponse.json(
        { error: "Impossible de créer un rendez-vous dans le passé" },
        { status: 400 }
      )
    }

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
