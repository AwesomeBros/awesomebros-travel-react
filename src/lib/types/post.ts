import type z from "zod/v3";
import type { City, Country, District } from ".";
import type { PostFormSchema } from "../validations";

export type HomeSort = "latest" | "popular";

export type Post = z.infer<typeof PostFormSchema> & {
  view_count: number;
  id: number;
  created_at: string;
  users: {
    id: string;
    username: string;
    url: string | null;
    nickname: string;
  };
  count: {
    likeCount: number;
    commentCount: number;
    viewCount: number;
  };
  district: District;
  city: City;
  country: Country;
};
