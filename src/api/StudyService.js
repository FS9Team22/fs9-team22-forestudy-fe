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

export const deleteStudyById = async function ({ id, password }) {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
    }),
  });
  if (!res.ok) {
    throw new Error(
      `리퀘스트 에러: ${res.status}, 에러 메시지: ${res.statusText}`,
    );
  }
  const data = await res.json();
  return data;
};

export const loginStudy = async function ({ id, password }) {
  const url = `${BASE_URL}/${id}/login`;
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });
  return res; // 응답 객체 전체를 반환하여 쿠키 설정을 보장합니다.
};

export const logoutStudy = async function ({ id, token }) {
  const url = `${BASE_URL}/${id}/logout`;
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      `리퀘스트 에러: ${res.status}, 에러 메시지: ${res.statusText}`,
    );
  }

  const data = await res.json();
  return data;
};
