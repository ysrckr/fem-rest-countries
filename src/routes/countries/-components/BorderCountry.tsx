import { Link } from "@tanstack/react-router";
import { useCountryByCodeQuery } from "@/hooks/queries/queries/countries";

export const BorderCountry = ({ code }: { code: string }) => {
  const countryQuery = useCountryByCodeQuery(code);
  const country = countryQuery.data[0];

  return (
    <Link
      to="/countries/$countryCode"
      params={{ countryCode: country?.cca2 || "" }}
      className="inline-block rounded-md bg-white px-4 py-2 text-sm shadow-md dark:bg-dark-element dark:text-white"
    >
      {country?.name?.common}
    </Link>
  );
};
