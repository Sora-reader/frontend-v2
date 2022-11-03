import { useEffect, useState } from 'react';

/** useMemo wrapper that allows you to also set value before useMemo is recalculated.
 * @param deferredValue useMemo return value */
export const useFutureMemo = (deferredValue: any) => {
  const [currentValue, setFutureValue] = useState<any>();

  useEffect(() => {
    if (currentValue !== deferredValue) setFutureValue(deferredValue);
  }, [deferredValue]);

  return [currentValue, setFutureValue];
};
