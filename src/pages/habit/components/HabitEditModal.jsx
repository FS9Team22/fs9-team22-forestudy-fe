import { useState, useEffect } from 'react';

export function HabitEditModal({ isOpen, onClose, initialHabits, onSave }) {
  const [editGoalList, setEditGoalList] = useState([]);

  useEffect(() => {
    setEditGoalList(initialHabits);
  }, [initialHabits]);

  const handleGoalDelete = (id) => {
    setEditGoalList(editGoalList.filter((goal) => goal.id !== id));
  };

  const handleGoalAdd = () => {
    const newId = Date.now();
    setEditGoalList([...editGoalList, { id: newId, name: '', isDone: false }]);
  };

  const handleGoalTextChange = (id, newText) => {
    setEditGoalList(
      editGoalList.map((goal) =>
        goal.id === id ? { ...goal, name: newText } : goal,
      ),
    );
  };

  const handleSave = () => {
    onSave(editGoalList);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
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
                  value={goal.name}
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
          <button onClick={onClose} className="cancel-button">
            취소
          </button>
          <button onClick={handleSave} className="save-button">
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
