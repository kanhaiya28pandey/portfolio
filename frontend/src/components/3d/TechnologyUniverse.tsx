import React, { useRef, useState, useEffect, useMemo, Suspense, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { DeveloperCore } from './DeveloperCore';
import { MobileTechConstellation } from '../skills/MobileTechConstellation';
import { createTechNodeTexture, getCategoryColor } from '../skills/textureHelper';
import type { Skill } from '../../types/portfolio';

// Error Boundary for Three.js WebGL rendering
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Three.js Canvas caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface TechUniverseProps {
  skills: Skill[];
  activeCategory: string;
  searchQuery?: string;
  selectedSkillId?: number | null;
  hoveredSkillId?: number | null;
  onHoverSkill?: (id: number | null) => void;
  onSelectSkill: (skill: Skill) => void;
}

// -------------------------------------------------------------
// Celestial Distant Gas Giant / Planet
// -------------------------------------------------------------
const CelestialPlanet: React.FC<{
  position: [number, number, number];
  radius: number;
  color: string;
  glowColor?: string;
  rings?: boolean;
}> = ({ position, radius, color, glowColor = '#38BDF8', rings = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.7}
          metalness={0.25}
          emissive={glowColor}
          emissiveIntensity={0.28}
        />
      </mesh>
      {rings && (
        <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
          <ringGeometry args={[radius * 1.35, radius * 1.95, 64]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// Cosmic Stardust Particles
// -------------------------------------------------------------
const StardustParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const count = 220;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#38BDF8'),
      new THREE.Color('#22D3EE'),
      new THREE.Color('#818CF8'),
      new THREE.Color('#C084FC'),
      new THREE.Color('#FFFFFF'),
    ];

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8 + Math.random() * 9;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.55;
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
};

// -------------------------------------------------------------
// Crash-proof Tilted Elliptical Orbit Track using THREE.Line via primitive
// -------------------------------------------------------------
const EllipticalOrbitTrack: React.FC<{
  xRadius: number;
  zRadius: number;
  color?: string;
  opacity?: number;
}> = ({ xRadius, zRadius, color = '#38BDF8', opacity = 0.16 }) => {
  const lineObj = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 96;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * xRadius, 0, Math.sin(theta) * zRadius));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.Line(geo, mat);
  }, [xRadius, zRadius, color, opacity]);

  return <primitive object={lineObj} />;
};

// -------------------------------------------------------------
// Domain Anchor Label in 3D Space
// -------------------------------------------------------------
const DomainLabelBadge: React.FC<{
  name: string;
  position: [number, number, number];
  color: string;
}> = ({ name, position, color }) => {
  return (
    <Html position={position} center pointerEvents="none">
      <div
        className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.25)] select-none whitespace-nowrap"
        style={{
          borderColor: `${color}50`,
          color: color,
          boxShadow: `0 0 15px ${color}33`,
        }}
      >
        {name}
      </div>
    </Html>
  );
};

// -------------------------------------------------------------
// Interactive 3D Technology Node
// -------------------------------------------------------------
interface NodeProps {
  skill: Skill;
  position: [number, number, number];
  baseScale?: number;
  isActiveCategory: boolean;
  isMatchesSearch: boolean;
  isSelected: boolean;
  isHoveredGlobally: boolean;
  onHover: (id: number | null) => void;
  onSelect: (skill: Skill) => void;
}

const TechNode: React.FC<NodeProps> = ({
  skill,
  position,
  baseScale = 1.0,
  isActiveCategory,
  isMatchesSearch,
  isSelected,
  isHoveredGlobally,
  onHover,
  onSelect,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [localHover, setLocalHover] = useState(false);

  const texture = useMemo(() => {
    return createTechNodeTexture(skill.name, skill.category);
  }, [skill.name, skill.category]);

  const { main } = getCategoryColor(skill.category);
  const isTargeted = localHover || isHoveredGlobally || isSelected;
  const isDimmed = !isActiveCategory || !isMatchesSearch;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Billboard face camera
      groupRef.current.quaternion.copy(state.camera.quaternion);

      // Scale interpolation
      let targetScale = baseScale;
      if (isTargeted) {
        targetScale = baseScale * 1.3;
      } else if (isDimmed) {
        targetScale = baseScale * 0.75;
      }
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (isTargeted ? 1.6 : 0.5);
    }
  });

  const nodeOpacity = isDimmed ? 0.16 : isTargeted ? 1.0 : 0.88;

  return (
    <group ref={groupRef} position={position}>
      {/* 1. Interactive Raycast Hit Target & 3D Glass Sphere */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setLocalHover(true);
          onHover(skill.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setLocalHover(false);
          onHover(null);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill);
        }}
      >
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color="#060E20"
          emissive={main}
          emissiveIntensity={isTargeted ? 0.95 : 0.3}
          roughness={0.15}
          metalness={0.88}
          transparent
          opacity={nodeOpacity * 0.8}
        />
      </mesh>

      {/* 2. Outer Rotating Halo Energy Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.58, 0.64, 32]} />
        <meshBasicMaterial
          color={main}
          transparent
          opacity={nodeOpacity * (isTargeted ? 0.95 : 0.5)}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Ultra-Crisp Billboard Texture Emblem */}
      <mesh position={[0, -0.05, 0.05]}>
        <planeGeometry args={[1.36, 1.36]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={nodeOpacity}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Glassmorphic Floating Tooltip on Hover */}
      {isTargeted && !isSelected && (
        <Html position={[0, 0.98, 0]} center pointerEvents="none">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-xl border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.45)] text-center whitespace-nowrap animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
            <div className="text-xs font-bold text-white tracking-wide font-sans">
              {skill.name}
            </div>
            <div className="text-[10px] font-mono font-semibold text-cyan-300 uppercase tracking-wider flex items-center justify-center gap-1.5 mt-0.5">
              <span>{skill.category}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400">{skill.proficiencyLevel}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// -------------------------------------------------------------
// Constellation Cluster Layout Map (Coordinates matching image)
// -------------------------------------------------------------
const getDomainCoordinates = (name: string, category: string): { pos: [number, number, number]; scale: number } => {
  const n = name.toLowerCase();
  const c = category?.toUpperCase() || 'CORE';

  // BACKEND Cluster (Upper Right: [4.4, 0.2, -1.8])
  if (c === 'BACKEND') {
    if (n.includes('java') && !n.includes('script')) {
      return { pos: [4.2, 0.2, -1.0], scale: 1.35 }; // Java is focal node
    }
    if (n.includes('spring boot')) return { pos: [3.4, 0.8, -2.1], scale: 1.15 };
    if (n.includes('spring security')) return { pos: [5.1, -0.2, -0.6], scale: 1.05 };
    if (n.includes('rest')) return { pos: [5.4, 0.6, -2.0], scale: 1.0 };
    if (n.includes('hibernate') || n.includes('jpa')) return { pos: [4.6, 1.1, -2.7], scale: 1.0 };
    if (n.includes('node')) return { pos: [5.7, -0.1, -1.4], scale: 1.0 };
    if (n.includes('fastapi')) return { pos: [3.5, -0.5, -0.2], scale: 0.95 };
    return { pos: [4.8, 0.0, -1.8], scale: 1.0 };
  }

  // FRONTEND Cluster (Upper Left: [-4.2, 0.2, -1.8])
  if (c === 'FRONTEND') {
    if (n.includes('react')) return { pos: [-4.4, 0.6, -2.4], scale: 1.2 };
    if (n.includes('typescript')) return { pos: [-3.3, 0.2, -1.9], scale: 1.1 };
    if (n.includes('javascript')) return { pos: [-3.9, -0.4, -1.1], scale: 1.1 };
    if (n.includes('html')) return { pos: [-5.1, -0.3, -1.5], scale: 1.05 };
    return { pos: [-4.2, 0.0, -1.8], scale: 1.0 };
  }

  // TOOLS Cluster (Top Center: [0, 0.4, -4.6])
  if (c === 'TOOLS') {
    if (n.includes('github') || n.includes('git')) {
      if (n.includes('github')) return { pos: [-1.4, 0.6, -4.4], scale: 1.1 };
      return { pos: [0.5, 0.5, -4.6], scale: 1.05 };
    }
    if (n.includes('docker')) return { pos: [-0.4, 0.9, -5.1], scale: 1.1 };
    if (n.includes('vscode') || n.includes('vs code')) return { pos: [1.5, 0.7, -4.9], scale: 1.05 };
    if (n.includes('postman')) return { pos: [2.2, 0.3, -4.2], scale: 1.05 };
    return { pos: [0.0, 0.5, -4.5], scale: 1.0 };
  }

  // DATABASE Cluster (Lower Left: [-3.5, -0.2, 2.8])
  if (c === 'DATABASE') {
    if (n.includes('postgres')) return { pos: [-4.1, 0.2, 2.1], scale: 1.2 };
    if (n.includes('mysql')) return { pos: [-3.4, -0.4, 2.8], scale: 1.1 };
    if (n.includes('mongo')) return { pos: [-2.6, -0.2, 3.4], scale: 1.1 };
    return { pos: [-3.5, -0.2, 2.8], scale: 1.0 };
  }

  // CORE Cluster (Lower Right: [3.5, -0.2, 2.8])
  if (c === 'CORE') {
    if (n.includes('dsa')) return { pos: [3.0, -0.4, 2.1], scale: 1.15 };
    if (n.includes('problem')) return { pos: [3.6, -0.6, 3.2], scale: 1.15 };
    if (n.includes('oop')) return { pos: [4.2, -0.1, 2.5], scale: 1.1 };
    if (n.includes('python')) return { pos: [4.6, -0.5, 3.4], scale: 1.1 };
    if (n.includes('c++') || n.includes('cpp')) return { pos: [2.4, -0.2, 3.2], scale: 1.05 };
    return { pos: [3.5, -0.2, 2.8], scale: 1.0 };
  }

  return { pos: [0, 0, 0], scale: 1.0 };
};

// -------------------------------------------------------------
// Constellation Scene Component
// -------------------------------------------------------------
const ConstellationScene: React.FC<{
  skills: Skill[];
  activeCategory: string;
  searchQuery?: string;
  selectedSkillId?: number | null;
  hoveredSkillId?: number | null;
  onHoverSkill?: (id: number | null) => void;
  onSelectSkill: (skill: Skill) => void;
}> = ({
  skills,
  activeCategory,
  searchQuery = '',
  selectedSkillId,
  hoveredSkillId,
  onHoverSkill,
  onSelectSkill,
}) => {
  const checkActiveCategory = (cat: string) => {
    return activeCategory === 'ALL' || activeCategory.toUpperCase() === cat.toUpperCase();
  };

  const checkSearchMatch = (name: string, cat: string) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return name.toLowerCase().includes(q) || cat.toLowerCase().includes(q);
  };

  // Gentle Mouse Parallax Camera Adjustment
  useFrame((state) => {
    const targetCamX = state.pointer.x * 0.9;
    const targetCamY = 5.0 - state.pointer.y * 0.6;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <pointLight position={[0, 0, 0]} intensity={2.0} color="#22D3EE" distance={16} />
      <pointLight position={[8, 10, 8]} intensity={1.2} color="#3B82F6" />
      <pointLight position={[-8, -8, -8]} intensity={0.8} color="#8B5CF6" />

      {/* Cosmic Stardust Particles */}
      <StardustParticles />

      {/* Distant Celestial Planets (Top-Left and Top-Right as in image) */}
      <CelestialPlanet position={[-8.4, 3.6, -6.5]} radius={1.4} color="#0E3666" glowColor="#38BDF8" rings />
      <CelestialPlanet position={[7.6, 3.8, -7.5]} radius={0.65} color="#1E293B" glowColor="#60A5FA" />
      <CelestialPlanet position={[6.2, -3.2, -4.8]} radius={0.5} color="#2E1065" glowColor="#A855F7" />

      {/* Concentric Tilted Elliptical Orbit Tracks */}
      <group rotation={[Math.PI / 3.4, 0, -0.22]}>
        <EllipticalOrbitTrack xRadius={4.2} zRadius={3.0} color="#38BDF8" opacity={0.25} />
        <EllipticalOrbitTrack xRadius={6.2} zRadius={4.8} color="#818CF8" opacity={0.18} />
        <EllipticalOrbitTrack xRadius={7.8} zRadius={6.2} color="#34D399" opacity={0.14} />
      </group>

      {/* Developer Core Centerpiece */}
      <DeveloperCore />

      {/* 5 Domain Headings in 3D Space */}
      <DomainLabelBadge name="Tools" position={[0, 1.4, -4.6]} color="#38BDF8" />
      <DomainLabelBadge name="Backend" position={[4.2, 1.4, -1.8]} color="#34D399" />
      <DomainLabelBadge name="Core" position={[3.5, 0.9, 2.7]} color="#C084FC" />
      <DomainLabelBadge name="Database" position={[-3.5, 0.9, 2.7]} color="#22D3EE" />
      <DomainLabelBadge name="Frontend" position={[-4.0, 1.4, -1.8]} color="#60A5FA" />

      {/* 23 Authentic Technology Nodes Clustered by Domain */}
      {skills.map((skill) => {
        const { pos, scale } = getDomainCoordinates(skill.name, skill.category);
        const isActiveCat = checkActiveCategory(skill.category);
        const isSearchMatch = checkSearchMatch(skill.name, skill.category);

        return (
          <TechNode
            key={skill.id}
            skill={skill}
            position={pos}
            baseScale={scale}
            isActiveCategory={isActiveCat}
            isMatchesSearch={isSearchMatch}
            isSelected={selectedSkillId === skill.id}
            isHoveredGlobally={hoveredSkillId === skill.id}
            onHover={(id) => onHoverSkill && onHoverSkill(id)}
            onSelect={onSelectSkill}
          />
        );
      })}
    </>
  );
};

// -------------------------------------------------------------
// Main Technology Universe Export
// -------------------------------------------------------------
export const TechnologyUniverse: React.FC<TechUniverseProps> = ({
  skills,
  activeCategory,
  searchQuery,
  selectedSkillId,
  hoveredSkillId,
  onHoverSkill,
  onSelectSkill,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <MobileTechConstellation
        skills={skills}
        activeCategory={activeCategory}
        onSelectSkill={onSelectSkill}
      />
    );
  }

  const fallbackConstellation = (
    <MobileTechConstellation
      skills={skills}
      activeCategory={activeCategory}
      onSelectSkill={onSelectSkill}
    />
  );

  return (
    <CanvasErrorBoundary fallback={fallbackConstellation}>
      <div className="relative w-full h-[460px] sm:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden border border-blue-500/25 bg-gradient-to-b from-[#040816] via-[#070F22] to-[#0A1226] shadow-[0_20px_60px_rgba(0,0,0,0.75)]">
        {/* Ambient Depth Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Three.js Canvas wrapped with Suspense */}
        <Canvas
          camera={{ position: [0, 5.0, 9.4], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ConstellationScene
              skills={skills}
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              selectedSkillId={selectedSkillId}
              hoveredSkillId={hoveredSkillId}
              onHoverSkill={onHoverSkill}
              onSelectSkill={onSelectSkill}
            />
            <OrbitControls
              enableZoom={true}
              maxDistance={14}
              minDistance={6}
              enablePan={false}
              autoRotate={false}
              maxPolarAngle={Math.PI / 1.85}
              minPolarAngle={Math.PI / 3.2}
              rotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>

        {/* Mouse Interaction Indicator Hint (Matches image bottom banner) */}
        <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/70 border border-cyan-500/30 text-[11px] font-mono text-slate-300 shadow-sm">
            <span className="w-2.5 h-3.5 border border-cyan-400 rounded-sm inline-block relative after:content-[''] after:w-0.5 after:h-1 after:bg-cyan-400 after:absolute after:top-0.5 after:left-1/2 after:-translate-x-1/2" />
            <span>Click any technology to explore</span>
            <span className="text-slate-500">•</span>
            <span>Drag to rotate</span>
            <span className="text-slate-500">•</span>
            <span>Scroll to zoom</span>
          </div>
        </div>
      </div>
    </CanvasErrorBoundary>
  );
};
