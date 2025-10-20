'use client';
import React from 'react';
import { Twitter, Linkedin, Facebook, Link as LinkIcon, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

type SocialShareProps = {
  url: string;
  title: string;
  description: string;
};

export const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-blue-400/10 hover:border-blue-400/50 hover:text-blue-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-600/10 hover:border-blue-600/50 hover:text-blue-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-500'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'hover:bg-purple-500/10 hover:border-purple-500/50 hover:text-purple-500'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copiado para a área de transferência!');
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-white">Compartilhe este artigo</h3>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((link) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg
                border border-white/10 bg-white/5 backdrop-blur-sm
                text-neutral-300 transition-all
                ${link.color}
              `}
              aria-label={`Compartilhar no ${link.name}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{link.name}</span>
            </motion.a>
          );
        })}

        <motion.button
          onClick={copyToClipboard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex items-center gap-2 px-4 py-2 rounded-lg
            border border-white/10 bg-white/5 backdrop-blur-sm
            text-neutral-300 transition-all
            hover:bg-gray-500/10 hover:border-gray-400/50 hover:text-gray-400
          "
          aria-label="Copiar link"
        >
          <LinkIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Copiar Link</span>
        </motion.button>
      </div>
    </div>
  );
};
