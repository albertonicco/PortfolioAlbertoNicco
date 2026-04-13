"use client";

import Link from "next/link";
import Image from "next/image";

interface CarouselItem {
  slug: string;
  title: string;
  year: number;
  genre: string;
  poster: string;
  href: string;
  index: number;
}

// Show first 4 items in a 2×2 grid with animated neon frame
export default function HomeCarousel({ items }: { items: CarouselItem[] }) {
  const gridItems = items.slice(0, 4);

  return (
    <div className="px-6 md:px-10 py-8 md:py-12">
      {/* Neon pulse wrapper */}
      <div className="neon-pulse">
        {/* 2×2 grid */}
        <div
          className="grid grid-cols-2 grid-rows-2"
          style={{ height: "clamp(460px, 72vh, 840px)" }}
        >
          {gridItems.map((item, i) => {
            const isRight = i % 2 === 1;
            const isBottom = i >= 2;
            return (
              <Link
                key={item.slug}
                href={item.href}
                className="relative block overflow-hidden group"
                style={{
                  borderRight: isRight ? "none" : "1px solid #C8102E",
                  borderBottom: isBottom ? "none" : "1px solid #C8102E",
                }}
                aria-label={`${item.title}, ${item.year}`}
                draggable={false}
              >
                {/* Poster */}
                <Image
                  src={item.poster}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 45vw"
                  priority={i < 2}
                />

                {/* Dark overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                  }}
                />

                {/* Magenta hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(232, 0, 90, 0.06)" }}
                />

                {/* Index — top left */}
                <div className="absolute top-4 left-4">
                  <span
                    className="meta"
                    style={{ color: "rgba(245,240,232,0.4)", fontSize: "11px" }}
                  >
                    {String(item.index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Info — bottom left */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="meta mb-1.5" style={{ fontSize: "10px" }}>
                    {item.genre}&nbsp;&nbsp;{item.year}
                  </p>
                  <h2
                    className="font-serif font-light text-fg leading-none group-hover:text-[#E8005A] transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1.1rem, 2.2vw, 1.9rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
