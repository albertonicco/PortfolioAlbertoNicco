import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { videoProjects } from "@/data/videomaker";
import StillsThumbnailCarousel from "@/components/StillsThumbnailCarousel";
import FullscreenButton from "@/components/FullscreenButton";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return videoProjects.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = videoProjects.find((v) => v.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Alberto Nicco`,
    description: project.description.slice(0, 160),
  };
}

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

export default function VideomakerProjectPage({ params }: Props) {
  const project = videoProjects.find((v) => v.slug === params.slug);
  if (!project) notFound();

  const diskStills = readStillsFromDisk(params.slug);
  const stills = diskStills.length > 0 ? diskStills : project.stills;
  const hasStills = stills.length > 0;

  return (
    <article className="pt-[73px]">

      {/* ── Hero ── */}
      <div
        data-video-container
        className="relative w-full"
        style={{ height: "70vh" }}
      >
        {project.youtubeId ? (
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            title={project.title}
          />
        ) : project.heroVideo ? (
          <video
            src={project.heroVideo}
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
        ) : (
          <Image
            src={project.poster}
            alt={project.title}
            fill
            quality={100}
            className="object-cover"
            sizes="100vw"
            priority
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <div className="absolute bottom-8 left-6 md:left-10" style={{ pointerEvents: "none" }}>
          <h1 className="project-title text-fg drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {project.title}
          </h1>
        </div>
        <FullscreenButton />
      </div>

      {/* Metadata strip */}
      <div className="px-6 md:px-10 py-5 border-b" style={{ borderColor: "#1A1A1A" }}>
        <p className="meta">
          {project.year} · {project.role}
          {project.client ? ` · ${project.client}` : ""}
          {project.approach ? ` · ${project.approach}` : ""}
        </p>
      </div>

      {/* ── Description sections ── */}
      <section className="border-b" style={{ borderColor: "#1A1A1A" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto]"
          style={{ alignItems: "stretch" }}
        >
          {/* Text content — left */}
          <div className="px-8 md:px-14 py-12 md:py-16 border-b md:border-b-0 md:border-r" style={{ borderColor: "#1A1A1A" }}>
            {project.descriptionSections ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                {project.descriptionSections.map((section) => (
                  <div key={section.label}>
                    <p className="meta mb-5">{section.label}</p>
                    {section.body.split("\n\n").map((para, j) => (
                      <p
                        key={j}
                        className="body-text"
                        style={{ maxWidth: "65ch", marginBottom: "1rem" }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="meta mb-6">About</p>
                <p className="body-text" style={{ maxWidth: "65ch" }}>
                  {project.description}
                </p>
              </>
            )}
          </div>

          {/* Vertical video — right column, 4:5, no crop */}
          {(project.heroVideo || project.youtubeId) && (
            <div
              style={{
                width: "520px",
                flexShrink: 0,
                padding: "3rem",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                background: "#000",
              }}
            >
              <div
                data-video-container
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                }}
              >
                {project.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                    title={project.title}
                  />
                ) : (
                  <video
                    src={project.heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                      background: "#000",
                    }}
                  />
                )}
                <FullscreenButton />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Stills gallery */}
      {hasStills && (
        <section className="py-10 border-b" style={{ borderColor: "#1A1A1A" }}>
          <p className="meta px-6 md:px-10 mb-6">[ Stills ]</p>
          <StillsThumbnailCarousel stills={stills} title={project.title} />
        </section>
      )}

      {/* Back */}
      <div className="px-6 md:px-10 py-8">
        <Link href="/videomaker" className="meta hover-magenta">
          &larr; Back to Videomaker
        </Link>
      </div>
    </article>
  );
}
