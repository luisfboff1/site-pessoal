'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Briefcase, Rocket } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    title: 'Formação Acadêmica',
    description: 'Engenheiro Eletricista com Mestrado em Inteligência Artificial aplicada à Geração Solar pela UFRGS',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    icon: MapPin,
    title: 'Origem',
    description: 'Natural de Caxias do Sul - RS, atuando em todo o Brasil com foco no Rio Grande do Sul',
    gradient: 'from-cyan-500/20 to-teal-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Briefcase,
    title: 'Cientista de Dados',
    description: 'Cientista de Dados, desenvolvendo soluções de Machine Learning e Business Intelligence',
    gradient: 'from-teal-500/20 to-emerald-500/20',
    iconColor: 'text-teal-400',
  },
  {
    icon: Rocket,
    title: 'Empreendedor',
    description: 'Desenvolvedor Full Stack autônomo especializado em ERPs, aplicativos mobile e websites personalizados',
    gradient: 'from-cyan-500/20 to-sky-500/20',
    iconColor: 'text-cyan-400',
  },
];

const AboutMe = () => {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-teal-900/15 to-cyan-900/20" />

      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/8 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/8 rounded-full blur-[120px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Sobre Mim
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Engenheiro Eletricista, Cientista de Dados e Desenvolvedor Full Stack com expertise em{' '}
            <span className="text-emerald-400 font-semibold">Energia Solar</span>,{' '}
            <span className="text-cyan-400 font-semibold">Inteligência Artificial</span> e{' '}
            <span className="text-teal-400 font-semibold">Desenvolvimento de Software</span>.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Card */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`${item.iconColor} bg-white/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expertise Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="text-gray-400 font-medium">Especializado em:</div>
          {[
            'Sistemas Fotovoltaicos',
            'ERPs Personalizados',
            'Apps Mobile',
            'Machine Learning',
            'Websites Responsivos',
            'Análise de Dados',
            'Energia Renovável',
            'Business Intelligence',
          ].map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full text-sm text-gray-300 hover:border-emerald-500/40 transition-all cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
