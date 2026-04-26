'use client';

import { Canvas } from '@react-three/fiber';
import CosmosBackground from './CosmosBackground';
import { Suspense } from 'react';

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-background overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 100 }}
        // More conservative DPR for high-density mobile screens
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.2) : 1} 
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
      >
        <fog attach="fog" args={['#080810', 15, 60]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <CosmosBackground />
        </Suspense>
      </Canvas>
    </div>
  );
}
