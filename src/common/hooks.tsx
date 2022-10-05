import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { SoraSkeleton, SoraSkeletonProps } from './components';
import { MangaType } from './apiTypes';

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
  const onClick = useCallback(
    (e) => {
      e.preventDefault();
      router.push(href);
    },
    [href]
  );

  return useMemo(
    () => ({
      component: 'a' as 'a',
      href: href,
      onClick,
    }),
    [href]
  );
};

/** Determine if manga can be counted as "empty" or "not loaded"
 * @param value manga or it's id parameter */
export const useIsEmptyManga = (value: MangaType | number) =>
  useMemo(() => (Number.isInteger(value) ? !~value : !~(value as MangaType).id), [value]);

/** Determine if manga is partially parsed. Meaning there are still details to be parsed
 * @param value manda or it's id parameter */
export const useIsPartialManga = (value: MangaType) => useMemo(() => value.rssUrl === undefined, [value]);

type OptionalSkeletonHookProps = SoraSkeletonProps & { forceWrap?: boolean };
/** Hook to support rendering optional Skeleton wrapper depending on some value.
 * Returns a component which accepts children which should be wrapped and usual <Skeleton/> props.
 *
 * You can override initial shouldWrap argument with forceWrap argument to the component itself.
 * @param shouldWrap bool to determine if skeleton should be rendered
 */
export const useWithOptionalSkeleton =
  (shouldWrap: boolean) =>
  ({ forceWrap, children, ...props }: OptionalSkeletonHookProps): JSX.Element =>
    shouldWrap || forceWrap ? <SoraSkeleton children={children} {...props} /> : (children as any);

export interface PollingQueryResult<T> {
  data: T | undefined;
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
export const usePollingQuery = <R,>(hook, arg, options, interval): PollingQueryResult<R> => {
  const [pollingOptions, setPollingOptions] = useState({});
  const { data, isLoading, isError, error, refetch, ...otherQueryProps } = hook(arg, {
    ...options,
    ...pollingOptions,
  });
  const refetchRef = useRef<any>(null);

  // Continue polling when receive a response with "parsing" status
  useEffect(() => {
    if (data && data.status === 'parsing') setPollingOptions({ pollingInterval: interval });
    else setPollingOptions({});
  }, [data]);

  // Continue polling when receiving 425 HTTP error
  useEffect(() => {
    if (isError && error.originalStatus === 425) {
      if (!refetchRef.current)
        refetchRef.current = setTimeout(() => {
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
    // Return IsLoading or (simulate it when we receive 425 ~OR~ it's really "parsing")
    isLoading: isLoading || error?.originalStatus === 425 || (data && data.status === 'parsing'),
  } as PollingQueryResult<R>;
};
