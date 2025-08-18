import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetProfile } from ".";
import { login, logout, register } from "../api";
import { useSessionStore } from "../stores";

export function useRegister() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
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
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data);
      setIsAuthenticated(true);
      navigate("/");
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
