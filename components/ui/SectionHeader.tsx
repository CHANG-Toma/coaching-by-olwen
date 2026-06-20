interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  titleId?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  titleId,
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <div className={`accent-bar mt-3 ${align === "center" ? "mx-auto" : ""}`} />
      <h2 id={titleId} className="section-title mt-5">{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
