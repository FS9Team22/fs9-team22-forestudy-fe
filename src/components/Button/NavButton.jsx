import { useNavigate } from 'react-router';
import './NavButton.css';
import PasswordModal from './PasswordModal.jsx';
import { useStudyAuth } from '../../hooks/useStudyAuth.js';

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
  const { isModalOpen, setIsModalOpen, destination, handleClick } =
    useStudyAuth(studyId, 'habit');
  const navigate = useNavigate();

  return (
    <>
      <button onClick={handleClick} className="nav-button">
        <span>오늘의 습관</span>
        <span className="nav-arrow">›</span>
      </button>
      {isModalOpen && (
        <PasswordModal
          studyId={studyId}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => navigate(destination)}
        />
      )}
    </>
  );
}

export function TimerButton({ studyId }) {
  const { isModalOpen, setIsModalOpen, destination, handleClick } =
    useStudyAuth(studyId, 'timer');
  const navigate = useNavigate();

  return (
    <>
      <button onClick={handleClick} className="nav-button">
        <span>오늘의 집중</span>
        <span className="nav-arrow">›</span>
      </button>
      {isModalOpen && (
        <PasswordModal
          studyId={studyId}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => navigate(destination)}
        />
      )}
    </>
  );
}

export default NavButton;
