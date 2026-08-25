import { siteConfig } from "@/lib/site";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        priceRange: "Sur devis",
        areaServed: siteConfig.areaServed.map((area) => ({
          "@type": "Place",
          name: area,
        })),
        serviceType: [
          "Coaching sportif individualisé",
          "Programme d'entraînement à distance",
          "Événements et séminaires sportifs",
        ],
        knowsLanguage: "fr",
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: "Olwen",
        jobTitle: "Coach sportif certifiée",
        worksFor: { "@id": `${siteConfig.url}/#business` },
        description:
          "Coach sportif professionnelle depuis 2026, sportive depuis l'enfance. Spécialisée en coaching personnalisé, programmes à distance et animation d'événements sportifs.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "fr-FR",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
