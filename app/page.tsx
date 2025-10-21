// Example: If you require explicit cookie consent from users, call Clarity.consent(true) after they accept cookies.
// Example: To prioritize a session for recording, call Clarity.upgrade('important-action') when a key event happens.
'use client';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import StatsCounter from '@/components/StatsCounter';
import DarkVeil from '@/components/DarkVeil';
import { Footer } from '@/components/sections/Footer';
import { Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const TechRollingGallery = dynamic(() => import('../components/TechRollingGallery'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 animate-pulse rounded-lg" />
});
const AboutMe = dynamic(() => import('@/components/sections/AboutMe'), {
  loading: () => <div className="min-h-screen bg-black/50" />
});
const ServicesSection = dynamic(() => import('@/components/sections/ServicesSection').then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="min-h-screen bg-black/50" />
});
const PortfolioPreview = dynamic(() => import('@/components/sections/PortfolioPreview').then(mod => ({ default: mod.PortfolioPreview })), {
  loading: () => <div className="min-h-screen bg-black/50" />
});


export default function Home() {
  useEffect(() => {
    // Wait for Clarity to be initialized
    interface WindowWithClarity extends Window {
      clarity?: (command: string, ...args: unknown[]) => void;
    }

    const initClarity = () => {
      const w = window as unknown as WindowWithClarity;
      if (typeof window !== 'undefined' && w.clarity) {
        try {
          w.clarity('identify', 'custom-id', undefined, undefined, 'Luis Fernando Boff');
          w.clarity('set', 'userType', 'visitor');
          w.clarity('event', 'page-loaded');
        } catch {
          console.warn('Clarity not ready yet');
        }
      } else {
        // Retry after a short delay if Clarity hasn't loaded yet
        const timeout = setTimeout(initClarity, 100);
        return () => clearTimeout(timeout);
      }
    };

    const timeout = setTimeout(initClarity, 500); // Give Clarity time to load
    return () => clearTimeout(timeout);
  }, []);

  return (
  <main className="relative min-h-screen overflow-hidden">
      {/* DarkVeil Background - Fixed */}
      <div className="fixed inset-0 z-0" style={{ width: '100%', height: '100vh' }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.12}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0.8}
          resolutionScale={1}
        />
      </div>

      <div className="relative z-10">

        {/* Hero Section - Clean & Minimal */}
        <section id="home" className="relative min-h-[75vh] flex items-center px-4 pt-20 pb-12 z-20">

          <div className="max-w-5xl mx-auto w-full relative z-10">
            <div className="flex flex-col items-center text-center space-y-6">

              {/* Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-3 border-emerald-500/30 shadow-2xl shadow-emerald-500/10 bg-gray-900">
                  <Image
                    src="/avatar.png"
                    alt="Luis Fernando Boff"
                    width={192}
                    height={192}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Nome */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Luis Fernando <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Boff</span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-2xl"
              >
                <p className="text-lg md:text-xl text-gray-400">
                  Engenheiro Eletricista · Mestrado IA UFRGS · Cientista de Dados 
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-3 pt-2"
              >
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-sm font-medium transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-emerald-500/30"
                >
                  <Mail className="w-4 h-4" />
                  Contato
                </a>
                <a
                  href="#services"
                  className="px-6 py-3 rounded-lg border border-emerald-500/30 hover:border-emerald-400/50 text-white text-sm font-medium transition-all hover:scale-105 backdrop-blur-sm hover:bg-emerald-500/5"
                >
                  Ver Projetos
                </a>
              </motion.div>

              {/* Stats Counter Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-full pt-6"
              >
                <StatsCounter />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <AboutMe />

        <ServicesSection />

        {/* Portfolio Preview Section */}
        <PortfolioPreview />

        {/* Rolling Gallery 3D - Integrado abaixo do portfolio */}
        <section id="tech-rolling" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <TechRollingGallery />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Vamos trabalhar juntos?
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl">
                Transforme sua ideia em realidade. Entre em contato para discutir seu próximo projeto.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="mailto:luisfboff@hotmail.com"
                className="px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all hover:scale-105 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
              <a
                href="https://github.com/luisfboff1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-white/20 hover:border-purple-500/50 text-white font-medium transition-all hover:scale-105 backdrop-blur-sm flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/luis-fernando-boff-7a64a716b/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-white/20 hover:border-purple-500/50 text-white font-medium transition-all hover:scale-105 backdrop-blur-sm flex items-center gap-2"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}