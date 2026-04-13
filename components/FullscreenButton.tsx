"use client";

export default function FullscreenButton() {
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const container = (e.currentTarget as HTMLElement).closest("[data-video-container]") as HTMLElement | null;
    const video = container?.querySelector("video") as HTMLVideoElement | null;
    const target = video ?? container;
    if (!target) return;
    if (target.requestFullscreen) {
      await target.requestFullscreen();
      try {
        await (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }).lock?.("landscape");
      } catch {
        // orientation lock not supported (iOS Safari, desktop) — ignore
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(200,16,46,0.3)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.5)"; }}
      style={{
        position: "absolute",
        top: "16px",
        right: "16px",
        zIndex: 10,
        width: "32px",
        height: "32px",
        background: "rgba(0,0,0,0.5)",
        border: "1px solid #C8102E",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#F5F0E8",
        cursor: "none",
        transition: "background 0.2s ease",
      }}
      aria-label="Fullscreen"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" />
      </svg>
    </button>
  );
}
