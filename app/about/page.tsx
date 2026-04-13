import Image from "next/image";

export const metadata = {
  title: "About — Alberto Nicco",
  description: "Director, screenwriter, and video editor based in Turin, Italy.",
};

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] pt-[73px]">
      <div
        className="grid grid-cols-1 md:grid-cols-[2fr_3fr]"
        style={{ minHeight: "calc(100dvh - 73px)" }}
      >
        {/* Left — photo */}
        <div
          className="relative border-r border-b md:border-b-0"
          style={{ borderColor: "#1A1A1A", minHeight: "440px" }}
        >
          <Image
            src="/about/photo-about.jpg"
            alt="Alberto Nicco"
            fill
            quality={100}
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
          <div className="absolute inset-0 bg-[#0d0d0d]" style={{ zIndex: -1 }} />
        </div>

        {/* Right — bio */}
        <div className="px-8 md:px-14 py-14 md:py-20 flex flex-col justify-between">
          <div>
            <p className="meta mb-8">[ About ]</p>

            <p
              className="font-serif font-light text-fg mb-5 leading-relaxed"
              style={{ fontSize: "17px", maxWidth: "58ch", lineHeight: 1.85 }}
            >
              Alberto Nicco is a director, screenwriter, and video editor based in
              Turin, Italy. He holds a Master&apos;s degree in Cinema and Media
              Engineering from Politecnico di Torino, obtained in April 2025.
            </p>
            <p
              className="font-serif font-light text-fg mb-5 leading-relaxed"
              style={{ fontSize: "17px", maxWidth: "58ch", lineHeight: 1.85 }}
            >
              Always passionate about cinema, in his early university years he
              approached screenwriting and in 2021 wrote and directed his first
              short film within a university project. In 2022 he directed, wrote,
              and produced XVI Barre, a musical short film that won 7 awards at
              national and international festivals and was distributed by Clerks
              Distribution.
            </p>
            <p
              className="font-serif font-light text-fg mb-5 leading-relaxed"
              style={{ fontSize: "17px", maxWidth: "58ch", lineHeight: 1.85 }}
            >
              In 2024 he directed and wrote Jouhatsu, an independent noir drama
              financed through crowdfunding, currently in distribution. In the same
              year he wrote Il Gioco delle Sedie, directed by Anastasia Vittoria
              Sarro, and co-wrote and co-directed Eclipse, a science fiction short
              film developed as his Master&apos;s thesis.
            </p>
            <p
              className="font-serif font-light text-fg mb-5 leading-relaxed"
              style={{ fontSize: "17px", maxWidth: "58ch", lineHeight: 1.85 }}
            >
              In May 2025 he participated in the Guangxi edition of Looking China
              2025, writing, directing and editing the documentary The Border, set
              at the border between China and Vietnam — produced in 8 days entirely
              on location. The film won 3rd place at the Golden Lenses Award.
            </p>
            <p
              className="font-serif font-light text-fg leading-relaxed"
              style={{ fontSize: "17px", maxWidth: "58ch", lineHeight: 1.85 }}
            >
              He currently works as a Videomaker &amp; Field Reporter for Citynews,
              covering local businesses, professionals, and associations. He is open
              to collaborations in filmmaking, documentary production, wedding films,
              and video content for digital platforms.
            </p>

            {/* CV download */}
            <div className="mt-10">
              <a
                href="/cv/alberto-nicco-cv.pdf"
                download
                className="font-mono hover-magenta inline-flex items-center gap-2 transition-colors duration-300"
                style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#C8102E", textTransform: "uppercase" }}
              >
                Download CV &rarr;
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="mt-12 flex items-center gap-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="meta hover-magenta"
            >
              Instagram
            </a>
            <span className="meta" style={{ color: "#333" }}>·</span>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="meta hover-magenta"
            >
              LinkedIn
            </a>
            <span className="meta" style={{ color: "#333" }}>·</span>
            <a
              href="mailto:albertonicco5@gmail.com"
              className="meta hover-magenta"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
