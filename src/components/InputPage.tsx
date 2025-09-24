import React, { useState } from "react";
import { motion } from "motion/react";
import { GlowingButton } from "./GlowingButton";
import { GlassCard } from "./GlassCard";
import { Upload, FileText, Zap, AlertCircle } from "lucide-react";
import { useAPI } from "../hooks/useAPI";


interface InputPageProps {
  onNavigate: (page: string, data?: any) => void; // Updated to match App.jsx
}

export function InputPage({ onNavigate }: InputPageProps) {
  const [content, setContent] = useState("");
  const [level, setLevel] = useState("high-school");
  const [selectedFile, setSelectedFile] = useState(null);
  const { loading, error, processText, processFile, reset } = useAPI();

  const handleGenerate = async () => {
    if (!content.trim() && !selectedFile) return;

    try {
      let result;
      if (selectedFile) {
        result = await processFile(selectedFile, level);
      } else {
        result = await processText(content, level);
      }

      if (result.success) {
        // Pass the data to the results page through navigation
        onNavigate("results", result.data);
      }
    } catch (err) {
      console.error("Generation failed:", err);
      // Error is already handled by the useAPI hook
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setContent(""); // Clear text input when file is selected
    }
  };

  const handleDemo = () => {
    onNavigate("demo");
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Transform Your Content
          </h1>
          <p className="text-muted-foreground text-lg">
            Paste your notes or upload a document to get started
          </p>
        </div>

        <GlassCard className="mb-8">
          <div className="space-y-6">
            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-400 font-medium">Processing Failed</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
                <button
                  onClick={reset}
                  className="ml-auto text-red-400 hover:text-red-300 text-sm underline"
                >
                  Dismiss
                </button>
              </motion.div>
            )}

            {/* Level Selection */}
            <div>
              <label className="block text-cyan-600 dark:text-cyan-300 font-medium mb-3">
                Difficulty Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full md:w-auto bg-secondary/30 backdrop-blur-sm border border-border rounded-lg py-4 px-3 text-foreground focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
              >
                <option value="middle-school">Middle School</option>
                <option value="high-school">High School</option>
                <option value="college">College</option>
              </select>
            </div>

            {/* Text Input Area */}
            <div className="relative">
              <label className="block text-blue-600 dark:text-blue-300 font-medium mb-3">
                Your Content
              </label>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    if (e.target.value && selectedFile) {
                      setSelectedFile(null); // Clear file when typing
                    }
                  }}
                  placeholder="Paste your notes here..."
                  rows={12}
                  disabled={loading || !!selectedFile}
                  className="w-full bg-secondary/30 backdrop-blur-sm border border-border rounded-lg p-4 text-foreground placeholder-muted-foreground focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 resize-none disabled:opacity-50"
                />
                {content === "" && !selectedFile && (
                  <div className="absolute top-4 left-4 w-0.5 h-6 bg-blue-500 animate-pulse" />
                )}
              </div>
              <div className="text-right text-xs text-muted-foreground mt-1">
                {content.length}/10,000 characters
              </div>
            </div>

            {/* File Upload Section */}
            <div className="border-t border-slate-600/30 pt-6">
              <label className="block text-purple-600 dark:text-purple-300 font-medium mb-3">
                Or Upload a Document
              </label>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 group 
      ${
        selectedFile
          ? "border-green-500/50"
          : "border-border hover:border-purple-500/50"
      }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("border-purple-500");
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-purple-500");
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-purple-500");

                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setSelectedFile(file);
                    setContent("");
                  }
                }}
              >
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4 group-hover:text-purple-500 transition-colors duration-300" />

                {selectedFile ? (
                  <div className="space-y-2">
                    <p className="text-green-400 font-medium">
                      {selectedFile.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="text-red-400 hover:text-red-300 text-sm underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-foreground mb-2">
                      Drag & drop your files here
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      Supports PDF, DOC, DOCX files (max 10MB)
                    </p>

                    {/* Hidden File Input */}
                    <input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={loading}
                    />

                    <label htmlFor="file-upload" className="cursor-pointer">
                      <GlowingButton variant="secondary" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Browse Files
                      </GlowingButton>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <GlowingButton
                onClick={handleGenerate}
                disabled={(!content.trim() && !selectedFile) || loading}
                className="flex-1"
                size="lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Generate Materials
                  </>
                )}
              </GlowingButton>

              <GlowingButton
                variant="secondary"
                onClick={handleDemo}
                size="lg"
                className="sm:w-auto"
                disabled={loading}
              >
                Try Demo
              </GlowingButton>
            </div>
          </div>
        </GlassCard>

        {/* Processing Progress */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <GlassCard>
              <div className="py-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-slate-600/30 rounded-full relative">
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
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-2">
                  AI Processing Your Content
                </h3>
                <p className="text-slate-400">
                  Generating summaries, quizzes, and flashcards...
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Analyzing content structure...",
                    "Extracting key concepts...",
                    "Creating learning materials...",
                  ].map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.8, duration: 0.5 }}
                      className="flex items-center text-sm text-slate-300"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse" />
                      {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
