import {
  useFindCitiesByCountriesId,
  useFindCountries,
  useFindDistrictsByCitiesId,
} from "@/lib/query";
import { useDetailFilterStore, useFilterStore } from "@/lib/stores";
import type { City, Country, District } from "@/lib/types";
import { cn } from "@/lib/utils";
import FilterContainer from "./filter-container";

export function SearchFilter() {
  return (
    <>
      <CountryFilter />
      <CityFilter />
      <DistrictFilter />
    </>
  );
}

const CountryFilter = () => {
  const { filterValue, setFilterValue } = useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const { data: countries, isLoading } = useFindCountries();
  if (isLoading) {
    return null;
  }
  return (
    <FilterContainer title="국가 선택하기" isShow={detailFilter === "country"}>
      <div className="flex flex-wrap items-center justify-start gap-4 mt-4">
        {countries.map((country: Country) => (
          <button
            key={country.id}
            type="button"
            className={cn(
              "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-primary focus:text-white cursor-pointer",
              {
                "bg-primary text-white":
                  filterValue.country.name === country.name,
              }
            )}
            onClick={() => {
              setFilterValue({
                ...filterValue,
                country: {
                  id: country.id,
                  name: country.name,
                },
                city: {
                  id: 0,
                  name: "",
                },
                district: {
                  id: 0,
                  name: "",
                },
              });
              setDetailFilter("city");
            }}
          >
            {country.name}
          </button>
        ))}
      </div>
    </FilterContainer>
  );
};

const CityFilter = () => {
  const { filterValue, setFilterValue } = useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const { data: cities, isLoading } = useFindCitiesByCountriesId(
    filterValue.country.id
  );
  if (isLoading || !cities) return null;
  return (
    <FilterContainer title="도시 선택하기" isShow={detailFilter === "city"}>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {cities.map((city: City) => (
          <button
            key={city.id}
            type="button"
            className={cn(
              "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-primary focus:text-white cursor-pointer",
              {
                "bg-primary text-white": filterValue.city.name === city.name,
              }
            )}
            onClick={() => {
              setFilterValue({
                ...filterValue,
                city: {
                  id: city.id,
                  name: city.name,
                },
                district: {
                  id: 0,
                  name: "",
                },
              });
              setDetailFilter("district");
            }}
          >
            {city.name}
          </button>
        ))}
      </div>
    </FilterContainer>
  );
};

const DistrictFilter = () => {
  const { filterValue, setFilterValue } = useFilterStore();
  const { detailFilter, setDetailFilter } = useDetailFilterStore();
  const { data: districts, isLoading } = useFindDistrictsByCitiesId(
    filterValue.city.id
  );
  if (isLoading || !districts) return null;
  return (
    <FilterContainer title="지역 선택하기" isShow={detailFilter === "district"}>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        {districts.map((district: District) => (
          <button
            key={district.id}
            type="button"
            className={cn(
              "border rounded-lg px-5 py-2.5 hover:bg-gray-200 focus:bg-primary focus:text-white cursor-pointer",
              {
                "bg-primary text-white":
                  filterValue.district.name === district.name,
              }
            )}
            onClick={() => {
              setFilterValue({
                ...filterValue,
                district: {
                  id: district.id,
                  name: district.name,
                },
              });
              setDetailFilter("");
            }}
          >
            {district.name}
          </button>
        ))}
      </div>
    </FilterContainer>
  );
};
