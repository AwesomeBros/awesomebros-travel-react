import { useQuery } from "@tanstack/react-query";
import { findCitiesByCountriesId } from "../api";

export const useFindCitiesByCountriesId = (countries_id?: number) => {
  const query = useQuery({
    enabled: !!countries_id,
    queryKey: ["cities", { countries_id }],
    queryFn: () => findCitiesByCountriesId(countries_id),
  });
  return query;
};
