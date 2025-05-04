import { useLocation } from "react-router";

type UrlParam = {
  key: string;
  value?: string | null;
};

const useUpdateUrl = () => {
  const location = useLocation();

  const updateUrl = ({ key, value }: UrlParam) => {
    const currentParams = new URLSearchParams(location.search);

    if (value) {
      currentParams.set(key, value);
    } else {
      currentParams.delete(key);
    }

    const newSearch = currentParams.toString();
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ""}`;

    window.history.replaceState({}, "", newUrl);
  };

  return {
    updateUrl,
  };
};

export default useUpdateUrl;
