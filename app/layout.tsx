import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Alberto Nicco — Filmmaker & Video Editor",
  description:
    "Filmmaker and video editor based in Turin, Italy. Narrative films, documentary work, event video.",
  openGraph: {
    title: "Alberto Nicco — Filmmaker & Video Editor",
    description: "Filmmaker and video editor based in Turin, Italy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${spaceMono.variable} bg-bg text-fg font-serif`}>
        <CustomCursor />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
