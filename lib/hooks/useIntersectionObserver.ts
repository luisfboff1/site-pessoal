import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const { threshold = 0.5, rootMargin = '-100px', freezeOnceVisible = false } = options;

  const elementRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozenRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (frozenRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIsIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting && freezeOnceVisible) {
          frozenRef.current = true;
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, freezeOnceVisible]);

  return [elementRef, isIntersecting];
};
