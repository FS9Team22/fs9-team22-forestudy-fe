import { useEffect, useState } from 'react';
import './weeklyHabitRow.css';
import { getHabitCurrentWeekLogListByHabitId } from '../../../api/HabitLogService';
import { Sticker } from './sticker';

const STICKER_COLOR = [
  '#D2E869',
  '#B2D570',
  '#99C08E',
  '#97CFD8',
  '#89D5C9',
  '#4CDD84',
  '#73E8F2',
  '#06C0E1',
  '#C7A8DA',
  '#C589DE',
  '#CD69A7',
  '#FDE3A6',
  '#FED054',
  '#FF9E01',
  '#FFA3A5',
  '#F885A7',
  '#E26575',
];

export function WeeklyHabitRow({ rowIndex, habitId, habitName }) {
  const [weeklyData, setWeeklyData] = useState(Array(7).fill(false));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeeklyHabitLog = async () => {
      try {
        setLoading(true);
        const response = await getHabitCurrentWeekLogListByHabitId({ habitId });
        const logs = response.data;
        const newWeeklyData = Array(7).fill(false);
        logs.forEach((log) => {
          const day = new Date(log.loggingDate);
          const dayIndex = day.getDay() - 1;
          if (dayIndex !== -1) {
            newWeeklyData[dayIndex] = true;
          }
        });
        setWeeklyData(newWeeklyData);
      } catch (err) {
        setError(err.message);
        console.error('주간 습관 로그를 불러오는 데 실패했습니다.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyHabitLog();
  }, [habitId]);

  if (error) {
    return (
      <div className="habit-data-row">
        <h4 className="habit-name">{`${habitName}`}</h4>
        <div className="habit-log-list">
          데이터를 불러오는 중 에러가 발생했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="habit-data-row">
      <h4 className="habit-name">{`${habitName}`}</h4>
      <ul className="habit-log-list">
        {loading && '로딩 중...'}
        {!loading &&
          weeklyData.map((done, logIndex) => (
            <li key={logIndex} className="habit-log">
              {done ? (
                <Sticker
                  fill={STICKER_COLOR[rowIndex % STICKER_COLOR.length]}
                />
              ) : (
                <Sticker />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
