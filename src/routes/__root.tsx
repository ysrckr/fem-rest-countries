import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { Header } from "@/components/layouts/header/header";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { useUIStore, type Theme } from "@/stores/ui-store";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const theme = useUIStore((state) => state.theme as Theme);

  useEffect(() => {
    const htmlElement = document.documentElement;

    const apply = (mode: "light" | "dark") => {
      if (mode === "dark") htmlElement.setAttribute("data-theme", "dark");
      else htmlElement.removeAttribute("data-theme");
    };

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      apply(mq.matches ? "dark" : "light");
      const listener = (e: MediaQueryListEvent) => apply(e.matches ? "dark" : "light");
      mq.addEventListener?.("change", listener);
      return () => mq.removeEventListener?.("change", listener);
    }

    apply(theme);
  }, [theme]);

  return (
    <>
      <Header />
      <main className="container m-auto p-4">
        <Outlet />
      </main>

      {import.meta.env.MODE === "development" && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-right" />
          <TanStackRouterDevtools position="top-left" />
        </>
      )}
    </>
  );
}
