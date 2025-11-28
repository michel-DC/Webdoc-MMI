"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
// IMPORT DU NOUVEAU COMPOSANT
import ChoiceModel from "./ChoiceModel";
import SquidGameShapes from "./SquidGameShapes";

export default function HomePage() {
  return (
    <main className="h-screen w-full bg-white relative overflow-hidden">
      <SquidGameShapes type="guard" />
      <h1 className="fixed top-8 left-0 right-0 text-center text-black text-2xl font-light tracking-[0.3em] z-10 uppercase pointer-events-none opacity-70">
        Choisissez votre point de vue
      </h1>

      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        {/* Lumières plus dramatiques pour mettre en valeur les formes 3D */}
        <spotLight
          position={[5, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <spotLight
          position={[-5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#ff0055"
        />{" "}
        {/* Touche de lumière rose */}
        <Environment preset="city" />
        <Physics gravity={[0, 0, 0]}>
          {/* --- Modèle Gauche : Le Garde --- */}
          <ChoiceModel
            position={[-3.5, 0, 0]}
            modelPath="/3D/landing/vue-garde.glb" // CHEMIN VERS TON FICHIER GLB DANS PUBLIC
            url="/point-de-vue-garde"
            label="Le Garde"
            scale={0.03} // Ajuste la taille si ton modèle est trop petit ou gros
            modelOffset={[0, -0.65, 0]} // On remonte un peu le modèle
            textOffset={[0, -1.8, 0]} // On ajuste la position du texte
          />

          {/* --- Modèle Centre : Le Joueur --- */}
          <ChoiceModel
            position={[0, 0, 0]}
            modelPath="/3D/landing/vue-joueur.glb"
            url="/point-de-vue-joueur"
            label="Le Joueur"
            scale={3}
            modelOffset={[0, -0.65, 0]}
            textOffset={[0, -1.8, 0]}
          />

          {/* --- Modèle Droite : Le Front Man --- */}
          <ChoiceModel
            position={[3.5, 0, 0]}
            modelPath="/3D/landing/vue-game-master.glb"
            url="/point-de-vue-vip"
            label="Le VIP"
            scale={0.9}
            modelOffset={[0, -1, 0]}
            textOffset={[0, -1.8, 0]}
          />
        </Physics>
      </Canvas>
    </main>
  );
}
