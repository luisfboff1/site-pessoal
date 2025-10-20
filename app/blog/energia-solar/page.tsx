import React from 'react';
import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/mdx';
import CategoryPage from '@/components/blog/CategoryPage';

export const metadata: Metadata = {
  title: 'Energia Solar | Blog Luis Fernando Boff',
  description: 'Artigos sobre projetos fotovoltaicos, eficiência energética, tecnologias solares e sustentabilidade',
};

export default function EnergiaSolarBlog() {
  const posts = getPostsByCategory('energia-solar');

  return (
    <CategoryPage
      category="energia-solar"
      categoryName="Energia Solar"
      categoryDescription="Projetos fotovoltaicos, eficiência energética e sustentabilidade"
      icon="lightbulb"
      gradient="from-emerald-600/10 via-cyan-600/10 to-sky-600/10"
      iconColor="text-emerald-300"
      borderColor="border-emerald-600/20 hover:border-emerald-600/40"
      posts={posts}
    />
  );
}
