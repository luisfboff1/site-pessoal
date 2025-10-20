import React from 'react';
import { Metadata } from 'next';
import { getPostsByCategory } from '@/lib/mdx';
import CategoryPage from '@/components/blog/CategoryPage';

export const metadata: Metadata = {
  title: 'Desenvolvimento | Blog Luis Fernando Boff',
  description: 'Artigos sobre Full Stack, Frontend, Backend, Apps Mobile, ERP e arquitetura de software',
};

export default function DesenvolvimentoBlog() {
  const posts = getPostsByCategory('desenvolvimento');

  return (
    <CategoryPage
      category="desenvolvimento"
      categoryName="Desenvolvimento"
      categoryDescription="Full Stack, Frontend, Backend, Apps Mobile e arquitetura de software"
      icon="code"
      gradient="from-emerald-600/10 via-cyan-600/10 to-sky-600/10"
      iconColor="text-cyan-300"
      borderColor="border-cyan-600/20 hover:border-cyan-600/40"
      posts={posts}
    />
  );
}
