import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts, getAllCategories } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog | Energia Solar, Desenvolvimento e Data Science',
  description:
    'Artigos sobre energia solar fotovoltaica, desenvolvimento web com Next.js e React, data science com Python e muito mais.',
};

const BlogPage = () => {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Blog</h1>
        <p className="text-xl text-gray-400 mb-12 text-center">
          Artigos sobre energia solar, desenvolvimento web e data science
        </p>

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <span
                key={category}
                className="px-4 py-2 bg-purple-600/20 border border-purple-500/50 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-neutral-900/50 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all"
            >
              <div className="relative h-48 w-full bg-neutral-800">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                  />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-purple-400">{post.category}</span>
                  <time className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString('pt-BR')}</time>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h2>
                <p className="text-sm text-gray-400 line-clamp-3">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">Nenhum post publicado ainda. Em breve teremos conteúdo por aqui!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogPage;
