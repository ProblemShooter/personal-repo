'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// High-performance shader-based stars
function FriendlyStars() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const count = isMobile ? 700 : 2000;
  const pointsRef = useRef<THREE.Points>(null);
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: isMobile ? 1.5 : 2.5 },
      uColor: { value: new THREE.Color('#ffffff') }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uSize;
      attribute float aSpeed;
      attribute float aRandom;
      varying float vOpacity;
      
      void main() {
        vec3 pos = position;
        
        // Continuous flow in Y
        pos.y += uTime * aSpeed * 15.0;
        
        // Wrap around logic in shader
        pos.y = mod(pos.y + 75.0, 150.0) - 75.0;
        
        // Add some subtle wobble
        pos.x += sin(uTime * 0.5 + aRandom * 10.0) * 2.0;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = uSize * (30.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
        
        // Fade in/out at the boundaries
        vOpacity = smoothstep(-75.0, -60.0, pos.y) * (1.0 - smoothstep(60.0, 75.0, pos.y));
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying float vOpacity;
      
      void main() {
        // Circular particles
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;
        
        float alpha = (1.0 - smoothstep(0.3, 0.5, dist)) * vOpacity * 0.6;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  }), [isMobile]);

  const [positions, speeds, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const rnd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 150;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 150;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
      spd[i] = Math.random() * 0.5 + 0.2;
      rnd[i] = Math.random();
    }
    return [pos, spd, rnd];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    shaderArgs.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Subtle overall rotation instead of per-star CPU update
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points key={count} ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          args={[speeds, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        args={[shaderArgs]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FriendlyUFO() {
  const shipRef = useRef<THREE.Group>(null);
  const glowMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const beamMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  
  // Random phase offsets for independent movement
  const phases = useMemo(() => ({
    x: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    z: Math.random() * Math.PI * 2,
    rot: Math.random() * Math.PI * 2
  }), []);

  useFrame((state) => {
    if (!shipRef.current) return;
    
    const time = state.clock.elapsedTime * 0.35;
    
    // Completely autonomous random-looking path
    const targetX = Math.sin(time + phases.x) * 10 + Math.cos(time * 0.7) * 5;
    const targetY = Math.cos(time * 0.8 + phases.y) * 5 + Math.sin(time * 1.2) * 2;
    const targetZ = -10 + Math.sin(time * 0.4 + phases.z) * 15; 
    
    const floatY = Math.sin(time * 3.0) * 0.2;
    
    shipRef.current.position.x = targetX;
    shipRef.current.position.y = targetY + floatY;
    shipRef.current.position.z = targetZ;
    
    shipRef.current.rotation.x = Math.PI * 0.1 + Math.sin(time * 0.5) * 0.2;
    shipRef.current.rotation.y = time * 0.8;
    shipRef.current.rotation.z = Math.sin(time * 0.7) * 0.3;
    
    if (glowMaterialRef.current && beamMaterialRef.current) {
      const hue = (0.5 + Math.sin(time * 0.4) * 0.3) % 1.0; 
      const color = new THREE.Color().setHSL(hue, 0.9, 0.6);
      glowMaterialRef.current.color.copy(color);
      beamMaterialRef.current.color.copy(color);
    }
  });

  return (
    <group ref={shipRef} position={[0, 0, -10]}>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.8, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#aaddff" transparent opacity={0.3} metalness={0.5} roughness={0.2} />
      </mesh>
      
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial ref={glowMaterialRef} color="#00D4FF" />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.2, 0.3, 24]} />
        <meshStandardMaterial color="#2a2a4a" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.2, 0.6, 0.3, 24]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.6} />
      </mesh>

      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={i} position={[Math.cos((i / 8) * Math.PI * 2) * 1.45, 0, Math.sin((i / 8) * Math.PI * 2) * 1.45]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}

      <pointLight position={[0, 0, 0]} color="#ffffff" intensity={1} distance={8} />
      
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.4, 1.5, 2.5, 16]} />
        <meshBasicMaterial ref={beamMaterialRef} color="#00D4FF" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function CuteRocket() {
  const shipRef = useRef<THREE.Group>(null);
  
  const phases = useMemo(() => ({
    offset: Math.random() * 100,
    speed: 0.8 + Math.random() * 0.4
  }), []);

  useFrame((state) => {
    if (!shipRef.current) return;
    const time = state.clock.elapsedTime * phases.speed * 0.7;
    
    // Circular path with some variance
    const radius = 25;
    const progress = (time + phases.offset) * 0.2;
    
    const targetX = Math.cos(progress) * radius;
    const targetY = Math.sin(progress * 0.5) * 15;
    const targetZ = Math.sin(progress) * radius - 20;
    
    shipRef.current.position.set(targetX, targetY, targetZ);
    
    // Orient rocket towards movement
    shipRef.current.lookAt(
      Math.cos(progress + 0.1) * radius,
      Math.sin((progress + 0.1) * 0.5) * 15,
      Math.sin(progress + 0.1) * radius - 20
    );
    shipRef.current.rotateX(Math.PI / 2); // Adjust for cylinder orientation
    shipRef.current.rotateY(time * 2); // Barrel roll
  });

  return (
    <group ref={shipRef}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.5, 2, 16]} />
        <meshStandardMaterial color="#FF4D4D" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.3, 0.6, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} />
      </mesh>
      {[0, 1, 2, 3].map(i => (
        <mesh key={i} position={[Math.cos(i * Math.PI/2)*0.4, -0.6, Math.sin(i * Math.PI/2)*0.4]} rotation={[0, -i * Math.PI/2, Math.PI/8]}>
          <coneGeometry args={[0.2, 1, 4]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      ))}
      <mesh position={[0, 0.3, 0.35]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshBasicMaterial color="#00D4FF" />
      </mesh>
      <mesh position={[0, -1.3, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.3, 1, 16]} />
        <meshBasicMaterial color="#FFA116" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function OrbitingSatellite() {
  const satRef = useRef<THREE.Group>(null);
  const blinkRef = useRef<THREE.MeshBasicMaterial>(null);
  
  const phases = useMemo(() => ({
    orbit: Math.random() * Math.PI * 2,
    y: Math.random() * Math.PI * 2,
    speed: 0.15 + Math.random() * 0.1
  }), []);

  useFrame((state) => {
    if (!satRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Autonomous orbit
    const orbitRadius = 22;
    const progress = time * phases.speed * 0.7 + phases.orbit;
    
    const targetX = Math.cos(progress) * orbitRadius;
    const targetY = 10 + Math.sin(time * 0.3 + phases.y) * 5;
    const targetZ = Math.sin(progress) * orbitRadius - 30;
    
    satRef.current.position.set(targetX, targetY, targetZ);
    satRef.current.rotation.x = time * 0.1;
    satRef.current.rotation.y = time * 0.15;

    if (blinkRef.current) {
      blinkRef.current.opacity = Math.sin(time * 5) > 0 ? 1 : 0.2;
    }
  });

  return (
    <group ref={satRef}>
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[2, 0.05, 0.8]} />
        <meshStandardMaterial color="#7B2FFF" metalness={0.5} roughness={0.5} emissive="#7B2FFF" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <boxGeometry args={[2, 0.05, 0.8]} />
        <meshStandardMaterial color="#7B2FFF" metalness={0.5} roughness={0.5} emissive="#7B2FFF" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial ref={blinkRef} color="#FF4D4D" transparent />
      </mesh>
    </group>
  );
}

// Extra autonomous ships for a busier cosmos
function ScoutUFO({ color = '#00FF88', speed = 0.4, orbitRadius = 12 }) {
  const shipRef = useRef<THREE.Group>(null);
  const phases = useMemo(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100
  }), []);

  useFrame((state) => {
    if (!shipRef.current) return;
    const time = state.clock.elapsedTime * speed;
    shipRef.current.position.x = Math.cos(time + phases.x) * orbitRadius;
    shipRef.current.position.y = Math.sin(time * 0.8 + phases.y) * (orbitRadius * 0.6);
    shipRef.current.position.z = Math.sin(time + phases.z) * orbitRadius - 15;
    shipRef.current.rotation.y = time * 2;
  });

  return (
    <group ref={shipRef}>
      <mesh>
        <sphereGeometry args={[0.4, 16, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
    </group>
  );
}

function VoyagerProbe() {
  const probeRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!probeRef.current) return;
    const time = state.clock.elapsedTime * 0.15;
    probeRef.current.position.x = -30 + (time * 10) % 60;
    probeRef.current.position.y = Math.sin(time) * 10;
    probeRef.current.position.z = -40;
    probeRef.current.rotation.z = time;
  });

  return (
    <group ref={probeRef}>
      <mesh>
        <boxGeometry args={[1.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#888888" metalness={1} />
      </mesh>
      <mesh position={[0.8, 0, 0]}>
        <sphereGeometry args={[0.6, 12, 12, 0, Math.PI]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  );
}

export default function CosmosBackground() {
  return (
    <group>
      <FriendlyStars />
      <FriendlyUFO />
      <ScoutUFO color="#7B2FFF" speed={0.3} orbitRadius={18} />
      <ScoutUFO color="#00FF88" speed={0.5} orbitRadius={25} />
      <CuteRocket />
      <group position={[10, -5, -15]} rotation={[0, Math.PI, 0]}>
        <CuteRocket />
      </group>
      <OrbitingSatellite />
      <VoyagerProbe />
    </group>
  );
}


