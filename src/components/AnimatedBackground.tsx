import React from 'react';
import { useTheme } from './ThemeProvider';

export function AnimatedBackground() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div
        className={`
        absolute inset-0 animate-pulse transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
        }
      `}
        style={{ animationDuration: "8s" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 rounded-full animate-bounce transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-blue-400 opacity-60"
                  : "bg-blue-600 opacity-40"
              }
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric waves */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          theme === "dark" ? "opacity-10" : "opacity-5"
        }`}
      >
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#9333EA" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q250,50 500,100 T1000,100 L1000,200 L0,200 Z"
            fill="url(#wave-gradient)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div
        className={`
        absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-xl animate-pulse transition-colors duration-300
        ${theme === "dark" ? "bg-blue-500/20" : "bg-blue-500/10"}
      `}
      />
      <div
        className={`
        absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full blur-xl animate-pulse transition-colors duration-300
        ${theme === "dark" ? "bg-purple-500/20" : "bg-purple-500/10"}
      `}
        style={{ animationDelay: "2s" }}
      />
      <div
        className={`
        absolute top-1/2 right-1/3 w-20 h-20 rounded-full blur-xl animate-pulse transition-colors duration-300
        ${theme === "dark" ? "bg-cyan-500/20" : "bg-cyan-500/10"}
      `}
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}