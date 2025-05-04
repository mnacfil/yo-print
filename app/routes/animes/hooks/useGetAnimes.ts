import { useEffect, useRef, useState } from "react";
import apiClient from "~/api/client";
import { API_ENDPOINTS } from "~/api/endpoints";
import type { GetAnimesRes } from "~/api/services/types";

type Args = {
  queryParams: {
    q?: string;
    page?: number;
  };
  initialValue: GetAnimesRes;
};

const useGetAnimes = ({ queryParams, initialValue }: Args) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<GetAnimesRes>(initialValue);
  const timeoutRef = useRef<ReturnType<typeof window.setTimeout>>(null);
  const { q = "", page = 1 } = queryParams;

  useEffect(() => {
    const fetchAnimes = async () => {
      setIsLoading(true);
      try {
        let url = API_ENDPOINTS.GET_ANIME;
        if (q) {
          url = `${url}?q=${q}`;
        }
        if (page !== 1) {
          url = url.includes("?")
            ? `${url}&page=${page}`
            : `${url}?page=${page}`;
        }
        const response = await apiClient<GetAnimesRes>(url);
        const data = response.data;
        setData(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    timeoutRef.current = setTimeout(() => {
      fetchAnimes();
    }, 250);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [q, page]);

  return {
    isLoading,
    isError,
    data,
  };
};

export default useGetAnimes;
