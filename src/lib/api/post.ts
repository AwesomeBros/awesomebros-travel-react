import type z from "zod/v3";
import type { PostFormSchema } from "../validations";
import api from "./config/axios";

export async function createPost(values: z.infer<typeof PostFormSchema>) {
  const response = await api.post(`/posts`, values);
  return response.data;
}
