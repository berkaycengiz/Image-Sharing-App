import { create } from 'zustand';

interface PostState {
  description: string;
  setDescription: (description: string) => void;
}

export const useRememberMe = create<PostState>((set) => ({
  description: "",
  setDescription: (description: string) => set({ description: description }),
}));