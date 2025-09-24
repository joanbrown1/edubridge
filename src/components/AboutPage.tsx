import React from 'react';
import { motion } from 'motion/react';
import { GlowingButton } from './GlowingButton';
import { GlassCard } from './GlassCard';
import { Target, Users, Zap, BookOpen, Trophy, Star } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const teamMembers = [
  {
    name: "Alex Chen",
    role: "AI Engineer",
    description: "Specialist in NLP and machine learning algorithms",
    avatar: "👨‍💻"
  },
  {
    name: "Sarah Johnson",
    role: "UX Designer",
    description: "Expert in educational technology and user experience",
    avatar: "👩‍🎨"
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager",
    description: "Focused on learning optimization and user engagement",
    avatar: "👨‍💼"
  }
];

const metrics = [
  { label: "Content Processed", value: "50K+", icon: BookOpen },
  { label: "Learning Sessions", value: "25K+", icon: Target },
  { label: "Students Helped", value: "10K+", icon: Users },
  { label: "Success Rate", value: "94%", icon: Trophy }
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen text-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            About EduBridge
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            Revolutionizing education through AI-powered content transformation, 
            making complex learning materials accessible and engaging for everyone.
          </motion.p>
        </div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <GlassCard>
            <div className="text-center">
              <Target className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-3xl font-semibold text-blue-300 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
                To democratize learning by transforming complex educational content into digestible, 
                interactive formats that enhance comprehension and retention. We believe that every 
                student deserves access to personalized, AI-powered learning tools that adapt to 
                their unique learning style.
              </p>
            </div>
          </GlassCard>
        </motion.section>

        {/* Features Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-purple-300 mb-12">
            How It Works
          </h2>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Content Analysis",
                description: "Advanced NLP algorithms analyze your content structure and extract key concepts",
                icon: BookOpen,
                color: "blue"
              },
              {
                step: "02", 
                title: "Smart Processing",
                description: "AI identifies relationships between concepts and creates learning pathways",
                icon: Zap,
                color: "purple"
              },
              {
                step: "03",
                title: "Output Generation",
                description: "Automated creation of summaries, quizzes, and interactive flashcards",
                icon: Star,
                color: "cyan"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.step}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                className="flex items-center gap-8"
              >
                <div className={`
                  w-20 h-20 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${feature.color === 'blue' ? 'border-blue-500/50 bg-blue-500/10' : ''}
                  ${feature.color === 'purple' ? 'border-purple-500/50 bg-purple-500/10' : ''}
                  ${feature.color === 'cyan' ? 'border-cyan-500/50 bg-cyan-500/10' : ''}
                `}>
                  <feature.icon className={`
                    w-8 h-8
                    ${feature.color === 'blue' ? 'text-blue-400' : ''}
                    ${feature.color === 'purple' ? 'text-purple-400' : ''}
                    ${feature.color === 'cyan' ? 'text-cyan-400' : ''}
                  `} />
                </div>
                
                <GlassCard className="flex-1" hover={false}>
                  <div className="flex items-center gap-4">
                    <span className={`
                      text-2xl font-bold opacity-50
                      ${feature.color === 'blue' ? 'text-blue-400' : ''}
                      ${feature.color === 'purple' ? 'text-purple-400' : ''}
                      ${feature.color === 'cyan' ? 'text-cyan-400' : ''}
                    `}>
                      {feature.step}
                    </span>
                    <div>
                      <h3 className={`
                        text-xl font-semibold mb-2
                        ${feature.color === 'blue' ? 'text-blue-300' : ''}
                        ${feature.color === 'purple' ? 'text-purple-300' : ''}
                        ${feature.color === 'cyan' ? 'text-cyan-300' : ''}
                      `}>
                        {feature.title}
                      </h3>
                      <p className="text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Impact Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-cyan-300 mb-12">
            Our Impact
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
              >
                <GlassCard>
                  <div className="text-center">
                    <metric.icon className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white mb-2">
                      {metric.value}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {metric.label}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-blue-300 mb-12">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.15, duration: 0.6 }}
              >
                <GlassCard>
                  <div className="text-center">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {member.name}
                    </h3>
                    <div className="text-blue-300 font-medium mb-3">
                      {member.role}
                    </div>
                    <p className="text-slate-400 text-sm">
                      {member.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-center"
        >
          <GlassCard>
            <div className="py-8">
              <h2 className="text-3xl font-semibold text-white mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students and educators who are already using EduBridge 
                to enhance their learning experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GlowingButton size="lg" onClick={() => onNavigate('input')}>
                  Get Started Now
                </GlowingButton>
                <GlowingButton variant="secondary" size="lg" onClick={() => onNavigate('demo')}>
                  Try Demo
                </GlowingButton>
              </div>
            </div>
          </GlassCard>
        </motion.section>
      </motion.div>
    </div>
  );
}