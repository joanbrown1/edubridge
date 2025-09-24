import React, { useEffect, useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { GlowingButton } from "../components/GlowingButton";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, HelpCircle, Layers, RotateCcw } from "lucide-react";

interface HistoryItem {
  id: string;
  summary: string;
  quiz: any[];
  flashcards: any[];
  originalText: string;
  level: string;
  createdAt: string;
}

interface HistoryPageProps {
  onNavigate: (page: string) => void;
  token?: string | null;
}

export default function HistoryPage({ onNavigate, token }: HistoryPageProps) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [activeItem, setActiveItem] = useState<HistoryItem | null>(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        onNavigate("login");
        return;
      }
      const res = await fetch(
        "https://api.edubridge.jaybrown.xyz/user/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) setItems(data.items);
    };
    fetchHistory();
  }, [onNavigate]);

  if (!activeItem) {
    return (
      <motion.div className="p-6 min-h-screen space-y-4">
        <h2 className="text-2xl font-bold mb-6">Your Saved History</h2>
        {items.length === 0 ? (
          <p className="text-gray-400">No saved summaries yet.</p>
        ) : (
          <div className="grid gap-4">
            {items.map((item) => (
              <div onClick={() => setActiveItem(item)} key={item.id}>
                <GlassCard className="p-4 cursor-pointer hover:bg-slate-800/50">
                  <p className="text-sm text-gray-400">
                    {new Date(item.createdAt).toLocaleString()} – Level:{" "}
                    {item.level}
                  </p>
                  <h3 className="text-lg font-semibold mt-2 line-clamp-2">
                    {item.summary.slice(0, 150)}...
                  </h3>
                </GlassCard>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  // Active item view like ResultsPage
  const tabs = [
    { id: "summary", label: "Summary", icon: FileText },
    {
      id: "quiz",
      label: "Quiz",
      icon: HelpCircle,
      disabled: activeItem.quiz.length === 0,
    },
    {
      id: "flashcards",
      label: "Flashcards",
      icon: Layers,
      disabled: activeItem.flashcards.length === 0,
    },
  ];

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % activeItem.flashcards.length);
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard(
        (prev) =>
          (prev - 1 + activeItem.flashcards.length) %
          activeItem.flashcards.length
      );
    }, 150);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mb-6">
        <button
          className="text-blue-400 hover:underline"
          onClick={() => setActiveItem(null)}
        >
          ← Back to history list
        </button>
      </div>

      {/* Tabs */}
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
                  flex items-center px-6 py-3 rounded-lg transition-all duration-300
                  ${
                    tab.disabled
                      ? "text-slate-500 cursor-not-allowed opacity-50"
                      : activeTab === tab.id
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }
                `}
              >
                <Icon className="w-5 h-5 mr-2" />
                {tab.label}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-blue-300 mb-4">
                Summary
              </h2>
              <p className="text-slate-300 whitespace-pre-wrap">
                {activeItem.summary}
              </p>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === "quiz" && activeItem.quiz.length > 0 && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GlassCard className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-purple-300 mb-2">
                Quiz
              </h2>
              {activeItem.quiz.map((q, i) => (
                <div key={i} className="mb-4">
                  <p className="font-medium mb-2">{q.question}</p>
                  <ul className="space-y-1 text-slate-400">
                    {q.options.map((opt: string, idx: number) => (
                      <li key={idx}>
                        {String.fromCharCode(65 + idx)}. {opt}
                        {idx === q.correctIndex && (
                          <span className="ml-2 text-green-400 font-semibold">
                            ✓
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  {q.explanation && (
                    <p className="text-sm text-slate-500 mt-2">
                      {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </GlassCard>
          </motion.div>
        )}

        {activeTab === "flashcards" && activeItem.flashcards.length > 0 && (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-cyan-300 mb-2">
                  Flashcards
                </h2>
                <p className="text-slate-400">
                  Card {currentCard + 1} of {activeItem.flashcards.length}
                </p>
              </div>

              {activeItem.flashcards[currentCard] && (
                <>
                  <div className="relative h-64 mb-8">
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full preserve-3d cursor-pointer"
                      onClick={() => setIsFlipped(!isFlipped)}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="absolute inset-0 backface-hidden">
                        <GlassCard className="h-full flex items-center justify-center text-center p-6">
                          <p className="text-lg">
                            {activeItem.flashcards[currentCard].front}
                          </p>
                        </GlassCard>
                      </div>
                      <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <GlassCard className="h-full flex items-center justify-center text-center p-6">
                          <p className="text-lg">
                            {activeItem.flashcards[currentCard].back}
                          </p>
                        </GlassCard>
                      </div>
                    </motion.div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <GlowingButton variant="secondary" onClick={prevCard}>
                      Previous
                    </GlowingButton>
                    <GlowingButton onClick={() => setIsFlipped(!isFlipped)}>
                      Flip
                    </GlowingButton>
                    <GlowingButton variant="secondary" onClick={nextCard}>
                      Next
                    </GlowingButton>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
