'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { 
  Code2, 
  Layers, 
  FileCode, 
  Palette,
  Server,
  Coffee,
  Zap,
  Database,
  Leaf,
  Package,
  BarChart3,
  Brain,
  Container,
  GitBranch,
  Cloud,
  Figma as FigmaIcon,
  Sparkles
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TechItem {
  name: string;
  icon: LucideIcon;
  category: string;
  color: string;
}

const technologies: TechItem[] = [
  { name: 'React', icon: Code2, category: 'Frontend', color: '#61DAFB' },
  { name: 'Next.js', icon: Layers, category: 'Frontend', color: '#000000' },
  { name: 'TypeScript', icon: FileCode, category: 'Frontend', color: '#3178C6' },
  { name: 'Tailwind CSS', icon: Palette, category: 'Frontend', color: '#06B6D4' },
  { name: 'Node.js', icon: Server, category: 'Backend', color: '#339933' },
  { name: 'Python', icon: Code2, category: 'Backend', color: '#3776AB' },
  { name: 'Java', icon: Coffee, category: 'Backend', color: '#007396' },
  { name: 'FastAPI', icon: Zap, category: 'Backend', color: '#009688' },
  { name: 'PostgreSQL', icon: Database, category: 'Database', color: '#336791' },
  { name: 'MongoDB', icon: Leaf, category: 'Database', color: '#47A248' },
  { name: 'Redis', icon: Package, category: 'Database', color: '#DC382D' },
  { name: 'R', icon: BarChart3, category: 'Data Science', color: '#276DC3' },
  { name: 'Pandas', icon: BarChart3, category: 'Data Science', color: '#150458' },
  { name: 'TensorFlow', icon: Brain, category: 'Data Science', color: '#FF6F00' },
  { name: 'Docker', icon: Container, category: 'DevOps', color: '#2496ED' },
  { name: 'Git', icon: GitBranch, category: 'DevOps', color: '#F05032' },
  { name: 'AWS', icon: Cloud, category: 'Cloud', color: '#FF9900' },
  { name: 'Figma', icon: FigmaIcon, category: 'Design', color: '#F24E1E' },
  { name: 'GSAP', icon: Sparkles, category: 'Animation', color: '#88CE02' },
];

interface Props {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  rotationSpeed?: number;
}


export const TechRollingGallery: React.FC<Props> = ({
  autoplay = true,
  pauseOnHover = true,
  rotationSpeed = 0.2,
}) => {
  const autoRotation = useRef(0);
  const dragRotation = useRef(0);
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const velocityRef = useRef(0);
  const lastDragX = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Atualiza rotação combinando auto e drag
  const updateRotation = () => {
    setRotation(autoRotation.current + dragRotation.current);
  };

  // Autoplay loop
    // Autoplay loop com desaceleração no hover
    useEffect(() => {
  if (!autoplay) return;
    let lastTime = performance.now();

    const animate = (now: number) => {
        const dt = (now - lastTime) / 16.67; // normaliza para ~60fps
        lastTime = now;

        // Se estiver arrastando, pausa total
        // Se estiver com o mouse sobre, só desacelera
        let currentSpeed = rotationSpeed;
        if (isDragging) currentSpeed = 0;
        else if (isPaused) currentSpeed *= 0.2; // hover → 20% da velocidade

        autoRotation.current += currentSpeed * dt;
        updateRotation();

        animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [autoplay, isPaused, isDragging, rotationSpeed]);


  // Drag handlers
  const handleDragStart = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(true);
    setIsPaused(true);
    lastDragX.current = info.point.x;
    velocityRef.current = 0;
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (lastDragX.current !== null) {
      const delta = info.point.x - lastDragX.current;
      dragRotation.current += delta * 0.3;
      velocityRef.current = info.velocity.x * 0.3;
      lastDragX.current = info.point.x;
      updateRotation();
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    lastDragX.current = null;
    // Inércia real
    let v = velocityRef.current;
    const applyInertia = () => {
      if (Math.abs(v) > 0.1) {
        dragRotation.current += v * 0.016; // 0.016 ~ 1 frame
        v *= 0.95;
        updateRotation();
        requestAnimationFrame(applyInertia);
      } else {
        // Ao final, "absorve" o drag na rotação automática
        autoRotation.current += dragRotation.current;
        dragRotation.current = 0;
        updateRotation();
        if (pauseOnHover) setIsPaused(false);
      }
    };
    applyInertia();
  };

  const handleMouseEnter = () => {
    if (pauseOnHover && !isDragging) setIsPaused(true);
  };
  const handleMouseLeave = () => {
    if (pauseOnHover && !isDragging) setIsPaused(false);
  };

  const radius = isMobile ? 300 : 500; // Menor raio para mobile
  const itemCount = technologies.length;
  const angleStep = 360 / itemCount;


  return (
    <div
      className="relative w-screen h-[700px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing left-1/2 right-1/2 -mx-[50vw]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
        }}
      >
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          const baseAngle = index * angleStep;
          const cardRotation = rotation + baseAngle;
          const rad = (cardRotation * Math.PI) / 180;
          const x = Math.sin(rad) * radius;
          const z = Math.cos(rad) * radius;
          // Mantém o tamanho dos cards mais constante, mesmo com raio maior
          const scale = 0.85 + 0.05 * ((z + radius) / (2 * radius));
          const opacity = 0.3 + 0.7 * ((z + radius) / (2 * radius));
          const blur = z < 0 ? 2 : 0;
          return (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate3d(${x}px, 0, ${z}px) scale(${scale*(isMobile ? 0.5 : 0.7)})`,
                zIndex: Math.floor(z),
                opacity,
                filter: `blur(${blur}px)`,
                willChange: isMobile ? 'auto' : 'transform, opacity',
              }}
              transition={isMobile ? { duration: 0 } : (index === 0 ? { duration: 0.2, ease: 'linear' } : { type: 'spring', stiffness: 60, damping: 30 })}
            >
              <div
                className={`relative p-2 rounded-2xl bg-black/70 ${isMobile ? 'backdrop-blur-sm' : 'backdrop-blur-md'} border border-white/20 hover:border-purple-500/50 transition-all duration-300 w-[220px]`}
                style={{
                  boxShadow: isMobile ? 'none' : `0 20px 60px rgba(82, 39, 255, ${(z + radius) / (2 * radius) * 0.4})`,
                }}
              >
                {!isMobile && <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl" />}
                <div className={`relative ${isMobile ? 'space-y-3' : 'space-y-5'} text-center`}>
                  <div className="mx-auto">
                    <Icon
                      className={isMobile ? "w-16 h-16 mx-auto" : "w-24 h-24 mx-auto"}
                      style={{ color: tech.color }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>{tech.name}</h3>
                  <span
                    className="inline-block px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${tech.color}20`,
                      color: tech.color,
                      border: `1px solid ${tech.color}40`
                    }}
                  >
                    {tech.category}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TechRollingGallery;
