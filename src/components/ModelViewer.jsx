import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber'; // Removed useFrame import
import { useGLTF } from '@react-three/drei';

function Model({ modelPath, scale, position }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef(); // modelRef is no longer needed without useFrame

  // Removed useFrame hook for rotation

  return <primitive ref={modelRef} object={scene} scale={scale} position={position} />;
}

export default function ModelViewer({ modelPath, scale = 1, position = [0, 0, 0] }) {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={1.5} />
        <directionalLight intensity={1} position={[0, 10, 0]} />
        <Model modelPath={modelPath} scale={scale} position={position} />
      </Suspense>
    </Canvas>
  );
}
