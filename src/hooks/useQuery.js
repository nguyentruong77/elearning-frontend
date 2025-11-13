import { localStorageCache } from "@/utils/cache";
import { handleError } from "@/utils/handleError";
import { useEffect, useState } from "react";

export const useQuery = (options = {}) => {
  const { queryFn, queryKey, cacheTime } = options;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetchData();
  }, [queryKey]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setStatus("pending");
      let res;
      if (queryKey) {
        res = localStorageCache.get(queryKey);
      }
      if (!res) {
        res = await queryFn();
      }

      setStatus("success");
      setData(res);
      setLoading(false);

      if (queryKey) {
        let expired = cacheTime;
        if (cacheTime) {
          expired += Date.now();
        }

        localStorageCache.set(queryKey, res, expired);
      }
    } catch (error) {
      setError(error);
      setStatus("error");
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    error,
    status,
    loading,
  };
};
