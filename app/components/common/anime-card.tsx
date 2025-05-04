import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";
import type { Anime } from "~/api/services/types";

type Props = Pick<
  Anime,
  | "mal_id"
  | "status"
  | "type"
  | "images"
  | "title"
  | "genres"
  | "episodes"
  | "rating"
  | "year"
>;

const AnimeCard = ({
  episodes,
  genres,
  images,
  mal_id,
  rating,
  status,
  title,
  type,
  year,
}: Props) => {
  return (
    <Link
      to={`/anime/${mal_id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
        <Badge
          variant="secondary"
          className={`absolute top-2 left-2 z-10 ${
            status === "Ongoing" ? "bg-green-500/90" : "bg-blue-500/90"
          } text-white text-xs font-medium`}
        >
          {status}
        </Badge>

        <Badge
          variant="secondary"
          className="absolute top-2 right-2 z-10 bg-black/70 text-white text-xs font-medium"
        >
          {type}
        </Badge>

        <img
          src={images.webp.image_url}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex flex-wrap gap-1 mb-2">
            {genres.slice(0, 2).map((genre) => (
              <Badge
                key={genre.name}
                variant="outline"
                className="text-[10px] text-white border-white/50"
              >
                {genre.name}
              </Badge>
            ))}
            {genres.length > 2 && (
              <Badge
                variant="outline"
                className="text-[10px] text-white border-white/50"
              >
                +{genres.length - 2}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>{episodes} episodes</span>
            <span>{year}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 p-2">
        {rating && (
          <div className="flex items-center mb-1">
            <div className="flex items-center bg-amber-100 dark:bg-amber-950/40 px-1.5 py-.5 rounded text-xs font-medium text-amber-600 dark:text-amber-400">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-0.5" />
              {rating}
            </div>
          </div>
        )}
        <h3 className="font-medium text-sm line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default AnimeCard;
