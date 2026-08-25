"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#services", label: "Offres" },
  { href: "#methode", label: "Méthode" },
  { href: "#engagement", label: "Engagement" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const headerClass =
    scrolled || menuOpen
      ? "border-b border-stone-200 bg-white/95 py-3 shadow-sm backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/95"
      : "bg-white/80 py-4 backdrop-blur-sm dark:bg-stone-950/80";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClass}`}
    >
      <nav className="section-container flex items-center justify-between">
        <Link
          href="#accueil"
          className="flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-royal-800 text-sm font-bold text-white dark:bg-royal-600">
            O
          </span>
          <div>
            <p className="text-sm font-bold leading-none text-stone-900 dark:text-stone-100">
              Coaching by Olwen
            </p>
            <p className="text-[11px] text-stone-400 dark:text-stone-500">
              Coaching sportif personnalisé
            </p>
          </div>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-stone-500 transition-colors hover:text-royal-800 dark:text-stone-400 dark:hover:text-royal-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="#contact" className="btn-primary hidden text-sm lg:inline-flex">
            Réserver
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`h-0.5 w-5 bg-stone-800 transition-all dark:bg-stone-200 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-stone-800 transition-all dark:bg-stone-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-stone-800 transition-all dark:bg-stone-200 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-300 dark:bg-stone-950 lg:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-7 pt-16">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-2xl font-semibold text-stone-800 transition-colors hover:text-royal-800 dark:text-stone-100 dark:hover:text-royal-300"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contact"
              className="btn-primary mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Réserver
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
