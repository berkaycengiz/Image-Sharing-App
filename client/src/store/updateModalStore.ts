import { create } from 'zustand';

interface UpdateModalState {
  isOpenUpdate: boolean;
  openUpdate: () => void;
  closeUpdate: () => void;
}

export const useUpdateModalStore = create<UpdateModalState>((set) => ({
  isOpenUpdate: false,
  openUpdate: () => set({ isOpenUpdate: true }),
  closeUpdate: () => set({ isOpenUpdate: false }),
}));