import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlowingButton } from "./GlowingButton";
import { GlassCard } from "./GlassCard";
import {
  FileText,
  HelpCircle,
  Layers,
  Volume2,
  Download,
  RotateCcw,
  CheckCircle,
  Save,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";

interface ResultsPageProps {
  onNavigate: (page: string, data?: any) => void;
  data: any;
  token?: string | null;
}

export function ResultsPage({ onNavigate, data }: ResultsPageProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Redirect to input if no data
  useEffect(() => {
    if (!data) {
      onNavigate("input");
    }
  }, [data, onNavigate]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="text-center">
          <p className="text-muted-foreground mb-4">No results to display</p>
          <GlowingButton onClick={() => onNavigate("input")}>
            Process Content
          </GlowingButton>
        </GlassCard>
      </div>
    );
  }

  // Extract data from the API response
  const { summary, quiz = [], flashcards = [], metadata } = data;
  const hasValidQuiz = quiz.length > 0;
  const hasValidFlashcards = flashcards.length > 0;

  const tabs = [
    { id: "summary", label: "Summary", icon: FileText },
    { id: "quiz", label: "Quiz", icon: HelpCircle, disabled: !hasValidQuiz },
    {
      id: "flashcards",
      label: "Flashcards",
      icon: Layers,
      disabled: !hasValidFlashcards,
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (!hasValidQuiz || !quiz[currentQuestion]) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestion < quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 5000);
  };

  const nextCard = () => {
    if (!hasValidFlashcards) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    if (!hasValidFlashcards) return;
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard(
        (prev) => (prev - 1 + flashcards.length) % flashcards.length
      );
    }, 150);
  };

  const exportResults = () => {
    const exportData = {
      summary,
      quiz: quiz.map((q, i) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.options[q.correctIndex],
        explanation: q.explanation,
      })),
      flashcards,
      metadata,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `edubridge-results-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    loadVoices();

    // Some browsers load voices async
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!summary) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    // Try to pick a female voice
    const femaleVoice =
      voices.find((v) => /female|woman|girl/i.test(v.name + v.voiceURI)) ||
      voices.find((v) => v.name.includes("Google US English")) ||
      voices[0];

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      onNavigate("login");
      return;
    }

    try {
      const res = await fetch(
        "https://api.edubridge.jaybrown.xyz/user/save-history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            summary,
            quiz,
            flashcards,
            originalText: metadata?.originalText || "",
            level: metadata?.level || "unknown",
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success(" Saved to history!");
      } else {
        toast.error(" Failed to save: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      toast.error(" Something went wrong saving your results.");
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Learning Materials
          </h1>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full border border-green-500/30">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-300 font-medium">
                {metadata?.isDemo
                  ? "Demo Content Generated"
                  : "AI Generated Successfully"}
              </span>
            </div>

            <div className="flex gap-2">
              <GlowingButton
                variant="secondary"
                size="sm"
                onClick={exportResults}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </GlowingButton>

              <GlowingButton variant="secondary" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </GlowingButton>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-600/50 p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => !tab.disabled && setActiveTab(tab.id)}
                  disabled={tab.disabled}
                  className={`
                    relative flex items-center px-6 py-3 rounded-lg transition-all duration-300 font-medium
                    ${
                      tab.disabled
                        ? "text-slate-500 cursor-not-allowed opacity-50"
                        : activeTab === tab.id
                        ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                  {activeTab === tab.id && !tab.disabled && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg -z-10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard>
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-blue-300 mb-4">
                    AI-Generated Summary
                  </h2>

                  <div className="prose prose-invert max-w-none">
                    <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {summary || "No summary available"}
                    </div>

                    {metadata && (
                      <div className="mt-6 pt-4 border-t border-slate-600/30">
                        <p className="text-sm text-slate-400">
                          Processed {metadata.textLength} characters at{" "}
                          {metadata.level?.replace("-", " ")} level
                          {metadata.aiService && ` using ${metadata.aiService}`}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-600/30">
                    <GlowingButton variant="secondary" onClick={handleSpeak}>
                      <Volume2 className="w-4 h-4 mr-2" />
                      {isSpeaking ? "Stop" : "Listen"}
                    </GlowingButton>

                    <GlowingButton variant="secondary" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </GlowingButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === "quiz" && hasValidQuiz && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-purple-300">
                      Interactive Quiz
                    </h2>
                    <span className="text-slate-400">
                      Question {currentQuestion + 1} of {quiz.length}
                    </span>
                  </div>

                  {quiz[currentQuestion] && (
                    <div className="space-y-6">
                      <h3 className="text-xl text-white font-medium">
                        {quiz[currentQuestion].question}
                      </h3>

                      <div className="space-y-3">
                        {quiz[currentQuestion].options?.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                            className={`
                              w-full p-4 rounded-lg border transition-all duration-300 text-left
                              ${
                                selectedAnswer === index
                                  ? index === quiz[currentQuestion].correctIndex
                                    ? "bg-green-500/20 border-green-500/50 text-green-300"
                                    : "bg-red-500/20 border-red-500/50 text-red-300"
                                  : showResult &&
                                    index === quiz[currentQuestion].correctIndex
                                  ? "bg-green-500/20 border-green-500/50 text-green-300"
                                  : "bg-slate-700/30 border-slate-600/50 text-slate-300 hover:bg-slate-600/30 hover:border-slate-500/50"
                              }
                              disabled:cursor-not-allowed
                            `}
                          >
                            <div className="flex items-center">
                              <span className="w-8 h-8 bg-slate-600/50 rounded-full flex items-center justify-center mr-3 text-sm">
                                {String.fromCharCode(65 + index)}
                              </span>
                              {option}
                            </div>
                          </button>
                        ))}
                      </div>

                      {showResult && quiz[currentQuestion].explanation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg bg-blue-500/20 border border-blue-500/50"
                        >
                          <p className="text-blue-300 font-medium mb-2">
                            {selectedAnswer ===
                            quiz[currentQuestion].correctIndex
                              ? "✓ Correct!"
                              : "✗ Incorrect"}
                          </p>
                          <p className="text-slate-300">
                            {quiz[currentQuestion].explanation}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === "flashcards" && hasValidFlashcards && (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
                    Study Flashcards
                  </h2>
                  <p className="text-slate-400">
                    Card {currentCard + 1} of {flashcards.length}
                  </p>
                </div>

                {flashcards[currentCard] && (
                  <>
                    <div className="relative h-64 mb-8">
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full preserve-3d cursor-pointer"
                        onClick={() => setIsFlipped(!isFlipped)}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden">
                          <GlassCard className="h-full" hover={false}>
                            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                              <h3 className="text-xl font-semibold text-blue-300 mb-4">
                                Question
                              </h3>
                              <p className="text-lg text-white">
                                {flashcards[currentCard].front}
                              </p>
                              <p className="text-sm text-slate-400 mt-4">
                                Click to reveal answer
                              </p>
                            </div>
                          </GlassCard>
                        </div>

                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180">
                          <GlassCard className="h-full" hover={false}>
                            <div className="h-full flex flex-col items-center justify-center text-center p-8">
                              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                                Answer
                              </h3>
                              <p className="text-lg text-white">
                                {flashcards[currentCard].back}
                              </p>
                              <p className="text-sm text-slate-400 mt-4">
                                Click to flip back
                              </p>
                            </div>
                          </GlassCard>
                        </div>
                      </motion.div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center space-x-4">
                      <GlowingButton variant="secondary" onClick={prevCard}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Previous
                      </GlowingButton>
                      <GlowingButton onClick={() => setIsFlipped(!isFlipped)}>
                        Flip Card
                      </GlowingButton>
                      <GlowingButton variant="secondary" onClick={nextCard}>
                        Next
                        <RotateCcw className="w-4 h-4 ml-2 rotate-180" />
                      </GlowingButton>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Input */}
        <div className="text-center mt-12">
          <GlowingButton
            variant="secondary"
            onClick={() => onNavigate("input")}
          >
            Process New Content
          </GlowingButton>
        </div>
      </motion.div>
    </div>
  );
}
