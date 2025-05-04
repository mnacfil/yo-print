import { getAnimes } from "~/api/services/anime";
import type { Route } from "./+types/index";
import { isRouteErrorResponse, useSearchParams } from "react-router";
import Search from "./components/search";
import List from "./components/list";
import { useState } from "react";
import useGetAnimes from "./hooks/useGetAnimes";
import Pagination from "./components/pagination";
import useUpdateUrl from "~/hooks/useUpdateURL";
import ListSkeleton from "./components/list-skeleton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Search for favorite anime" },
    { name: "description", content: "Thousand of anime's" },
  ];
}

export async function loader() {
  const data = await getAnimes();
  return data;
}

export default function Animes({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const {
    isError,
    isLoading,
    data: { data, pagination },
  } = useGetAnimes({
    queryParams: {
      page,
      q: query,
    },
    initialValue: loaderData,
  });

  const { updateUrl } = useUpdateUrl();

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="space-y-6">
      <Search value={query} onChange={(e) => setQuery(e.target.value)} />
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <>
          <List animes={data} />
          <Pagination
            currentPage={page}
            pagination={pagination}
            onClick={(page) => {
              updateUrl({ key: "page", value: page.toString() });
              setPage(page);
            }}
          />
        </>
      )}
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      <h2>Error on animes page</h2>
    </main>
  );
}
