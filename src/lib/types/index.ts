import type { Dispatch, SetStateAction } from "react";
import type { City } from "./city";
import type { Country } from "./country";
import type { District } from "./district";

export type DetailFilterType = "country" | "city" | "district" | "";

export type FilterProps = {
  country: Country;
  city: City;
  district: District;
};

export type FilterComponentProps = {
  filterValue: FilterProps;
  setFilterValue: Dispatch<SetStateAction<FilterProps>>;
  setDetailFilter: Dispatch<SetStateAction<DetailFilterType | null>>;
};

export type { Session } from "./session";
export type { User } from "./user";
export type { City, Country, District };
