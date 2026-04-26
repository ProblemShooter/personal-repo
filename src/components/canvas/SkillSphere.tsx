'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Text, OrbitControls } from '@react-three/drei';

const skills = [
  // AI/ML - Violet
  { name: 'TensorFlow', category: 'aiml', color: '#7B2FFF' },
  { name: 'PyTorch', category: 'aiml', color: '#7B2FFF' },
  { name: 'Keras', category: 'aiml', color: '#7B2FFF' },
  { name: 'Scikit-learn', category: 'aiml', color: '#7B2FFF' },
  { name: 'Pandas', category: 'aiml', color: '#7B2FFF' },
  { name: 'NumPy', category: 'aiml', color: '#7B2FFF' },
  
  // Languages & DBs - Cyan
  { name: 'Python', category: 'lang', color: '#00D4FF' },
  { name: 'JavaScript', category: 'lang', color: '#00D4FF' },
  { name: 'TypeScript', category: 'lang', color: '#00D4FF' },
  { name: 'SQL', category: 'lang', color: '#00D4FF' },
  { name: 'MongoDB', category: 'lang', color: '#00D4FF' },

  // Frontend - Green
  { name: 'React.js', category: 'front', color: '#00FF88' },
  { name: 'Tailwind', category: 'front', color: '#00FF88' },
  { name: 'HTML5', category: 'front', color: '#00FF88' },
  { name: 'CSS3', category: 'front', color: '#00FF88' },
  { name: 'Framer', category: 'front', color: '#00FF88' },

  // Tools - Orange
  { name: 'Git', category: 'tools', color: '#FF9900' },
  { name: 'GitHub', category: 'tools', color: '#FF9900' },
  { name: 'Docker', category: 'tools', color: '#FF9900' },
  { name: 'Jupyter', category: 'tools', color: '#FF9900' },
  { name: 'VS Code', category: 'tools', color: '#FF9900' },
];

export default function SkillSphere({ activeCategory }: { activeCategory: string | null }) {
  const groupRef = useRef<THREE.Group>(null);

  const radius = 4;

  const points = useMemo(() => {
    return skills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;

      return {
        ...skill,
        position: new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ),
      };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = time * 0.05;
    }
  });

  return (
    <>
      <OrbitControls makeDefault enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      <group ref={groupRef}>
        {/* Central Core */}
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial 
            color="#00D4FF" 
            emissive="#00D4FF" 
            emissiveIntensity={0.5} 
            transparent 
            opacity={0.8} 
            wireframe 
          />
        </mesh>
        
        {/* Skill Texts */}
        {points.map((point) => {
          const isFaded = activeCategory && point.category !== activeCategory;
          
          return (
            <group key={point.name} position={point.position}>
              <Text
                fontSize={0.3}
                color={point.color}
                font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwI.woff"
                anchorX="center"
                anchorY="middle"
                fillOpacity={isFaded ? 0.2 : 0.9}
                outlineColor="#000000"
                outlineWidth={0.02}
                onPointerOver={() => { document.body.style.cursor = 'pointer' }}
                onPointerOut={() => { document.body.style.cursor = 'auto' }}
              >
                {point.name}
              </Text>
              
              {/* Connecting line to core */}
              <lineSegments>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    args={[new Float32Array([
                      0, 0, 0,
                      -point.position.x * 0.8, -point.position.y * 0.8, -point.position.z * 0.8
                    ]), 3]}
                  />
                </bufferGeometry>
                <lineBasicMaterial color={point.color} transparent opacity={isFaded ? 0.05 : 0.2} />
              </lineSegments>
            </group>
          );
        })}
      </group>
    </>
  );
}
