import './weeklyHabitTable.css';
import { WeeklyHabitRow } from '../weeklyHabitRow';

export function WeeklyHabitTable() {
  // 임시 데이터 배열
  const habits = [
    {
      id: 1,
      name: '아침 30분 조깅',
      data: [true, true, false, true, true, false, true],
    },
    {
      id: 2,
      name: '일어나서 물 한잔',
      data: [true, true, true, true, true, true, true],
    },
    {
      id: 3,
      name: '책 20페이지 읽기',
      data: [true, false, true, false, true, true, false],
    },
    {
      id: 4,
      name: '하루 1만보 걷기',
      data: [false, false, true, true, true, true, true],
    },
  ];

  return (
    <div className="section-weeklyhabit-wrap">
      <h2 className="middle-header">습관 기록표</h2>
      <ul className="weekname">
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
        <li>일</li>
      </ul>
      <div className="habit-list-box">
        {habits.map((habit, index) => (
          <WeeklyHabitRow
            key={habit.id}
            rowIndex={index}
            habitName={habit.name}
            weeklyData={habit.data}
          />
        ))}
      </div>
    </div>
  );
}
