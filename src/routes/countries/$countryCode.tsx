import { Link, createFileRoute } from "@tanstack/react-router";
import { Suspense, useCallback } from "react";

import { BorderCountry } from "./-components/BorderCountry";
import { Country } from "@/types/countries";
import { CountryInfo } from "./-components/CountryInfo";
import { HiArrowLeft } from "react-icons/hi";
import { countryByCodeQueryOptions } from "../../hooks/queries/queryOptions/countries";

export const Route = createFileRoute("/countries/$countryCode")({
  loader: async ({ context, params }) => {
    const countryCode = params.countryCode;
    const country = await context.queryClient.ensureQueryData(countryByCodeQueryOptions(countryCode));

    return { country: country[0] };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { country } = Route.useLoaderData();

  type InfoItem = { label: string; value: string | number | undefined };

  const countryInfo = useCallback((country: Country): InfoItem[] => {
    const nativeName = country?.name?.nativeName
      ? Object.values(country.name.nativeName)
          .map((n) => n.common || n.official)
          .filter(Boolean)
          .join(", ")
      : undefined;

    const currencies = country?.currencies
      ? Object.values(country.currencies)
          .map((c) => c?.name)
          .filter(Boolean)
          .join(", ")
      : undefined;

    const languages = country?.languages ? Object.values(country.languages).filter(Boolean).join(", ") : undefined;

    return [
      { label: "Native Name", value: nativeName },
      { label: "Population", value: country?.population },
      { label: "Region", value: country?.region },
      { label: "Subregion", value: country?.subregion },
      { label: "Capital", value: country?.capital?.join(", ") },
      { label: "Top Level Domain", value: country?.tld?.join(", ") },
      { label: "Currencies", value: currencies },
      { label: "Languages", value: languages },
    ];
  }, []);

  return (
    <>
      <header className="mt-12 mb-12 lg:mb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-2 shadow-md dark:bg-dark-element dark:text-white"
        >
          <HiArrowLeft /> Back
        </Link>
      </header>
      <div className="flex w-full flex-col items-center justify-center gap-16 lg:flex-row lg:items-center">
        <section className="w-full">
          <div className="w-full">
            <img src={country?.flags?.png} alt={country?.flags?.alt} className="h-auto w-full" />
          </div>
        </section>
        <section className="w-full">
          <h1 className="text-center text-2xl font-bold dark:text-white">{country?.name?.common}</h1>
          <div className="mt-8 flex w-full flex-col justify-center gap-16 lg:flex-row">
            {" "}
            <div className="dark:text-white">
              {countryInfo(country)
                .slice(0, 5)
                .map(({ label, value }) => (
                  <CountryInfo key={label} value={value} label={label} />
                ))}
            </div>
            <div className="dark:text-white">
              {countryInfo(country)
                .slice(5)
                .map(({ label, value }) => (
                  <CountryInfo key={label} value={value} label={label} />
                ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center text-sm lg:flex-row lg:gap-4 dark:text-white">
            <span className="text-lg font-bold">Border Countries:</span>
            <div className="flex flex-wrap gap-2">
              {country?.borders?.length ? (
                country?.borders?.map((border) => {
                  return (
                    <Suspense
                      fallback={
                        <div className="flex h-8 w-16 animate-pulse items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm shadow-md dark:bg-gray-600 dark:text-white"></div>
                      }
                    >
                      <BorderCountry code={border} key={border} />
                    </Suspense>
                  );
                })
              ) : (
                <span>No border countries</span>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
