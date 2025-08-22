import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type z from "zod/v3";
import {
  createPost,
  findPostById,
  findPostsByCities,
  findPostsBySearch,
  findPostsBySort,
  updatePost,
} from "../api";
import type { HomeCities, HomeSort, PostFilterParams } from "../types";
import type { PostFormSchema } from "../validations";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["mypage", "posts"] });
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useUpdatePost(id?: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof PostFormSchema>) =>
      updatePost(id, values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["mypage", "posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", { posts_id: id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindPostsBySort(sort: HomeSort) {
  const query = useQuery({
    queryKey: ["posts", { sort }],
    queryFn: () => findPostsBySort(sort),
    staleTime: 1000 * 60 * 5,
  });
  return query;
}

export function useFindPostsByCities(city: HomeCities) {
  const query = useQuery({
    queryKey: ["posts", { city }],
    queryFn: () => findPostsByCities(city),
    staleTime: 1000 * 60 * 5,
  });
  return query;
}

export function useFindPostById(posts_id?: number) {
  const query = useQuery({
    enabled: !!posts_id,
    queryKey: ["post", { posts_id }],
    queryFn: () => findPostById(posts_id!),
    staleTime: 1000 * 60 * 5,
  });
  return query;
}

export const useFindPostsBySearch = (params: PostFilterParams) => {
  const query = useQuery({
    queryKey: ["posts", params],
    queryFn: () => findPostsBySearch(params),
  });
  return query;
};
