import { useEffect, useState } from "react";

export const useFetch = (promise, dependencyList = []) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setStatus("pending");
      const res = await promise();
      console.log(res);
      setData(res);
      setStatus("success");
    } catch (err) {
      setError(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencyList);

  return {
    loading,
    data,
    error,
    status,
  };
};
