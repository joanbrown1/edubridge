import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GlowingButton } from "./GlowingButton";
import { GlassCard } from "./GlassCard";
import { Zap, Sparkles } from "lucide-react";
import { useAPI } from "../hooks/useAPI";

interface DemoPageProps {
  onNavigate: (page: string, data?: any) => void; // updated to accept data
}

const demoContent = `Machine Learning and Artificial Intelligence

Machine learning is a subset of artificial intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. Machine learning focuses on the development of computer programs that can access data and use it to learn for themselves.

The process of learning begins with observations or data, such as examples, direct experience, or instruction, in order to look for patterns in data and make better decisions in the future based on the examples that we provide. The primary aim is to allow the computers to learn automatically without human intervention or assistance and adjust actions accordingly.

Deep Learning is a subset of machine learning that uses multi-layered artificial neural networks to deliver state-of-the-art accuracy in tasks such as object detection, speech recognition, language translation, and more.

Neural networks are computing systems inspired by the biological neural networks that constitute animal brains. Such systems learn to perform tasks by considering examples, generally without being programmed with any task-specific rules.`;

export function DemoPage({ onNavigate }: DemoPageProps) {
  const [typedContent, setTypedContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { loading, error, processText } = useAPI();

  useEffect(() => {
    // Simulate typing animation
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < demoContent.length) {
        setTypedContent(demoContent.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const handleDemo = async () => {
    setIsProcessing(true);
    try {
      // call API with demo text, default to "high-school"
      const result = await processText(demoContent, "high-school");
      setIsProcessing(false);

      if (result.success) {
        setShowResults(true);

        // after preview, navigate with full data
        setTimeout(() => {
          onNavigate("results", result.data);
        }, 1500);
      }
    } catch (err) {
      console.error("Demo failed:", err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen text-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Interactive Demo
          </h1>
          <p className="text-slate-300 text-lg">
            See EduBridge in action with sample content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Demo */}
          <GlassCard>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">
              Sample Content
            </h2>
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg p-4 h-64 overflow-y-auto">
                <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono">
                  {typedContent}
                  <span className="animate-pulse text-blue-400">|</span>
                </pre>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-lg pointer-events-none" />
            </div>

            <div className="mt-6">
              <GlowingButton
                onClick={handleDemo}
                disabled={loading || isProcessing || showResults}
                className="w-full"
                size="lg"
              >
                {loading || isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing Demo...
                  </div>
                ) : showResults ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Demo Complete!
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Generate AI Outputs
                  </>
                )}
              </GlowingButton>
            </div>
          </GlassCard>

          {/* Results Preview */}
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: showResults ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard>
              <h2 className="text-xl font-semibold text-purple-300 mb-4">
                Generated Results Preview
              </h2>

              {loading || isProcessing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 border-4 border-slate-600/30 rounded-full mx-auto relative">
                      <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin" />
                      <div
                        className="absolute inset-2 border-2 border-transparent border-t-cyan-400 rounded-full animate-spin"
                        style={{
                          animationDirection: "reverse",
                          animationDuration: "1.5s",
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-slate-300">
                    AI is analyzing the content...
                  </p>
                </motion.div>
              ) : showResults ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-blue-500/20">
                    <h3 className="text-blue-300 font-semibold mb-2">
                      📄 Summary
                    </h3>
                    <p className="text-slate-300 text-sm">
                      AI-generated summary highlighting key concepts...
                    </p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-purple-500/20">
                    <h3 className="text-purple-300 font-semibold mb-2">
                      🧠 Quiz
                    </h3>
                    <p className="text-slate-300 text-sm">
                      Sample questions generated to test understanding...
                    </p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-cyan-500/20">
                    <h3 className="text-cyan-300 font-semibold mb-2">
                      🃏 Flashcards
                    </h3>
                    <p className="text-slate-300 text-sm">
                      Interactive flashcards for revision...
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Results will appear here after processing</p>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12 space-x-4">
          <GlowingButton
            variant="secondary"
            onClick={() => onNavigate("input")}
          >
            Try Your Own Content
          </GlowingButton>
          <GlowingButton
            variant="secondary"
            onClick={() => onNavigate("landing")}
          >
            Back to Home
          </GlowingButton>
        </div>
      </motion.div>
    </div>
  );
}
