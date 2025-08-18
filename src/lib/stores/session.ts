import { create } from "zustand";
import type { Session } from "../types";

interface SessionStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
  resetSession: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  isLoading: true,
  isAuthenticated: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setSession: (session) => set({ session }),
  resetSession: () => set({ session: null }),
}));
