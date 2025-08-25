import { Link, createFileRoute } from "@tanstack/react-router";

import { Card } from "@/components/layouts/card/card";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@/components/layouts/form-elements/input";
import { Select } from "@/components/layouts/form-elements/select";
import { countriesQueryOptions } from "@/hooks/queries/queryOptions/countries";
import { useDebounce } from "../hooks/useDebounce";
import { useMemo } from "react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const countries = await context.queryClient.ensureQueryData(countriesQueryOptions());
    return { countries };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const { countries } = Route.useLoaderData();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const regions = [
    { value: "Africa", label: "Africa" },
    { value: "Americas", label: "Americas" },
    { value: "Asia", label: "Asia" },
    { value: "Europe", label: "Europe" },
    { value: "Oceania", label: "Oceania" },
    { value: "", label: "All" },
  ];

  const filteredCountries = useMemo(() => {
    return countries?.filter((country) => {
      const matchesSearchTerm = country.name.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
      return matchesSearchTerm && matchesRegion;
    });
  }, [countries, debouncedSearchTerm, selectedRegion]);

  return (
    <>
      <section className="my-8 flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          placeholder="Search for a country..."
          icon={<HiOutlineMagnifyingGlass />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          elements={regions}
          placeholder="Select a region..."
          value={selectedRegion}
          onChange={(value) => setSelectedRegion(value)}
          className="w-48"
        />
      </section>
      <section className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2 lg:grid-cols-4">
        {filteredCountries
          ?.sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => {
            if (!country?.name || !country?.cca2) {
              return null;
            }
            return (
              <Link
                key={country.name.official}
                to="/countries/$countryCode"
                params={{ countryCode: country.cca2 }}
                className="h-full"
              >
                <Card image={{ src: country?.flags.png, alt: country?.cca2 }} title={country?.name.common}>
                  <ul className="space-y-1 text-sm">
                    <li className="text-light-text dark:text-white">
                      <span className="font-semibold">Population:</span> {country?.population.toLocaleString()}
                    </li>
                    <li>
                      <span className="font-semibold">Region:</span> {country?.region}
                    </li>
                    <li>
                      <span className="font-semibold">Capital:</span> {country?.capital}
                    </li>
                  </ul>
                </Card>
              </Link>
            );
          })}
      </section>
    </>
  );
}
