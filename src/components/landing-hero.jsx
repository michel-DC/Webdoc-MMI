import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as dat from "dat.gui";
import ModelViewer from "./ModelViewer";
import SquidGameShapes from "./SquidGameShapes";

export default function LandingHero() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [widths, setWidths] = useState(["0%", "0%", "0%"]);
  const [opacities, setOpacities] = useState([0, 0, 0]);

  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  const [mouse1, setMouse1] = useState({ x: 0, y: 0 });
  const [mouse2, setMouse2] = useState({ x: 0, y: 0 });
  const [mouse3, setMouse3] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.dat = dat;
    window.ga = window.ga || function () {};
    import("../lib/fluid-simulation").catch((err) =>
      console.error("Failed to load fluid simulation:", err)
    );

    const animationDuration = 1000;
    const startDelay = 3000;

    const timeouts = [
      setTimeout(() => {
        setWidths((prev) => ["100%", prev[1], prev[2]]);
      }, startDelay),
      setTimeout(() => {
        setOpacities((prev) => [1, prev[1], prev[2]]);
      }, startDelay + animationDuration),

      setTimeout(() => {
        setWidths((prev) => [prev[0], "100%", prev[2]]);
      }, startDelay + animationDuration),
      setTimeout(() => {
        setOpacities((prev) => [prev[0], 1, prev[2]]);
      }, startDelay + 2 * animationDuration),

      setTimeout(() => {
        setWidths((prev) => [prev[0], prev[1], "100%"]);
      }, startDelay + 2 * animationDuration),
      setTimeout(() => {
        setOpacities((prev) => [prev[0], prev[1], 1]);
      }, startDelay + 3 * animationDuration),
    ];

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const handleCardMouseMove = (event, cardRef, setMouseState) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setMouseState({
      x: (x / rect.width) * 2 - 1,
      y: -(y / rect.height) * 2 + 1,
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col m-0 p-0 overflow-hidden relative">
      <style>{`
        .dg.ac { display: none !important; }
        .filler {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background-color: white;
          transition: width 1s ease-in-out;
          z-index: 1;
        }
        .filler::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0;
          transition: width 0.4s ease-in-out;
        }
        .filler-joueur::before { background-color: #1A5632; }
        .filler-garde::before { background-color: #E54B6A; }
        .filler-vip::before { background-color: #FFD700; }

        .group:hover .filler::before {
          width: 100%;
        }
        .card-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .title-font {
          font-family: 'Black Ops One', sans-serif;
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      <div className="promo" style={{ display: "none" }}>
        <div className="promo-close"></div>
        <div id="apple_link"></div>
        <div id="google_link"></div>
      </div>

      {/* Card 1: Joueur */}
      <div
        ref={card1Ref}
        onMouseMove={(e) => handleCardMouseMove(e, card1Ref, setMouse1)}
        onClick={() => navigate('/joueur')}
        className="flex-1 w-full border-b-2 border-[#E54B6A] relative group cursor-pointer"
        style={{ zIndex: 1 }}
      >
        <div
          className="filler filler-joueur"
          style={{ width: widths[0] }}
        ></div>

        <div
          className="card-content"
          style={{ opacity: opacities[0], transition: "opacity 0.5s" }}
        >
          <div className="w-1/3 h-full">
            <ModelViewer
              modelPath="/3D/landing/vue-joueur.glb"
              scale={6.2}
              position={[0, -4.0, 0]}
              mouse={mouse1}
            />
          </div>

          <span className="title-font text-8xl font-bold pr-10 group-hover:text-white transition-colors duration-300">
            Joueur
          </span>
          <SquidGameShapes type="player" />
        </div>
      </div>

      {/* Card 2: Garde */}
      <div
        ref={card2Ref}
        onMouseMove={(e) => handleCardMouseMove(e, card2Ref, setMouse2)}
        onClick={() => navigate('/garde')}
        className="flex-1 w-full border-b-2 border-[#1A5632] relative group cursor-pointer"
        style={{ zIndex: 1 }}
      >
        <div className="filler filler-garde" style={{ width: widths[1] }}></div>

        <div
          className="card-content"
          style={{ opacity: opacities[1], transition: "opacity 0.5s" }}
        >
          <div className="w-1/3 h-full">
            <ModelViewer
              modelPath="/3D/landing/vue-garde.glb"
              scale={0.07}
              position={[0, -4.0, 0]}
              mouse={mouse2}
            />
          </div>

          <span className="title-font text-8xl font-bold pr-10 group-hover:text-white transition-colors duration-300">
            Garde
          </span>
          <SquidGameShapes type="guard" />
        </div>
      </div>

      {/* Card 3: VIP */}
      <div
        ref={card3Ref}
        onMouseMove={(e) => handleCardMouseMove(e, card3Ref, setMouse3)}
        onClick={() => navigate('/vip')}
        className="flex-1 w-full relative group cursor-pointer"
        style={{ zIndex: 1 }}
      >
        <div className="filler filler-vip" style={{ width: widths[2] }}></div>

        <div
          className="card-content"
          style={{ opacity: opacities[2], transition: "opacity 0.5s" }}
        >
          <div className="w-1/3 h-full">
            <ModelViewer
              modelPath="/3D/landing/vue-game-master.glb"
              scale={7.2}
              position={[0, -6.0, 0]}
              mouse={mouse3}
            />
          </div>

          <span className="title-font text-8xl font-bold pr-10 group-hover:text-white transition-colors duration-300">
            VIP
          </span>
          <SquidGameShapes type="vip" />
        </div>
      </div>
    </div>
  );
}
