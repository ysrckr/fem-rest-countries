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
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(8);
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

  const paginatedCountries = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredCountries?.slice(start, end);
  }, [filteredCountries, page, itemsPerPage]);

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
        {paginatedCountries
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
                <Card
                  image={{ src: country?.flags.png, alt: country?.flags?.alt || country?.name.common }}
                  title={country?.name.common}
                >
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
      <footer className="my-12">
        <div className="mt-8 flex w-full items-center justify-center gap-4">
          <button
            className="rounded-md bg-white px-4 py-2 shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:bg-dark-element dark:text-white"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="dark:text-white">
            Page {page} of {Math.ceil(filteredCountries.length / itemsPerPage)}
          </span>
          <button
            className="rounded-md bg-white px-4 py-2 shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:bg-dark-element dark:text-white"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === Math.ceil(filteredCountries.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </footer>
    </>
  );
}
