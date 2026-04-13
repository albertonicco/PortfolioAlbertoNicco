"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Props {
  stills: string[];
  title: string;
}

const THUMB_W = 280;
const THUMB_H = 180;
const GAP = 12;
const SCROLL_BY = THUMB_W + GAP;

function ArrowBtn({
  onClick,
  dir,
  disabled,
}: {
  onClick: () => void;
  dir: "left" | "right";
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
        borderRadius: "50%",
        border: `1px solid ${disabled ? "#333" : hover ? "#E8005A" : "#C8102E"}`,
        background: disabled ? "transparent" : hover ? "rgba(200,16,46,0.15)" : "transparent",
        color: disabled ? "#333" : hover ? "#E8005A" : "#C8102E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        flexShrink: 0,
        transition: "all 0.2s ease",
        cursor: disabled ? "default" : "none",
      }}
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      {dir === "left" ? "←" : "→"}
    </button>
  );
}

export default function StillsThumbnailCarousel({ stills, title }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Touch swipe
  const touchStartX = useRef(0);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }

  useEffect(() => {
    updateScrollState();
  }, [stills]);

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -SCROLL_BY, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: SCROLL_BY, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  }

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + stills.length) % stills.length : null)),
    [stills.length]
  );
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % stills.length : null)),
    [stills.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  if (stills.length === 0) return null;

  return (
    <>
      {/* Thumbnail row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "0 1.5rem",
        }}
      >
        <ArrowBtn onClick={scrollLeft} dir="left" disabled={!canScrollLeft} />

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
              if (diff > 0) { scrollRight(); } else { scrollLeft(); }
            }
          }}
          style={{
            display: "flex",
            gap: `${GAP}px`,
            overflowX: "hidden",
            flex: 1,
            scrollBehavior: "smooth",
          }}
          role="region"
          aria-label={`${title} stills gallery`}
        >
          {stills.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              style={{
                flex: "none",
                width: `${THUMB_W}px`,
                height: `${THUMB_H}px`,
                padding: 0,
                border: "1px solid #1A1A1A",
                background: "#0d0d0d",
                overflow: "hidden",
                cursor: "none",
                transition: "border-color 0.2s ease",
                display: "block",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8102E"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#1A1A1A"; }}
              aria-label={`Open still ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${title} — still ${i + 1}`}
                width={THUMB_W}
                height={THUMB_H}
                quality={100}
                style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
                draggable={false}
              />
            </button>
          ))}
        </div>

        <ArrowBtn onClick={scrollRight} dir="right" disabled={!canScrollRight} />
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.3s ease",
          }}
          onClick={closeLightbox}
        >
          {/* Counter */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "2rem",
              fontFamily: "var(--font-space-mono)",
              fontSize: "12px",
              color: "#666",
              letterSpacing: "0.1em",
            }}
          >
            {lightboxIndex + 1} / {stills.length}
          </div>

          {/* ESC label */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "1.5rem",
              left: "2rem",
              background: "none",
              border: "none",
              color: "#666",
              fontSize: "12px",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-space-mono)",
              textTransform: "uppercase",
              cursor: "none",
            }}
          >
            ESC
          </button>

          {/* Image */}
          <div
            style={{ maxWidth: "90vw", maxHeight: "90vh", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={stills[lightboxIndex]}
              alt={`${title} — still ${lightboxIndex + 1}`}
              width={1920}
              height={1080}
              quality={100}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Prev arrow */}
          {stills.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              style={{
                position: "absolute",
                left: "2rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#F5F0E8",
                fontSize: "2rem",
                cursor: "none",
                opacity: 0.6,
              }}
              aria-label="Previous"
            >
              ←
            </button>
          )}

          {/* Next arrow */}
          {stills.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              style={{
                position: "absolute",
                right: "2rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#F5F0E8",
                fontSize: "2rem",
                cursor: "none",
                opacity: 0.6,
              }}
              aria-label="Next"
            >
              →
            </button>
          )}
        </div>
      )}
    </>
  );
}
