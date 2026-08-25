const words = [
  "Technique",
  "Longévité",
  "Présentiel",
  "Distance",
  "Progression",
  "Bienveillance",
  "Performance",
  "Autonomie",
];

export default function Marquee() {
  const items = [...words, ...words];

  return (
    <div className="overflow-hidden border-y border-stone-200 bg-stone-50 py-4 dark:border-stone-800 dark:bg-stone-900/50" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {items.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="mx-6 flex items-center gap-6 text-sm font-semibold uppercase tracking-widest text-stone-400 dark:text-stone-500"
          >
            {word}
            <span className="h-1.5 w-1.5 rounded-full bg-bordeaux-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
