# Coaching by Olwen

Site vitrine moderne pour **Coaching by Olwen** — coaching sportif et bien-être.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **TypeScript**

Frontend uniquement — pas de backend pour le moment.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx      # Layout racine & polices
  page.tsx        # Page d'accueil
  globals.css     # Styles globaux & utilitaires
components/
  layout/         # Navbar, Footer
  sections/       # Hero, About, Services, Process, Testimonials, Contact
  ui/             # Composants réutilisables
```

## Couleurs

- **Bleu royal** — identité principale, headers, sections sombres
- **Bordeaux** — accents, CTA, highlights

## Scripts

| Commande       | Description              |
|----------------|--------------------------|
| `npm run dev`  | Serveur de développement |
| `npm run build`| Build de production      |
| `npm run start`| Serveur de production    |
| `npm run lint` | Vérification ESLint      |
