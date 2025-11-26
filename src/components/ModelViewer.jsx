import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MathUtils } from 'three';

function Model({ modelPath, scale, position, mouse }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  useFrame(() => {

    if (modelRef.current) {

      const targetRotationY = mouse.x * 1.0; // Increased sensitivity

      modelRef.current.rotation.y = MathUtils.lerp(modelRef.current.rotation.y, targetRotationY, 0.1); // Increased speed

    }

  });  return <primitive ref={modelRef} object={scene} scale={scale} position={position} />;
}

export default function ModelViewer({ modelPath, scale = 1, position = [0, 0, 0], mouse }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <directionalLight intensity={1} position={[0, 10, 0]} />
        <Model modelPath={modelPath} scale={scale} position={position} mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
