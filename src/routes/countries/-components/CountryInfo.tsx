export const CountryInfo = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <p>
    <span className="font-semibold">{label}:</span> {value}
  </p>
);
