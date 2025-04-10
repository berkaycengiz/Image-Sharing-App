import { create } from "zustand";

interface LoginState {
  username: string | null;
  email: string | null;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  clearUsername: () => void;
  clearEmail: () => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  username: "",
  email: "",
  setUsername: (username) => {
    localStorage.setItem('username', username);
    set({ username });
  },
  setEmail: (email) => {
    localStorage.setItem('email', email);
    set({email});
  },
  clearUsername: () => {
    localStorage.removeItem('username');
    set({ username: null });
  },
  clearEmail: () => {
    localStorage.removeItem('email');
    set({ email: null });
  }
}));

