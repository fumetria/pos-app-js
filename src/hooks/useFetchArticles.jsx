import { useEffect, useState } from "react";

export const useFetchArticles = ({ url, refetch }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError(error);
        setData([]);
      }
    };

    fetchData();
  }, [url, refetch]);

  return { data, error };
};
