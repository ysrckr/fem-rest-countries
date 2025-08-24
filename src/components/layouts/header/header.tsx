import { HiOutlineMoon } from "react-icons/hi";
import { useUIStore } from "@/stores/ui-store";

export const Header = () => {
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  return (
    <header className="w-full shadow-md dark:text-white dark:bg-dark-element bg-light-element z-10 transition-colors duration-300">
      <section className="container p-4 flex justify-between items-center mx-auto">
        <h1 className="font-semibold text-xl">Where in the world?</h1>
        <button type="button" className="flex items-center gap-2 cursor-pointer px-4 py-2 text-md" onClick={toggleTheme}><HiOutlineMoon /> Dark Mode</button>
      </section>
    </header>
  );
};
