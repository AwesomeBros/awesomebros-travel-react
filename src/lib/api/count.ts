import { apiPublic } from "./config/axios";

export async function findCountsByPostsId(posts_id?: number) {
  const response = await apiPublic.get(`/counts/${posts_id}`);
  return response.data;
}
