const API_URL = import.meta.env.VITE_API_URL;

// ✅ 리액션 목록 조회
export async function fetchReactions(studyId) {
  try {
    const res = await fetch(`${API_URL}/study/${studyId}/reaction`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error('리액션 조회 실패');
    }

    const data = await res.json(); // 예: { "👍": 2, "❤️": 3, "😂": 1 }
    return data;
  } catch (err) {
    console.error('❌ 리액션 조회 에러:', err);
    throw err;
  }
}

// ✅ 리액션 추가
export async function addReaction(studyId, emoji) {
  try {
    const res = await fetch(`${API_URL}/study/${studyId}/reaction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji }),
    });

    if (!res.ok) {
      throw new Error('리액션 추가 실패');
    }

    const data = await res.json(); // 예: { success: true, reactions: { "❤️": 4 } }
    return data;
  } catch (err) {
    console.error('❌ 리액션 추가 에러:', err);
    throw err;
  }
}
