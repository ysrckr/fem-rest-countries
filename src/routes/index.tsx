import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@/components/layouts/filters/input";
import { Select } from "@/components/layouts/filters/select";
import { createFileRoute } from "@tanstack/react-router";
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
        />
      </section>
    </>
  );
}
