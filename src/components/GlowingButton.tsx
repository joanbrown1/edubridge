import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

interface GlowingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export function GlowingButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false 
}: GlowingButtonProps) {
  const { theme } = useTheme();
  
  const baseClasses = "relative overflow-hidden rounded-lg border transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 border-blue-500/50 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-xl",
    secondary: theme === 'dark' 
      ? "bg-slate-800/50 backdrop-blur-sm border-slate-600/50 text-white shadow-lg shadow-slate-500/25 hover:shadow-slate-500/40 hover:shadow-xl"
      : "bg-white/50 backdrop-blur-sm border-slate-300/50 text-slate-800 shadow-lg shadow-slate-500/25 hover:shadow-slate-500/40 hover:shadow-xl"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {/* Glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 font-medium">{children}</span>
      
      {/* Ripple effect overlay */}
      <div className={`
        absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-lg
        ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}
      `} />
    </motion.button>
  );
}