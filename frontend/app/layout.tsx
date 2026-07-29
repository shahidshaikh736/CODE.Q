import type { Metadata } from "next";
import "../styles/variables.css";
import "../styles/base.css";
import "../styles/layout.css";
import "../styles/components.css";
import "../styles/editor.css";
import "../styles/animations.css";
import "../styles/themes/forest.css";
import "../styles/themes/dungeon.css";
import "../styles/themes/vault.css";
import "../styles/themes/light.css";

export const metadata: Metadata = {
  title: "CODE.Q — Full-Stack RPG Coding Game",
  description: "A gamified coding adventure where players learn Frontend, Backend, and Database concepts.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="shortcut icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="theme-forest">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
