import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type z from "zod/v3";
import {
  changePassword,
  deleteUser,
  findCommentsByUserId,
  findLikedPostsByUserId,
  findPostsByUserId,
  getProfile,
  updateUser,
} from "../api";
import type { PasswordChangeFormSchema, UserFormSchema } from "../validations";

export function useGetProfile() {
  const query = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: false,
  });

  return query;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof UserFormSchema>) => updateUser(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
  return mutation;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
  return mutation;
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof PasswordChangeFormSchema>) =>
      changePassword(values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
  return mutation;
};

export function useFindPostsByUserId(page?: string, users_id?: string) {
  const query = useQuery({
    enabled: !!users_id,
    queryKey: ["mypage", "posts", { users_id, page }],
    queryFn: () => findPostsByUserId(page),
  });
  return query;
}

export function useFindLikedPostsByUserId(page?: string, users_id?: string) {
  const query = useQuery({
    enabled: !!users_id,
    queryKey: ["mypage", "likes", { users_id, page }],
    queryFn: () => findLikedPostsByUserId(page),
  });
  return query;
}

export function useFindCommentsByUserId(page?: string, users_id?: string) {
  const query = useQuery({
    enabled: !!users_id,
    queryKey: ["mypage", "comments", { users_id, page }],
    queryFn: () => findCommentsByUserId(page),
  });
  return query;
}
