import { prisma } from "../lib/prisma"

async function setAdmin(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    })
    console.log(`✅ Utilisateur ${email} défini comme ADMIN avec succès`)
    console.log(`   ID: ${user.id}`)
    console.log(`   Nom: ${user.name}`)
  } catch (error: any) {
    if (error.code === "P2025") {
      console.error(`❌ Utilisateur avec l'email ${email} introuvable`)
    } else {
      console.error("❌ Erreur:", error.message)
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Récupérer l'email depuis les arguments de ligne de commande
const email = process.argv[2]

if (!email) {
  console.error("❌ Usage: npx tsx scripts/set-admin.ts <email>")
  console.error("   Exemple: npx tsx scripts/set-admin.ts olwen@example.com")
  process.exit(1)
}

setAdmin(email)
