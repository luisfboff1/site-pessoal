import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  keywords: string[];
  author: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

const ensureDirectoryExists = () => {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
};

export const getAllPosts = (): BlogPost[] => {
  ensureDirectoryExists();

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || 'Desenvolvimento',
      description: data.description || '',
      image: data.image || '/blog/default.jpg',
      keywords: data.keywords || [],
      author: data.author || 'Luis Fernando Boff',
      content,
    } as BlogPost;
  });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
};

export const getPostBySlug = (slug: string): BlogPost | null => {
  ensureDirectoryExists();

  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const altFilePath = path.join(postsDirectory, `${slug}.md`);

  const finalPath = fs.existsSync(filePath) ? filePath : fs.existsSync(altFilePath) ? altFilePath : null;

  if (!finalPath) return null;

  const fileContents = fs.readFileSync(finalPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    category: data.category || 'Desenvolvimento',
    description: data.description || '',
    image: data.image || '/blog/default.jpg',
    keywords: data.keywords || [],
    author: data.author || 'Luis Fernando Boff',
    content,
  };
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

export const getAllCategories = (): string[] => {
  const allPosts = getAllPosts();
  const categories = allPosts.map(post => post.category);
  return Array.from(new Set(categories));
};

export const getRelatedPosts = (currentSlug: string, category: string, limit = 3): BlogPost[] => {
  const categoryPosts = getPostsByCategory(category);
  return categoryPosts.filter(post => post.slug !== currentSlug).slice(0, limit);
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
