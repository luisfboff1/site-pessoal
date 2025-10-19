export const PersonStructuredData = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luis Fernando Boff',
    jobTitle: 'Desenvolvedor Full Stack e Especialista em Energia Solar',
    url: 'https://luisfboff.com',
    image: 'https://luisfboff.com/avatar.png',
    sameAs: [
      'https://linkedin.com/in/luisfboff',
      'https://github.com/luisfboff',
      'https://twitter.com/luisfboff',
    ],
    knowsAbout: [
      'Full Stack Development',
      'Solar Energy',
      'Data Science',
      'Next.js',
      'React',
      'Python',
      'TypeScript',
      'Machine Learning',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
};

export const OrganizationStructuredData = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Luis Fernando Boff',
    url: 'https://luisfboff.com',
    logo: 'https://luisfboff.com/avatar.png',
    description: 'Especialista em Energia Solar e Desenvolvedor Full Stack',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@luisfboff.com',
      contactType: 'Professional',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
};

export const WebSiteStructuredData = () => {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Luis Fernando Boff Portfolio',
    url: 'https://luisfboff.com',
    description: 'Portfolio profissional de Luis Fernando Boff - Desenvolvedor Full Stack e Especialista em Energia Solar',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
};

export const BlogPostStructuredData = ({
  title,
  description,
  datePublished,
  dateModified,
  image,
  author = 'Luis Fernando Boff',
  keywords = [],
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image: string;
  author?: string;
  keywords?: string[];
}) => {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Luis Fernando Boff',
      logo: {
        '@type': 'ImageObject',
        url: 'https://luisfboff.com/avatar.png',
      },
    },
    keywords: keywords.join(', '),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
};
