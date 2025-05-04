import { getAnimeDetail, getAnimeRecommendations } from "~/api/services/anime";
import type { Route } from "./+types/index";
import { isRouteErrorResponse, Link, useNavigate } from "react-router";
import {
  Play,
  Clock,
  Calendar,
  ChevronRight,
  ChevronLeftIcon,
  Film,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import AnimeCard from "~/components/common/anime-card";

export async function loader({ params }: Route.LoaderArgs) {
  const animeDetail = await getAnimeDetail(params.id);
  const animeRecommendations = await getAnimeRecommendations(params.id);
  return { animeDetail, animeRecommendations };
}

export function meta({ data: { animeDetail } }: Route.MetaArgs) {
  const { title, background } = animeDetail.data;
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

export default function AnimeDetailPage({
  loaderData: { animeDetail, animeRecommendations },
}: Route.ComponentProps) {
  const {
    data: {
      images,
      title,
      title_japanese,
      rating,
      status,
      episodes,
      duration,
      year,
      studios,
      genres,
      synopsis,
    },
  } = animeDetail;
  const recommendations = animeRecommendations.data;
  const navigate = useNavigate();

  return (
    <>
      <Button
        type="button"
        variant={"ghost"}
        className="mb-5"
        onClick={() => navigate("/")}
      >
        <ChevronLeftIcon />
        Back to list
      </Button>
      <div className="min-h-screen bg-background">
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            <div className="space-y-6">
              <div className="relative rounded-lg overflow-hidden shadow-xl border border-muted">
                <img
                  src={images.webp.image_url}
                  alt={title}
                  width={300}
                  height={450}
                  className="w-full h-auto"
                />
              </div>

              <div className="space-y-4 bg-card p-4 rounded-lg border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center">
                    <span className="font-medium text-sm">{rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className="font-medium">
                    {status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Episodes
                  </span>
                  <span className="font-medium">{episodes}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="font-medium">{duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Year</span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="font-medium">{year}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-sm text-muted-foreground block mb-2">
                    Studios
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {studios.map((studio) => (
                      <Badge key={studio.name} variant="secondary">
                        {studio.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button className="w-full">
                  <Play className="w-4 h-4 mr-2" /> Watch Now
                </Button>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
                <p className="text-muted-foreground">{title_japanese}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {genres.map((genre) => (
                    <Badge
                      key={genre.name}
                      variant="secondary"
                      className="text-xs"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {synopsis}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Related Anime</h2>
                  <Button variant="ghost" size="sm" className="text-sm">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {recommendations.slice(0, 3).map((recommendation) => (
                    <AnimeCard
                      key={recommendation.entry.mal_id}
                      episodes={0}
                      genres={[]}
                      images={recommendation.entry.images}
                      mal_id={recommendation.entry.mal_id}
                      rating={""}
                      status={""}
                      title={recommendation.entry.title}
                      type={""}
                      year={2025}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <Film className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Anime Detail Unavailable</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't load the anime detail right now. This could be due to a
          temporary server issue or network problem.
        </p>
      </div>
    </div>
  );
}
