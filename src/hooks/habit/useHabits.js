import { useState, useEffect } from 'react';
import { getHabitListByStudyId, updateHabit } from '@/api/HabitService.js';
import { createHabitLog, deleteHabitLog } from '@/api/HabitLogService.js';
import { getStudyById } from '@/api/StudyService.js';

export function useHabits(studyId) {
  const [goalList, setGoalList] = useState([]);
  const [study, setStudy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!studyId) return null;
      try {
        setIsLoading(true);
        const [studyData, habitData] = await Promise.all([
          getStudyById({ id: studyId }),
          getHabitListByStudyId({ studyId }),
        ]);
        setStudy(studyData.data);
        setGoalList(habitData.data);
      } catch (error) {
        console.error('습관 조회 실패:', error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHabits();
  }, [studyId]);

  /**
   *
   * @param {number} habitId - 습관 ID
   * @param {number | null} habitLogId - 습관 로그 ID (완료된 상태만 존재)
   * @param {boolean} isDone - 현재 습관의 완료 상태
   */
  const handleGoalStatusChange = async (habitId, habitLogId, isDone) => {
    try {
      let newGoalData = {};

      if (isDone) {
        // 이미 완료된 상태 삭제
        if (!habitLogId) {
          console.error('삭제 시도 실패: habitLogId가 없다.');
          return;
        }
        await deleteHabitLog({ habitId, habitLogId });

        newGoalData = { isDone: false, habitLogs: null };
      } else {
        // 아직 완료 안 됐다면 생성
        const res = await createHabitLog({ habitId });
        newGoalData = { isDone: true, habitLogs: res.data };
      }
      setGoalList((prev) =>
        prev.map((goal) => {
          if (goal.id === habitId) {
            return {
              ...goal,
              ...newGoalData,
            };
          }
          return goal;
        }),
      );
    } catch (error) {
      console.error('상태 변경 실패', error);
    }
  };

  const saveHabitList = async (newList) => {
    try {
      const data = await updateHabit(studyId, newList);
      if (data.success) {
        setGoalList(data.data);
      }
    } catch (error) {
      console.error('저장 실패:', error);
    }
  };

  return {
    goalList,
    study,
    isLoading,
    error,
    handleGoalStatusChange,
    saveHabitList,
  };
}
