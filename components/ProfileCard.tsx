'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

interface ProfileCardProps {
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  avatarUrl?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name = 'Luis Fernando Boff',
  title = 'Energia Solar & Desenvolvedor Full Stack',
  handle = 'luisfboff',
  status = 'Online',
  contactText = 'Contact Me',
  avatarUrl = '/avatar.png',
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  className = ''
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Tilt effect logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || (window.innerWidth <= 768 && !enableMobileTilt)) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setRotation({ x: rotateX, y: rotateY });
  };
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  // Gradients and effects
  const behindGradient =
    'radial-gradient(circle at 60% 40%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.10) 60%, transparent 100%), ' +
    'radial-gradient(circle at 30% 70%, rgba(34,197,94,0.15) 0%, transparent 80%), ' +
    'linear-gradient(135deg, rgba(17,25,40,0.85) 60%, rgba(139,92,246,0.15) 100%)';
  const shineGradient =
    'linear-gradient(120deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)';
  const glareGradient =
    'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 70%)';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.15s cubic-bezier(.17,.67,.83,.67)',
        background: behindGradient,
        position: 'relative',
        overflow: 'hidden'
      }}
      className={`mx-auto flex flex-col items-center justify-center rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(139,92,246,0.37)] backdrop-blur-2xl backdrop-saturate-[180%] p-8 w-full max-w-sm ${className}`}
    >
      {/* Shine */}
      <div
        style={{
          background: shineGradient,
          position: 'absolute',
          inset: 0,
          borderRadius: '1rem',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      {/* Glare */}
      <div
        style={{
          background: glareGradient,
          position: 'absolute',
          inset: 0,
          borderRadius: '1rem',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Avatar */}
      <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-violet-500/20 ring-offset-4 ring-offset-neutral-900 shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center mb-2 z-10">
        <Image
          src={avatarUrl}
          alt={`${name} - Desenvolvedor Full Stack e Especialista em Energia Solar`}
          width={112}
          height={112}
          className="w-full h-full object-cover"
          priority
          quality={85}
          fetchPriority="high"
        />
        {status && (
          <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-neutral-900 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        )}
      </div>

      {/* User Info */}
      {showUserInfo && (
        <div className="flex flex-col items-center mb-2 z-10">
          <span className="text-xs text-neutral-400">@{handle}</span>
          <span className="text-green-400 text-xs font-semibold mt-1">{status}</span>
        </div>
      )}

      {/* Name & Title */}
      <div className="text-center z-10 mb-2">
        <h2 className="text-xl font-bold text-white drop-shadow-md mb-1">{name}</h2>
        <p className="text-purple-300 text-sm font-medium">{title}</p>
      </div>

      {/* Contact Button */}
      <button
        onClick={onContactClick}
        className="inline-flex items-center px-6 py-2 mt-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-medium transition-all shadow-lg z-10"
        type="button"
      >
        {contactText}
      </button>
    </div>
  );
};

export default ProfileCard;
