"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function AvisInternautePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Animation pour le bloc de contenu
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen text-gray-200 overflow-x-hidden"
    >
      {/* Fond avec image floutée */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background/fond-internet.avif"
          alt="Background"
          fill
          className="object-cover blur-[7px] scale-110"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/webdoc"
            className="group relative text-gray-300 hover:text-white transition-colors duration-300 text-sm tracking-[0.1em] uppercase flex items-center gap-3"
          >
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 border border-gray-600 rounded-full group-hover:border-white transition-all duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                ←
              </span>
            </div>
            <span className="relative">
              Retour
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-white" />
            <div className="text-xs tracking-[0.2em] uppercase text-gray-400">
              Point de vue
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <header className="mb-20 md:mb-28 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
            SQUID GAME
            <br />
            <span className="text-2xl md:text-4xl font-light tracking-wider text-gray-300">
              UNE ŒUVRE IDÉOLOGIQUEMENT AMBIGUË ?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Un point de vue d&apos;internaute sur le message de la série.
          </p>
        </header>

        {/* Bloc de contenu */}
        <div
          ref={contentRef}
          className="relative p-10 mb-16 bg-white/10 backdrop-blur-xl rounded-xl border border-gray-600 shadow-xl text-left"
        >
          <p className="text-gray-200 leading-relaxed text-lg font-light">
            “La série a un positionnement idéologique extrêmement ambigu et
            dérangeant : certains y lisent une sorte de critique du capitalisme
            et des élites décadentes, ou une remise en cause de nos codes moraux
            en tant qu&apos;humains. Premièrement, n&apos;oublions pas que
            c&apos;est bien une série originale Netflix, donc il convient de
            s&apos;interroger sur le messager. Ces séries sont avant tout
            produites pour satisfaire la demande commerciale d&apos;un public
            (souvent en observant des algorithmes et des récurrences dans les
            succès du catalogue) plutôt que pour réellement transmettre des
            idées philosophiques.”
          </p>
        </div>

        {/* Séparateur */}
        <div className="separator-line mt-20 mb-16">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </div>

        {/* Navigation suivante */}
        <div className="next-section-button text-center">
          <div className="mb-6">
            <div className="text-sm tracking-[0.2em] text-gray-400 uppercase mb-2">
              Prochain chapitre
            </div>
            <div className="text-xl font-light text-gray-100">
              Une Critique du Capitalisme ?
            </div>
          </div>

          <Link
            href="/webdoc/section/critique-capitalisme"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-gray-700 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            <span className="text-sm tracking-[0.2em] uppercase">
              Continuer l&apos;exploration
            </span>
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 border border-gray-600 rounded-full group-hover:border-white transition-all duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-sm">
                →
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-xs tracking-[0.2em] uppercase text-gray-500">
          <div>Squid Game • Webdoc</div>
          <div>AVIS D&apos;UN INTERNAUTE</div>
        </div>
      </div>

      {/* Lignes décoratives subtiles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ligne verticale centrale */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-100 to-transparent" />

        {/* Points décoratifs */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gray-100"
            style={{
              width: "2px",
              height: "2px",
              left: `${(i * 7) % 100}%`,
              top: `${10 + ((i * 6) % 80)}%`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </main>
  );
}
