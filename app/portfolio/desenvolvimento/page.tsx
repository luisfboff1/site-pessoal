'use client';
import React from 'react';
import Orb from '@/components/Orb';
import dynamic from 'next/dynamic'; // This line is kept as it is the only import needed
import { motion } from 'framer-motion';

const InfiniteMenu = dynamic(() => import('@/components/InfiniteMenu'), { ssr: false });

const projectsDesenvolvimento = [
  {
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'E-commerce Full Stack',
    description: 'Plataforma completa com Next.js, TypeScript, Stripe e PostgreSQL'
  },
  {
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Dashboard Analytics',
    description: 'Interface moderna com React, D3.js e real-time data'
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'API REST Node.js',
    description: 'Backend escalável com Express, MongoDB e autenticação JWT'
  },
  {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'App Mobile React Native',
    description: 'Aplicativo multiplataforma com Expo e Firebase'
  },
  {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'CMS Headless',
    description: 'Sistema de gestão de conteúdo com Strapi e GraphQL'
  },
  {
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'PWA + Service Workers',
    description: 'Progressive Web App com offline-first e notificações push'
  }
];

export default function DesenvolvimentoPortfolio() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Orb background (behind content) */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Orb hoverIntensity={0} rotateOnHover={false} hue={220} forceHoverState={false} />
        </div>
      </div>
      {/* Background gradient fallback */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black" />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 py-4 md:py-8 mt-16 md:mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6 md:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2 md:mb-4 px-2">
              Desenvolvimento
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4">
              Projetos de desenvolvimento web, mobile e sistemas completos
            </p>
          </motion.div>
        </motion.div>

        {/* InfiniteMenu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full relative"
          style={{ height: 'min(600px, 70vh)' }}
        >
          <InfiniteMenu items={projectsDesenvolvimento} />
          
          {/* Mobile swipe indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
            >
              <span className="text-xs text-white/70">Arraste para navegar</span>
              <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer spacing */}
        <div className="h-24" />
      </div>
    </main>
  );
}
