const BASE_URL = 'http://localhost:3000/study';

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

    if (!res.ok) throw new Error('HTTP error!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('create.... error');
    throw err;
  }
}

export async function getStudyList(orderBy, keyword, page, limit) {
  try {
    const res = await fetch(
      `${BASE_URL}?orderBy=${orderBy}&keyword=${keyword}&page=${page}&limit=${limit}`,
      {
        method: 'GET',
      },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.status);
    console.log(err.message);
    console.error('get... error');
    throw err;
  }
}
