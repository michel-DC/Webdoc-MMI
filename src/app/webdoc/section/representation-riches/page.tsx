"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type ContentBlock = {
  id: number;
  title: string;
  paragraphs: string[];
  links?: { url: string; text: string }[];
};

const CONTENT: ContentBlock[] = [
  {
    id: 1,
    title: "Quand la fiction reflète les fractures sociales",
    paragraphs: [
      "Dans la série, les VIPs représentent une élite invisible et impitoyable. Ils regardent le destin des participants comme un jeu, détachés de toute conséquence morale. Cette figure extrême illustre une vérité sociale plus subtile. Dans de nombreuses sociétés, la richesse confère un privilège réel, protection contre les risques économiques, influence sur les décisions, liberté face aux contraintes qui pèsent sur les plus modestes.",
      "En Corée du Sud, cette fracture est rendue visible par l’expression populaire « cuillère en or / cuillère en terre ». Les “cuillères en or” héritent d’un capital familial qui leur ouvre des portes de part leur richesse, tandis que les “cuillères en terre” commencent la vie avec un handicap social et financier durable. Dans cette logique, les participants de Squid Game représentent ces jeunes “cuillères en terre” confrontés à un système où l’effort personnel ne suffit plus pour s’en sortir.",
      "Le contraste est frappant dans la série, les VIPs sont des caricatures mais leur comportement rappelle de façon symbolique les effets d’avoir un privilège dans la vraie vie. L’argent transforme le monde des riches en un terrain de pouvoir et de spectacle, tandis que les pauvres restent soumis aux règles et aux contraintes qu’ils ne peuvent contrôler.",
    ],
  },
  {
    id: 2,
    title: "Une métaphore puissante pour le public",
    paragraphs: [
      "Pour le spectateur, le parallèle est saisissant. Les VIPs incarnent ce que beaucoup ressentent face aux élites économiques, un pouvoir détaché de la vie quotidienne, un contrôle sur les destins des autres, une capacité à jouer avec l’existence des plus vulnérables. Cette représentation dramatique extrême et volontairement choquante transforme Squid Game en miroir social : le spectacle devient critique, la fiction devient une métaphore.",
      "Même si la série exagère pour frapper l’imaginaire, elle permet de réfléchir sur la relation entre richesse, pouvoir et responsabilité. Elle illustre comment dans un système inégalitaire les plus riches peuvent décider des règles du jeu, tandis que les moins favorisés n’ont souvent d’autre choix que de jouer selon ces règles parfois au péril de leur vie.",
    ],
  },
  {
    id: 3,
    title: "Conclusion",
    paragraphs: [
      "Les VIPs de Squid Game ne sont pas seulement des antagonistes spectaculaires, ils symbolisent de façon extrême les privilèges et la déconnexion des élites dans la vie réelle. La série montre sous forme de parabole que richesse et pouvoir peuvent créer des disparités morales et sociales profondes, et que pour beaucoup, le destin n’est pas une question de mérite mais de naissance.",
    ],
  },
  {
    id: 4,
    title: "Sources utilisés:",
    paragraphs: [],
    links: [
      {
        url: "https://en.wikipedia.org/wiki/Spoon_class_theory",
        text: "Spoon class theory - Wikipedia",
      },
      {
        url: "https://issues.digitalpatmos.com/vol6issue2/article-2-capitalism-and-class-inequality-in-netflixs-squid-game",
        text: "Capitalism and Class Inequality in Netflix’s Squid Game",
      },
    ],
  },
];

export default function RepresentationRichesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentBlocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    contentBlocksRef.current.forEach((block, index) => {
      if (!block) return;

      const isLeft = index % 2 === 0;

      gsap.fromTo(
        block,
        {
          opacity: 0,
          x: isLeft ? -100 : 100,
          rotation: isLeft ? -4 : 4,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen text-gray-200 overflow-x-hidden bg-black"
    >
      {/* Fond avec image floutée */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background/fond-plateau-tele.png"
          alt="Background VIP lounge"
          fill
          className="object-cover blur-[7px] scale-110 opacity-70"
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
              VIPs
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <header className="mb-20 md:mb-28 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
            SQUID GAME
            <br />
            <span className="text-2xl md:text-4xl font-light tracking-wider text-gray-300">
              LES VIPS : MIROIR DES RICHES ?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Les VIPs, ces spectateurs ultra-riches qui parient sur la vie des
            participants, incarnent un pouvoir absolu et détaché de toute
            empathie, faisant écho à des fractures sociales bien réelles.
          </p>
        </header>

        {/* Content Blocks */}
        <div className="space-y-12">
          {CONTENT.map((block, index) => (
            <div
              key={block.id}
              ref={(el) => {
                contentBlocksRef.current[index] = el;
              }}
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="max-w-2xl">
                <div className="relative p-8 md:p-10 bg-white/5 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-2xl shadow-black/20">
                  <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
                    {block.title}
                  </h3>
                  <div className="space-y-6 text-gray-300 leading-relaxed font-light text-base md:text-lg">
                    {block.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {block.links && (
                      <div className="flex flex-col items-start gap-4 mt-6 pt-6 border-t border-gray-700/50">
                        {block.links.map((link) => (
                          <Link
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:underline hover:text-blue-300 transition-colors"
                          >
                            {link.text} ↗
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
              Danger pour les Enfants
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
        <div className="absolute bottom-0 left-0 w-1/2 max-w-lg">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/vip/vip-1.png"
              alt="Journaliste de gauche"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-1/2 max-w-lg">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/vip/vip-2.png"
              alt="Journaliste de droite"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-xs tracking-[0.2em] uppercase text-gray-500">
          <div>Squid Game • Webdoc</div>
          <div>Les VIPs</div>
        </div>
      </div>
    </main>
  );
}
