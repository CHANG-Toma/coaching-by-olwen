import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type MonthlyCount = {
  month: number
  year: number
  count: number
}

function getMonthRange(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1)
  return { start, end }
}

export async function GET() {
  try {
    const session = await auth()

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      )
    }

    // Totaux simples
    const [totalUsers, totalClients, totalAdmins] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "CLIENT" } as any }),
      prisma.user.count({ where: { role: "ADMIN" } as any }),
    ])

    // Nouveaux utilisateurs sur les 30 derniers jours
    const now = new Date()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(now.getDate() - 30)

    const newUsersLast30Days = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
    })

    // Évolution des clients sur les 6 derniers mois (y compris le mois en cours)
    const monthlyClients: MonthlyCount[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const { start, end } = getMonthRange(d)

      const count = await prisma.user.count({
        where: {
          role: "CLIENT" as any,
          createdAt: {
            gte: start,
            lt: end,
          },
        },
      })

      monthlyClients.push({
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        count,
      })
    }

    // Statistiques des rendez-vous
    const [
      totalAppointments,
      confirmedAppointments,
      pendingAppointments,
      cancelledAppointments,
      completedAppointments,
      upcomingAppointments,
      appointmentsLast30Days,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "CONFIRMED" } }),
      prisma.appointment.count({ where: { status: "PENDING" } }),
      prisma.appointment.count({ where: { status: "CANCELLED" } }),
      prisma.appointment.count({ where: { status: "COMPLETED" } }),
      prisma.appointment.count({
        where: {
          startTime: {
            gte: now,
          },
          status: {
            not: "CANCELLED",
          },
        },
      }),
      prisma.appointment.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),
    ])

    // Évolution des rendez-vous sur les 6 derniers mois
    const monthlyAppointments: MonthlyCount[] = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const { start, end } = getMonthRange(d)

      const count = await prisma.appointment.count({
        where: {
          startTime: {
            gte: start,
            lt: end,
          },
          status: {
            not: "CANCELLED",
          },
        },
      })

      monthlyAppointments.push({
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        count,
      })
    }

    // Calculs de métriques
    const confirmationRate =
      totalAppointments > 0 ? Math.round((confirmedAppointments / totalAppointments) * 100) : 0
    const cancellationRate =
      totalAppointments > 0 ? Math.round((cancelledAppointments / totalAppointments) * 100) : 0
    const averageAppointmentsPerClient =
      totalClients > 0 ? Math.round((totalAppointments / totalClients) * 10) / 10 : 0

    // Placeholders pour des stats plus avancées (revenus, satisfaction)
    const conversionRate = 0
    const retentionRate = 0
    const satisfaction = 0

    return NextResponse.json({
      totals: {
        totalUsers,
        totalClients,
        totalAdmins,
        newUsersLast30Days,
        totalAppointments,
        confirmedAppointments,
        pendingAppointments,
        cancelledAppointments,
        completedAppointments,
        upcomingAppointments,
        appointmentsLast30Days,
      },
      monthlyClients,
      monthlyAppointments,
      metrics: {
        conversionRate,
        retentionRate,
        satisfaction,
        confirmationRate,
        cancellationRate,
        averageAppointmentsPerClient,
      },
    })
  } catch (error) {
    console.error("Erreur lors du calcul des statistiques:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

