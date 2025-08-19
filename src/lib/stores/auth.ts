import { create } from "zustand";
import type { OpenStore } from "../types";

interface AuthOpenStore extends OpenStore {
  type: "login" | "register" | "reset-password";
  setType: (type: "login" | "register" | "reset-password") => void;
}

export const useAuthOpenStore = create<AuthOpenStore>((set) => ({
  type: "login",
  setType: (type) => set({ type }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
