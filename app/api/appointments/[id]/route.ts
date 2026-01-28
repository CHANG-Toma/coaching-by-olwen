import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// Récupérer un rendez-vous spécifique
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
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

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 })
    }

    // Vérifier les permissions
    if (session.user?.role === "CLIENT" && appointment.userId !== session.user.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    return NextResponse.json({ appointment })
  } catch (error) {
    console.error("Erreur lors de la récupération du rendez-vous:", error)
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// Mettre à jour un rendez-vous
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 })
    }

    // Vérifier les permissions
    if (session.user?.role === "CLIENT" && appointment.userId !== session.user.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const body = await request.json()
    const { startTime, endTime, status, notes } = body

    const updateData: any = {}

    if (startTime !== undefined) updateData.startTime = new Date(startTime)
    if (endTime !== undefined) updateData.endTime = new Date(endTime)
    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    // Vérifications si les dates changent
    if (startTime || endTime) {
      const newStart = updateData.startTime || appointment.startTime
      const newEnd = updateData.endTime || appointment.endTime

      if (newStart >= newEnd) {
        return NextResponse.json(
          { error: "La date de fin doit être après la date de début" },
          { status: 400 }
        )
      }

      // Vérifier les conflits (en excluant le rendez-vous actuel)
      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          id: { not: params.id },
          userId: appointment.userId,
          status: {
            not: "CANCELLED",
          },
          OR: [
            {
              startTime: { lte: newStart },
              endTime: { gt: newStart },
            },
            {
              startTime: { lt: newEnd },
              endTime: { gte: newEnd },
            },
            {
              startTime: { gte: newStart },
              endTime: { lte: newEnd },
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
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json({ appointment: updatedAppointment })
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour du rendez-vous:", error)
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 })
    }
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}

// Supprimer un rendez-vous
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: params.id },
    })

    if (!appointment) {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 })
    }

    // Vérifier les permissions
    if (session.user?.role === "CLIENT" && appointment.userId !== session.user.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    await prisma.appointment.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Rendez-vous supprimé avec succès" })
  } catch (error: any) {
    console.error("Erreur lors de la suppression du rendez-vous:", error)
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Rendez-vous non trouvé" }, { status: 404 })
    }
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 })
  }
}
