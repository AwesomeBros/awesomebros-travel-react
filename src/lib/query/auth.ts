import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetProfile } from ".";
import { login, logout, register, resetPassword, verifyToken } from "../api";
import { useAuthOpenStore, useSessionStore } from "../stores";

export function useRegister() {
  const { setType } = useAuthOpenStore();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      setType("login");
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useLogin() {
  const { setSession, setIsAuthenticated } = useSessionStore();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data);
      setIsAuthenticated(true);
      window.location.href = "/";
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useLogout() {
  const mutation = useMutation({
    mutationFn: async () => logout(),
    onSuccess: (data) => {
      toast.success(data.message);
      window.location.href = "/login";
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useAuthenticated() {
  const { data, isLoading, isError, refetch } = useGetProfile();

  return {
    data,
    isLoading,
    isError,
    checkAuth: refetch,
  };
}

export const useVerifyToken = (token: string | null) => {
  const query = useQuery({
    queryKey: ["verifyToken"],
    queryFn: async () => verifyToken(token),
    enabled: !!token,
    retry: false,
  });
  return query;
};

export const useResetPassword = () => {
  const { onOpen, setType } = useAuthOpenStore();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      navigate("/");
      toast.success(data.message);
      setType("login");
      onOpen();
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
};
