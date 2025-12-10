"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type Message = {
  id: number;
  speaker: string;
  role: string;
  side: "left" | "right";
  text: string;
};

const DIALOGUE: Message[] = [
  {
    id: 1,
    speaker: "JD",
    role: "Professeur",
    side: "right",
    text: `On intellectualise beaucoup cette série, mais on oublie une réalité beaucoup plus terre-à-terre et inquiétante. Cette violence n'est pas restée confinée sur Netflix, elle a franchi les grilles de nos écoles.`,
  },
  {
    id: 2,
    speaker: "JG",
    role: "Professeur",
    side: "left",
    text: `C'est le piège de la viralité numérique. Même si la série est interdite aux moins de 16 ans, les extraits inondent TikTok. Les enfants ne voient pas la critique sociale dont on parlait, ils ne retiennent que la mécanique brutale du jeu.`,
  },
  {
    id: 3,
    speaker: "JD",
    role: "Professeur",
    side: "right",
    text: `Et ils la reproduisent. Ce qui se passe en ce moment en Belgique ou en France, ce n'est plus du jeu, c'est une excuse afin d'être brutal. Le "1, 2, 3 Soleil" est devenu un prétexte pour frapper le camarade qui bouge.`,
  },
  {
    id: 4,
    speaker: "JG",
    role: "Professeur",
    side: "left",
    text: `Sur ce point, le constat est effectivement alarmant. La barrière de sécurité entre une fiction dystopique et la cour de récréation a sauté.`,
  },
];

export default function OriginsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animation des messages avec ScrollTrigger
  useEffect(() => {
    messagesRef.current.forEach((message, index) => {
      if (!message) return;

      const side = message.dataset.side;
      const direction = side === "left" ? -1 : 1;

      // Animation d'entrée avec effet de vague
      gsap.fromTo(
        message,
        {
          y: 50,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: message,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen text-gray-200 overflow-x-hidden"
    >
      {/* Fond avec image floutée */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background/fond-plateau-tele.png"
          alt="Background TV Studio"
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
              Dialogue
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
              UNE VIOLENCE QUI DETEINT SUR LES ENFANTS
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Un duel idéologique entre deux lectures
            <br />
            du phénomène Squid Game
          </p>
        </header>

        {/* Dialogue avec bulles centrées */}
        <div className="space-y-12 py-12">
          {DIALOGUE.map((msg, index) => (
            <div
              key={msg.id}
              ref={(el) => {
                messagesRef.current[index] = el;
              }}
              className={`message-container flex ${
                msg.side === "left" ? "justify-start" : "justify-end"
              }`}
              data-side={msg.side}
            >
              <div
                className={`max-w-xl ${
                  msg.side === "left" ? "mr-auto" : "ml-auto"
                }`}
              >
                {/* En-tête */}
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <div className="font-semibold text-gray-100">
                      {msg.role}
                    </div>
                  </div>
                </div>

                {/* Bulle de conversation */}
                <div className="relative">
                  {/* Flèche de la bulle */}
                  <div
                    className={`absolute top-0 w-4 h-4 transform rotate-45 ${
                      msg.side === "left"
                        ? "-left-2 bg-white"
                        : "-right-2 bg-white"
                    }`}
                  />

                  {/* Contenu de la bulle */}
                  <div
                    className={`rounded-2xl p-6 flex items-start gap-4 ${
                      msg.side === "left"
                        ? "bg-white border-l-4 border-red-500"
                        : "bg-white border-l-4 border-blue-500"
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          msg.side === "left"
                            ? "/images/professeurs/professeur-femme.png"
                            : "/images/professeurs/professeur-homme.png"
                        }
                        alt={msg.speaker}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      {msg.text.split("\n\n").map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className="text-gray-800 leading-relaxed font-light"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Indicateur de progression */}
                <div
                  className={`mt-4 flex ${
                    msg.side === "left" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div className="text-xs tracking-wider text-gray-500 uppercase">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(DIALOGUE.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative p-10 mb-16 bg-white/10 backdrop-blur-xl rounded-xl border border-gray-600 shadow-xl text-left">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            L&apos;Impact Social : La Violence dans les Cours de Récréation
          </h3>
          <p className="text-gray-200 mb-6 leading-relaxed">
            La viralité de Squid Game ne s&apos;est pas arrêtée aux écrans des
            adultes, elle a franchi les grilles des écoles, provoquant une
            inquiétude. Bien que la série soit formellement interdite aux moins
            de 16 ans, de nombreux enfants ont accédé aux extraits violents via
            TikTok ou YouTube, reproduisant les jeux avec une brutalité
            mimétique.
          </p>
          <p className="text-gray-200 mb-6 leading-relaxed">
            L&apos;alerte la plus marquante nous vient de Belgique, rapportée
            par Europe 1. À l&apos;école communale d&apos;Erquelinnes-Centre, le
            jeu innocent de &quot;1, 2, 3 Soleil&quot; a muté pour devenir un
            rituel de passage à tabac. La direction de l&apos;établissement a dû
            publier un message d&apos;urgence sur Facebook après avoir découvert
            que les élèves recréaient la scène d&apos;ouverture de la série.
            Dans cette version scolaire, l&apos;élimination n&apos;est pas
            symbolique, les perdants au lieu d&apos;être tués étaient
            physiquement frappés par leurs camarades, transformant la récréation
            en zone de conflit corporel. L&apos;école a dû imposer des sanctions
            disciplinaires pour arrêter ces jeux malsains et dangereux pour les
            enfants, rappelant aux parents que la surveillance des contenus est
            la première ligne de défense.
          </p>
          <p className="text-gray-200 mb-6 leading-relaxed">
            Cette contagion n&apos;a pas épargné la France. Comme le confirme
            France Info, le phénomène s&apos;est rapidement propagé dans
            l&apos;Hexagone. L&apos;article rapporte que les règles
            traditionnelles sont détournées : perdre à &quot;1, 2, 3
            Soleil&quot; signifie désormais subir une violence physique
            immédiate, comme des coups de cordon ou des balayettes. Face à cette
            banalisation de la brutalité, le ministère de l&apos;Éducation
            nationale a dû appeler les directeurs d&apos;école et les parents à
            une vigilance accrue, soulignant que la frontière entre la fiction
            dystopique et la réalité de l&apos;enfance était dangereusement
            devenue floue.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="https://www.europe1.fr/societe/squid-game-une-ecole-belge-alerte-on-des-jeux-violents-inspires-de-la-serie-4073427"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 border border-blue-500 rounded-full text-blue-300 hover:bg-blue-500 hover:text-white transition-colors duration-300"
            >
              <span className="text-sm font-medium">Europe 1</span>
              <span className="text-xs">↗</span>
            </Link>
            <Link
              href="https://www.francetvinfo.fr/culture/series/squid-game-la-serie-coreenne-dystopique-et-sanglante-fait-un-carton-mondial-sur-netflix-et-inquiete-les-parents_4799615.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 border border-red-500 rounded-full text-red-300 hover:bg-red-500 hover:text-white transition-colors duration-300"
            >
              <span className="text-sm font-medium">France Info</span>
              <span className="text-xs">↗</span>
            </Link>
          </div>
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
              La Satire des VIPs
            </div>
          </div>

          <Link
            href="/webdoc"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-gray-700 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            <span className="text-sm tracking-[0.2em] uppercase">
              RETOUR SUR LA CARTE MENTALE
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

      {/* Images en bas */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0">
        {/* Image bas gauche */}
        <div className="absolute bottom-0 left-0 w-1/2 max-w-lg">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/professeurs/professeur-femme.png"
              alt="Professeur de gauche"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
          </div>
        </div>

        {/* Image bas droite */}
        <div className="absolute bottom-0 right-0 w-1/2 max-w-lg">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/professeurs/professeur-homme.png"
              alt="Professeur de droite"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-xs tracking-[0.2em] uppercase text-gray-500">
          <div>Squid Game • Webdoc</div>
          <div>DANGEREUX POUR LES ENFANTS</div>
        </div>
      </div>

      {/* Lignes décoratives subtiles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Ligne verticale centrale (guide pour les bulles) */}
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
