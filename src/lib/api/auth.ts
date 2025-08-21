import type z from "zod/v3";
import {
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordFormSchema,
} from "../validations";
import api from "./config/axios";

export async function register(value: z.infer<typeof RegisterFormSchema>) {
  const data = RegisterFormSchema.parse(value);
  const { username, email, nickname, password } = data;
  const response = await api.post("/users/register", {
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

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordFormSchema>
) => {
  const { email, token, password } = values;
  const response = await api.post(`/users/reset-password`, {
    email,
    token,
    password,
  });
  return response.data;
};

export async function verifyToken(token: string | null) {
  const response = await api.get(`/users/verify-token`, {
    params: { token },
  });
  return response.data;
}
