import { useEffect, useState } from "react";

export function useDebounce(searchTerm: string, delay: number) {
  const [debounced, setDebounced] = useState(searchTerm);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(searchTerm), delay);
    return () => clearTimeout(id);
  }, [searchTerm, delay]);

  return debounced;
}
