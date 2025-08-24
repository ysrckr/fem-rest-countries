import { Link, createFileRoute } from "@tanstack/react-router";

import { Card } from "@/components/layouts/card/card";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@/components/layouts/form-elements/input";
import { Select } from "@/components/layouts/form-elements/select";
import { countries } from "@/mock/countries";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const regions = [
    { value: "africa", label: "Africa" },
    { value: "americas", label: "Americas" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
  ];
  return (
    <>
      <section className="my-8 flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input placeholder="Search for a country..." icon={<HiOutlineMagnifyingGlass />} />
        <Select
          elements={regions}
          placeholder="Select a region..."
          value={selectedRegion}
          onChange={(value) => setSelectedRegion(value)}
          className="w-48"
        />
      </section>
      <section className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2 lg:grid-cols-4">
        {countries?.map((country) => {
          return (
            <Link
              key={country.name}
              to="/country/$countryCode"
              params={{ countryCode: country.alpha2Code }}
              className="h-full"
            >
              <Card key={country.name} image={{ src: country.flags.png, alt: country.alpha2Code }} title={country.name}>
                <ul className="space-y-1 text-sm">
                  <li className="text-light-text dark:text-white">
                    <span className="font-semibold">Population:</span> {country.population.toLocaleString()}
                  </li>
                  <li>
                    <span className="font-semibold">Region:</span> {country.region}
                  </li>
                  <li>
                    <span className="font-semibold">Capital:</span> {country.capital}
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
