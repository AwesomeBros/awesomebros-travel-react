import type z from "zod/v3";
import type { CommentFormSchema } from "../validations";
import api from "./config/axios";

export async function findCommentsByPostsId(posts_id?: number) {
  const response = await api.get(`/comments/posts/${posts_id}`);
  return response.data;
}

export async function createComment(
  values: z.infer<typeof CommentFormSchema>,
  posts_id?: number
) {
  const requestBody = {
    ...values,
    posts_id,
  };
  const response = await api.post(`/comments`, requestBody);
  return response.data;
}
