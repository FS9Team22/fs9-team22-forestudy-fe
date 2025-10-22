import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavButton.css';

function NavButton({ children, to, size = 'default' }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`nav-button nav-button-${size}`}
    >
      <span>{children}</span>
      <span className="nav-arrow">›</span>
    </button>
  );
}

export function HomeButton() {
  return (
    <NavButton to="/" size="small">
      홈
    </NavButton>
  );
}

export function HabitButton({ studyId }) {
  return <NavButton to={`/study/${studyId}/habit`}>오늘의 습관</NavButton>;
}

export function TimerButton({ studyId }) {
  return <NavButton to={`/study/${studyId}/timer`}>오늘의 집중</NavButton>;
}

export default NavButton;
