import { useState, useEffect, useCallback } from 'react';
import { getHabitListByStudyId, updateHabit } from '@/api/HabitService.js';
import {
  createHabitLog,
  deleteHabitLog,
  getHabitCurrentDayLogListByHabitId,
} from '@/api/HabitLogService.js';
import { getStudyById } from '@/api/StudyService.js';

export function useHabits(studyId) {
  const [goalList, setGoalList] = useState([]);
  const [study, setStudy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHabits = useCallback(async () => {
    if (!studyId) return null;
    try {
      setIsLoading(true);
      const [studyData, habitListResponse] = await Promise.all([
        getStudyById({ id: studyId }),
        getHabitListByStudyId({ studyId }),
      ]);
      setStudy(studyData.data);

      const habits = habitListResponse.data;

      const processedHabits = await Promise.all(
        habits.map(async (habit) => {
          const dailyLogResponse = await getHabitCurrentDayLogListByHabitId({
            habitId: habit.id,
          });
          const dailyLogs = dailyLogResponse.data;
          const isCompletedToday = dailyLogs && dailyLogs.length > 0;

          return {
            ...habit,
            isDone: isCompletedToday,
            // 가장 최근 로그를 habitLogs로 설정
            habitLogs: isCompletedToday ? dailyLogs[0] : null,
          };
        }),
      );
      setGoalList(processedHabits);
    } catch (error) {
      console.error('습관 조회 실패:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [studyId]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);
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
        const res = await deleteHabitLog({ habitId, habitLogId });

        if (res && res.success === false) {
          throw new Error('습관 로그 삭제 API 응답 실패');
        }

        newGoalData = { isDone: false, habitLogs: null };
      } else {
        // 아직 완료 안 됐다면 생성
        const res = await createHabitLog({ habitId });

        if (!res || res.success === false || !res.data) {
          throw res;
        }
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
      if (error.code === 'P2002') {
        console.error('습관 로그 중복: 데이터를 동기화 합니다.');
        await fetchHabits();
        alert('데이터 동기화 오류');
      }
      console.error('상태 변경 실패', error);
    }
  };

  const saveHabitList = async (newList) => {
    try {
      const data = await updateHabit(studyId, newList);
      if (data.success) {
        await fetchHabits();
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
