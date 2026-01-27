# 📁 Structure du Projet - Guide Complet

Ce document explique la structure du projet et le rôle de chaque dossier et fichier.

## 📂 Structure Principale

```
Coaching By Olwen/
├── app/                    # Application Next.js (App Router)
├── lib/                    # Bibliothèques et utilitaires
├── prisma/                 # Configuration Prisma (ORM)
├── types/                  # Définitions TypeScript
├── Docs/                   # Documentation du projet
├── node_modules/           # Dépendances npm (généré automatiquement)
└── [Fichiers de config]    # Fichiers de configuration à la racine
```

---

## 📁 Dossier `app/` - Application Next.js

Le dossier `app/` utilise le **App Router** de Next.js 14. C'est le cœur de votre application.

### `app/page.tsx`
- **Rôle** : Page d'accueil de l'application (`/`)
- **Fonction** : Composant React qui s'affiche quand on visite `http://localhost:3000`
- **Contenu** : Page d'accueil avec le message de bienvenue

### `app/layout.tsx`
- **Rôle** : Layout principal de l'application
- **Fonction** : 
  - Définit la structure HTML de base (`<html>`, `<body>`)
  - Contient les métadonnées (titre, description)
  - Enveloppe toutes les pages de l'application
- **Important** : Ce fichier est chargé une seule fois et reste actif pour toutes les pages

### `app/globals.css`
- **Rôle** : Styles CSS globaux
- **Fonction** :
  - Importe Tailwind CSS (`@tailwind base/components/utilities`)
  - Définit les variables CSS personnalisées
  - Styles appliqués à toute l'application

### `app/api/` - Routes API
Dossier pour créer des **API Routes** (endpoints backend).

#### `app/api/auth/[...nextauth]/route.ts`
- **Rôle** : Point d'entrée pour l'authentification Auth.js
- **Fonction** :
  - Gère les requêtes GET/POST pour `/api/auth/*`
  - `[...nextauth]` est un "catch-all route" qui capture toutes les routes `/api/auth/*`
  - Expose les handlers Auth.js (connexion, déconnexion, callback, etc.)
- **URLs générées** :
  - `/api/auth/signin` - Page de connexion
  - `/api/auth/signout` - Déconnexion
  - `/api/auth/callback` - Callback OAuth
  - `/api/auth/session` - Récupérer la session

### `app/auth/signin/page.tsx`
- **Rôle** : Page de connexion personnalisée
- **Fonction** :
  - Formulaire de connexion avec email/mot de passe
  - Utilise `signIn` de `next-auth/react`
  - Design selon la charte graphique (dégradé violet/rose)
- **URL** : `/auth/signin`

---

## 📁 Dossier `lib/` - Bibliothèques et Utilitaires

Contient les fonctions réutilisables et la configuration partagée.

### `lib/prisma.ts`
- **Rôle** : Client Prisma singleton
- **Fonction** :
  - Crée une instance unique de `PrismaClient`
  - Évite de créer plusieurs connexions à la base de données
  - Optimisé pour le développement (recharge à chaud) et la production
- **Usage** : Importé partout où vous avez besoin d'accéder à la DB
  ```typescript
  import { prisma } from "@/lib/prisma"
  const users = await prisma.user.findMany()
  ```

### `lib/auth.ts`
- **Rôle** : Configuration complète d'Auth.js (NextAuth v5)
- **Fonction** :
  - Configure les providers d'authentification (credentials, OAuth)
  - Définit les callbacks (JWT, session)
  - Configure l'adapter Prisma pour persister les sessions
  - Exporte `handlers`, `auth`, `signIn`, `signOut`
- **Important** : C'est ici que vous ajoutez de nouveaux providers OAuth

---

## 📁 Dossier `prisma/` - Configuration Prisma

### `prisma/schema.prisma`
- **Rôle** : Schéma de la base de données
- **Fonction** :
  - Définit tous les modèles de données (User, Account, Session, etc.)
  - Configure la connexion PostgreSQL
  - Définit les relations entre les tables
- **Usage** : 
  - Modifiez ce fichier pour ajouter/modifier des tables
  - Puis exécutez `npm run db:push` ou `npm run db:migrate`

**Modèles définis** :
- `User` - Utilisateurs de l'application
- `Account` - Comptes OAuth liés aux utilisateurs
- `Session` - Sessions d'authentification
- `VerificationToken` - Tokens de vérification email

---

## 📁 Dossier `types/` - Types TypeScript

### `types/next-auth.d.ts`
- **Rôle** : Extension des types TypeScript pour NextAuth
- **Fonction** :
  - Ajoute des propriétés personnalisées aux types `Session` et `JWT`
  - Permet d'avoir `session.user.id` typé correctement
  - Évite les erreurs TypeScript lors de l'utilisation d'Auth.js

---

## 📁 Dossier `Docs/` - Documentation

### `Docs/charte-graphique.md`
- **Rôle** : Guide de style et identité visuelle
- **Contenu** :
  - Palette de couleurs (violet #8E2DE2, rose #F0006E)
  - Typographie (Montserrat, Inter/Open Sans)
  - Styles de boutons, cartes, icônes

### `Docs/Wireframe - Site Coaching.pdf`
- **Rôle** : Maquettes et wireframes du site
- **Fonction** : Référence pour le design et la structure des pages

---

## 📄 Fichiers de Configuration à la Racine

### `package.json`
- **Rôle** : Configuration npm du projet
- **Contient** :
  - Liste des dépendances (Next.js, Prisma, Auth.js, etc.)
  - Scripts npm (`dev`, `build`, `db:push`, etc.)
  - Métadonnées du projet

### `tsconfig.json`
- **Rôle** : Configuration TypeScript
- **Fonction** :
  - Options du compilateur TypeScript
  - Chemins d'import (`@/*` pointe vers la racine)
  - Configuration JSX, modules, etc.

### `next.config.js`
- **Rôle** : Configuration Next.js
- **Fonction** :
  - Options de build (`output: 'standalone'` pour Docker)
  - Configuration des redirections, rewrites
  - Variables d'environnement publiques

### `tailwind.config.ts`
- **Rôle** : Configuration Tailwind CSS
- **Fonction** :
  - Définit où chercher les classes Tailwind (dans `app/`, `components/`, etc.)
  - Personnalise le thème (couleurs, polices, etc.)
  - Ajoute des plugins Tailwind

### `postcss.config.js`
- **Rôle** : Configuration PostCSS
- **Fonction** :
  - Configure les plugins PostCSS (Tailwind, Autoprefixer)
  - Nécessaire pour que Tailwind fonctionne

### `.eslintrc.json`
- **Rôle** : Configuration ESLint (linter)
- **Fonction** :
  - Règles de qualité de code
  - Utilise la config recommandée de Next.js

### `.gitignore`
- **Rôle** : Fichiers à ignorer par Git
- **Contient** :
  - `node_modules/` - Dépendances
  - `.next/` - Build Next.js
  - `.env` - Variables d'environnement (sensible)
  - Fichiers temporaires, logs, etc.

### `.env` et `.env.example`
- **Rôle** : Variables d'environnement
- **`.env`** : Fichier réel avec vos secrets (NE PAS COMMITER)
- **`.env.example`** : Template pour les autres développeurs
- **Contient** :
  - `DATABASE_URL` - Connexion PostgreSQL
  - `AUTH_SECRET` - Clé secrète pour Auth.js
  - Clés OAuth (optionnel)

### `middleware.ts`
- **Rôle** : Middleware Next.js
- **Fonction** :
  - S'exécute avant chaque requête
  - Utilisé pour protéger les routes (vérifier l'authentification)
  - Peut rediriger les utilisateurs non connectés
- **Important** : S'exécute sur le serveur Edge (très rapide)

---

## 🐳 Fichiers Docker

### `docker-compose.dev.yml`
- **Rôle** : Configuration Docker pour le développement
- **Contient** :
  - Service PostgreSQL (base de données)
  - Service Adminer (interface web pour la DB)
  - Volumes pour persister les données

### `docker-compose.yml`
- **Rôle** : Configuration Docker pour la production
- **Similaire** à `docker-compose.dev.yml` mais pour la production

### `Dockerfile`
- **Rôle** : Image Docker pour l'application Next.js
- **Fonction** :
  - Multi-stage build (optimisé)
  - Installe les dépendances
  - Build l'application
  - Crée une image de production légère

### `.dockerignore`
- **Rôle** : Fichiers à exclure de l'image Docker
- **Similaire** à `.gitignore` mais pour Docker

---

## 🔄 Flux de Données

```
1. Utilisateur visite une page
   ↓
2. Next.js charge app/layout.tsx puis app/page.tsx
   ↓
3. Si besoin d'authentification → middleware.ts vérifie la session
   ↓
4. Si besoin de données → lib/prisma.ts interroge PostgreSQL
   ↓
5. Si besoin d'auth → lib/auth.ts gère l'authentification
   ↓
6. Les API Routes (app/api/) gèrent les requêtes backend
```

---

## 📝 Résumé des Dossiers Utiles

| Dossier | Utilité | Quand le modifier |
|---------|---------|-------------------|
| `app/` | **Pages et routes** | Pour créer de nouvelles pages |
| `app/api/` | **API backend** | Pour créer des endpoints API |
| `lib/` | **Code réutilisable** | Pour les fonctions utilitaires |
| `prisma/` | **Base de données** | Pour modifier le schéma DB |
| `types/` | **Types TypeScript** | Pour ajouter des types personnalisés |
| `Docs/` | **Documentation** | Pour la documentation du projet |

---

## 🎯 Prochaines Étapes

Pour ajouter une nouvelle fonctionnalité :

1. **Nouvelle page** → Créer dans `app/nom-page/page.tsx`
2. **Nouvelle API** → Créer dans `app/api/nom-api/route.ts`
3. **Nouvelle table** → Modifier `prisma/schema.prisma` puis `npm run db:push`
4. **Nouvelle fonction utilitaire** → Créer dans `lib/nom-fonction.ts`
