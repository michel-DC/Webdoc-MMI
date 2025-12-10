"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import SquidGameIntro from "@/components/SquidGameIntro";

// CONSTANTS (Magic Numbers & Configuration)
const ANIMATION_CONFIG = {
  HERO: {
    Y_START: 50,
    DURATION: 1,
    STAGGER: 0.2,
    DELAY: 0.2,
  },
  EXIT: {
    DURATION: 0.5,
    Y_EXIT: -50,
  },
  VIDEO: {
    SCALE_START: 1.1,
    DURATION: 1.5,
  },
};

export default function Home() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);
  const [videoVisible, setVideoVisible] = useState(false);

  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // Animation duration is about 4s
    return () => clearTimeout(timer);
  }, []);



  useLayoutEffect(() => {
    if (showIntro) return;
    const ctx = gsap.context(() => {
      // Hero animation for text content
      gsap.from(".hero-element", {
        y: ANIMATION_CONFIG.HERO.Y_START,
        opacity: 0,
        duration: ANIMATION_CONFIG.HERO.DURATION,
        stagger: ANIMATION_CONFIG.HERO.STAGGER,
        ease: "power3.out",
        delay: ANIMATION_CONFIG.HERO.DELAY,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [showIntro]);

  const handleStart = () => {
    const tl = gsap.timeline({
      onComplete: () => setVideoVisible(true),
    });
    // Animate out the entire content section
    tl.to(contentRef.current, {
      opacity: 0,
      duration: ANIMATION_CONFIG.EXIT.DURATION,
      ease: "power2.in",
    });
  };

  const handleChangePage = () => {
    window.location.href = "/webdoc";
  };

  const handleReturn = () => {
    const tl = gsap.timeline({
      onComplete: () => setVideoVisible(false),
    });
    // Animate out the video layer
    tl.to(videoRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    });
    // Animate in the main content
    gsap.to(contentRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  };

  useLayoutEffect(() => {
    if (videoVisible) {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: ANIMATION_CONFIG.VIDEO.SCALE_START },
        {
          opacity: 1,
          scale: 1,
          duration: ANIMATION_CONFIG.VIDEO.DURATION,
          ease: "power2.out",
        }
      );
    }
  }, [videoVisible]);

  if (showIntro) {
    return <SquidGameIntro />;
  }

  return (
    <>
      <main
        ref={containerRef}
        className="relative w-full h-screen text-white overflow-hidden font-mono p-8 md:p-12"
      >
        {/* Background audio */}




        <div className="noise-effect"></div>

        {/* --- Main Content --- */}
        {!videoVisible && (
          <div
            ref={contentRef}
            className="w-full h-full flex flex-col items-center justify-center text-center p-4"
          >
            <div className="flex flex-col gap-8 items-center">
              <h1
                className="hero-element glitch font-title text-6xl md:text-8xl font-bold tracking-tight"
                data-text="BIENVENUE"
              >
                BIENVENUE
              </h1>
              <p className="hero-element text-xl md:text-2xl tracking-wide uppercase font-title text-gray-300 max-w-lg">
                Préparez-vous à plonger dans une expérience immersive.
              </p>

              <div className="hero-element mt-6">
                <button
                  onClick={handleStart}
                  className="group relative px-10 py-3 text-lg font-bold tracking-widest uppercase text-white cursor-pointer overflow-hidden"
                >
                  {/* Text with glitch effect (disappears on hover) - This sets the button size */}
                  <span
                    className="glitch group-hover:opacity-0 transition-opacity duration-300"
                    data-text="Commencer"
                  >
                    Commencer
                  </span>

                  {/* Border element */}
                  <span className="absolute inset-0 border-2 border-white group-hover:border-squid-pink transition-colors duration-300"></span>

                  {/* Background fill animation */}
                  <span className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-squid-pink"></span>

                  {/* Clean text (appears on hover) */}
                  <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Commencer
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Video Layer --- */}
        {videoVisible && (
          <div
            ref={videoRef}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/landing/squid-game.webp')",
            }}
          >
            <video
              className="max-w-8xl max-h-[80vh] w-auto h-auto object-contain rounded-md shadow-lg"
              src="/videos/fin-sg.mp4"
              autoPlay
              controls={false}
              playsInline
            >
              Votre navigateur ne supporte pas la vidéo.
            </video>
            <button
              onClick={handleReturn}
              className="absolute top-4 right-4 z-30 rounded-md bg-black rounded-full px-4 py-2 text-sm text-white/70 transition-all hover:bg-black/40 hover:text-white md:top-6 md:right-6"
            >
              RETOUR
            </button>
            <Link
              href="/premice"
              className="absolute top-4 left-4 z-30 rounded-md bg-black rounded-full px-4 py-2 text-sm text-white/70 transition-all hover:bg-black/40 hover:text-white md:top-6 md:left-6"
            >
              PASSER L&apos;INTRO
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
