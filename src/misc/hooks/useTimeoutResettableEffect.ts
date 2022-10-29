import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/** Hook to perform delayed and resettable effect */
export const useTimeoutResettableEffect = (effect: EffectCallback, deps: DependencyList, timeout = 500) => {
  // Delay search for 500ms after user stopped typing
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(effect, timeout);
  }, [deps]);
};
