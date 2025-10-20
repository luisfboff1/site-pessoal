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
      gradient="from-yellow-500/20 via-orange-500/20 to-red-500/20"
      iconColor="text-yellow-400"
      borderColor="border-yellow-500/20 hover:border-yellow-500/40"
      posts={posts}
    />
  );
}
