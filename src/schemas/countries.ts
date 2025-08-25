import { z } from "zod";

// REST Countries v3.1-inspired schema
export const CountryNameSchema = z.object({
  common: z.string(),
  official: z.string(),
  nativeName: z
    .record(
      z.string(),
      z.object({
        official: z.string(),
        common: z.string(),
      })
    )
    .optional(),
});

export const CurrencySchema = z.object({
  name: z.string(),
  symbol: z.string().optional(),
});

export const FlagsSchema = z.object({
  png: z.string().url(),
  svg: z.string().url(),
  alt: z.string().optional(),
});

export const CountrySchema = z.object({
  name: CountryNameSchema,
  cca2: z.string().length(2).optional(),
  cca3: z.string().length(3),
  ccn3: z.string().optional(),
  region: z.string(),
  subregion: z.string().optional(),
  capital: z.array(z.string()).optional(),
  population: z.number().int().nonnegative(),
  tld: z.array(z.string()).optional(),
  currencies: z.record(z.string(), CurrencySchema).optional(),
  languages: z.record(z.string(), z.string()).optional(),
  borders: z.array(z.string()).optional(),
  maps: z
    .object({
      googleMaps: z.string().url(),
      openStreetMaps: z.string().url(),
    })
    .optional(),
  flags: FlagsSchema,
});

export const CountriesSchema = z.array(CountrySchema);

// Schemas for country field keys
export const CountryFieldKeySchema = CountrySchema.keyof();

export const CountryFieldKeysArraySchema = z.array(CountryFieldKeySchema);
