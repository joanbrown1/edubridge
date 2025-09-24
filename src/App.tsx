import React, { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { InputPage } from "./components/InputPage";
import { ResultsPage } from "./components/ResultsPage";
import { DemoPage } from "./components/DemoPage";
import { AboutPage } from "./components/AboutPage";
import HistoryPage from "./components/HistoryPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";


// Optional: you can move to context later
export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [resultsData, setResultsData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const handleNavigate = (page: string, data?: any) => {
    if (page === "results" && data) {
      setResultsData(data);
    }
    setCurrentPage(page);
  };

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setCurrentPage("history");
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setCurrentPage("landing");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />;
      case "input":
        return <InputPage onNavigate={handleNavigate} />;
      case "results":
        return (
          <ResultsPage
            onNavigate={handleNavigate}
            data={resultsData}
            token={token}
          />
        );
      case "history":
        return <HistoryPage onNavigate={handleNavigate} token={token} />;
      case "demo":
        return <DemoPage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "login":
        return <LoginPage onNavigate={handleNavigate} />;
      case "signup":
        return <SignupPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative transition-colors duration-300">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Navigation */}
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          token={token}
        />

        {/* Main Content */}
        <main className="relative z-10 pt-16">{renderPage()}</main>

        {/* Global styles for special effects */}
        <style jsx global>{`
          .preserve-3d {
            transform-style: preserve-3d;
          }

          .backface-hidden {
            backface-visibility: hidden;
          }

          .rotate-y-180 {
            transform: rotateY(180deg);
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          /* Glassmorphism effects */
          .glass-effect {
            backdrop-filter: blur(10px);
          }

          :root .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.1);
          }

          .dark .glass-effect {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          :root ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }

          .dark ::-webkit-scrollbar-track {
            background: rgba(30, 41, 59, 0.5);
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.5);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.7);
          }

          /* Smooth transitions for all interactive elements */
          button,
          input,
          textarea,
          select {
            transition: all 0.3s ease;
          }

          /* Enhance focus visibility */
          button:focus-visible,
          input:focus-visible,
          textarea:focus-visible {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
          }

          /* Typography enhancements */
          h1,
          h2,
          h3,
          h4 {
            text-rendering: optimizeLegibility;
          }

          /* Ensure proper text contrast */
          .text-gradient {
            background: linear-gradient(135deg, #3b82f6, #9333ea, #06b6d4);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
}
