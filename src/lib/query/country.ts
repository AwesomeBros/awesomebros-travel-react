import { useQuery } from "@tanstack/react-query";
import { findCountries } from "../api";

export function useFindCountries() {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: findCountries,
  });
  return query;
}
