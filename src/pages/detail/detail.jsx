import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { WeeklyHabitTable } from './weeklyHabitTable';
import { getStudyById } from '@/api/StudyService';
import { getHabitListByStudyId } from '@/api/HabitService';
import './detail.css';
import StudyLayout from '@/components/StudyLayout/StudyLayout';

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

  return <WeeklyHabitTable habits={habits} />;
}
