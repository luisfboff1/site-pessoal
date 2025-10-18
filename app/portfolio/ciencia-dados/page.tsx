'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/SharedNavbar';

const InfiniteMenu = dynamic(() => import('@/components/InfiniteMenu'), { ssr: false });

const projectsCienciaDados = [
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Predição de Churn',
    description: 'Machine Learning para prever cancelamento de clientes com 92% de acurácia'
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Análise de Sentimentos',
    description: 'NLP com BERT para classificação de reviews em tempo real'
  },
  {
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Sistema de Recomendação',
    description: 'Collaborative filtering para e-commerce com TensorFlow'
  },
  {
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Computer Vision',
    description: 'Detecção de objetos em tempo real com YOLO v8'
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Time Series Forecasting',
    description: 'Previsão de demanda com Prophet e LSTM'
  },
  {
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=600&fit=crop',
    link: 'https://github.com',
    title: 'Dashboard BI Interativo',
    description: 'Visualizações avançadas com Plotly e Streamlit'
  }
];

export default function CienciaDadosPortfolio() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black" />
      
        <div className="relative z-10 -mt-4">

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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2 md:mb-4 px-2 mt-8 md:mt-12">
              Ciência de Dados
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto px-4">
              Projetos de Machine Learning, IA, análise de dados e visualização
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
          <InfiniteMenu items={projectsCienciaDados} />
          
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
