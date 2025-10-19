// Example: If you require explicit cookie consent from users, call Clarity.consent(true) after they accept cookies.
// Example: To prioritize a session for recording, call Clarity.upgrade('important-action') when a key event happens.
'use client';
import React, { useState, useEffect } from 'react';
import Clarity from '@microsoft/clarity';
import dynamic from 'next/dynamic';
import SplitText from '@/components/SplitText';
import ProfileCard from '@/components/ProfileCard';
import { Menu, MenuItem, HoveredLink } from '@/components/ui/navbar-menu';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { Footer } from '@/components/sections/Footer';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { cn } from '@/lib/utils';
import { Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const LiquidEther = dynamic(() => import('@/components/LiquidEther'), { ssr: false });
const TechRollingGallery = dynamic(() => import('../components/TechRollingGallery'), { ssr: false });

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Início">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#home">Início</HoveredLink>
            <HoveredLink href="#about">Sobre</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Portfólio">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/portfolio/desenvolvimento">Desenvolvimento</HoveredLink>
            <HoveredLink href="/portfolio/energia-solar">Energia Solar</HoveredLink>
            <HoveredLink href="/portfolio/ciencia-dados">Ciência de Dados</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Serviços">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#services">Ver Todos</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Tecnologias">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#tech-rolling">Gallery 3D</HoveredLink>
            {/* <HoveredLink href="#tech-gallery">Stack Completo</HoveredLink> */}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Contato">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="#contact">Fale Comigo</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default function Home() {
  const [showLiquidEther, setShowLiquidEther] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
        setShowLiquidEther(true);
      }
    };

    const timer = setTimeout(() => {
      setShowLiquidEther(true);
    }, 2500);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
      // Microsoft Clarity Identify API example
      // Replace 'custom-id' with a real user/session/page identifier if available
      Clarity.identify('custom-id', undefined, undefined, 'Luis Fernando Boff');
      // Custom Tag example
      Clarity.setTag('userType', 'visitor');
      // Custom Event example
      Clarity.event('page-loaded');
  }, [hasScrolled]);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <div className="fixed inset-0 z-0" style={{ width: '100%', height: '100vh' }}>
        {!showLiquidEther && (
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(82,39,255,0.15) 0%, rgba(0,0,0,1) 70%)'
            }}
          />
        )}
        {showLiquidEther && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={20}
              cursorSize={100}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
            />
          </motion.div>
        )}
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section com ProfileCard */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 z-20">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            {/* ProfileCard no topo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl bg-gray-900 flex items-center justify-center mt-8">
                <img
                  src="/avatar.png"
                  alt="Luis Fernando Boff"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=LuisFernandoBoff';
                  }}
                />
              </div>

            </motion.div>

            {/* Nome com SplitText */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SplitText
                text="Luis Fernando Boff"
                className="text-6xl md:text-8xl font-bold text-white tracking-tight"
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                tag="h1"
                textAlign="center"
              />
            </motion.div>

            {/* Subtítulo com SplitText */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SplitText
                text="Energia Solar & Desenvolvedor Full Stack & Data Scientist"
                className="text-xl md:text-3xl text-purple-300 font-light"
                delay={80}
                duration={0.5}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                tag="p"
                textAlign="center"
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-4 pt-8"
            >
              <a
                href="#contact"
                className="px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all hover:scale-105 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Entre em Contato
              </a>
              <a
                href="#services"
                className="px-8 py-4 rounded-full border border-white/20 hover:border-purple-500/50 text-white font-medium transition-all hover:scale-105 backdrop-blur-sm"
              >
                Ver Serviços
              </a>
            </motion.div>
          </div>
        </section>

        <ServicesSection />

        {/* Portfolio Preview Section */}
        <PortfolioPreview />

        {/* Rolling Gallery 3D - Stack Tecnológico (aparece em todas as telas) */}
        <section id="tech-rolling" className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Stack Tecnológico em 3D
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
                Explore as tecnologias que utilizo em uma galeria interativa 3D
              </p>
            </motion.div>
            <TechRollingGallery />
          </div>
        </section>

        {/* Tech Gallery Section removida, pois o carrossel 3D já cumpre esse papel */}

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