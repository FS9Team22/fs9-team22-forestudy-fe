const API_URL = import.meta.env.VITE_API_URL;

// ✅ 포인트 저장 API
export async function savePoint(studyId, point) {
  try {
    const res = await fetch(`${API_URL}/study/${studyId}/point`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ point }),
    });

    if (!res.ok) {
      throw new Error('포인트 저장 실패');
    }

    const data = await res.json();
    return data; // 예: { success: true, totalPoints: 120 }
  } catch (err) {
    console.error('❌ 포인트 저장 에러:', err);
    throw err;
  }
}

export async function getStudyPoint(studyId) {
  try {
    const res = await fetch(`${API_URL}/study/${studyId}`, { method: 'GET' });
    if (!res.ok) throw new Error('포인트 조회 실패');
    const data = await res.json();
    return data.points || 0;
  } catch (err) {
    console.error('❌ 포인트 조회 에러:', err);
    throw err;
  }
}
