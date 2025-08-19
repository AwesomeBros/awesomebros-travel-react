import type z from "zod/v3";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { OpenStore } from "../types";
import type { PostFormSchema } from "../validations";

export const usePostOpenStore = create<OpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

const POST_FORM_INITIAL: z.infer<typeof PostFormSchema> = {
  title: "",
  locations: [],
  content: "",
  cities_id: 0,
  countries_id: 0,
  districts_id: 0,
  url: "",
  slug: "",
};

interface PostFormStore {
  postForm: z.infer<typeof PostFormSchema>;
  setPostForm: (form: z.infer<typeof PostFormSchema>) => void;
  resetPostForm: () => void;
}

export const usePostFormStore = create<PostFormStore>()(
  persist(
    (set) => ({
      postForm: { ...POST_FORM_INITIAL },
      setPostForm: (form) => set({ postForm: form }),
      resetPostForm: () => set({ postForm: { ...POST_FORM_INITIAL } }),
    }),
    {
      name: "post-form-storage",
    }
  )
);

interface PostTypeStore {
  postType: "list" | "gallery";
  setPostType: (type: "list" | "gallery") => void;
}

export const usePostTypeStore = create<PostTypeStore>()(
  persist(
    (set) => ({
      postType: "list",
      setPostType: (type) => set({ postType: type }),
    }),
    {
      name: "post-type",
    }
  )
);

interface SearchStore {
  q?: string;
  setQ: (q: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  q: "",
  setQ: (q) => set({ q }),
}));

export const useShareOpenStore = create<OpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
