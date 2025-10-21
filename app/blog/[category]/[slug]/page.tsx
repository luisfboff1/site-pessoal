import React from 'react';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import Image from 'next/image';
import { getPostBySlug, getCategorySlugs, getAllCategories } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';
import { SocialShare } from '@/components/blog/SocialShare';
import { Newsletter } from '@/components/blog/Newsletter';
import { Comments } from '@/components/blog/Comments';
import { BlogPostSchema, BreadcrumbSchema } from '@/components/blog/BlogSchema';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import Link from 'next/link';

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  const paths: Array<{ category: string; slug: string }> = [];

  categories.forEach(category => {
    const slugs = getCategorySlugs(category);
    slugs.forEach(slug => {
      paths.push({ category, slug });
    });
  });

  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.category, resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post não encontrado'
    };
  }

  const url = `https://luisfboff.com/blog/${resolvedParams.category}/${resolvedParams.slug}`;

  return {
    title: `${post.title} | Luis Fernando Boff`,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      url
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image]
    },
    alternates: {
      canonical: url
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.category, resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const categoryNames: Record<string, string> = {
    'energia-solar': 'Energia Solar',
    'desenvolvimento': 'Desenvolvimento',
    'ciencia-dados': 'Ciência de Dados'
  };

  const categoryName = categoryNames[resolvedParams.category] || resolvedParams.category;
  const postUrl = `https://luisfboff.com/blog/${resolvedParams.category}/${resolvedParams.slug}`;

  return (
    <>
      <BlogPostSchema
        title={post.title}
        description={post.description}
        author={post.author}
        datePublished={post.date}
        image={post.image}
        url={postUrl}
        category={categoryName}
        tags={post.tags}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://luisfboff.com' },
          { name: 'Blog', url: 'https://luisfboff.com/blog' },
          { name: categoryName, url: `https://luisfboff.com/blog/${resolvedParams.category}` },
          { name: post.title, url: postUrl }
        ]}
      />

  <main className="relative min-h-screen overflow-hidden bg-black">
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-950/20 via-black to-black" />
        <div className="fixed top-20 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10" />
        <div className="fixed bottom-20 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -z-10" />

        <div className="relative z-10">
          <article className="container mx-auto px-4 py-20 md:py-32 mt-16 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>/</span>
              <Link href={`/blog/${resolvedParams.category}`} className="hover:text-white transition-colors">
                {categoryName}
              </Link>
              <span>/</span>
              <span className="text-neutral-500">{post.title}</span>
            </nav>

            {/* Back button */}
            <Link
              href={`/blog/${resolvedParams.category}`}
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para {categoryName}
            </Link>

            {/* Hero image */}
            {post.image && (
              <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-neutral-400 mb-8 pb-8 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-3 mb-12">
                <Tag className="w-4 h-4 text-neutral-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none mb-16">
              <MDXRemote source={post.content} components={MDXComponents} />
            </div>

            {/* Divider */}
            <hr className="border-neutral-800 my-16" />

            {/* Social Share */}
            <div className="mb-16">
              <SocialShare
                url={postUrl}
                title={post.title}
                description={post.description}
              />
            </div>

            {/* Newsletter */}
            <div className="mb-16">
              <Newsletter />
            </div>

            {/* Comments */}
            <div>
              <Comments repo="luisfboff1/portfolio-comments" />
            </div>
          </article>

          <div className="h-24" />
        </div>
      </main>
    </>
  );
}
