import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session } from "../types";

interface SessionStore {
  session: Session | null;
  // isLoading: boolean;
  setSession: (session: Session | null) => void;
  resetSession: () => void;
  // setLoading: (loading: boolean) => void;
}

export const useSessionStore = create(
  persist<SessionStore>(
    (set) => ({
      session: null,
      // isLoading: true,
      setSession: (session) => set({ session }),
      resetSession: () => set({ session: null }),
      // setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "session-storage",
    }
  )
);
