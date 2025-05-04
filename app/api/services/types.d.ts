export type Anime = {
  mal_id: number;
  url: string;
  images: {
    jpg: ImageType;
    webp: ImageType;
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  approved: boolean;
  titles: {
    type: string;
    title: string;
  }[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: DateParts;
      to: DateParts;
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: ProducerInfo[];
  licensors: ProducerInfo[];
  studios: ProducerInfo[];
  genres: GenreInfo[];
  explicit_genres: GenreInfo[];
  themes: GenreInfo[];
  demographics: GenreInfo[];
};

type ImageType = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

type DateParts = {
  day: number;
  month: number;
  year: number;
};

type ProducerInfo = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type GenreInfo = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type GetAnimeDetailRes = {
  data: Anime;
};

export type GetAnimesRes = {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
};
