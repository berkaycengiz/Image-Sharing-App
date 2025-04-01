import { create } from "zustand";

interface RegisterState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({confirmPassword}),
}));
