import { VIDEO_URLS } from "./videos";

export interface Film {
  slug: string;
  title: string;
  year: number;
  genre: string;
  duration?: string;
  role: string;
  camera?: string;
  production: string;
  distribution?: string;
  location?: string;
  noTrailer?: boolean;
  trailer?: string;          // path to video file in /public
  poster: string;            // path to poster image in /public
  stills: string[];          // paths to still images in /public
  synopsis: string;
  pullQuote?: string | string[];
  productionNote?: string;
  credits: Record<string, string>;
  cast?: Record<string, string>;
  festivalsNote?: string;
  status?: string;           // short status label for list page
  watchUrl?: string;         // YouTube or external watch link
  watchLabel?: string;       // e.g. "Watch on YouTube →"
}

export const films: Film[] = [
  {
    slug: "xvi-barre",
    title: "XVI Barre",
    year: 2022,
    genre: "Musical",
    duration: "10'",
    role: "Director · Screenwriter · Producer",
    camera: "Blackmagic Pocket 6K",
    production: "Independent",
    distribution: "Clerks Distribution",
    status: "\u2605 7 awards \u2014 10 international festivals",
    trailer: VIDEO_URLS.xviBarre || "/projects/xvi-barre/trailer.mp4",
    poster: "/projects/xvi-barre/poster.png",
    stills: [
      "/projects/xvi-barre/stills/still-1.png",
      "/projects/xvi-barre/stills/still-2.png",
      "/projects/xvi-barre/stills/still-3.png",
      "/projects/xvi-barre/stills/still-4.png",
      "/projects/xvi-barre/stills/still-5.png",
    ],
    synopsis:
      "A bipolar Hip-Hop artist is imprisoned by his rationality in a hallucinated and apathetic reality that prevents him from standing out. His attempt at expression through rap is crushed by the glacial vision of a party anchored to nihilism and self-pity, seasoned with the rejection of truth expressed through drugs and alcohol. But the light of enthusiasm does not go out — and the life that seems to transport the protagonist into the oblivion of passion is contrasted with art, divided into sixteen reasons for existing. Man reminds himself of his identity and stands out, in his inner theatre, with scratches. The two sides meet: the conflict becomes tangible with rap and beat-box, performed by their respective psychological rifts, which reconcile in the artist's newfound identity. Conflict breeds creation. But realization is utopia — and after the peak of enthusiasm, we return to pain to create again: the infinite circle.",
    pullQuote:
      "\u201cWhose sons are we, professor? Probably of the obituary of history.\u201d",
    credits: {
      "Director & Screenwriter": "Alberto Nicco",
      Performer: "Michelangelo Morabito",
      DOP: "Luigi Risi",
      Composer: "Ludovico Borrini",
      "Sound Designer": "Ismaele Rodella",
      Editor: "Lorenzo Renna",
    },
    festivalsNote: "Selected at 10 international film festivals. 7 awards.",
    watchUrl: "https://youtu.be/ZAz9mnVB3JM",
    watchLabel: "Watch on YouTube →",
  },
  {
    slug: "jouhatsu",
    title: "Jouhatsu",
    year: 2024,
    genre: "Noir / Drama",
    duration: "20'",
    role: "Director · Screenwriter · Producer",
    camera: "Blackmagic URSA Mini Pro 12K",
    production: "Independent (crowdfunded)",
    status: "Currently in distribution",
    trailer: VIDEO_URLS.jouhatsu || "/projects/jouhatsu/trailer.mov",
    poster: "/projects/jouhatsu/poster.png",
    stills: [
      "/projects/jouhatsu/stills/still-1.jpg",
      "/projects/jouhatsu/stills/still-2.jpg",
      "/projects/jouhatsu/stills/still-3.jpg",
      "/projects/jouhatsu/stills/still-4.jpg",
      "/projects/jouhatsu/stills/still-5.jpg",
    ],
    synopsis:
      'A 24-year-old hikikomori lives alone, estranged from the rest of the world, inside a filthy shed. A non-life that propagates in the eternity and monotony of his days spent between nihilism and poker tournaments. The only human opening, the only voice the protagonist hears is that of a painter and content creator, Riccardo, through his video content \u2014 insane and anguished. Riccardo\u2019s sudden disappearance and the encounter with a mysterious child force \u201cNobody\u201d to embark on a morbid and disturbing journey through the painter\u2019s works. An odyssey that will lead the protagonist to come to terms with himself and his own life.',
    pullQuote:
      "\u201cMan is nothing but a castaway. We are born with a raft, a sentence. As a child you turn around and see the sea \u2014 in all directions. And you see everything... except the sea. Then, at some point, the waves rise. They crash on your little raft. You crash. You get up, and you see that the sea is the same in all directions. And that will never change.\u201d",
    credits: {
      "Director & Screenwriter": "Alberto Nicco",
      DOP: "Luigi Risi",
      "Set Design": "Karen Giusto",
      "Sound Designer": "Luca Bagetto",
      Composer: "Lorenzo Dell\u2019Anna",
      Editor: "Lorenzo Renna",
    },
    cast: {
      Nobody: "Isacco Salvi",
      Riccardo: "Marco Cevoli",
      "The Child": "Lorenzo Troni",
    },
    watchUrl: "https://youtu.be/a_agT9UwD-4",
    watchLabel: "Watch on YouTube →",
  },
  {
    slug: "the-border",
    title: "The Border",
    year: 2025,
    genre: "Documentary",
    role: "Director · Editor",
    production: "Looking China 2025",
    location: "Guangxi, China \u2014 Vietnam border",
    noTrailer: true,
    status: "Currently in distribution",
    poster: "/projects/the-border/poster.jpg",
    stills: Array.from({ length: 13 }, (_, i) => `/projects/the-border/stills/still-${i + 1}.jpg`),
    synopsis:
      "A documentary about life in the border community between China and Vietnam, filmed along the crossing between Dongxing and Mong Cai. Produced as part of the international Looking China 2025 program.\n\nEvery morning Ngô Thị Thuỳ leaves Móng Cái, Vietnam, and crosses the Beilun Bridge to reach Dongxing, China, where she runs a specialty food store. The Border talks about her daily life and that of those who live suspended between two countries, two economies and two cultures.",
    productionNote: "Shot and edited entirely on location in 8 days.",
    credits: {
      "Director & Editor": "Alberto Nicco",
      Program: "Looking China 2025",
    },
    watchUrl: "https://youtu.be/2SykXNjQxQ0",
    watchLabel: "Watch on YouTube →",
  },
  {
    slug: "eclipse",
    title: "Eclipse",
    year: 2025,
    genre: "Science Fiction",
    role: "Director · Screenwriter · Producer",
    production: "Independent \u2014 Politecnico di Torino",
    status: "Currently in post-production",
    trailer: VIDEO_URLS.eclipse || "/projects/eclipse/CarrelloLaterale.mp4",
    poster: "/projects/eclipse/poster.jpg",
    stills: [
      "/projects/eclipse/stills/still-1.jpg",
      "/projects/eclipse/stills/still-2.png",
      "/projects/eclipse/stills/still-3.png",
      "/projects/eclipse/stills/still-4.png",
      "/projects/eclipse/stills/still-5.png",
      "/projects/eclipse/stills/still-6.png",
      "/projects/eclipse/stills/still-7.png",
      "/projects/eclipse/stills/still-8.png",
      "/projects/eclipse/stills/still-9.png",
      "/projects/eclipse/stills/still-10.png",
    ],
    synopsis:
      "In an unidentified future, the sun has been blacked out by man in order to survive global warming. A photographer wanders the black-and-white world looking for what remains of the human soul, photographing the dead. In this unlivable reality, the man shoots and accidentally sees a woman. Their encounter will lead her into the cold, morbid eye of the protagonist\u2019s suicide photos until she becomes obsessed and chooses to die with him. But one last photo could change a sealed fate.",
    pullQuote: [
      "\u201cI\u2019ve been searching all my life. I look into the eyes of the dead.\u201d",
      "\u201cWhat lingers in the eyes of the dead?\u201d",
    ],
    productionNote:
      "Master\u2019s thesis \u2014 Politecnico di Torino. Co-directed with Andrea D\u2019Eredit\u00e0.",
    credits: {
      "Directors & Screenwriters": "Andrea D\u2019Eredit\u00e0 & Alberto Nicco",
      "DOP": "Francesco Malatesta",
      "Costume Designer": "Alessia Sibilla",
      "Scenography": "Federica Cito, Davide Gabriele",
      "Composer & Sound Designer": "Ismaele Rodella",
      "Editor": "Lorenzo Renna",
    },
  },
];
