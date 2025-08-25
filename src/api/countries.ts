import { GetCountries, GetCountryByCode } from "@/types/countries";

export const getCountries: GetCountries = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?" +
      new URLSearchParams({
        fields: "name,cca2,flags,capital,population,region",
      })
  );
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return response.json();
};

export const getCountriesByRegion = async (region: string) => {
  const response = await fetch(`https://restcountries.com/v3.1/region/${region}`);
  if (!response.ok) {
    throw new Error("Failed to fetch countries by region");
  }
  return response.json();
};

export const getCountryByName = async (name: string) => {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch country by name");
  }
  return response.json();
};

export const getCountryByCode: GetCountryByCode = async (code: string) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!response.ok) {
    throw new Error("Failed to fetch country by code");
  }
  return response.json();
};
