import api from "./config/axios";

export async function toggleLike(posts_id?: number) {
  const response = await api.post("/likes", { posts_id });
  return response.data;
}

export async function isLiked(posts_id?: number) {
  const response = await api.get("/likes", {
    params: { posts_id },
  });
  return response.data;
}
