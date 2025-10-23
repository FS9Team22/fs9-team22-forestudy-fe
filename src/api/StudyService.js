const BASE_URL = import.meta.env.VITE_API_URL + '/study';

export async function createStudy(
  nickname,
  title,
  description,
  background,
  password,
) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        title,
        description,
        background,
        password,
      }),
    });

    if (!res.ok) throw new Error(`에러코드: ${res.status} / ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('API 요청 실패:', err);
    throw err;
  }
}

export async function getStudyList(orderBy, keyword, page, limit) {
  try {
    const res = await fetch(
      `${BASE_URL}?orderBy=${orderBy}&keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`,
    );
    if (!res.ok) throw new Error(`에러코드: ${res.status} / ${res.statusText}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('점검중 입니다.', err);
    throw err;
  }
}

export const getStudyById = async function ({ id }) {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `리퀘스트 에러: ${res.status}, 에러 메시지: ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data;
};
