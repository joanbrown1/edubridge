import React, { useState } from "react";
import { GlowingButton } from "./GlowingButton";
import { GlassCard } from "./GlassCard";
import { toast } from "react-toastify";

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch(
        "https://api.edubridge.jaybrown.xyz/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful! Please login.");
        setTimeout(() => {
          onNavigate("login");
        }, 3000);
      } else {
        toast.error(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <GlassCard className="mr-4 ml-4 p-6">
        <h2 className="text-2xl font-bold mb-4 text-gradient">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-white\/50 border border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-white\/50 border border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <GlowingButton variant="primary" onClick={handleSignup}>
          Sign Up
        </GlowingButton>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => onNavigate("login")}
            className="text-blue-400 underline"
          >
            Login
          </button>
        </p>
      </GlassCard>
    </div>
  );
}
