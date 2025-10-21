'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    title: 'Energia Solar',
    slug: 'energia-solar',
    description: 'Projetos fotovoltaicos, eficiência energética, tecnologias solares e sustentabilidade',
    icon: Lightbulb,
    gradient: 'from-emerald-600/10 via-cyan-600/10 to-sky-600/10',
    iconColor: 'text-emerald-300',
    borderColor: 'border-emerald-600/20 hover:border-emerald-600/40',
    posts: 12
  },
  {
    title: 'Desenvolvimento',
    slug: 'desenvolvimento',
    description: 'Full Stack, Frontend, Backend, Apps Mobile, ERP e arquitetura de software',
    icon: Code,
    gradient: 'from-emerald-600/10 via-cyan-600/10 to-sky-600/10',
    iconColor: 'text-cyan-300',
    borderColor: 'border-cyan-600/20 hover:border-cyan-600/40',
    posts: 24
  },
  {
    title: 'Ciência de Dados',
    slug: 'ciencia-dados',
    description: 'Machine Learning, Deep Learning, análise de dados e otimização',
    icon: TrendingUp,
    gradient: 'from-emerald-600/10 via-cyan-600/10 to-sky-600/10',
    iconColor: 'text-teal-300',
    borderColor: 'border-teal-600/20 hover:border-teal-600/40',
    posts: 18
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

export default function BlogPage() {
  return (
  <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background gradient - lightweight CSS only */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-950/20 via-black to-black" />
      <div className="fixed top-20 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-20 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -z-10" />

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 py-12 md:py-20 mt-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-20 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-emerald-300 font-medium">Blog</span>
            </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Compartilhando
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Conhecimento
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 leading-relaxed">
              Artigos sobre energia solar, desenvolvimento de software e ciência de dados.
              Experiências, tutoriais e insights do mundo tech.
            </p>
          </motion.div>

          {/* Categories Grid */}
            <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.slug}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/blog/${category.slug}`}
                    className="group block h-full"
                  >
                    <div className={`
                      relative h-full p-8 rounded-2xl border backdrop-blur-sm
                      bg-gradient-to-br ${category.gradient}
                      ${category.borderColor}
                      transition-all duration-300
                      overflow-hidden
                    `}>
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                          backgroundSize: '32px 32px'
                        }} />
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                          transition={{ duration: 0.5 }}
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-black/40 border border-white/10 mb-6 ${category.iconColor}`}
                        >
                          <Icon className="w-8 h-8" />
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
                          {category.title}
                        </h2>

                        {/* Description */}
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                          {category.description}
                        </p>

                        {/* Stats & CTA */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-neutral-500">
                            {category.posts} artigos
                          </span>

                          <motion.div
                            className="flex items-center gap-2 text-white group-hover:gap-3 transition-all"
                          >
                            <span className="text-sm font-medium">Ver artigos</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Featured Posts Section (placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-24 text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Mais conteúdo em breve
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Estou preparando artigos detalhados sobre cada uma dessas áreas.
              Escolha uma categoria acima para explorar o conteúdo disponível.
            </p>
          </motion.div>
        </motion.section>

        {/* Footer spacing */}
        <div className="h-24" />
      </div>
    </main>
  );
}
