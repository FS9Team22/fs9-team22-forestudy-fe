import { useEffect, useState } from 'react';
import { getStudyList } from '../api/StudyService';

export function useStudies(sortType, keyword, page, LIMIT) {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const studyData = await getStudyList(sortType, keyword, page, LIMIT);
        if (page === 1) {
          setStudies((prev) => [...prev, ...studyData.data]);
        }
      } catch (err) {
        console.error('스터디 가져오기에 실패하였습니다.', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [sortType, keyword, page, LIMIT]);
  return {
    studies,
    setStudies,
    loading,
  };
}
