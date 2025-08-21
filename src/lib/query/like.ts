import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isLiked, toggleLike } from "../api";

export function useToggleLike() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (posts_id?: number) => toggleLike(posts_id),
    onMutate: async (posts_id?: number) => {
      await queryClient.cancelQueries({
        queryKey: ["like", { posts_id }],
      });
      await queryClient.cancelQueries({
        queryKey: ["count", { posts_id }],
      });
      const previousLike = queryClient.getQueryData(["like", { posts_id }]);
      queryClient.setQueryData(
        ["like", { posts_id }],
        (old: boolean | undefined) => !old
      );
      const previousCount = queryClient.getQueryData(["count", { posts_id }]);
      queryClient.setQueryData(
        ["count", { posts_id }],
        (old: { like_count: number } | undefined) => {
          if (old) {
            return {
              ...old,
              like_count: old.like_count + (previousLike ? -1 : 1),
            };
          }
          return old;
        }
      );
      return { previousLike, previousCount, posts_id };
    },
    onError: (error, posts_id, context) => {
      queryClient.setQueryData(["like", { posts_id }], context?.previousLike);
      toast.error("좋아요를 처리하는 중 오류가 발생했습니다.");
    },
    onSettled: (posts_id?: number) => {
      queryClient.invalidateQueries({
        queryKey: ["like", { posts_id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["count", { posts_id }],
      });
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["mypage", "likes"],
      });
    },
  });
  return mutation;
}

export const useIsLiked = (posts_id?: number) => {
  const query = useQuery({
    enabled: !!posts_id,
    queryKey: ["like", { posts_id }],
    queryFn: () => isLiked(posts_id),
  });
  return query;
};
