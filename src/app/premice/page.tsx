"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const leftStudentQuotes = [
  {
    text: "« L'argent peut très facilement manipuler beaucoup de personnes dans le besoin. »",
  },
  { text: "« Le divertissement n'a plus de réelles limites. »" },
  {
    text: "« L'être humain est prêt aux pires atrocités quand il a beaucoup à gagner. »",
  },
  { text: "« L'argent c'est tout ce qui compte. »" },
  { text: "« Le capitalisme aliène. »" },
  { text: "« L'Homme a le contrôle absolu de ses actions. »" },
];

const rightStudentQuotes = [
  {
    text: "« J'ai arrêté après l'épisode 2 (de la saison 3). Tout s'est effondré. Ils auraient dû s'arrêter à la saison 1. »",
  },
  { text: "« La fin a sali le prestige de la série. »" },
  { text: "« Gi-hun est devenu un meurtrier hypocrite. »" },
  { text: "« Certaines scènes n'ont plus aucun sens moral. »" },
  { text: "« Squid Game est devenu une comédie noire incohérente. »" },
  { text: "« Pour sauver des gens, on en tue d'autres… »" },
  {
    text: "« On parle de démocratie dans un système totalitaire… Ça devient absurde. »",
  },
];

export default function IntroductionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // États pour les citations actuelles
  const [leftQuoteIndex, setLeftQuoteIndex] = useState(0);
  const [rightQuoteIndex, setRightQuoteIndex] = useState(0);
  const leftQuoteRef = useRef<HTMLDivElement>(null);
  const rightQuoteRef = useRef<HTMLDivElement>(null);

  // Gestion du cycle des citations
  useEffect(() => {
    const interval = setInterval(() => {
      // Animation de sortie
      gsap.to([leftQuoteRef.current, rightQuoteRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Changer les indices
          setLeftQuoteIndex((prev) => (prev + 1) % leftStudentQuotes.length);
          setRightQuoteIndex((prev) => (prev + 1) % rightStudentQuotes.length);

          // Animation d'entrée après un court délai
          setTimeout(() => {
            gsap.fromTo(
              [leftQuoteRef.current, rightQuoteRef.current],
              {
                opacity: 0,
                y: 10,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
              }
            );
          }, 100);
        },
      });
    }, 10000); // Toutes les 10 secondes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animation d'entrée de la box
    gsap.fromTo(
      boxRef.current,
      {
        y: 80,
        opacity: 0,
        scale: 0.95,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "power3.out",
        delay: 0.3,
      }
    );

    // Animation du texte à l'intérieur de la box
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        delay: 1,
        onComplete: () => {
          // Quand le texte apparaît, afficher le bouton
          gsap.fromTo(
            buttonRef.current,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              delay: 0.3,
            }
          );
        },
      }
    );

    // Animation des bordures de la box
    const borders = gsap.utils.toArray(".border-element");
    borders.forEach((border: any, i) => {
      gsap.fromTo(
        border,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.5 + i * 0.2,
        }
      );
    });

    // Animation d'entrée des bulles de dialogue
    gsap.fromTo(
      [leftQuoteRef.current, rightQuoteRef.current],
      {
        opacity: 0,
        scale: 0.8,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 1.8,
      }
    );
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Fond avec image floutée */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background/biblio.png"
          alt="Background Library"
          fill
          className="object-cover blur-[2px] scale-110 opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Container principal */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center px-4 md:px-6">
        {/* Photos d'étudiants à gauche et à droite */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-0 pointer-events-none">
          {/* Étudiant de gauche avec bulle de dialogue */}
          <div className="relative w-64 md:w-80 lg:w-[26rem] -ml-4 md:-ml-8 lg:-ml-12">
            {/* Bulle de dialogue au-dessus */}
            <div
              ref={leftQuoteRef}
              className="absolute -top-20 md:-top-24 lg:-top-28 left-[60%] transform -translate-x-1/2 w-64 md:w-72 lg:w-80 bg-[#037a76]/90 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-[#037a76] shadow-xl"
              style={{
                opacity: 0,
              }}
            >
              {/* Pointe de la bulle */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4">
                <div className="w-4 h-4 bg-[#037a76]/90 transform rotate-45 border-r border-b border-[#037a76]" />
              </div>

              {/* Texte de la citation */}
              <p className="text-xs md:text-sm lg:text-base text-white font-light leading-tight text-center">
                {leftStudentQuotes[leftQuoteIndex].text}
              </p>
            </div>

            <Image
              src="/images/etudiants/french.png"
              alt="Student Left"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>

          {/* Étudiant de droite avec bulle de dialogue */}
          <div className="relative w-64 md:w-80 lg:w-[26rem] -mr-4 md:-mr-8 lg:-mr-12">
            {/* Bulle de dialogue au-dessus */}
            <div
              ref={rightQuoteRef}
              className="absolute -top-20 md:-top-24 lg:-top-28 left-[40%] transform -translate-x-1/2 w-64 md:w-72 lg:w-80 bg-[#ff2f6e]/90 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-[#ff2f6e] shadow-xl"
              style={{
                opacity: 0,
              }}
            >
              {/* Pointe de la bulle */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4">
                <div className="w-4 h-4 bg-[#ff2f6e]/90 transform rotate-45 border-r border-b border-[#ff2f6e]" />
              </div>

              {/* Texte de la citation */}
              <p className="text-xs md:text-sm lg:text-base text-white font-light leading-tight text-center">
                {rightStudentQuotes[rightQuoteIndex].text}
              </p>
            </div>

            <Image
              src="/images/etudiants/korean.png"
              alt="Student Right"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>

        {/* Box avec texte scrollable */}
        <div
          ref={boxRef}
          className="relative w-full max-w-3xl h-[70vh] max-h-[600px] opacity-0 mb-8"
        >
          {/* Bordure décorative - Coin supérieur gauche */}
          <div className="border-element absolute -top-4 -left-4 w-8 h-8 border-t border-l border-[#ff2f6e]/30" />

          {/* Bordure décorative - Coin supérieur droit */}
          <div className="border-element absolute -top-4 -right-4 w-8 h-8 border-t border-r border-[#037a76]/30" />

          {/* Bordure décorative - Coin inférieur gauche */}
          <div className="border-element absolute -bottom-4 -left-4 w-8 h-8 border-b border-l border-[#037a76]/30" />

          {/* Bordure décorative - Coin inférieur droit */}
          <div className="border-element absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-[#ff2f6e]/30" />

          {/* Box principale */}
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-black/10 shadow-2xl">
            {/* Image de fond papier */}
            <Image
              src="/images/background/fond-papier-premice.png"
              alt="Paper Background"
              fill
              className="object-cover opacity-90"
              priority
            />

            {/* Contenu textuel scrollable */}
            <div
              ref={textRef}
              className="relative z-10 w-full h-full overflow-y-auto p-6 md:p-10 opacity-0"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#1a1a1a transparent",
              }}
            >
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl leading-relaxed text-black font-medium tracking-wide text-center">
                  Le silence s&apos;installe dans la pièce.
                </p>

                <p className="text-xl md:text-2xl leading-relaxed text-gray-900 font-normal tracking-wide text-center">
                  Deux voix, deux visions du même phénomène, mais une seule
                  certitude : Squid Game ne laisse personne indifférent.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-normal tracking-wide">
                  D&apos;un côté, il y a ceux qui voient la série comme un
                  miroir. Un miroir sale, déformant, mais terriblement honnête.
                  Ils y voient un monde où l&apos;argent écrase tout, où le
                  besoin devient une arme, où les humains cessent d&apos;être
                  libres dès qu&apos;ils sont endettés. Ils parlent de
                  manipulation, de compétition poussée à l&apos;extrême, de
                  moralité qui s&apos;effrite et de liens qui disparaissent.
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-normal tracking-wide">
                  De l&apos;autre côté, une déception profonde. Pour eux, la
                  série s&apos;est trahie. Ce qui était une critique sociale est
                  devenu un spectacle répétitif, une spirale absurde dans lequel
                  même le protagoniste principal perd son sens. Les mêmes mots
                  reviennent sans cesse : « incohérence, hypocrisie, prestige
                  sali. »
                </p>

                <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-normal tracking-wide">
                  Entre admiration et rejet, Squid Game semble avancer comme un
                  géant fatigué. Trop lourd pour continuer, trop grand pour
                  s&apos;arrêter. Ses fans coréens s&apos;y reconnaissaient
                  autrefois… Aujourd&apos;hui ils ne savent plus si la série les
                  représente ou si elle se moque d&apos;eux.
                </p>

                <p className="text-2xl md:text-3xl leading-relaxed text-black font-medium tracking-wide italic text-center mt-8 pt-6 border-t border-black/20">
                  Et au milieu de tout ça, une question persiste : La série
                  critique-t-elle le monde ? Ou se contente-t-elle simplement de
                  jouer avec lui pour attirer le public ?
                </p>
              </div>

              {/* Bouton centré */}
              <div
                ref={buttonRef}
                className="mt-8 pt-6 border-t border-black/20 flex justify-center opacity-0"
              >
                <Link
                  href="/webdoc"
                  className="flex items-center justify-center"
                >
                  <button className="group relative px-10 py-3 text-lg font-bold tracking-widest uppercase text-white cursor-pointer overflow-hidden bg-black hover:bg-gray-900 transition-colors">
                    <span
                      className="glitch group-hover:opacity-0 transition-opacity duration-300"
                      data-text="Commencer"
                    >
                      Commencer
                    </span>

                    <span className="absolute inset-0 border-2 border-transparent group-hover:border-squid-pink transition-colors duration-300"></span>

                    <span className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center bg-squid-pink"></span>

                    <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Commencer
                    </span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Indicateur de scroll */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
              <div className="w-6 h-6 flex justify-center opacity-50">
                <div className="w-1 h-3 bg-black rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer minimal */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
        <div className="max-w-4xl mx-auto text-center text-xs tracking-[0.3em] uppercase text-gray-600">
          <div>Squid Game • Webdocumentaire</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        /* Style personnalisé pour la scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #4a4a4a;
          border-radius: 2px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </main>
  );
}
