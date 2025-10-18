'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Database, Wrench } from 'lucide-react';

interface TechBadgeProps {
  name: string;
  icon?: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ name, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all"
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span className="text-neutral-200 font-medium text-sm">{name}</span>
    </motion.div>
  );
};

export const TechStackSection: React.FC = () => {
  const technologies = {
    'Linguagens': {
      icon: Code2,
      items: [
        { name: 'Java', icon: '☕' },
        { name: 'Python', icon: '🐍' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'R', icon: '📊' }
      ]
    },
    'Frontend': {
      icon: Palette,
      items: [
        { name: 'Next.js', icon: '⚡' },
        { name: 'React', icon: '⚛️' },
        { name: 'Tailwind CSS', icon: '🎨' },
        { name: 'GSAP', icon: '✨' }
      ]
    },
    'Backend & Data': {
      icon: Database,
      items: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'FastAPI', icon: '⚡' }
      ]
    },
    'Ferramentas': {
      icon: Wrench,
      items: [
        { name: 'Git', icon: '🔧' },
        { name: 'Docker', icon: '🐳' },
        { name: 'VS Code', icon: '💻' },
        { name: 'Figma', icon: '🎨' }
      ]
    }
  };

  return (
    <section id="tech" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Stack Tecnológico
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            Ferramentas modernas para soluções escaláveis e performáticas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.entries(technologies).map(([category, { icon: Icon, items }], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {items.map((tech, index) => (
                  <TechBadge key={index} name={tech.name} icon={tech.icon} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
