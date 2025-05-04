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
import ListEmpty from "./components/list-empty";
import { Film, Home, RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";

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

  const isEmpty = data.length === 0;

  return (
    <div className="space-y-6">
      <Search
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {isLoading ? (
        <ListSkeleton />
      ) : (
        <>
          {isEmpty ? (
            <ListEmpty />
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
        </>
      )}
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <Film className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Anime List Unavailable</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't load the anime list right now. This could be due to a
          temporary server issue or network problem.
        </p>
      </div>
    </div>
  );
}
