// Mapeamento estático de posts do blog e páginas de portfólio
export const blogPosts = [
  {
    title: 'Como Desenvolver um Portfolio Moderno com Next.js 15',
    url: '/blog/como-desenvolver-portfolio-nextjs',
    keywords: ['portfolio', 'next.js', 'nextjs', 'portfolio nextjs', 'desenvolver portfolio']
  },
  {
    title: 'Deep Learning com PyTorch em Produção',
    url: '/blog/ciencia-dados/deep-learning-pytorch-producao',
    keywords: ['pytorch', 'deep learning', 'deep-learning', 'pytorch produção']
  },
  {
    title: 'Guia Completo do App Router do Next.js',
    url: '/blog/desenvolvimento/next-js-app-router-guia-completo',
    keywords: ['nextjs', 'app router', 'next js', 'roteamento']
  },
  {
    title: 'Dimensionamento de Sistema Fotovoltaico',
    url: '/blog/energia-solar/dimensionamento-sistema-fotovoltaico',
    keywords: ['dimensionamento', 'fotovoltaico', 'energia solar']
  }
];

export const portfolioPages = [
  {
    title: 'Desenvolvimento',
    url: '/portfolio/desenvolvimento',
    keywords: ['desenvolvimento', 'dev', 'web', 'aplicações', 'projetos']
  },
  {
    title: 'Energia Solar',
    url: '/portfolio/energia-solar',
    keywords: ['energia solar', 'fotovoltaico', 'solar']
  },
  {
    title: 'Ciência de Dados',
    url: '/portfolio/ciencia-dados',
    keywords: ['ciência de dados', 'data science', 'machine learning']
  }
];

export const contactPage = {
  title: 'Contato',
  url: '/#contact',
  keywords: ['contato', 'falar', 'contratar']
};

const linkMap = {
  blogPosts,
  portfolioPages,
  contactPage
};

export default linkMap;
