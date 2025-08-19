import { create } from "zustand";
import type { OpenStore } from "../types";

export const useUserEditOpenStore = create<OpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useUserPasswordChangeDialogStore = create<OpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
