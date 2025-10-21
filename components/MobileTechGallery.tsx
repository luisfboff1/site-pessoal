'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const TechRollingGallery = dynamic(() => import('@/components/TechRollingGallery'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 animate-pulse rounded-lg" />
});

export default function MobileTechGallery() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) return null;

  // Skip on mobile - too heavy
  if (isMobile) {
    return (
      <div className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Tecnologias</h2>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL'].map((tech) => (
            <div key={tech} className="p-4 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-lg border border-purple-500/30">
              <p className="text-white font-medium">{tech}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <TechRollingGallery />;
}
