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
      gradient="from-emerald-600/10 via-cyan-600/10 to-sky-600/10"
      iconColor="text-teal-300"
      borderColor="border-teal-600/20 hover:border-teal-600/40"
      posts={posts}
    />
  );
}
