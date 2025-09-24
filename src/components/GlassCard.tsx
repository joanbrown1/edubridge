import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ duration: 0.3 }}
      className={`
        relative backdrop-blur-md rounded-xl shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 
        transition-all duration-300 overflow-hidden group border
        ${theme === 'dark' 
          ? 'bg-white/5 border-white/10' 
          : 'bg-black/5 border-black/10'
        }
        ${className}
      `}
    >
      {/* Glowing border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      
      {/* Inner glow */}
      <div className={`
        absolute inset-0 rounded-xl transition-colors duration-300
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5' 
          : 'bg-gradient-to-br from-blue-500/3 to-purple-500/3'
        }
      `} />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
      
      {/* Shimmer effect */}
      <div className={`
        absolute -inset-1 bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 
        transition-opacity duration-700 transform -skew-x-12 group-hover:translate-x-full
        ${theme === 'dark' ? 'via-white/10' : 'via-black/10'}
      `} style={{ transition: 'transform 0.7s ease-in-out, opacity 0.3s ease-in-out' }} />
    </motion.div>
  );
}