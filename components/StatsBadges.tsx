'use client';

import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Code, Lightbulb } from 'lucide-react';

const stats = [
  {
    icon: Lightbulb,
    label: '100+ Projetos Solares',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    icon: GraduationCap,
    label: 'Mestrado UFRGS',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    icon: Briefcase,
    label: '5+ Anos Experiência',
    color: 'from-purple-400 to-pink-400',
  },
  {
    icon: Code,
    label: 'Full Stack Developer',
    color: 'from-green-400 to-emerald-400',
  },
  {
    icon: Award,
    label: 'Cientista de Dados',
    color: 'from-indigo-400 to-violet-400',
  },
];

const StatsBadges = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="flex flex-wrap justify-center gap-3 pt-8"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg rounded-full from-purple-500/50 to-pink-500/50" />
            <div className="relative flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:border-white/20 transition-all">
              <div className={`bg-gradient-to-r ${stat.color} p-1.5 rounded-full`}>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs md:text-sm text-gray-300 font-medium whitespace-nowrap">
                {stat.label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsBadges;
