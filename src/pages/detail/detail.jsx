import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Nav } from '../../components/Nav/Nav';
import './detail.css';
import { WeeklyHabitTable } from './weeklyHabitTable';
import { getStudyById } from '../../api/StudyService';
import { getHabitListByStudyId } from '../../api/HabitService';

export default function DetailPage() {
  const { studyId } = useParams();
  const [study, setStudy] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      <Nav />
      <main className="detail-main">
        <section className="detail-section">
          <div className="section-top-wrap">
            <div className="study-reaction">리액션컴포넌트</div>
            <ul className="top-btn-list">
              <li>공유하기</li>
              <span>|</span>
              <li>수정하기</li>
              <span>|</span>
              <li>삭제하기</li>
            </ul>
          </div>
          <div className="section-title-wrap">
            <h1 className="title-box large-header">
              <span className="study-nickname">{study.nickname}</span>
              <span>의 </span>
              <span className="study-title">{study.title}</span>
            </h1>
            <ul className="link-btn-list">
              <li>습관버튼컴포넌트</li>
              <li>집중버튼컴포넌트</li>
            </ul>
          </div>
          <div className="section-mid-wrap">
            <div className="description-box">
              <h3 className="small-header">소개</h3>
              <p className="study-description">{study.description}</p>
            </div>
            <div className="point-box">
              <h3 className="small-header">현재까지 획득한 포인트</h3>
              <div>포인트알약컴포넌트</div>
            </div>
            <WeeklyHabitTable habits={habits} />
          </div>
        </section>
      </main>
    </>
  );
}
