const API_URL = import.meta.env.VITE_API_URL + '/study';

export const getHabitListByStudyId = async ({ studyId }) => {
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

export async function updateHabit(studyId, newList) {
  try {
    const url = `${API_URL}/${studyId}/habit`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habits: newList }),
    });
    if (!res.ok) {
      throw new Error('습관 수정 실패');
    }

    const data = await res.json(); // 예: { success: true, reactions: { "❤️": 4 } }
    return data;
  } catch (err) {
    console.error('습관 수정 에러:', err);
    throw err;
  }
}
