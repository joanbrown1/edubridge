import React, { useState } from "react";
import { GlowingButton } from "./GlowingButton";
import { GlassCard } from "./GlassCard";
import { toast } from "react-toastify";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("https://api.edubridge.jaybrown.xyz/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        onNavigate("input");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <GlassCard className="mr-4 ml-4 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gradient">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-transparent border border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-transparent border border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <GlowingButton variant="primary" onClick={handleLogin}>
          Login
        </GlowingButton>
        <p className="mt-4 text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => onNavigate("signup")}
            className="text-blue-400 underline"
          >
            Sign Up
          </button>
        </p>
      </GlassCard>
    </div>
  );
}
