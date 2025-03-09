"use client";
import React, { useMemo } from "react";

export const RainAnimation: React.FC = () => {
  const rains = useMemo(() => {
    const arr = [];
    const numDrops = 55;
    for (let i = 0; i < numDrops; i++) {
      arr.push({
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: 1 + Math.random() * 5,
        height: 8 + Math.random() * 20
      });
    }
    return arr;
  }, []);

  return (
    <div className="rain">
      {rains.map((rain, index) => (
        <div
          key={index}
          className="drop"
          style={{
            left: rain.left,
            animationDelay: rain.delay,
            animationDuration: `${rain.duration}s`,
            height: `${rain.height}px`
          }}
        />
      ))}
      <style jsx>{`
        .rain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 9999;
        }
        .drop {
          position: absolute;
          top: -10%;
          width: 1px; /* 細い線 */
          background: rgba(220, 220, 220, 0.6); /* 白背景に映える薄いグレー */
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
