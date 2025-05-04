import { getAnimes } from "api/services/anime";
import type { Route } from "./+types/index";
import { isRouteErrorResponse, Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seach for favorite anime" },
    { name: "description", content: "Thousand of anime's" },
  ];
}

export async function loader() {
  const data = await getAnimes();
  return data;
}

export default function Animes({ loaderData }: Route.ComponentProps) {
  const animes = loaderData.data;
  return (
    <div>
      <h2>Search Input</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {animes.map((anime) => (
          <Link
            to={`/anime/${anime.mal_id}`}
            key={anime.mal_id}
            className="border border-b shadow-md rounded-[26px] p-4"
          >
            <h3>{anime.title}</h3>
            <div className="relative">
              <img
                src={anime.images.webp.image_url}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
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
