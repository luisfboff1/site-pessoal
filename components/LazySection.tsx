'use client';
import { useState, useEffect, useRef, ReactNode } from 'react';

type LazySectionProps = {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
};

export const LazySection = ({
  children,
  fallback = <div className="min-h-screen bg-black/50" />,
  rootMargin = '200px'
}: LazySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  );
};
