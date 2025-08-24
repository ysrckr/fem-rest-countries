import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

import { useUIStore } from "@/stores/ui-store";

export const Header = () => {
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const theme = useUIStore((state) => state.theme);

  return (
    <header className="bg-light-element z-10 w-full shadow-md transition-colors duration-300 dark:bg-dark-element dark:text-white">
      <section className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Where in the world?</h1>
        <button
          type="button"
          className="text-md flex cursor-pointer items-center gap-2 px-4 py-2"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />} {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </section>
    </header>
  );
};
