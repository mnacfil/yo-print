import { useEffect, useRef, useState } from "react";
import apiClient from "~/api/client";
import { API_ENDPOINTS } from "~/api/endpoints";
import type { GetAnimesRes } from "~/api/services/types";
import useUpdateUrl from "~/hooks/useUpdateURL";

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
  const { updateUrl } = useUpdateUrl();
  const { q = "", page = 1 } = queryParams;

  useEffect(() => {
    let isActive = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchAnimes = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        let url = API_ENDPOINTS.GET_ANIME;
        const params = new URLSearchParams();

        if (q) {
          params.append("q", q);
        }
        if (page !== 1) {
          params.append("page", page.toString());
        }
        if (params.toString()) {
          url = `${url}?${params.toString()}`;
        }
        const response = await apiClient<GetAnimesRes>(url, {
          signal,
        });
        if (isActive) {
          updateUrl({ key: "q", value: q });
          setData(response.data);
        }
      } catch (error) {
        if (isActive && !signal.aborted) {
          console.log("Something went wrong while fetching animes", error);
          setIsError(true);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };
    timeoutRef.current = setTimeout(() => {
      fetchAnimes();
    }, 250);
    return () => {
      if (isActive) {
        isActive = false;
        abortController.abort();
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
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
