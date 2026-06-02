import api from "@/lib/api";
import { LoginResponse } from "@/types/auth";

export const login = async (email: string, password: string) => {
  const res = await api.post<LoginResponse>("/login", {
    email,
    password,
  });

  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/me");
  return res.data;
};

export const logout = async () => {
  await api.post("/logout");
};