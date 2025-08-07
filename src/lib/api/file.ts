import api from "./config/axios";

export async function imageUpload(formData: FormData) {
  const response = await api.post(`/files/images`, formData);
  return response.data;
}
