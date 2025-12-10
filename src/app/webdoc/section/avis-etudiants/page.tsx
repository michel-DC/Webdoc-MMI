"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AvisEtudiantsPage() {
  return (
    <main className="relative w-full min-h-screen text-gray-200 overflow-x-hidden flex flex-col items-center justify-center mt-16">
      {/* Fond avec image floutée */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background/fond-ecole.jpeg"
          alt="Background Bibliothèque"
          fill
          className="object-cover"
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
              Avis Étudiants
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
            SQUID GAME
            <br />
            <span className="text-2xl md:text-4xl font-light tracking-wider text-gray-300">
              ET L&apos;AVIS DES ÉTUDIANTS
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Découvrez ce que les étudiants pensent de la série et des thèmes
            qu&apos;elle aborde à travers leurs témoignages.
          </p>
        </header>

        {/* Video Player */}
        <div className="w-full max-w-7xl mx-auto bg-black/50 rounded-lg shadow-2xl overflow-hidden border border-gray-700 mb-24">
          <video
            className="w-full h-auto"
            controls
            autoPlay
            preload="auto"
            playsInline
            loop
          >
            <source src="/videos/video-interview.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-xs tracking-[0.2em] uppercase text-gray-500">
          <div>Squid Game • Webdoc</div>
          <div>Avis des Étudiants</div>
        </div>
      </div>
    </main>
  );
}
