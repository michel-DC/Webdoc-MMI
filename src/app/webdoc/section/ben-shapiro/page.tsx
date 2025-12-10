"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function AnalysisPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const newTextRef = useRef<HTMLDivElement>(null);

  /*
   * FIX: Use useLayoutEffect + gsap.context for proper cleanup.
   * This prevents "Node not found" errors when navigating away while ScrollTrigger is active.
   */
  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      // Scroll-triggered animations - OPTIMIZED
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1, // Ajout d'un smooth scrub
          pin: true,
          anticipatePin: 1, // Améliore la performance du pin
        },
      });

      // Calculer le déplacement nécessaire pour centrer la box
      const calculateCenterOffset = () => {
        if (!boxRef.current) return 0;
        const boxLeft = boxRef.current.offsetLeft;
        const boxWidth = boxRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const targetCenter = (windowWidth - boxWidth) / 2;
        return -(boxLeft - targetCenter);
      };

      // Timeline améliorée avec transitions plus fluides
      tl.to(
        imageRef.current,
        {
          y: "100%",
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.4,
        },
        0
      )
        .to(
          boxRef.current,
          {
            x: calculateCenterOffset,
            scale: 1.2,
            ease: "power2.inOut",
            duration: 0.6,
          },
          0.2
        )
        .fromTo(
          textRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "power2.inOut",
            duration: 0.2,
          },
          0.3
        )
        .to(
          newTextRef.current,
          {
            opacity: 1,
            ease: "power2.inOut",
            duration: 0.3,
          },
          0.5
        );
    }, containerRef); // Scope to containerRef

    return () => ctx.revert(); // Force cleanup of all GSAP animations and ScrollTriggers created in this context
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Fond avec image floutée */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background/fond-building.jpg"
          alt="Background Library"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Image grande en bas à gauche */}
      <div
        ref={imageRef}
        className="fixed bottom-[15vh] left-0 z-10 w-2/5 will-change-transform"
      >
        <div className="relative h-[90vh]">
          <Image
            src="/images/etudiants/ben.png"
            alt="Ben Shapiro"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      {/* Container principal pour la box */}
      <div className="relative z-20 w-full h-screen flex items-center justify-end pr-4 md:pr-6 lg:pr-12">
        {/* Box avec texte */}
        <div
          ref={boxRef}
          className="relative w-full max-w-xl lg:max-w-2xl h-[70vh] mr-28 max-h-[600px] will-change-transform"
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
              src="/images/background/fond-tableau.png"
              alt="Paper Background"
              fill
              className="object-cover"
              priority
            />

            {/* Contenu textuel scrollable */}
            <div
              ref={textRef}
              className="relative z-10 w-full h-full overflow-y-auto p-6 md:p-10 flex items-center will-change-opacity"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#1a1a1a transparent",
              }}
            >
              <div className="space-y-6 text-left">
                <p className="text-lg md:text-xl leading-relaxed text-gray-800 font-normal tracking-wide">
                  Ben Shapiro est un journaliste, avocat et animateur de radio
                  américain. Il tient un dialogue très politisé sur de nombreux
                  sujets avec un point de vue très conservateur. Il parle
                  longuement de Squid Game dans une vidéo intitulée Ben Shapiro
                  Reviews &quot;Squid Game&quot; publiée sur sa chaîne YouTube
                  en 2021 dans laquelle il explique que contrairement à ce que
                  prétends le réalisateur de la série, &quote;Squid Game ne
                  dépeint pas un capitalisme dystopique, mais la triste réalité
                  du communisme&quot;.
                </p>
              </div>
            </div>

            {/* Nouveau contenu textuel (initialement caché) */}
            <div
              ref={newTextRef}
              className="absolute inset-0 z-20 w-full h-full overflow-y-auto p-6 md:p-10 opacity-0 flex items-start will-change-opacity"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#1a1a1a transparent",
              }}
            >
              <div className="space-y-4 text-left text-gray-800 pt-4">
                <p className="text-lg md:text-xl leading-relaxed font-normal tracking-wide">
                  D&apos;accord, les amis, parlons de Squid Game. C&apos;est la
                  s&eacute;rie num&eacute;ro un sur Netflix. Tout le monde la
                  regarde. Et bien s&ucirc;r, parce que nous vivons dans une
                  soci&eacute;t&eacute; obs&eacute;d&eacute;e par la
                  victimisation, tous les critiques culturels de la gauche
                  radicale se sont pr&eacute;cipit&eacute;s pour dire la
                  m&ecirc;me chose. Ils disent : &laquo; Oh, regardez !
                  C&apos;est une critique cinglante du capitalisme tardif !
                  C&apos;est la preuve que le march&eacute; libre est le diable
                  ! &raquo; Laissez-moi &ecirc;tre clair : c&apos;est
                  objectivement faux. C&apos;est un non-sens absolu. Si vous
                  regardez la s&eacute;rie &ndash; et je l&apos;ai
                  regard&eacute;e, la r&eacute;alisation est comp&eacute;tente,
                  je l&apos;admet &ndash; et que votre conclusion est &laquo; le
                  capitalisme est mauvais &raquo;, alors vous ne pr&ecirc;tez
                  pas attention aux faits. Les faits se fichent de vos
                  sentiments sur les riches, et les faits de Squid Game
                  racontent une histoire totalement diff&eacute;rente. Analysons
                  cela logiquement. Qu&apos;est-ce qui d&eacute;finit le jeu ?
                  Tout le monde porte le m&ecirc;me uniforme vert. Tout le monde
                  est un num&eacute;ro, pas un nom. L&apos;individualit&eacute;
                  est totalement effac&eacute;e au profit du collectif. Vous
                  mangez ce qu&apos;on vous donne, vous dormez quand on vous le
                  dit. Une &eacute;lite masqu&eacute;e et irresponsable &ndash;
                  les gardes en rouge &ndash; contr&ocirc;le chaque aspect de
                  votre vie avec une violence brutale pour maintenir
                  l&apos;ordre. &Ccedil;a, les amis, ce n&apos;est pas le libre
                  march&eacute;. C&apos;est la Cor&eacute;e du Nord. C&apos;est
                  l&apos;Union Sovi&eacute;tique. C&apos;est l&apos;utopie
                  socialiste o&ugrave; &laquo; l&apos;&eacute;galit&eacute;
                  &raquo; signifie simplement que tout le monde est
                  &eacute;galement mis&eacute;rable et terrifi&eacute;. Dans un
                  syst&egrave;me capitaliste, vous avez la libert&eacute; de
                  r&eacute;ussir ou d&apos;&eacute;chouer. Dans Squid Game, le
                  syst&egrave;me impose une &eacute;galit&eacute; de
                  r&eacute;sultat : si vous &eacute;chouez, vous &ecirc;tes
                  &eacute;limin&eacute;. Litt&eacute;ralement. C&apos;est
                  l&apos;&Eacute;tat totalitaire par excellence. Parlons
                  maintenant des personnages. La gauche veut que vous croyiez
                  que ces gens sont des victimes innocentes
                  &eacute;cras&eacute;es par la dette. Prenons le protagoniste,
                  Gi-hun. Est-ce un h&eacute;ro de la classe ouvri&egrave;re
                  opprim&eacute; ? Non. C&apos;est un parieur
                  d&eacute;g&eacute;n&eacute;r&eacute;. Il a vol&eacute; de
                  l&apos;argent &agrave; sa propre m&egrave;re
                  &acirc;g&eacute;e. Il a &eacute;chou&eacute; &agrave; subvenir
                  aux besoins de sa propre fille ! Ce n&apos;est pas la faute de
                  Samsung ou du syst&egrave;me bancaire cor&eacute;en si ce type
                  d&eacute;cide de parier sur des chevaux au lieu de trouver un
                  emploi stable. C&apos;est une faillite morale, point final. Et
                  qu&apos;en est-il de Sang-woo, le banquier
                  d&apos;investissement ? La gauche pointe du doigt et crie :
                  &laquo; Regardez ! M&ecirc;me les &eacute;duqu&eacute;s sont
                  victimes ! &raquo; Faux. Il a d&eacute;tourn&eacute; des
                  fonds. Il a commis une fraude. Ce sont des crimes. Ce sont de
                  mauvais choix individuels.
                </p>
                <p className="text-lg md:text-xl leading-relaxed font-normal tracking-wide">
                  Mais voici le clou du spectacle, la pi&egrave;ce de
                  r&eacute;sistance que les m&eacute;dias grand public ignorent
                  d&eacute;lib&eacute;r&eacute;ment parce que cela
                  d&eacute;truit leur narration : le vote. Au d&eacute;but de la
                  s&eacute;rie, ils ont le choix. Ils votent
                  d&eacute;mocratiquement pour arr&ecirc;ter le jeu. Ils
                  rentrent chez eux. Ils sont libres. Et que font-ils ? Ils
                  choisissent, de leur plein gr&eacute;, de revenir. Pourquoi ?
                  Parce qu&apos;ils pr&eacute;f&egrave;rent la tyrannie brutale
                  du jeu, qui leur promet une &quot;chance &eacute;gale&quot; et
                  la gratuit&eacute;, &agrave; la dure r&eacute;alit&eacute; de
                  la responsabilit&eacute; individuelle dans le monde
                  r&eacute;el. Ils vendent litt&eacute;ralement leur
                  libert&eacute; &agrave; une autorit&eacute; centrale en
                  &eacute;change de la promesse d&apos;une
                  s&eacute;curit&eacute; financi&egrave;re. C&apos;est
                  exactement le contrat social que propose le socialisme. Le
                  &quot;Ma&icirc;tre du jeu&quot; ne cesse de parler
                  d&apos;&eacute;quit&eacute;, n&apos;est-ce pas ? Il tue
                  m&ecirc;me ceux qui trichent parce que cela ruine
                  l&apos;&eacute;galit&eacute; sacr&eacute;e du jeu.
                  L&apos;id&eacute;ologie du jeu est que tout le monde doit
                  &ecirc;tre &eacute;gal, peu importe le talent, peu importe
                  l&apos;effort, tant que vous suivez les r&egrave;gles
                  arbitraires de l&apos;&Eacute;tat. Donc non, Squid Game
                  n&apos;est pas une condamnation du capitalisme. C&apos;est un
                  avertissement terrifiant sur ce qui arrive quand une
                  soci&eacute;t&eacute; valorise l&apos;&eacute;galit&eacute;
                  forc&eacute;e plut&ocirc;t que la libert&eacute; individuelle.
                  C&apos;est une d&eacute;monstration que lorsque vous remplacez
                  la m&eacute;ritocratie par une bureaucratie sans visage qui
                  g&egrave;re votre vie et votre mort, vous n&apos;obtenez pas
                  l&apos;utopie. Vous obtenez des cadavres dans des bo&icirc;tes
                  cadeaux. Ne vous laissez pas berner par la propagande. Squid
                  Game est l&apos;argument le plus pro-libert&eacute; et
                  anti-communiste que j&apos;ai vu &agrave; la
                  t&eacute;l&eacute;vision depuis des ann&eacute;es.
                </p>
                <a
                  href="https://www.youtube.com/watch?v=NdVBOT2FFNI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:underline mt-4"
                >
                  🔗 Source : https://www.youtube.com/watch?v=NdVBOT2FFNI.
                </a>
              </div>
            </div>

            {/* Indicateur de scroll */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-6 h-6 flex justify-center opacity-50">
                <div className="w-1 h-3 bg-black rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation de retour */}
      <div className="text-center my-16 relative z-20">
        <Link
          href="/webdoc"
          className="group inline-flex items-center gap-3 px-6 py-3 border border-gray-700 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
        >
          <span className="text-sm tracking-[0.2em] uppercase">
            Retour sur la carte mentale
          </span>
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 border border-gray-600 rounded-full group-hover:border-white transition-all duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-sm">
              ←
            </span>
          </div>
        </Link>
      </div>

      {/* Footer minimal */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center text-xs tracking-[0.3em] uppercase text-gray-600">
          <div>Squid Game • Analyse Sociale</div>
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
