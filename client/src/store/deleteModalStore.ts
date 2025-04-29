import { create } from 'zustand';

interface DeleteModalState {
  isOpenDelete: boolean;
  openDelete: () => void;
  closeDelete: () => void;
}

export const useDeleteModalStore = create<DeleteModalState>((set) => ({
  isOpenDelete: false,
  openDelete: () => set({ isOpenDelete: true }),
  closeDelete: () => set({ isOpenDelete: false }),
}));