import type { Anime } from "~/api/services/types";
import AnimeCard from "~/components/common/anime-card";

type Props = {
  animes: Anime[];
};

const List = ({ animes }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {animes.map((anime, i) => (
        <AnimeCard
          key={anime.mal_id}
          episodes={anime.episodes}
          genres={anime.genres}
          images={anime.images}
          mal_id={anime.mal_id}
          rating={anime.rating}
          status={anime.status}
          title={anime.title}
          type={anime.type}
          year={anime.year}
        />
      ))}
    </div>
  );
};

export default List;
