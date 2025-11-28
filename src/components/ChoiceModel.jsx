"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFrame } from "@react-three/fiber";
import { Float, Text, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

export default function ChoiceModel({
  position,
  modelPath,
  url,
  label,
  scale = 1,
  modelOffset = [0, 0, 0],
  textOffset = [0, -2, 0],
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // --- CHARGEMENT DU MODÈLE GLB ---
  // useGLTF charge le fichier et nous renvoie la "scene" (l'objet 3D complet)
  const { scene } = useGLTF(modelPath);

  // Clone the scene to avoid issues with shared instances
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // On crée une référence pour pouvoir animer le modèle entier
  const modelRef = useRef(null);

  // Cache materials to avoid traversing the scene on every frame
  const materialsRef = useRef([]);

  // Initialize materials once when the scene is loaded/cloned
  useEffect(() => {
    const materials = [];
    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Handle both single material and array of materials
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];

        mats.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            materials.push(mat);
          }
        });
      }
    });
    materialsRef.current = materials;
  }, [clonedScene]);

  // Update materials when hovered state changes
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      mat.emissiveIntensity = hovered ? 0.3 : 0;
    });
  }, [hovered]);

  // Animation au survol : le modèle grossit légèrement
  useFrame(() => {
    if (modelRef.current) {
      // Gestion du scale qu'il soit un nombre ou un tableau [x, y, z]
      const baseScale = Array.isArray(scale)
        ? new THREE.Vector3(...scale)
        : new THREE.Vector3(scale, scale, scale);

      const targetScale = hovered
        ? baseScale.clone().multiplyScalar(1.1)
        : baseScale;

      modelRef.current.scale.lerp(targetScale, 0.1);
    }
  });

  return (
    <group position={position}>
      {/* Groupe pour le modèle avec son propre décalage */}
      <group position={modelOffset}>
        <Float
          speed={2}
          rotationIntensity={0.5} // On réduit un peu la rotation pour les modèles complexes
          floatIntensity={2}
        >
          {/*
              IMPORTANT POUR LA PHYSIQUE DES MODÈLES COMPLEXES :
              On change 'colliders="ball"' en 'colliders="hull"'.
              "hull" crée une enveloppe physique simplifié autour de la forme de ton modèle.
              C'est plus précis qu'une simple boule pour des objets comme des masques.
          */}
          <RigidBody type="fixed" colliders="hull">
            {/*
              <primitive> est l'élément de R3F pour afficher un objet Three.js existant.
              C'est ici qu'on met notre 'scene' chargée par useGLTF.
            */}
            <primitive
              ref={modelRef}
              object={clonedScene}
              scale={scale} // Taille initiale du modèle
              onClick={() => navigate(url)}
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
                setHovered(true);
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
                setHovered(false);
              }}
            />
          </RigidBody>
        </Float>
      </group>

      {/* Texte positionné indépendamment */}
      <Text
        position={textOffset}
        fontSize={0.2}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

// Il est bonne pratique de pré-charger les modèles pour éviter qu'ils n'apparaissent d'un coup
useGLTF.preload("/3D/landing/vue-garde.glb");
useGLTF.preload("/3D/landing/vue-joueur.glb");
useGLTF.preload("/3D/landing/vue-game-master.glb");
