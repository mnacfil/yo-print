import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("routes/animes/index.tsx"),
    route("anime/:id", "routes/animes/anime/index.tsx"),
  ]),
] satisfies RouteConfig;
