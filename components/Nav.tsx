"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/films",      label: "Films" },
  { href: "/videomaker", label: "Videomaker" },
  { href: "/other",      label: "Other" },
  { href: "/about",      label: "About" },
  { href: "/contact",    label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-6 bg-bg"
      >
        {/* Wordmark — always visible */}
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg hover:text-accent transition-colors duration-300"
          style={{ whiteSpace: "nowrap" }}
          onClick={() => setOpen(false)}
        >
          Alberto Nicco
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          style={{ width: "24px", height: "24px", background: "none", border: "none", cursor: "none", padding: 0 }}
        >
          <span style={{ display: "block", width: "24px", height: "1px", background: "#C8102E" }} />
          <span style={{ display: "block", width: "24px", height: "1px", background: "#C8102E" }} />
          <span style={{ display: "block", width: "24px", height: "1px", background: "#C8102E" }} />
        </button>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.25s ease",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              color: "#C8102E",
              fontSize: "28px",
              lineHeight: 1,
              cursor: "none",
            }}
            aria-label="Close menu"
          >
            ×
          </button>

          {/* Nav links */}
          <nav
            className="flex flex-col items-center gap-8"
            aria-label="Mobile navigation"
          >
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-serif font-light"
                  style={{
                    fontSize: "32px",
                    letterSpacing: "-0.02em",
                    color: isActive ? "#C8102E" : "#F5F0E8",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C8102E"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isActive ? "#C8102E" : "#F5F0E8"; }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
