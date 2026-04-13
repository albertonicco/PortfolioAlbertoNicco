"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const hovering = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    const enter = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) hovering.current = true;
    };

    const leave = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) hovering.current = false;
    };

    const tick = () => {
      const lf = 0.15;
      currentX.current += (targetX.current - currentX.current) * lf;
      currentY.current += (targetY.current - currentY.current) * lf;

      const size = hovering.current ? 32 : 16;
      cursor.style.transform = `translate(${currentX.current - size / 2}px, ${currentY.current - size / 2}px)`;
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
      cursor.style.backgroundColor = hovering.current ? "rgba(200,16,46,0.15)" : "transparent";
      cursor.style.borderColor = hovering.current ? "#E8005A" : "#C8102E";
      rafId.current = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        border: "1.5px solid #C8102E",
        backgroundColor: "transparent",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
        willChange: "transform",
      }}
    />
  );
}
