'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Settings, Globe, BarChart3, type LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  gradient: string;
  iconColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ Icon, title, description, delay = 0, gradient, iconColor }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="relative p-8 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 hover:shadow-2xl"
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`} />

        <div className="relative space-y-4" style={{ transform: 'translateZ(50px)' }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
          >
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </motion.div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  const services = [
    {
      Icon: Sun,
      title: 'Energia Solar',
      description: 'Projetos fotovoltaicos completos, sistemas de monitoramento IoT e otimização com Machine Learning para geração solar.',
      gradient: 'from-emerald-500 to-teal-500',
      iconColor: 'text-emerald-100',
    },
    {
      Icon: Settings,
      title: 'Aplicativos e ERP',
      description: 'Desenvolvimento de sistemas ERP personalizados, apps mobile multiplataforma e soluções web escaláveis.',
      gradient: 'from-cyan-600 to-teal-600',
      iconColor: 'text-cyan-100',
    },
    {
      Icon: Globe,
      title: 'Landing Pages',
      description: 'Sites institucionais modernos, landing pages de alta conversão e portfólios responsivos com SEO avançado.',
      gradient: 'from-teal-500 to-cyan-500',
      iconColor: 'text-teal-100',
    },
    {
      Icon: BarChart3,
      title: 'Data Science',
      description: 'Análise de dados avançada, Machine Learning, Business Intelligence e dashboards interativos com insights acionáveis.',
      gradient: 'from-sky-500 to-cyan-500',
      iconColor: 'text-sky-100',
    }
  ];

  return (
    <section id="services" className="relative py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            O que eu faço
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            Soluções tecnológicas completas para transformar suas ideias em realidade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              Icon={service.Icon}
              title={service.title}
              description={service.description}
              gradient={service.gradient}
              iconColor={service.iconColor}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
