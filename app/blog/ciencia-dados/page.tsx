import React from 'react';
import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/mdx';
import CategoryPage from '@/components/blog/CategoryPage';

export const metadata: Metadata = {
  title: 'Ciência de Dados | Blog Luis Fernando Boff',
  description: 'Artigos sobre Machine Learning, Deep Learning, análise de dados e otimização',
};

export default function CienciaDadosBlog() {
  const posts = getPostsByCategory('ciencia-dados');

  return (
    <CategoryPage
      category="ciencia-dados"
      categoryName="Ciência de Dados"
      categoryDescription="Machine Learning, Deep Learning, análise de dados e otimização"
      icon="trending-up"
      gradient="from-green-500/20 via-teal-500/20 to-cyan-500/20"
      iconColor="text-green-400"
      borderColor="border-green-500/20 hover:border-green-500/40"
      posts={posts}
    />
  );
}
