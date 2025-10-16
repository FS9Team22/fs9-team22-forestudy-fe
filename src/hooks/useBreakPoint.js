import { useEffect, useState } from 'react';

export function useBreakPoint() {
  const screenWidth = typeof window !== 'undefined';

  const [mobile, setMobile] = useState(screenWidth < 768);
  const [tablet, setTablet] = useState(
    screenWidth >= 768 && screenWidth < 1200,
  );

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setMobile(screenWidth < 768);
      setTablet(screenWidth >= 768 && screenWidth < 1200);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    mobile,
    tablet,
  };
}
