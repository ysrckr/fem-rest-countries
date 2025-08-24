import { createJSONStorage, persist } from 'zustand/middleware'

import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type UIState = {
  theme: "dark" | "light"
}

type UIActions = {
  setTheme: (theme: "dark" | "light") => void
  toggleTheme: () => void
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    immer<UIState & UIActions>((set) => ({
      theme: (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
      setTheme: (theme) => {
        set((state) => {
          state.theme = theme
        })
      },
      toggleTheme: () => {
        set((state) => {
          state.theme = state.theme === "light" ? "dark" : "light"
        })
      }
    })), {
      name: "ui-store",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)