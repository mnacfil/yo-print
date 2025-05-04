import { getAnimeDetail } from "api/services/anime";
import type { Route } from "./+types/index";
import { isRouteErrorResponse } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const data = await getAnimeDetail(params.id);
  return data;
}

export function meta({ data }: Route.MetaArgs) {
  const { title, background } = data.data;
  return [
    {
      title: title,
    },
    {
      name: "description",
      content: background,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: background,
    },
  ];
}

export default function AnimeDetail({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;
  return (
    <div>
      <h1>{data.title}</h1>
      <div className="relative w-full h-full">
        <img src={data.images.webp.large_image_url} alt="img" />
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
      <h2>Error on anime detail page</h2>
    </main>
  );
}
