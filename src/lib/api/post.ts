import type z from "zod/v3";
import type { HomeCities, HomeSort } from "../types";
import type { PostFormSchema } from "../validations";
import api from "./config/axios";

export async function createPost(values: z.infer<typeof PostFormSchema>) {
  const response = await api.post("/posts", values);
  return response.data;
}

export async function findPostsBySort(sort: HomeSort) {
  const response = await api.get("/posts", {
    params: { sort },
  });
  return response.data;
}

export async function findPostsByCities(city: HomeCities) {
  const response = await api.get("/posts/cities", {
    params: { city },
  });
  return response.data;
}
