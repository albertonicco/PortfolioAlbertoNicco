import Image from "next/image";
import { otherWorks } from "@/data/other";

export const metadata = {
  title: "Other — Alberto Nicco",
  description: "Other works — immersive cinema, music video, screenwriting.",
};

const DIVIDER = "———";

export default function OtherPage() {
  return (
    <div className="min-h-[100dvh] pt-[73px]">
      {/* Header */}
      <div className="px-6 md:px-10 pt-16 pb-12 border-b" style={{ borderColor: "#1A1A1A" }}>
        <p className="meta mb-3">[ Experimental &amp; other ]</p>
        <h1 className="title">Other Works</h1>
      </div>

      {/* ── Individual project sections ── */}
      {otherWorks.map((work, i) => (
        <section key={work.slug}>
          {i > 0 && (
            <div className="px-6 md:px-10 py-8 border-b" style={{ borderColor: "#1A1A1A" }}>
              <span className="meta" style={{ color: "#333" }}>{DIVIDER}</span>
            </div>
          )}

          <div
            className="grid grid-cols-1 md:grid-cols-[5fr_7fr] border-b"
            style={{ borderColor: "#1A1A1A" }}
          >
            {/* Poster */}
            <div
              className="relative border-r"
              style={{ borderColor: "#1A1A1A", minHeight: "340px", background: "#0d0d0d" }}
            >
              <Image
                src={work.poster}
                alt={work.title}
                fill
                quality={100}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>

            {/* Content */}
            <div className="px-8 md:px-12 py-10 md:py-14 flex flex-col justify-center">
              {/* Genre · Year — crimson */}
              <p
                className="meta mb-1"
                style={{ fontSize: "11px", color: "#C8102E", letterSpacing: "0.08em" }}
              >
                {work.genre}&nbsp;&nbsp;·&nbsp;&nbsp;{work.year}
              </p>

              {/* Title */}
              <h2
                className="font-serif font-light text-fg mb-2 leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
              >
                {work.title}
              </h2>

              {/* Role — secondary gray */}
              <p className="meta mb-6" style={{ color: "#666666" }}>
                {work.role}
              </p>

              {/* Separator */}
              <div style={{ borderTop: "1px solid #1A1A1A", marginBottom: "20px" }} />

              {/* Description — lighter gray, not crimson */}
              <p
                className="font-serif font-light"
                style={{ fontSize: "17px", lineHeight: 1.8, maxWidth: "55ch", color: "#999999" }}
              >
                {work.description}
              </p>

              {work.director && (
                <p className="meta mt-6" style={{ color: "#555" }}>
                  Directed by{" "}
                  <span style={{ color: "#888" }}>{work.director}</span>
                </p>
              )}
              <p className="meta mt-2" style={{ color: "#444" }}>
                {work.production}
              </p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
