import './weeklyHabitTable.css';
import { WeeklyHabitRow } from '../weeklyHabitRow';

export function WeeklyHabitTable({ habits }) {
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
        {habits && habits.length > 0 ? (
          habits.map((habit, index) => (
            <WeeklyHabitRow
              key={habit.id}
              rowIndex={index}
              habitId={habit.id}
              habitName={habit.name}
            />
          ))
        ) : (
          <p>등록된 습관이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
