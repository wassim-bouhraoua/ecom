"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) return;

    login(name);

// 🔁 check if there was a pending order
const pending = localStorage.getItem("pendingOrder");

if (pending) {
  router.push("/checkout"); // go back to checkout
} else {
  router.push("/");
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="bg-white text-black p-8 rounded-xl shadow w-full max-w-md space-y-6">

        <h1 className="text-2xl font-bold text-center">
          Login
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>

      </div>

    </div>
  );
}