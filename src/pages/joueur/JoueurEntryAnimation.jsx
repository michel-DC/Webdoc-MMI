import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model(props) {
  const { scene } = useGLTF('/3D/maison.glb');

  useEffect(() => {
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

function EntryAnimation({ onAnimationComplete }) {
  const startPosition = new THREE.Vector3(0, 5, 7); // Changed z from 15 to 7
  const endPosition = new THREE.Vector3(0, 2, 8); // Closer to the center

  useFrame((state) => {
    if (state.camera.position.distanceTo(endPosition) > 0.1) {
      state.camera.position.lerp(endPosition, 0.02);
      state.camera.lookAt(0, 1, 0);
    } else {
      onAnimationComplete();
    }
  });

  return null;
}

export default function JoueurEntryAnimation() {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        camera={{ position: [0, 5, 20], fov: 75 }}
        shadows
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.5} />
        <hemisphereLight intensity={1} groundColor="black" />
        <spotLight
          position={[20, 20, 20]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} castShadow />
        <Suspense fallback={null}>
          <Model />
          {!animationComplete && (
            <EntryAnimation onAnimationComplete={() => setAnimationComplete(true)} />
          )}
        </Suspense>
        <OrbitControls enabled={animationComplete} />
      </Canvas>
    </div>
  );
}
