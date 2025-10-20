import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const POSTS_PATH = path.join(process.cwd(), 'content', 'blog');

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  readTime: string;
  content: string;
};

const ensureDirectoryExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const getAllPosts = (): BlogPost[] => {
  ensureDirectoryExists(POSTS_PATH);

  const categories = fs.readdirSync(POSTS_PATH).filter(file => {
    const filePath = path.join(POSTS_PATH, file);
    return fs.statSync(filePath).isDirectory();
  });

  const posts: BlogPost[] = [];

  categories.forEach(category => {
    const categoryPath = path.join(POSTS_PATH, category);
    const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx'));

    files.forEach(file => {
      const slug = file.replace(/\.mdx$/, '');
      const post = getPostBySlug(category, slug);
      if (post) {
        posts.push(post);
      }
    });
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  const categoryPath = path.join(POSTS_PATH, category);

  ensureDirectoryExists(categoryPath);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath).filter(file => file.endsWith('.mdx'));

  const posts: BlogPost[] = files.map(file => {
    const slug = file.replace(/\.mdx$/, '');
    return getPostBySlug(category, slug);
  }).filter((post): post is BlogPost => post !== null);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (category: string, slug: string): BlogPost | null => {
  const fullPath = path.join(POSTS_PATH, category, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const { text: readTime } = readingTime(content);

  return {
    slug,
    category,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'Luis Fernando Boff',
    image: data.image || '',
    tags: data.tags || [],
    readTime,
    content,
  };
};

export const getAllCategories = (): string[] => {
  ensureDirectoryExists(POSTS_PATH);

  return fs.readdirSync(POSTS_PATH).filter(file => {
    const filePath = path.join(POSTS_PATH, file);
    return fs.statSync(filePath).isDirectory();
  });
};

export const getCategorySlugs = (category: string): string[] => {
  const categoryPath = path.join(POSTS_PATH, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  return fs.readdirSync(categoryPath)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''));
};
