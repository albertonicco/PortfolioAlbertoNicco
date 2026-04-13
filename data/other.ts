export interface OtherWork {
  slug: string;
  title: string;
  year: number;
  role: string;
  genre: string;
  production: string;
  director?: string;
  poster: string;
  description: string;
}

export const otherWorks: OtherWork[] = [
  {
    slug: "session-76",
    title: "Session 76 \u2014 Climax",
    year: 2023,
    role: "Director \u00b7 Screenwriter",
    genre: "Immersive Cinema / Sci-fi",
    production: "Politecnico di Torino",
    poster: "/projects/session-76/poster.jpg",
    description:
      "An immersive cinema experience produced at Politecnico di Torino. A science fiction project exploring spatial storytelling and non-linear narrative \u2014 designed to be experienced rather than watched.",
  },
  {
    slug: "roma-obi",
    title: "Roma, OBI",
    year: 2024,
    role: "Editor \u00b7 Colorist",
    genre: "Music Video",
    production: "Independent",
    poster: "/projects/roma-obi/poster.jpg",
    description:
      "Music video for OBI. Editing rhythm and color grading as the primary expressive tools \u2014 building a visual language that sustains and amplifies the track.",
  },
  {
    slug: "gioco-sedie",
    title: "Il Gioco delle Sedie",
    year: 2025,
    role: "Screenwriter",
    genre: "Thriller short film",
    production: "Studio Ireos",
    director: "Anastasia Vittoria Sarro",
    poster: "/projects/gioco-sedie/poster.jpg",
    description:
      "Screenplay written for a student film team at Studio Ireos. Currently in post-production. Directed by Anastasia Vittoria Sarro.",
  },
];
