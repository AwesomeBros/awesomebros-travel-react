import type z from "zod/v3";
import type { CommentFormSchema } from "../validations";
import type { Post } from "./post";

export type Comment = z.infer<typeof CommentFormSchema> & {
  id: number;
  created_at: string;
  users_id: string;
  nickname: string;
  url?: string;
  posts: Post;
};
