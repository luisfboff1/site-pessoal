'use client';
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

type CommentsProps = {
  repo: string; // Format: "username/repo"
  theme?: 'github-dark' | 'github-light';
};

export const Comments = ({ repo, theme = 'github-dark' }: CommentsProps) => {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const commentsContainer = commentsRef.current;

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', repo);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (commentsContainer) {
      commentsContainer.appendChild(script);
    }

    return () => {
      if (commentsContainer) {
        commentsContainer.innerHTML = '';
      }
    };
  }, [repo, theme]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30">
          <MessageCircle className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Comentários</h3>
          <p className="text-sm text-neutral-400">Compartilhe sua opinião ou dúvidas</p>
        </div>
      </div>

      {/* Utterances container */}
      <div
        ref={commentsRef}
        className="utterances-container"
      />

      {/* Styling for Utterances */}
      <style jsx global>{`
        .utterances {
          max-width: 100%;
        }
        .utterances-frame {
          border-radius: 12px !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </motion.div>
  );
};
