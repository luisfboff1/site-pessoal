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
      gradient="from-blue-500/20 via-purple-500/20 to-pink-500/20"
      iconColor="text-purple-400"
      borderColor="border-purple-500/20 hover:border-purple-500/40"
      posts={posts}
    />
  );
}
