const API_URL = import.meta.env.VITE_API_URL + '/study';

export const getHabitListByStudyId = async function ({ studyId }) {
  const url = `${API_URL}/${studyId}/habit`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `리퀘스트 에러: ${res.status}, 에러 메시지: ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data;
};
