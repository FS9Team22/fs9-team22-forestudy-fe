/**
 * @param {string} text - 검사할 문자
 * @param {number} maxLen - 최대 제한 길이
 * @returns {string} - 초과시 자른 문자
 */
export const truncateText = (text, maxLen) => {
  if (!text || text.length <= maxLen) return text;
  return text.substring(0, maxLen) + '...';
};
