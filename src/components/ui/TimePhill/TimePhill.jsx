import { formatTimeString } from '@/utils/format';
import { useEffect, useState } from 'react';
import './TimePhill.css';

export const TimePhill = () => {
  const TIME_UPDATE_INTERVAL = 1000;
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timeUpdate = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_UPDATE_INTERVAL);

    return () => clearInterval(timeUpdate);
  }, []);
  return (
    <div className="time-section">
      <p className="time-label small-header">현재 시간</p>
      <div className="time-display">{formatTimeString(currentTime)}</div>
    </div>
  );
};
