import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { films } from "@/data/films";
import VideoHero from "@/components/VideoHero";
import StillsThumbnailCarousel from "@/components/StillsThumbnailCarousel";
import FullscreenButton from "@/components/FullscreenButton";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props) {
  const film = films.find((f) => f.slug === params.slug);
  if (!film) return {};
  return {
    title: `${film.title} — Alberto Nicco`,
    description: film.synopsis.slice(0, 160),
  };
}

/** Recursively read all image files from a stills subdirectory at build time */
function readStillsFromDisk(slug: string): string[] {
  const stillsDir = path.join(process.cwd(), "public", "projects", slug, "stills");
  if (!fs.existsSync(stillsDir)) return [];

  function getAllImages(dir: string): string[] {
    const results: string[] = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        results.push(...getAllImages(fullPath));
      } else if (
        /\.(jpg|jpeg|png|webp|avif)$/i.test(item.name) &&
        !/poster|locandina|hero/i.test(item.name)
      ) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const publicDir = path.join(process.cwd(), "public");
  return getAllImages(stillsDir)
    .sort()
    .map((f) => {
      const rel = f.replace(publicDir, "").replace(/\\/g, "/");
      const parts = rel.split("/");
      const filename = parts.pop()!;
      return [...parts, encodeURIComponent(filename)].join("/");
    });
}

const NEON_FRAME = {
  border: "1px solid #C8102E",
  animation: "neonPulse 4s ease-in-out infinite",
  background: "#000",
} as const;

/** Watch link section — uses CSS class for hover, no event handlers needed */
function WatchSection({ film }: { film: { watchUrl?: string; watchLabel?: string } }) {
  if (!film.watchUrl) return null;
  return (
    <section className="px-6 md:px-10 py-8 border-b" style={{ borderColor: "#1A1A1A" }}>
      <p className="meta mb-4">[ Watch ]</p>
      <a
        href={film.watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="watch-link"
        style={{
          fontFamily: "var(--font-space-mono)",
          fontSize: "13px",
          color: "#C8102E",
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
          display: "inline-block",
        }}
      >
        {film.watchLabel || "Watch →"}
      </a>
    </section>
  );
}

export default function FilmPage({ params }: Props) {
  const film = films.find((f) => f.slug === params.slug);
  if (!film) notFound();

  const allStills = readStillsFromDisk(film.slug);
  const [still1, still2] = allStills;
  // Carousel always shows ALL stills (including the two featured ones)
  const carouselStills = allStills;

  const metaParts = [
    film.year,
    film.genre,
    film.duration,
    film.role,
    film.camera,
    film.production,
  ].filter(Boolean).join(" · ");

  // ── The Border — custom layout ──
  if (film.slug === "the-border") {
    return (
      <article className="pt-[73px]">
        {/* 1. Hero — poster full width */}
        <div
          data-video-container
          className="relative w-full"
          style={{ height: "70vh" }}
        >
          <Image
            src={film.poster}
            alt={film.title}
            fill
            quality={100}
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 60%)" }}
          />
          <div className="absolute bottom-8 left-6 md:left-10">
            <h1
              className="font-serif font-light text-fg"
              style={{
                fontSize: "clamp(72px, 10vw, 120px)",
                letterSpacing: "-0.02em",
                lineHeight: 0.92,
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              }}
            >
              {film.title}
            </h1>
          </div>
          <FullscreenButton />
        </div>

        {/* Metadata strip */}
        <div className="px-6 md:px-10 py-5 border-b" style={{ borderColor: "#1A1A1A" }}>
          <p className="meta">{metaParts}</p>
          {film.location && <p className="meta mt-1" style={{ color: "#555" }}>{film.location}</p>}
        </div>

        {/* 2. Synopsis + poster */}
        <section className="grid grid-cols-1 md:grid-cols-2 border-b" style={{ borderColor: "#1A1A1A" }}>
          <div className="px-8 md:px-12 py-10 md:py-14 border-b md:border-b-0 md:border-r" style={{ borderColor: "#1A1A1A" }}>
            <p className="meta mb-6">Synopsis</p>
            {film.synopsis.split("\n\n").map((para, i) => (
              <p key={i} className="body-text" style={{ maxWidth: "55ch", marginBottom: i < film.synopsis.split("\n\n").length - 1 ? "1rem" : 0 }}>{para}</p>
            ))}
            {film.productionNote && (
              <p className="meta mt-8" style={{ color: "#555" }}>— {film.productionNote}</p>
            )}
          </div>
          <div className="flex items-start justify-center p-8 md:p-12">
            <Image
              src={film.poster}
              alt={`${film.title} poster`}
              width={400}
              height={560}
              quality={100}
              className="w-full object-contain"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </section>

        {/* Watch link */}
        <WatchSection film={film} />

        {/* 3. Two stills with neon frame */}
        {still1 && still2 && (
          <section className="px-6 md:px-10 py-10 border-b" style={{ borderColor: "#1A1A1A" }}>
            <div className="grid grid-cols-2" style={{ gap: "16px" }}>
              <div style={{ ...NEON_FRAME, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src={still1} alt={`${film.title} — still 1`} width={900} height={600} quality={100} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} sizes="50vw" />
              </div>
              <div style={{ ...NEON_FRAME, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Image src={still2} alt={`${film.title} — still 2`} width={900} height={600} quality={100} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} sizes="50vw" />
              </div>
            </div>
          </section>
        )}

        {/* 4. Looking China context block */}
        <section className="px-6 md:px-10 py-8 border-b" style={{ borderColor: "#1A1A1A" }}>
          <p className="meta mb-1">Produced as part of the international Looking China 2025 program.</p>
          <p className="meta" style={{ color: "#C8102E" }}>The Border won 3rd place at the Golden Lenses Award.</p>
        </section>

        {/* 5. Full stills carousel */}
        {carouselStills.length > 0 && (
          <section className="py-10 border-b" style={{ borderColor: "#1A1A1A" }}>
            <p className="meta px-6 md:px-10 mb-6">[ Stills ]</p>
            <StillsThumbnailCarousel stills={carouselStills} title={film.title} />
          </section>
        )}

        {/* 6. Credits */}
        <section className="px-6 md:px-10 py-12 border-b" style={{ borderColor: "#1A1A1A" }}>
          <p className="meta mb-8">[ Credits ]</p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12" style={{ maxWidth: "800px" }}>
            {Object.entries(film.credits).map(([role, name]) => (
              <div key={role}>
                <dt className="meta mb-1">{role}</dt>
                <dd className="font-serif font-light text-fg" style={{ fontSize: "16px" }}>{name}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="px-6 md:px-10 py-8">
          <Link href="/films" className="meta hover-magenta">&larr; Back to Films</Link>
        </div>
      </article>
    );
  }

  // ── Default layout for all other films ──
  return (
    <article className="pt-[73px]">

      {/* 1. HERO */}
      <div className="relative">
        <VideoHero
          src={film.trailer}
          poster={film.poster}
          title={film.title}
          noTrailer={film.noTrailer}
        />
        <div className="absolute bottom-8 left-6 md:left-10 right-6">
          <h1
            className="font-serif font-light text-fg"
            style={{
              fontSize: "clamp(72px, 10vw, 120px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.92,
              textShadow: "0 2px 20px rgba(0,0,0,0.9)",
            }}
          >
            {film.title}
          </h1>
        </div>
      </div>

      {/* Metadata strip */}
      <div className="px-6 md:px-10 py-5 border-b" style={{ borderColor: "#1A1A1A" }}>
        <p className="meta">{metaParts}</p>
        {film.location && <p className="meta mt-1" style={{ color: "#555" }}>{film.location}</p>}
        {film.distribution && <p className="meta mt-1" style={{ color: "#555" }}>Distribution: {film.distribution}</p>}
      </div>

      {/* 2. POSTER + SYNOPSIS */}
      <section className="grid grid-cols-1 md:grid-cols-[3fr_7fr] border-b" style={{ borderColor: "#1A1A1A" }}>
        <div
          className="border-r"
          style={{
            borderColor: "#1A1A1A",
            background: "#000",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Image
            src={film.poster}
            alt={`${film.title} poster`}
            width={600}
            height={900}
            quality={100}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
        <div className="px-8 md:px-12 py-10 md:py-14">
          <p className="meta mb-6">Synopsis</p>
          {film.synopsis.split("\n\n").map((para, i) => (
            <p key={i} className="body-text" style={{ maxWidth: "65ch", marginBottom: i < film.synopsis.split("\n\n").length - 1 ? "1rem" : 0 }}>{para}</p>
          ))}
          {film.productionNote && (
            <p className="meta mt-8" style={{ color: "#555" }}>— {film.productionNote}</p>
          )}
        </div>
      </section>

      {/* Watch link — XVI Barre, Jouhatsu only (not Eclipse) */}
      <WatchSection film={film} />

      {/* 3. TWO STILLS — neon frame */}
      {still1 && still2 && (
        <section className="px-6 md:px-10 py-10 border-b" style={{ borderColor: "#1A1A1A" }}>
          <div className="grid grid-cols-2" style={{ gap: "16px" }}>
            <div style={{ ...NEON_FRAME, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src={still1} alt={`${film.title} — still 1`} width={900} height={600} quality={100} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} sizes="(max-width: 768px) 50vw, 45vw" />
            </div>
            <div style={{ ...NEON_FRAME, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Image src={still2} alt={`${film.title} — still 2`} width={900} height={600} quality={100} style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }} sizes="(max-width: 768px) 50vw, 45vw" />
            </div>
          </div>
        </section>
      )}

      {/* 4. PULL QUOTE */}
      {film.pullQuote && (
        <section className="px-6 md:px-16 py-14 md:py-20 border-b" style={{ borderColor: "#1A1A1A" }}>
          {Array.isArray(film.pullQuote) ? (
            <div
              style={{
                borderLeft: "3px solid #C8102E",
                paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
                maxWidth: "75ch",
              }}
            >
              {film.pullQuote.map((q, i) => (
                <blockquote
                  key={i}
                  className="font-serif italic text-fg"
                  style={{
                    fontSize: "clamp(1.3rem, 3vw, 2rem)",
                    lineHeight: 1.6,
                    letterSpacing: "-0.01em",
                    marginBottom: i < (film.pullQuote as string[]).length - 1 ? "1.2rem" : 0,
                  }}
                >
                  {q}
                </blockquote>
              ))}
            </div>
          ) : (
            <blockquote
              className="font-serif italic text-fg"
              style={{
                fontSize: "clamp(1.3rem, 3vw, 2rem)",
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
                borderLeft: "3px solid #C8102E",
                paddingLeft: "clamp(1.5rem, 4vw, 3rem)",
                maxWidth: "75ch",
              }}
            >
              {film.pullQuote}
            </blockquote>
          )}
        </section>
      )}

      {/* 5. STILLS CAROUSEL */}
      {carouselStills.length > 0 && (
        <section className="py-10 border-b" style={{ borderColor: "#1A1A1A" }}>
          <p className="meta px-6 md:px-10 mb-6">[ Stills ]</p>
          <StillsThumbnailCarousel stills={carouselStills} title={film.title} />
        </section>
      )}

      {/* 6. CREDITS */}
      <section className="px-6 md:px-10 py-12 border-b" style={{ borderColor: "#1A1A1A" }}>
        <p className="meta mb-8">[ Credits ]</p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-12" style={{ maxWidth: "800px" }}>
          {Object.entries(film.credits).map(([role, name]) => (
            <div key={role}>
              <dt className="meta mb-1">{role}</dt>
              <dd className="font-serif font-light text-fg" style={{ fontSize: "16px" }}>{name}</dd>
            </div>
          ))}
          {film.cast && Object.entries(film.cast).map(([character, actor]) => (
            <div key={character}>
              <dt className="meta mb-1">{character}</dt>
              <dd className="font-serif font-light text-fg" style={{ fontSize: "16px" }}>{actor}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 7. FESTIVALS NOTE */}
      {film.festivalsNote && (
        <section className="px-6 md:px-10 py-8 border-b" style={{ borderColor: "#1A1A1A" }}>
          <p className="meta-accent">&#9733; {film.festivalsNote}</p>
        </section>
      )}

      <div className="px-6 md:px-10 py-8">
        <Link href="/films" className="meta hover-magenta">&larr; Back to Films</Link>
      </div>
    </article>
  );
}
