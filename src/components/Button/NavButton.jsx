import React from 'react';
import { useNavigate } from 'react-router-dom';

// 기본 NavButton (크기 조절 가능)
function NavButton({ children, to, size = 'default' }) {
  const navigate = useNavigate();
  
  const sizeClasses = {
    default: 'w-36 h-12',  // 144px x 48px
    small: 'w-20 h-12'     // 80px x 48px (홈)
  };
  
  return (
    <button
      onClick={() => navigate(to)}
      className={`${sizeClasses[size]} px-4 bg-white border border-gray-300 rounded-full text-gray-700 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between`}
    >
      <span>{children}</span>
      <span className="text-gray-400">&gt;</span>
    </button>
  );
}

// 이거 경로 재지정 필요함
export function HomeButton() {
  return <NavButton to="/home" size="small">홈</NavButton>;
}

export function HabitButton() {
  return <NavButton to="/study/:studyId/habit">오늘의 습관</NavButton>;
}

export function TimerButton() {
  return <NavButton to="/study/:studyId/timer">오늘의 집중</NavButton>;
}

