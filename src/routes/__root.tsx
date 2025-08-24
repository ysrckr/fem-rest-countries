import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { Header } from "@/components/layouts/header/header";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { useUIStore } from "@/stores/ui-store";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const htmlElement = document.querySelector("html")!;
    if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      htmlElement.removeAttribute("data-theme");
    }
  }, [theme]);

  return (
    <>
    <Header/>
      <main className="m-auto">
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
