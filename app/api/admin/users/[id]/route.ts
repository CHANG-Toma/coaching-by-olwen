import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// Récupérer les détails d'un utilisateur
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      )
    }

    // Récupérer les rendez-vous de l'utilisateur
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: params.id,
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
      orderBy: {
        startTime: "desc",
      },
    })

    // Pour l'instant, on retourne des tableaux vides pour devis/factures/paiements
    // Ces données seront connectées quand les modèles Prisma seront créés
    return NextResponse.json({
      user,
      appointments,
      quotes: [], // À connecter avec le modèle Quote quand il existera
      invoices: [], // À connecter avec le modèle Invoice quand il existera
      payments: [], // À connecter avec le modèle Payment quand il existera
    })
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

// Mettre à jour les informations d'un utilisateur (rôle, nom, email)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { role, name, email } = body

    // Construire l'objet de mise à jour dynamiquement
    const updateData: any = {}
    
    if (role !== undefined) {
      if (role !== "CLIENT" && role !== "ADMIN") {
        return NextResponse.json(
          { error: "Rôle invalide" },
          { status: 400 }
        )
      }
      updateData.role = role
    }

    if (name !== undefined) {
      updateData.name = name.trim() || null
    }

    if (email !== undefined) {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json(
          { error: "Email invalide" },
          { status: 400 }
        )
      }
      updateData.email = email.trim() || null
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Aucune donnée à mettre à jour" },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ 
      message: "Utilisateur mis à jour avec succès",
      user 
    })
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      )
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 }
      )
    }
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
