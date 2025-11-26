import React, { useEffect, useRef, useState } from "react";
import * as dat from "dat.gui";
import ModelViewer from "./ModelViewer";

export default function LandingHero() {
  const canvasRef = useRef(null);
  const [widths, setWidths] = useState(["0%", "0%", "0%"]);
  const [opacities, setOpacities] = useState([0, 0, 0]);

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
        .card-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
        className="flex-1 w-full border-b-2 border-[#E54B6A] relative"
        style={{ zIndex: 1 }}
      >
        <div className="filler" style={{ width: widths[0] }}></div>

        <div
          className="card-content"
          style={{ opacity: opacities[0], transition: "opacity 0.5s" }}
        >
          <div className="w-1/3 h-full">
            <ModelViewer
              modelPath="/3D/landing/vue-joueur.glb"
              scale={6.2}
              position={[0, -4.0, 0]}
            />
          </div>

          <span className="text-8xl font-bold pr-10">Joueur</span>
        </div>
      </div>

      {/* Card 2: Garde */}
      <div
        className="flex-1 w-full border-b-2 border-[#1A5632] relative"
        style={{ zIndex: 1 }}
      >
        <div className="filler" style={{ width: widths[1] }}></div>

        <div
          className="card-content"
          style={{ opacity: opacities[1], transition: "opacity 0.5s" }}
        >
          <div className="w-1/3 h-full">
            <ModelViewer
              modelPath="/3D/landing/vue-garde.glb"
              scale={0.07}
              position={[0, -4.0, 0]}
            />
          </div>

          <span className="text-8xl font-bold pr-10">Garde</span>
        </div>
      </div>

      {/* Card 3: VIP */}
      <div className="flex-1 w-full relative" style={{ zIndex: 1 }}>
        <div className="filler" style={{ width: widths[2] }}></div>

        <div
          className="card-content"
          style={{ opacity: opacities[2], transition: "opacity 0.5s" }}
        >
          <div className="w-1/3 h-full">
            <ModelViewer
              modelPath="/3D/landing/vue-game-master.glb"
              scale={7.2}
              position={[0, -6.0, 0]}
            />
          </div>

          <span className="text-8xl font-bold pr-10">VIP</span>
        </div>
      </div>
    </div>
  );
}
