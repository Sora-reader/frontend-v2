import {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';

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
