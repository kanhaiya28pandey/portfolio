import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface DomainRayProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}

const DomainRay: React.FC<DomainRayProps> = ({ start, end, color = '#22D3EE' }) => {
  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
    ]);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.35,
    });
    return new THREE.Line(geo, mat);
  }, [start, end, color]);

  return <primitive object={lineObj} />;
};

export const DeveloperCore: React.FC = () => {
  const globeGridRef = useRef<THREE.Mesh>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // 5 Radiant Line Targets (The 5 Domain Centers)
  const domainTargets: Array<{ target: [number, number, number]; color: string }> = [
    { target: [0, 0.3, -4.6], color: '#38BDF8' }, // Tools
    { target: [4.5, 0.2, -1.8], color: '#34D399' }, // Backend
    { target: [3.6, -0.2, 2.8], color: '#A855F7' }, // Core
    { target: [-3.5, -0.2, 3.0], color: '#22D3EE' }, // Database
    { target: [-4.4, 0.2, -1.8], color: '#60A5FA' }, // Frontend
  ];

  useFrame((_, delta) => {
    if (globeGridRef.current) {
      globeGridRef.current.rotation.y += delta * 0.15;
      globeGridRef.current.rotation.x += delta * 0.05;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.12;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.08;
    }
    if (coreSphereRef.current) {
      const t = Date.now() * 0.0016;
      const s = 1 + Math.sin(t) * 0.035;
      coreSphereRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Radiant Connection Beams to Domain Clusters */}
      {domainTargets.map((dt, idx) => (
        <DomainRay key={idx} start={[0, 0, 0]} end={dt.target} color={dt.color} />
      ))}

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group>
          {/* 2. Inner Deep Space Core Sphere */}
          <mesh ref={coreSphereRef}>
            <sphereGeometry args={[1.05, 32, 32]} />
            <meshStandardMaterial
              color="#040A18"
              emissive="#1E3A8A"
              emissiveIntensity={0.65}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.92}
            />
          </mesh>

          {/* 3. Cyber Longitude/Latitude Wireframe Globe Grid */}
          <mesh ref={globeGridRef}>
            <sphereGeometry args={[1.09, 16, 16]} />
            <meshBasicMaterial
              wireframe
              color="#22D3EE"
              transparent
              opacity={0.42}
            />
          </mesh>

          {/* 4. Glowing Concentric Orbit Rings */}
          <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0.15, 0]}>
            <ringGeometry args={[1.45, 1.48, 64]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          <mesh ref={ring2Ref} rotation={[-Math.PI / 3.2, -0.2, 0]}>
            <ringGeometry args={[1.72, 1.76, 64]} />
            <meshBasicMaterial
              color="#818CF8"
              transparent
              opacity={0.22}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* 5. Center Code Monogram </> and Developer Core Text via Html (Crash-proof) */}
          <Html position={[0, 0, 0]} center pointerEvents="none">
            <div className="flex flex-col items-center justify-center select-none text-center pointer-events-none">
              <div className="text-2xl sm:text-3xl font-mono font-black text-white drop-shadow-[0_0_12px_#38BDF8]">
                {'</>'}
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono font-bold text-cyan-400 tracking-[0.2em] whitespace-nowrap drop-shadow-[0_0_8px_rgba(34,211,238,0.7)] uppercase mt-0.5">
                DEVELOPER CORE
              </div>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  );
};
