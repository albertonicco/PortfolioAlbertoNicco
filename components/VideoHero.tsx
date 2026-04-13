"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import FullscreenButton from "./FullscreenButton";

interface VideoHeroProps {
  src?: string;
  poster: string;
  title: string;
  noTrailer?: boolean;
}

export default function VideoHero({ src, poster, title, noTrailer }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {/* autoplay blocked — fine */});
  }, []);

  // No trailer — static poster hero
  if (noTrailer || !src) {
    return (
      <div
        data-video-container
        className="relative w-full skeleton"
        style={{ height: "70vh" }}
      >
        <Image
          src={poster}
          alt={title}
          fill
          quality={100}
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 50%)" }}
        />
        <FullscreenButton />
      </div>
    );
  }

  return (
    <div
      data-video-container
      className="relative w-full bg-black"
      style={{ height: "70vh" }}
    >
      {/* Skeleton until video loads */}
      {!videoLoaded && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}

      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}
        onCanPlay={() => setVideoLoaded(true)}
        aria-label={`${title} — trailer`}
      />

      <FullscreenButton />
    </div>
  );
}
