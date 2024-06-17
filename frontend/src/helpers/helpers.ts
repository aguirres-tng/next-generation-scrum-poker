import { dequal } from 'dequal/lite';
import { useRef } from 'preact/hooks';

export function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef<T>(value);

  if (!dequal(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export const doNothing = () => {
  /* nothing to do */
};
