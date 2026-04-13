"use client";

const contacts = [
  { tag: "[ Email ]",     label: "albertonicco5@gmail.com", href: "mailto:albertonicco5@gmail.com" },
  { tag: "[ Phone ]",     label: "+39 391 491 5298",         href: "tel:+393914915298" },
  { tag: "[ LinkedIn ]",  label: "Alberto Nicco",             href: "https://linkedin.com" },
  { tag: "[ Instagram ]", label: "@albertonicco",             href: "https://instagram.com" },
];

export default function ContactLinks() {
  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      {contacts.map((c, i) => (
        <div
          key={i}
          className="border-b py-6"
          style={{ borderColor: "#1A1A1A", textAlign: "center" }}
        >
          <p
            className="meta mb-2"
            style={{ fontSize: "10px", letterSpacing: "0.12em", color: "#444", textAlign: "center" }}
          >
            {c.tag}
          </p>
          <a
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-serif font-light"
            style={{
              fontSize: "28px",
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
              color: "#F5F0E8",
              display: "block",
              textAlign: "center",
              transition: "color 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8102E"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#F5F0E8"; }}
            onMouseDown={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#E8005A"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C8102E"; }}
          >
            {c.label}
          </a>
        </div>
      ))}
    </div>
  );
}
