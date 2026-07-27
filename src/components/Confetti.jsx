import React, { useEffect, useState } from 'react';
import '../css/global.css';

export default function Confetti({ trigger, duration = 4000 }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#FFA6C9', '#F8C8DC', '#6E3A52', '#63C174', '#F4A261', '#FFF8FB'];
      const shapes = ['circle', 'square', 'triangle'];
      
      const newParticles = Array.from({ length: 60 }).map((_, index) => {
        const size = Math.random() * 12 + 6; // size between 6px and 18px
        return {
          id: index,
          left: `${Math.random() * 100}vw`,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          size: `${size}px`,
          delay: `${Math.random() * 2}s`,
          duration: `${Math.random() * 2 + 2}s`, // fall duration 2-4s
          rotation: `${Math.random() * 360}deg`
        };
      });

      setParticles(newParticles);

      // Auto-clear particles after duration
      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  if (particles.length === 0) return null;

  return (
    <div className="confetti-wrapper">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`confetti-particle ${p.shape}`}
          style={{
            left: p.left,
            backgroundColor: p.shape !== 'triangle' ? p.color : 'transparent',
            borderBottomColor: p.shape === 'triangle' ? p.color : undefined,
            width: p.shape !== 'triangle' ? p.size : 0,
            height: p.shape !== 'triangle' ? p.size : 0,
            borderLeftWidth: p.shape === 'triangle' ? `calc(${p.size} / 2)` : undefined,
            borderRightWidth: p.shape === 'triangle' ? `calc(${p.size} / 2)` : undefined,
            borderBottomWidth: p.shape === 'triangle' ? p.size : undefined,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotation})`
          }}
        />
      ))}

      <style>{`
        .confetti-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 99999;
          overflow: hidden;
        }

        .confetti-particle {
          position: absolute;
          top: -20px;
          opacity: 0.8;
          animation: fall-rotate linear forwards;
        }

        .confetti-particle.circle {
          border-radius: 50%;
        }

        .confetti-particle.triangle {
          width: 0;
          height: 0;
          border-left-style: solid;
          border-left-color: transparent;
          border-right-style: solid;
          border-right-color: transparent;
          border-bottom-style: solid;
          background-color: transparent !important;
        }

        @keyframes fall-rotate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
