import {
  useEffect,
  useState,
} from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (route) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(baseUrl + route);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        } else {
          throw response;
        }
      } catch (requestError) {
        setError(requestError);
      } finally {
        setLoading(false);
      }
    })();
  }, [route]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
