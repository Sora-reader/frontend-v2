import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

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
