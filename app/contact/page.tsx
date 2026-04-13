import ContactLinks from "@/components/ContactLinks";

export const metadata = {
  title: "Contact — Alberto Nicco",
  description: "Available for filmmaking, documentary, wedding films, and video content.",
};

export default function ContactPage() {
  return (
    <div
      className="min-h-[100dvh] pt-[73px] py-16 md:py-24 px-6 md:px-14"
      style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
    >
      {/* Large Cormorant title */}
      <h1
        className="font-serif font-light text-fg mb-10"
        style={{
          fontSize: "clamp(3rem, 6vw, 72px)",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        Let&apos;s work together.
      </h1>

      {/* Opening paragraph */}
      <p
        className="font-serif font-light text-fg mb-12"
        style={{ fontSize: "20px", lineHeight: 1.9, maxWidth: "600px", margin: "0 auto 3rem", textAlign: "center" }}
      >
        Every project starts with a conversation. Whether you&apos;re looking for a director who
        brings a cinematic eye to your story, a videomaker to document a day that won&apos;t happen
        twice, or an editor who understands that the cut is where meaning is made — I&apos;m here.
        <br /><br />
        I work across narrative cinema, documentary, wedding films, journalistic video, and
        post-production. Based in Turin, available for travel. I bring the same attention to
        craft whether I&apos;m on set or in the edit suite.
        <br /><br />
        Feel free to reach out — I respond to every message.
      </p>

      {/* Thin separator — full width */}
      <div style={{ borderTop: "1px solid #1A1A1A", width: "100%", marginBottom: "3rem" }} />

      {/* Contact items — client component for hover state */}
      <ContactLinks />

      {/* Location */}
      <p className="meta mt-12" style={{ color: "#444" }}>
        Turin, Italy
      </p>
    </div>
  );
}
