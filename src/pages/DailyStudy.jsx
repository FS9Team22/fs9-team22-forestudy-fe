import React, { useState, useEffect } from 'react';

const TIME_UPDATE_INTERVAL = 1000;

export default function DailyStudy() {
  const [goalList, setGoalList] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timeUpdate = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_UPDATE_INTERVAL);

    return () => clearInterval(timeUpdate);
  }, []);

  const formatTimeString = (time) => {
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-400 rounded-2xl flex items-center justify-center shadow-md">
          <div className="text-white text-2xl font-bold">📚</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">2팀</h1>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm text-gray-600">
                오늘의 집중 &gt;
              </button>
              <button className="px-4 py-2 text-sm text-gray-600">
                홈 &gt;
              </button>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">현재 시간</p>
            <div className="text-sm text-gray-600">{formatTimeString(currentTime)}</div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">오늘의 습관</h2>
              <button 
                onClick={handleModalOpen}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                목록 수정
              </button>
            </div>

            <div className="text-center py-16 text-gray-400">
              <p>안녕하세요</p>
              <p className="text-sm mt-2">목록을 설정해주세요</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 text-center">습관 목록</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="text-center text-gray-400 py-8">
                아직 입력 기능이 구현되지 않았습니다
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={handleModalClose}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 font-medium transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}