'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com',
      Icon: Github
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      Icon: Linkedin
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/',
      Icon: MessageCircle
    }
  ];

  return (
    <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              Luis Fernando
            </h3>
            <p className="text-neutral-400 text-sm">
              Desenvolvendo soluções inteligentes em energia solar, software e dados.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Links Rápidos</h4>
            <div className="flex flex-col space-y-2">
              {['Início', 'Sobre', 'Serviços', 'Tecnologias', 'Contato'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-neutral-400 hover:text-purple-400 transition-colors text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Redes Sociais</h4>
            <div className="flex gap-4">
              {socialLinks.map(({ name, href, Icon }) => (
                <motion.a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 flex items-center justify-center text-neutral-400 hover:text-purple-400 transition-all"
                  aria-label={name}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-neutral-500 text-sm">
            © {currentYear} Luis Fernando. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
