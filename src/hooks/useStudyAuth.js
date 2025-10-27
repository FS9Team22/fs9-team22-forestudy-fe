import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';

/**
 * 스터디 페이지 접근 권한을 처리하는 커스텀 훅
 * @param {string} studyId - 스터디 ID
 * @param {'habit' | 'timer'} pageType - 접근하려는 페이지 타입
 * @returns {{isModalOpen: boolean, setIsModalOpen: Function, destination: string, handleClick: Function}}
 */
export function useStudyAuth(studyId, pageType) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const destination = `/study/${studyId}/${pageType}`;

  const checkAuth = useCallback(() => {
    const isAuthenticated =
      sessionStorage.getItem(`study-${studyId}-auth`) === 'true';
    if (!isAuthenticated) setIsModalOpen(true);
  }, [studyId]);

  const handleClick = () => {
    const isAuthenticated =
      sessionStorage.getItem(`study-${studyId}-auth`) === 'true';

    if (isAuthenticated) {
      navigate(destination);
    } else {
      setIsModalOpen(true);
    }
  };

  return {
    isModalOpen,
    setIsModalOpen,
    destination,
    checkAuth,
    handleClick,
  };
}
