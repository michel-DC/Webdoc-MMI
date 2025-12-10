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
    title: "Le contexte social : “cuillère en or / cuillère en terre”",
    paragraphs: [
      "Depuis plusieurs années, l’expression coréenne « 금수저 / 흙수저 » littéralement “cuillère en or / cuillère en terre” est devenue courante dans les débats publics. Elle désigne la différence structurale entre ceux qui naissent dans des familles aisées et ceux issus de milieux modestes ou pauvres, un marqueur d’inégalité et de déterminisme social. Un article de la presse sud-coréenne note que cette “théorie des cuillères” gagne du terrain dans l’opinion, soulignant l’importance de l’origine familiale pour l’avenir d’un individu.",
      "Dans ce contexte, l’idée même de jouer le jeu de la vie est biaisée d’entrée pour les “cuillères en terre”, l’ascension sociale paraît fermée, l’effort personnel ne garantissant plus rien. Ainsi, un récit comme celui de Squid Game, des individus désespérés souvent endettés prêts à tout pour une chance de s'en sortir peut apparaître comme une métaphore presque plausible d’un profond sentiment d’impuissance sociale.",
    ],
  },
  {
    id: 2,
    title:
      "Les difficultés économiques réelles : dettes, crise du logement, espoir brisé",
    paragraphs: [
      "De nombreux jeunes en Corée vivent sous pression : dettes, difficultés à accéder à un logement, instabilité professionnelle, sentiment que travailler dur ne suffit plus. Dans un tel contexte, le scénario de Squid Game où la survie et l’argent deviennent les seuls leviers peut résonner comme un récit possible. Certaines analyses récentes de la réception de la série insistent sur ce point, pour des Sud-Coréens subissant l’augmentation du coût de la vie et les montées du prix des logements, la série ne se contente pas de divertir. Elle frappe fort parce qu’elle reflète des angoisses réelles.",
      "Quand le jeu fictionnel qui est Squid Game devient l’image d’une lutte sociale, la violence psychologique, économique, existentielle cesse d’être un simple spectacle pour devenir un miroir de la société Sud-Coréenne.",
    ],
  },
  {
    id: 3,
    title:
      "Squid Game : un miroir sombre de la société — la fiction comme catharsis ou traumatisme",
    paragraphs: [
      "Dans un essai intitulé Capitalism and Class Inequality in Netflix’s Squid Game, l’auteur montre comment la série incarne les peurs et les frustrations liées aux inégalités : l’endettement, la disparité des classes sociales, l’effondrement de l’espoir d’ascension. Pour certains spectateurs coréens, ces thématiques ne sont pas abstraites, elles correspondent à des histoires vécues, des réalités familières.",
      "Un reportage radio explique que pour les Coréens qui ont peu d’argent, les inégalités sociales montrées dans Squid Game ne sont pas une simple fiction. Pour eux, la série reflète leur réalité : les difficultés économiques, la pression sociale et le sentiment de devoir parfois faire des choix très risqués pour s’en sortir.",
      "Ainsi, Squid Game agit comme un catalyseur : il met en scène ce que beaucoup ressentent déjà: frustration, anxiété, désespoir; en le transformant en récit dramatique, visible, partagé.",
    ],
  },
  {
    id: 4,
    title:
      "Pourquoi le “jeu” n’est pas vu comme un choix, mais comme une conséquence sociale",
    paragraphs: [
      "Quand on naît dans une famille pauvre ou modeste, l'avenir semble déjà tracé et travailler dur ne suffit pas toujours pour changer les choses. Dans ce contexte, participer à Squid Game n’est pas vu comme un acte étrange mais comme une réponse logique à un système injuste. La “théorie des cuillères” explique cette idée, naître “cuillère en terre” signifie commencer la vie avec un gros désavantage social. Pour certains, accepter un jeu risqué ou dangereux peut sembler l’une des rares façons de changer son destin, d’espérer s’en sortir ou simplement de survivre. La série devient alors une image forte de l’injustice sociale, plutôt qu’une simple fiction.",
    ],
  },
  {
    id: 5,
    title: "Conclusion",
    paragraphs: [
      "Squid Game ne plaît pas qu’à cause de ses tournures spectaculaires, ses drames et ses rebondissements, il touche un nerf. Pour beaucoup de Coréens en particulier les jeunes, la série résonne profondément parce qu’elle parle de ce qu’ils vivent, de ce qu’ils craignent, de ce qu’ils subissent. Elle traduit en images collectives des dynamiques socio-économiques : inégalités héritées, immobilité, espoirs brisés.",
      "Mais cela en fait aussi un objet doublement dangereux : divertissement pour les uns, traumatisme latent pour d’autres. Pour ces derniers la fiction n’est pas un refuge, c’est un rappel brutal du poids des réalités sociales.",
    ],
  },
  {
    id: 6,
    title: "Sources utilisés:",
    paragraphs: [],
    links: [
      {
        url: "https://issues.digitalpatmos.com/vol6issue2/article-2-capitalism-and-class-inequality-in-netflixs-squid-game",
        text: "Capitalism and Class Inequality in Netflix’s Squid Game",
      },
      {
        url: "https://www.koreatimes.co.kr/amp/business/20151117/spoon-class-theory-gains-force-in-korea",
        text: "Spoon class theory gains force in Korea",
      },
      {
        url: "https://keia.org/the-peninsula/the-rise-of-self-deprecating-terms-such-as-hell-chosun-and-dirt-spoon-among-the-young-generations-in-korea",
        text: "The Rise of ‘Hell Chosun’ and ‘Dirt Spoon’",
      },
    ],
  },
];

export default function RepresentationSocietePage() {
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
          src="/images/background/fond-building.jpg"
          alt="Background Korean society"
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
              REPRÉSENTATION DE LA SOCIÉTÉ CORÉENNE
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Lorsque Squid Game est devenu un phénomène mondial, beaucoup l’ont
            vu comme une critique du capitalisme. Mais en Corée du Sud, la série
            touche à des réalités concrètes que beaucoup vivent ou craignent,
            agissant comme un miroir de leur propre société.
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
              Critique du Capitalisme
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

      {/* Image en bas */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-20">
        <div className="absolute bottom-10 left-0 w-1/2 max-w-lg">
          <div className="relative w-full aspect-square">
            <Image
              src="/images/president.png"
              alt="Président"
              fill
              className="object-contain opacity-80"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-xs tracking-[0.2em] uppercase text-gray-500">
          <div>Squid Game • Webdoc</div>
          <div>Société Coréenne</div>
        </div>
      </div>
    </main>
  );
}
