import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// ----------------------------------------------------------------------
// 1. COMPOSANT DE VOTRE MODÈLE
// ----------------------------------------------------------------------

function SquidModel(props) {
  // Référence (ref) pour accéder à l'objet 3D dans le rendu
  const groupRef = useRef();

  // Utilisez le hook useGLTF (de Drei) pour charger le modèle .glb
  // Le chemin "squid_game_mingle.glb" doit pointer vers votre fichier
  const { scene, animations } = useGLTF("/squid_game_mingle.glb");

  // Si le modèle contient des animations (type marche, course, etc.)
  // vous pouvez les gérer ainsi :s
  // const { actions } = useAnimations(animations, groupRef);

  // ------------------------------------------------------------------
  // 2. L'ANIMATION "STYLÉE" (Rotation continue)
  // ------------------------------------------------------------------

  // Le hook useFrame s'exécute à chaque "frame" (environ 60 fois/seconde)
  useFrame((state, delta) => {
    // Vérifie que la référence à l'objet est bien là avant de l'animer
    if (groupRef.current) {
      // delta est le temps écoulé depuis la dernière frame (utile pour la fluidité)

      // Animation : Rotation lente autour de l'axe Y (vertical)
      groupRef.current.rotation.y += delta * 0.5; // Ajustez la vitesse (0.5 est lent)

      // Animation : Légère lévitation (mouvement de haut en bas)
      // On utilise Math.sin pour un mouvement cyclique et fluide
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1; // 0.1 est l'amplitude
    }
  });

  // Rendu de la scène
  return (
    // 'group' agit comme un conteneur pour appliquer la référence et l'animation
    <group ref={groupRef} {...props} dispose={null}>
      {/* 'scene' est l'objet 3D chargé. 
        'primitive' est utilisé pour inclure des objets Three.js directement.
        L'argument 'object' doit être votre scène chargée.
      */}
      <primitive object={scene} />
    </group>
  );
}

// Pour s'assurer que useGLTF est pré-chargé (optimisation)
useGLTF.preload("/squid_game_mingle.glb");

export default SquidModel;
