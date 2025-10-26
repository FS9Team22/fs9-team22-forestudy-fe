import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { HomeButton, TimerButton } from '../../components/ui';
import { formatTimeString } from '../../utils/format';
import './DailyHabit.css';

const TIME_UPDATE_INTERVAL = 1000;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function DailyHabit() {
  const { studyId } = useParams();
  const [goalList, setGoalList] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editGoalList, setEditGoalList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeUpdate = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_UPDATE_INTERVAL);

    return () => clearInterval(timeUpdate);
  }, []);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/study/${studyId}/habits`);
        const data = await response.json();

        if (data.success) {
          setGoalList(data.data);
        }
      } catch (error) {
        console.error('습관 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [studyId]);

  const handleGoalStatusChange = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/study/${studyId}/habits/${id}/status`,
        { method: 'PATCH' },
      );
      const data = await response.json();

      if (data.success) {
        setGoalList(
          goalList.map((goal) =>
            goal.id === id ? { ...goal, isDone: !goal.isDone } : goal,
          ),
        );
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  const handleModalOpen = () => {
    setEditGoalList([...goalList]);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleGoalListSave = async () => {
    try {
      const deletedGoals = goalList.filter(
        (goal) => !editGoalList.find((edit) => edit.id === goal.id),
      );

      for (const goal of deletedGoals) {
        await fetch(`${API_URL}/study/${studyId}/habits/${goal.id}`, {
          method: 'DELETE',
        });
      }

      for (const goal of editGoalList) {
        const originalGoal = goalList.find((g) => g.id === goal.id);

        if (!originalGoal) {
          await fetch(`${API_URL}/study/${studyId}/habits`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: goal.text }),
          });
        } else if (originalGoal.text !== goal.text) {
          await fetch(`${API_URL}/study/${studyId}/habits/${goal.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: goal.text }),
          });
        }
      }

      const response = await fetch(`${API_URL}/study/${studyId}/habits`);
      const data = await response.json();

      if (data.success) {
        setGoalList(data.data);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  const handleGoalDelete = (id) => {
    setEditGoalList(editGoalList.filter((goal) => goal.id !== id));
  };

  const handleGoalAdd = () => {
    const newId = Date.now();
    setEditGoalList([...editGoalList, { id: newId, text: '', isDone: false }]);
  };

  const handleGoalTextChange = (id, newText) => {
    setEditGoalList(
      editGoalList.map((goal) =>
        goal.id === id ? { ...goal, text: newText } : goal,
      ),
    );
  };

  if (isLoading) {
    return <div className="habit-container">로딩 중...</div>;
  }

  return (
    <div className="habit-container">
      <div className="logo-section"></div>

      <div className="main-content">
        <div className="content-card">
          <div className="header">
            <h1 className="title">2팀</h1>
            <div className="nav-buttons">
              <TimerButton studyId={studyId} />
              <HomeButton />
            </div>
          </div>

          <div className="time-section">
            <p className="time-label">현재 시간</p>
            <div className="time-display">{formatTimeString(currentTime)}</div>
          </div>

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
                    onClick={() => handleGoalStatusChange(goal.id)}
                    className={`goal-button ${goal.isDone ? 'completed' : ''}`}
                  >
                    {goal.text}
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">습관 목록</h3>
            </div>

            <div className="modal-body">
              <div className="edit-goal-list">
                {editGoalList.map((goal) => (
                  <div key={goal.id} className="edit-goal-item">
                    <input
                      type="text"
                      value={goal.text}
                      onChange={(e) =>
                        handleGoalTextChange(goal.id, e.target.value)
                      }
                      className="goal-input"
                      placeholder="습관을 입력하세요"
                    />
                    <button
                      onClick={() => handleGoalDelete(goal.id)}
                      className="delete-button"
                      title="삭제"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={handleGoalAdd} className="add-button">
                + 습관 추가
              </button>
            </div>

            <div className="modal-footer">
              <button onClick={handleModalClose} className="cancel-button">
                취소
              </button>
              <button onClick={handleGoalListSave} className="save-button">
                수정 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
