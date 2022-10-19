import { useEffect, useRef, useState } from 'react';

export interface PollingQueryResult<T> {
  data?: T;
  isLoading: boolean;

  [x: string]: any;
}

/** Wrapper for RTK useQuery hooks to add custom polling for current backend.
 * Polling until status is "parsing" or getting 425 (Too early) errors.
 * @param hook your useSomeQuery hook
 * @param arg hook argument
 * @param options hook options
 * @param interval polling interval
 */
export const usePollingQuery = <R>(hook, arg, options, interval): PollingQueryResult<R> => {
  const [pollingOptions, setPollingOptions] = useState({});
  const { data, isLoading, isError, error, refetch, ...otherQueryProps } = hook(arg, {
    ...options,
    ...pollingOptions,
  });
  const refetchRef = useRef<any>(null);

  // Continue polling when receive a response with "parsing" status
  useEffect(() => {
    if (data && !error && data.status === 'parsing') setPollingOptions({ pollingInterval: interval });
    else setPollingOptions({});
  }, [data, error]);

  // Continue polling when receiving 425 HTTP error
  useEffect(() => {
    if (isError && error.status === 425) {
      console.log('Refetch cuz of 425');
      clearTimeout(refetchRef.current);
      refetchRef.current = setTimeout(() => {
        refetch();
        refetchRef.current = null;
      }, interval);
    }
  }, [isError, error]);

  return {
    data,
    isError,
    error,
    refetch,
    ...otherQueryProps,
    // Return IsLoading or (simulate it when we receive 425 ~OR~ it's really "parsing")
    isLoading: isLoading || error?.originalStatus === 425 || (data && data.status === 'parsing'),
  } as PollingQueryResult<R>;
};
