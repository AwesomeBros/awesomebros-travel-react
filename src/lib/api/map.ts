import axios from "axios";
import { NOMINATIM_URL } from "../constants";

export async function getCoordinate(value: string) {
  try {
    const response = await axios.get(`${NOMINATIM_URL}`, {
      params: {
        q: value,
        format: "geocodejson",
        addressdetails: 1,
        "accept-language": "ko",
        polygon_geojson: 0,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}
