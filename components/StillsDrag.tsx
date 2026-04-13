"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface StillsDragProps {
  stills: string[];
  title: string;
}

export default function StillsDrag({ stills, title }: StillsDragProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function onMouseDown(e: React.MouseEvent) {
    if (!trackRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  }
  function onMouseLeave() {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }
  function onMouseUp() {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 4) hasDragged.current = true;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }

  function handleImageClick(i: number) {
    if (!hasDragged.current) setLightboxIndex(i);
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

  return (
    <>
      <div
        ref={trackRef}
        className="stills-track px-6 md:px-10"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        role="region"
        aria-label={`${title} stills gallery`}
      >
        {stills.map((src, i) => (
          <div
            key={i}
            className="still-item relative flex-none"
            style={{ width: "auto", height: "500px", cursor: "pointer" }}
            onClick={() => handleImageClick(i)}
          >
            <Image
              src={src}
              alt={`${title} — still ${i + 1}`}
              height={500}
              width={750}
              className="object-cover h-full w-auto"
              draggable={false}
              style={{ userSelect: "none", display: "block" }}
            />
          </div>
        ))}
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
          {/* Counter — top right */}
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

          {/* Close label — top left */}
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
