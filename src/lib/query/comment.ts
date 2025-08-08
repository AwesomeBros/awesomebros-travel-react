import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type z from "zod/v3";
import { createComment, findCommentsByPostsId } from "../api";
import type { CommentFormSchema } from "../validations";

export function useFindCommentsByPostsId(posts_id?: number) {
  const query = useQuery({
    enabled: !!posts_id,
    queryKey: ["comments", { posts_id }],
    queryFn: () => findCommentsByPostsId(posts_id),
  });
  return query;
}

export function useCreateComment(posts_id?: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof CommentFormSchema>) =>
      createComment(values, posts_id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["comments", { posts_id }],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
