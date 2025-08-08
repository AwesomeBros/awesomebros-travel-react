import { useQuery } from "@tanstack/react-query";
import { findCountsByPostsId } from "../api";

export function useFindCountsByPostsId(posts_id?: number) {
  const query = useQuery({
    enabled: !!posts_id,
    queryKey: ["count", { posts_id }],
    queryFn: () => findCountsByPostsId(posts_id),
  });
  return query;
}
