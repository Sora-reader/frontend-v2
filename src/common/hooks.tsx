import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useRouter} from 'next/router';
import {SoraSkeleton, SoraSkeletonProps} from './components';
import {MangaType} from './apiTypes';

/** A hook to determine if a component was already mounted.
 * Useful for client-only-side conditional rendering. */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

/** Next Link doesn't allow multiple children which makes it useless sometimes.
 * This is a hack to allow url previews like with <a>, but still route clicks through Next.
 * @param href link url
 */
export const useFakeAnchorProps = (href: string = '#') => {
  const router = useRouter();
  const onClick = useCallback((e) => {
    e.preventDefault();
    router.push(href);
  }, [href]);

  return useMemo(() => ({
    component: 'a' as 'a',
    href: href,
    onClick,
  }), [href]);
};

/** Determine if manga can be counted as "empty" or "not loaded"
 * @param value manda or it's id parameter */
export const useIsEmptyManga = (value: MangaType | number) => useMemo(
  () => Number.isInteger(value) ? !~value : !~(value as MangaType).id,
  [value],
);

/** Hook to support rendering optional Skeleton wrapper depending on some value.
 * Returns a component which accepts children which should be wrapped and usual <Skeleton/> props.
 * @param shouldWrap bool to determine if skeleton should be rendered
 */
export const useWithOptionalSkeleton = (shouldWrap: boolean) => (
  // @ts-ignore
  {children, ...props}: SoraSkeletonProps): JSX.Element => (
  shouldWrap ? <SoraSkeleton {...props}>
      {children}
    </SoraSkeleton> :
    children
);

export interface PollingQueryResult<T> {
  data: T | undefined,
  isLoading: boolean,

  [x: string]: any,
}

/** Wrapper for RTK useQuery hooks to add custom polling for current backend.
 * Polling until status is "parsing" or getting 425 (Too early) errors.
 * @param hook your useSomeQuery hook
 * @param arg hook argument
 * @param options hook options
 * @param interval polling interval
 */
export const usePollingQuery = <R, >(hook, arg, options, interval): PollingQueryResult<R> => {
  const [pollingOptions, setPollingOptions] = useState({});
  const {data, isLoading, isError, error, refetch, ...otherQueryProps} = hook(arg, {
    ...options,
    ...pollingOptions,
  });
  const refetchRef = useRef<any>(null);

  // Continue polling when receive a response with "parsing" status
  useEffect(() => {
    if (data && data.status === 'parsing')
      setPollingOptions({pollingInterval: interval});
    else
      setPollingOptions({});
  }, [data]);

  // Continue polling when receiving 425 HTTP error
  useEffect(() => {
    if (isError && error.originalStatus === 425) {
      if (!refetchRef.current) refetchRef.current = setTimeout(() => {
        refetch();
        refetchRef.current = null;
      }, interval);
    }
  }, [otherQueryProps]);

  return {
    data,
    isError,
    error,
    refetch,
    ...otherQueryProps,
    // Simulate "loading" status when we receive 425
    isLoading: isLoading || error?.originalStatus === 425,
  } as PollingQueryResult<R>;
};
