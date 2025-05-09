import apiClient from "../client";
import { API_ENDPOINTS } from "../endpoints";
import type {
  GetAnimeDetailRes,
  GetAnimeRecommentationRes,
  GetAnimesRes,
} from "./types";

export const getAnimes = async () => {
  const response = await apiClient<GetAnimesRes>(API_ENDPOINTS.GET_ANIME);
  const data = response.data;
  return data;
};

export const getAnimeDetail = async (id: string) => {
  const response = await apiClient<GetAnimeDetailRes>(
    `${API_ENDPOINTS.GET_ANIME}/${id}`
  );
  const data = response.data;
  return data;
};

export const getAnimeRecommendations = async (id: string) => {
  const response = await apiClient<GetAnimeRecommentationRes>(
    `${API_ENDPOINTS.GET_ANIME}/${id}/recommendations`
  );
  return response.data;
};
