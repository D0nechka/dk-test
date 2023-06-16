import { useEffect, EffectCallback, DependencyList } from 'react';

const useAsyncEffect = (
  effect: () => Promise<void>,
  deps?: DependencyList
): void => {
  useEffect(() => {
    let cleanup: ReturnType<typeof effect> | typeof effect = effect();

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      } else if (cleanup instanceof Promise) {
        cleanup.catch((error) => {
          console.error('Error during cleanup:', error);
        });
      }
    };
  }, deps);
};

export default useAsyncEffect;