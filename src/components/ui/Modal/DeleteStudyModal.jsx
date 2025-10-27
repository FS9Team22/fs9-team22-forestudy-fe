import { useState } from 'react';
import { useNavigate } from 'react-router';
import { deleteStudyById } from '@/api/StudyService';
import './Modals.css';

export function DeleteStudyModal({ studyId, onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      await deleteStudyById({ id: studyId, password });
      alert('스터디가 삭제되었습니다.');
      navigate('/');
    } catch (err) {
      setError('비밀번호가 일치하지 않거나 오류가 발생했습니다.');
      console.error('스터디 삭제 실패:', err);
    }
  };

  return (
    <div className="password-modal-overlay" onClick={onClose}>
      <div
        className="password-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-top">
          <h2 className="modal-title">스터디 삭제</h2>
          <button type="button" onClick={onClose}>
            나가기
          </button>
        </div>
        <p className="modal-description">삭제하시겠습니까?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            autoFocus
          />
          {error && <p className="error-message">{error}</p>}
          <div className="modal-buttons">
            <button type="submit">삭제</button>
          </div>
        </form>
      </div>
    </div>
  );
}
