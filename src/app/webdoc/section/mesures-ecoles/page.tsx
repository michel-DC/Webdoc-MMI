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
    title: "La stratégie du Ministère : ne pas faire de publicité",
    paragraphs: [
      "Face à la multiplication des incidents, la première réaction de l'État a été paradoxale : agir, mais sans trop en dire. Au Ministère de l’Éducation nationale, la ligne fixée par Jean-Michel Blanquer était claire : éviter la « sur-médiatisation ». Créer une circulaire spécifique « Squid Game » risquait de donner encore plus de visibilité à la série auprès des élèves.",
      "Le ministère a donc opté pour une stratégie de « dilution contextuelle ». Plutôt que de traiter la série comme un cas à part, les incidents ont été intégrés aux protocoles existants de lutte contre les « jeux dangereux » (comme le jeu du foulard) et le harcèlement.",
      "L'objectif politique était aussi de déplacer la responsabilité. En liant le phénomène aux dangers d'Internet, le Ministère a renvoyé la balle dans le camp des familles : l'école gère la violence, mais c'est à la maison que se joue l'exposition aux écrans.",
    ],
  },
  {
    id: 2,
    title: "Sur le terrain : de la sanction à la prévention santé",
    paragraphs: [
      "Loin des bureaux du ministère, les établissements et les mairies ont dû gérer l'urgence. Les réponses ont varié selon les territoires, prouvant que face à un phénomène viral, il n'existe pas de solution unique.",
      "Dans l'Académie de Créteil, la réponse a misé sur la médiation par les pairs et l'intervention de partenaires comme la MAE, cherchant à déconstruire l'effet de groupe plutôt qu'à simplement punir. À Toulouse, la vigilance a été renforcée lors des récréations, la série étant identifiée comme un véritable facteur de risque psychosocial.",
      "Mais l'initiative la plus notable est venue des collectivités locales comme Echirolles. La ville a transformé l'alerte sécuritaire en enjeu de santé publique via son programme « Les écrans, parlons-en ! ». L'idée ? Ne pas se limiter à interdire le jeu, mais traiter la cause racine : la gestion des écrans et la parentalité numérique.",
    ],
  },
  {
    id: 3,
    title: "La Gendarmerie en première ligne sur les réseaux",
    paragraphs: [
      "Fait marquant de cet épisode : l'implication directe des forces de l'ordre dans la communication aux parents. La Gendarmerie et la Police ont investi Facebook et Twitter pour diffuser des messages d'alerte massifs.",
      "Leur communication s'est axée sur une réalité technique souvent ignorée des parents : la vigilance algorithmique.",
      "Les forces de l'ordre ont dû rappeler que même si une famille n'a pas Netflix, l'enfant est exposé à la violence de la série via les extraits qui circulent librement sur TikTok et YouTube. En martelant que l'œuvre est interdite aux moins de 16 ans et en démentant les rumeurs prétendant que le jeu était « réel », la police a joué un rôle inédit d'éducateur numérique.",
    ],
  },
];

export default function MesuresEcolesPage() {
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
          src="/images/background/fond-ecole.jpeg"
          alt="Background ecole"
          fill
          className="object-cover  scale-110"
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
              Société
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
              Violence scolaire : Comment l’État a tenté de contrer la vague
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            À l’automne 2021, les cours de récréation françaises et belges ont
            été secouées par un phénomène inattendu : la reproduction des jeux
            violents de la série Netflix Squid Game. Prises de court, les
            institutions ont dû improviser une riposte à trois niveaux :
            politique, pédagogique et sécuritaire. Retour sur une gestion de
            crise inédite.
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
              Le point de vue de Ben Shapiro
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
              alt="Professeur femme"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40vw, 30vw"
            />
          </div>
        </div>

        {/* Image bas droite */}
        <div className="absolute bottom-0 right-0 w-1/2 max-w-lg">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/professeurs/professeur-homme.png"
              alt="Professeur homme"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40vw, 30vw"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-xs tracking-[0.2em] uppercase text-gray-500">
          <div>Squid Game • Webdoc</div>
          <div>Mesures Écoles</div>
        </div>
      </div>
    </main>
  );
}
