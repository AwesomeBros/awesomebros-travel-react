import api from "./config/axios";

export async function findDistrictsByCitiesId(cities_id?: number) {
  const response = await api.get(`districts`, {
    params: {
      cities_id,
    },
  });
  return response.data;
}
