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

export const createHabitLog = async function ({ habitId }) {
  try {
    const url = `${API_URL}/${habitId}/log`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        habitId,
      }),
    });

    if (!res.ok)
      throw new Error(
        `리퀘스트 에러: ${res.status}, 에러 메시지: ${res.statusText}`,
      );
    const data = await res.json();
    return data;
  } catch (error) {
    if (error.response) {
      console.error('서버 응답 에러:', error.response.data);
    } else {
      console.error('네트워크 에러:', error.message);
    }
  }
};

export const deleteHabitLog = async function ({ habitId, habitLogId }) {
  const url = `${API_URL}/${habitId}/log/${habitLogId}`;
  console.log(url);
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      habitLogId,
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
