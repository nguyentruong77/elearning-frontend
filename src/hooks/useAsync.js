import { useState } from "react";

export const useAsync = (promise) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  const excute = async (...data) => {
    try {
      setLoading(true);
      setStatus("pending");
      const res = await promise(...data);
      console.log(res);
      setData(res);
      setStatus("success");
      return res;
    } catch (err) {
      setError(err);
      setStatus("error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    status,
    excute,
  };
};
