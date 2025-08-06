import { useQuery } from "@tanstack/react-query";
import { findDistrictsByCitiesId } from "../api";

export const useFindDistrictsByCitiesId = (cities_id?: number) => {
  const query = useQuery({
    enabled: !!cities_id,
    queryKey: ["districts", { cities_id }],
    queryFn: () => findDistrictsByCitiesId(cities_id),
  });
  return query;
};
