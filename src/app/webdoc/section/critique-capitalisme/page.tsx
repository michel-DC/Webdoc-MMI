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
    role: "Journaliste de Droite",
    side: "right",
    text: `On a bien compris que la série soulève des questions politiques, mais pour finir, il faut revenir à l'essentiel : pourquoi 456 personnes acceptent-elles de revenir dans ce jeu mortel ? C'est ça, l'énigme.`,
  },
  {
    id: 2,
    speaker: "JG",
    role: "Journaliste de Gauche",
    side: "left",
    text: `L'énigme est économique. Pour la plupart d'entre eux, le danger de mourir dans le jeu est moins grand que le danger de mourir dans la rue, écrasé par les huissiers. Ce n'est pas un choix, c'est une fatalité financière.`,
  },
  {
    id: 3,
    speaker: "JD",
    role: "Journaliste de Droite",
    side: "right",
    text: `Mais on parle d'hommes et de femmes qui ont fait des mauvais choix, qui ont trop spéculé, qui ont trop emprunté. On ne peut pas accuser la société de tout.`,
  },
  {
    id: 4,
    speaker: "JG",
    role: "Journaliste de Gauche",
    side: "left",
    text: `C'est l'échec d'un système. Ce que vous appelez des "mauvais choix" est en réalité la seule porte de sortie pour des millions de Coréens. Et le plus frappant, c'est que la situation des joueurs est bien réelle : la Corée du Sud est un pays qui vit à crédit.`,
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
              ET LA CRITIQUE DU CAPITALISME
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
                            ? "/images/journaliste/gauche.png"
                            : "/images/journaliste/droite.png"
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

        {/* Injected Content */}
        <div className="relative p-10 my-16 bg-white/10 backdrop-blur-sm rounded-xl border border-gray-600 shadow-xl text-left space-y-12">
          {/* Section 1 */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
              1. Le Contexte Économique : L&apos;Enfer Joseon
            </h3>
            <div className="space-y-4 text-gray-200 leading-relaxed">
              <p>
                La situation du protagoniste, Seong Gi-hun, n&apos;est pas une
                exagération scénaristique. Pour des millions de Sud-Coréens, la
                dette n&apos;est pas une simple mauvaise gestion, c&apos;est une
                fatalité structurelle. Selon l&apos;Institut de la Finance
                Internationale (IIF), la Corée du Sud affiche l&apos;un des ratios
                « dette des ménages / PIB » les plus élevés au monde, dépassant
                régulièrement les 100 %.
              </p>
              <p>
                Cela signifie que, collectivement, les ménages doivent plus
                qu&apos;ils ne produisent en un an. Dans la vraie vie, des gens
                comme Choi Young-soo, un livreur interviewé par le Guardian
                vivent ce cauchemar. Endetté auprès de cinq banques et harcelé
                par des taux d&apos;intérêt de 17 %, il refuse de regarder la
                série. Sa raison est glaciale : &quot;Pourquoi regarderais-je
                des gens endettés s&apos;entretuer? Je n&apos;ai qu&apos;à me regarder
                dans le miroir.&quot; Choi n&apos;a pas toujours été en marge de la
                société. Avant de livrer des repas, il était ingénieur
                informatique. Sa chute illustre parfaitement la mécanique
                impitoyable décrite par le journal britannique, face à des prix
                de l&apos;immobilier qui ont doublé à Séoul en cinq ans, Choi a
                été pris de panique à l&apos;idée de ne jamais pouvoir devenir
                propriétaire. C&apos;est pour tenter de rattraper ce retard
                impossible qu&apos;il a investi massivement en bourse et dans les
                cryptomonnaies avant de tout perdre.
              </p>
              <p>
                Le Ouest France rapportent que cette crise de l&apos;endettement a
                engendré la « génération des trois renoncements » (Sampo en
                coréen) : des jeunes qui renoncent aux relations amoureuses, au
                mariage et aux enfants faute de moyens.
              </p>
              <p>
                Le terme qu&apos;ils utilisent, &quot;Hell Joseon&quot; (L&apos;Enfer
                Joseon), décrit une société où la compétition est si intense et
                la mobilité sociale si bloquée que seule une catastrophe ou un
                miracle comme gagner la cagnotte du jeu peut offrir une porte
                de sortie. Le jeu mortel devient ainsi la seule métaphore
                crédible pour décrire la compétition scolaire et
                professionnelle hyper-agressive que vit le pays.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link href="https://itif.org/publications/2025/11/17/marshaling-national-power-industries-to-preserve-us-strength-and-thwart-china/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">IIF</Link>
              <Link href="https://www.theguardian.com/world/2021/oct/08/squid-game-lays-bare-south-koreas-real-life-personal-debt-crisis" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">The Guardian</Link>
              <Link href="https://www.ouest-france.fr/monde/coree-du-sud/pour-relancer-sa-demographie-la-coree-du-sud-fait-plus-que-doubler-ses-primes-de-naissance-659aeb78-cd6b-11ed-b493-b75770ef7f91" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Ouest France</Link>
              <Link href="https://bonjour-coree.org/hell-joseon/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Bonjour Corée</Link>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
              2. L&apos;Histoire Vraie : La Grève de SsangYong
            </h3>
            <div className="space-y-4 text-gray-200 leading-relaxed">
              <p>
                Le scénariste Hwang Dong-hyuk n&apos;a pas inventé le traumatisme
                de son héros. Dans l&apos;épisode 5, Gi-hun raconte avoir été un
                ouvrier qui a perdu son emploi après qu&apos;un collègue est mort
                lors d&apos;une grève violemment réprimée. C&apos;est une référence
                directe et sombre à l&apos;histoire industrielle coréenne.
              </p>
              <p>
                Hwang a confirmé s&apos;être inspiré des événements de 2009 chez
                SsangYong Motor. Suite à l&apos;annonce de licenciements massifs,
                plus de 2 600 ouvriers ont occupé l&apos;usine pendant 77 jours.
                La riposte des forces de l&apos;ordre fut brutale, une
                intervention militaire impliquant des hélicoptères, des gaz
                lacrymogènes et des commandos.
              </p>
               <p>
                Comme l&apos;analyse le média Brut, cet événement a marqué une
                rupture dans la psyché collective coréenne, les ouvriers
                licenciés et leurs familles n&apos;ont pas seulement perdu leur
                emploi, ils ont subi une vague de dépressions, de troubles, de
                stress post-traumatique et de suicides dans les années qui ont
                suivi. L&apos;histoire du protagoniste, un homme honorable
                transformé en paria social endetté donne une résonance
                historique tragique à la fiction, validant que le système est
                bien capable de transformer des travailleurs ordinaires en
                candidats prêts à se sacrifier pour de l’argent.
              </p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
               <Link href="https://www.brut.media/fr/articles/international/asie-pacifique/la-violence-reelle-aux-racines-de-squid-game" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Brut</Link>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
              3. Le Paradoxe Netflix : Le Capitalisme de Divertissement
            </h3>
            <div className="space-y-4 text-gray-200 leading-relaxed">
              <p>
                C&apos;est là que le message de la série se heurte à la réalité du
                marché. Le paradoxe de Squid Game est le suivant : une œuvre
                qui dénonce le capitalisme est devenue son produit le plus
                rentable.
              </p>
              <p>
                La série a coûté environ 21 millions de dollars à produire
                pour Netflix. Pourtant, selon des documents internes révélés
                par Variety, elle a généré une valeur d&apos;impact estimée à
                plus de 890 millions de dollars pour la plateforme en
                recrutant de nouveaux abonnés. Ce retour sur investissement
                est astronomique.
              </p>
              <p>
                Ce phénomène illustre ce que le théoricien Mark Fisher
                appelait le réalisme capitaliste, la capacité du système à
                absorber sa propre critique et à la revendre comme une forme de
                divertissement. Le spectateur consomme de
                l&apos;anti-capitalisme. L&apos;ironie est totale, le symbole de la
                pauvreté des personnages, le survêtement vert a été
                immédiatement commercialisé et vendu par milliers sur des
                plateformes e-commerce.
              </p>
              <p>
                En fin de compte, la série prouve la force du système
                qu&apos;elle attaque. Elle a eu le mérite de rendre la violence des
                inégalités visible à une échelle planétaire. Mais en même
                temps, elle est la preuve que toute forme de révolte peut être
                mise en boîte, vendue, et transformée en profit pour les mêmes
                &quot;VIPs&quot; qu&apos;elle dépeint.
              </p>
            </div>
             <div className="flex justify-center gap-4 mt-6">
               <Link href="https://variety.com/2021/digital/news/squid-game-900-million-value-netflix-leaked-data-1235091156/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">Variety</Link>
            </div>
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
              src="/images/journaliste/gauche.png"
              alt="Journaliste de gauche"
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
              src="/images/journaliste/droite.png"
              alt="Journaliste de droite"
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
          <div>Critique du Capitalisme</div>
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
