import { useEffect, useState } from 'react';

/** A hook to determine if a component was already mounted.
 * Useful for client-only-side conditional rendering. */
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
