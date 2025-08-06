import type z from "zod/v3";
import { LoginFormSchema, RegisterFormSchema } from "../validations";
import api from "./config/axios";

export async function register(value: z.infer<typeof RegisterFormSchema>) {
  const data = RegisterFormSchema.parse(value);
  const { username, email, nickname, password } = data;
  const response = await api.post("/auth/register", {
    username,
    email,
    nickname,
    password,
  });

  return response.data;
}

export async function login(value: z.infer<typeof LoginFormSchema>) {
  const data = LoginFormSchema.parse(value);
  const response = await api.post("/auth/login", {
    username: data.username,
    password: data.password,
  });
  return response.data;
}

export async function logout() {
  const response = await api.post("/auth/logout");
  return response.data;
}
