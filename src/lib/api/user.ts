import type z from "zod/v3";
import type { PasswordChangeFormSchema, UserFormSchema } from "../validations";
import api from "./config/axios";

export async function getProfile() {
  const response = await api.get("/users/profile");
  return response.data;
}

export async function updateUser(values: z.infer<typeof UserFormSchema>) {
  const response = await api.post("/users/update", values);
  return response.data;
}

export async function deleteUser() {
  const response = await api.post("/users/delete");
  return response.data;
}

export async function changePassword(
  values: z.infer<typeof PasswordChangeFormSchema>
) {
  const response = await api.post("/users/change-password", values);
  return response.data;
}

export async function findPostsByUserId(page?: string) {
  const response = await api.get(`/users/my-posts`, { params: { page } });
  return response.data;
}

export async function findLikedPostsByUserId(page?: string) {
  const response = await api.get(`/users/liked-posts`, { params: { page } });
  return response.data;
}
