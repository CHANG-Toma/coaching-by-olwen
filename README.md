# Coaching By Olwen

Application web de coaching sportif et transformation personnelle construite avec Next.js, PostgreSQL, Prisma et Auth.js.

## 🚀 Technologies

- **Framework**: Next.js 14 (React) avec App Router
- **Base de données**: PostgreSQL avec Prisma ORM
- **Authentification**: Auth.js (NextAuth.js v5)
- **Styling**: Tailwind CSS
- **TypeScript**: Pour la sécurité de type

## 📋 Prérequis

- Node.js 18+ 
- Docker et Docker Compose (pour la base de données)
- npm ou yarn

**Note** : Si vous préférez installer PostgreSQL localement au lieu d'utiliser Docker, vous pouvez ignorer la section Docker.

## 🛠️ Installation

### Option 1 : Avec Docker (Recommandé)

1. **Démarrer la base de données PostgreSQL avec Docker**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```
   
   Cela démarre :
   - PostgreSQL sur le port 5432
   - Adminer (interface web pour gérer la DB) sur http://localhost:8080

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   
   Créez un fichier `.env` à la racine du projet :
   ```bash
   cp .env.example .env
   ```
   
   Le fichier `.env` est déjà configuré pour fonctionner avec Docker. Si vous utilisez Docker, vous n'avez pas besoin de modifier `DATABASE_URL`.

4. **Générer la clé secrète Auth.js**
   
   Sur Linux/Mac :
   ```bash
   openssl rand -base64 32
   ```
   
   Sur Windows (PowerShell) :
   ```powershell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```
   
   Ajoutez la clé générée dans votre fichier `.env` :
   ```env
   AUTH_SECRET="votre-clé-secrète-générée"
   ```

5. **Générer le client Prisma**
   ```bash
   npm run db:generate
   ```

6. **Créer les tables dans la base de données**
   ```bash
   npm run db:push
   ```
   
   Ou pour créer une migration :
   ```bash
   npm run db:migrate
   ```

### Option 2 : Sans Docker (PostgreSQL local)

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer la base de données**
   
   Créez un fichier `.env` à la racine du projet :
   ```bash
   cp .env.example .env
   ```
   
   Modifiez le fichier `.env` avec vos informations de connexion PostgreSQL :
   ```env
   DATABASE_URL="postgresql://coaching_user:coaching_password@localhost:5432/coaching_by_olwen?schema=public"
   ```

3. **Générer la clé secrète Auth.js** (voir Option 1, étape 4)

4. **Générer le client Prisma**
   ```bash
   npm run db:generate
   ```

5. **Créer les tables dans la base de données**
   ```bash
   npm run db:push
   ```

## 🏃 Démarrage

Lancer le serveur de développement :
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
.
├── app/                    # App Router Next.js
│   ├── api/               # Routes API
│   │   └── auth/          # Routes Auth.js
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── lib/                   # Utilitaires
│   ├── auth.ts           # Configuration Auth.js
│   └── prisma.ts         # Client Prisma
├── prisma/                # Prisma
│   └── schema.prisma     # Schéma de base de données
├── types/                 # Types TypeScript
│   └── next-auth.d.ts    # Types Auth.js étendus
└── middleware.ts          # Middleware Next.js pour Auth.js
```

## 🔐 Authentification

L'application utilise Auth.js (NextAuth.js v5) avec :
- Authentification par email/mot de passe (Credentials Provider)
- Support pour OAuth providers (GitHub, Google, etc.) - à configurer dans `.env`
- Sessions JWT
- Protection des routes via middleware

## 🎨 Charte graphique

La charte graphique est définie dans `Docs/charte-graphique.md` :
- Dégradé violet/rose (#8E2DE2 → #F0006E)
- Typographie : Montserrat pour les titres, Inter/Open Sans pour le corps
- Style moderne et dynamique

## 📝 Scripts disponibles

### Scripts npm

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run start` - Démarrer le serveur de production
- `npm run lint` - Lancer ESLint
- `npm run db:push` - Pousser le schéma vers la base de données
- `npm run db:studio` - Ouvrir Prisma Studio (interface graphique)
- `npm run db:generate` - Générer le client Prisma
- `npm run db:migrate` - Créer une migration

### Commandes Docker

- `docker-compose -f docker-compose.dev.yml up -d` - Démarrer PostgreSQL et Adminer
- `docker-compose -f docker-compose.dev.yml down` - Arrêter les conteneurs
- `docker-compose -f docker-compose.dev.yml logs -f` - Voir les logs
- `docker-compose -f docker-compose.dev.yml ps` - Voir l'état des conteneurs
- `docker-compose -f docker-compose.dev.yml down -v` - Arrêter et supprimer les volumes (⚠️ supprime les données)

### Accès à la base de données

- **Adminer** : http://localhost:8080
  - Système : PostgreSQL
  - Serveur : postgres
  - Utilisateur : coaching_user
  - Mot de passe : coaching_password
  - Base de données : coaching_by_olwen

## 🔧 Configuration

### Ajouter un provider OAuth

Pour ajouter GitHub, Google ou un autre provider OAuth, modifiez `lib/auth.ts` :

```typescript
import GitHub from "next-auth/providers/github"

providers: [
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
  // ... autres providers
]
```

Puis ajoutez les variables dans votre `.env` :
```env
GITHUB_CLIENT_ID="votre-client-id"
GITHUB_CLIENT_SECRET="votre-client-secret"
```

## 🐳 Docker

### Développement

Le fichier `docker-compose.dev.yml` configure :
- **PostgreSQL 16** : Base de données principale
- **Adminer** : Interface web pour gérer la base de données

Pour démarrer :
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Production

Le `Dockerfile` permet de construire une image Docker de l'application Next.js.

Pour construire l'image :
```bash
docker build -t coaching-by-olwen .
```

Pour lancer avec docker-compose (production) :
```bash
docker-compose up -d
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Auth.js Documentation](https://authjs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)
