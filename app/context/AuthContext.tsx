"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
};

type AuthContextType = {
  user: User | null;
  login: (name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  // load saved user
  useEffect(() => {
    const saved =
      localStorage.getItem("user");

    if (saved) {
      setUser(JSON.parse(saved));
    }

    setLoading(false);
  }, []);

  // LOGIN + save user to backend
  const login = async (name: string) => {
    const newUser = { name };

    try {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          password: "demo",
        }),
      });

    } catch (error) {
      console.error(error);
    }

    setUser(newUser);

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );
  };

  // LOGOUT
  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};