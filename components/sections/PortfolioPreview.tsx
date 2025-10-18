'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Code, Zap, BarChart3 } from 'lucide-react';

interface PortfolioCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}

const PortfolioCard = ({ title, description, href, icon, gradient }: PortfolioCardProps) => {
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`relative h-64 rounded-2xl p-8 overflow-hidden cursor-pointer group ${gradient}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent group-hover:from-black/20 transition-all duration-300" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl group-hover:bg-white/20 transition-colors">
              {icon}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80 text-sm">{description}</p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:scale-150 transition-transform duration-500" />
      </motion.div>
    </Link>
  );
};

export const PortfolioPreview = () => {
  const portfolioCategories = [
    {
      title: 'Desenvolvimento',
      description: 'Aplicativos web modernos, ERPs e landing pages otimizadas',
      href: '/portfolio/desenvolvimento',
      icon: <Code className="w-6 h-6 text-white" />,
      gradient: 'bg-gradient-to-br from-blue-600 to-purple-600'
    },
    {
      title: 'Energia Solar',
      description: 'Sistemas de monitoramento e otimização de energia renovável',
      href: '/portfolio/energia-solar',
      icon: <Zap className="w-6 h-6 text-white" />,
      gradient: 'bg-gradient-to-br from-yellow-500 to-orange-600'
    },
    {
      title: 'Ciência de Dados',
      description: 'Análise preditiva, machine learning e visualização de dados',
      href: '/portfolio/ciencia-dados',
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      gradient: 'bg-gradient-to-br from-green-500 to-teal-600'
    }
  ];

  return (
    <section className="py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Meu Portfolio
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            Explore projetos em desenvolvimento web, energia solar e ciência de dados
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PortfolioCard {...category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
