export const formatTimeString = (time) => {
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const day = String(time.getDate()).padStart(2, '0');
  const hour = time.getHours();
  const minute = String(time.getMinutes()).padStart(2, '0');
  const second = String(time.getSeconds()).padStart(2, '0');
  const period = hour >= 12 ? '오후' : '오전';
  const displayHour = hour % 12 || 12;

  return `${year}-${month}-${day} ${period} ${displayHour}:${minute}:${second}`;
};
