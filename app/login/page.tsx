"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

// ✅ shadcn
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) return;

    login(name);

    const pending = localStorage.getItem("pendingOrder");

    if (pending) {
      router.push("/checkout");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <Card className="w-full max-w-md">
        <CardContent className="p-8 space-y-6">

          <h1 className="text-2xl font-bold text-center">
            Login
          </h1>

          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            onClick={handleLogin}
            className="w-full"
          >
            Login
          </Button>

        </CardContent>
      </Card>

    </div>
  );
}