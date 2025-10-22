import { useEffect, useState } from 'react';

/**
 * 만료기간이 있는 localStorage 커스텀 훅
 *
 * @param {string} key localStorage에 저장할 키
 * @param {[]} defaultValue 값이 없거나 만료시 기본값 설정
 * @param {number} ttl - expired time (ms)
 * @returns {[state, setState]} 현재 값과 상태를 업데이트 하는 함수를 반환
 */
export function useLocalStorage(key, defaultValue, ttl) {
  const [value, setValue] = useState(() => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return defaultValue;

    const item = JSON.parse(itemStr);
    const date = new Date();

    // 데이터 만료 확인
    if (date.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return defaultValue;
    }

    return item.value;
  });

  useEffect(() => {
    const date = new Date();
    const expiry = date.getTime() + ttl;
    const item = { value, expiry };

    localStorage.setItem(key, JSON.stringify(item));
  }, [key, value, ttl]);

  return [value, setValue];
}
