import Image from "next/image";
import Link from "next/link";
import HomeStrip from "@/components/HomeStrip";
import FullscreenButton from "@/components/FullscreenButton";
import { films } from "@/data/films";
import { VIDEO_URLS } from "@/data/videos";

export default function Home() {
  const stripItems = films.map((f, i) => ({
    slug: f.slug,
    title: f.title,
    year: f.year,
    genre: f.genre,
    poster: f.poster,
    href: `/films/${f.slug}`,
    index: i,
  }));

  return (
    <>
      {/* ── Hero Video — full viewport ── */}
      <section
        data-video-container
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <video
          src={VIDEO_URLS.homeHero || "/videos/hero.mp4"}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div style={{ position: "absolute", bottom: "2.5rem", left: "1.5rem" }}>
          <h1
            className="font-serif font-light"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 8rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: "#F5F0E8",
              textShadow: "0 2px 24px rgba(0,0,0,0.9)",
            }}
          >
            Alberto Nicco
          </h1>
        </div>
        <FullscreenButton />
      </section>

      {/* ── Bio section ── */}
      <section
        className="grid grid-cols-1 md:grid-cols-[2fr_3fr] border-t"
        style={{ borderColor: "#1A1A1A" }}
      >
        {/* Left — photo */}
        <div
          className="relative border-r"
          style={{
            borderColor: "#1A1A1A",
            minHeight: "400px",
            padding: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="portrait-frame"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              minHeight: "336px",
              filter: "drop-shadow(0 0 12px #C8102E30)",
            }}
          >
            <Image
              src="/about/photo-home.jpg"
              alt="Alberto Nicco"
              fill
              quality={100}
              style={{
                objectFit: "cover",
                objectPosition: "center top",
                clipPath: "ellipse(45% 50% at 50% 50%)",
              }}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>

        {/* Right — bio text + links */}
        <div className="flex flex-col justify-between px-8 md:px-12 py-12 md:py-16">
          <div>
            <p
              className="font-serif font-light text-fg mb-8"
              style={{ fontSize: "20px", lineHeight: 1.9, maxWidth: "58ch" }}
            >
              Alberto Nicco is a director, screenwriter, and video editor based in Turin, Italy.
              His path originates in cinema and documentary filmmaking, where he developed narrative
              and aesthetic sensitivity, and has since expanded into the creation of video content
              for brands and digital communication.
            </p>
            <Link href="/contact" className="cta-text-link">
              Get in touch &rarr;
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <a
              href="https://www.instagram.com/alberto_nicco/"
              target="_blank"
              rel="noopener noreferrer"
              className="meta hover-magenta"
            >
              Instagram
            </a>
            <span className="meta" style={{ color: "#333" }}>·</span>
            <a
              href="https://www.linkedin.com/in/alberto-nicco-b67b692a3"
              target="_blank"
              rel="noopener noreferrer"
              className="meta hover-magenta"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* ── Films horizontal magazine strip ── */}
      <section className="border-t" style={{ borderColor: "#1A1A1A" }}>
        <HomeStrip items={stripItems} />
      </section>

      {/* ── Footer ── */}
      <footer
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 md:px-10 py-5 border-t gap-4"
        style={{ borderColor: "#1A1A1A" }}
      >
        <span className="meta">Alberto Nicco</span>
        <nav className="flex flex-wrap items-center gap-6" aria-label="Footer navigation">
          {[
            { href: "/films", label: "Films" },
            { href: "/videomaker", label: "Videomaker" },
            { href: "/other", label: "Other" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="meta hover-magenta">
              {l.label}
            </Link>
          ))}
        </nav>
      </footer>
    </>
  );
}
