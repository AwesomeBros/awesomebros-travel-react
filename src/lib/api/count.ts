import api from "./config/axios";

export async function findCountsByPostsId(posts_id?: number) {
  const response = await api.get(`/counts/${posts_id}`);
  return response.data;
}
