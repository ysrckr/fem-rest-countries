import {
  countriesByRegionQueryOptions,
  countriesQueryOptions,
  countryByCodeQueryOptions,
  countryByNameQueryOptions,
} from "../queryOptions/countries";

import { useSuspenseQuery } from "@tanstack/react-query";

export const useCountriesQuery = () => {
  return useSuspenseQuery(countriesQueryOptions());
};

export const useCountriesByRegionQuery = (region: string) => {
  return useSuspenseQuery(countriesByRegionQueryOptions(region));
};

export const useCountryByNameQuery = (name: string) => {
  return useSuspenseQuery(countryByNameQueryOptions(name));
};

export const useCountryByCodeQuery = (code: string) => {
  return useSuspenseQuery(countryByCodeQueryOptions(code));
};
