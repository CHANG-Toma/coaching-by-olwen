"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const CALENDLY_BASE = "https://calendly.com/olwen-monnier-coaching";
const CALENDLY_URL = `${CALENDLY_BASE}?hide_gdpr_banner=1&primary_color=922040&text_color=1c1917`;

function CalendlySkeleton() {
  return (
    <div
      className="flex h-full flex-col gap-4 p-5 sm:p-6"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-36 animate-pulse rounded-md bg-stone-200 dark:bg-stone-700" />
        <div className="h-8 w-8 animate-pulse rounded-full bg-stone-200 dark:bg-stone-700" />
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-8 animate-pulse rounded-md bg-stone-100 dark:bg-stone-800"
          />
        ))}
      </div>
      <div className="grid flex-1 grid-cols-7 gap-1.5">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-md bg-stone-100 dark:bg-stone-800"
            style={{ animationDelay: `${(i % 7) * 40}ms` }}
          />
        ))}
      </div>
      <div className="space-y-2 border-t border-stone-200 pt-4 dark:border-stone-700">
        <div className="h-4 w-2/3 animate-pulse rounded bg-stone-200 dark:bg-stone-700" />
        <div className="h-10 w-full animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800" />
        <div className="h-10 w-full animate-pulse rounded-lg bg-stone-100 dark:bg-stone-800" />
      </div>
      <p className="text-center text-xs text-stone-400 dark:text-stone-500">
        Chargement du calendrier…
      </p>
    </div>
  );
}

export default function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "160px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const el = containerRef.current;
    if (!el) return;

    const markLoaded = () => setIsLoaded(true);

    if (el.querySelector("iframe")) {
      markLoaded();
      return;
    }

    const mutationObserver = new MutationObserver(() => {
      if (el.querySelector("iframe")) {
        markLoaded();
        mutationObserver.disconnect();
      }
    });
    mutationObserver.observe(el, { childList: true, subtree: true });

    const timeout = setTimeout(markLoaded, 10000);

    return () => {
      mutationObserver.disconnect();
      clearTimeout(timeout);
    };
  }, [shouldLoad]);

  return (
    <div ref={containerRef}>
      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-stone-700 dark:bg-stone-900">
        <div className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[700px]">
          {!isLoaded && (
            <div className="absolute inset-0 z-10 bg-white dark:bg-stone-900">
              <CalendlySkeleton />
            </div>
          )}

          {shouldLoad && (
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="lazyOnload"
            />
          )}

          <div
            className={`calendly-inline-widget h-[620px] w-full transition-opacity duration-500 sm:h-[680px] lg:h-[700px] ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            data-url={CALENDLY_URL}
            style={{ minWidth: "280px" }}
          />
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-stone-400 dark:text-stone-500">
        Problème d&apos;affichage ?{" "}
        <a
          href={CALENDLY_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-royal-700 underline-offset-2 transition-colors hover:text-royal-600 hover:underline dark:text-royal-300 dark:hover:text-royal-200"
        >
          Ouvrir le calendrier dans un nouvel onglet
        </a>
      </p>
    </div>
  );
}
