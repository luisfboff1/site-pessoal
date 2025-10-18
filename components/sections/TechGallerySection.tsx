'use client';
import React from 'react';
import { motion } from 'framer-motion';
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

interface TechCardProps {
  name: string;
  icon: LucideIcon;
  category: string;
  color?: string;
}

const TechCard: React.FC<TechCardProps> = ({ name, icon: Icon, category, color = '#5227FF' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative group"
    >
      <div className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        <div className="relative space-y-4 text-center">
          {/* Icon */}
          <div className="mx-auto">
            <Icon 
              className="w-16 h-16 mx-auto" 
              style={{ color: color }}
              strokeWidth={1.5}
            />
          </div>
          
          {/* Tech Name */}
          <h3 className="text-xl font-bold text-white">{name}</h3>
          
          {/* Category Badge */}
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: color + '20',
              color: color,
              border: '1px solid ' + color + '40'
            }}
          >
            {category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const TechGallerySection: React.FC = () => {
  const technologies = [
    // Frontend
    { name: 'React', icon: Code2, category: 'Frontend', color: '#61DAFB' },
    { name: 'Next.js', icon: Layers, category: 'Frontend', color: '#000000' },
    { name: 'TypeScript', icon: FileCode, category: 'Frontend', color: '#3178C6' },
    { name: 'Tailwind CSS', icon: Palette, category: 'Frontend', color: '#06B6D4' },
    
    // Backend
    { name: 'Node.js', icon: Server, category: 'Backend', color: '#339933' },
    { name: 'Python', icon: Code2, category: 'Backend', color: '#3776AB' },
    { name: 'Java', icon: Coffee, category: 'Backend', color: '#007396' },
    { name: 'FastAPI', icon: Zap, category: 'Backend', color: '#009688' },
    
    // Database
    { name: 'PostgreSQL', icon: Database, category: 'Database', color: '#336791' },
    { name: 'MongoDB', icon: Leaf, category: 'Database', color: '#47A248' },
    { name: 'Redis', icon: Package, category: 'Database', color: '#DC382D' },
    
    // Data Science
    { name: 'R', icon: BarChart3, category: 'Data Science', color: '#276DC3' },
    { name: 'Pandas', icon: BarChart3, category: 'Data Science', color: '#150458' },
    { name: 'TensorFlow', icon: Brain, category: 'Data Science', color: '#FF6F00' },
    
    // DevOps
    { name: 'Docker', icon: Container, category: 'DevOps', color: '#2496ED' },
    { name: 'Git', icon: GitBranch, category: 'DevOps', color: '#F05032' },
    { name: 'AWS', icon: Cloud, category: 'Cloud', color: '#FF9900' },
    
    // Design
    { name: 'Figma', icon: FigmaIcon, category: 'Design', color: '#F24E1E' },
    { name: 'GSAP', icon: Sparkles, category: 'Animation', color: '#88CE02' },
  ];

  return (
    <section id="tech-gallery" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Stack Tecnológico Completo
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            Ferramentas e tecnologias que domino para criar soluções completas
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <TechCard
              key={index}
              name={tech.name}
              icon={tech.icon}
              category={tech.category}
              color={tech.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
