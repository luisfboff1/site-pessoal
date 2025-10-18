'use client';
import React, { useEffect, useState } from 'react';
import './ModernRobot.css';

export const ModernRobot: React.FC = () => {
  const [pupilPosition, setPupilPosition] = useState({ x: 4, y: 5.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const panda = document.querySelector('.panda-container') as HTMLElement;
      if (panda) {
        const rect = panda.getBoundingClientRect();
        const pandaCenterX = rect.left + rect.width / 2;
        const pandaCenterY = rect.top + rect.height / 2;

        // Calcular ângulo para o mouse
        const deltaX = e.clientX - pandaCenterX;
        const deltaY = e.clientY - pandaCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        
        // Limitar movimento das pupilas dentro do olho
          const maxMove = 2.5;
          const pupilX = 4 + Math.cos(angle) * maxMove;
          const pupilY = 5.5 + Math.sin(angle) * maxMove;
        
        setPupilPosition({ x: pupilX, y: pupilY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="panda-container">
      <div className="panda-head">
        {/* Orelhas */}
        <div className="ear ear-left" />
        <div className="ear ear-right" />

        {/* Manchas dos olhos */}
        <div className="eye-patch eye-patch-left" />
        <div className="eye-patch eye-patch-right" />

        {/* Olho esquerdo */}
        <div className="eye eye-left">
          <div 
            className="pupil"
            style={{
              top: `${pupilPosition.y}px`,
              left: `${pupilPosition.x}px`,
            }}
          />
        </div>

        {/* Olho direito */}
        <div className="eye eye-right">
          <div 
            className="pupil"
            style={{
              top: `${pupilPosition.y}px`,
              left: `${pupilPosition.x}px`,
            }}
          />
        </div>

        {/* Nariz */}
        <div className="nose" />

        {/* Boca */}
        <div className="mouth" />
      </div>
    </div>
  );
};

export default ModernRobot;
