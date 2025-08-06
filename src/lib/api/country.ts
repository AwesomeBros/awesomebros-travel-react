import api from "./config/axios";

export async function findCountries() {
  const response = await api.get(`countries`);
  return response.data.body;
}
