import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export function useGetMe() {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  return query;
}
