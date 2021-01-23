import { useState, useEffect, useReducer } from 'react';

const initState = {
  data: null,
  error: null,
  isLoading: false,
};

function fetchReducer(state, action) {
  switch (action.type) {
    case 'Success':
      return {
        ...state,
        isLoading: false,
        data: action.fetchedData,
      };

    case 'Error':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    case 'Loading':
      return {
        ...state,
        isLoading: true,
      };

    case 'Reset':
      return initState;

    default:
      throw new Error('Action not defined');
  }
}

export default function useFetch({ url, options }, skip = false) {
  const [fetchState, dispatch] = useReducer(fetchReducer, initState);
  const [refetchIndex, setRetryFetchCount] = useState(0);

  const { data, isLoading, error } = fetchState;

  const retryFetch = () => setRetryFetchCount(prevIndex => prevIndex + 1);

  useEffect(() => {
    if (skip) return;
    console.log('useFetch is refetching');

    dispatch({ type: 'Loading' });
    (async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (!response.ok || result?.Error) throw result;

        dispatch({ type: 'Success', fetchedData: result });
      } catch (error) {
        dispatch({ type: 'Error', error });
      }
    })();

    return () => {
      dispatch({ type: 'Reset' });
      setRetryFetchCount(0);
    };
  }, [url, refetchIndex]);

  return { data, isLoading, error, retryFetch };
}
