import { useFindCountries } from "@/lib/query";
import { useDetailFilterStore, useFilterStore } from "@/lib/stores";
import type { Country } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchFilter } from "./search-filter";

export default function Search() {
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const { filterValue, setFilterValue, showFilter, setShowFilter } =
    useFilterStore();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { data: countries } = useFindCountries();

  useEffect(() => {
    const countryParam = searchParams.get("country");
    const cityParam = searchParams.get("city");
    const districtParam = searchParams.get("district");

    if (countryParam || cityParam || districtParam) {
      const selectedCountry = countries?.find(
        (country: Country) => country.name === countryParam
      );

      setFilterValue({
        country: {
          id: selectedCountry?.id || 0,
          name: countryParam || "",
        },
        city: {
          id: 0,
          name: cityParam || "전체",
        },
        district: {
          id: 0,
          name: districtParam || "전체",
        },
      });
    }
  }, [searchParams, countries, setFilterValue]);

  function handleSearch() {
    setShowFilter(false);
    setDetailFilter(null);

    const params = new URLSearchParams();

    if (filterValue.country.name) {
      params.append("country", filterValue.country.name);
    }

    if (filterValue.city.name && filterValue.city.name !== "전체") {
      params.append("city", filterValue.city.name);
    }

    if (filterValue.district.name && filterValue.district.name !== "전체") {
      params.append("district", filterValue.district.name);
    }

    const queryString = params.toString();
    navigate(`/posts${queryString ? `?${queryString}` : ""}`);
  }

  return !showFilter ? (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div
        role="presentation"
        className="flex flex-row items-center justify-between cursor-pointer"
        onClick={() => setShowFilter(true)}
      >
        <div className="text-sm font-semibold px-6">
          {filterValue.country.name || "국가 선택"}
        </div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {filterValue.city.name || "도시 선택"}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">
            {filterValue.district.name || "지역 선택"}
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="p-2 bg-primary rounded-full text-white cursor-pointer hover:shadow hover:bg-primary/90 transition"
          >
            <SearchIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="sm:w-[340px] cursor-pointer w-full relative">
      <div className="flex justify-center gap-7 h-14 text-center items-center">
        <button
          type="button"
          className="font-semibold underline underline-offset-8 cursor-pointer"
        >
          여행 후기
        </button>
        {/* <button
          type="button"
          className="font-semibold underline underline-offset-8 text-gray-500 cursor-pointer hover:text-black"
          onClick={() => setShowFilter(false)}
        >
          필터 닫기
        </button> */}
      </div>
      <div className="w-[90%] px-3 sm:px-0 sm:max-w-3xl flex flex-col sm:flex-row border border-gray-200 rounded-lg py-4 sm:py-2 sm:rounded-full shadow-sm bg-white hover:shadow-lg cursor-pointer justify-between fixed top-20 inset-x-0 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full relative sm:pl-2">
          <button
            type="button"
            onClick={() => setDetailFilter("country")}
            className={cn(
              "font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left cursor-pointer",
              {
                "shadow bg-white": detailFilter === "country",
              }
            )}
          >
            국가
            <div className="text-gray-500 text-xs mt-1">
              {filterValue.country.name || "국가 추가"}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setDetailFilter("city")}
            className={cn(
              "font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left cursor-pointer",
              {
                "shadow bg-white": detailFilter === "city",
              }
            )}
          >
            도시
            <div className="text-gray-500 text-xs mt-1">
              {filterValue.city.name || "도시 추가"}
            </div>
          </button>
          <button
            type="button"
            onClick={() => setDetailFilter("district")}
            className={cn(
              "font-semibold text-xs rounded-full hover:bg-gray-100 py-3 px-6 text-left cursor-pointer",
              {
                "shadow bg-white": detailFilter === "district",
              }
            )}
          >
            지역
            <div className="text-gray-500 text-xs mt-1">
              {filterValue.district.name || "지역 추가"}
            </div>
          </button>
          <SearchFilter />
        </div>
        <button
          type="button"
          className="h-10 mx-4 sm:w-24 my-auto flex justify-center gap-1 px-3 py-2 bg-primary rounded-full text-white cursor-pointer hover:shadow hover:bg-primary/90 transition"
          onClick={handleSearch}
        >
          <SearchIcon size={18} className="my-auto" />
          <div className="my-auto">검색</div>
        </button>
      </div>
    </div>
  );
}
