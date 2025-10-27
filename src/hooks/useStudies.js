import { useEffect, useState } from 'react';
import { getStudyList } from '@/api/StudyService';

export function useStudies(sortType, keyword, page, LIMIT) {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const studyData = await getStudyList(sortType, keyword, page, LIMIT);
        if (page === 1) {
          setStudies(studyData.data);
        } else {
          setStudies((prev) => [...prev, ...studyData.data]);
        }
      } catch (err) {
        if (controller.signal.aborted) {
          console.log('작업이 취소되었습니다.', err.message);
        } else {
          console.error(`스터디 가져오기에 실패하였습니다: ${err.message}`);
        }
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [sortType, keyword, page, LIMIT]);
  return {
    studies,
    setStudies,
  };
}
