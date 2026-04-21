"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      setUser(JSON.parse(saved));
    }

    setLoading(false); 
  }, []);

  const login = (name: string) => {
    const newUser = { name };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};