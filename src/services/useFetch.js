import {
  useEffect,
  useRef,
  useState,
} from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const useFetch = (route) => {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    (async () => {
      try {
        const response = await fetch(`${baseUrl}${route}`);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) {
            setData(json);
          }
        } else {
          const requestError = new Error(response || {});
          requestError.message = response?.statusText || 'Internal Server Error';
          requestError.name = `${requestError.message.replaceAll(' ', '').replace(/error$/i, '')}Error`;
          throw requestError;
        }
      } catch (requestError) {
        if (isMounted.current) {
          setError(requestError);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted.current = false;
    };
  }, [route]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
