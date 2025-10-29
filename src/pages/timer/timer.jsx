import { useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router';
import TimerCard from './TimerCard/TimerCard';
import { useStudyAuth } from '@/hooks/useStudyAuth';
import { PasswordModal } from '@/components/ui/Modal/PasswordModal';

export default function TimerPage() {
  const { study, setStudy } = useOutletContext();
  const { studyId } = useParams();
  const navigate = useNavigate();
  const {
    isModalOpen: isAuthModalOpen,
    setIsModalOpen: setIsAuthModalOpen,
    checkAuth,
  } = useStudyAuth(studyId, 'timer');

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!study) return <p>Loading...</p>;

  return (
    <>
      {isAuthModalOpen ? (
        <PasswordModal
          studyId={studyId}
          onClose={() => navigate('/')}
          onSuccess={() => setIsAuthModalOpen(false)}
        />
      ) : (
        <TimerCard study={study} setStudy={setStudy} />
      )}
    </>
  );
}
