'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/SharedNavbar';
import { Lightbulb, Code, TrendingUp, ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/mdx';

type CategoryPageProps = {
  category: string;
  categoryName: string;
  categoryDescription: string;
  icon: 'lightbulb' | 'code' | 'trending-up';
  gradient: string;
  iconColor: string;
  borderColor: string;
  posts: BlogPost[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

const iconMap = {
  'lightbulb': Lightbulb,
  'code': Code,
  'trending-up': TrendingUp
};

export default function CategoryPage({
  category,
  categoryName,
  categoryDescription,
  icon,
  gradient,
  iconColor,
  borderColor,
  posts
}: CategoryPageProps) {
  const Icon = iconMap[icon];
  const gradientBg = gradient.replace('from-', 'from-').replace('via-', 'via-').replace('to-', 'to-').split('/')[0].replace('from-', '').replace('via-', '').replace('to-', '').split(' ')[0];

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <div className={`fixed inset-0 bg-gradient-to-br from-${gradientBg}-900/10 via-black to-black`} />

      <div className="relative z-10">
        <Navbar />

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 py-20 md:py-32 mt-16"
        >
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 bg-${gradientBg}-500/10 border border-${gradientBg}-500/20 rounded-full px-4 py-2 mb-6`}
            >
              <Icon className={`w-4 h-4 ${iconColor}`} />
              <span className={`text-sm ${iconColor.replace('text-', 'text-')} font-medium`}>{categoryName}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {categoryName}
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed">
              {categoryDescription}
            </p>
          </motion.div>

          {/* Posts Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {posts.map((post) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/blog/${category}/${post.slug}`}
                  className="group block h-full"
                >
                  <article className={`relative h-full bg-gradient-to-br ${gradient} border ${borderColor} rounded-2xl overflow-hidden backdrop-blur-sm transition-all`}>
                    {/* Image */}
                    <div className="relative h-48 w-full bg-neutral-900 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className={`text-xl font-bold text-white mb-3 group-hover:${iconColor} transition-colors leading-tight`}>
                        {post.title}
                      </h2>

                      {/* Description */}
                      <p className="text-sm text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
                        {post.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2 py-1 bg-${gradientBg}-500/10 border border-${gradientBg}-500/20 rounded-full ${iconColor}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Hover effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-${gradientBg}-500/5 to-transparent pointer-events-none`}
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty state */}
          {posts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-20"
            >
              <Icon className={`w-16 h-16 ${iconColor}/30 mx-auto mb-4`} />
              <p className="text-neutral-400">
                Nenhum artigo publicado ainda. Em breve!
              </p>
            </motion.div>
          )}
        </motion.section>

        <div className="h-24" />
      </div>
    </main>
  );
}
