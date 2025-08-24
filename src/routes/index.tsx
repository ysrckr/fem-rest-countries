import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@/components/layouts/filters/input";
import { Select } from "@/components/layouts/filters/select";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <section>
        <Input placeholder="Search for a country..." icon={<HiOutlineMagnifyingGlass />} />
        <Select>
          <option value="">Select a region...</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </Select>
      </section>
    </>
  );
}
