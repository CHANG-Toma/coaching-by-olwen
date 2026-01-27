import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"

export const config = {
  // L'adapter Prisma est utile pour les providers OAuth, mais pas nécessaire pour credentials + JWT
  // On le garde pour la compatibilité future avec OAuth
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [
    credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: (user as any).role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Si c'est une nouvelle connexion, initialiser le token
      if (user && user.id) {
        token.id = user.id
      }
      
      // Toujours récupérer le rôle depuis la DB pour garantir qu'il est à jour
      // Cela fonctionne aussi bien pour les nouvelles connexions que pour les rafraîchissements
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
          })
          if (dbUser && (dbUser as any).role) {
            token.role = (dbUser as any).role
          } else if (user && (user as any).role) {
            // Fallback sur le rôle de l'utilisateur si la DB ne retourne pas de rôle
            token.role = (user as any).role
          }
        } catch (error) {
          // En cas d'erreur, utiliser le rôle de l'utilisateur si disponible
          if (user && (user as any).role) {
            token.role = (user as any).role
          }
          console.error("Erreur lors de la vérification du rôle:", error)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id
        session.user.role = token.role as string
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
