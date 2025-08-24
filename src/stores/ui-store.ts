import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Theme = "light" | "dark" | "system";

type UIState = {
  theme: Theme;
};

type UIActions = {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const useUIStore = create<UIState & UIActions>()(
  persist(
    immer<UIState & UIActions>((set) => ({
      theme: "system",
      setTheme: (theme) => {
        set((state) => {
          state.theme = theme;
        });
      },
      toggleTheme: () => {
        set((state) => {
          state.theme = state.theme === "light" ? "dark" : "light";
        });
      },
    })),
    {
      name: "ui-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
