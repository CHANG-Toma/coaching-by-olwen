import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    console.log("📧 Email reçu:", email)

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur avec toutes les colonnes
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Debug: afficher toutes les propriétés de l'utilisateur
    const userObj = user as any
    console.log("👤 User trouvé:", user ? {
      id: user.id,
      email: user.email,
      name: user.name,
      role: userObj.role,
      allFields: Object.keys(userObj),
      rawUser: userObj
    } : "null")
    
    // Vérifier si le champ role existe
    if (user && !userObj.role) {
      console.warn("⚠️ Le champ 'role' n'existe pas dans l'objet user!")
      console.warn("Propriétés disponibles:", Object.keys(userObj))
    }

    if (!user) {
      console.log("❌ Utilisateur non trouvé pour:", email)
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      )
    }

    // Essayer plusieurs façons de récupérer le rôle
    const role1 = (user as any).role
    const role2 = userObj?.role
    const role3 = (user as Record<string, any>).role
    
    // Vérifier directement dans la DB avec une requête SQL brute si nécessaire
    let finalRole = role1 || role2 || role3
    
    // Si le rôle n'est toujours pas trouvé, essayer une requête SQL brute
    if (!finalRole) {
      try {
        const rawUser = await prisma.$queryRaw`
          SELECT role FROM "User" WHERE email = ${email} LIMIT 1
        ` as any[]
        if (rawUser && rawUser.length > 0) {
          finalRole = rawUser[0].role
        }
      } catch (sqlError) {
        console.error("❌ Erreur SQL brute:", sqlError)
      }
    }
    
    // Utiliser le rôle trouvé ou CLIENT par défaut
    finalRole = finalRole || "CLIENT"

    const response = { role: finalRole }

    return NextResponse.json(response, { status: 200 })
  } catch (error: any) {
    console.error("❌ Erreur lors de la récupération du rôle:", error)
    console.error("Stack:", error.stack)
    return NextResponse.json(
      { error: "Une erreur est survenue", details: error.message },
      { status: 500 }
    )
  }
}
