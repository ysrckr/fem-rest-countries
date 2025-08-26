import {
  CountriesSchema,
  CountryFieldKeySchema,
  CountryFieldKeysArraySchema,
  CountrySchema,
} from "@/schemas/countries";

import { z } from "zod";

export type Country = z.infer<typeof CountrySchema>;
export type Countries = z.infer<typeof CountriesSchema>;

export type GetCountryResponse = Promise<Country[]>;
export type GetCountriesResponse = Promise<Countries>;
export type CountryFieldKey = z.infer<typeof CountryFieldKeySchema>;
export type CountryFieldKeysArray = z.infer<typeof CountryFieldKeysArraySchema>;

export type GetCountries = () => GetCountriesResponse;
export type GetCountryByName = (name: string) => GetCountryResponse;
export type GetCountryByCode = (code: string) => GetCountryResponse;
