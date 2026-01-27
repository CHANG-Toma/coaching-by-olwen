import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coaching By Olwen",
  description: "Coaching sportif et transformation personnelle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
