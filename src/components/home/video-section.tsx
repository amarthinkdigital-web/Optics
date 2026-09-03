"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface VideoShowcaseProps {
  videoUrl?: string;
  posterUrl?: string;
}

export default function VideoSection({
  videoUrl = "/Videos/video.mp4",
  posterUrl = "/images/hero_model.png",
}: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="w-full mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-6 sm:gap-8">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-1.5 text-center px-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
          Cinematic Showcase
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-luxury-black uppercase">
          The Art of Visionary Craft
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-xl text-center font-light">
          Step inside our atelier and experience the meticulous Italian craftsmanship, lens precision, and timeless elegance behind Optics.
        </p>
      </div>

      {/* Video Container */}
      <div className="relative w-full h-[260px] sm:h-[450px] md:h-[520px] rounded-3xl overflow-hidden bg-neutral-900 border border-luxury-gold/30 shadow-2xl group">
        {/* Background Poster Fallback Image */}
        <Image
          src={posterUrl}
          alt="Cinematic Showcase Poster"
          fill
          priority
          className="object-cover z-0 opacity-80"
        />

        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          playsInline
          loop
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 z-10 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-wearing-sunglasses-41544-large.mp4" type="video/mp4" />
        </video>

        {/* Ambient Gradient Overlays */}
        <div
          onClick={togglePlay}
          className={`absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-black/30 transition-opacity duration-500 cursor-pointer ${
            isPlaying ? "opacity-30 hover:opacity-70" : "opacity-90"
          }`}
        />

        {/* Play / Pause Central Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-luxury-gold/90 text-luxury-black backdrop-blur-md shadow-[0_0_40px_rgba(197,168,128,0.6)] transition-all duration-300 transform hover:scale-110 hover:bg-white ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100 scale-100"
          }`}
        >
          {isPlaying ? (
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="w-7 h-7 sm:w-9 sm:h-9 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Bottom Bar Controls & Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-8 flex items-end justify-between pointer-events-none">
          <div className="flex flex-col gap-1 max-w-md pointer-events-auto">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-luxury-gold">
              OPTICS ATELIER
            </span>
            <h3 className="font-display text-base sm:text-xl font-bold text-white tracking-wide">
              Handcrafted Perfection
            </h3>
          </div>

          <div className="flex items-center gap-3 pointer-events-auto">
            {/* Sound Toggle */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-luxury-gold hover:text-luxury-black hover:border-luxury-gold transition-all duration-300 shadow-md"
            >
              {isMuted ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


