import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getStudyById } from '@/api/StudyService';
import TimerCard from './components/TimerCard/TimerCard';
import TimerBox from './components/TimerBox/TimerBox';
import TimerTop from './components/TimerTop/TimerTop';

export default function TimerPage() {
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const { studyId } = useParams();

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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div
        className="timer-page"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '5rem',
        }}
      >
        <TimerBox>
          <TimerTop study={study} />
          <TimerCard study={study} setStudy={setStudy} />
        </TimerBox>
      </div>
    </>
  );
}
