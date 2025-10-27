const API_URL = import.meta.env.VITE_API_URL + '/habit';

export const getHabitLogListByHabitId = async function ({ habitId }) {
  const url = `${API_URL}/${habitId}/log`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `리퀘스트 에러: ${res.status}, 에러 메시지: ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data;
};

export const getHabitCurrentWeekLogListByHabitId = async function ({
  habitId,
}) {
  const url = `${API_URL}/${habitId}/log/week`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `리퀘스트 에러: ${res.status}, 에러 메시지: ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data;
};

export const getHabitCurrentDayLogListByHabitId = async function ({ habitId }) {
  const url = `${API_URL}/${habitId}/log/day`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `리퀘스트 에러: ${res.status}, 에러 메시지: ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data;
};
