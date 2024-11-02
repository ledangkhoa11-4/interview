import { useEffect, useState } from 'react';

interface WindowDimensions {
  width: number | 0;
  height: number | 0;
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window?.innerWidth ?? 0,
        height: window?.innerHeight ?? 0,
      });
    };

    handleResize();
    window?.addEventListener('resize', handleResize);

    return () => window?.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
