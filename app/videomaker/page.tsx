import Link from "next/link";
import { videoProjects } from "@/data/videomaker";

export const metadata = {
  title: "Videomaker — Alberto Nicco",
  description: "Field and event video work by Alberto Nicco.",
};

const subtitles: Record<string, string> = {
  wedding: "Documentary wedding film — direction, shooting & editing",
  citynews: "Field production, interviewing & editing for Citynews digital platform",
};

export default function VideomakersPage() {
  return (
    <div className="min-h-[100dvh] pt-[73px]">
      {/* Header */}
      <div className="px-6 md:px-10 pt-16 pb-12 border-b" style={{ borderColor: "#1A1A1A" }}>
        <p className="meta mb-3">[ Field &amp; event work ]</p>
        <h1 className="title">Videomaker</h1>
      </div>

      {/* Project rows */}
      <ul>
        {videoProjects.map((project) => (
          <li key={project.slug} className="film-row border-b" style={{ borderColor: "#1A1A1A" }}>
            <Link
              href={`/videomaker/${project.slug}`}
              className="flex items-center gap-6 md:gap-10 px-6 md:px-10 py-6"
              aria-label={`${project.title}, ${project.year}`}
            >
              <span className="meta w-10 flex-none" style={{ color: "#444" }}>
                {project.year}
              </span>

              {/* Title + subtitle */}
              <div className="flex-1 min-w-0">
                <span
                  className="film-row-title block font-serif font-light text-fg transition-colors duration-200"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.01em" }}
                >
                  {project.title}
                </span>
                {subtitles[project.slug] && (
                  <span
                    className="font-mono block mt-0.5"
                    style={{ fontSize: "11px", color: "#666", letterSpacing: "0.05em" }}
                  >
                    {subtitles[project.slug]}
                  </span>
                )}
              </div>

              <span className="meta-accent hidden sm:block flex-none">
                {project.client || project.approach || ""}
              </span>
              <span
                className="film-row-arrow meta flex-none"
                style={{ color: "#444", fontSize: "18px" }}
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Separator */}
      <div style={{ borderTop: "1px solid #1A1A1A", margin: "48px 0" }} />

      {/* Video Editor section */}
      <section className="px-6 md:px-10 pb-16">
        <p className="meta mb-3">[ Video Editor ]</p>

        <h2 className="title mb-6">Commercial &amp; Digital</h2>

        <p
          className="body-text mb-8"
          style={{ maxWidth: "55ch", color: "#999999" }}
        >
          Short-form content, VSLs, advertising, motion graphics, and multi-platform
          post-production. High-volume workflow built for quality and deadlines.
        </p>

        <a
          href="https://drive.google.com/drive/folders/14IVfvjspiM3kaCpDzJXIFHl8CyYDPW1-?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          className="watch-link"
          style={{
            fontFamily: "var(--font-space-mono)",
            fontSize: "13px",
            color: "#C8102E",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            display: "inline-block",
          }}
        >
          View commercial portfolio →
        </a>
      </section>
    </div>
  );
}
