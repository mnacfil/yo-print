import { useLocation, useNavigate } from "react-router";

type UrlParam = {
  key: string;
  value?: string;
};

const useUpdateUrl = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const updateUrl = ({ key, value }: UrlParam) => {
    const params = new URLSearchParams();
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const newUrl = `${pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  return {
    updateUrl,
  };
};

export default useUpdateUrl;
