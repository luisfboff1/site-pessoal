'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DarkVeil = dynamic(() => import('@/components/DarkVeil'), { ssr: false });

export default function MobileOptimizedBackground() {
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Consider tablets as mobile too
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render anything during SSR
  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-950 via-black to-gray-900" />
    );
  }

  // Mobile: Simple CSS gradient (super light)
  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-10">
        {/* Static gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-900" />

        {/* Subtle animated orbs - CSS only */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"
             style={{ animationDuration: '10s', animationDelay: '1s' }} />
      </div>
    );
  }

  // Desktop: Full WebGL experience
  return (
    <div className="fixed inset-0 z-0" style={{ width: '100%', height: '100vh' }}>
      <DarkVeil
        hueShift={0}
        noiseIntensity={0.12}
        scanlineIntensity={0}
        speed={0.5}
        scanlineFrequency={0}
        warpAmount={0.8}
        resolutionScale={1}
      />
    </div>
  );
}
