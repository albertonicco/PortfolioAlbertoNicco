import Link from "next/link";
import { films } from "@/data/films";

export const metadata = {
  title: "Films — Alberto Nicco",
  description: "Narrative short films directed by Alberto Nicco.",
};

export default function FilmsPage() {
  return (
    <div className="min-h-[100dvh] pt-[73px]">
      {/* Header */}
      <div className="px-6 md:px-10 pt-16 pb-12 border-b" style={{ borderColor: "#1A1A1A" }}>
        <p className="meta mb-3">[ Narrative work ]</p>
        <h1 className="title">Films</h1>
      </div>

      {/* Project rows */}
      <ul>
        {films.map((film) => (
          <li key={film.slug} className="film-row border-b" style={{ borderColor: "#1A1A1A" }}>
            <Link
              href={`/films/${film.slug}`}
              className="flex items-center gap-6 md:gap-10 px-6 md:px-10 py-6 group"
              aria-label={`${film.title}, ${film.year}`}
            >
              {/* Year */}
              <span className="meta w-10 flex-none" style={{ color: "#444" }}>
                {film.year}
              </span>

              {/* Title + status */}
              <div className="flex-1 min-w-0">
                <span
                  className="film-row-title block font-serif font-light text-fg transition-colors duration-200"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.01em" }}
                >
                  {film.title}
                </span>
                {film.status && (
                  <span
                    className="font-mono block mt-0.5"
                    style={{ fontSize: "11px", color: "#C8102E", letterSpacing: "0.06em" }}
                  >
                    {film.status}
                  </span>
                )}
              </div>

              {/* Genre tag */}
              <span className="meta-accent hidden sm:block flex-none">{film.genre}</span>

              {/* Arrow */}
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
    </div>
  );
}
