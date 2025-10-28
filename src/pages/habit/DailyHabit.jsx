import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useHabits } from '@/hooks/habit/useHabits.js';
import { useStudyAuth } from '@/hooks/useStudyAuth';
import { HabitEditModal } from './components/HabitEditModal';
import { PasswordModal } from '@/components/ui/Modal/PasswordModal';
import './DailyHabit.css';
import { StudyInfo } from '@/components/StudyInfo';

export default function DailyHabit() {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const {
    isModalOpen: isAuthModalOpen,
    setIsModalOpen: setIsAuthModalOpen,
    checkAuth,
  } = useStudyAuth(studyId, 'habit');

  const {
    goalList,
    study,
    isLoading,
    error,
    handleGoalStatusChange,
    saveHabitList,
  } = useHabits(studyId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <div className="habit-container">로딩 중...</div>;
  if (error) return <div className="habit-container">에러...</div>;
  return (
    <>
      {isAuthModalOpen && (
        <PasswordModal
          studyId={studyId}
          onClose={() => navigate('/')}
          onSuccess={() => setIsAuthModalOpen(false)}
        />
      )}
      <div className="habit-container">
        <div className="main-content">
          <div className="content-card">
            <StudyInfo study={study} />

            <div className="habit-section">
              <div className="habit-header">
                <h2 className="habit-title">오늘의 습관</h2>
                <button onClick={handleModalOpen} className="edit-button">
                  목록 수정
                </button>
              </div>
              {goalList.length > 0 ? (
                <div className="goal-list">
                  {goalList.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() =>
                        handleGoalStatusChange(
                          goal.id,
                          goal.habitLogs?.id,
                          goal.isDone,
                        )
                      }
                      className={`goal-button ${goal.isDone ? 'completed' : ''}`}
                    >
                      {goal.name}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>안녕하세요</p>
                  <p className="empty-subtitle">목록을 설정해주세요</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <HabitEditModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          initialHabits={goalList}
          onSave={saveHabitList}
        />
      </div>
    </>
  );
}
