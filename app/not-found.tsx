import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] pt-[73px] flex flex-col justify-center px-6 md:px-10">
      <p className="meta mb-6">[ 404 ]</p>
      <h1
        className="font-serif font-light text-fg"
        style={{
          fontSize: "clamp(5rem, 18vw, 18rem)",
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
        }}
      >
        Not<br />Found.
      </h1>
      <div className="mt-10 w-8 h-px bg-accent" />
      <Link href="/" className="meta hover-magenta mt-8 inline-block">
        &larr; Return home
      </Link>
    </div>
  );
}
