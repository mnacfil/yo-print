import { Link } from "react-router";
import type { Anime } from "~/api/services/types";
import { Card, CardContent, CardFooter } from "~/components/ui/card";

type Props = {
  animes: Anime[];
};

const List = ({ animes }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {animes.map((anime, i) => (
        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id + i}>
          <Card className="p-0">
            <CardContent className="p-0">
              <div className="relative h-80">
                <img
                  src={anime.images.webp.image_url}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
            </CardContent>
            <CardFooter className="px-0 py-4">
              <h3 className="pl-2 line-clamp-1">{anime.title}</h3>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default List;
