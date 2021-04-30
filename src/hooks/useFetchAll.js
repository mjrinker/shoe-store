import {
  useEffect,
  useRef,
  useState,
} from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const areEqual = (array1, array2) => array1.length === array2.length
  && array1.every((value, index) => value === array2[index]);

const getAll = async (context) => {
  const [, routes] = context.queryKey;
  const responsePromises = routes.map((route) => fetch(`${baseUrl}${route}`).then((response) => {
    if (response.ok) {
      return response.json();
    }

    const requestError = new Error(response || {});
    requestError.message = response?.statusText || 'Internal Server Error';
    requestError.name = `${requestError.message.replaceAll(' ', '').replace(/error$/i, '')}Error`;
    throw requestError;
  }));

  return Promise.all(responsePromises);
};

const useFetchAll = (routes) => {
  const previousRoutes = useRef([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (areEqual(previousRoutes.current, routes)) {
      setLoading(false);
      return;
    }

    previousRoutes.current = routes;

    const promises = routes.map((route) => fetch(`${baseUrl}${route}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        const requestError = new Error(response || {});
        requestError.message = response?.statusText || 'Internal Server Error';
        requestError.name = `${requestError.message.replaceAll(' ', '').replace(/error$/i, '')}Error`;
        throw requestError;
      }));

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((requestError) => {
        console.error(requestError);
        setError(requestError);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only run once

  return {
    data,
    error,
    loading,
  };
};

export default useFetchAll;
export { getAll };
