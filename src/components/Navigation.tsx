import React from 'react';
import { motion } from 'motion/react';
import {
  Home,
  Upload,
  BarChart3,
  Play,
  Info,
  History,
  Sun,
  Moon,
  GraduationCap,
} from "lucide-react";
import { useTheme } from './ThemeProvider';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  token?: string | null;
}

const navItems = [
  { id: 'landing', label: 'Home', icon: Home },
  { id: 'input', label: 'Input', icon: Upload },
  { id: 'results', label: 'Results', icon: BarChart3 },
  { id: 'history', label: 'History', icon: History },
  { id: 'demo', label: 'Demo', icon: Play },
  { id: 'about', label: 'About', icon: Info }
];

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate("landing")}
          >
            <GraduationCap className="w-8 h-8 text-blue-400 animate-pulse" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              EduBridge
            </span>
          </motion.div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    relative flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300
                    ${
                      isActive
                        ? "text-foreground bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}

            {/* Desktop Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 ml-4 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onNavigate(item.id)}
                    className={`
                      p-2 rounded-lg transition-all duration-300 flex items-center justify-center
                      ${
                        isActive
                          ? "text-foreground bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}