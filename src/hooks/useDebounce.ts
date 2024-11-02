import { useEffect, useRef } from 'react';

interface IDebounceCallback {
  (...args: any[]): void;
}

const useDebounce = (callback: IDebounceCallback, wait: number) => {
  const argsRef = useRef<any[]>();
  const timeout = useRef<NodeJS.Timeout | number>(null);

  const cleanup = () => {
    if (timeout?.current !== null) {
      clearTimeout(timeout?.current);
    }
  };

  useEffect(() => cleanup, []);

  return (...args: any[]) => {
    argsRef.current = args;

    cleanup();

    timeout.current = setTimeout(() => {
      if (argsRef?.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
};

export default useDebounce;
