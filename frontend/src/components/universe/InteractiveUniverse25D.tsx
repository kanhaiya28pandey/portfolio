import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { TechLogo } from '../common/TechIcons';
import { getCategoryTheme, areTechnologiesRelated } from '../../utils/techRelationships';
import { useTheme } from '../../context/ThemeContext';
import type { Skill } from '../../types/portfolio';

interface InteractiveUniverse25DProps {
  skills: Skill[];
  activeCategory: string;
  searchQuery: string;
  selectedSkill: Skill | null;
  hoveredSkillId: number | null;
  onHoverSkill: (id: number | null) => void;
  onSelectSkill: (skill: Skill) => void;
  className?: string;
}

interface OrbitNodePosition {
  skill: Skill;
  orbitIndex: number; // 0: inner, 1: middle, 2: outer
  rx: number;
  ry: number;
  baseAngle: number;
}

export const InteractiveUniverse25D: React.FC<InteractiveUniverse25DProps> = ({
  skills,
  activeCategory,
  searchQuery,
  selectedSkill,
  hoveredSkillId,
  onHoverSkill,
  onSelectSkill,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Parallax & Interactive 3D Rotation Controls
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Offscreen visibility tracking to pause RAF loop and save mobile battery/CPU
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { rootMargin: '120px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Continuous Cinematic Orbital Motion Clock - Throttled smoothly on mobile
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let lastRenderTime = performance.now();

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    // On mobile screens, throttle state updates to ~35fps (28ms) to save CPU & touch threads; desktop runs at full 60fps
    const minFrameInterval = isMobile ? 28 : 16;

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Only perform React state updates if universe is currently visible in viewport
      if (isVisibleRef.current && !isDragging && time - lastRenderTime >= minFrameInterval) {
        lastRenderTime = time;
        // Cosmic rotation (11.5 deg/sec); gracefully slows to 3.8 deg/sec on hover/selection
        const speed = hoveredSkillId || selectedSkill ? 3.8 : 11.5;
        setRotationAngle((prev) => (prev + delta * speed) % 360);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging, hoveredSkillId, selectedSkill]);

  // 3 Elliptical Orbit Radii (rx, ry) calibrated for widescreen perspective
  const ORBIT_CONFIGS = [
    { rx: 185, ry: 100, speedMultiplier: 1.18 },  // Inner Orbit
    { rx: 295, ry: 160, speedMultiplier: 1.0 },   // Middle Orbit
    { rx: 405, ry: 220, speedMultiplier: 0.82 },  // Outer Orbit
  ];

  // Scattered & Interleaved Distribution: Categories thoroughly mixed across all 3 orbits
  const baseNodes: OrbitNodePosition[] = useMemo(() => {
    if (!skills || skills.length === 0) return [];

    // Group skills dynamically by whatever category they have
    const byCategory: Record<string, Skill[]> = {};
    skills.forEach((skill) => {
      const cat = skill.category?.trim().toUpperCase() || 'CORE';
      if (!byCategory[cat]) {
        byCategory[cat] = [];
      }
      byCategory[cat].push(skill);
    });

    // Determine category sequence: common categories first, followed by any new custom categories
    const standardKeys = ['FRONTEND', 'BACKEND', 'CORE', 'DATABASE', 'TOOLS'];
    const customKeys = Object.keys(byCategory).filter((k) => !standardKeys.includes(k));
    const allCatKeys = [
      ...standardKeys.filter((k) => byCategory[k] && byCategory[k].length > 0),
      ...customKeys,
    ];

    // Interleave categories so skills from the same category are dispersed across orbits
    const interleaved: Skill[] = [];
    let remaining = true;
    let ptr = 0;
    while (remaining) {
      remaining = false;
      for (const k of allCatKeys) {
        if (ptr < byCategory[k].length) {
          interleaved.push(byCategory[k][ptr]);
          remaining = true;
        }
      }
      ptr++;
    }

    // Dynamically distribute skills across 3 orbits with balanced proportions
    const total = interleaved.length;
    const count0 = Math.floor(total / 3);
    const count1 = Math.floor((total - count0) / 2);
    const count2 = total - count0 - count1;

    const orbitDistribution = [
      { orbitIndex: 0, count: count0, startAngle: 15 },
      { orbitIndex: 1, count: count1, startAngle: 42 },
      { orbitIndex: 2, count: count2, startAngle: 75 },
    ];

    const result: OrbitNodePosition[] = [];
    let cursor = 0;
    orbitDistribution.forEach(({ orbitIndex, count, startAngle }) => {
      if (count <= 0) return;
      const conf = ORBIT_CONFIGS[orbitIndex];
      const step = 360 / count;

      for (let i = 0; i < count && cursor < interleaved.length; i++) {
        const skill = interleaved[cursor++];
        const baseAngle = (startAngle + i * step) % 360;

        result.push({
          skill,
          orbitIndex,
          rx: conf.rx,
          ry: conf.ry,
          baseAngle,
        });
      }
    });

    // Remainder handling if any leftovers exist
    while (cursor < interleaved.length) {
      const skill = interleaved[cursor++];
      const orbitIndex = cursor % 3;
      const conf = ORBIT_CONFIGS[orbitIndex];
      const baseAngle = (cursor * 41) % 360;

      result.push({
        skill,
        orbitIndex,
        rx: conf.rx,
        ry: conf.ry,
        baseAngle,
      });
    }

    return result;
  }, [skills]);

  // Viewport Center Constants
  const VIEW_W = 940;
  const VIEW_H = 550;
  const CENTER_X = VIEW_W / 2;
  const CENTER_Y = VIEW_H / 2;

  // Mouse Drag Handlers (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    setRotationAngle((prev) => prev - dx * 0.35);
    setPanOffset((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x + dx * 0.12)),
      y: Math.max(-40, Math.min(40, prev.y + dy * 0.12)),
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Drag Handlers (Mobile & Tablet - preserves native vertical page scroll)
  const isTouchScrollingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isTouchScrollingRef.current = false;
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1 || isTouchScrollingRef.current) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;

    // If vertical movement dominates or is equal, user is scrolling vertically.
    // Immediately release universe drag so the mobile browser scrolls fluidly without any drag resistance.
    if (Math.abs(dy) >= Math.abs(dx) && Math.abs(dy) > 2) {
      isTouchScrollingRef.current = true;
      setIsDragging(false);
      return;
    }

    // Only horizontal swipe rotates the constellation
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setRotationAngle((prev) => prev - dx * 0.4);
    setPanOffset((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x + dx * 0.15)),
      y: prev.y,
    }));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    isTouchScrollingRef.current = false;
  };

  const resetView = () => {
    setPanOffset({ x: 0, y: 0 });
    setRotationAngle(0);
  };

  // Compute live 3D coordinates, orbital movement, and depth attributes for each node
  const computedNodes = useMemo(() => {
    return baseNodes.map((item) => {
      const speed = ORBIT_CONFIGS[item.orbitIndex].speedMultiplier;
      const curAngle = (item.baseAngle + rotationAngle * speed) % 360;
      const rad = (curAngle * Math.PI) / 180;
      const x = CENTER_X + item.rx * Math.cos(rad);
      const y = CENTER_Y - item.ry * Math.sin(rad);

      // Depth Factor: -1 (furthest background) to +1 (closest foreground)
      const sinVal = Math.sin(rad);
      const depthFactor = -sinVal;

      // True 3D Visual Scale (Enlarged by ~15-20%):
      // Foreground nodes: 1.15x – 1.22x | Middle: 1.0x | Background: 0.78x – 0.82x
      const visualScale =
        depthFactor >= 0
          ? 1.0 + depthFactor * 0.22
          : 1.0 + depthFactor * 0.22;

      // Depth Opacity (Always high visibility, never disappears)
      const depthOpacity = depthFactor >= 0 ? 1.0 : 0.78 + (1 + depthFactor) * 0.15;
      const blurPx = depthFactor < -0.4 ? Math.abs(depthFactor) * 0.8 : 0;

      return {
        ...item,
        x,
        y,
        depthFactor,
        visualScale,
        depthOpacity,
        blurPx,
        isForeground: depthFactor >= 0,
      };
    });
  }, [baseNodes, rotationAngle]);

  // Separate background nodes and foreground nodes for true 3D occlusion layering
  const backgroundNodes = useMemo(
    () => computedNodes.filter((n) => !n.isForeground).sort((a, b) => a.depthFactor - b.depthFactor),
    [computedNodes]
  );
  const foregroundNodes = useMemo(
    () => computedNodes.filter((n) => n.isForeground).sort((a, b) => a.depthFactor - b.depthFactor),
    [computedNodes]
  );

  // Selected skill position for laser connection beam
  const selectedNodePos = useMemo(() => {
    if (!selectedSkill) return null;
    const found = computedNodes.find((n) => n.skill.id === selectedSkill.id);
    if (!found) return null;
    return { x: found.x, y: found.y };
  }, [selectedSkill, computedNodes]);

  // Render an individual planetary node
  const renderNode = (item: (typeof computedNodes)[0]) => {
    const { skill, x, y, visualScale, depthOpacity, blurPx } = item;
    const isSelected = selectedSkill?.id === skill.id;
    const isHovered = hoveredSkillId === skill.id;
    const isRelated = selectedSkill
      ? areTechnologiesRelated(selectedSkill.name, skill.name)
      : false;

    const matchesCategory =
      activeCategory === 'ALL' ||
      skill.category?.toUpperCase() === activeCategory.toUpperCase();

    const matchesSearch =
      !searchQuery ||
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Inactive nodes remain clearly visible (minimum 0.72 opacity)
    let finalOpacity = depthOpacity;
    if (!matchesCategory || !matchesSearch) {
      finalOpacity = 0.45;
    } else if (selectedSkill && !isSelected && !isRelated) {
      finalOpacity = 0.72;
    }

    const theme = getCategoryTheme(skill.category);
    // Persistent tag over Java (as in Pic 1) or when hovered/selected
    const showPillTag = isSelected || isHovered || skill.name.toLowerCase() === 'java';

    return (
      <g
        key={skill.id}
        transform={`translate(${x}, ${y}) scale(${visualScale})`}
        className="cursor-pointer"
        onClick={() => onSelectSkill(skill)}
        onMouseEnter={() => onHoverSkill(skill.id)}
        onMouseLeave={() => onHoverSkill(null)}
        style={{
          opacity: finalOpacity,
          filter: blurPx > 0 ? `blur(${blurPx}px)` : undefined,
          transition: 'opacity 0.25s ease-out, filter 0.25s ease-out',
        }}
      >
        {/* Floating Bob Animation */}
        <motion.g
          animate={{ y: [-2, 2, -2] }}
          transition={{
            duration: 3.2 + (skill.id % 3) * 0.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Glowing Aura Ring when Selected / Hovered / Related */}
          {(isSelected || isHovered || isRelated) && (
            <circle
              cx="0"
              cy="0"
              r="37"
              fill="none"
              stroke={isSelected ? '#00F0FF' : isRelated ? '#38BDF8' : theme.main}
              strokeWidth="3"
              filter="url(#laserBeamGlow)"
              className={isSelected ? 'animate-pulse' : ''}
            />
          )}

          {/* Frosted Glass Background Disc (Enlarged to r=30 for maximum visibility) */}
          <circle
            cx="0"
            cy="0"
            r="30"
            fill={isDark ? 'rgba(10, 18, 44, 0.96)' : 'rgba(11, 22, 54, 0.96)'}
            stroke={
              isSelected
                ? '#00F0FF'
                : isHovered
                ? '#38BDF8'
                : isDark
                ? 'rgba(56, 189, 248, 0.75)'
                : theme.main || '#38BDF8'
            }
            strokeWidth={isSelected ? '3.2' : isHovered ? '2.8' : '2.2'}
            style={{
              filter: `drop-shadow(0 6px 18px ${
                isSelected
                  ? '#00F0FF'
                  : isHovered
                  ? theme.glow
                  : 'rgba(0,0,0,0.85)'
              })`,
            }}
          />

          {/* Inner Highlight Rim */}
          <circle
            cx="0"
            cy="0"
            r="27"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="1.2"
          />

          {/* Vivid Tech Logo (Enlarged to 34x34) */}
          <foreignObject
            x="-17"
            y="-17"
            width="34"
            height="34"
            className="pointer-events-none overflow-visible"
          >
            <div className="w-full h-full flex items-center justify-center filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.55)]">
              <TechLogo
                name={skill.name}
                iconKey={skill.iconKey}
                className="w-8 h-8 sm:w-9 sm:h-9"
              />
            </div>
          </foreignObject>

          {/* Name label pill directly under EVERY planet for crystal-clear readability */}
          <g transform="translate(0, 39)" className="pointer-events-none">
            <rect
              x={-(skill.name.length * 3.7 + 7)}
              y="-9"
              width={skill.name.length * 7.4 + 14}
              height="18"
              rx="9"
              fill={isSelected ? '#00F0FF' : isHovered ? '#0B1530' : 'rgba(7, 14, 34, 0.92)'}
              stroke={isSelected ? '#00F0FF' : isHovered ? '#38BDF8' : 'rgba(255, 255, 255, 0.22)'}
              strokeWidth={isSelected ? '1.5' : '1'}
              style={{
                filter: isSelected
                  ? 'drop-shadow(0 0 10px rgba(0,240,255,0.7))'
                  : 'drop-shadow(0 2px 6px rgba(0,0,0,0.85))',
              }}
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              className={`font-mono font-bold text-[10px] tracking-wider ${
                isSelected ? 'fill-slate-950' : 'fill-white'
              }`}
            >
              {skill.name}
            </text>
          </g>

          {/* Top Pill Tag on Java or when Selected */}
          {showPillTag && (
            <g transform="translate(0, -42)" className="pointer-events-none">
              <rect
                x={-(skill.name.length * 4.6 + 10)}
                y="-12"
                width={skill.name.length * 9.2 + 20}
                height="22"
                rx="11"
                fill="#050B1A"
                stroke={isSelected ? '#00F0FF' : '#38BDF8'}
                strokeWidth="1.5"
                style={{
                  filter: 'drop-shadow(0 2px 10px rgba(0,240,255,0.5))',
                }}
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                className="font-mono font-bold text-[11px] tracking-wide fill-white"
              >
                {skill.name}
              </text>
            </g>
          )}
        </motion.g>
      </g>
    );
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
      className={`relative w-full h-[500px] sm:h-[540px] lg:h-[570px] rounded-2xl overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y transition-colors duration-300 ${
        isDark
          ? 'bg-[#030714] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
          : 'bg-[#050B1E] border-2 border-slate-300/80 shadow-[0_20px_50px_rgba(15,23,42,0.18)]'
      } ${className}`}
    >
      {/* CSS Keyframes for Real Universe Cosmic Movement */}
      <style>{`
        @keyframes cosmicMeteor1 {
          0% { transform: translate(500px, -100px) rotate(-35deg) scaleX(0); opacity: 0; }
          12% { opacity: 1; transform: translate(280px, 40px) rotate(-35deg) scaleX(1); }
          28% { transform: translate(-80px, 280px) rotate(-35deg) scaleX(0.7); opacity: 0; }
          100% { transform: translate(-80px, 280px) rotate(-35deg) scaleX(0); opacity: 0; }
        }
        @keyframes cosmicMeteor2 {
          0% { transform: translate(600px, -40px) rotate(-32deg) scaleX(0); opacity: 0; }
          10% { opacity: 0.95; transform: translate(360px, 120px) rotate(-32deg) scaleX(1); }
          26% { transform: translate(40px, 360px) rotate(-32deg) scaleX(0.6); opacity: 0; }
          100% { transform: translate(40px, 360px) rotate(-32deg) scaleX(0); opacity: 0; }
        }
        @keyframes cosmicMeteor3 {
          0% { transform: translate(680px, 60px) rotate(-38deg) scaleX(0); opacity: 0; }
          14% { opacity: 0.85; transform: translate(400px, 250px) rotate(-38deg) scaleX(1); }
          30% { transform: translate(80px, 490px) rotate(-38deg) scaleX(0.65); opacity: 0; }
          100% { transform: translate(80px, 490px) rotate(-38deg) scaleX(0); opacity: 0; }
        }
        @keyframes asteroidDriftA {
          0% { transform: translate(-100px, 60px) rotate(0deg); }
          100% { transform: translate(1060px, 130px) rotate(360deg); }
        }
        @keyframes asteroidDriftB {
          0% { transform: translate(1050px, 430px) rotate(360deg); }
          100% { transform: translate(-120px, 360px) rotate(0deg); }
        }
        @keyframes asteroidDriftC {
          0% { transform: translate(250px, -60px) rotate(0deg); }
          100% { transform: translate(750px, 620px) rotate(540deg); }
        }
      `}</style>

      {/* 1. Deep Space Nebula, Meteors & Ambient Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Violet Nebula top-left */}
        <div className="absolute -top-24 -left-20 w-[440px] h-[440px] rounded-full blur-[100px] bg-purple-600/20" />
        {/* Electric Blue/Cyan Nebula center-bottom */}
        <div className="absolute top-1/3 left-1/4 w-[560px] h-[360px] rounded-full blur-[110px] bg-cyan-500/18" />
        {/* Royal Blue Nebula right */}
        <div className="absolute -bottom-20 -right-20 w-[460px] h-[460px] rounded-full blur-[100px] bg-blue-700/20" />

        {/* Real Universe Passing Meteorites / Shooting Stars */}
        <div
          className="absolute top-0 right-1/4 w-36 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-white shadow-[0_0_12px_#38bdf8] pointer-events-none"
          style={{ animation: 'cosmicMeteor1 4.2s cubic-bezier(0.25, 1, 0.5, 1) infinite' }}
        />
        <div
          className="absolute top-10 right-1/3 w-28 h-[1.8px] rounded-full bg-gradient-to-r from-transparent via-purple-400 to-white shadow-[0_0_10px_#a855f7] pointer-events-none"
          style={{ animation: 'cosmicMeteor2 6.5s cubic-bezier(0.25, 1, 0.5, 1) infinite 1.8s' }}
        />
        <div
          className="absolute top-20 right-10 w-32 h-[2px] rounded-full bg-gradient-to-r from-transparent via-amber-300 to-white shadow-[0_0_10px_#f59e0b] pointer-events-none"
          style={{ animation: 'cosmicMeteor3 5.5s cubic-bezier(0.25, 1, 0.5, 1) infinite 3.2s' }}
        />

        {/* Real Universe Passing Space Stones / Tumbling Asteroids */}
        {/* Asteroid 1: Rocky Charcoal Asteroid */}
        <div
          className="absolute top-0 left-0 w-8 h-8 pointer-events-none opacity-80"
          style={{ animation: 'asteroidDriftA 26s linear infinite' }}
        >
          <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            <polygon points="12,4 28,6 36,18 32,32 18,36 6,26 4,14" fill="#334155" stroke="#64748B" strokeWidth="1.2" />
            <polygon points="12,4 22,14 18,36 6,26" fill="#1E293B" opacity="0.6" />
            <circle cx="16" cy="18" r="2.5" fill="#0F172A" />
            <circle cx="26" cy="24" r="1.5" fill="#0F172A" />
          </svg>
        </div>

        {/* Asteroid 2: Cratered Stone Asteroid */}
        <div
          className="absolute top-0 left-0 w-6 h-6 pointer-events-none opacity-75"
          style={{ animation: 'asteroidDriftB 32s linear infinite 4s' }}
        >
          <svg viewBox="0 0 30 30" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            <polygon points="10,2 22,5 28,15 22,26 8,28 3,18 5,8" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
            <polygon points="10,2 18,12 8,28 3,18" fill="#0F172A" opacity="0.5" />
            <circle cx="14" cy="16" r="2" fill="#020617" />
          </svg>
        </div>

        {/* Asteroid 3: Fast Micro-Meteorite Stone */}
        <div
          className="absolute top-0 left-0 w-4 h-4 pointer-events-none opacity-65"
          style={{ animation: 'asteroidDriftC 18s linear infinite 8s' }}
        >
          <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            <polygon points="6,2 16,4 18,14 10,18 2,12 3,6" fill="#64748B" stroke="#CBD5E1" strokeWidth="0.8" />
          </svg>
        </div>

        {/* Distant Starfield & Micro Coordinates */}
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 45px 80px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 120px 220px, #38bdf8, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 280px 70px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 350px 380px, #a855f7, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 520px 90px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 680px 240px, #38bdf8, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 780px 110px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 850px 420px, #38bdf8, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 210px 480px, #ffffff, rgba(0,0,0,0))
            `,
            backgroundSize: '100% 100%',
          }}
        />

        {/* 4-Point Sparkling Diamond Star Glints */}
        <div className="absolute top-28 left-[44%] text-xs animate-pulse opacity-75 text-amber-300">✦</div>
        <div className="absolute top-16 right-[38%] text-sm animate-pulse opacity-85 text-cyan-400">✦</div>
        <div className="absolute bottom-28 left-[28%] text-xs animate-pulse opacity-70 text-blue-400">✦</div>
        <div className="absolute top-44 left-[15%] text-xs animate-pulse opacity-60 text-purple-400">✦</div>
        <div className="absolute bottom-36 right-[22%] text-xs animate-pulse opacity-70 text-amber-300">✦</div>

        {/* Distant Celestial Moons / Small Planets */}
        <div className="absolute top-28 left-[24%] w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 via-orange-600 to-amber-950 shadow-[0_0_12px_rgba(245,158,11,0.5)] opacity-80 pointer-events-none" />
        <div className="absolute top-36 right-[14%] w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 via-indigo-700 to-slate-950 shadow-[0_0_20px_rgba(168,85,247,0.4)] opacity-75 pointer-events-none" />
        <div className="absolute bottom-20 left-[51%] w-4 h-4 rounded-full bg-gradient-to-br from-amber-600 to-slate-900 shadow-[0_0_8px_rgba(217,119,6,0.4)] opacity-70 pointer-events-none" />
      </div>

      {/* 2. Interactive Scalable 3D Constellation Canvas (No Zoom) */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
        }}
      >
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-full max-w-[1080px] max-h-[640px] overflow-visible"
        >
          <defs>
            {/* Laser Glow Filter */}
            <filter id="laserBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="8" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Core Planet Spherical Gradient */}
            <radialGradient id="kpPlanetGrad" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="40%" stopColor="#1D4ED8" />
              <stop offset="75%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>

            {/* Saturn Ring Linear Gradient */}
            <linearGradient id="saturnRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#6366F1" stopOpacity="1" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.95" />
            </linearGradient>

            {/* Radiant Orbit Dash Gradient */}
            <linearGradient id="orbitTrackDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#818CF8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* ======================================================================= */}
          {/* LAYER 1: BACK ORBIT ARCS (Passing Behind Core in 3D Depth)             */}
          {/* ======================================================================= */}
          {ORBIT_CONFIGS.map((conf, idx) => (
            <path
              key={`back-orbit-${idx}`}
              d={`M ${CENTER_X - conf.rx} ${CENTER_Y} A ${conf.rx} ${conf.ry} 0 0 1 ${CENTER_X + conf.rx} ${CENTER_Y}`}
              fill="none"
              stroke={idx === 0 ? 'url(#orbitTrackDark)' : idx === 1 ? '#60A5FA' : '#A855F7'}
              strokeWidth="2.0"
              strokeDasharray="5 7"
              className="opacity-40"
            />
          ))}

          {/* ======================================================================= */}
          {/* LAYER 2: BACKGROUND NODES (Passing Behind Core)                         */}
          {/* ======================================================================= */}
          {backgroundNodes.map((item) => renderNode(item))}

          {/* ======================================================================= */}
          {/* LAYER 3: CENTRAL SATURNIAN DEVELOPER CORE (KP Planet & Rings)          */}
          {/* ======================================================================= */}
          <g
            className="cursor-pointer group"
            onClick={() =>
              onSelectSkill(
                skills.find((s) => s.name.toLowerCase().includes('java')) || skills[0]
              )
            }
          >
            {/* Atmospheric Blue Glow Behind Core */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="66"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="9"
              filter="url(#laserBeamGlow)"
              className="opacity-45 animate-pulse"
            />

            {/* Back Portion of Saturn Ring (behind planet body) */}
            <g transform={`rotate(-18 ${CENTER_X} ${CENTER_Y})`}>
              <ellipse
                cx={CENTER_X}
                cy={CENTER_Y}
                rx="112"
                ry="38"
                fill="none"
                stroke="url(#saturnRingGrad)"
                strokeWidth="13"
                strokeDasharray="160 300"
                strokeDashoffset="140"
                filter="url(#laserBeamGlow)"
                className="opacity-80"
              />
            </g>

            {/* Central Spherical Planet Body */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r="55"
              fill="url(#kpPlanetGrad)"
              stroke="#00F0FF"
              strokeWidth="2.5"
              className="filter drop-shadow-[0_0_38px_rgba(0,240,255,0.7)] group-hover:scale-105 transition-transform"
            />

            {/* Front Portion of Saturn Ring (in front of planet body) */}
            <g transform={`rotate(-18 ${CENTER_X} ${CENTER_Y})`}>
              <ellipse
                cx={CENTER_X}
                cy={CENTER_Y}
                rx="112"
                ry="38"
                fill="none"
                stroke="url(#saturnRingGrad)"
                strokeWidth="13"
                strokeDasharray="160 300"
                strokeDashoffset="-20"
                filter="url(#laserBeamGlow)"
                className="opacity-95"
              />
              <ellipse
                cx={CENTER_X}
                cy={CENTER_Y}
                rx="122"
                ry="42"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                className="opacity-50"
              />
            </g>

            {/* Typography inside Planet Core */}
            <text
              x={CENTER_X}
              y={CENTER_Y - 4}
              textAnchor="middle"
              className="fill-white font-mono font-black text-2xl tracking-wider select-none pointer-events-none"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.85))' }}
            >
              KP
            </text>
            <text
              x={CENTER_X}
              y={CENTER_Y + 13}
              textAnchor="middle"
              className="fill-cyan-300 font-mono font-bold text-[9px] tracking-[0.24em] uppercase select-none pointer-events-none"
              style={{ filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.8))' }}
            >
              DEVELOPER
            </text>
            <text
              x={CENTER_X}
              y={CENTER_Y + 24}
              textAnchor="middle"
              className="fill-slate-100 font-mono font-bold text-[8.5px] tracking-[0.24em] uppercase select-none pointer-events-none"
              style={{ filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.8))' }}
            >
              CORE
            </text>
          </g>

          {/* ======================================================================= */}
          {/* LAYER 4: FRONT ORBIT ARCS (Bright, High-Contrast in Front of Core)     */}
          {/* ======================================================================= */}
          {ORBIT_CONFIGS.map((conf, idx) => (
            <path
              key={`front-orbit-${idx}`}
              d={`M ${CENTER_X + conf.rx} ${CENTER_Y} A ${conf.rx} ${conf.ry} 0 0 1 ${CENTER_X - conf.rx} ${CENTER_Y}`}
              fill="none"
              stroke={idx === 0 ? 'url(#orbitTrackDark)' : idx === 1 ? '#60A5FA' : '#A855F7'}
              strokeWidth="3.0"
              strokeDasharray="5 7"
              className="opacity-95"
            />
          ))}

          {/* Cosmic Energy Particles running continuously in orbits */}
          {ORBIT_CONFIGS.map((conf, idx) => {
            const orbAngle = (rotationAngle * (conf.speedMultiplier * 2.2) + idx * 120) % 360;
            const orbRad = (orbAngle * Math.PI) / 180;
            const orbX = CENTER_X + conf.rx * Math.cos(orbRad);
            const orbY = CENTER_Y - conf.ry * Math.sin(orbRad);
            const orbColor = idx === 0 ? '#00F0FF' : idx === 1 ? '#C084FC' : '#F59E0B';
            return (
              <g key={`energy-particle-${idx}`} transform={`translate(${orbX}, ${orbY})`}>
                <circle cx="0" cy="0" r="5" fill={orbColor} filter="url(#laserBeamGlow)" className="animate-pulse" />
                <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
              </g>
            );
          })}

          {/* ======================================================================= */}
          {/* LAYER 5: FOCUS LASER BEAM (Connecting Selected Node to KP Core)        */}
          {/* ======================================================================= */}
          {selectedNodePos && (
            <motion.line
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={selectedNodePos.x}
              y2={selectedNodePos.y}
              stroke="#00F0FF"
              strokeWidth="3"
              filter="url(#laserBeamGlow)"
              strokeLinecap="round"
            />
          )}

          {/* ======================================================================= */}
          {/* LAYER 6: FOREGROUND NODES (Razor Sharp in Front of Core)                */}
          {/* ======================================================================= */}
          {foregroundNodes.map((item) => renderNode(item))}
        </svg>
      </div>

      {/* 3. Bottom Minimal Controls Bar (Responsive on all screen sizes, No Zoom) */}
      <div className="absolute bottom-3.5 inset-x-0 flex items-center justify-between px-4 sm:px-6 pointer-events-none z-30">
        {/* Instruction pill */}
        <div
          className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono shadow-lg backdrop-blur-md transition-colors ${
            isDark
              ? 'bg-slate-950/85 border border-white/10 text-slate-300'
              : 'bg-white/95 border border-slate-300 text-slate-800 shadow-md font-semibold'
          }`}
        >
          <span className="w-2.5 h-3.5 border border-cyan-500 rounded-sm inline-block relative after:content-[''] after:w-0.5 after:h-1 after:bg-cyan-500 after:absolute after:top-0.5 after:left-1/2 after:-translate-x-1/2" />
          <span className="hidden sm:inline">Drag to rotate</span>
          <span className="sm:hidden">Swipe sideways to rotate</span>
          <span className="text-slate-400">•</span>
          <span className="hidden sm:inline">Click planet to inspect</span>
          <span className="sm:hidden">Tap to inspect</span>
        </div>

        {/* Reset View button */}
        <button
          type="button"
          onClick={resetView}
          className={`pointer-events-auto inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono transition-colors shadow-lg backdrop-blur-md ${
            isDark
              ? 'bg-slate-900/90 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-white'
              : 'bg-white border border-slate-300 hover:border-blue-600 text-slate-800 hover:text-slate-950 shadow-md font-semibold'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-500" />
          <span>Reset View</span>
        </button>
      </div>
    </div>
  );
};
