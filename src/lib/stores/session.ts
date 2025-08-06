import { create } from "zustand";
import type { Session } from "../types";

interface SessionStore {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  resetSession: () => void;
  setLoading: (loading: boolean) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  isLoading: true, // 초기 로딩 상태를 true로 설정
  setSession: (session) => set({ session, isLoading: false }),
  resetSession: () => set({ session: null, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
