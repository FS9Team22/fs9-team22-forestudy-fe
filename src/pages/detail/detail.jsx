import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { WeeklyHabitTable } from './weeklyHabitTable';
import { getStudyById } from '@/api/StudyService';
import { getHabitListByStudyId } from '@/api/HabitService';
import { StudyInfo } from '@/components/StudyInfo';
import { Toast } from '@/components/ui';
import Reaction from '@/components/Reaction/Reaction';
import './detail.css';

const WEB_URL = import.meta.env.VITE_WEB_URL;

export default function DetailPage() {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studyResponse, habitResponse] = await Promise.all([
          getStudyById({ id: studyId }),
          getHabitListByStudyId({ studyId }),
        ]);
        setStudy(studyResponse.data);
        setHabits(habitResponse.data);
      } catch (err) {
        setError(err.message);
        console.error('데이터를 불러오는 데 실패했습니다.', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studyId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!study) return <div>스터디 정보를 찾을 수 없습니다.</div>;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowSuccessToast(true);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
      setShowErrorToast(true);
    }
  };

  return (
    <>
      <title>{'공부의 숲 | ' + study.nickname + '의 ' + study.title}</title>
      <meta property="og:title" content={'공부의 숲 | ' + study.title} />
      <meta property="og:url" content={WEB_URL + '/study/' + study.id} />
      <meta property="og:description" content={study.description} />
      <main className="detail-main">
        <section className="detail-section">
          <div className="section-top-wrap">
            <div className="study-reaction">
              <Reaction studyId={study.id} />
            </div>
            <ul className="top-btn-list">
              <li>
                <button type="button" onClick={handleShare} className="top-btn">
                  공유하기
                </button>
              </li>
              <span>|</span>
              <li>
                <button type="button" className="top-btn">
                  수정하기
                </button>
              </li>
              <span>|</span>
              <li>
                <button type="button" className="top-btn">
                  삭제하기
                </button>
              </li>
            </ul>
          </div>
          <StudyInfo study={study} />
          <WeeklyHabitTable habits={habits} />
        </section>
      </main>
      {showSuccessToast && (
        <Toast
          message="주소가 복사되었습니다!"
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      {showErrorToast && (
        <Toast
          message="주소 복사에 실패했습니다. 다시 시도해주세요."
          type="error"
          onClose={() => setShowErrorToast(false)}
        />
      )}
    </>
  );
}
