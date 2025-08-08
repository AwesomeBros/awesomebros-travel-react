import api from "./config/axios";

export async function imageUpload(formData: FormData) {
  const response = await api.post(`/file/image`, formData);
  return response.data;
}
