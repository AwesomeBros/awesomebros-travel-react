import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api";

export function useGetProfile() {
  const query = useQuery({
    queryKey: ["user", "profile"],
    queryFn: getProfile,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });

  return query;
}
