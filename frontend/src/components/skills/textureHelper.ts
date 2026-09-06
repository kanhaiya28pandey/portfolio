import * as THREE from 'three';

// Cache generated canvas textures so they are created only once per skill
const textureCache = new Map<string, THREE.CanvasTexture>();

export const getCategoryColor = (category: string) => {
  switch (category?.toUpperCase()) {
    case 'CORE':
      return { main: '#38BDF8', glow: 'rgba(56, 189, 248, 0.4)', text: '#7DD3FC' };
    case 'BACKEND':
      return { main: '#34D399', glow: 'rgba(52, 211, 153, 0.4)', text: '#6EE7B7' };
    case 'FRONTEND':
      return { main: '#60A5FA', glow: 'rgba(96, 165, 250, 0.4)', text: '#93C5FD' };
    case 'DATABASE':
      return { main: '#A78BFA', glow: 'rgba(167, 139, 250, 0.4)', text: '#C4B5FD' };
    case 'TOOLS':
      return { main: '#FBBF24', glow: 'rgba(251, 191, 36, 0.4)', text: '#FDE68A' };
    default:
      return { main: '#22D3EE', glow: 'rgba(34, 211, 238, 0.4)', text: '#67E8F9' };
  }
};

/**
 * Generates an ultra-crisp 2D canvas texture with authentic technology emblem,
 * sleek halo border, and glowing typography for 3D billboard rendering.
 */
export const createTechNodeTexture = (
  name: string,
  category: string
): THREE.CanvasTexture => {
  const cacheKey = `${name}_${category}`;
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const fallback = new THREE.CanvasTexture(canvas);
    return fallback;
  }

  const { main, glow } = getCategoryColor(category);

  // Clear canvas
  ctx.clearRect(0, 0, 256, 256);

  // 1. Outer Soft Glow
  const gradientGlow = ctx.createRadialGradient(128, 100, 30, 128, 100, 95);
  gradientGlow.addColorStop(0, glow);
  gradientGlow.addColorStop(0.7, glow.replace('0.4', '0.12'));
  gradientGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = gradientGlow;
  ctx.beginPath();
  ctx.arc(128, 100, 95, 0, Math.PI * 2);
  ctx.fill();

  // 2. Node Background Glass Orb
  const orbGradient = ctx.createRadialGradient(110, 80, 5, 128, 100, 68);
  orbGradient.addColorStop(0, '#1E293B');
  orbGradient.addColorStop(0.6, '#0F172A');
  orbGradient.addColorStop(1, '#050B18');
  ctx.fillStyle = orbGradient;
  ctx.beginPath();
  ctx.arc(128, 100, 68, 0, Math.PI * 2);
  ctx.fill();

  // 3. Crisp Halo Border
  ctx.strokeStyle = main;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(128, 100, 68, 0, Math.PI * 2);
  ctx.stroke();

  // Subtle Inner Specular Ring
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(128, 100, 64, 0, Math.PI * 2);
  ctx.stroke();

  // 4. Technology Symbol / Monogram
  drawTechGlyph(ctx, name, main);

  // 5. Label Typography (Below Node)
  ctx.font = 'bold 22px "JetBrains Mono", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Label Shadow for Contrast
  ctx.fillStyle = 'rgba(5, 8, 22, 0.9)';
  ctx.fillText(name, 128, 206);
  ctx.fillText(name, 128, 204);

  // Label Foreground
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText(name, 128, 205);

  // Category Micro-Pill Tag
  ctx.font = '600 13px "JetBrains Mono", monospace, sans-serif';
  ctx.fillStyle = main;
  ctx.fillText(category.toUpperCase(), 128, 230);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  textureCache.set(cacheKey, texture);
  return texture;
};

/**
 * Draws an authentic, recognizable glyph on the canvas center (128, 100).
 */
function drawTechGlyph(
  ctx: CanvasRenderingContext2D,
  name: string,
  accentColor: string
) {
  const q = name.toLowerCase();
  ctx.save();
  ctx.translate(128, 100);

  if (q.includes('java 21') || (q.includes('java') && !q.includes('script'))) {
    // Java Coffee Cup
    ctx.strokeStyle = '#5382A1';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(0, 4, 18, 0, Math.PI, false);
    ctx.lineTo(-18, -4);
    ctx.lineTo(18, -4);
    ctx.closePath();
    ctx.stroke();
    // Handle
    ctx.beginPath();
    ctx.arc(18, 0, 7, -Math.PI / 2, Math.PI / 2);
    ctx.stroke();
    // Steam
    ctx.strokeStyle = '#E76F00';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.quadraticCurveTo(-10, -18, -6, -24);
    ctx.moveTo(3, -10);
    ctx.quadraticCurveTo(7, -18, 3, -24);
    ctx.stroke();
  } else if (q.includes('spring')) {
    // Spring Leaf / Hexagon
    ctx.fillStyle = '#6DB33F';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0.2 * Math.PI, 1.2 * Math.PI);
    ctx.quadraticCurveTo(16, -12, 0, 16);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-8, -4);
    ctx.lineTo(4, 8);
    ctx.stroke();
  } else if (q.includes('react')) {
    // React Atom
    ctx.strokeStyle = '#61DAFB';
    ctx.lineWidth = 2.5;
    // Ring 1
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 24, 0, 0, Math.PI * 2);
    ctx.stroke();
    // Ring 2
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 24, Math.PI / 3, 0, Math.PI * 2);
    ctx.stroke();
    // Ring 3
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 24, -Math.PI / 3, 0, Math.PI * 2);
    ctx.stroke();
    // Nucleus
    ctx.fillStyle = '#61DAFB';
    ctx.beginPath();
    ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (q.includes('typescript') || q === 'ts') {
    // TS Badge
    ctx.fillStyle = '#3178C6';
    ctx.roundRect(-22, -22, 44, 44, 8);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TS', 0, 2);
  } else if (q.includes('javascript') || q === 'js') {
    // JS Badge
    ctx.fillStyle = '#F7DF1E';
    ctx.roundRect(-22, -22, 44, 44, 8);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('JS', 0, 2);
  } else if (q.includes('python')) {
    // Python Dual Snake
    ctx.fillStyle = '#3776AB';
    ctx.beginPath();
    ctx.arc(-4, -6, 12, 0, Math.PI * 1.3);
    ctx.lineTo(2, -6);
    ctx.fill();
    ctx.fillStyle = '#FFD43B';
    ctx.beginPath();
    ctx.arc(4, 6, 12, Math.PI, Math.PI * 2.3);
    ctx.lineTo(-2, 6);
    ctx.fill();
  } else if (q.includes('docker')) {
    // Docker Whale
    ctx.fillStyle = '#2496ED';
    ctx.beginPath();
    ctx.arc(0, 8, 18, 0, Math.PI);
    ctx.lineTo(-20, 8);
    ctx.quadraticCurveTo(-14, -4, 0, 4);
    ctx.lineTo(20, 8);
    ctx.fill();
    // Containers
    ctx.fillRect(-12, -4, 6, 6);
    ctx.fillRect(-4, -4, 6, 6);
    ctx.fillRect(4, -4, 6, 6);
    ctx.fillRect(-4, -12, 6, 6);
  } else if (q.includes('git')) {
    // Git Branching
    ctx.fillStyle = '#F05032';
    ctx.roundRect(-20, -20, 40, 40, 8);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-6, -10);
    ctx.lineTo(-6, 10);
    ctx.moveTo(-6, 0);
    ctx.lineTo(8, -10);
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-6, -10, 3, 0, Math.PI * 2);
    ctx.arc(-6, 10, 3, 0, Math.PI * 2);
    ctx.arc(8, -10, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (q.includes('postgres')) {
    // PostgreSQL Elephant
    ctx.strokeStyle = '#336791';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -2, 18, 0.4 * Math.PI, 1.8 * Math.PI);
    ctx.quadraticCurveTo(16, 16, 0, 18);
    ctx.stroke();
    ctx.fillStyle = '#336791';
    ctx.beginPath();
    ctx.arc(-6, -4, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (q.includes('mysql') || q.includes('sql')) {
    // MySQL Dolphin
    ctx.strokeStyle = '#00758F';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-16, 10);
    ctx.quadraticCurveTo(-4, -18, 16, -4);
    ctx.quadraticCurveTo(4, 14, -16, 10);
    ctx.stroke();
  } else if (q.includes('mongo')) {
    // MongoDB Leaf
    ctx.fillStyle = '#47A248';
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.quadraticCurveTo(18, 0, 0, 22);
    ctx.quadraticCurveTo(-18, 0, 0, -22);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(0, 22);
    ctx.stroke();
  } else if (q.includes('dsa') || q.includes('algorithm')) {
    // Binary Tree
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(-12, 4);
    ctx.moveTo(0, -14);
    ctx.lineTo(12, 4);
    ctx.moveTo(-12, 4);
    ctx.lineTo(-16, 18);
    ctx.moveTo(12, 4);
    ctx.lineTo(16, 18);
    ctx.stroke();
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(0, -14, 4, 0, Math.PI * 2);
    ctx.arc(-12, 4, 4, 0, Math.PI * 2);
    ctx.arc(12, 4, 4, 0, Math.PI * 2);
    ctx.arc(-16, 18, 3, 0, Math.PI * 2);
    ctx.arc(16, 18, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (q.includes('oop')) {
    // Isometric Modular Cubes
    ctx.strokeStyle = '#C084FC';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(16, -9);
    ctx.lineTo(16, 9);
    ctx.lineTo(0, 18);
    ctx.lineTo(-16, 9);
    ctx.lineTo(-16, -9);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(0, 0);
    ctx.lineTo(16, 9);
    ctx.moveTo(0, 0);
    ctx.lineTo(-16, 9);
    ctx.stroke();
  } else if (q.includes('c++') || q.includes('cpp')) {
    ctx.fillStyle = '#00599C';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('C++', 0, 0);
  } else if (q.includes('node')) {
    // Node Hexagon
    ctx.fillStyle = '#339933';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NODE', 0, 0);
  } else if (q.includes('postman')) {
    ctx.fillStyle = '#FF6C37';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PM', 0, 1);
  } else if (q.includes('api') || q.includes('rest')) {
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-18, -10, 36, 20);
    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('REST', 0, 1);
  } else {
    // Default Futuristic Code Diamond
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(16, 0);
    ctx.lineTo(0, 16);
    ctx.lineTo(-16, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('</>', 0, 1);
  }

  ctx.restore();
}
