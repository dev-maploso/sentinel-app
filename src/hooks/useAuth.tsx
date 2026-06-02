"use client";

import { useState, useEffect } from "react";
import * as authService from "@/services/auth.service";
import { setToken, removeToken } from "@/lib/auth";
import { User } from "@/types/auth";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await authService.getMe();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    setToken(res.token);
    await fetchUser();
  };

  const logout = async () => {
    await authService.logout();
    removeToken();
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
};