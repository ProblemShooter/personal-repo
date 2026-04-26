'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function BrainMesh() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a procedural "brain-like" particle shape
  // For simplicity, a sphere with noise displacement or just a structured instanced mesh
  const count = 300;
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      
      const r = 2.5 + Math.random() * 0.5; // slight noise
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      // Make it slightly brain shaped (elongated)
      pos[i * 3] = x * 0.8;
      pos[i * 3 + 1] = y * 0.9;
      pos[i * 3 + 2] = z * 1.2;
    }
    return { positions: pos };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.2;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2; // Float up and down
    }
    
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        // Pulse scale
        const scale = 1 + Math.sin(time * 2 + i) * 0.2;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -4]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.8} />
      </instancedMesh>
      {/* Wireframe inner volume */}
      <mesh>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color="#7B2FFF" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
