import { getCountries, getCountriesByRegion, getCountryByCode, getCountryByName } from "@/api/countries";

import { CountriesQueryKey } from "@/keys/queryKeys/countries";

export const countriesQueryOptions = () => {
  return {
    queryKey: [CountriesQueryKey.List],
    queryFn: getCountries,
  };
};

export const countriesByRegionQueryOptions = (region: string) => {
  return {
    queryKey: [CountriesQueryKey.List, region],
    queryFn: () => getCountriesByRegion(region),
  };
};

export const countryByNameQueryOptions = (name: string) => {
  return {
    queryKey: [CountriesQueryKey.Details, name],
    queryFn: () => getCountryByName(name),
  };
};

export const countryByCodeQueryOptions = (code: string) => {
  return {
    queryKey: [CountriesQueryKey.Details, code],
    queryFn: () => getCountryByCode(code),
  };
};
