import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {SoraSkeleton, SoraSkeletonProps} from './components';

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

  const [props] = useState({
    component: 'a' as 'a',
    href: href,
    onClick,
  });

  return props;
};

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

