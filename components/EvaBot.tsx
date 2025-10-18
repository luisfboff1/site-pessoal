'use client';
import React, { useEffect, useRef } from 'react';
import styles from './EvaBot.module.css';

// Simple mouse-follow smoothing
function useMouseFollower() {
  const targetRef = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const get = () => pos.current;

  const start = () => {
    const tick = () => {
      // lerp towards target (smooth following)
      const p = pos.current;
      const t = targetRef.current;
      const dx = t.x - p.x;
      const dy = t.y - p.y;
      p.x += dx * 0.18;
      p.y += dy * 0.18;
      raf.current = requestAnimationFrame(tick);
    };
    if (raf.current == null) raf.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (raf.current != null) cancelAnimationFrame(raf.current);
    raf.current = null;
  };

  return { get, start, stop };
}

type EvaBotProps = {
  inline?: boolean;
  size?: number; // in rem
};

export default function EvaBot({ inline = false, size = 20 }: EvaBotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const evaRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const follower = useMouseFollower();

  useEffect(() => {
    follower.start();
    return () => follower.stop();
  }, []);

  // Update transforms each frame
  useEffect(() => {
    let raf: number;
    const loop = () => {
      const cont = containerRef.current;
      const eva = evaRef.current;
      const head = headRef.current;
      const leftEye = leftEyeRef.current;
      const rightEye = rightEyeRef.current;
      if (cont && eva && head && leftEye && rightEye) {
        const rect = cont.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const { x, y } = follower.get();
        const dx = x - centerX;
        const dy = y - centerY;
        const angle = Math.atan2(dy, dx);

        // Normalize to [-1, 1]
        const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
        const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));

        // Body/EVA subtle 3D tilt
        const bodyYaw = nx * 12;   // left/right
        const bodyPitch = -ny * 8; // up/down
        eva.style.willChange = 'transform';
        eva.style.transform = `rotateY(${bodyYaw}deg) rotateX(${bodyPitch}deg)`;

        // Head adds a bit more yaw for parallax
        const headYaw = nx * 18;
        const headPitch = -ny * 6;
        head.style.willChange = 'transform';
        head.style.transform = `rotateY(${headYaw}deg) rotateX(${headPitch}deg)`;

        // Eyes look around inside the eye chamber
        const eyeOffsetX = nx * 6; // px
        const eyeOffsetY = ny * 4; // px
        leftEye.style.willChange = 'transform';
        leftEye.style.transform = `translate(${eyeOffsetX}px, calc(-50% + ${eyeOffsetY}px)) rotate(-65deg)`;
        rightEye.style.willChange = 'transform';
        rightEye.style.transform = `translate(${eyeOffsetX}px, calc(-50% + ${eyeOffsetY}px)) rotate(65deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (inline) {
    return (
      <div ref={containerRef} aria-hidden style={{ pointerEvents: 'none' }}>
        <div className={styles.modelViewPort} style={{ width: `${size}rem` }}>
          <div className={styles.eva} ref={evaRef}>
            <div className={styles.head} ref={headRef}>
              <div className={styles.eyeChamber}>
                <div className={styles.eye} ref={leftEyeRef}></div>
                <div className={styles.eye} ref={rightEyeRef}></div>
              </div>
            </div>
            <div className={styles.body}>
              <div className={`${styles.hand} ${styles.handLeft}`}></div>
              <div className={`${styles.hand} ${styles.handRight}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.fixedContainer} ref={containerRef} aria-hidden>
      <div className={styles.modelViewPort}>
        <div className={styles.eva} ref={evaRef}>
          <div className={styles.head} ref={headRef}>
            <div className={styles.eyeChamber}>
              <div className={styles.eye} ref={leftEyeRef}></div>
              <div className={styles.eye} ref={rightEyeRef}></div>
            </div>
          </div>
          <div className={styles.body}>
            <div className={`${styles.hand} ${styles.handLeft}`}></div>
            <div className={`${styles.hand} ${styles.handRight}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
