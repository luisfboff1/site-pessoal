'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Settings, Globe, BarChart3, type LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        
        <div className="relative space-y-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
            <Icon className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  const services = [
    {
      Icon: Sun,
      title: 'Energia Solar',
      description: 'Desenvolvimento de soluções inteligentes para otimização e monitoramento de sistemas de energia solar.'
    },
    {
      Icon: Settings,
      title: 'Aplicativos e ERP',
      description: 'Criação de aplicativos personalizados e sistemas ERP robustos para gestão empresarial completa.'
    },
    {
      Icon: Globe,
      title: 'Landing Pages',
      description: 'Design e desenvolvimento de landing pages modernas e responsivas com foco em conversão.'
    },
    {
      Icon: BarChart3,
      title: 'Data Science',
      description: 'Análise de dados, machine learning e visualizações para insights acionáveis do seu negócio.'
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              Icon={service.Icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
