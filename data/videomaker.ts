import { VIDEO_URLS } from "./videos";

export interface DescriptionSection {
  label: string;
  body: string; // paragraphs separated by \n\n
}

export interface VideoProject {
  slug: string;
  title: string;
  year: number;
  role: string;
  approach?: string;
  client?: string;
  noTrailer: boolean;
  heroVideo?: string;
  youtubeId?: string;   // YouTube video ID for embed (when direct video not available)
  poster: string;
  stills: string[];
  description: string;
  descriptionSections?: DescriptionSection[];
}

export const videoProjects: VideoProject[] = [
  {
    slug: "wedding",
    title: "Wedding Film",
    year: 2025,
    role: "Videomaker · Editor · Colorist",
    approach: "Documentary wedding filmmaking",
    noTrailer: true,
    youtubeId: VIDEO_URLS.weddingYoutubeId,
    poster: "/projects/wedding/poster.jpg",
    stills: [],
    description:
      "A wedding film made with a documentary approach — minimal staging, maximum presence.",
    descriptionSections: [
      {
        label: "[ Wedding Filmmaking ]",
        body:
          "A wedding film made with a documentary approach — minimal staging, maximum presence. The camera follows rather than directs, building an emotional archive of a day that happens only once.\n\nEach film is conceived as a short documentary: real moments, unscripted emotions, and careful attention to light and atmosphere. From preparation to reception, every sequence is built around the natural rhythm of the day — never interrupting, always observing.",
      },
      {
        label: "[ Role ]",
        body:
          "Direction · Shooting · Editing · Color Grading\n\nFull end-to-end production: on-field direction and cinematography, advanced post-production with a strong focus on color grading and sound design to deliver a cinematic final product consistent in style and emotion.",
      },
    ],
  },
  {
    slug: "citynews",
    title: "Citynews — Field Report",
    year: 2026,
    role: "Videomaker · Field Reporter",
    client: "Citynews",
    noTrailer: true,
    heroVideo: VIDEO_URLS.citynews || "/projects/citynews/Citynewspostcorrez.mov",
    poster: VIDEO_URLS.citynews || "/projects/citynews/Citynewspostcorrez.mov",
    stills: [],
    description:
      "Short journalistic video pieces for Citynews, covering local businesses and associations.",
    descriptionSections: [
      {
        label: "[ Field Production & Journalism ]",
        body:
          "Short journalistic video pieces for Citynews — the Italian digital news network — covering local businesses, professionals, and associations across the territory.\n\nEach piece integrates interview footage with b-roll of the subject's activity, built into a coherent short-form documentary narrative. The format balances journalistic precision with visual quality: clear storytelling, clean sound design, and a consistent visual language adapted for digital distribution.",
      },
      {
        label: "[ Role ]",
        body:
          "Research & Question Development · Field Production · Interviewing · Shooting · Editing · Delivery\n\nFull end-to-end workflow — from researching the subject and writing interview questions, to on-field shooting and conducting the interview, to post-production and final delivery.",
      },
    ],
  },
];
