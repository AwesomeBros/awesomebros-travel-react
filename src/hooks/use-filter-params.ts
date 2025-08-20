import { useSearchParams } from "react-router-dom";

export default function useFilterParams() {
  const [searchParams] = useSearchParams();

  return {
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    district: searchParams.get("district") || "",
    page: searchParams.get("page") || "1",
  };
}
