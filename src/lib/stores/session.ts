import { create } from "zustand";
import type { Session } from "../types";

interface SessionStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
  resetSession: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setSession: (session) => set({ session }),
  resetSession: () => set({ session: null }),
}));
