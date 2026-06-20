import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Offres de coaching" },
  { href: "#methode", label: "Méthode" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
      <div className="section-container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-800 text-sm font-bold text-white dark:bg-royal-600">
                O
              </span>
              <p className="font-bold text-stone-900 dark:text-stone-100">
                {siteConfig.name}
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              Coach sportif certifiée — coaching individualisé, programmes à
              distance et événements sportifs. Présentiel en Ouest parisien,
              en ligne partout en France.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
              Navigation
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 transition-colors hover:text-royal-800 dark:hover:text-royal-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-stone-500 dark:text-stone-400">
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>Présentiel — Ouest parisien</li>
              <li>En ligne — partout en France</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-stone-100 pt-8 dark:border-stone-800 sm:flex-row">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="text-xs text-stone-400">
            Santé · Longévité · Excellence technique
          </p>
        </div>
      </div>
    </footer>
  );
}
