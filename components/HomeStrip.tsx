"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface StripItem {
  slug: string;
  title: string;
  year: number;
  genre: string;
  poster: string;
  href: string;
  index: number;
}

function ArrowButton({
  onClick,
  direction,
  disabled,
}: {
  onClick: () => void;
  direction: "left" | "right";
  disabled: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "40px",
        height: "40px",
        flexShrink: 0,
        borderRadius: "50%",
        border: `1px solid ${disabled ? "#333" : hover ? "#E8005A" : "#C8102E"}`,
        background: disabled ? "transparent" : hover ? "rgba(200,16,46,0.15)" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: disabled ? "#333" : hover ? "#E8005A" : "#C8102E",
        fontSize: "18px",
        transition: "all 0.2s ease",
        cursor: disabled ? "default" : "none",
      }}
      aria-label={direction === "left" ? "Previous" : "Next"}
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );
}

export default function HomeStrip({ items }: { items: StripItem[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const items4 = items.slice(0, 4);

  const prev = () => { setDirection(-1); setCurrent((i) => Math.max(0, i - 1)); };
  const next = () => { setDirection(1); setCurrent((i) => Math.min(items4.length - 1, i + 1)); };

  const item = items4[current];

  return (
    <div style={{ padding: "1.5rem" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <ArrowButton onClick={prev} direction="left" disabled={current === 0} />

        {/* Outer pulsing glow container */}
        <div className="neon-pulse" style={{ flex: 1, position: "relative" }}>
          {/* Card */}
          <div style={{ overflow: "hidden", position: "relative", height: "500px" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.slug}
                initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
                transition={{ ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
                style={{ height: "100%" }}
              >
                <Link
                  href={item.href}
                  className="film-card"
                  style={{
                    display: "block",
                    position: "relative",
                    height: "100%",
                    border: "1px solid #1A1A1A",
                    background: "#000",
                  }}
                  draggable={false}
                  aria-label={`${item.title}, ${item.year}`}
                >
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    quality={100}
                    style={{
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    sizes="min(900px, 90vw)"
                    priority={current === 0}
                  />

                  {/* Dark gradient bottom */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Sequential number — top left */}
                  <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem" }}>
                    <span className="meta" style={{ color: "rgba(245,240,232,0.45)", fontSize: "11px" }}>
                      {String(item.index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title + genre · year — bottom left */}
                  <div style={{ position: "absolute", bottom: "1.75rem", left: "1.75rem", right: "1.75rem" }}>
                    <p className="meta" style={{ fontSize: "11px", marginBottom: "0.5rem" }}>
                      {item.genre}&nbsp;&nbsp;·&nbsp;&nbsp;{item.year}
                    </p>
                    <h2
                      className="font-serif font-light text-fg"
                      style={{ fontSize: "36px", letterSpacing: "-0.02em", lineHeight: 1 }}
                    >
                      {item.title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ArrowButton onClick={next} direction="right" disabled={current === items4.length - 1} />
      </div>

      {/* Dots indicator */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "1.25rem" }}>
        {items4.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "#C8102E" : "#333",
              border: "none",
              padding: 0,
              cursor: "none",
              transition: "all 0.3s ease",
            }}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
