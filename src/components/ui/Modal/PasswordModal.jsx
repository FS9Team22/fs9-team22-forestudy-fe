import { useState } from 'react';
import './Modals.css';
import { loginStudy } from '@/api/StudyService';

export function PasswordModal({
  studyId,
  studyNickname,
  studyTitle,
  toGo,
  onClose,
  onSuccess,
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(''); // 비밀번호 입력 시 에러 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    try {
      const res = await loginStudy({ id: studyId, password });

      if (res.ok) {
        sessionStorage.setItem(`study-${studyId}-auth`, 'true');
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.message || '비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('로그인 실패:', err);
    }
  };

  return (
    <div className="password-modal-overlay" onClick={onClose}>
      <div
        className="password-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">
          {studyNickname}의 {studyTitle}
        </h2>
        <p className="modal-description">권한이 필요합니다.</p>
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
            <button className="submit-btn" type="submit">
              {toGo ? toGo : '현재 페이지'}로 가기
            </button>
            <button className="exit-btn" type="button" onClick={onClose}>
              나가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
