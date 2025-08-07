import api from "./config/axios";

export async function findCitiesByCountriesId(countries_id?: number) {
  const response = await api.get(`cities`, {
    params: {
      countries_id,
    },
  });
  return response.data;
}
