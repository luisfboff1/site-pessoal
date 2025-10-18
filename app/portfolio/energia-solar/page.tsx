'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/SharedNavbar';

const InfiniteMenu = dynamic(() => import('@/components/InfiniteMenu'), { ssr: false });

const projectsEnergiaSolar = [
  {
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Sistema Residencial 10kWp',
    description: 'Instalação completa com 30 painéis e inversor híbrido'
  },
  {
    image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Fazenda Solar 500kWp',
    description: 'Projeto comercial de grande porte com monitoramento IoT'
  },
  {
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Sistema Off-Grid Rural',
    description: 'Solução autônoma com banco de baterias e backup'
  },
  {
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Indústria 200kWp',
    description: 'Instalação industrial com redução de 70% na conta de luz'
  },
  {
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Microgeração Condominial',
    description: 'Sistema compartilhado para 15 unidades residenciais'
  },
  {
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Retrofit Energético',
    description: 'Modernização de sistema antigo com nova tecnologia'
  }
];

export default function EnergiaSolarPortfolio() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-900/20 via-black to-black" />
      
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />
        
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
              Energia Solar
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4">
              Projetos de sistemas fotovoltaicos residenciais, comerciais e industriais
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
          <InfiniteMenu items={projectsEnergiaSolar} />
          
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
