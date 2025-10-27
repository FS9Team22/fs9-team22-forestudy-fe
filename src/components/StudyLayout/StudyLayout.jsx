import { useEffect, useState } from 'react';
import { useMatch, useParams } from 'react-router';
import { getStudyById } from '@/api/StudyService';
import { getHabitListByStudyId } from '@/api/HabitService';
import { StudyInfo } from '@/components/StudyInfo';
import DetailLayoutTop from './DetailLayoutTop';
import './Layout.css';

const WEB_URL = import.meta.env.VITE_WEB_URL;

export default function StudyLayout({ children }) {
  const { studyId } = useParams();
  const isDetail = useMatch('/study/:studyId');
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [studyResponse] = await Promise.all([
          getStudyById({ id: studyId }),
          getHabitListByStudyId({ studyId }),
        ]);
        setStudy(studyResponse.data);
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
      <title>{'공부의 숲 | ' + study.nickname + '의 ' + study.title}</title>
      <meta property="og:title" content={'공부의 숲 | ' + study.title} />
      <meta property="og:url" content={WEB_URL + '/study/' + study.id} />
      <meta property="og:description" content={study.description} />
      <main className="layout-main">
        <section className="layout-section">
          {isDetail && <DetailLayoutTop studyId={study.id} />}
          <StudyInfo study={study} />
          <section className="layout-children">{children}</section>
        </section>
      </main>
    </>
  );
}
