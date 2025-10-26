import { useState, useEffect } from 'react';

const TIME_UPDATE_INTERVAL = 1000;

export function useCurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timeUpdate = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_UPDATE_INTERVAL);

    return () => clearInterval(timeUpdate);
  }, []);

  return currentTime;
}
