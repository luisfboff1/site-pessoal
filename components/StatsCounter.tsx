'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Award, Briefcase, Code, LucideIcon } from 'lucide-react';

type StatCardProps = {
  value: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  delay?: number;
};

const StatCard = ({ value, suffix = '', label, icon: Icon, delay = 0 }: StatCardProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        delay,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, value, count, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-lg border border-emerald-500/20 rounded-xl p-5 hover:border-emerald-400/30 transition-all duration-300">
        {/* Icon */}
        <div className="flex items-center justify-between mb-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg shadow-md shadow-emerald-500/20">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="h-0.5 w-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full opacity-50" />
        </div>

        {/* Counter */}
        <div className="mb-1.5">
          <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            <motion.span>{rounded}</motion.span>
            {suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-gray-400 text-sm font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

const StatsCounter = () => {
  const stats = [
    {
      value: 100,
      suffix: '+',
      label: 'Projetos Entregues',
      icon: Award,
    },
    {
      value: 5,
      suffix: '+',
      label: 'Anos de Experiência',
      icon: Briefcase,
    },
    {
      value: 50,
      suffix: '+',
      label: 'Tecnologias Dominadas',
      icon: Code,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          icon={stat.icon}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default StatsCounter;
