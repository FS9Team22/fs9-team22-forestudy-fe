import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getStudyById } from '@/api/StudyService';
import TimerCard from './components/TimerCard/TimerCard';
import TimerBox from './components/TimerBox/TimerBox';
import TimerTop from './components/TimerTop/TimerTop';
import { useStudyAuth } from '@/hooks/useStudyAuth';
import { PasswordModal } from '@/components/ui/Modal/PasswordModal';
import styles from './timer.module.css';

export default function TimerPage() {
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const { studyId } = useParams();
  const navigate = useNavigate();
  const {
    isModalOpen: isAuthModalOpen,
    setIsModalOpen: setIsAuthModalOpen,
    checkAuth,
  } = useStudyAuth(studyId, 'timer');

  useEffect(() => {
    async function fetchStudyData() {
      try {
        const response = await getStudyById({ id: studyId });
        setStudy(response.data);
      } catch (err) {
        console.error('스터디 정보 불러오기 실패', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStudyData();
  }, [studyId]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {isAuthModalOpen && (
        <PasswordModal
          studyId={studyId}
          onClose={() => navigate('/')}
          onSuccess={() => setIsAuthModalOpen(false)}
        />
      )}
      <div className={styles.timerPage}>
        <TimerBox>
          <TimerTop study={study} />
          <TimerCard study={study} setStudy={setStudy} />
        </TimerBox>
      </div>
    </>
  );
}
