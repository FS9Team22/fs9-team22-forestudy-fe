import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import './timer.css';
import Toast from './components/Toast';

const TimerCard = () => {
  const { studyId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [time, setTime] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const [fixedTime, setFixedTime] = useState(null);
  const [inputTimeStr, setInputTimeStr] = useState('25:00');
  const point = 100;

  const [showPauseToast, setShowPauseToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [savePointTrigger, setSavePointTrigger] = useState(false);

  const formatTime = (sec) => {
    const m = String(Math.floor(Math.abs(sec) / 60)).padStart(2, '0');
    const s = String(Math.abs(sec) % 60).padStart(2, '0');
    return sec >= 0 ? `${m}:${s}` : `-${m}:${s}`;
  };

  useEffect(() => {
    if (showPauseToast) {
      const timer = setTimeout(() => setShowPauseToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showPauseToast]);

  const handleReset = useCallback(() => {
    const [m, s] = inputTimeStr.split(':').map(Number);
    setTime(!isNaN(m) && !isNaN(s) ? m * 60 + s : 25 * 60);
    setRunning(false);
    setPaused(false);
    setStarted(false);
    setFixedTime(null);
  }, [inputTimeStr]);

  // Stop 클릭 후 포인트 저장 + 토스트 + 리셋
  useEffect(() => {
    if (!savePointTrigger) return;

    const savePoint = async () => {
      try {
        if (!studyId) return;
        const response = await fetch(`${API_URL}/study/${studyId}/point`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ point }),
        });
        const data = await response.json();
        console.log('포인트 저장 완료:', data);
      } catch (err) {
        console.error('포인트 저장 에러:', err);
      }
    };
    savePoint();

    setShowSuccessToast(true);
    const timer = setTimeout(() => {
      setShowSuccessToast(false);
      handleReset();
      setSavePointTrigger(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [savePointTrigger, studyId, handleReset, API_URL]);

  useEffect(() => {
    let timer;
    if (running) timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  const handleStart = () => {
    if (!running) {
      if (!started) {
        setFixedTime(time);
        setStarted(true);
      }
      setRunning(true);
      setPaused(false);
    }
  };

  const handlePause = () => {
    setRunning(false);
    setPaused(true);
    setShowPauseToast(true);
  };

  const handleTimeChange = (e) => {
    if (running) return;
    const [m, s] = e.target.innerText.split(':').map(Number);
    if (!isNaN(m) && !isNaN(s)) setTime(m * 60 + s);
    setInputTimeStr(e.target.innerText);
  };

  const handleStop = () => setSavePointTrigger(true);

  return (
    <div className="timer-card">
      <h3>오늘의 집중</h3>

      {(started || running || paused) && fixedTime != null && (
        <div className="point-badge timer-badge">⏰{formatTime(fixedTime)}</div>
      )}

      <p
        className={`time ${running ? 'running' : ''} ${paused ? 'paused' : ''} ${time < 0 ? 'negative' : ''}`}
        contentEditable={!running}
        suppressContentEditableWarning={true}
        onBlur={handleTimeChange}
      >
        {formatTime(time)}
      </p>

      {time < 0 ? (
        <div className="button-group">
          <button className="stop" onClick={handleStop}>
            ◎ Stop!
          </button>
        </div>
      ) : !started ? (
        <div className="button-group">
          <button
            className={`start${running || paused ? ' running' : ''}`}
            onClick={handleStart}
          >
            ▶ Start!
          </button>
        </div>
      ) : running ? (
        <div className="button-group">
          <button className="round-btn pause" onClick={handlePause}>
            <span className="pause-line"></span>
            <span className="pause-line"></span>
          </button>
          <button className={`start running`} onClick={handleStart}>
            ▶ Start!
          </button>
          <button className="round-btn reset" onClick={handleReset}>
            ↺
          </button>
        </div>
      ) : (
        <div className="button-group">
          <button className="round-btn pause" onClick={handlePause}>
            <span className="pause-line"></span>
            <span className="pause-line"></span>
          </button>
          <button className={`start running paused`} onClick={handleStart}>
            ▶ Start!
          </button>
          <button className="round-btn reset" onClick={handleReset}>
            ↺
          </button>
        </div>
      )}

      {showPauseToast && (
        <Toast
          message="🚨 집중이 중단되었습니다."
          type="error"
          onClose={() => setShowPauseToast(false)}
        />
      )}

      {showSuccessToast && (
        <Toast
          message={`🎉${point}포인트를 획득했습니다!`}
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </div>
  );
};

export default TimerCard;
