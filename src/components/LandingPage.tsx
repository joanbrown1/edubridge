import React from 'react';
import { motion } from 'motion/react';
import { GlowingButton } from './GlowingButton';
import { GlassCard } from './GlassCard';
import { Brain, FileText, HelpCircle, Layers } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center mt-12">
        {/* Animated AI Hologram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="relative">
            <Brain className="w-32 h-32 text-blue-400 animate-pulse" />
            {/* Holographic rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-40 h-40 border border-blue-500/30 rounded-full animate-spin"
                style={{ animationDuration: "8s" }}
              />
              <div
                className="absolute w-48 h-48 border border-purple-500/20 rounded-full animate-spin"
                style={{
                  animationDuration: "12s",
                  animationDirection: "reverse",
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            EduBridge
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-light">
            AI Summarizer for Complex Content
          </h2>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl mb-8 max-w-2xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
        >
          Turn complex notes into simple learning tools.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-16"
        >
          <GlowingButton
            size="lg"
            onClick={() => onNavigate("input")}
            className="text-xl px-12 py-4"
          >
            Paste Your Notes
          </GlowingButton>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <GlassCard>
            <div className="text-center">
              <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">
                Smart Summaries
              </h3>
              <p className="text-muted-foreground">
                AI-powered condensation of complex content into digestible
                insights.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="text-center">
              <HelpCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-300">
                Interactive Quizzes
              </h3>
              <p className="text-muted-foreground">
                Test your understanding with automatically generated questions.
              </p>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="text-center">
              <Layers className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-cyan-600 dark:text-cyan-300">
                Dynamic Flashcards
              </h3>
              <p className="text-muted-foreground">
                3D animated cards for effective spaced repetition learning.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* Secondary CTA */}
      <section className="py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
            Ready to transform your learning?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowingButton onClick={() => onNavigate("demo")}>
              Try Demo
            </GlowingButton>
            <GlowingButton
              variant="secondary"
              onClick={() => onNavigate("about")}
            >
              Learn More
            </GlowingButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}